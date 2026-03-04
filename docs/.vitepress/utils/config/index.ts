import * as pathResolver from "./path-resolver";
import * as projectConfig from "./project-config";

export * from "./path-resolver";
export * from "./project-config";

export const configUtils = {
    ...pathResolver,
    ...projectConfig,
};

export default configUtils;
