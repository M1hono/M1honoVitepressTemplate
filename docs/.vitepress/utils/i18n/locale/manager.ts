/**
 * @file The central manager for the i18n system.
 */
import { reactive } from 'vue';
import { loadTranslation } from './loader';
import type { TranslationsCache } from './types';

/**
 * Orchestrates the i18n system, managing state and caching.
 */
class LocaleManager {
    public translations = reactive<TranslationsCache>({});

    constructor() {
        // The manager can be extended with options if needed in the future.
    }

    /**
     * Manually triggers the loading of a translation file.
     *
     * @param lang The language code.
     * @param componentPath The relative path of the component.
     */
    public async load(lang: string, componentPath: string): Promise<void> {
        if (!this.isLoaded(lang, componentPath)) {
            await loadTranslation(lang, componentPath, this.translations);
        }
    }

    /**
     * Checks if a translation file has been loaded (or attempted).
     *
     * @param lang The language code.
     * @param componentPath The relative path of the component.
     * @returns True if the file has been loaded or failed to load.
     */
    private isLoaded(lang: string, componentPath: string): boolean {
        return this.translations[lang]?.[componentPath] !== undefined;
    }
}

/**
 * A singleton instance of the LocaleManager.
 * This ensures that the translation cache and state are shared
 * across the entire application.
 */
export const i18nManager = new LocaleManager(); 