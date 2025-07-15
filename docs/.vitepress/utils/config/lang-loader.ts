import { 
    getLanguages, 
    getDefaultLanguage, 
    getLocalesConfig,
    type LanguageConfig 
} from '../../config/project-config';
import { getLanguageModule, getSearchModule } from './language-registry';

export function loadLanguageConfig(langCode: string) {
    return getLanguageModule(langCode);
}

export function loadSearchConfig(langCode: string) {
    return getSearchModule(langCode);
}

export function loadAllLanguageConfigs() {
    const languages = getLanguages();
    const configs: Record<string, any> = {};
    
    for (const lang of languages) {
        const config = loadLanguageConfig(lang.code);
        
        if (config) {
            const key = lang.isDefault ? 'root' : lang.code;
            configs[key] = config;
        }
    }
    
    return configs;
}

export function buildVitePressConfig() {
    const locales = getLocalesConfig();
    const langConfigs = loadAllLanguageConfigs();
    
    Object.keys(locales).forEach(key => {
        if (langConfigs[key]) {
            locales[key] = {
                ...locales[key],
                ...langConfigs[key]
            };
        }
    });
    
    const config: any = {
        locales,
    };
    
    if (langConfigs.root) {
        Object.assign(config, langConfigs.root);
    }
    
    return config;
}

export function getSearchLocales() {
    const languages = getLanguages();
    const locales: Record<string, any> = {};
    
    languages.forEach(lang => {
        const searchConfig = loadSearchConfig(lang.code);
        
        if (searchConfig) {
            Object.assign(locales, searchConfig);
        } else {
            console.warn(`No search configuration found for language: ${lang.code}`);
        }
    });
    
    return locales;
} 