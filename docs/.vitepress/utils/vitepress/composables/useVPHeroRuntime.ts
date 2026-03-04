import { computed, inject, ref } from "vue";
import type { Ref } from "vue";
import type { DefaultTheme } from "vitepress/theme";
import { useData } from "vitepress";
import {
    type HeroActionConfig,
    type HeroBackgroundConfig,
    type HeroFrontmatterConfig,
    type HeroImageConfig,
    type HeroImageThemeableSource,
    normalizeBackgroundConfig,
    normalizeHeroImageConfig,
    normalizeHeroWavesConfig,
    normalizeThemeableSource,
    resolveViewportEnabled,
} from "@utils/vitepress/hero-frontmatter";
import { useHeroTypographyState } from "./useHeroTypographyState";
import { useHeroFloatingWaveState } from "./useHeroFloatingWaveState";

export interface VPHeroProps {
    name?: string;
    text?: string;
    tagline?: string;
    image?: DefaultTheme.ThemeableImage;
    actions?: HeroActionConfig[];
}

export function useVPHeroRuntime(props: VPHeroProps) {
    const heroImageSlotExists = inject(
        "hero-image-slot-exists",
        ref(false),
    ) as Ref<boolean>;

    const { frontmatter, page, isDark } = useData();
    const heroRoot = ref<HTMLElement | null>(null);

    const heroConfig = computed<HeroFrontmatterConfig>(() => {
        const heroFromFrontmatter = frontmatter.value?.hero;
        if (heroFromFrontmatter && typeof heroFromFrontmatter === "object") {
            return heroFromFrontmatter as HeroFrontmatterConfig;
        }

        const heroFromPageData = page.value?.frontmatter?.hero;
        if (heroFromPageData && typeof heroFromPageData === "object") {
            return heroFromPageData as HeroFrontmatterConfig;
        }

        return {};
    });

    const resolvedName = computed(() => props.name ?? heroConfig.value.name);
    const resolvedText = computed(() => props.text ?? heroConfig.value.text);
    const resolvedTagline = computed(
        () => props.tagline ?? heroConfig.value.tagline,
    );
    const resolvedActions = computed<HeroActionConfig[] | undefined>(
        () => props.actions ?? heroConfig.value.actions,
    );

    const backgroundConfig = computed<HeroBackgroundConfig | undefined>(() =>
        normalizeBackgroundConfig(heroConfig.value.background),
    );

    const resolvedWavesConfig = computed(() => ({
        ...normalizeHeroWavesConfig(heroConfig.value.waves),
        enabled: true,
    }));

    const frontmatterImageConfig = computed<HeroImageConfig | undefined>(
        () => heroConfig.value.image,
    );

    const normalizedDefaultImage = computed<
        HeroImageThemeableSource | undefined
    >(() => normalizeThemeableSource(props.image));

    const resolvedHeroImageConfig = computed<HeroImageConfig | undefined>(() =>
        normalizeHeroImageConfig(
            frontmatterImageConfig.value,
            normalizedDefaultImage.value,
        ),
    );

    const hasImage = computed(() =>
        Boolean(heroImageSlotExists.value || resolvedHeroImageConfig.value),
    );

    const imageBackgroundEnabled = computed(() => {
        const image = resolvedHeroImageConfig.value;
        if (!image || typeof image !== "object") return false;

        const background = (image as Record<string, unknown>).background;
        if (typeof background === "boolean") return background;

        if (
            background &&
            typeof background === "object" &&
            "enabled" in (background as Record<string, unknown>)
        ) {
            return (background as Record<string, unknown>).enabled !== false;
        }

        return false;
    });

    const viewportEnabled = computed(() =>
        resolveViewportEnabled(heroConfig.value),
    );

    const hasWaves = computed(() => true);

    const floatingConfig = computed<Record<string, any> | undefined>(() => {
        const value = heroConfig.value.floating;
        if (value && typeof value === "object") {
            return value as Record<string, any>;
        }
        return undefined;
    });

    const {
        heroTypographyType,
        hasColorOverrides,
        hasMediaBackground,
        heroCssVarsStyle,
    } = useHeroTypographyState({
        heroConfig,
        backgroundConfig,
        heroRoot,
        isDark,
    });

    const {
        floatingSnippetWords,
        hasFloatingItems,
        hideTaglineForWavePriority,
        hideActionsForWavePriority,
        maxVisibleActionsForWavePriority,
        showScrollArrow,
        scrollPastHero,
    } = useHeroFloatingWaveState({
        heroConfig,
        floatingConfig,
        resolvedActions,
        resolvedTagline,
        resolvedWavesConfig,
        viewportEnabled,
        hasWaves,
        hasImage,
        heroRoot,
    });

    return {
        heroRoot,
        backgroundConfig,
        floatingConfig,
        floatingSnippetWords,
        resolvedWavesConfig,
        resolvedName,
        resolvedText,
        resolvedTagline,
        resolvedActions,
        heroTypographyType,
        hasImage,
        imageBackgroundEnabled,
        resolvedHeroImageConfig,
        hasFloatingItems,
        hasMediaBackground,
        hasColorOverrides,
        viewportEnabled,
        hasWaves,
        hideTaglineForWavePriority,
        hideActionsForWavePriority,
        maxVisibleActionsForWavePriority,
        showScrollArrow,
        scrollPastHero,
        heroCssVarsStyle,
    };
}
