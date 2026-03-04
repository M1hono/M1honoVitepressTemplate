/**
 * VitePress utilities for CryChicDoc
 * Sidebar generation and VitePress-specific functionality
 */

import * as metadata from "./metadata";
import * as navigation from "./navigation";
import * as config from "./config";

export * from "./metadata";
export * from "./navigation";
export * from "./config";
export * from "./hero-frontmatter";
export * from "./composables";

export const vitepressUtils = {
    ...metadata,
    ...navigation,
    ...config,
};

export default vitepressUtils;
