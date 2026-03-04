/**
 * Navigation link accessibility and auto-prefixing utilities.
 *
 * @module utils/vitepress/nav-link-access
 * @description
 * Provides helpers used by navigation components to:
 * - Determine whether an internal nav path resolves to a real VitePress page.
 * - Derive a final `href` value for anchor elements from a `link`/`href` pair.
 * - Deeply clone a `NavItem[]` array and prefix all root-relative internal
 *   links with the active locale's base path (auto language-prefixing).
 */

/** Lazily-indexed map of all Markdown source files found under `/src`. */
const markdownPages = import.meta.glob("/src/**/*.md");

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns `true` if `url` is an absolute external URL
 * (starts with `http://`, `https://`, or `//`).
 *
 * @param url - The URL string to test.
 */
function isExternalUrl(url: string): boolean {
    return /^(https?:)?\/\//.test(url);
}

/**
 * Normalises a raw file/route path to a clean VitePress route string:
 * - Strips query strings and hash fragments
 * - Removes trailing `/index.md`, `.md`, and `.html` suffixes
 * - Ensures the result starts with `/` and does **not** end with `/`
 *   (unless it is the root `/`)
 *
 * @param path - Raw path to normalise.
 * @returns A cleaned route string, e.g. `"/hero/matrix"`.
 *
 * @internal
 */
function normalizeRoutePath(path: string): string {
    let route = (path || "/").trim();
    if (!route) return "/";
    route = route.split(/[?#]/)[0] || "/";
    route = route.replace(/\/index(?:\.md|\.html)?$/i, "");
    route = route.replace(/\.(md|html)$/i, "");
    if (!route.startsWith("/")) route = `/${route}`;
    if (route.length > 1 && route.endsWith("/")) {
        route = route.slice(0, -1);
    }
    return route || "/";
}

/**
 * Converts a Markdown source file path (as returned by `import.meta.glob`)
 * to a VitePress route path.
 *
 * @param filePath - The raw file path, e.g. `"/src/en-US/hero/index.md"`.
 * @returns The corresponding route, e.g. `"/en-US/hero"`.
 *
 * @internal
 */
function pageFileToRoute(filePath: string): string {
    let route = filePath.replace(/^\/src/, "");
    route = route.replace(/\.md$/i, "");
    route = route.replace(/\/index$/i, "");
    return normalizeRoutePath(route || "/");
}

/**
 * Set of all route paths that correspond to actual Markdown source files.
 * Only populated in environments where `import.meta.glob` is resolved (Vite).
 *
 * @internal
 */
const accessibleInternalRoutes = new Set<string>(
    Object.keys(markdownPages).map((filePath) => pageFileToRoute(filePath)),
);

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns `true` if `path` is a valid navigation target — either:
 * - An external URL (allowed unconditionally), or
 * - A root-relative internal path (starts with `/`).
 *
 * Strict file-system existence is intentionally **relaxed** so that pages
 * added after the first resolve (e.g. during dev HMR) or not yet indexed
 * remain reachable.
 *
 * @param path - The candidate navigation path.
 * @returns Whether the path can be used as a clickable `<a href>`.
 */
export function isAccessibleInternalNavPath(path?: string): boolean {
    if (!path) return false;
    if (isExternalUrl(path)) return true;
    return path.startsWith("/");
}

/**
 * Resolves the final href string for a nav item from its `link` and `href`
 * properties.
 *
 * Priority:
 * 1. `href` — external URL; returned as-is.
 * 2. `link` — internal file route; returned if it passes accessibility check.
 * 3. Falls back to returning `link` unchanged so Vue-Router links are never
 *    silently dropped.
 *
 * @param link - Internal VitePress route (e.g. `"/en-US/hero/matrix/"`).
 * @param href - External URL (e.g. `"https://github.com"`).
 * @returns The resolved href, or `undefined` if neither is provided.
 */
export function resolveAccessibleNavHref(
    link?: string,
    href?: string,
): string | undefined {
    if (href) return href;
    if (!link) return undefined;
    if (isAccessibleInternalNavPath(link)) return link;
    // Return original so we don't silently break Vue Router links
    if (isExternalUrl(link) || link.startsWith("/")) return link;
    return link;
}

/**
 * Deeply clones a `NavItem[]` array and prepends `basePath` to every
 * root-relative internal `link` that does not already start with `basePath`.
 *
 * Traversal covers:
 * - Top-level `item.link`
 * - `item.dropdown.panels[].featured.link`
 * - `item.dropdown.panels[].groups[].items[].link` (recursive)
 *
 * External `href` values are never modified.
 *
 * @example
 * ```ts
 * // With basePath "/en-US/", "/hero/matrix/" becomes "/en-US/hero/matrix/"
 * const prefixed = prefixNavLinks(rawNav, "/en-US/");
 * ```
 *
 * @param items - Source array of navigation items (not mutated).
 * @param basePath - Locale base path including trailing slash, e.g. `"/en-US/"`.
 * @returns A new array with all qualifying links prefixed.
 */
export function prefixNavLinks<T>(items: T[], basePath: string): T[] {
    // Root path or empty basePath → nothing to prefix
    if (basePath === "/" || !basePath) return items;

    return items.map((item) => {
        const cloned = { ...item } as any;

        // Prefix the top-level link if it is internal and not yet prefixed
        if (
            cloned.link &&
            cloned.link.startsWith("/") &&
            !isExternalUrl(cloned.link) &&
            !cloned.link.startsWith(basePath)
        ) {
            cloned.link = basePath + cloned.link.slice(1);
        }

        // Deep-traverse dropdown panels
        if (Array.isArray(cloned.dropdown?.panels)) {
            cloned.dropdown = { ...cloned.dropdown };
            cloned.dropdown.panels = cloned.dropdown.panels.map(
                (panel: any) => {
                    const newPanel = { ...panel };

                    // Prefix featured card link
                    if (
                        newPanel.featured?.link &&
                        newPanel.featured.link.startsWith("/") &&
                        !isExternalUrl(newPanel.featured.link) &&
                        !newPanel.featured.link.startsWith(basePath)
                    ) {
                        newPanel.featured = {
                            ...newPanel.featured,
                            link: basePath + newPanel.featured.link.slice(1),
                        };
                    }

                    // Recursively prefix group item links
                    if (Array.isArray(newPanel.groups)) {
                        newPanel.groups = newPanel.groups.map((group: any) => ({
                            ...group,
                            items: prefixNavLinks(group.items, basePath),
                        }));
                    }

                    return newPanel;
                },
            );
        }

        return cloned;
    });
}
