import { computed, type ComputedRef, type Ref } from "vue";
import type {
    HeroBackgroundConfig,
    HeroFrontmatterConfig,
    HeroTypographyStyleType,
} from "@utils/vitepress/hero-frontmatter";
import { resolveHeroTypographyStyleType } from "@utils/vitepress/hero-frontmatter";
import {
    useHeroNavAdaptive,
    type HeroColorsConfig,
} from "@utils/vitepress/composables/useHeroNavAdaptive";
import { useHeroColorUtils } from "@utils/vitepress/composables/useHeroColorUtils";

interface ResolvedTypographyMotionNode {
    x: number;
    y: number;
    scale: number;
}

interface ResolvedTypographyMotionStyle {
    intensity: number;
    title: ResolvedTypographyMotionNode;
    text: ResolvedTypographyMotionNode;
    tagline: ResolvedTypographyMotionNode;
    image: ResolvedTypographyMotionNode;
    transitionDuration: number;
    transitionDelayStep: number;
    transitionEasing: string;
}

interface UseHeroTypographyStateOptions {
    heroConfig: ComputedRef<HeroFrontmatterConfig>;
    backgroundConfig: ComputedRef<HeroBackgroundConfig | undefined>;
    heroRoot: Ref<HTMLElement | null>;
    isDark: Ref<boolean>;
}

function resolveNumber(
    value: unknown,
    fallback: number,
    min: number,
    max: number,
) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return fallback;
    return Math.min(max, Math.max(min, numeric));
}

export function useHeroTypographyState(
    options: UseHeroTypographyStateOptions,
) {
    const { heroConfig, backgroundConfig, heroRoot, isDark } = options;

    const heroTypographyType = computed<HeroTypographyStyleType>(() =>
        resolveHeroTypographyStyleType(heroConfig.value),
    );

    const resolvedTypographyMotionStyle =
        computed<ResolvedTypographyMotionStyle>(() => {
            const typography = heroConfig.value.typography;
            const rawMotion =
                typography &&
                typeof typography === "object" &&
                typography.motion &&
                typeof typography.motion === "object"
                    ? (typography.motion as Record<string, unknown>)
                    : typography &&
                        typeof typography === "object" &&
                          typography.floatingTilt &&
                          typeof typography.floatingTilt === "object"
                      ? (typography.floatingTilt as Record<string, unknown>)
                      : {};

            const resolveNode = (
                value: unknown,
                defaults: ResolvedTypographyMotionNode,
            ): ResolvedTypographyMotionNode => {
                const node =
                    value && typeof value === "object"
                        ? (value as Record<string, unknown>)
                        : {};
                return {
                    x: resolveNumber(node.x, defaults.x, -120, 120),
                    y: resolveNumber(node.y, defaults.y, -120, 120),
                    scale: resolveNumber(node.scale, defaults.scale, 0.7, 1.5),
                };
            };

            const defaultNodes =
                heroTypographyType.value === "none"
                    ? {
                          title: { x: 0, y: 0, scale: 1 },
                          text: { x: 0, y: 0, scale: 1 },
                          tagline: { x: 0, y: 0, scale: 1 },
                          image: { x: 0, y: 0, scale: 1 },
                      }
                    : heroTypographyType.value === "grouped-float"
                      ? {
                            title: { x: 12, y: -7, scale: 1.09 },
                            text: { x: 14, y: -3, scale: 1.1 },
                            tagline: { x: 11, y: 1, scale: 1.06 },
                            image: { x: 16, y: -10, scale: 1.11 },
                        }
                      : heroTypographyType.value === "slanted-wrap"
                        ? {
                              title: { x: -12, y: -6, scale: 1.06 },
                              text: { x: 16, y: 8, scale: 1.07 },
                              tagline: { x: 20, y: 15, scale: 1.032 },
                              image: { x: 8, y: -6, scale: 1.028 },
                          }
                        : {
                              title: { x: 2, y: -2, scale: 1.018 },
                              text: { x: 6, y: 4, scale: 1.03 },
                              tagline: { x: 3, y: 7, scale: 1.014 },
                              image: { x: 5, y: -3, scale: 1.02 },
                          };

            return {
                intensity: resolveNumber(
                    rawMotion.intensity,
                    heroTypographyType.value === "none" ? 0 : 1,
                    0,
                    2,
                ),
                title: resolveNode(rawMotion.title, defaultNodes.title),
                text: resolveNode(rawMotion.text, defaultNodes.text),
                tagline: resolveNode(rawMotion.tagline, defaultNodes.tagline),
                image: resolveNode(rawMotion.image, defaultNodes.image),
                transitionDuration: resolveNumber(
                    rawMotion.transitionDuration,
                    heroTypographyType.value === "none"
                        ? 260
                        : heroTypographyType.value === "grouped-float"
                          ? 700
                          : heroTypographyType.value === "slanted-wrap"
                            ? 640
                            : 560,
                    120,
                    2000,
                ),
                transitionDelayStep: resolveNumber(
                    rawMotion.transitionDelayStep,
                    heroTypographyType.value === "none"
                        ? 16
                        : heroTypographyType.value === "grouped-float"
                          ? 58
                          : heroTypographyType.value === "slanted-wrap"
                            ? 52
                            : 40,
                    0,
                    300,
                ),
                transitionEasing:
                    typeof rawMotion.transitionEasing === "string" &&
                    rawMotion.transitionEasing.trim()
                        ? rawMotion.transitionEasing.trim()
                        : "cubic-bezier(0.2, 0.9, 0.2, 1)",
            };
        });

    const heroColors = computed<HeroColorsConfig | undefined>(() => {
        const colors = heroConfig.value.colors;
        if (colors && typeof colors === "object") {
            return colors as HeroColorsConfig;
        }
        return undefined;
    });

    const hasColorOverrides = computed(() => {
        const colors = heroColors.value;
        return !!(colors?.title || colors?.tagline || colors?.text);
    });

    const { hasMediaBackground } = useHeroNavAdaptive({
        heroRoot,
        backgroundConfig,
        isDark,
        heroColors,
    });

    const { resolveThemeValue, toCssValue } = useHeroColorUtils({ isDark });

    const heroCssVarsStyle = computed(() => {
        const style: Record<string, string> = {};

        const mergedVars =
            heroConfig.value.cssVars &&
            typeof heroConfig.value.cssVars === "object"
                ? (heroConfig.value.cssVars as Record<string, unknown>)
                : {};

        for (const [rawKey, rawValue] of Object.entries(mergedVars)) {
            const key = rawKey.startsWith("--") ? rawKey : `--${rawKey}`;
            const resolved = resolveThemeValue(rawValue as any);
            const cssValue = toCssValue(resolved);
            if (cssValue !== undefined) {
                style[key] = cssValue;
            }
        }

        const colors = heroColors.value;
        if (colors) {
            const colorMap: Array<[string, unknown]> = [
                ["--hero-media-title-color", colors.title],
                ["--hero-media-muted-color", colors.tagline || colors.text],
                ["--hero-media-text-color", colors.text],
            ];

            for (const [varName, value] of colorMap) {
                if (!value) continue;
                const resolved = resolveThemeValue(value as any);
                const cssValue = toCssValue(resolved);
                if (cssValue !== undefined) {
                    style[varName] = cssValue;
                }
            }
        }

        style["--hero-typography-style"] = heroTypographyType.value;

        const motion = resolvedTypographyMotionStyle.value;
        const intensity = motion.intensity;
        const titleX = motion.title.x * intensity;
        const titleY = motion.title.y * intensity;
        const textX = motion.text.x * intensity;
        const textY = motion.text.y * intensity;
        const taglineX = motion.tagline.x * intensity;
        const taglineY = motion.tagline.y * intensity;
        const imageX = motion.image.x * intensity;
        const imageY = motion.image.y * intensity;

        const titleScale = 1 + (motion.title.scale - 1) * intensity;
        const textScale = 1 + (motion.text.scale - 1) * intensity;
        const taglineScale = 1 + (motion.tagline.scale - 1) * intensity;
        const imageScale = 1 + (motion.image.scale - 1) * intensity;

        const groupedFactor = heroTypographyType.value === "grouped-float" ? 1 : 0;
        const groupX = ((titleX + textX + taglineX + imageX) / 4) * groupedFactor;
        const groupY = ((titleY + textY + taglineY + imageY) / 4) * groupedFactor;
        const averagedScale =
            (titleScale + textScale + taglineScale + imageScale) / 4;
        const groupScale = 1 + (averagedScale - 1) * groupedFactor;

        const clamp = (value: number, min: number, max: number) =>
            Math.min(max, Math.max(min, value));

        const titleDriftX = clamp(Math.abs(titleX) * 0.48 + 8, 8, 22);
        const titleDriftY = clamp(Math.abs(titleY) * 0.52 + 7, 7, 20);
        const textDriftX = clamp(Math.abs(textX) * 0.58 + 10, 10, 28);
        const textDriftY = clamp(Math.abs(textY) * 0.56 + 8, 8, 24);
        const taglineDriftX = clamp(Math.abs(taglineX) * 0.54 + 8, 8, 24);
        const taglineDriftY = clamp(Math.abs(taglineY) * 0.6 + 7, 7, 22);
        const imageDriftX = clamp(Math.abs(imageX) * 0.64 + 12, 12, 34);
        const imageDriftY = clamp(Math.abs(imageY) * 0.62 + 10, 10, 30);

        style["--hero-typo-intensity"] = String(intensity);
        style["--hero-typo-title-x"] = `${titleX}px`;
        style["--hero-typo-title-y"] = `${titleY}px`;
        style["--hero-typo-title-scale"] = String(titleScale);
        style["--hero-typo-title-rotate"] = `${(titleX - titleY) * 0.08}deg`;
        style["--hero-typo-text-x"] = `${textX}px`;
        style["--hero-typo-text-y"] = `${textY}px`;
        style["--hero-typo-text-scale"] = String(textScale);
        style["--hero-typo-text-rotate"] = `${(textX - textY) * 0.08}deg`;
        style["--hero-typo-tagline-x"] = `${taglineX}px`;
        style["--hero-typo-tagline-y"] = `${taglineY}px`;
        style["--hero-typo-tagline-scale"] = String(taglineScale);
        style["--hero-typo-tagline-rotate"] =
            `${(taglineX - taglineY) * 0.055}deg`;
        style["--hero-typo-image-x"] = `${imageX}px`;
        style["--hero-typo-image-y"] = `${imageY}px`;
        style["--hero-typo-image-scale"] = String(imageScale);
        style["--hero-typo-image-rotate"] = `${(imageX - imageY) * 0.04}deg`;
        style["--hero-typo-group-x"] = `${groupX}px`;
        style["--hero-typo-group-y"] = `${groupY}px`;
        style["--hero-typo-group-scale"] = String(groupScale);
        style["--hero-typo-group-rotate"] = `${(groupX - groupY) * 0.045}deg`;
        style["--hero-typo-image-group-x"] = `${groupX * 0.92}px`;
        style["--hero-typo-image-group-y"] = `${groupY * 0.92}px`;
        style["--hero-typo-image-group-scale"] = String(
            1 + (groupScale - 1) * 0.86,
        );
        style["--hero-typo-title-drift-x"] = `${titleDriftX}px`;
        style["--hero-typo-title-drift-y"] = `${titleDriftY}px`;
        style["--hero-typo-text-drift-x"] = `${textDriftX}px`;
        style["--hero-typo-text-drift-y"] = `${textDriftY}px`;
        style["--hero-typo-tagline-drift-x"] = `${taglineDriftX}px`;
        style["--hero-typo-tagline-drift-y"] = `${taglineDriftY}px`;
        style["--hero-typo-image-drift-x"] = `${imageDriftX}px`;
        style["--hero-typo-image-drift-y"] = `${imageDriftY}px`;
        style["--hero-typo-transition-duration"] =
            `${motion.transitionDuration}ms`;
        style["--hero-typo-delay-step"] = `${motion.transitionDelayStep}ms`;
        style["--hero-typo-transition-easing"] = motion.transitionEasing;

        return style;
    });

    return {
        heroTypographyType,
        heroColors,
        hasColorOverrides,
        hasMediaBackground,
        heroCssVarsStyle,
    };
}
