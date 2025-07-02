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
            const key = lang.isDefault ? 'root' : lang.code;
            locales[key] = {
                translations: {
                    button: {
                        buttonText: lang.code === 'zh' ? '搜索' : 'Search',
                        buttonAriaLabel: lang.code === 'zh' ? '搜索' : 'Search'
                    },
                    modal: {
                        displayDetails: lang.code === 'zh' ? '显示详细列表' : 'Display detailed list',
                        resetButtonTitle: lang.code === 'zh' ? '清除查询条件' : 'Clear the query',
                        backButtonTitle: lang.code === 'zh' ? '返回' : 'Back',
                        noResultsText: lang.code === 'zh' ? '无法找到相关结果' : 'No results for',
                        footer: {
                            selectText: lang.code === 'zh' ? '选择' : 'to select',
                            selectKeyAriaLabel: lang.code === 'zh' ? '输入' : 'enter',
                            navigateText: lang.code === 'zh' ? '切换' : 'to navigate',
                            navigateUpKeyAriaLabel: lang.code === 'zh' ? '向上' : 'up arrow',
                            navigateDownKeyAriaLabel: lang.code === 'zh' ? '向下' : 'down arrow',
                            closeText: lang.code === 'zh' ? '关闭' : 'to close',
                            closeKeyAriaLabel: lang.code === 'zh' ? '退出' : 'escape'
                        }
                    }
                }
            };
        }
    });
    
    return locales;
} 