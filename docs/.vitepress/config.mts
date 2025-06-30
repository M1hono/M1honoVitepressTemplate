import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';
import { commonConfig } from './config/common-config';
import { 
    buildVitePressConfig,
    getSearchLocales,
    isFeatureEnabled 
} from "./utils/config";

const vitePressConfig = buildVitePressConfig();

const config: any = {
    ...commonConfig,
    ...vitePressConfig,
};

if (isFeatureEnabled('search') && commonConfig.search) {
    config.search = {
        ...commonConfig.search,
        options: {
            ...commonConfig.search.options,
            locales: getSearchLocales()
        }
    };
}

export default withMermaid(defineConfig(config));