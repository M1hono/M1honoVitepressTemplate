/// <reference types="vite/client" />

import { reactive, watchEffect } from "vue";
import { useData } from "vitepress";
import { getLanguages, getDefaultLanguage } from "@config";
import componentIdMappingData from "../../../config/locale/component-id-mapping.json";

interface ComponentIdMapping {
    mappings?: Record<string, string>;
}

type TranslationDictionary = Record<string, string>;

class LocaleCodeResolver {
    private readonly knownLocales = new Set<string>(
        getLanguages().map((language) => language.code),
    );
    private readonly fallbackLocale = getDefaultLanguage().code;

    resolve(localeFromVitePress: string | undefined): string {
        if (localeFromVitePress && this.knownLocales.has(localeFromVitePress)) {
            return localeFromVitePress;
        }

        const localeFromPath = this.resolveFromPathname();
        if (localeFromPath) return localeFromPath;

        return this.fallbackLocale;
    }

    private resolveFromPathname(): string | undefined {
        if (typeof window === "undefined") return undefined;
        const pathname = window.location.pathname;
        for (const language of getLanguages()) {
            const basePath = language.link || `/${language.code}/`;
            if (pathname.startsWith(basePath)) {
                return language.code;
            }
        }
        return undefined;
    }
}

class ComponentPathResolver {
    private readonly mapping: Record<string, string>;

    constructor(mappingData: ComponentIdMapping) {
        this.mapping = mappingData?.mappings || {};
    }

    resolve(componentId: string): string {
        return this.mapping[componentId] || componentId;
    }
}

const EMPTY_DICTIONARY: TranslationDictionary = Object.freeze({});

class TranslationModuleLoader {
    private readonly translationModules = import.meta.glob(
        "../../../config/locale/*/components/**/*.json",
    );

    async load(
        locale: string,
        componentPath: string,
    ): Promise<TranslationDictionary> {
        const modulePath = `../../../config/locale/${locale}/components/${componentPath}.json`;
        const moduleFactory = this.translationModules[modulePath];
        if (!moduleFactory) return EMPTY_DICTIONARY;

        try {
            const moduleValue = await moduleFactory();
            const raw =
                (moduleValue as { default?: TranslationDictionary }).default ||
                moduleValue;
            if (!raw || typeof raw !== "object") return EMPTY_DICTIONARY;
            return raw as TranslationDictionary;
        } catch (error) {
            console.warn(
                `[i18n] Failed to load translation: ${modulePath}`,
                error,
            );
            return EMPTY_DICTIONARY;
        }
    }
}

function createCacheKey(componentId: string, locale: string): string {
    return `${componentId}@${locale}`;
}

class TranslationCacheStore {
    private readonly cache = reactive<Record<string, TranslationDictionary>>(
        {},
    );
    private readonly loading = new Set<string>();

    constructor(
        private readonly pathResolver: ComponentPathResolver,
        private readonly moduleLoader: TranslationModuleLoader,
    ) {}

    getBucket(
        componentId: string,
        locale: string,
        defaults: TranslationDictionary,
    ): TranslationDictionary {
        const cacheKey = createCacheKey(componentId, locale);
        if (!this.cache[cacheKey]) {
            this.cache[cacheKey] = { ...defaults };
        }
        this.ensureLoaded(componentId, locale, defaults);
        return this.cache[cacheKey];
    }

    private ensureLoaded(
        componentId: string,
        locale: string,
        defaults: TranslationDictionary,
    ): void {
        const cacheKey = createCacheKey(componentId, locale);
        if (this.loading.has(cacheKey)) return;

        this.loading.add(cacheKey);
        const componentPath = this.pathResolver.resolve(componentId);

        this.moduleLoader
            .load(locale, componentPath)
            .then((translation) => {
                if (!this.cache[cacheKey]) {
                    this.cache[cacheKey] = { ...defaults };
                }
                Object.entries(translation).forEach(([key, value]) => {
                    this.cache[cacheKey][key] = value;
                });
            })
            .finally(() => {
                this.loading.delete(cacheKey);
            });
    }
}

/**
 * Updates a reactive translation object in-place.
 *
 * NOTE: This function intentionally mutates the target object to preserve
 * Vue's reactivity reference. For reactive objects, the reference must
 * remain stable for watchers to detect changes properly.
 */
function syncTranslationObject(
    target: Record<string, string>,
    nextValues: Record<string, string>,
): void {
    Object.keys(target).forEach((key) => {
        if (!(key in nextValues)) {
            delete target[key];
        }
    });
    Object.entries(nextValues).forEach(([key, value]) => {
        target[key] = value;
    });
}

const localeCodeResolver = new LocaleCodeResolver();
const componentPathResolver = new ComponentPathResolver(
    componentIdMappingData as ComponentIdMapping,
);
const translationModuleLoader = new TranslationModuleLoader();
const translationCacheStore = new TranslationCacheStore(
    componentPathResolver,
    translationModuleLoader,
);

export function useSafeI18n<T extends Record<string, string>>(
    componentId: string,
    defaultTranslations: T,
): { t: T } {
    const { lang } = useData();
    const translationState = reactive({ ...defaultTranslations }) as T;

    watchEffect(() => {
        const locale = localeCodeResolver.resolve(lang.value);
        const cachedBucket = translationCacheStore.getBucket(
            componentId,
            locale,
            defaultTranslations,
        );
        const nextValues = {
            ...defaultTranslations,
            ...cachedBucket,
        } as Record<string, string>;
        syncTranslationObject(
            translationState as Record<string, string>,
            nextValues,
        );
    });

    return { t: translationState };
}

export function createI18nHook<T extends Record<string, string>>(
    componentId: string,
    defaultTranslations: T,
): () => { t: T } {
    return () => useSafeI18n(componentId, defaultTranslations);
}
