import { container } from "@mdit/plugin-container";
import type { PluginSimple } from "markdown-it";

const parseAttrs = (info: string): Record<string, string> => {
    const attrs: Record<string, string> = {};
    const attrRegex = /([a-zA-Z0-9\-_]+)(?:="([^"]*)")?/g;
    let match;
    while ((match = attrRegex.exec(info)) !== null) {
        const [, key, value] = match;
        attrs[key] = value === undefined ? "true" : value;
    }
    return attrs;
};

const attrsToPropsStr = (attrs: Record<string, string>): string => {
    return Object.entries(attrs)
        .map(([key, value]) => {
            if (value === "true") {
                return key;
            }
            if (value === "false") {
                return `:${key}="false"`;
            }
            return `${key}="${value}"`;
        })
        .join(" ");
};
const timelineTypePresets = {
    success: {
        dotColor: "success",
        cardColor: "",
        icon: "mdi-check-circle",
        preset: "success",
    },
    info: {
        dotColor: "info",
        cardColor: "",
        icon: "mdi-information",
        preset: "info",
    },
    warning: {
        dotColor: "warning",
        cardColor: "",
        icon: "mdi-alert",
        preset: "warning",
    },
    error: {
        dotColor: "error",
        cardColor: "",
        icon: "mdi-close-circle",
        preset: "error",
    },
    tip: {
        dotColor: "primary",
        cardColor: "",
        icon: "mdi-lightbulb",
        preset: "tip",
    },
};

export const vuetifyTimeline: PluginSimple = (md) => {
    md.use(container, {
        name: "timeline",
        openRender: (tokens, index) => {
            const info = tokens[index].info
                .trim()
                .slice("timeline".length)
                .trim();
            const attrs = parseAttrs(info);
            const propsStr = attrsToPropsStr(attrs);
            return `<v-timeline ${propsStr}>`;
        },
        closeRender: () => `</v-timeline>`,
    });

    md.use(container, {
        name: "timeline-item",
        openRender: (tokens, index) => {
            const info = tokens[index].info
                .trim()
                .slice("timeline-item".length)
                .trim();
            const attrs = parseAttrs(info);

            const timelineAttrs: Record<string, string> = {};
            const cardAttrs: Record<string, string> = {};
            let isCardMode = false;
            let presetClass = "";

            if (attrs.type && attrs.type in timelineTypePresets) {
                const preset =
                    timelineTypePresets[
                        attrs.type as keyof typeof timelineTypePresets
                    ];
                timelineAttrs["dot-color"] = preset.dotColor;
                timelineAttrs["icon"] = preset.icon;
                presetClass = `timeline-preset-${preset.preset}`;
                if (attrs.card === "true") {
                    isCardMode = true;
                }
            }

            for (const [key, value] of Object.entries(attrs)) {
                if (key === "type") {
                    continue;
                } else if (key === "card") {
                    isCardMode = value === "true";
                } else if (key.startsWith("card-")) {
                    const cardKey = key.replace("card-", "");
                    cardAttrs[cardKey] = value;
                } else {
                    if (!timelineAttrs[key]) {
                        timelineAttrs[key] = value;
                    }
                }
            }

            const timelinePropsStr = attrsToPropsStr(timelineAttrs);

            let html = `<v-timeline-item ${timelinePropsStr}>`;

            if (isCardMode) {
                const cardColor =
                    cardAttrs.color || timelineAttrs["dot-color"] || "";
                const cardIcon = cardAttrs.icon || "";
                const cardIconAlign = cardAttrs["icon-align"] || "left";

                const cardClasses = [];
                if (presetClass) cardClasses.push(presetClass);

                html += `<v-card${
                    cardClasses.length
                        ? ` class="${cardClasses.join(" ")}"`
                        : ""
                }>`;

                let titleClass = "";
                if (cardColor && !presetClass) titleClass += `bg-${cardColor}`;
                if (cardIconAlign === "right" && titleClass)
                    titleClass += " justify-end";
                else if (cardIconAlign === "right") titleClass = "justify-end";

                html += `<v-card-title${
                    titleClass ? ` class="${titleClass}"` : ""
                }>`;

                if (cardIconAlign === "right") {
                    html += "Content Title";
                    if (cardIcon) {
                        html += ` <v-icon icon="${cardIcon}" size="large"></v-icon>`;
                    }
                } else {
                    if (cardIcon) {
                        html += `<v-icon icon="${cardIcon}" size="large"></v-icon> `;
                    }
                    html += "Content Title";
                }

                html += "</v-card-title>";
                html += '<v-card-text class="timeline-card-content">';
            }

            return html;
        },
        closeRender: (tokens, index) => {
            let openToken = null;
            for (let i = index - 1; i >= 0; i--) {
                if (tokens[i].type === "container_timeline-item_open") {
                    openToken = tokens[i];
                    break;
                }
            }

            if (openToken && openToken.info) {
                const info = openToken.info
                    .trim()
                    .slice("timeline-item".length)
                    .trim();
                const attrs = parseAttrs(info);
                const isCardMode = attrs.card === "true";

                if (isCardMode) {
                    let html = "";

                    const cardButton = attrs["card-button"] === "true";
                    if (cardButton) {
                        const cardButtonColor =
                            attrs["card-button-color"] ||
                            attrs["dot-color"] ||
                            "primary";
                        const cardButtonText =
                            attrs["card-button-text"] || "Button";
                        const cardButtonLink = attrs["card-button-link"] || "";
                        const cardButtonTarget =
                            attrs["card-button-target"] || "_self";

                        if (cardButtonLink) {
                            html += `<v-btn color="${cardButtonColor}" variant="outlined" class="mt-2" href="${cardButtonLink}" target="${cardButtonTarget}">${cardButtonText}</v-btn>`;
                        } else {
                            html += `<v-btn color="${cardButtonColor}" variant="outlined" class="mt-2">${cardButtonText}</v-btn>`;
                        }
                    }

                    html += "</v-card-text></v-card></v-timeline-item>";
                    return html;
                }
            }

            return "</v-timeline-item>";
        },
    });
};
