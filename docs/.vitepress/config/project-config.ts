import type { ProjectConfig } from "../utils/config/project-types";

/**
 * Main project configuration
 * Modify values below to customize your VitePress site
 */
export const projectConfig: ProjectConfig = {
    /**
     * Project name， Not important, but can be used in various places like page titles, meta tags, etc.
     */
    name: "M1honoVitepressTemplate",

    /**
     * IMPORTANT: Change this to your repository name for GitHub Pages deployment
     * If deploying to GitHub Pages under a user/organization page, set this to "/"
     * Format: "/your-repo-name/"
     */
    base: "/M1honoVitepressTemplate/",

    keyWords: ["VitePress", "template", "documentation", "wiki", "markdown"],
    version: "2.0.1",
    author: "M1hono",
    license: "CC BY-SA 4.0",

    /**
     * Favicon configuration
     * Can be a local file path (relative to base) or external URL
     */
    favicon: "logo.png", // or "favicon.ico" or "https://example.com/icon.svg"

    /**
     * Logo configuration
     * Can be a simple string path or an object with light/dark theme logos
     */
    logo: {
        light: "/logo.png",
        dark: "/logodark.png",
        alt: "Site Logo",
    },
    repository: {
        type: "git",
        url: "https://github.com/M1hono/M1honoVitepressTemplate",
    },
    homepage: "https://m1hono.github.io/M1honoVitepressTemplate/",

    defaultCurrency: "CNY",

    /**
     * Language configurations for multi-language support
     * Add or modify languages here to enable i18n functionality
     * See LanguageConfig interface below for detailed field documentation
     * Note: The 'code' field should follow the format "language-region" (e.g., "en-US", "zh-CN") for proper locale handling
     * When adding new languages, ensure you create corresponding language files (e.g., "en.ts", "zh.ts") in the config directory and update the 'fileName' field accordingly
     */
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

    /**
     * Algolia search configuration
     * Set up your Algolia credentials to enable search
     */
    algolia: {
        appId: "",
        apiKey: "",
        indexName: "",
    },

    /**
     * Search provider configuration
     * provider:
     * - "local": VitePress local search (no external service)
     * - "algolia": Algolia DocSearch
     * - "none": disable search UI
     * - custom string: resolve via search.providers[provider].resolver
     */
    search: {
        enabled: false,
        provider: "local",
        algolia: {
            // Optional: keep empty when not using Algolia.
            appId: "",
            apiKey: "",
            indexName: "",
            options: {},
        },
        local: {
            options: {
                detailedView: "auto",
                disableQueryPersistence: false,
            },
        },
        providers: {
            // Example plugin provider:
            // "my-search-plugin": {
            //     options: {},
            //     locales: {},
            //     resolver: ({ provider, providerConfig }) => ({
            //         provider: provider as "algolia" | "local",
            //         options: providerConfig?.options as any,
            //     }),
            // },
        },
    },

    /**
     * Feature toggles
     * Enable or disable features as needed
     */
    features: {
        // Global search toggle. Set false to force-disable search.
        search: true,
        gitChangelog: true,
        llms: true,
        mermaid: true,
        drawio: true,
        markmap: true,
        multilingual: true,
        autoSidebar: true,
        editLink: true,
    },

    llms: {
        domain: "https://m1hono.github.io/M1honoVitepressTemplate",
        workDir: "en-US",
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        generateLLMFriendlyDocsForEachPage: true,
        injectLLMHint: true,
    },

    /**
     * Deployment configuration
     * Set type to control deployment strategy: 'github-pages' | 'server' | 'custom'
     * Note: SSH credentials (host, username, private key) are managed via GitHub repository secrets
     */
    deployment: {
        type: "github-pages",
        server: {
            remotePath: "/var/www/html",
            port: 22,
            excludeFiles: [".git", "node_modules", "*.log"],
        },
        custom: {
            deployCommand: "",
            postDeployCommand: "",
        },
    },

    /**
     * Configuration for the "Copy Link" button
     */
    copyLinkConfig: {
        removeLanguage: false,
    },

    /**
     * Header social media links
     */
    headerSocialLinks: [
        {
            icon: "github",
            link: "https://github.com/M1hono/M1honoVitepressTemplate",
            ariaLabel: "GitHub Repository",
        },
    ],

    /**
     * Edit link configuration
     */
    editLink: {
        pattern:
            "https://github.com/M1hono/M1honoVitepressTemplate/edit/main/docs/src/:path",
        text: "Edit this page on GitHub",
    },

    /**
     * Configuration for floating social media buttons
     * Add or modify buttons that appear on the side of the page
     */
    socialButtons: [
        {
            name: "discord",
            title: "Join our Discord",
            link: "https://discord.gg/uPJHxU46td",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#ffffff" d="m22 24l-5.25-5l.63 2H4.5A2.5 2.5 0 0 1 2 18.5v-15A2.5 2.5 0 0 1 4.5 1h15A2.5 2.5 0 0 1 22 3.5V24M12 6.8c-2.68 0-4.56 1.15-4.56 1.15c1.03-.92 2.83-1.45 2.83-1.45l-.17-.17c-1.69.03-3.22 1.2-3.22 1.2c-1.72 3.59-1.61 6.69-1.61 6.69c1.4 1.81 3.48 1.68 3.48 1.68l.71-.9c-1.25-.27-2.04-1.38-2.04-1.38S9.3 14.9 12 14.9s4.58-1.28 4.58-1.28s-.79 1.11-2.04 1.38l.71.9s2.08.13 3.48-1.68c0 0 .11-3.1-1.61-6.69c0 0-1.53-1.17-3.22-1.2l-.17.17s1.8.53 2.83 1.45c0 0-1.88-1.15-4.56-1.15m-2.07 3.79c.65 0 1.18.57 1.17 1.27c0 .69-.52 1.27-1.17 1.27c-.64 0-1.16-.58-1.16-1.27c0-.7.51-1.27 1.16-1.27m4.17 0c.65 0 1.17.57 1.17 1.27c0 .69-.52 1.27-1.17 1.27c-.64 0-1.16-.58-1.16-1.27c0-.7.51-1.27 1.16-1.27Z"/></svg>',
        },
        {
            name: "github",
            title: "View on GitHub",
            link: "https://github.com/M1hono",
            icon: '<svg t="1752769057351" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1755" width="200" height="200"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" p-id="1756" fill="#ffffff"></path></svg>',
        },
    ],

    /**
     * Special path configurations for the 'Back' button
     * Defines custom navigation behavior for specific URL patterns
     */
    specialBackPaths: [
        {
            regex: "^/(\\w{2}-\\w{2}|\\w{2})/guide/advanced/\\w+",
            targetPath: "/{1}/guide/advanced/",
        },
        {
            regex: "^/(\\w{2}-\\w{2}|\\w{2})/blog/(\\d{4})/\\w+",
            targetPath: "/{1}/blog/{2}/",
        },
        {
            regex: "^/(\\w{2}-\\w{2}|\\w{2})/reference/components/\\w+",
            targetPath: "/{1}/reference/components/",
        },
    ],

    /**
     * Footer options configuration
     */
    footerOptions: {
        showIcp: false,
        showPolice: false,
        showLicense: true,
        licenseText: "CC BY-SA 4.0",
        licenseLink: "https://creativecommons.org/licenses/by-sa/4.0/",
        showSiteStats: false,
        siteStatsProvider: "busuanzi",
    },

    /**
     * Draw.io plugin configuration
     */
    drawio: {
        width: "100%",
        height: "600px",
        page: 0,
        darkMode: "auto",
        resize: true,
        pages: true,
        zoom: true,
        layers: false,
        lightbox: true,
        highlight: "#0000ff",
        transparent: false,
    },

    /**
     * Markdown Variables plugin configuration
     */
    mdVar: {
        prefix: "-%",
        noVarPrefix: "\\%",
        persistence: true,
        styling: "default",
    },

    /**
     * Giscus comment system configuration
     */
    giscus: {
        repo: "M1hono/M1honoVitepressTemplate",
        repoId: "R_kgDOPEMJTw",
        category: "General",
        categoryId: "DIC_kwDOPEMJT84CsYv-",
        mapping: "specific",
        strict: true,
        reactionsEnabled: true,
        emitMetadata: false,
        inputPosition: "top",
        theme: {
            light: "noborder_light",
            dark: "noborder_dark",
        },
        /**
         * Share comments across all language versions
         * Set to false if you want each language to have separate comment sections
         */
        sharedComments: true,
    },
};
