import { computed, onMounted, onUnmounted, ref, watch, type Ref } from "vue";
import {
    type HeroBackgroundConfig,
    hasMediaBackground as hasMediaBackgroundInConfig,
} from "../hero-frontmatter";

/**
 * Hero color configuration from frontmatter.
 * All values support ThemeValue<string> format:
 * { light: "...", dark: "...", value: "..." } or just "string".
 */
export interface HeroColorsConfig {
    /** Hero name & main heading color */
    title?: ThemeColorValue;
    /** Hero tagline / muted text color */
    tagline?: ThemeColorValue;
    /** Hero general text color */
    text?: ThemeColorValue;
    /** Topbar text color when nav overlaps hero (not scrolled) */
    navText?: ThemeColorValue;
    /** Topbar text color after scrolling past hero */
    navTextScrolled?: ThemeColorValue;
    /** Topbar text hover/active color while nav overlaps hero */
    navTextHover?: ThemeColorValue;
    /** Topbar text hover/active color in scrolled hero-overlap state */
    navTextHoverScrolled?: ThemeColorValue;
    /** Nav background color while nav overlaps hero */
    navBackground?: ThemeColorValue;
    /** Nav background color in scrolled hero-overlap state */
    navBackgroundScrolled?: ThemeColorValue;
    /** Search button background color */
    searchBackground?: ThemeColorValue;
    /** Search button background color in scrolled hero-overlap state */
    searchBackgroundScrolled?: ThemeColorValue;
    /** Search button hover background color */
    searchHoverBackground?: ThemeColorValue;
    /** Search button hover background color in scrolled hero-overlap state */
    searchHoverBackgroundScrolled?: ThemeColorValue;
    /** Search text/icon foreground color */
    searchText?: ThemeColorValue;
    /** Search text/icon foreground color in scrolled hero-overlap state */
    searchTextScrolled?: ThemeColorValue;
    /** Search placeholder/muted text color */
    searchTextMuted?: ThemeColorValue;
    /** Search placeholder/muted text color in scrolled hero-overlap state */
    searchTextMutedScrolled?: ThemeColorValue;
    /** Search border color */
    searchBorder?: ThemeColorValue;
    /** Search border color in scrolled hero-overlap state */
    searchBorderScrolled?: ThemeColorValue;
    /** Search key-chip background color */
    searchKeyBackground?: ThemeColorValue;
    /** Search key-chip background color in scrolled hero-overlap state */
    searchKeyBackgroundScrolled?: ThemeColorValue;
    /** Search key-chip text color */
    searchKeyText?: ThemeColorValue;
    /** Search key-chip text color in scrolled hero-overlap state */
    searchKeyTextScrolled?: ThemeColorValue;
}

type ThemeColorValue = string | { light?: string; dark?: string; value?: string };

export interface HeroNavAdaptiveOptions {
    heroRoot: Ref<HTMLElement | null>;
    backgroundConfig: Ref<HeroBackgroundConfig | undefined>;
    isDark: Ref<boolean>;
    /** Colors config from frontmatter `hero.colors` */
    heroColors: Ref<HeroColorsConfig | undefined>;
}

const NAV_ADAPTIVE_CLASS = "hero-nav-adaptive";
const NAV_SCROLLED_CLASS = "hero-nav-scrolled";
const NAV_STYLE_VARS = [
    "--hero-nav-text-color",
    "--hero-nav-text-hover-color",
    "--vp-nav-text-color",
    "--vp-nav-text-hover-color",
    "--vp-nav-custom-bg",
    "--vp-nav-search-bg",
    "--vp-nav-search-bg-hover",
    "--vp-nav-search-border",
    "--vp-nav-search-text",
    "--vp-nav-search-text-muted",
    "--vp-nav-search-key-bg",
    "--vp-nav-search-key-text",
] as const;

/** Resolve a ThemeValue<string> to the current theme's string. */
function resolveThemeColor(
    value: ThemeColorValue | undefined,
    isDark: boolean,
): string | undefined {
    if (!value) return undefined;
    if (typeof value === "string") return value;
    return isDark
        ? (value.dark ?? value.light ?? value.value)
        : (value.light ?? value.dark ?? value.value);
}

/**
 * Simplified nav adaptive composable.
 *
 * Instead of auto-detecting background luminance, this composable:
 * 1. Detects whether the hero underlaps the nav bar (scroll-based)
 * 2. Adds/removes CSS classes on `.VPNav`
 * 3. Sets `--hero-nav-text-color` from frontmatter config
 * 4. Supports two states: at-top (navText) and scrolled (navTextScrolled)
 */
export function useHeroNavAdaptive(options: HeroNavAdaptiveOptions) {
    const { heroRoot, backgroundConfig, isDark, heroColors } = options;

    const hasMediaBackground = computed(() =>
        hasMediaBackgroundInConfig(backgroundConfig.value),
    );

    const resolvedColors = computed<HeroColorsConfig>(() => {
        return heroColors.value || {};
    });

    /** Nav adaptive is enabled when nav colors are configured in frontmatter */
    const navAdaptiveEnabled = computed(() => {
        const colors = resolvedColors.value;
        return Boolean(
            colors?.navText ||
                colors?.navTextScrolled ||
                colors?.navTextHover ||
                colors?.navTextHoverScrolled ||
                colors?.navBackground ||
                colors?.navBackgroundScrolled ||
                colors?.searchBackground ||
                colors?.searchBackgroundScrolled ||
                colors?.searchHoverBackground ||
                colors?.searchHoverBackgroundScrolled ||
                colors?.searchText ||
                colors?.searchTextScrolled ||
                colors?.searchTextMuted ||
                colors?.searchTextMutedScrolled ||
                colors?.searchBorder ||
                colors?.searchBorderScrolled ||
                colors?.searchKeyBackground ||
                colors?.searchKeyBackgroundScrolled ||
                colors?.searchKeyText ||
                colors?.searchKeyTextScrolled,
        );
    });

    /** Whether the hero currently underlaps the nav bar */
    const heroUnderlapsNav = ref(false);
    /** Whether the user has scrolled past the hero top */
    const isAtTop = ref(true);

    function cleanupNavVars(nav: HTMLElement) {
        for (const cssVar of NAV_STYLE_VARS) {
            nav.style.removeProperty(cssVar);
        }
    }

    function resolveStateColor(
        topValue: ThemeColorValue | undefined,
        scrolledValue: ThemeColorValue | undefined,
    ) {
        const value = isAtTop.value ? topValue : (scrolledValue ?? topValue);
        return resolveThemeColor(value, isDark.value);
    }

    function applyNavState() {
        if (typeof document === "undefined") return;
        const nav = document.querySelector<HTMLElement>(".VPNav");
        if (!nav) return;

        const colors = resolvedColors.value;

        if (!navAdaptiveEnabled.value) {
            // Feature disabled — clean everything
            nav.classList.remove(NAV_ADAPTIVE_CLASS, NAV_SCROLLED_CLASS);
            cleanupNavVars(nav);
            return;
        }

        if (heroUnderlapsNav.value) {
            // Hero is in the nav zone
            nav.classList.add(NAV_ADAPTIVE_CLASS);

            if (isAtTop.value) {
                nav.classList.remove(NAV_SCROLLED_CLASS);
            } else {
                nav.classList.add(NAV_SCROLLED_CLASS);
            }

            const navText = resolveStateColor(
                colors?.navText,
                colors?.navTextScrolled,
            );
            const navTextHover =
                resolveStateColor(
                    colors?.navTextHover,
                    colors?.navTextHoverScrolled,
                ) || navText;
            const navBackground = resolveStateColor(
                colors?.navBackground,
                colors?.navBackgroundScrolled,
            );
            const searchBackground = resolveStateColor(
                colors?.searchBackground,
                colors?.searchBackgroundScrolled,
            );
            const searchHoverBackground = resolveStateColor(
                colors?.searchHoverBackground,
                colors?.searchHoverBackgroundScrolled,
            );
            const searchText = resolveStateColor(
                colors?.searchText,
                colors?.searchTextScrolled,
            );
            const searchTextMuted = resolveStateColor(
                colors?.searchTextMuted,
                colors?.searchTextMutedScrolled,
            );
            const searchBorder = resolveStateColor(
                colors?.searchBorder,
                colors?.searchBorderScrolled,
            );
            const searchKeyBackground = resolveStateColor(
                colors?.searchKeyBackground,
                colors?.searchKeyBackgroundScrolled,
            );
            const searchKeyText = resolveStateColor(
                colors?.searchKeyText,
                colors?.searchKeyTextScrolled,
            );

            const mappedVars: Record<string, string | undefined> = {
                "--hero-nav-text-color": navText,
                "--hero-nav-text-hover-color": navTextHover,
                "--vp-nav-text-color": navText,
                "--vp-nav-text-hover-color": navTextHover,
                "--vp-nav-custom-bg": navBackground,
                "--vp-nav-search-bg": searchBackground,
                "--vp-nav-search-bg-hover": searchHoverBackground,
                "--vp-nav-search-border": searchBorder,
                "--vp-nav-search-text": searchText,
                "--vp-nav-search-text-muted": searchTextMuted,
                "--vp-nav-search-key-bg": searchKeyBackground,
                "--vp-nav-search-key-text": searchKeyText,
            };

            for (const [cssVar, value] of Object.entries(mappedVars)) {
                if (value) {
                    nav.style.setProperty(cssVar, value);
                } else {
                    nav.style.removeProperty(cssVar);
                }
            }
        } else {
            // Hero is no longer in the nav zone — clean up
            nav.classList.remove(NAV_ADAPTIVE_CLASS, NAV_SCROLLED_CLASS);
            cleanupNavVars(nav);
        }
    }

    function updateScrollState() {
        if (typeof window === "undefined") return;
        if (!heroRoot.value) {
            heroUnderlapsNav.value = false;
            isAtTop.value = true;
            applyNavState();
            return;
        }

        const navHeightValue = Number.parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
                "--vp-nav-height",
            ),
        );
        const navHeight = Number.isFinite(navHeightValue) ? navHeightValue : 64;
        const heroRect = heroRoot.value.getBoundingClientRect();

        // Hero underlaps nav when it spans across the nav bar area
        heroUnderlapsNav.value =
            heroRect.top <= navHeight && heroRect.bottom > navHeight + 12;

        // "At top" means barely scrolled — use a small threshold
        isAtTop.value = window.scrollY <= 10;

        applyNavState();
    }

    watch(
        () => [navAdaptiveEnabled.value, resolvedColors.value, isDark.value],
        () => updateScrollState(),
        { immediate: true, deep: true },
    );

    onMounted(() => {
        updateScrollState();

        window.addEventListener("scroll", updateScrollState, { passive: true });
        window.addEventListener("resize", updateScrollState, { passive: true });
        window.addEventListener("orientationchange", updateScrollState, {
            passive: true,
        });
    });

    onUnmounted(() => {
        window.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
        window.removeEventListener("orientationchange", updateScrollState);

        // Clean up
        if (typeof document !== "undefined") {
            const nav = document.querySelector<HTMLElement>(".VPNav");
            if (nav) {
                nav.classList.remove(NAV_ADAPTIVE_CLASS, NAV_SCROLLED_CLASS);
                cleanupNavVars(nav);
            }
        }
    });

    return {
        hasMediaBackground,
        navAdaptiveEnabled,
        heroUnderlapsNav,
        isAtTop,
    };
}
