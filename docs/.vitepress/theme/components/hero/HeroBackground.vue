<script setup lang="ts">
    import { computed, onMounted, ref } from "vue";
    import { useData } from "vitepress";
    import BackgroundLayer from "./background/BackgroundLayer.vue";
    import {
        type HeroBackgroundConfig,
        resolveNormalizedBackgroundLayers,
    } from "../../../utils/vitepress/hero-frontmatter";

    const props = defineProps<{
        config?: HeroBackgroundConfig;
    }>();
    const { isDark } = useData();

    /**
     * Reactive dark mode state that tracks isDark changes properly.
     */
    const isDarkClient = computed(() => isDark.value);
    const isMounted = ref(false);

    onMounted(() => {
        isMounted.value = true;
    });

    const config = computed(() => props.config);

    function warn(message: string) {
        if (import.meta.env.DEV) {
            console.warn(`[hero][background] ${message}`);
        }
    }

    const normalizedLayers = computed(() =>
        resolveNormalizedBackgroundLayers(config.value, warn),
    );

    const filterStyle = computed(() => {
        const heroBackground = config.value;
        const opacity =
            typeof heroBackground?.opacity === "number"
                ? heroBackground.opacity
                : 1;
        const brightness =
            typeof heroBackground?.brightness === "number"
                ? heroBackground.brightness
                : 1;
        const contrast =
            typeof heroBackground?.contrast === "number"
                ? heroBackground.contrast
                : 1;
        const saturation =
            typeof heroBackground?.saturation === "number"
                ? heroBackground.saturation
                : 1;
        const extraFilter =
            typeof heroBackground?.filter === "string"
                ? heroBackground.filter.trim()
                : "";

        const filterParts = [
            `brightness(${Math.max(0, brightness)})`,
            `contrast(${Math.max(0, contrast)})`,
            `saturate(${Math.max(0, saturation)})`,
        ];

        if (extraFilter) filterParts.push(extraFilter);

        return {
            opacity: String(Math.max(0, Math.min(1, opacity))),
            filter: filterParts.join(" "),
        };
    });

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

    const cssVariableStyle = computed(() => {
        const _mounted = isMounted.value;
        const _dark = isDarkClient.value;

        const style: Record<string, string> = {};
        const mergedVars =
            config.value?.cssVars && typeof config.value.cssVars === "object"
                ? (config.value.cssVars as Record<string, unknown>)
                : {};
        if (Object.keys(mergedVars).length === 0) return style;

        for (const [rawKey, rawValue] of Object.entries(mergedVars)) {
            const key = rawKey.startsWith("--") ? rawKey : `--${rawKey}`;
            const resolved = resolveThemeValue(rawValue as any);
            const cssValue = toCssValue(resolved);
            if (cssValue !== undefined) style[key] = cssValue;
        }

        return style;
    });

    const rootStyle = computed(() => {
        const style: Record<string, string> = { ...cssVariableStyle.value };
        const configStyle = config.value?.style as
            | Record<string, unknown>
            | undefined;
        if (!configStyle) return style;

        for (const [key, value] of Object.entries(configStyle)) {
            const resolved = resolveThemeValue(value as any);
            const cssValue = toCssValue(resolved);
            if (cssValue !== undefined) style[key] = cssValue;
        }

        return style;
    });
</script>

<template>
    <div
        v-if="normalizedLayers.length > 0"
        class="hero-background"
        :style="rootStyle"
    >
        <div class="hero-background__layers" :style="filterStyle">
            <BackgroundLayer
                v-for="(layer, index) in normalizedLayers"
                :key="`${layer.type}-${index}`"
                :layer="layer"
            />
        </div>
    </div>
</template>

<style scoped>
    .hero-background {
        position: absolute;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
    }

    .hero-background__layers {
        position: absolute;
        inset: 0;
    }
</style>
