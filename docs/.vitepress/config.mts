import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

import { commonConfig } from "./config/common-config"
import { generateLocalesConfigAuto } from "./config/project-config"

const locales = await generateLocalesConfigAuto(false);

export default withMermaid(
    defineConfig({
        ...(commonConfig as any),
        locales
    })
);