/**
 * VitePress Utils Plugin System
 * Organized utility functions for easy access via @utils
 */
import { contentUtils } from "./content";
import { vitepressUtils } from "./vitepress";
import { chartsUtils } from "./charts";
import { i18nUtils } from "./i18n";
import { countWord } from "./content/functions";

export const utils = {
    content: contentUtils,
    vitepress: vitepressUtils,
    charts: chartsUtils,
    i18n: i18nUtils,
    countWord,
    text: contentUtils.text,
};

export default utils;

export { contentUtils as content } from "./content";
export { vitepressUtils as vitepress } from "./vitepress";
export { chartsUtils as charts } from "./charts";
export { i18nUtils as i18n } from "./i18n";

export * from "./content/functions";
