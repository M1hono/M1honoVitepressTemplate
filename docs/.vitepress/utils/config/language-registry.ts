import { getLanguages } from "../../config/project-config";

const languageModules: Record<string, any> = {};
const searchModules: Record<string, any> = {};

export function registerLanguageModule(
    code: string,
    configModule: any,
    searchModule?: any
) {
    languageModules[code] = configModule;
    if (searchModule) {
        searchModules[code] = searchModule;
    }
}

export function getLanguageModule(code: string) {
    return languageModules[code];
}

export function getSearchModule(code: string) {
    return searchModules[code];
}

export function getAllLanguageModules() {
    return languageModules;
}

export function getAllSearchModules() {
    return searchModules;
}

function findMainConfigExport(moduleExports: any, langCode: string) {
    const keys = Object.keys(moduleExports);

    const candidates = keys.filter((key) => {
        const keyLower = key.toLowerCase();
        const codeLower = langCode.toLowerCase();
        return (
            keyLower.includes(codeLower) ||
            key.includes("Config") ||
            key.includes("_") ||
            key === "default"
        );
    });

    return candidates.length > 0 ? moduleExports[candidates[0]] : null;
}

export function initializeLanguageRegistry() {
    const languages = getLanguages();

    languages.forEach((lang) => {
        try {
            const fileName = lang.fileName
                ? lang.fileName.replace(".ts", "")
                : lang.code;

            const langModule = require(`../../config/lang/${fileName}`);
            const mainConfig = findMainConfigExport(langModule, lang.code);
            const searchConfig = langModule.search;

            if (mainConfig) {
                registerLanguageModule(lang.code, mainConfig, searchConfig);
            }
        } catch (error) {}
    });
}

initializeLanguageRegistry();
