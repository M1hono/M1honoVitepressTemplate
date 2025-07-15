import { 
    withMultiSidebarTags,
    createHttpMethodsTag,
    createVersionTag,
    createStatusTag,
    createUpdateTag
} from 'vitepress-plugin-sidebar-tags';
import { getSidebarSync } from '../sidebar';
import { getSidebarTagsConfig, isSidebarTagsEnabled, getTagsConfigForLanguage } from '../../config/project-config';

function transformConfigToPluginTags(configTags: any[]): any[] {
    return configTags.map(tagConfig => {
        const pluginTag: any = {
            field: tagConfig.field,
            position: tagConfig.position || 'after',
            size: tagConfig.size || 'xs',
            variant: tagConfig.variant || 'soft',
            rounded: tagConfig.rounded || 'md'
        };
        if (tagConfig.color) {
            pluginTag.color = tagConfig.color;
        }

        if (tagConfig.prefix) {
            pluginTag.prefix = tagConfig.prefix;
        }
        if (tagConfig.suffix) {
            pluginTag.suffix = tagConfig.suffix;
        }

        if (tagConfig.condition) {
            pluginTag.condition = createConditionFunction(tagConfig.condition);
        }

        if (tagConfig.transform) {
            pluginTag.transform = createTransformFunction(tagConfig.transform, tagConfig.customEmoji);
        }

        if (tagConfig.valueStyles) {
            pluginTag.valueStyles = tagConfig.valueStyles;
        }

        return pluginTag;
    });
}

function createConditionFunction(conditionType: string): (value: any) => boolean {
    switch (conditionType) {
        case 'truthy':
            return (value) => !!value;
        case 'exists':
            return (value) => value !== undefined && value !== null && value !== '';
        case 'gte80':
            return (value) => typeof value === 'number' && value >= 80;
        default:
            return (value) => !!value;
    }
}

function createTransformFunction(transformType: boolean | string, customEmoji?: string): (value: any) => string {
    if (transformType === true || transformType === 'uppercase') {
        return (value) => String(value).toUpperCase();
    }
    
    switch (transformType) {
        case 'emoji':
            return () => customEmoji || '🔥';
        case 'lowercase':
            return (value) => String(value).toLowerCase();
        case 'capitalize':
            return (value) => String(value).charAt(0).toUpperCase() + String(value).slice(1).toLowerCase();
        case 'scoreFormat':
            return (value) => `${value}分`;
        case 'titleCase':
            return (value) => String(value).replace(/\w\S*/g, (txt) => 
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            );
        case 'snakeCase':
            return (value) => String(value).replace(/\s+/g, '_').toLowerCase();
        case 'kebabCase':
            return (value) => String(value).replace(/\s+/g, '-').toLowerCase();
        case 'camelCase':
            return (value) => String(value).replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
                index === 0 ? word.toLowerCase() : word.toUpperCase()
            ).replace(/\s+/g, '');
        case 'pascalCase':
            return (value) => String(value).replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => 
                word.toUpperCase()
            ).replace(/\s+/g, '');
        default:
            return (value) => String(value);
    }
}

export function getSidebarSyncWithTags(lang: string): any {
    const baseSidebar = getSidebarSync(lang);
    
    if (!isSidebarTagsEnabled()) {
        return baseSidebar;
    }
    
    const configTags = getTagsConfigForLanguage(lang);
    if (!configTags || configTags.length === 0) {
        return baseSidebar;
    }
    
    const pluginTags = transformConfigToPluginTags(configTags);
    
    const sidebarEntries = Object.entries(baseSidebar);
    const multiSidebar: Record<string, any> = {};
    
    for (const [path, items] of sidebarEntries) {
        multiSidebar[path] = items;
    }
    
    const enhancedSidebar = withMultiSidebarTags(multiSidebar, pluginTags, {
        docsPath: 'docs',
        debug: process.env.NODE_ENV === 'development'
    });
    
    return enhancedSidebar;
}

export function buildMultiSidebarWithTags(): Record<string, any> {
    if (!isSidebarTagsEnabled()) {
        return {};
    }
    
    const configTags = getSidebarTagsConfig().tags;
    if (!configTags || configTags.length === 0) {
        return {};
    }
    
    const pluginTags = transformConfigToPluginTags(configTags);
    
    return {};
}

export function createTagFromConfig(tagConfig: any) {
    const pluginTags = transformConfigToPluginTags([tagConfig]);
    return pluginTags[0];
}

export function getTransformedTags(langCode: string): any[] {
    const configTags = getTagsConfigForLanguage(langCode);
    return transformConfigToPluginTags(configTags);
} 