import { getLangCodeFromVitepressLang } from "@config/project-config";

export type HomeLinkLocale = "en-US" | "zh-CN";

export type HomeLinkKey =
    | "home"
    | "heroMatrix"
    | "heroAllConfig"
    | "frontmatterApi"
    | "maintainabilityGuide"
    | "developmentWorkflow"
    | "extensionArchitecture"
    | "heroExtension"
    | "stylesPlugins"
    | "allPages"
    | "backgroundModes"
    | "wavesMatrix"
    | "floatingElements"
    | "imageTypes"
    | "basicHero"
    | "colorBackground"
    | "imageBackground"
    | "videoBackground"
    | "shaderBackground"
    | "particlesBackground"
    | "layersBackground"
    | "buttonThemes"
    | "featuresConfig";

class HomeLinkService {
    private readonly paths: Record<HomeLinkKey, string> = {
        home: "/",
        heroMatrix: "/hero/matrix/",
        heroAllConfig: "/hero/AllConfig",
        frontmatterApi: "/frontmatter/",
        maintainabilityGuide: "/frontmatter/reference/maintainability",
        developmentWorkflow: "/frontmatter/reference/developmentWorkflow",
        extensionArchitecture: "/frontmatter/reference/extensionArchitecture",
        heroExtension: "/frontmatter/reference/heroExtension",
        stylesPlugins: "/styles-plugins",
        allPages: "/all-pages",
        backgroundModes: "/hero/matrix/backgroundSingle/",
        wavesMatrix: "/hero/matrix/waves/",
        floatingElements: "/hero/matrix/floating/",
        imageTypes: "/hero/matrix/imageTypes/",
        basicHero: "/hero/matrix/basic/",
        colorBackground: "/hero/matrix/backgroundSingle/color/",
        imageBackground: "/hero/matrix/backgroundSingle/image/",
        videoBackground: "/hero/matrix/backgroundSingle/video/",
        shaderBackground: "/hero/matrix/backgroundSingle/shader/",
        particlesBackground: "/hero/matrix/backgroundSingle/particles/",
        layersBackground: "/hero/matrix/layers/",
        buttonThemes: "/hero/matrix/buttonsFeatures/",
        featuresConfig: "/hero/matrix/buttonsFeatures/featuresFullConfig",
    };

    resolveByKey(key: HomeLinkKey, vitepressLang: string) {
        if (key === "home") return "/";
        const locale = this.normalizeLocale(vitepressLang);
        const suffix = this.paths[key].startsWith("/") ? this.paths[key] : `/${this.paths[key]}`;
        return `/${locale}${suffix}`;
    }

    resolve(rawLink: string | undefined, linkKey: HomeLinkKey | undefined, vitepressLang: string) {
        const link = rawLink?.trim();
        if (link) return link;
        if (!linkKey) return undefined;
        return this.resolveByKey(linkKey, vitepressLang);
    }

    private normalizeLocale(vitepressLang: string): HomeLinkLocale {
        const langCode = getLangCodeFromVitepressLang(vitepressLang);
        return langCode === "zh-CN" ? "zh-CN" : "en-US";
    }
}

const service = new HomeLinkService();

export function getHomeLinkByKey(key: HomeLinkKey, vitepressLang: string): string {
    return service.resolveByKey(key, vitepressLang);
}

export function resolveHomeLink(
    rawLink: string | undefined,
    linkKey: HomeLinkKey | undefined,
    vitepressLang: string,
): string | undefined {
    return service.resolve(rawLink, linkKey, vitepressLang);
}
