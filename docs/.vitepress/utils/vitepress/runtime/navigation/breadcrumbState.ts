import { computed } from "vue";
import { useData, useRoute } from "vitepress";
import { navConfig } from "@utils/config/navConfig";
import {
    getLangCodeFromVitepressLang,
    getLanguageByCode,
} from "@utils/config/project-api";

export interface BreadcrumbItem {
    text: string;
    link?: string;
}

class BreadcrumbPathTools {
    static isExternalUrl(url: string) {
        return /^(https?:)?\/\//.test(url);
    }

    static ensureLeadingSlash(path: string) {
        return path.startsWith("/") ? path : `/${path}`;
    }

    static normalizeBase(base: string | undefined) {
        if (!base || base === "/") return "/";
        return `/${base.replace(/^\/|\/$/g, "")}/`;
    }

    static stripBase(path: string, base: string) {
        const normalizedPath = this.ensureLeadingSlash(path);
        if (base === "/") return normalizedPath;
        if (normalizedPath === base.slice(0, -1)) return "/";
        if (normalizedPath.startsWith(base)) {
            return this.ensureLeadingSlash(normalizedPath.slice(base.length));
        }
        return normalizedPath;
    }

    static normalizeInternalPath(path: string) {
        let normalized = this.ensureLeadingSlash(path.split(/[?#]/)[0] || "/");
        normalized = normalized.replace(/\/index(?:\.html|\.md)?$/i, "/");
        normalized = normalized.replace(/\.md$/i, ".html");
        if (normalized !== "/" && !normalized.endsWith("/")) normalized += "/";
        return normalized;
    }

    static getPathVariants(path: string) {
        const normalized = this.normalizeInternalPath(path);
        const noTrailingSlash =
            normalized.length > 1 ? normalized.replace(/\/$/, "") : normalized;
        return new Set([
            normalized,
            noTrailingSlash,
            `${noTrailingSlash}.html`,
            normalized.replace(/\/$/, ".html"),
        ]);
    }

    static humanizeSegment(segment: string) {
        return segment
            .replace(/\.html$/i, "")
            .split("-")
            .filter(Boolean)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
}

export function createBreadcrumbState() {
    const route = useRoute();
    const { lang, site, page } = useData();

    const knownPagePaths = computed<Set<string>>(() => {
        const pages: string[] = (site.value as any).pages ?? [];
        const set = new Set<string>();
        pages.forEach((p) => {
            const urlLike = BreadcrumbPathTools.normalizeInternalPath(
                BreadcrumbPathTools.ensureLeadingSlash(
                    p.replace(/\.(md|html)$/i, "").replace(/\/index$/i, "/"),
                ),
            );
            set.add(urlLike);
            set.add(
                BreadcrumbPathTools.normalizeInternalPath(
                    BreadcrumbPathTools.ensureLeadingSlash(
                        p.replace(/\.(md|html)$/i, ""),
                    ),
                ),
            );
        });
        return set;
    });

    const breadcrumbs = computed<BreadcrumbItem[]>(() => {
        const base = BreadcrumbPathTools.normalizeBase(site.value.base);
        const rawPath = BreadcrumbPathTools.stripBase(route.path, base);
        const normalizedLang = getLangCodeFromVitepressLang(lang.value);
        const homeLink =
            getLanguageByCode(normalizedLang)?.link || `/${normalizedLang}/`;

        const items: BreadcrumbItem[] = [{ text: "Home", link: homeLink }];
        const navTree =
            navConfig.locales[normalizedLang] ||
            navConfig.locales[lang.value] ||
            Object.values(navConfig.locales)[0] ||
            [];
        const linkMap = new Map<string, string>();

        const walk = (nodes: any[]) => {
            nodes.forEach((node) => {
                if (node.text && (node.link || node.href)) {
                    const href = node.link || node.href;
                    if (
                        typeof href === "string" &&
                        !BreadcrumbPathTools.isExternalUrl(href)
                    ) {
                        BreadcrumbPathTools.getPathVariants(href).forEach(
                            (variant) => linkMap.set(variant, node.text),
                        );
                    }
                }
                if (node.dropdown?.panels) {
                    node.dropdown.panels.forEach((panel) => {
                        if (
                            panel.featured?.title &&
                            (panel.featured.link || panel.featured.href)
                        ) {
                            const href =
                                panel.featured.link || panel.featured.href;
                            if (
                                typeof href === "string" &&
                                !BreadcrumbPathTools.isExternalUrl(href)
                            ) {
                                BreadcrumbPathTools.getPathVariants(
                                    href,
                                ).forEach((variant) =>
                                    linkMap.set(variant, panel.featured.title),
                                );
                            }
                        }
                        panel.groups?.forEach((group) => {
                            if (group.items) walk(group.items);
                        });
                    });
                }
            });
        };
        walk(navTree as any[]);

        const knownLangSegments = new Set([
            ...Object.keys(navConfig.locales),
            "en-US",
            "zh-CN",
        ]);
        const parts = BreadcrumbPathTools.normalizeInternalPath(rawPath)
            .split("/")
            .filter(Boolean);
        const contentParts =
            parts.length > 0 && knownLangSegments.has(parts[0])
                ? parts.slice(1)
                : parts;

        let linkAcc = homeLink;
        contentParts.forEach((part, index) => {
            const isLast = index === contentParts.length - 1;
            linkAcc = BreadcrumbPathTools.normalizeInternalPath(
                `${linkAcc.replace(/\/$/, "")}/${part}`,
            );
            if (part.toLowerCase() === "index" && isLast) return;

            let text: string | undefined;
            for (const variant of BreadcrumbPathTools.getPathVariants(
                linkAcc,
            )) {
                text = linkMap.get(variant);
                if (text) break;
            }

            const hasPage =
                isLast ||
                [...BreadcrumbPathTools.getPathVariants(linkAcc)].some((v) =>
                    knownPagePaths.value.has(v),
                );

            items.push({
                text: text || BreadcrumbPathTools.humanizeSegment(part),
                link: hasPage ? linkAcc : undefined,
            });
        });

        if (items.length > 1 && page.value.title) {
            items[items.length - 1].text = page.value.title;
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
