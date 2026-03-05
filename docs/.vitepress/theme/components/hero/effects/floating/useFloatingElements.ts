import { computed } from "vue";
import { useData } from "vitepress";
import { resolveAssetWithBase } from "@utils/assets";
import type {
    FloatingConfig,
    FloatingElementType,
    FloatingItem,
    FloatingShapeType,
    NormalizedFloatingItem,
    ThemeValue,
} from "./types";

const POSITION_PRESETS = [
    { x: "6%", y: "18%" },
    { x: "16%", y: "72%" },
    { x: "28%", y: "26%" },
    { x: "38%", y: "78%" },
    { x: "62%", y: "18%" },
    { x: "74%", y: "68%" },
    { x: "84%", y: "32%" },
    { x: "92%", y: "78%" },
    { x: "12%", y: "42%" },
    { x: "90%", y: "54%" },
] as const;

const DEFAULT_TEXT_GRADIENTS = [
    "linear-gradient(120deg, #0f4c9a 0%, #2f6fc0 48%, #6aa3e8 100%)",
    "linear-gradient(120deg, #0a7a6a 0%, #13907c 50%, #47b89f 100%)",
    "linear-gradient(120deg, #8a5a12 0%, #b07b1c 55%, #d9a23a 100%)",
    "linear-gradient(120deg, #36506b 0%, #527297 50%, #7e96b5 100%)",
    "linear-gradient(120deg, #4a4e9a 0%, #5f6bc2 52%, #8492da 100%)",
] as const;

interface UseFloatingElementsProps {
    config?: FloatingConfig;
    snippetWords?: string[];
}

function clamp(value: unknown, fallback: number, min: number, max: number) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(max, Math.max(min, parsed));
}

export function useFloatingElements(props: UseFloatingElementsProps) {
    const { isDark } = useData();

    function resolveThemeValue<T>(
        value: ThemeValue<T> | undefined,
    ): T | undefined {
        if (value === undefined || value === null) return undefined;
        if (typeof value !== "object") return value as T;
        const themed = value as { light?: T; dark?: T; value?: T };
        return isDark.value
            ? (themed.dark ?? themed.light ?? themed.value)
            : (themed.light ?? themed.dark ?? themed.value);
    }

    function resolveThemeString(value: ThemeValue<string> | undefined): string {
        const resolved = resolveThemeValue(value);
        return typeof resolved === "string" ? resolved.trim() : "";
    }

    const density = computed(() => clamp(props.config?.density, 10, 1, 30));
    const globalOpacity = computed(() =>
        clamp(props.config?.opacity, 0.82, 0.12, 1),
    );
    const motionEnabled = computed(
        () => props.config?.motion?.enabled !== false,
    );
    const motionDurationMin = computed(() =>
        clamp(props.config?.motion?.durationMin, 15, 8, 50),
    );
    const motionDurationMax = computed(() => {
        const max = clamp(props.config?.motion?.durationMax, 28, 10, 90);
        return Math.max(max, motionDurationMin.value + 1);
    });
    const motionDrift = computed(() =>
        clamp(props.config?.motion?.drift, 34, 8, 90),
    );
    const overlayBlur = computed(() => clamp(props.config?.blur, 0, 0, 20));

    const snippetItems = computed<FloatingItem[]>(() => {
        const words = (props.snippetWords || []).filter(
            (word) => typeof word === "string" && word.trim().length > 0,
        );
        if (words.length === 0) return [];

        const targetCount = Math.max(words.length, density.value);
        return Array.from({ length: targetCount }, (_, index) => ({
            type: "text",
            text: words[index % words.length],
        }));
    });

    const sourceItems = computed<FloatingItem[]>(() => {
        const items = props.config?.items;
        if (Array.isArray(items) && items.length > 0) return items;
        return snippetItems.value;
    });

    function resolveGradientPalette(item: FloatingItem): string[] {
        const fromItem = Array.isArray(item.gradients)
            ? item.gradients
                  .map((gradient) =>
                      String(resolveThemeValue(gradient) || "").trim(),
                  )
                  .filter(Boolean)
            : [];
        if (fromItem.length > 0) return fromItem;

        const fromRoot = Array.isArray(props.config?.gradients)
            ? props.config.gradients
                  .map((gradient) =>
                      String(resolveThemeValue(gradient) || "").trim(),
                  )
                  .filter(Boolean)
            : [];
        if (fromRoot.length > 0) return fromRoot;

        return [...DEFAULT_TEXT_GRADIENTS];
    }

    function resolveFloatingType(item: FloatingItem): FloatingElementType {
        const themedSrc = resolveThemeString(item.src);
        const themedCode = resolveThemeString(item.code);
        const themedValue = resolveThemeString(item.value);
        const themedIcon = resolveThemeString(item.icon);
        const themedText = resolveThemeString(item.text);
        const themedTitle = resolveThemeString(item.title);
        const themedDescription = resolveThemeString(item.description);

        if (item.type) return item.type;
        if (themedSrc && /\.(json|lottie)(\?.*)?$/i.test(themedSrc)) {
            return "lottie";
        }
        if (themedSrc) return "image";
        if (item.shape) return "shape";
        if (themedCode) return "code";
        if (themedValue) return "stat";
        if (themedIcon && themedText) return "badge";
        if (themedIcon) return "icon";
        if (themedTitle || themedDescription) return "card";
        return "text";
    }

    const normalizedItems = computed<NormalizedFloatingItem[]>(() => {
        return sourceItems.value.map((item, index) => {
            const preset = POSITION_PRESETS[index % POSITION_PRESETS.length];
            const type = resolveFloatingType(item);
            const configuredMotionStyle = props.config?.motion?.style;
            const normalizedConfigMotionStyle =
                configuredMotionStyle === "drift"
                    ? configuredMotionStyle
                    : undefined;
            const defaultMotionStyle = "drift";
            const motionStyle =
                item.motionStyle ||
                normalizedConfigMotionStyle ||
                defaultMotionStyle;
            const duration = clamp(
                item.duration,
                motionDurationMin.value + (index % 4) * 3,
                motionDurationMin.value,
                motionDurationMax.value,
            );
            const delay = clamp(item.delay, index * 0.5, 0, 60);
            const driftX = clamp(
                item.driftX,
                ((index % 2 === 0 ? 1 : -1) * motionDrift.value) /
                    (1.4 + (index % 3)),
                -100,
                100,
            );
            const driftY = clamp(
                item.driftY,
                ((index % 3) - 1) * (motionDrift.value * 0.35),
                -100,
                100,
            );
            const opacity = clamp(
                item.opacity,
                type === "text" ? 0.7 : type === "card" ? 0.92 : 0.84,
                0.08,
                1,
            );
            const color = resolveThemeValue(item.color);
            const background = resolveThemeValue(item.background);
            const borderColor = resolveThemeValue(item.borderColor);
            const resolvedText = resolveThemeString(item.text);
            const resolvedTitle = resolveThemeString(item.title);
            const resolvedDescription = resolveThemeString(item.description);
            const resolvedValue = resolveThemeString(item.value);
            const resolvedCode = resolveThemeString(item.code);
            const resolvedIcon = resolveThemeString(item.icon);
            const resolvedSrc = resolveThemeString(item.src);
            const resolvedAlt = resolveThemeString(item.alt);

            const colorType = item.colorType || "solid";
            const explicitGradient = resolveThemeValue(item.gradient);
            const palette = resolveGradientPalette(item);
            const gradientValue =
                colorType === "gradient"
                    ? String(explicitGradient || "").trim() ||
                      palette[index % palette.length]
                    : colorType === "random-gradient"
                      ? palette[index % palette.length]
                      : "";

            const textColor = String(
                resolveThemeValue(item.color) || "",
            ).trim();
            const textShadow = String(
                resolveThemeValue(item.textShadow) || "",
            ).trim();
            const textBackground = String(
                resolveThemeValue(item.background) || "",
            ).trim();
            const textBorderColor = String(
                resolveThemeValue(item.borderColor) || "",
            ).trim();
            const textRadius = item.borderRadius || "";
            const textBoxShadow = String(
                resolveThemeValue(item.shadow) || "",
            ).trim();

            const cardBackground = textBackground;
            const cardBorderColor = textBorderColor;
            const cardRadius = textRadius;
            const cardShadow = textBoxShadow;
            const cardTitleColor = String(
                resolveThemeValue(item.titleColor || item.color) || "",
            ).trim();
            const cardDescriptionColor = String(
                resolveThemeValue(item.descriptionColor) || "",
            ).trim();

            const imageBorderColor = textBorderColor;
            const imageRadius = textRadius;
            const imageShadow = textBoxShadow;
            const imageBackground = textBackground;
            const imageFit = item.fit || "";
            const lottieLoop =
                typeof item.loop === "boolean" ? item.loop : true;
            const lottieAutoplay =
                typeof item.autoplay === "boolean" ? item.autoplay : true;
            const lottieSpeed =
                typeof item.speed === "number" && Number.isFinite(item.speed)
                    ? item.speed
                    : 1;

            const badgeBackground = textBackground;
            const badgeBorderColor = textBorderColor;
            const badgeRadius = textRadius;
            const badgeShadow = textBoxShadow;
            const badgeColor = textColor;
            const badgeIconColor = String(
                resolveThemeValue(item.titleColor) || "",
            ).trim();

            const iconBackground = textBackground;
            const iconBorderColor = textBorderColor;
            const iconRadius = textRadius;
            const iconShadow = textBoxShadow;
            const iconColor = textColor;
            const iconSize = String(item.size || "").trim();

            const statBackground = textBackground;
            const statBorderColor = textBorderColor;
            const statRadius = textRadius;
            const statShadow = textBoxShadow;
            const statLabelColor = String(
                resolveThemeValue(item.descriptionColor) || "",
            ).trim();
            const statValueColor = String(
                resolveThemeValue(item.titleColor || item.color) || "",
            ).trim();

            const codeBackground = textBackground;
            const codeBorderColor = textBorderColor;
            const codeRadius = textRadius;
            const codeShadow = textBoxShadow;
            const codeColor = textColor;
            const codeSize = String(item.size || "").trim();

            const shapeBackground = textBackground;
            const shapeBorderColor = textBorderColor;
            const shapeRadius = textRadius;
            const shapeShadow = textBoxShadow;
            const shapeSize = String(item.size || "").trim();
            const shapeType: FloatingShapeType = item.shape || "circle";

            return {
                key: `floating-${index}`,
                type,
                code: resolvedCode || resolvedText,
                value: resolvedValue,
                icon: resolvedIcon,
                shape: shapeType,
                text: resolvedText || resolvedTitle,
                title: resolvedTitle || resolvedText,
                description: resolvedDescription,
                src: resolveAssetWithBase(resolvedSrc),
                alt:
                    resolvedAlt ||
                    resolvedTitle ||
                    resolvedText ||
                    "floating-image",
                x: item.x || preset.x,
                y: item.y || preset.y,
                width: item.width,
                rotate: clamp(
                    item.rotate,
                    (index % 2 === 0 ? 1 : -1) * (2 + (index % 4) * 1.5),
                    -24,
                    24,
                ),
                opacity,
                duration,
                delay,
                driftX,
                driftY,
                motionStyle,
                color,
                background,
                borderColor,
                colorType,
                gradientValue,
                textColor,
                textShadow,
                textBackground,
                textBorderColor,
                textRadius,
                textBoxShadow,
                cardBackground,
                cardBorderColor,
                cardRadius,
                cardShadow,
                cardTitleColor,
                cardDescriptionColor,
                imageBorderColor,
                imageRadius,
                imageShadow,
                imageBackground,
                imageFit,
                lottieLoop,
                lottieAutoplay,
                lottieSpeed,
                badgeBackground,
                badgeBorderColor,
                badgeRadius,
                badgeShadow,
                badgeColor,
                badgeIconColor,
                iconBackground,
                iconBorderColor,
                iconRadius,
                iconShadow,
                iconColor,
                iconSize,
                statBackground,
                statBorderColor,
                statRadius,
                statShadow,
                statLabelColor,
                statValueColor,
                codeBackground,
                codeBorderColor,
                codeRadius,
                codeShadow,
                codeColor,
                codeSize,
                shapeBackground,
                shapeBorderColor,
                shapeRadius,
                shapeShadow,
                shapeSize,
                textSize: item.size || "",
                textWeight: item.weight ?? "",
                textLetterSpacing: item.letterSpacing || "",
            };
        });
    });

    const isEnabled = computed(() => {
        if (props.config?.enabled === false) return false;
        return normalizedItems.value.length > 0;
    });

    const rootStyle = computed(() => ({
        zIndex: String(props.config?.zIndex ?? 1),
        "--floating-overlay-blur": `${overlayBlur.value}px`,
    }));

    function itemStyle(item: NormalizedFloatingItem) {
        const style = {
            left: item.x,
            top: item.y,
            width: item.width,
            opacity: String(item.opacity * globalOpacity.value),
            color: item.color,
            "--floating-rotate": `${item.rotate}deg`,
            "--floating-delay": `${item.delay}s`,
            "--floating-duration": `${item.duration}s`,
            "--floating-drift-x": `${item.driftX}px`,
            "--floating-drift-y": `${item.driftY}px`,
            "--floating-animation-name": "hero-floating-drift",
            "--floating-text-color": item.textColor || item.color,
            "--floating-text-gradient": item.gradientValue,
            "--floating-text-shadow": item.textShadow,
            "--floating-text-bg": item.textBackground,
            "--floating-text-border": item.textBorderColor,
            "--floating-text-radius": item.textRadius,
            "--floating-text-box-shadow": item.textBoxShadow,
            "--floating-text-size": item.textSize,
            "--floating-text-weight": String(item.textWeight || ""),
            "--floating-text-letter-spacing": item.textLetterSpacing,
            "--floating-item-width": String(item.width || ""),
            "--floating-card-bg": item.cardBackground || item.background,
            "--floating-card-border": item.cardBorderColor || item.borderColor,
            "--floating-card-radius": item.cardRadius,
            "--floating-card-shadow": item.cardShadow,
            "--floating-card-title-color": item.cardTitleColor,
            "--floating-card-description-color": item.cardDescriptionColor,
            "--floating-image-border": item.imageBorderColor,
            "--floating-image-radius": item.imageRadius,
            "--floating-image-shadow": item.imageShadow,
            "--floating-image-bg": item.imageBackground,
            "--floating-image-fit": item.imageFit,
            "--floating-badge-bg": item.badgeBackground,
            "--floating-badge-border": item.badgeBorderColor,
            "--floating-badge-radius": item.badgeRadius,
            "--floating-badge-shadow": item.badgeShadow,
            "--floating-badge-color": item.badgeColor,
            "--floating-badge-icon-color": item.badgeIconColor,
            "--floating-icon-bg": item.iconBackground,
            "--floating-icon-border": item.iconBorderColor,
            "--floating-icon-radius": item.iconRadius,
            "--floating-icon-shadow": item.iconShadow,
            "--floating-icon-color": item.iconColor,
            "--floating-icon-size": item.iconSize,
            "--floating-stat-bg": item.statBackground,
            "--floating-stat-border": item.statBorderColor,
            "--floating-stat-radius": item.statRadius,
            "--floating-stat-shadow": item.statShadow,
            "--floating-stat-label-color": item.statLabelColor,
            "--floating-stat-value-color": item.statValueColor,
            "--floating-code-bg": item.codeBackground,
            "--floating-code-border": item.codeBorderColor,
            "--floating-code-radius": item.codeRadius,
            "--floating-code-shadow": item.codeShadow,
            "--floating-code-color": item.codeColor,
            "--floating-code-size": item.codeSize,
            "--floating-shape-bg": item.shapeBackground,
            "--floating-shape-border": item.shapeBorderColor,
            "--floating-shape-radius": item.shapeRadius,
            "--floating-shape-shadow": item.shapeShadow,
            "--floating-shape-size": item.shapeSize,
        } as Record<string, string | undefined>;

        for (const [key, value] of Object.entries(style)) {
            if (value === undefined || value === "") {
                delete style[key];
            }
        }

        return style;
    }

    return {
        isEnabled,
        normalizedItems,
        motionEnabled,
        rootStyle,
        itemStyle,
    };
}
