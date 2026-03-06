/// <reference types="vite/client" />

import { computed, type ComputedRef } from "vue";
import { useData } from "vitepress";
import { getLanguages, getDefaultLanguage, getProjectInfo } from "@config/project-config";

/** Represents a locale link for language switching */
interface LocaleLink {
    text: string;
    link: string;
}

/** Represents the current language information */
interface CurrentLang {
    label: string | undefined;
    link: string;
}

/** Return type for useLangs composable */
interface UseLangsReturn {
    localeLinks: ComputedRef<LocaleLink[]>;
    currentLang: ComputedRef<CurrentLang>;
}

/**
 * Ensures a path starts with a forward slash.
 */
function ensureStartingSlash(path: string): string {
    return /^\//.test(path) ? path : `/${path}`;
}

/**
 * Extracts the clean path by removing base and locale prefixes.
 */
function extractCleanPath(
    relativePath: string,
    basePath: string,
    languages: ReturnType<typeof getLanguages>
): string {
    let cleanPath = relativePath;

    // Remove base path if present
    const normalizedBase = basePath.replace(/^\/|\/$/g, '');
    if (normalizedBase && cleanPath.startsWith(`${normalizedBase}/`)) {
        cleanPath = cleanPath.slice(`${normalizedBase}/`.length);
    }

    // Remove locale prefix if present
    for (const lang of languages) {
        const linkPath = lang.link || `/${lang.code}/`;
        const normalizedLink = linkPath.replace(/^\/|\/$/g, '');
        if (cleanPath.startsWith(`${normalizedLink}/`)) {
            cleanPath = cleanPath.slice(`${normalizedLink}/`.length);
            break;
        }
    }

    return cleanPath;
}

/**
 * Normalizes a link for locale switching.
 */
function normalizeLink(
    link: string,
    addPath: boolean,
    path: string,
    addExt: boolean
): string {
    if (!addPath) return link;

    return link.replace(/\/$/, "") +
        ensureStartingSlash(
            path
                .replace(/(^|\/)index\.md$/, "$1")
                .replace(/\.md$/, addExt ? ".html" : "")
        );
}

/**
 * Composable for handling language switching in VitePress.
 */
export function useLangs({ correspondingLink = false } = {}): UseLangsReturn {
    const { site, localeIndex, page, theme, hash } = useData();

    const languages = getLanguages();
    const projectInfo = getProjectInfo();

    const currentLang = computed(() => ({
        label: site.value.locales[localeIndex.value]?.label,
        link:
            site.value.locales[localeIndex.value]?.link ||
            (localeIndex.value === "root" ? "/" : `/${localeIndex.value}/`),
    }));

    const localeLinks = computed(() =>
        Object.entries(site.value.locales).flatMap(([key, value]) => {
            if (currentLang.value.label === value.label) {
                return [];
            }

            const shouldAddPath = theme.value.i18nRouting !== false && correspondingLink;
            const cleanPath = extractCleanPath(
                page.value.relativePath,
                projectInfo.base,
                languages
            );

            return {
                text: value.label,
                link:
                    normalizeLink(
                        value.link || (key === "root" ? "/" : `/${key}/`),
                        shouldAddPath,
                        cleanPath,
                        !site.value.cleanUrls
                    ) + hash.value,
            };
        })
    );

    return { localeLinks, currentLang };
}

/** CSS for Traditional Chinese font rendering - uses universal selector for simplicity */
export const traditionalChineseStyles = `
    * {
        font-variant-east-asian: traditional !important;
    }
`;

/** Locales that require Traditional Chinese font rendering */
const TRADITIONAL_CHINESE_LOCALES = ['zh-TW', 'zh-HK'] as const;

const STYLE_ID = 'traditional-chinese-style';

/** Timeout for font loading check (5 seconds is a reasonable wait for font readiness) */
const FONT_LOAD_TIMEOUT_MS = 5000;

/**
 * Checks if fonts have loaded successfully.
 * Waits for the document.fonts API with a timeout to prevent indefinite blocking.
 */
export async function checkFontLoading(): Promise<void> {
    if (import.meta.env.SSR) return;

    try {
        await Promise.race([
            document.fonts.ready,
            new Promise<void>((_, reject) =>
                setTimeout(() => reject(new Error('Font loading timeout')), FONT_LOAD_TIMEOUT_MS)
            ),
        ]);
    } catch (error) {
        console.warn('[i18n] Font loading check failed:', error);
    }
}

/**
 * Applies Traditional Chinese font styling to the document.
 * Idempotent - safe to call multiple times.
 */
export function applyTraditionalChinese(): void {
    if (import.meta.env.SSR) return;

    const existingStyle = document.getElementById(STYLE_ID);
    if (existingStyle) return;

    const styleElement = document.createElement('style');
    styleElement.id = STYLE_ID;
    styleElement.textContent = traditionalChineseStyles;
    document.head.appendChild(styleElement);

    document.body.style.setProperty(
        'font-variant-east-asian',
        'traditional',
        'important'
    );
}

/**
 * Sets up language control for Traditional Chinese locales.
 * Applies font styling when the browser language matches zh-TW or zh-HK.
 */
export function setupLanguageControl(): void {
    if (import.meta.env.SSR) return;

    const browserLang = navigator.language;
    if (TRADITIONAL_CHINESE_LOCALES.includes(browserLang as typeof TRADITIONAL_CHINESE_LOCALES[number])) {
        applyTraditionalChinese();
        checkFontLoading();
    }
}
