export type ThemeValue<T> = T | { light?: T; dark?: T; value?: T };

export type HeroBackgroundType =
    | "image"
    | "video"
    | "color"
    | "shader"
    | "particles"
    | "none";

export type HeroRenderableBackgroundType = HeroBackgroundType;

export type HeroNavSearchThemeColor = ThemeValue<string>;

export interface HeroBackgroundColorGradientStopConfig {
    color: HeroNavSearchThemeColor;
    position?: string;
}

export interface HeroBackgroundColorGradientAnimationConfig {
    enabled?: boolean;
    type?: "flow" | "rotate" | "pulse";
    duration?: number;
}

export interface HeroBackgroundColorGradientConfig {
    enabled?: boolean;
    type?: "linear" | "radial" | "conic";
    direction?: string | number;
    center?: string;
    shape?: string;
    size?: string;
    stops?: HeroBackgroundColorGradientStopConfig[];
    /** Legacy alias: color array; normalized to `stops` at runtime. */
    colors?: HeroNavSearchThemeColor[];
    animation?: HeroBackgroundColorGradientAnimationConfig;
}

export interface HeroBackgroundColorConfig {
    /** Modern solid contract */
    solid?: HeroNavSearchThemeColor | { color?: HeroNavSearchThemeColor };
    /** Legacy alias */
    value?: HeroNavSearchThemeColor;
    /** Modern gradient contract, plus legacy array form. */
    gradient?: HeroBackgroundColorGradientConfig | HeroNavSearchThemeColor[];
    /** Legacy alias for linear gradient direction. */
    direction?: string | number;
    [key: string]: unknown;
}

export interface HeroBackgroundLayerConfig {
    type: HeroBackgroundType | string;
    opacity?: number;
    zIndex?: number;
    blend?: string;
    style?: Record<string, unknown>;
    cssVars?: Record<string, unknown>;
    image?: Record<string, unknown>;
    video?: Record<string, unknown>;
    color?: HeroBackgroundColorConfig;
    shader?: Record<string, unknown>;
    particles?: Record<string, unknown>;
    [key: string]: unknown;
}

export interface HeroBackgroundConfig extends Partial<HeroBackgroundLayerConfig> {
    mode?: "single" | "layers";
    layers?: HeroBackgroundLayerConfig[];

    opacity?: number;
    brightness?: number;
    contrast?: number;
    saturation?: number;
    filter?: string;
}

export interface HeroImageThemeableSource {
    src?: string;
    light?: string;
    dark?: string;
    alt?: string;
    [key: string]: unknown;
}

export interface HeroImageConfig extends HeroImageThemeableSource {
    type?: "image" | "video" | "gif" | "model3d" | "lottie";
    image?: HeroImageThemeableSource | Record<string, unknown>;
    video?: Record<string, unknown>;
    gif?: Record<string, unknown>;
    model3d?: Record<string, unknown>;
    lottie?: HeroImageThemeableSource &
        Record<string, unknown> & {
            loop?: boolean;
            autoplay?: boolean;
            speed?: number;
            renderer?: "svg" | "canvas";
        };
    frame?: Record<string, unknown>;
    background?: boolean | { enabled?: boolean };
    width?: number | string;
    height?: number | string;
    fit?: "contain" | "cover" | "fill" | "none" | "scale-down";
    position?: string;
}

export interface HeroActionConfig {
    theme?: "brand" | "alt" | "sponsor" | "outline" | "ghost" | "danger";
    text: string;
    link?: string;
    linkKey?:
        | "home"
        | "heroMatrix"
        | "heroAllConfig"
        | "frontmatterApi"
        | "stylesPlugins"
        | "allPages"
        | "backgroundModes"
        | "wavesMatrix"
        | "floatingElements"
        | "imageTypes";
    target?: string;
    rel?: string;
    style?: Record<string, unknown>;
}

export type HeroTypographyStyleType =
    | "floating-tilt"
    | "grouped-float"
    | "slanted-wrap"
    | "none";

export interface HeroTypographyMotionNodeConfig {
    /** X movement in px. */
    x?: number;
    /** Y movement in px. */
    y?: number;
    /** Scale factor (1 = unchanged). */
    scale?: number;
}

export interface HeroTypographyMotionConfig {
    /** Master motion intensity (0-2). */
    intensity?: number;
    /** Per-node movement + resize config. */
    title?: HeroTypographyMotionNodeConfig;
    text?: HeroTypographyMotionNodeConfig;
    tagline?: HeroTypographyMotionNodeConfig;
    image?: HeroTypographyMotionNodeConfig;
    /** Shared transition duration in ms for title/text/tagline/image show/hide transitions. */
    transitionDuration?: number;
    /** Delay step in ms between title -> text -> tagline transitions. */
    transitionDelayStep?: number;
    /** CSS easing string used by all typography transitions. */
    transitionEasing?: string;
}

export interface HeroTypographyConfig {
    /**
     * `floating-tilt`: motion-forward layout (default).
     * `grouped-float`: larger grouped floating composition.
     * `slanted-wrap`: slanted motion profile with desktop image-wrap behavior.
     * `none`: no motion transform.
     */
    type?: HeroTypographyStyleType;
    /**
     * Shared transform contract for all style types.
     * Future types should extend behavior using the same shape.
     */
    motion?: HeroTypographyMotionConfig;
    /**
     * Backward-compat alias for older configs.
     * Prefer `motion`.
     */
    floatingTilt?: HeroTypographyMotionConfig;
}

export interface HeroFloatingConfig {
    enabled?: boolean;
    items?: Array<Record<string, unknown>>;
    [key: string]: unknown;
}

export interface HeroWavesConfig {
    enabled?: boolean;
    height?: number;
    animated?: boolean;
    opacity?: number;
    [key: string]: unknown;
}

export interface HeroFrontmatterConfig {
    name?: string;
    text?: string;
    tagline?: string;
    actions?: HeroActionConfig[];
    image?: HeroImageConfig;
    background?: HeroBackgroundConfig;
    waves?: HeroWavesConfig;
    floating?: HeroFloatingConfig;
    snippets?: unknown[];
    typography?: HeroTypographyConfig;
    /** Hero color overrides — title, tagline, text, navText, navTextScrolled */
    colors?: {
        title?: ThemeValue<string>;
        tagline?: ThemeValue<string>;
        text?: ThemeValue<string>;
        navText?: ThemeValue<string>;
        navTextScrolled?: ThemeValue<string>;
        navTextHover?: ThemeValue<string>;
        navTextHoverScrolled?: ThemeValue<string>;
        navBackground?: ThemeValue<string>;
        navBackgroundScrolled?: ThemeValue<string>;
        searchBackground?: ThemeValue<string>;
        searchBackgroundScrolled?: ThemeValue<string>;
        searchHoverBackground?: ThemeValue<string>;
        searchHoverBackgroundScrolled?: ThemeValue<string>;
        searchText?: ThemeValue<string>;
        searchTextScrolled?: ThemeValue<string>;
        searchTextMuted?: ThemeValue<string>;
        searchTextMutedScrolled?: ThemeValue<string>;
        searchBorder?: ThemeValue<string>;
        searchBorderScrolled?: ThemeValue<string>;
        searchKeyBackground?: ThemeValue<string>;
        searchKeyBackgroundScrolled?: ThemeValue<string>;
        searchKeyText?: ThemeValue<string>;
        searchKeyTextScrolled?: ThemeValue<string>;
    };
    layout?: {
        viewport?: boolean;
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

export interface NormalizedBackgroundLayer extends Omit<
    HeroBackgroundLayerConfig,
    "type"
> {
    type: HeroRenderableBackgroundType;
    opacity: number;
    zIndex: number;
    blend: string;
}

const RENDERABLE_BACKGROUND_TYPES = new Set<HeroRenderableBackgroundType>([
    "image",
    "video",
    "color",
    "shader",
    "particles",
    "none",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
    return !!value && typeof value === "object" && !Array.isArray(value);
}

export function asRecord(value: unknown): Record<string, unknown> | undefined {
    return isRecord(value) ? value : undefined;
}

export function isMediaBackgroundType(type: unknown) {
    return type === "image" || type === "video" || type === "shader";
}

export function hasMediaBackground(config: HeroBackgroundConfig | undefined) {
    if (!config) return false;
    if (Array.isArray(config.layers) && config.layers.length > 0) {
        return config.layers.some((layer) =>
            isMediaBackgroundType(layer?.type),
        );
    }
    return isMediaBackgroundType(config.type);
}

function normalizeLayer(
    layer: HeroBackgroundLayerConfig,
    index: number,
    warn: (message: string) => void,
): NormalizedBackgroundLayer | null {
    if (layer.type === "waves") {
        warn(
            "`hero.background.type: waves` is unsupported and ignored. Use `hero.waves`.",
        );
        return null;
    }

    if (
        !RENDERABLE_BACKGROUND_TYPES.has(
            layer.type as HeroRenderableBackgroundType,
        )
    ) {
        warn(`Unsupported background type "${String(layer.type)}" ignored.`);
        return null;
    }

    if (layer.type === "none") return null;

    return {
        ...layer,
        type: layer.type as HeroRenderableBackgroundType,
        zIndex: Number.isFinite(Number(layer.zIndex))
            ? Number(layer.zIndex)
            : index,
        opacity: Number.isFinite(Number(layer.opacity))
            ? Number(layer.opacity)
            : 1,
        blend: typeof layer.blend === "string" ? layer.blend : "normal",
    };
}

export function normalizeBackgroundConfig(
    value: unknown,
): HeroBackgroundConfig | undefined {
    if (!isRecord(value)) return undefined;

    const config = value as HeroBackgroundConfig;
    const normalized: HeroBackgroundConfig = { ...config };

    if (Array.isArray(config.layers)) {
        normalized.layers = config.layers.filter(
            (layer): layer is HeroBackgroundLayerConfig =>
                isRecord(layer) && typeof layer.type === "string",
        );
    }

    return normalized;
}

export function resolveNormalizedBackgroundLayers(
    config: HeroBackgroundConfig | undefined,
    warn: (message: string) => void,
) {
    if (!config) return [] as NormalizedBackgroundLayer[];

    if (Array.isArray(config.layers) && config.layers.length > 0) {
        return config.layers
            .map((layer, index) => normalizeLayer(layer, index, warn))
            .filter((layer): layer is NormalizedBackgroundLayer =>
                Boolean(layer),
            )
            .sort((a, b) => a.zIndex - b.zIndex);
    }

    if (typeof config.type === "string" && config.type !== "none") {
        const normalized = normalizeLayer(
            config as HeroBackgroundLayerConfig,
            0,
            warn,
        );
        return normalized ? [normalized] : [];
    }

    return [] as NormalizedBackgroundLayer[];
}

export function normalizeThemeableSource(
    value: unknown,
): HeroImageThemeableSource | undefined {
    if (!value) return undefined;
    if (typeof value === "string") return { src: value };
    if (!isRecord(value)) return undefined;

    const source: HeroImageThemeableSource = {};
    if (typeof value.src === "string") source.src = value.src;
    if (typeof value.light === "string") source.light = value.light;
    if (typeof value.dark === "string") source.dark = value.dark;
    if (typeof value.alt === "string") source.alt = value.alt;
    return Object.keys(source).length > 0 ? source : undefined;
}

export function normalizeHeroImageConfig(
    value: unknown,
    fallback?: HeroImageThemeableSource,
): HeroImageConfig | undefined {
    if (isRecord(value)) {
        return value as HeroImageConfig;
    }

    if (!fallback) return undefined;

    return {
        type: "image",
        image: fallback,
        src: fallback.src,
        light: fallback.light,
        dark: fallback.dark,
        alt: fallback.alt,
    };
}

export function normalizeHeroWavesConfig(value: unknown): HeroWavesConfig {
    if (!isRecord(value)) {
        return {
            enabled: true,
            height: 80,
            animated: true,
            opacity: 1,
        };
    }

    if (value.enabled === false) {
        return { ...value, enabled: false };
    }

    return {
        enabled: true,
        height: 80,
        animated: true,
        opacity: 1,
        ...value,
    };
}

export function resolveViewportEnabled(hero: HeroFrontmatterConfig) {
    return hero.layout?.viewport !== false;
}

export function resolveHeroTypographyStyleType(
    hero: HeroFrontmatterConfig | undefined,
): HeroTypographyStyleType {
    if (!hero || !isRecord(hero.typography)) return "floating-tilt";
    return hero.typography.type === "none" ||
        hero.typography.type === "grouped-float" ||
        hero.typography.type === "slanted-wrap"
        ? hero.typography.type
        : "floating-tilt";
}
