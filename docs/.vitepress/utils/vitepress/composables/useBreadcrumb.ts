import { computed } from "vue";
import { useRoute, useData } from "vitepress";
import { navConfig } from "../../../utils/config/nav-config";
import { projectConfig } from "../../../config/project-config";
import {
    getLangCodeFromVitepressLang,
    getLanguageByCode,
} from "../../../utils/config/project-api";

export interface BreadcrumbItem {
    text: string;
    link?: string;
}

function isExternalUrl(url: string) {
    return /^(https?:)?\/\//.test(url);
}

function ensureLeadingSlash(path: string) {
    return path.startsWith("/") ? path : `/${path}`;
}

function normalizeBase(base: string | undefined) {
    if (!base || base === "/") return "/";
    return `/${base.replace(/^\/|\/$/g, "")}/`;
}

function stripBase(path: string, base: string) {
    const normalizedPath = ensureLeadingSlash(path);
    if (base === "/") return normalizedPath;
    if (normalizedPath === base.slice(0, -1)) return "/";
    if (normalizedPath.startsWith(base)) {
        return ensureLeadingSlash(normalizedPath.slice(base.length));
    }
    return normalizedPath;
}

function normalizeInternalPath(path: string) {
    let normalized = ensureLeadingSlash(path.split(/[?#]/)[0] || "/");
    normalized = normalized.replace(/\/index(?:\.html|\.md)?$/i, "/");
    normalized = normalized.replace(/\.md$/i, ".html");
    if (normalized !== "/" && !normalized.endsWith("/")) {
        normalized += "/";
    }
    return normalized;
}

function getPathVariants(path: string) {
    const normalized = normalizeInternalPath(path);
    const noTrailingSlash =
        normalized.length > 1 ? normalized.replace(/\/$/, "") : normalized;
    return new Set([
        normalized,
        noTrailingSlash,
        `${noTrailingSlash}.html`,
        normalized.replace(/\/$/, ".html"),
    ]);
}

function humanizeSegment(segment: string) {
    const clean = segment.replace(/\.html$/i, "");
    return clean
        .split("-")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export function useBreadcrumb() {
    const route = useRoute();
    const { lang, site, page } = useData();

    // Build a Set of all navigable page paths from the VitePress pages manifest.
    // A path is considered valid (clickable) only if a page exists exactly there.
    const knownPagePaths = computed<Set<string>>(() => {
        const pages: string[] = (site.value as any).pages ?? [];
        const set = new Set<string>();
        for (const p of pages) {
            // p is like "en-US/hero/index.md" or "zh-CN/foo/bar.md"
            // Normalise to the URL form the breadcrumb accumulator uses.
            const urlLike = normalizeInternalPath(
                ensureLeadingSlash(
                    p.replace(/\.(md|html)$/i, "").replace(/\/index$/i, "/"),
                ),
            );
            set.add(urlLike);
            // Also store without lang prefix stripped form
            set.add(
                normalizeInternalPath(
                    ensureLeadingSlash(p.replace(/\.(md|html)$/i, "")),
                ),
            );
        }
        return set;
    });

    const breadcrumbs = computed<BreadcrumbItem[]>(() => {
        const base = normalizeBase(site.value.base);
        const rawPath = stripBase(route.path, base);
        const normalizedLang = getLangCodeFromVitepressLang(lang.value);

        const items: BreadcrumbItem[] = [];

        const homeLink =
            getLanguageByCode(normalizedLang)?.link || `/${normalizedLang}/`;
        items.push({ text: "Home", link: homeLink });

        // Build a map of known internal links from nav config for exact matches.
        const navTree =
            navConfig.locales[normalizedLang] ||
            navConfig.locales[lang.value] ||
            Object.values(navConfig.locales)[0] ||
            [];
        const linkMap = new Map<string, string>();

        const walk = (nodes: any[]) => {
            for (const node of nodes) {
                if (node.text && (node.link || node.href)) {
                    const href = node.link || node.href;
                    if (typeof href === "string" && !isExternalUrl(href)) {
                        for (const variant of getPathVariants(href)) {
                            linkMap.set(variant, node.text);
                        }
                    }
                }
                if (node.dropdown && node.dropdown.panels) {
                    for (const panel of node.dropdown.panels) {
                        if (
                            panel.featured &&
                            panel.featured.title &&
                            (panel.featured.link || panel.featured.href)
                        ) {
                            const featuredHref =
                                panel.featured.link || panel.featured.href;
                            if (
                                typeof featuredHref === "string" &&
                                !isExternalUrl(featuredHref)
                            ) {
                                for (const variant of getPathVariants(
                                    featuredHref,
                                )) {
                                    linkMap.set(variant, panel.featured.title);
                                }
                            }
                        }
                        for (const g of panel.groups) {
                            if (g.items) walk(g.items);
                        }
                    }
                }
            }
        };
        walk(navTree);

        const knownLangSegments = new Set<string>([
            ...Object.keys(navConfig.locales),
            "en-US",
            "zh-CN",
        ]);
        const parts = normalizeInternalPath(rawPath).split("/").filter(Boolean);
        const contentParts =
            parts.length > 0 && knownLangSegments.has(parts[0])
                ? parts.slice(1)
                : parts;
        let linkAcc = homeLink;

        const validPaths = knownPagePaths.value;

        for (let i = 0; i < contentParts.length; i++) {
            const part = contentParts[i];
            const isLast = i === contentParts.length - 1;
            linkAcc = normalizeInternalPath(
                `${linkAcc.replace(/\/$/, "")}/${part}`,
            );

            if (part.toLowerCase() === "index" && isLast) {
                continue;
            }

            let text: string | undefined;
            for (const variant of getPathVariants(linkAcc)) {
                text = linkMap.get(variant);
                if (text) break;
            }

            // Only assign a link if the path actually has a navigable page.
            // An intermediate directory segment is clickable only when it has
            // an index.md (i.e. the normalised path appears in site.pages).
            const hasPage =
                isLast ||
                [...getPathVariants(linkAcc)].some((v) => validPaths.has(v));

            items.push({
                text: text || humanizeSegment(part),
                link: hasPage ? linkAcc : undefined,
            });
        }

        if (items.length > 1 && page.value.title) {
            const last = items[items.length - 1];
            if (last) {
                last.text = page.value.title;
            }
        }

        return items.filter(
            (item, idx, arr) =>
                arr.findIndex(
                    (t) => t.text === item.text && t.link === item.link,
                ) === idx,
        );
    });

    return { breadcrumbs };
}
