import { projectConfig } from "../../../config/project-config";
import type { LanguageConfig } from "../project-types";

export function getLanguages(): LanguageConfig[] {
    return projectConfig.languages;
}

export function getDefaultLanguage(): LanguageConfig {
    return (
        projectConfig.languages.find((lang) => lang.isDefault) ||
        projectConfig.languages[0]
    );
}

export function getLanguageCodes(): string[] {
    return projectConfig.languages.map((lang) => lang.code);
}

export function getLanguageLinks(): string[] {
    return projectConfig.languages.map((lang) => lang.link);
}

export function getLanguageByCode(code: string): LanguageConfig | undefined {
    if (code === "root") {
        return getDefaultLanguage();
    }

    let language = projectConfig.languages.find((lang) => lang.code === code);
    if (language) {
        return language;
    }

    language = projectConfig.languages.find((lang) => {
        if (!lang.fileName) return false;
        const fileNameWithoutExt = lang.fileName.replace(".ts", "");
        return fileNameWithoutExt === code;
    });

    if (language) {
        return language;
    }

    return projectConfig.languages.find((lang) => {
        const shortCode = lang.code.split("-")[0];
        return shortCode === code;
    });
}

export function getLocalesConfig() {
    const locales: Record<string, any> = {};

    projectConfig.languages.forEach((lang) => {
        const key = lang.isDefault ? "root" : lang.code;
        locales[key] = {
            label: lang.label || lang.displayName,
            lang: lang.name,
            link: lang.link || (lang.isDefault ? "/" : `/${lang.code}/`),
        };
    });

    return locales;
}

export function getBasePath(): string {
    return projectConfig.base || "/";
}

export function removeBaseFromPath(path: string): string {
    const base = projectConfig.base;

    if (base === "/" || !base) {
        return path;
    }

    const baseWithoutTrailingSlash = base.endsWith("/")
        ? base.slice(0, -1)
        : base;

    if (path.startsWith(baseWithoutTrailingSlash)) {
        return path.substring(baseWithoutTrailingSlash.length) || "/";
    }

    return path;
}

export function removeLangFromPath(path: string): string {
    let cleanPath = removeBaseFromPath(path);

    if (!cleanPath.startsWith("/")) {
        cleanPath = `/${cleanPath}`;
    }

    for (const lang of projectConfig.languages) {
        const langLink = lang.link || `/${lang.code}/`;

        if (lang.isDefault && cleanPath.startsWith(langLink)) {
            return `/${cleanPath.substring(langLink.length)}`;
        }

        if (!lang.isDefault && cleanPath.startsWith(langLink)) {
            return `/${cleanPath.substring(langLink.length)}`;
        }
    }

    return cleanPath;
}

export function getLangCodeFromVitepressLang(vitepressLang: string): string {
    if (vitepressLang === "root") {
        return getDefaultLanguage().code;
    }

    const langConfig = getLanguageByCode(vitepressLang);
    if (langConfig) {
        return langConfig.code;
    }

    return vitepressLang;
}

export function getLanguageFromPath(path: string): string {
    let cleanPath = removeBaseFromPath(path);

    if (!cleanPath.startsWith("/")) {
        cleanPath = `/${cleanPath}`;
    }

    for (const lang of projectConfig.languages) {
        const langLink = lang.link || `/${lang.code}/`;
        if (cleanPath.startsWith(langLink)) {
            return lang.code;
        }
    }

    return getDefaultLanguage().code;
}

export function hasLangInPath(path: string): boolean {
    let cleanPath = removeBaseFromPath(path);

    if (!cleanPath.startsWith("/")) {
        cleanPath = `/${cleanPath}`;
    }

    for (const lang of projectConfig.languages) {
        if (lang.isDefault) continue;

        const langLink = lang.link || `/${lang.code}/`;
        if (cleanPath.startsWith(langLink)) {
            return true;
        }
    }

    return false;
}

export function generateGiscusTerm(path: string, localeIndex: string): string {
    if (projectConfig.giscus.sharedComments) {
        const cleanedPath = removeLangFromPath(path);
        const term = cleanedPath.startsWith("/")
            ? cleanedPath.substring(1)
            : cleanedPath;
        return !term || term === "" || term === "/" ? "index" : term;
    }

    let cleanedPath = removeBaseFromPath(path);

    if (!cleanedPath.startsWith("/")) {
        cleanedPath = `/${cleanedPath}`;
    }

    const langCode = getLangCodeFromVitepressLang(localeIndex);
    const langConfig = getLanguageByCode(langCode);

    if (langConfig) {
        const langLink = langConfig.link || `/${langConfig.code}/`;
        if (!cleanedPath.startsWith(langLink)) {
            cleanedPath = `${langLink}${cleanedPath.substring(1)}`;
        }
    }

    const term = cleanedPath.startsWith("/")
        ? cleanedPath.substring(1)
        : cleanedPath;
    return !term || term === "" || term === "/"
        ? `${langCode}/index`
        : term;
}

export function getLangCodeFromLink(path: string): string {
    const defaultLang = getDefaultLanguage();
    const match = path.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//);
    if (match) {
        return match[1];
    }

    return defaultLang.code;
}

export function getSearchLocaleKey(langCode: string): string {
    const defaultLang = getDefaultLanguage();
    return langCode === defaultLang.code ? "root" : langCode;
}
