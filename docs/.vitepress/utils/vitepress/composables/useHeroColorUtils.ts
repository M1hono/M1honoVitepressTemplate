import { computed, type Ref } from "vue";

export interface RGBColor {
    r: number;
    g: number;
    b: number;
}

export interface UseHeroColorUtilsOptions {
    isDark: Ref<boolean>;
}

/**
 * Color and luminance utilities for hero components.
 * Extracted from VPHero.vue to reduce component complexity.
 */
export function useHeroColorUtils(options: UseHeroColorUtilsOptions) {
    const { isDark } = options;
    const isDarkClient = computed(() => isDark.value);

    function resolveThemeColor(
        value:
            | string
            | { light?: string; dark?: string; value?: string }
            | undefined,
        fallback: string,
    ) {
        if (!value) return fallback;
        if (typeof value === "string") return value;
        return isDark.value
            ? (value.dark ?? value.light ?? value.value ?? fallback)
            : (value.light ?? value.dark ?? value.value ?? fallback);
    }

    function asRecord(value: unknown): Record<string, unknown> | undefined {
        if (!value || typeof value !== "object" || Array.isArray(value))
            return undefined;
        return value as Record<string, unknown>;
    }

    function resolveThemeValue<T>(
        value: T | { light?: T; dark?: T; value?: T } | undefined,
    ): T | undefined {
        if (value === undefined || value === null) return undefined;
        if (typeof value !== "object" || Array.isArray(value))
            return value as T;
        const theme = value as { light?: T; dark?: T; value?: T };
        return isDarkClient.value
            ? (theme.dark ?? theme.light ?? theme.value)
            : (theme.light ?? theme.dark ?? theme.value);
    }

    function toCssValue(value: unknown): string | undefined {
        if (value === undefined || value === null) return undefined;
        if (typeof value === "string") return value;
        if (typeof value === "number") return String(value);
        if (typeof value === "boolean") return value ? "1" : "0";
        if (Array.isArray(value))
            return value.map((item) => String(item)).join(" ");
        return String(value);
    }

    function clampNumber(value: number, min: number, max: number) {
        return Math.min(max, Math.max(min, value));
    }

    function toLinearChannel(channel: number) {
        const c = channel / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    }

    function relativeLuminance(color: RGBColor) {
        return (
            0.2126 * toLinearChannel(color.r) +
            0.7152 * toLinearChannel(color.g) +
            0.0722 * toLinearChannel(color.b)
        );
    }

    function percentile(values: number[], p: number) {
        if (values.length === 0) return 0;
        const sorted = [...values].sort((a, b) => a - b);
        const index = clampNumber(
            Math.floor((sorted.length - 1) * p),
            0,
            sorted.length - 1,
        );
        return sorted[index];
    }

    return {
        resolveThemeColor,
        asRecord,
        resolveThemeValue,
        toCssValue,
        clampNumber,
        toLinearChannel,
        relativeLuminance,
        percentile,
    };
}
