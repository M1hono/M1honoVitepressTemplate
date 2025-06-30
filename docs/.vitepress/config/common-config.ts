import type { DefaultTheme, HeadConfig, UserConfig } from "vitepress";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { projectConfig, getProjectInfo, isFeatureEnabled, getLanguageCodes, getSrcPath, getVitepressPath } from "../utils/config";
import { getSidebarSync, sidebarPlugin } from "../utils/sidebar/";
import { markdown } from "./markdown-plugins";
import {
    groupIconVitePlugin,
    localIconLoader,
} from "vitepress-plugin-group-icons";
import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite';

const projectInfo = getProjectInfo();
import contributors from "../config/contributors.json";
function generateAvatarUrl(username: string) {
    return `https://github.com/${username}.png`;
}

/**
 * Common configuration shared across all locales
 * Language-specific configurations should be in lang/ files
 */
export const commonConfig = {
    title: projectInfo.name,
    description: projectInfo.description,
    base: "/template/",
    
    srcDir: "./src",
    outDir: "./.vitepress/dist",
    cacheDir: "./.vitepress/cache",
    
    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,
    ignoreDeadLinks: true,

    head: [
        ["link", { rel: "icon", href: "/M1honoVitepressTemplate/logo.svg" }],
        ["meta", { name: "keywords", content: "VitePress, template, documentation, wiki, markdown" }],
        ["meta", { name: "author", content: projectInfo.author }],
        ["meta", { property: "og:title", content: projectInfo.name }],
        ["meta", { property: "og:description", content: projectInfo.description }],
        ["meta", { property: "og:url", content: projectInfo.homepage }],
        ["meta", { property: "og:type", content: "website" }],
    ] as HeadConfig[],

    search: isFeatureEnabled('search') ? {
        provider: "algolia",
        options: {
            appId: "YOUR_APP_ID",
            apiKey: "YOUR_API_KEY", 
            indexName: "your_index_name",
        }
    } : undefined,

    markdown: { ...markdown },

    themeConfig: {
        logo: "/logo.svg",
        
        socialLinks: [
            {
                icon: "github",
                link: projectInfo.repository.url,
            },
        ],

        footer: {
            message: `Built with VitePress | ${projectInfo.license} License`,
            copyright: `Copyright © ${new Date().getFullYear()} ${projectInfo.author}`,
        },

        editLink: {
            pattern: `${projectInfo.repository.url}/edit/main/docs/src/:path`,
        },
    } satisfies DefaultTheme.Config,

    vite: {
        optimizeDeps: {
            exclude: [
                "@nolebase/vitepress-plugin-git-changelog",
                "@nolebase/vitepress-plugin-enhanced-readabilities",
                "@nolebase/vitepress-plugin-inline-link-preview",
                "shiki-magic-move",
                "virtual:nolebase-git-changelog"
            ],
            include: [
                'vue',
                '@vueuse/core',
                'mermaid',
                'vitepress-plugin-nprogress',
                'vitepress-plugin-tabs/client',
                '@lite-tree/vue'
            ]
        },
        build: {
            chunkSizeWarningLimit: 1500,
            target: 'esnext',
            minify: 'esbuild'
        },
        ssr: {
            noExternal: [
                "vuetify",
                "@nolebase/*",
                "vitepress-plugin-tabs",
                "shiki-magic-move"
            ],
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern",
                },
            },
        },
        define: {
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: process.env.NODE_ENV === 'development',
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        },
        plugins: [
            GitChangelog({
                repoURL: () => projectInfo.repository.url,
                mapAuthors: contributors.map((author) => ({
                    ...author,
                    avatar: generateAvatarUrl(author.avatar),
                })),
            }),
            GitChangelogMarkdownSection(),
            sidebarPlugin({
                languages: getLanguageCodes(),
                debug: process.env.NODE_ENV === 'development',
                docsDir: './src',
                cacheDir: getVitepressPath('cache/sidebar')
            }),
            groupIconVitePlugin({
                customIcon: {
                    mcmeta: localIconLoader(
                        import.meta.url,
                        `../../src/public/svg/minecraft.svg`
                    ),
                    json: localIconLoader(
                        import.meta.url,
                        `../../src/public/svg/json.svg`
                    ),
                    md: localIconLoader(
                        import.meta.url,
                        `../../src/public/svg/markdown.svg`
                    ),
                    kubejs: localIconLoader(
                        import.meta.url,
                        `../../src/public/svg/kubejs.svg`
                    ),
                    js: "logos:javascript",
                    sh: localIconLoader(
                        import.meta.url,
                        `../../src/public/svg/powershell.svg`
                    ),
                    npm: localIconLoader(
                        import.meta.url,
                        `../../src/public/svg/npm.svg`
                    ),
                    neoforge: localIconLoader(
                        import.meta.url,
                        `../../src/public/svg/neoforge.svg`
                    ),
                    forge: localIconLoader(
                        import.meta.url,
                        `../../src/public/svg/forge.svg`
                    ),
                    fabric: localIconLoader(
                        import.meta.url,
                        `../../src/public/svg/fabric.svg`
                    ),
                    ts: "logos:typescript-icon-round",
                    java: "logos:java",
                    css: "logos:css-3",
                    git: "logos:git-icon",
                },
            })
        ],
        resolve: {
            alias: [
                {
                    find: /^.*\/VPHero\.vue$/,
                    replacement: fileURLToPath(
                        new URL(
                            "../theme/components/VPHero.vue",
                            import.meta.url
                        )
                    ),
                },
                {
                    find: /^.*\/VPFeatures\.vue$/,
                    replacement: fileURLToPath(
                        new URL(
                            "../theme/components/VPFeatures.vue",
                            import.meta.url
                        )
                    ),
                },
                {
                    find: "@utils",
                    replacement: resolve(__dirname, "../utils"),
                },
                {
                    find: "@config",
                    replacement: resolve(__dirname, "../utils/config"),
                },
                {
                    find: "@components",
                    replacement: resolve(__dirname, "../theme/components"),
                },
            ],
        }
    },
};

export default commonConfig;