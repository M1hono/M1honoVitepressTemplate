/**
 * Global navigation hover preview state.
 *
 * @module layouts/useNavHoverPreview
 * @description
 * Manages the preview sheet displayed beside nav link items on hover/focus.
 *
 * **Architecture: module-level singleton**
 * The active menu ID and hovered link are stored at the module level (outside
 * the Vue component lifecycle) so that all instances — across
 * `VPNavLayoutSpotlight` and `VPNavLayoutColumns` — share the same reactive
 * state. This ensures that when the user moves from one root nav item to
 * another, the old preview is **immediately cancelled** without waiting for
 * the previous component's hide timer to expire.
 *
 * @example
 * ```ts
 * // Inside VPNavLayoutSpotlight / VPNavLayoutColumns:
 * const { activePreviewLink, onItemEnter, onItemLeave, resetPreview } =
 *     useNavHoverPreview(menuId.value);
 *
 * function openMenu() {
 *     setActiveMenu(menuId.value); // immediately clears any other menu's preview
 *     isOpen.value = true;
 * }
 * ```
 */

import { computed, onBeforeUnmount, ref, watchEffect } from "vue";
import type { NavLink } from "../../../../utils/config/nav-types";

// ─────────────────────────────────────────────────────────────────────────────
// Module-level (global) singleton state
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ID of the root nav item whose dropdown is currently active.
 * When changed, every other menu instance immediately clears its preview.
 */
const globalActiveMenuId = ref<string | null>(null);

/**
 * The link that the user is currently hovering inside the *active* menu.
 * `null` when no link is hovered or when the active menu changes.
 */
const globalHoveredLink = ref<NavLink | null>(null);

/** `true` while the cursor is inside the preview sheet of the active menu. */
const globalSheetHovered = ref(false);

/** Pending hide-timer for the global hovered link. */
let globalHideTimer: ReturnType<typeof setTimeout> | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers — operate on the global refs
// ─────────────────────────────────────────────────────────────────────────────

function hasPreview(link: NavLink | null): boolean {
    return Boolean(link?.preview);
}

function clearGlobalHideTimer(): void {
    if (globalHideTimer === null) return;
    clearTimeout(globalHideTimer);
    globalHideTimer = null;
}

function scheduleGlobalHide(delay = 90): void {
    clearGlobalHideTimer();
    globalHideTimer = setTimeout(() => {
        globalHideTimer = null;
        if (!globalSheetHovered.value) {
            globalHoveredLink.value = null;
        }
    }, delay);
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API — called by layout components
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Registers a root nav item as the globally active menu.
 * This immediately clears the hovered link for any previously active menu
 * so its preview sheet is hidden without delay.
 *
 * @param menuId - Unique stable ID of the opening menu (e.g. `"nav-spotlight-docs"`).
 */
export function setActiveMenu(menuId: string): void {
    if (globalActiveMenuId.value === menuId) return;
    // Instantly cancel the previous menu's preview
    clearGlobalHideTimer();
    globalHoveredLink.value = null;
    globalSheetHovered.value = false;
    globalActiveMenuId.value = menuId;
}

/**
 * Clears the globally active menu registration.
 * Called when a menu closes (e.g. `closeMenu()` or click-outside).
 *
 * @param menuId - The ID of the menu that is closing.
 *   If this does not match the current global ID, the call is a no-op to
 *   prevent a slow-closing menu from clearing a newly opened sibling.
 */
export function clearActiveMenu(menuId: string): void {
    if (globalActiveMenuId.value !== menuId) return;
    clearGlobalHideTimer();
    globalHoveredLink.value = null;
    globalSheetHovered.value = false;
    globalActiveMenuId.value = null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-instance composable
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns reactive preview sheet helpers scoped to a single nav layout
 * component instance.
 *
 * Internally, all state is delegated to the global singleton so that opening
 * a new root nav item immediately clears any existing preview.
 *
 * @param menuId - Unique stable ID for this dropdown instance.
 */
export function useNavHoverPreview(menuId: string) {
    /**
     * The link to display in the preview sheet.
     * Only non-null when:
     * 1. This component's menu is the globally active one.
     * 2. A link with a `preview` config is being hovered.
     */
    const activePreviewLink = computed<NavLink | null>(() =>
        globalActiveMenuId.value === menuId &&
        hasPreview(globalHoveredLink.value)
            ? globalHoveredLink.value
            : null,
    );

    /**
     * Called when the cursor enters a link item.
     * If the link has no preview, the active preview is immediately cleared.
     */
    function onItemEnter(link: NavLink): void {
        // Safety: only respond if this menu is globally active
        if (globalActiveMenuId.value !== menuId) return;
        clearGlobalHideTimer();
        globalHoveredLink.value = hasPreview(link) ? link : null;
    }

    /** Called when the cursor leaves a link item. Schedules a hide. */
    function onItemLeave(): void {
        if (globalActiveMenuId.value !== menuId) return;
        scheduleGlobalHide();
    }

    /** Called when the cursor enters the preview sheet itself. */
    function onSheetEnter(): void {
        if (globalActiveMenuId.value !== menuId) return;
        clearGlobalHideTimer();
        globalSheetHovered.value = true;
    }

    /** Called when the cursor leaves the preview sheet. */
    function onSheetLeave(): void {
        if (globalActiveMenuId.value !== menuId) return;
        globalSheetHovered.value = false;
        scheduleGlobalHide(50);
    }

    /**
     * Immediately clears the preview state for this menu.
     * Called on `closeMenu()` and when a sibling menu becomes active.
     */
    function resetPreview(): void {
        if (globalActiveMenuId.value !== menuId) return;
        clearGlobalHideTimer();
        globalSheetHovered.value = false;
        globalHoveredLink.value = null;
    }

    // Clean up the global timer when the component is unmounted so we don't
    // leave dangling timers if the nav is conditionally rendered.
    onBeforeUnmount(() => {
        if (globalActiveMenuId.value === menuId) {
            clearActiveMenu(menuId);
        }
    });

    return {
        activePreviewLink,
        onItemEnter,
        onItemLeave,
        onSheetEnter,
        onSheetLeave,
        resetPreview,
    };
}
