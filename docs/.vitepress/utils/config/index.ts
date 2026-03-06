/**
 * Configuration utilities for client and build-time use.
 *
 * NOTE: path-resolver is NOT exported here because it uses Node.js modules.
 * Import it directly in build scripts: import { getSrcPath } from "@utils/config/path-resolver"
 */
import * as projectConfig from "./project-config";

export * from "./project-config";

export const configUtils = {
    ...projectConfig,
};

export default configUtils;
