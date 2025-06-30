import { resolve, join } from 'path';

export interface LanguageConfig {
    code: string;
    name: string;
    displayName: string;
    isDefault?: boolean;
    link?: string;
    label?: string;
    fileName?: string;
}

export interface PathConfig {
    root: string;
    docs: string;
    src: string;
    public: string;
    vitepress: string;
    config: string;
    theme: string;
    scripts: string;
    utils: string;
    cache: string;
    build: string;
}

export interface ProjectConfig {
    name: string;
    description: string;
    version: string;
    author: string;
    license: string;
    repository: {
        type: string;
        url: string;
    };
    homepage: string;
    languages: LanguageConfig[];
    paths: PathConfig;
    features: {
        search: boolean;
        gitChangelog: boolean;
        mermaid: boolean;
        multilingual: boolean;
        autoSidebar: boolean;
    };
}

export const projectConfig: ProjectConfig = {
    name: "vitepress-template-advanced",
    description: "A feature-rich VitePress template with advanced plugins and configurations",
    version: "1.0.0",
    author: "VitePress Template",
    license: "MIT",
    repository: {
        type: "git",
        url: "https://github.com/M1hono/M1honoVitepressTemplate",
    },
    homepage: "https://m1hono.github.io/M1honoVitepressTemplate/",

    languages: [
        {
            code: "",
            name: "zh-CN",
            displayName: "简体中文",
            isDefault: true,
            link: "/",
            label: "简体中文",
            fileName: "root.ts"
        },
    ],

    paths: {
        root: ".",
        docs: "./src",
        src: "./src",
        public: "./src/public",
        vitepress: "./.vitepress",
        config: "./.vitepress/config",
        theme: "./.vitepress/theme",
        scripts: "./.vitepress/scripts",
        utils: "./.vitepress/utils",
        cache: "./.vitepress/cache",
        build: "./.vitepress/dist",
    },

    features: {
        search: true,
        gitChangelog: true,
        mermaid: true,
        multilingual: true,
        autoSidebar: true,
    },
};

export function getLanguages(): LanguageConfig[] {
    return projectConfig.languages;
}

export function getDefaultLanguage(): LanguageConfig {
    return projectConfig.languages.find(lang => lang.isDefault) || projectConfig.languages[0];
}

export function getLanguageCodes(): string[] {
    return projectConfig.languages.map(lang => lang.code);
}

export function getLanguageByCode(code: string): LanguageConfig | undefined {
    return projectConfig.languages.find(lang => lang.code === code);
}

export function getLocalesConfig() {
    const locales: Record<string, any> = {};
    
    projectConfig.languages.forEach(lang => {
        const key = lang.isDefault ? 'root' : lang.code;
        locales[key] = {
            label: lang.label || lang.displayName,
            lang: lang.name,
            link: lang.link || (lang.isDefault ? '/' : `/${lang.code}/`)
        };
    });
    
    return locales;
}

export function getPaths(): PathConfig {
    return projectConfig.paths;
}

export function getAbsolutePath(relativePath: string): string {
    return resolve(process.cwd(), relativePath);
}

export function getDocsPath(subPath: string = ""): string {
    return resolve(process.cwd(), projectConfig.paths.docs, subPath);
}

export function getSrcPath(subPath: string = ""): string {
    return resolve(process.cwd(), projectConfig.paths.src, subPath);
}

export function getPublicPath(subPath: string = ""): string {
    return resolve(process.cwd(), projectConfig.paths.public, subPath);
}

export function getVitepressPath(subPath: string = ""): string {
    return resolve(process.cwd(), projectConfig.paths.vitepress, subPath);
}

export function isFeatureEnabled(feature: keyof typeof projectConfig.features): boolean {
    return projectConfig.features[feature];
}

export function getProjectInfo() {
    return {
        name: projectConfig.name,
        description: projectConfig.description,
        version: projectConfig.version,
        author: projectConfig.author,
        license: projectConfig.license,
        repository: projectConfig.repository,
        homepage: projectConfig.homepage,
    };
}