/// <reference types="vite/client" />

/**
 * @file Handles the dynamic loading of translation files using Vite's glob import.
 */
import type { TranslationsCache, TranslationFile } from './types';

/**
 * Preloads all translation files using Vite's `import.meta.glob`.
 * This is more efficient than individual dynamic imports as it leverages
 * Vite's code-splitting and pre-loading capabilities.
 * @returns {Record<string, () => Promise<{ default: TranslationFile }>>}
 * A map of module importers.
 */
const translationModules = import.meta.glob(
    '../../../config/locale/**/components/**/*.json'
);

/**
 * Loads a translation file for a given language and component path into the cache.
 *
 * @param lang The language code (e.g., 'en-US').
 * @param componentPath The component's relative path (e.g., 'content/Contributors').
 * @param cache The reactive cache object to update.
 */
export async function loadTranslation(
    lang: string,
    componentPath: string,
    cache: TranslationsCache
): Promise<void> {
    const modulePath = `../../../config/locale/${lang}/components/${componentPath}.json`;
    const importer = translationModules[modulePath];

    if (!importer) {
        if (!cache[lang]?.[componentPath]) {
            console.warn(`[i18n] Translation file not found for component '${componentPath}' in language '${lang}'.`);
            if (!cache[lang]) cache[lang] = {};
            cache[lang][componentPath] = {};
        }
        return;
    }

    try {
        const module = await importer() as { default: TranslationFile };
        if (!cache[lang]) {
            cache[lang] = {};
        }
        cache[lang][componentPath] = module.default;
    } catch (error) {
        console.error(`[i18n] Error loading translation for '${componentPath}' in '${lang}':`, error);
        if (!cache[lang]) cache[lang] = {};
        cache[lang][componentPath] = {};
    }
} 