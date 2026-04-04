import { computed } from "vue";
import { useData, useRoute } from "vitepress";
import { navConfig } from "@utils/config/navConfig";
import {
    getLangCodeFromVitepressLang,
    getLanguageByCode,
} from "@utils/config/project-api";
import { buildBreadcrumbItems, type BreadcrumbItem } from "./linkResolution";

export function createBreadcrumbState() {
    const route = useRoute();
    const { lang, site, page } = useData();

    const knownPagePaths = computed<Set<string>>(() => {
        const pages: string[] = (site.value as any).pages ?? [];
        const set = new Set<string>();
        pages.forEach((p) => {
            if (typeof p !== "string") return;
            set.add(p);
        });
        return set;
    });

    const breadcrumbs = computed<BreadcrumbItem[]>(() => {
        const normalizedLang = getLangCodeFromVitepressLang(lang.value);
        const homeLink =
            getLanguageByCode(normalizedLang)?.link || `/${normalizedLang}/`;
        const navTree =
            navConfig.locales[normalizedLang] ||
            navConfig.locales[lang.value] ||
            Object.values(navConfig.locales)[0] ||
            [];

        return buildBreadcrumbItems({
            routePath: route.path,
            siteBase: site.value.base,
            homeLink,
            pageTitle: page.value.title,
            knownPagePaths: knownPagePaths.value,
            navTree,
            localeCodes: Object.keys(navConfig.locales),
        });
    });

    return { breadcrumbs };
}
