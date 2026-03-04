//@ts-nocheck
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme-without-fonts";
import vitepressNprogress from "vitepress-plugin-nprogress";
import { useData, useRoute, inBrowser, withBase } from "vitepress";
import "./styles/index.css";
import "virtual:group-icons.css";
import "markdown-it-multiple-choice/style.css";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import TresPlugin from "@tresjs/core";
import vuetify from "./vuetify";
import { nextTick, onMounted, onUnmounted, watch } from "vue";
import mermaid from "mermaid";
import {
    NolebaseEnhancedReadabilitiesMenu,
    NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client";
import { NolebaseInlineLinkPreviewPlugin } from "@nolebase/vitepress-plugin-inline-link-preview/client";
import { NolebaseGitChangelogPlugin } from "@nolebase/vitepress-plugin-git-changelog/client";
import { NolebaseHighlightTargetedHeading } from "@nolebase/vitepress-plugin-highlight-targeted-heading/client";
import "@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css";
import mdVar from "vitepress-md-var";

import Layout from "./Layout.vue";
import VPHero from "./components/VPHero.vue";
import { bindFancybox, destroyFancybox } from "./components/media/ImgViewer";
import { Animation, Preview, NotFound, Buttons } from "./components/ui";
import { comment, PageTags } from "./components/content";
import { ResponsibleEditor } from "./components/content";
import Footer from "./components/navigation/Footer.vue";
import VPBreadcrumb from "./components/navigation/Breadcrumb/VPBreadcrumb.vue";

import { setupLanguageControl } from "@utils/i18n/languageControl";
import { initMermaidConfig } from "@utils/charts/mermaid";
import { registerComponents } from "@utils/vitepress/components";
import { getProjectInfo, isFeatureEnabled } from "@config/project-config";
import { setupMultipleChoice } from "markdown-it-multiple-choice";
import utils from "../utils";

export default {
    extends: DefaultTheme,
    Layout: () => {
        const props: Record<string, any> = {};
        const { frontmatter } = useData();

        if (frontmatter.value?.layoutClass) {
            props.class = frontmatter.value.layoutClass;
        }

        return h(Animation, props, {
            slot: () =>
                h(DefaultTheme.Layout, null, {
                    "aside-outline-after": () => null,
                    "doc-after": () => [h(Buttons), h(comment)],
                    "doc-footer-before": () => h(ResponsibleEditor),
                    "layout-bottom": () => h(Footer),
                    "not-found": () => [h(NotFound)],
                    "nav-bar-content-after": () =>
                        h(NolebaseEnhancedReadabilitiesMenu),
                    "nav-screen-content-after": () =>
                        h(NolebaseEnhancedReadabilitiesScreenMenu),
                    "doc-before": () => [
                        h(VPBreadcrumb),
                        h(Preview),
                        h(PageTags),
                    ],
                }),
        });
    },

    async enhanceApp(ctx) {
        if (!import.meta.env.SSR) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href =
                "//cdn.bootcss.com/font-awesome/4.3.0/css/font-awesome.min.css";
            document.head.appendChild(link);

            ctx.app.use(vuetify);
            ctx.app.use(NolebaseInlineLinkPreviewPlugin);
            ctx.app.use(NolebaseGitChangelogPlugin);
        }

        ctx.app.use(TresPlugin);
        DefaultTheme.enhanceApp(ctx);
        vitepressNprogress(ctx);
        enhanceAppWithTabs(ctx.app);
        registerComponents(ctx.app);
    },

    setup() {
        const route = useRoute();
        const { isDark, frontmatter } = useData();
        const projectInfo = getProjectInfo();
        const appliedFrontmatterCssVars = new Set<string>();
        let cssVarScopeElement: HTMLElement | null = null;
        let cssVarsApplyFrame: number | null = null;

        const resolveThemeValue = (value: unknown): unknown => {
            if (value === undefined || value === null) return undefined;
            if (typeof value !== "object" || Array.isArray(value)) return value;

            const themed = value as {
                light?: unknown;
                dark?: unknown;
                value?: unknown;
            };

            return isDark.value
                ? (themed.dark ?? themed.light ?? themed.value)
                : (themed.light ?? themed.dark ?? themed.value);
        };

        const toCssValue = (value: unknown): string | undefined => {
            if (value === undefined || value === null) return undefined;
            if (typeof value === "string") return value;
            if (typeof value === "number") return String(value);
            if (typeof value === "boolean") return value ? "1" : "0";
            if (Array.isArray(value))
                return value.map((item) => String(item)).join(" ");
            return String(value);
        };

        const clearFrontmatterCssVars = () => {
            if (!inBrowser) return;
            const target = cssVarScopeElement;
            if (!target) return;
            for (const key of appliedFrontmatterCssVars) {
                target.style.removeProperty(key);
            }
            appliedFrontmatterCssVars.clear();
        };

        const resolvePageCssScope = (): HTMLElement | null => {
            if (!inBrowser) return null;
            return (
                (document.querySelector(".VPContent") as HTMLElement | null) ||
                (document.querySelector(".Layout") as HTMLElement | null) ||
                (document.querySelector(".VPDoc") as HTMLElement | null)
            );
        };

        const scheduleFrontmatterCssVarsApply = () => {
            if (!inBrowser) return;
            if (cssVarsApplyFrame !== null) {
                window.cancelAnimationFrame(cssVarsApplyFrame);
            }
            cssVarsApplyFrame = window.requestAnimationFrame(() => {
                cssVarsApplyFrame = null;
                applyFrontmatterCssVars();
            });
        };

        const applyThemeAssetCssVars = () => {
            if (!inBrowser) return;
            document.documentElement.style.setProperty(
                "--vp-github-bg-image-light",
                `url("${withBase("/icon/github.png")}")`,
            );
            document.documentElement.style.setProperty(
                "--vp-github-bg-image-dark",
                `url("${withBase("/icon/github_dark.png")}")`,
            );
        };

        const applyFrontmatterCssVars = () => {
            if (!inBrowser) return;

            const nextScope = resolvePageCssScope();
            if (!nextScope) {
                scheduleFrontmatterCssVarsApply();
                return;
            }

            if (cssVarScopeElement && cssVarScopeElement !== nextScope) {
                clearFrontmatterCssVars();
            }
            cssVarScopeElement = nextScope;

            clearFrontmatterCssVars();

            const cssVars = frontmatter.value?.cssVars as
                | Record<string, unknown>
                | undefined;
            const mergedVars =
                cssVars && typeof cssVars === "object" ? cssVars : {};

            for (const [rawKey, rawValue] of Object.entries(mergedVars)) {
                const key = rawKey.startsWith("--") ? rawKey : `--${rawKey}`;
                const resolved = resolveThemeValue(rawValue);
                const cssValue = toCssValue(resolved);
                if (cssValue === undefined) continue;
                cssVarScopeElement.style.setProperty(key, cssValue);
                appliedFrontmatterCssVars.add(key);
            }
        };

        watch(
            isDark,
            (dark) => {
                if (inBrowser) {
                    vuetify.theme.global.name.value = dark ? "dark" : "light";
                }
            },
            { immediate: true },
        );

        watch(
            () => [route.path, isDark.value, frontmatter.value?.cssVars],
            () => applyFrontmatterCssVars(),
            { immediate: true, deep: true, flush: "post" },
        );

        watch(
            () => route.path,
            () => applyThemeAssetCssVars(),
            { immediate: true },
        );

        onMounted(() => {
            applyThemeAssetCssVars();
            nextTick(() => {
                applyFrontmatterCssVars();
                scheduleFrontmatterCssVarsApply();
            });
            setupMultipleChoice();
            if (!import.meta.env.SSR) {
                setupLanguageControl();
                initMermaidConfig();
                if (isFeatureEnabled("mermaid")) {
                    mermaid.init(undefined, ".mermaid");
                }
                bindFancybox();

                const mdVarConfig: any = {
                    prefix: projectInfo.mdVar.prefix,
                    noVarPrefix: projectInfo.mdVar.noVarPrefix,
                    styling: projectInfo.mdVar.styling,
                };

                if (projectInfo.mdVar.persistence) {
                    mdVarConfig.loadVar = (varName: string) =>
                        localStorage.getItem("MD_" + varName);
                    mdVarConfig.storeVar = (varName: string, varVal: string) =>
                        localStorage.setItem("MD_" + varName, varVal);
                }

                mdVar(route, mdVarConfig);

                if (
                    projectInfo.footerOptions.showSiteStats &&
                    projectInfo.footerOptions.siteStatsProvider === "busuanzi"
                ) {
                    utils.vitepress.initBusuanzi();
                }

                watch(
                    () => route.path,
                    () => {
                        setupLanguageControl();
                        if (window.busuanzi) {
                            window.busuanzi.fetch();
                        }
                    },
                );
            }
        });

        onUnmounted(() => {
            destroyFancybox();
            clearFrontmatterCssVars();
            if (cssVarsApplyFrame !== null) {
                window.cancelAnimationFrame(cssVarsApplyFrame);
                cssVarsApplyFrame = null;
            }
        });
    },
} satisfies Theme;
