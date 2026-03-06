/**
 * Reactive element resize observer.
 *
 * Wraps `ResizeObserver` into a reusable factory that components call
 * in `setup()`. Handles SSR guards, debouncing, and cleanup automatically.
 *
 * @module runtime/viewport/elementResizeState
 */

import { onMounted, onUnmounted, type Ref } from "vue";
import { debounce } from "./debounce";

export interface ElementResizeOptions {
    /** Debounce interval in ms. 0 = no debounce. Default: 100. */
    debounceMs?: number;
}

/**
 * Observes size changes on the element referenced by `targetRef`.
 *
 * `onResize` fires with the element's `contentRect` whenever the observed
 * element changes size (debounced by default).
 *
 * ```ts
 * const containerRef = ref<HTMLElement | null>(null);
 * createElementResizeState(containerRef, (rect) => {
 *   width.value = rect.width;
 *   height.value = rect.height;
 * });
 * ```
 */
export function createElementResizeState(
    targetRef: Ref<HTMLElement | null | undefined>,
    onResize: (rect: DOMRectReadOnly) => void,
    options: ElementResizeOptions = {},
) {
    const { debounceMs = 100 } = options;

    let observer: ResizeObserver | null = null;
    const handler = debounceMs > 0
        ? debounce((entries: ResizeObserverEntry[]) => {
            const entry = entries[entries.length - 1];
            if (entry) onResize(entry.contentRect);
        }, debounceMs)
        : (entries: ResizeObserverEntry[]) => {
            const entry = entries[entries.length - 1];
            if (entry) onResize(entry.contentRect);
        };

    onMounted(() => {
        if (typeof ResizeObserver === "undefined" || typeof window === "undefined") return;
        observer = new ResizeObserver(handler);
        if (targetRef.value) observer.observe(targetRef.value);
    });

    onUnmounted(() => {
        observer?.disconnect();
        observer = null;
        if ("cancel" in handler) (handler as { cancel(): void }).cancel();
    });

    return {
        /** Re-observe a new element (e.g. after a conditional render). */
        reobserve(el: HTMLElement) {
            observer?.disconnect();
            observer?.observe(el);
        },
    };
}
