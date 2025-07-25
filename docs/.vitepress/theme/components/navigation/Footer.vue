<script setup lang="ts">
    // @ts-nocheck
    import { useData } from "vitepress";
    import { computed, onMounted, ref, watch } from "vue";
    import {
        getProjectInfo,
        getLanguages,
        getDefaultLanguage,
    } from "../../../config/project-config";
    import type { FooterConfig } from "../../../utils/content/footer";

    const { frontmatter, lang } = useData();
    const projectInfo = getProjectInfo();

    const footerData = ref<FooterConfig | null>(null);
    const currentYear = ref("");

    const isHome = computed(() => {
        return !!(
            frontmatter.value.isHome ?? frontmatter.value.layout === "home"
        );
    });

    const loadFooterData = async (currentLang: string) => {
        const languages = getLanguages();
        const defaultLang = getDefaultLanguage();

        const targetLang =
            languages.find(
                (lang) =>
                    lang.name === currentLang ||
                    lang.code === currentLang ||
                    lang.code.split("-")[0] === currentLang
            ) || defaultLang;

        try {
            const module = await import(
                `../../../config/locale/${targetLang.code}/footer.ts`
            );
            footerData.value = module.footerConfig || module.default;
        } catch (e) {
            try {
                const fallbackModule = await import(
                    `../../../config/locale/${defaultLang.code}/footer.ts`
                );
                footerData.value = fallbackModule.footerConfig || fallbackModule.default;
            } catch (fallbackError) {
                console.error('Failed to load footer configuration:', fallbackError);
                footerData.value = null;
            }
        }
    };

    watch(() => lang.value, loadFooterData, { immediate: true });

    onMounted(() => {
        currentYear.value = new Date().getFullYear().toString();
    });

    const filteredGroups = computed(() => {
        if (!footerData.value?.group) return [];

        if (isHome.value) {
            return footerData.value.group;
        } else {
            return [];
        }
    });

    /**
     * 计算footer分组的动态布局样式
     */
    const footerLayoutStyle = computed(() => {
        const groupCount = filteredGroups.value.length;

        if (groupCount === 0) return {};

        if (groupCount === 1) {
            return {
                gridTemplateColumns: "1fr",
                justifyItems: "center",
                maxWidth: "300px",
            };
        } else if (groupCount === 2) {
            return {
                gridTemplateColumns: "repeat(2, 1fr)",
                justifyItems: "center",
                maxWidth: "600px",
            };
        } else if (groupCount === 3) {
            return {
                gridTemplateColumns: "repeat(3, 1fr)",
                justifyItems: "center",
                maxWidth: "800px",
            };
        } else {
            // 4个或更多时使用自适应布局
            return {
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                justifyItems: "start",
                maxWidth: "1000px",
            };
        }
    });

    const isExternalLink = (url: string) => {
        return /^https?:\/\//.test(url);
    };

    const getIconColor = (icon: any, isDark: boolean) => {
        if (!icon?.color) return undefined;
        return isDark ? icon.color.dark : icon.color.light;
    };

    const getIconName = (icon: any, isDark: boolean) => {
        if (typeof icon === "string") {
            return convertToMdiIcon(icon);
        }
        if (icon?.light && icon?.dark) {
            const iconName = isDark ? icon.dark : icon.light;
            return convertToMdiIcon(iconName);
        }
        return convertToMdiIcon(icon?.icon || icon || "mdi-help");
    };

    const convertToMdiIcon = (iconName: string) => {
        if (iconName.startsWith("mdi:")) {
            return iconName.replace("mdi:", "mdi-");
        }
        if (iconName.startsWith("fluent:")) {
            const fluentToMdi: Record<string, string> = {
                "fluent:globe-shield-48-filled": "mdi-shield-check",
                "fluent:shield-checkmark-48-filled": "mdi-security",
            };
            return fluentToMdi[iconName] || "mdi-shield-check";
        }
        if (iconName.startsWith("bx:")) {
            return iconName.replace("bx:link", "mdi-link");
        }
        if (iconName.startsWith("solar:")) {
            return iconName.replace("solar:book-bold", "mdi-book");
        }
        if (iconName.startsWith("ri:")) {
            return iconName.replace("ri:", "mdi-");
        }
        if (iconName.startsWith("mdi-")) {
            return iconName;
        }
        return `mdi-${iconName}`;
    };
</script>

<template>
    <footer
        class="smart-footer"
        :class="{ 'no-groups': !filteredGroups.length }"
    >
        <div
            v-if="filteredGroups.length"
            class="footer-groups"
            :style="footerLayoutStyle"
        >
            <section
                v-for="(group, i) in filteredGroups"
                :key="group.title + i"
                class="footer-group"
            >
                <h3 class="group-title">
                    <v-icon
                        v-if="group.icon"
                        :icon="getIconName(group.icon, false)"
                        :style="{ color: getIconColor(group.icon, false) }"
                        size="small"
                        class="title-icon"
                    ></v-icon>
                    {{ group.title }}
                </h3>
                <ul class="group-links">
                    <li
                        v-for="(link, j) in group.links"
                        :key="link.name + j"
                        class="link-item"
                    >
                        <v-icon
                            v-if="link.icon"
                            :icon="getIconName(link.icon, false)"
                            :style="{ color: getIconColor(link.icon, false) }"
                            size="small"
                            class="link-icon"
                        ></v-icon>
                        <a
                            :href="link.link"
                            :rel="link.rel"
                            :target="
                                link.target ||
                                (isExternalLink(link.link)
                                    ? '_blank'
                                    : undefined)
                            "
                            class="footer-link"
                        >
                            {{ link.name }}
                            <v-icon
                                v-if="isExternalLink(link.link) && !link.noIcon"
                                icon="mdi-open-in-new"
                                size="x-small"
                                class="external-icon"
                            ></v-icon>
                        </a>
                    </li>
                </ul>
            </section>
        </div>

        <div class="footer-info">
            <div class="footer-row">
                <div
                    v-if="
                        projectInfo.footerOptions.showIcp &&
                        footerData?.beian?.icp?.number
                    "
                    class="info-item"
                >
                    <v-icon
                        v-if="
                            footerData.beian?.showIcon &&
                            footerData.beian.icp.icon
                        "
                        :icon="getIconName(footerData.beian.icp.icon, false)"
                        :style="{
                            color: getIconColor(
                                footerData.beian.icp.icon,
                                false
                            ),
                        }"
                        size="small"
                    ></v-icon>
                    <a
                        :href="
                            footerData.beian.icp.link ||
                            'https://beian.miit.gov.cn/'
                        "
                        :rel="footerData.beian.icp.rel || 'nofollow'"
                        :target="footerData.beian.icp.target"
                        class="info-link"
                    >
                        {{ footerData.beian.icp.number }}
                    </a>
                </div>

                <div
                    v-if="
                        projectInfo.footerOptions.showPolice &&
                        footerData?.beian?.police?.number
                    "
                    class="info-item"
                >
                    <v-icon
                        v-if="
                            footerData.beian?.showIcon &&
                            footerData.beian.police.icon
                        "
                        :icon="getIconName(footerData.beian.police.icon, false)"
                        :style="{
                            color: getIconColor(
                                footerData.beian.police.icon,
                                false
                            ),
                        }"
                        size="small"
                    ></v-icon>
                    <a
                        :href="
                            footerData.beian.police.link ||
                            'https://beian.mps.gov.cn/'
                        "
                        :rel="footerData.beian.police.rel"
                        :target="footerData.beian.police.target"
                        class="info-link"
                    >
                        {{ footerData.beian.police.number }}
                    </a>
                </div>

                <div
                    v-if="projectInfo.footerOptions.showLicense"
                    class="info-item"
                >
                    <v-icon icon="mdi-license" size="small"></v-icon>
                    <a
                        :href="projectInfo.footerOptions.licenseLink"
                        rel="noopener noreferrer"
                        target="_blank"
                        class="info-link"
                    >
                        {{ projectInfo.footerOptions.licenseText }}
                    </a>
                </div>
            </div>

            <div v-if="footerData?.author?.name" class="copyright-row">
                <v-icon
                    :icon="
                        getIconName(
                            footerData.author.icon || 'mdi:copyright',
                            false
                        )
                    "
                    size="small"
                ></v-icon>
                {{
                    footerData.author.startYear
                        ? footerData.author.startYear + " - "
                        : ""
                }}{{ currentYear }}
                <a
                    :href="
                        footerData.author.link ||
                        `https://github.com/${footerData.author.name}`
                    "
                    :rel="footerData.author.rel"
                    :target="footerData.author.target"
                    class="author-link"
                >
                    {{ footerData.author.name }}
                </a>
                {{ footerData.author.text || "All Rights Reserved." }}
            </div>
        </div>
    </footer>
</template>

<style scoped>
    :root {
    --footer-bg-light: rgba(248, 248, 248, 0.75);
    --footer-bg-dark: rgba(16, 16, 20, 0.75);
    --footer-border-light: rgba(224, 224, 224, 0.5);
    --footer-border-dark: rgba(82, 82, 89, 0.5);
    --footer-highlight-light: rgba(255, 255, 255, 0.2);
    --footer-highlight-dark: rgba(255, 255, 255, 0.12);
    --footer-shadow-light: rgba(0, 0, 0, 0.03);
    --footer-shadow-dark: rgba(0, 0, 0, 0.15);
    --footer-text-primary-light: rgb(88, 88, 95);
    --footer-text-primary-dark: rgb(245, 245, 250);
    --footer-text-secondary-light: rgb(160, 160, 167);
    --footer-text-secondary-dark: rgb(200, 200, 210);
}

    .dark {
        --footer-bg: var(--footer-bg-dark);
        --footer-border: var(--footer-border-dark);
        --footer-highlight: var(--footer-highlight-dark);
        --footer-shadow: var(--footer-shadow-dark);
        --footer-text-primary: var(--footer-text-primary-dark);
        --footer-text-secondary: var(--footer-text-secondary-dark);
    }

    :root:not(.dark) {
        --footer-bg: var(--footer-bg-light);
        --footer-border: var(--footer-border-light);
        --footer-highlight: var(--footer-highlight-light);
        --footer-shadow: var(--footer-shadow-light);
        --footer-text-primary: var(--footer-text-primary-light);
        --footer-text-secondary: var(--footer-text-secondary-light);
    }

    .smart-footer {
        background: var(--footer-bg);
        backdrop-filter: blur(20px) saturate(1.2) brightness(1.02);
        -webkit-backdrop-filter: blur(20px) saturate(1.2) brightness(1.02);
        border-top: 1px solid var(--footer-border);
        box-shadow: inset 0 1px 0 var(--footer-highlight),
            inset 0 -1px 0 rgba(0, 0, 0, 0.05), 0 0 0 0.5px var(--footer-border),
            0 8px 32px var(--footer-shadow);
        position: relative;
        padding: 32px 24px 24px;
        overflow: hidden;
    }

    :root:not(.dark) .smart-footer::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fineNoise'%3E%3CfeTurbulence type='turbulence' baseFrequency='2.0' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fineNoise)' opacity='0.02'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperTexture'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03' numOctaves='4' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='white' surfaceScale='0.8'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperTexture)' opacity='0.015'/%3E%3C/svg%3E"),
            radial-gradient(
                circle at 25% 25%,
                rgba(var(--vp-c-brand-rgb, 24, 160, 251), 0.03) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 75% 25%,
                rgba(var(--vp-c-brand-rgb, 24, 160, 251), 0.02) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 50% 75%,
                rgba(var(--vp-c-brand-rgb, 24, 160, 251), 0.025) 0%,
                transparent 50%
            ),
            linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.02) 0%,
                rgba(0, 0, 0, 0.015) 100%
            ),
            linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.008) 0%,
                transparent 100%
            );
        pointer-events: none;
        opacity: 0.8;
    }

    .dark .smart-footer::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilterDark'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.15 0 0 0 0 0.15 0 0 0 0 0.15 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilterDark)' opacity='0.08'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fineNoiseDark'%3E%3CfeTurbulence type='turbulence' baseFrequency='2.0' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.08 0 0 0 0 0.08 0 0 0 0 0.08 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fineNoiseDark)' opacity='0.04'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperTextureDark'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03' numOctaves='4' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23444' surfaceScale='0.8'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperTextureDark)' opacity='0.02'/%3E%3C/svg%3E"),
            radial-gradient(
                circle at 25% 25%,
                rgba(var(--vp-c-brand-rgb, 24, 160, 251), 0.05) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 75% 25%,
                rgba(var(--vp-c-brand-rgb, 24, 160, 251), 0.04) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 50% 75%,
                rgba(var(--vp-c-brand-rgb, 24, 160, 251), 0.045) 0%,
                transparent 50%
            ),
            linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.015) 0%,
                rgba(0, 0, 0, 0.025) 100%
            ),
            linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.008) 0%,
                transparent 100%
            );
        pointer-events: none;
        opacity: 0.85;
    }

    :root:not(.dark) .smart-footer::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 20%,
            rgba(255, 255, 255, 0.3) 80%,
            transparent 100%
        );
        pointer-events: none;
    }

    .dark .smart-footer::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 20%,
            rgba(255, 255, 255, 0.1) 80%,
            transparent 100%
        );
        pointer-events: none;
    }

    .footer-groups {
        display: grid;
        gap: 48px;
        margin: 0 auto 24px;
        transition: all 0.3s ease;
        width: 100%;
    }

    .footer-groups[style*="justify-items: center"] .footer-group {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .footer-groups[style*="justify-items: center"] .group-links {
        align-items: center;
    }

    .footer-groups[style*="justify-items: center"] .link-item {
        justify-content: center;
    }

    .footer-group {
        text-align: left;
        width: 100%;
        min-width: 0;
    }

    .group-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--footer-text-primary);
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .group-links {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .link-item {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .footer-link {
        color: var(--footer-text-secondary);
        text-decoration: none;
        font-size: 12px;
        font-weight: 400;
        transition: color 0.25s ease;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        line-height: 1.4;
    }

    .footer-link:hover {
        color: var(--vp-c-brand-1);
    }

    .title-icon,
    .link-icon {
        margin-right: 6px !important;
    }

    .external-icon {
        margin-left: 4px !important;
        opacity: 0.7;
    }

    .footer-info {
        text-align: center;
        padding-top: 24px;
        border-top: 1px solid var(--vp-c-divider);
    }

    .smart-footer.no-groups .footer-info {
        padding-top: 0;
        border-top: none;
    }

    .footer-row {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 24px;
        flex-wrap: wrap;
        margin-bottom: 12px;
    }

    .info-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 400;
        color: var(--footer-text-secondary);
    }

    .info-link {
        color: inherit;
        text-decoration: none;
        transition: color 0.25s ease;
    }

    .info-link:hover {
        color: var(--vp-c-brand-1);
    }

    .copyright-row {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        font-weight: 400;
        color: var(--footer-text-primary);
        margin-top: 8px;
    }

    .author-link {
        color: var(--vp-c-brand-1);
        text-decoration: none;
        font-weight: 500;
        transition: opacity 0.25s ease;
    }

    .author-link:hover {
        opacity: 0.8;
    }

    @media (max-width: 768px) {
        .smart-footer {
            padding: 24px 16px 20px;
        }

        .footer-groups {
            gap: 32px 24px;
            margin-bottom: 20px;
        }

        .footer-groups[style*="grid-template-columns: 1fr"] {
            max-width: 250px !important;
        }

        .footer-groups[style*="grid-template-columns: repeat(2, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
            max-width: 400px !important;
        }

        .footer-groups[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
            justify-items: center !important;
            max-width: 400px !important;
        }

        .footer-info {
            padding-top: 16px;
        }

        .footer-row {
            flex-direction: column;
            gap: 10px;
            margin-bottom: 12px;
        }

        .copyright-row {
            flex-wrap: wrap;
            text-align: center;
            line-height: 1.5;
            justify-content: center;
        }
    }

    @media (max-width: 480px) {
        .footer-groups {
            grid-template-columns: 1fr;
            gap: 20px;
        }

        .group-title {
            font-size: 13px;
        }

        .footer-link {
            font-size: 11px;
        }
    }
</style>
