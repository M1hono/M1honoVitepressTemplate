import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
    type ComputedRef,
    type Ref,
} from "vue";
import type {
    HeroActionConfig,
    HeroFrontmatterConfig,
    HeroWavesConfig,
} from "@utils/vitepress/hero-frontmatter";

interface SnippetCategoryConfig {
    snippets?: string[];
    enabled?: boolean;
}

interface UseHeroFloatingWaveStateOptions {
    heroConfig: ComputedRef<HeroFrontmatterConfig>;
    floatingConfig: ComputedRef<Record<string, any> | undefined>;
    resolvedActions: ComputedRef<HeroActionConfig[] | undefined>;
    resolvedTagline: ComputedRef<string | undefined>;
    resolvedWavesConfig: ComputedRef<HeroWavesConfig>;
    viewportEnabled: ComputedRef<boolean>;
    hasWaves: ComputedRef<boolean>;
    hasImage: ComputedRef<boolean>;
    heroRoot: Ref<HTMLElement | null>;
}

function flattenSnippetWords(source: unknown): string[] {
    if (!Array.isArray(source)) return [];

    const words: string[] = [];
    for (const item of source) {
        if (typeof item === "string") {
            const trimmed = item.trim();
            if (trimmed) words.push(trimmed);
            continue;
        }

        if (item && typeof item === "object") {
            const category = item as SnippetCategoryConfig;
            if (category.enabled === false) return [];
            if (Array.isArray(category.snippets)) {
                for (const snippet of category.snippets) {
                    if (typeof snippet === "string" && snippet.trim()) {
                        words.push(snippet.trim());
                    }
                }
            }
        }
    }

    return Array.from(new Set(words));
}

export function useHeroFloatingWaveState(
    options: UseHeroFloatingWaveStateOptions,
) {
    const {
        heroConfig,
        floatingConfig,
        resolvedActions,
        resolvedTagline,
        resolvedWavesConfig,
        viewportEnabled,
        hasWaves,
        hasImage,
        heroRoot,
    } = options;

    const floatingSnippetWords = ref<string[]>([]);
    const hideTaglineForWavePriority = ref(false);
    const hideActionsForWavePriority = ref(false);
    const maxVisibleActionsForWavePriority = ref<number | null>(null);
    const hasScrolledFromHeroTop = ref(false);

    let wavePriorityFrame: number | null = null;
    let scrollStateFrame: number | null = null;
    let heroResizeObserver: ResizeObserver | null = null;
    let removeFontsListener: (() => void) | null = null;

    function syncFloatingSnippetWords() {
        floatingSnippetWords.value = flattenSnippetWords(heroConfig.value.snippets);
    }

    watch(
        () => [heroConfig.value.snippets, floatingConfig.value?.enabled],
        () => {
            syncFloatingSnippetWords();
        },
        { immediate: true, deep: true },
    );

    const hasFloatingItems = computed(() => {
        if (floatingConfig.value?.enabled === false) return false;
        const hasConfiguredItems =
            Array.isArray(floatingConfig.value?.items) &&
            floatingConfig.value.items.length > 0;
        return hasConfiguredItems || floatingSnippetWords.value.length > 0;
    });

    function resetWavePriorityVisibility() {
        hideTaglineForWavePriority.value = false;
        hideActionsForWavePriority.value = false;
        maxVisibleActionsForWavePriority.value = null;
    }

    function getContainerWaveOverflow(waveReserve: number) {
        if (!heroRoot.value || typeof window === "undefined") return 0;

        const container = heroRoot.value.querySelector(
            ".container",
        ) as HTMLElement | null;
        if (!container) return 0;

        const containerBottom = container.getBoundingClientRect().bottom;
        const allowedBottom = window.innerHeight - waveReserve;
        return Math.max(0, containerBottom - allowedBottom);
    }

    const showScrollArrow = computed(() => {
        const actionsCount = resolvedActions.value?.length ?? 0;
        const trimmedActions =
            typeof maxVisibleActionsForWavePriority.value === "number" &&
            maxVisibleActionsForWavePriority.value < actionsCount;
        const hasHiddenContent =
            hideTaglineForWavePriority.value ||
            hideActionsForWavePriority.value ||
            trimmedActions;

        return (
            viewportEnabled.value &&
            hasHiddenContent &&
            !hasScrolledFromHeroTop.value
        );
    });

    async function applyWavePriorityLayout() {
        if (!heroRoot.value || typeof window === "undefined") return;

        resetWavePriorityVisibility();

        if (!hasWaves.value || !viewportEnabled.value || hasScrolledFromHeroTop.value) {
            return;
        }

        await nextTick();

        const isMobileLayout = window.innerWidth < 960;
        const waveReserve = Math.max(
            Number(resolvedWavesConfig.value.height ?? 80) +
                (isMobileLayout ? 42 : 26),
            isMobileLayout ? 172 : 120,
        );

        if (getContainerWaveOverflow(waveReserve) <= 0) return;

        const totalActions = resolvedActions.value?.length ?? 0;
        if (totalActions > 1) {
            maxVisibleActionsForWavePriority.value = 1;
            await nextTick();
        }

        if (getContainerWaveOverflow(waveReserve) <= 0) return;

        if (totalActions > 0) {
            hideActionsForWavePriority.value = true;
            maxVisibleActionsForWavePriority.value = 0;
            await nextTick();
        }

        if (getContainerWaveOverflow(waveReserve) <= 0) return;

        if (resolvedTagline.value) {
            hideTaglineForWavePriority.value = true;
            await nextTick();
        }
    }

    function queueWavePriorityLayout() {
        if (typeof window === "undefined") return;

        if (wavePriorityFrame !== null) {
            window.cancelAnimationFrame(wavePriorityFrame);
        }

        wavePriorityFrame = window.requestAnimationFrame(() => {
            wavePriorityFrame = null;
            void applyWavePriorityLayout();
        });
    }

    function updateScrollState() {
        if (typeof window === "undefined") return;

        const nextScrolled = window.scrollY > 10;
        if (nextScrolled === hasScrolledFromHeroTop.value) return;

        hasScrolledFromHeroTop.value = nextScrolled;
        if (nextScrolled) {
            resetWavePriorityVisibility();
            return;
        }

        queueWavePriorityLayout();
    }

    function queueScrollStateUpdate() {
        if (typeof window === "undefined") return;

        if (scrollStateFrame !== null) {
            window.cancelAnimationFrame(scrollStateFrame);
        }

        scrollStateFrame = window.requestAnimationFrame(() => {
            scrollStateFrame = null;
            updateScrollState();
        });
    }

    function scrollPastHero() {
        if (typeof window === "undefined") return;

        window.scrollBy({
            top: window.innerHeight * 0.85,
            behavior: "smooth",
        });
    }

    onMounted(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("resize", queueWavePriorityLayout);
            window.addEventListener("orientationchange", queueWavePriorityLayout);
            window.addEventListener("scroll", queueScrollStateUpdate, {
                passive: true,
            });
            window.addEventListener("load", queueWavePriorityLayout, {
                once: true,
            });
        }

        if (
            typeof ResizeObserver !== "undefined" &&
            heroRoot.value instanceof HTMLElement
        ) {
            heroResizeObserver = new ResizeObserver(() => {
                queueWavePriorityLayout();
            });
            heroResizeObserver.observe(heroRoot.value);

            const container = heroRoot.value.querySelector(
                ".container",
            ) as HTMLElement | null;
            if (container) {
                heroResizeObserver.observe(container);
            }
        }

        if (typeof document !== "undefined" && "fonts" in document) {
            const fontSet = document.fonts;
            const onFontsLoaded = () => queueWavePriorityLayout();

            fontSet.ready.then(onFontsLoaded).catch(() => undefined);
            fontSet.addEventListener("loadingdone", onFontsLoaded);
            removeFontsListener = () => {
                fontSet.removeEventListener("loadingdone", onFontsLoaded);
            };
        }

        queueWavePriorityLayout();
    });

    onBeforeUnmount(() => {
        if (typeof window !== "undefined") {
            window.removeEventListener("resize", queueWavePriorityLayout);
            window.removeEventListener(
                "orientationchange",
                queueWavePriorityLayout,
            );
            window.removeEventListener("scroll", queueScrollStateUpdate);

            if (wavePriorityFrame !== null) {
                window.cancelAnimationFrame(wavePriorityFrame);
                wavePriorityFrame = null;
            }

            if (scrollStateFrame !== null) {
                window.cancelAnimationFrame(scrollStateFrame);
                scrollStateFrame = null;
            }
        }

        if (heroResizeObserver) {
            heroResizeObserver.disconnect();
            heroResizeObserver = null;
        }

        if (removeFontsListener) {
            removeFontsListener();
            removeFontsListener = null;
        }
    });

    watch(
        () => [
            viewportEnabled.value,
            hasWaves.value,
            hasScrolledFromHeroTop.value,
            resolvedTagline.value,
            resolvedActions.value?.length ?? 0,
            resolvedWavesConfig.value.height,
            hasImage.value,
        ],
        () => {
            queueWavePriorityLayout();
        },
        { flush: "post" },
    );

    return {
        floatingSnippetWords,
        hasFloatingItems,
        hideTaglineForWavePriority,
        hideActionsForWavePriority,
        maxVisibleActionsForWavePriority,
        showScrollArrow,
        scrollPastHero,
    };
}
