import { computed, getCurrentInstance, ComputedRef } from 'vue';
import { useData } from 'vitepress';
import { i18nManager } from './manager';
import { resolveComponentPath } from './path-resolver';

/**
 * A Vue composable that provides component-scoped translations.
 * @param defaultTranslations An object of default key-value pairs.
 * @returns An object containing a reactive `t` object with the correct translations.
 * @example
 * // @i18n
 * const { t } = useI18n({
 *   title: 'Hello World'
 * });
 * // In template: <h1>{{ t.title }}</h1>
 */
export function useI18n<T extends Record<string, string>>(
    defaultTranslations: T
): { t: ComputedRef<T> } {
    const instance = getCurrentInstance();
    const componentPath = resolveComponentPath(instance);
    const { lang } = useData();

    if (componentPath) {
        i18nManager.load(lang.value, componentPath);
    }

    const t = computed(() => {
        if (!componentPath) {
            console.warn('[i18n] `useI18n` was called outside of a component setup context.');
            return defaultTranslations as T;
        }

        const componentTranslations = i18nManager.translations[lang.value]?.[componentPath] || {};
        
        return { ...defaultTranslations, ...componentTranslations } as T;
    });

    return { t };
} 