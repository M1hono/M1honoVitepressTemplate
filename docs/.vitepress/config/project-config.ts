export const projectConfig: ProjectConfig = {
    name: "vitepress-M1hono-template",
    // Remember to change this to your own repository name
    base: "/M1honoVitepressTemplate/",
    keyWords: ["VitePress", "template", "documentation", "wiki", "markdown"],
    description: "A feature-rich VitePress template with advanced plugins and configurations",
    version: "1.0.0",
    author: "M1hono",
    license: "MIT",
    repository: {
        type: "git",
        url: "https://github.com/M1hono/M1honoVitepressTemplate",
    },
    homepage: "https://m1hono.github.io/M1honoVitepressTemplate/",

    /**
     * @description The default currency for financial calculations and display.
     * @type {string}
     */
    defaultCurrency: "CNY",

    languages: [
        {
            code: "zh-CN",
            name: "zh-CN",
            displayName: "简体中文",
            isDefault: false,
            link: "/zh-CN/",
            label: "简体中文",
            fileName: "zh.ts",
            giscusLang: "zh-CN",
        },
        {
            code: "en-US",
            name: "en-US",
            displayName: "English",
            isDefault: true,
            link: "/en-US/",
            label: "English",
            fileName: "en.ts",
            giscusLang: "en",
        }
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
        search: false,
        gitChangelog: true,
        mermaid: true,
        multilingual: true,
        autoSidebar: true,
        sidebarTags: true,
    },
    
    sidebarTags: {
        enabled: true,
        globalStyles: {
            size: 'xs',
            variant: 'soft',
            rounded: 'md'
        },
        tags: [
            {
                field: 'method',
                position: 'before',
                size: 'xs',
                variant: 'solid',
                rounded: 'sm',
                valueStyles: {
                    'GET': { color: 'green' },
                    'POST': { color: 'blue' },
                    'PUT': { color: 'orange' },
                    'PATCH': { color: 'yellow' },
                    'DELETE': { color: 'red' },
                    'HEAD': { color: 'gray' },
                    'OPTIONS': { color: 'purple' }
                }
            },
            {
                field: 'status',
                position: 'after',
                size: 'xs',
                variant: 'soft',
                color: 'gray',
                rounded: 'lg',
                valueStyles: {
                    'stable': { color: 'green' },
                    'beta': { color: 'orange' },
                    'experimental': { color: 'red' },
                    'deprecated': { color: 'gray' },
                    'draft': { color: 'yellow' }
                }
            },
            {
                field: 'version',
                position: 'after',
                size: 'xs',
                variant: 'outline',
                color: 'blue',
                rounded: 'md',
                prefix: 'v'
            },
            {
                field: 'difficulty',
                position: 'after',
                size: 'xs',
                variant: 'outline',
                color: 'warning',
                rounded: 'md',
                valueStyles: {
                    'easy': { color: 'green' },
                    'medium': { color: 'yellow' },
                    'hard': { color: 'red' },
                    'beginner': { color: 'green' },
                    'intermediate': { color: 'yellow' },
                    'advanced': { color: 'red' },
                    'expert': { color: 'purple' }
                }
            },
            {
                field: 'category',
                position: 'before',
                size: 'xs',
                variant: 'soft',
                color: 'primary',
                rounded: 'md',
                prefix: '[',
                suffix: ']',
                transform: true, // Will use uppercase transform
                valueStyles: {
                    'api': { color: 'blue' },
                    'guide': { color: 'green' },
                    'tutorial': { color: 'purple' },
                    'reference': { color: 'orange' },
                    'example': { color: 'cyan' }
                }
            },
            {
                field: 'featured',
                position: 'before',
                size: 'sm',
                variant: 'solid',
                color: 'warning',
                rounded: 'full',
                condition: 'truthy', // Only show if value is truthy
                transform: 'emoji', // Will show 🔥
                customEmoji: '🔥'
            },
            {
                field: 'priority',
                position: 'before',
                size: 'sm',
                variant: 'solid',
                color: 'error',
                rounded: 'full',
                prefix: '优先级: ',
                suffix: '!',
                condition: 'exists' // Only show if field exists
            },
            {
                field: 'language',
                position: 'before',
                size: 'xs',
                variant: 'solid',
                color: 'gray',
                rounded: 'sm',
                valueStyles: {
                    'javascript': { color: 'amber' },
                    'typescript': { color: 'blue' },
                    'python': { color: 'green' },
                    'java': { color: 'red' },
                    'go': { color: 'cyan' },
                    'rust': { color: 'orange' }
                }
            },
            {
                field: 'score',
                position: 'after',
                size: 'xs',
                variant: 'solid',
                color: 'gray',
                rounded: 'full',
                condition: 'gte80',
                transform: 'scoreFormat',
                valueStyles: {
                    '90': { color: 'green' },
                    '80': { color: 'yellow' }
                }
            }
        ]
    },
    
    customSnippetFileNames: [],
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

export function getDefaultCurrency(): string {
    return projectConfig.defaultCurrency;
}

export function getPaths(): PathConfig {
    return projectConfig.paths;
}

export function isFeatureEnabled(feature: keyof typeof projectConfig.features): boolean {
    return projectConfig.features[feature];
}

export function getProjectInfo() {
    return {
        name: projectConfig.name,
        base: projectConfig.base,
        description: projectConfig.description,
        version: projectConfig.version,
        author: projectConfig.author,
        license: projectConfig.license,
        repository: projectConfig.repository,
        homepage: projectConfig.homepage,
    };
}

export function getSidebarTagsConfig() {
    return projectConfig.sidebarTags;
}

export function isSidebarTagsEnabled(): boolean {
    return projectConfig.features.sidebarTags && projectConfig.sidebarTags.enabled;
}

export function getTagsConfigForLanguage(langCode: string): any[] {
    const config = projectConfig.sidebarTags;
    
    if (!config.enabled) {
        return [];
    }
    
    // Return all configured tags
    return config.tags;
}

export interface LanguageConfig {
    code: string;
    name: string;
    displayName: string;
    isDefault?: boolean;
    link?: string;
    label?: string;
    fileName?: string;
    giscusLang?: string;
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
    base: string;
    keyWords: string[];
    description: string;
    version: string;
    author: string;
    license: string;
    repository: {
        type: string;
        url: string;
    };
    homepage: string;
    defaultCurrency: string;
    languages: LanguageConfig[];
    paths: PathConfig;
    features: {
        search: boolean;
        gitChangelog: boolean;
        mermaid: boolean;
        multilingual: boolean;
        autoSidebar: boolean;
        sidebarTags: boolean;
    };
    sidebarTags: {
        enabled: boolean;
        globalStyles: {
            size: string;
            variant: string;
            rounded: string;
        };
        tags: Array<{
            field: string;
            position: 'before' | 'after';
            size: string;
            variant: string;
            color?: string;
            rounded: string;
            prefix?: string;
            suffix?: string;
                         transform?: boolean | string;
            customEmoji?: string;
            condition?: string;
            valueStyles?: Record<string, { color: string }>;
        }>;
    };
    customSnippetFileNames?: string[];
}