import {
    createContainerPlugin,
    containerConfigMappers as mappers,
} from "./container-plugin-factory";

/**
 * Timeline plugin with preset types and custom configuration support
 * Supports VitePress dark mode and standard alert-like configurations
 *
 * @usage
 * Basic preset types:
 * ::: timeline-item {"type": "success"}
 * Success timeline item with green styling
 * :::
 *
 * Custom configuration:
 * ::: timeline-item {"type": "custom", "dotColor": "purple", "cardColor": "purple-lighten-2", "icon": "mdi-star"}
 * Custom timeline item with full control
 * :::
 */

const timelineTypePresets = {
    success: {
        dotColor: 'success',
        cardColor: '',
        icon: 'mdi-check-circle',
        preset: 'success'
    },
    info: {
        dotColor: 'info', 
        cardColor: '',
        icon: 'mdi-information',
        preset: 'info'
    },
    warning: {
        dotColor: 'warning',
        cardColor: '',
        icon: 'mdi-alert',
        preset: 'warning'
    },
    error: {
        dotColor: 'error',
        cardColor: '',
        icon: 'mdi-close-circle',
        preset: 'error'
    },
    tip: {
        dotColor: 'primary',
        cardColor: '',
        icon: 'mdi-lightbulb',
        preset: 'tip'
    }
};

export const timelinePreset = createContainerPlugin({
    name: "timeline-item",
    component: "TimelineItem", 
    configMapping: {
        type: (value: string) => {
            if (value in timelineTypePresets) {
                const preset = timelineTypePresets[value as keyof typeof timelineTypePresets];
                return ` dot-color="${preset.dotColor}" icon="${preset.icon}" data-preset="${preset.preset}"${preset.cardColor ? ` card-color="${preset.cardColor}"` : ''}`;
            }
            return '';
        },
        dotColor: mappers.prop("dot-color"),
        cardColor: mappers.prop("card-color"),
        icon: mappers.prop("icon"),
        cardIcon: mappers.prop("card-icon"),
        size: mappers.prop("size"),
        fillDot: mappers.prop("fill-dot"),
        elevation: mappers.prop("elevation"),
        card: mappers.prop("card"),
        cardIconAlign: mappers.prop("card-icon-align"),
        cardButton: mappers.prop("card-button"),
        cardButtonText: mappers.prop("card-button-text"),
        cardButtonColor: mappers.prop("card-button-color"),
        cardButtonLink: mappers.prop("card-button-link"),
        cardButtonTarget: mappers.prop("card-button-target"),
    },
    defaultConfig: {
        type: "custom"
    }
});
