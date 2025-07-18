import type { DefaultTheme, HeadConfig } from "vitepress";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { 
    getProjectInfo, 
    isFeatureEnabled, 
    getLanguageCodes,
    getPaths,
} from "./project-config";
import { sidebarPlugin } from "../utils/sidebar/";
import { markdown } from "./markdown-plugins";
import {
    groupIconVitePlugin,
    localIconLoader,
} from "vitepress-plugin-group-icons";
import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite';

const projectInfo = getProjectInfo();
const projectPaths = getPaths();
import contributors from "../config/contributors.json";

interface Contributor {
    avatar: string;
    [key: string]: any;
}

function generateAvatarUrl(username: string) {
    return `https://github.com/${username}.png`;
}

/**
 * Common configuration shared across all locales
 * Language-specific configurations should be in lang/ files
 * You should  change the base, icon, 
 */
export const commonConfig = {
    title: projectInfo.name,
    description: projectInfo.description,
    base: projectInfo.base,
    i18nRouting: true,
    
    srcDir: projectPaths.src,
    outDir: projectPaths.build,
    cacheDir: projectPaths.cache,
    
    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,
    ignoreDeadLinks: true,

    head: [
        ["link", { rel: "icon", href: `${projectInfo.base}logo.svg` }],
        ["meta", { name: "keywords", content: (projectInfo as any).keyWords?.join(", ") || "vitepress, template, documentation" }],
        ["meta", { name: "author", content: projectInfo.author }],
        ["meta", { property: "og:title", content: projectInfo.name }],
        ["meta", { property: "og:description", content: projectInfo.description }],
        ["meta", { property: "og:url", content: projectInfo.homepage }],
        ["meta", { property: "og:type", content: "website" }],
    ] as HeadConfig[],

    search: isFeatureEnabled('search') ? {
        provider: "algolia",
        options: {
            appId: projectInfo.algolia.appId,
            apiKey: projectInfo.algolia.apiKey, 
            indexName: projectInfo.algolia.indexName,
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

        // footer: {
        //     message: `Built with VitePress ? | ${projectInfo.license} License`,
        //     copyright: `Copyright © ${new Date().getFullYear()} ${projectInfo.author}`,
        // },

        // editLink: {
        //     pattern: `${projectInfo.repository.url}/edit/main/docs/src/:path`,
        // },
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
            external: [
                "path",
                "fs",
                "fast-glob",
                "gray-matter"
            ]
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
                mapAuthors: (contributors as Contributor[]).map((author) => ({
                    ...author,
                    avatar: generateAvatarUrl(author.avatar),
                })),
            }),
            GitChangelogMarkdownSection(),
            sidebarPlugin({
                languages: getLanguageCodes(),
                debug: process.env.NODE_ENV === 'development',
                docsDir: projectPaths.docs,
                cacheDir: projectPaths.cache
            }),
            groupIconVitePlugin({
                customIcon: {
                    json: localIconLoader(
                        import.meta.url,
                        `../../src/public/svg/json.svg`
                    ),
                    md: localIconLoader(
                        import.meta.url,
                        `../../src/public/svg/markdown.svg`
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
                    find: /^.*\/VPButton\.vue$/,
                    replacement: fileURLToPath(
                        new URL(
                            "../theme/components/VPButton.vue",
                            import.meta.url
                        )
                    ),
                },
                {
                    find: /^.*\/VPNavBarTranslations\.vue$/,
                    replacement: fileURLToPath(
                        new URL(
                            "../theme/components/VPNavBarTranslations.vue",
                            import.meta.url
                        )
                    ),
                },
                {
                    find: "@utils",
                    replacement: resolve(projectPaths.vitepress, "utils"),
                },
                {
                    find: "@config",
                    replacement: resolve(projectPaths.vitepress, "utils/config"),
                },
                {
                    find: "@components",
                    replacement: resolve(projectPaths.vitepress, "theme/components"),
                },
            ],
        }
    },
};

export default commonConfig;