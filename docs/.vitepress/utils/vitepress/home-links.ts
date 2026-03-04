import { getLangCodeFromVitepressLang } from "@config/project-config";

export type HomeLinkLocale = "en-US" | "zh-CN";

export type HomeLinkKey =
    | "home"
    | "heroMatrix"
    | "heroAllConfig"
    | "frontmatterApi"
    | "stylesPlugins"
    | "allPages"
    | "backgroundModes"
    | "wavesMatrix"
    | "floatingElements"
    | "imageTypes"
    // Basic
    | "basicHero"
    // Background sections
    | "colorBackground"
    | "imageBackground"
    | "videoBackground"
    | "shaderBackground"
    | "particlesBackground"
    // Layers
    | "layersBackground"
    // Buttons & Features
    | "buttonThemes"
    | "featuresConfig";

const HOME_LINK_PATHS: Record<HomeLinkKey, string> = {
    home: "/",
    heroMatrix: "/hero/matrix/",
    heroAllConfig: "/hero/AllConfig",
    frontmatterApi: "/frontmatter/",
    stylesPlugins: "/styles-plugins",
    allPages: "/all-pages",
    backgroundModes: "/hero/matrix/backgroundSingle/",
    wavesMatrix: "/hero/matrix/waves/",
    floatingElements: "/hero/matrix/floating/",
    imageTypes: "/hero/matrix/imageTypes/",
    // Basic
    basicHero: "/hero/matrix/basic/",
    // Background sections
    colorBackground: "/hero/matrix/backgroundSingle/color/",
    imageBackground: "/hero/matrix/backgroundSingle/image/",
    videoBackground: "/hero/matrix/backgroundSingle/video/",
    shaderBackground: "/hero/matrix/backgroundSingle/shader/",
    particlesBackground: "/hero/matrix/backgroundSingle/particles/",
    // Layers
    layersBackground: "/hero/matrix/layers/",
    // Buttons & Features
    buttonThemes: "/hero/matrix/buttonsFeatures/",
    featuresConfig: "/hero/matrix/buttonsFeatures/featuresFullConfig",
};

function normalizeLocale(vitepressLang: string): HomeLinkLocale {
    const langCode = getLangCodeFromVitepressLang(vitepressLang);
    return langCode === "zh-CN" ? "zh-CN" : "en-US";
}

export function getHomeLinkByKey(
    key: HomeLinkKey,
    vitepressLang: string,
): string {
    if (key === "home") return "/";
    const locale = normalizeLocale(vitepressLang);
    const suffix = HOME_LINK_PATHS[key].startsWith("/")
        ? HOME_LINK_PATHS[key]
        : `/${HOME_LINK_PATHS[key]}`;
    return `/${locale}${suffix}`;
}

export function resolveHomeLink(
    rawLink: string | undefined,
    linkKey: HomeLinkKey | undefined,
    vitepressLang: string,
): string | undefined {
    const link = rawLink?.trim();
    if (link) return link;
    if (!linkKey) return undefined;
    return getHomeLinkByKey(linkKey, vitepressLang);
}
