<script setup lang="ts">
    import { computed } from "vue";
    import { withBase } from "vitepress";
    import MarkdownIt from "markdown-it";

    const props = withDefaults(
        defineProps<{
            source?: string | null;
            inline?: boolean;
        }>(),
        {
            source: "",
            inline: false,
        },
    );

    const md = new MarkdownIt({ html: true, linkify: true, breaks: true });

    const rendered = computed(() => {
        const source = (props.source ?? "").trim();
        if (!source) return "";

        const html = props.inline ? md.renderInline(source) : md.render(source);
        return html.replace(/(href|src)="(\/[^\"]*)"/g, (_match, attr, value) => {
            return `${attr}="${withBase(value)}"`;
        });
    });
</script>

<template>
    <component
        :is="inline ? 'span' : 'div'"
        v-if="rendered"
        class="markdown-text"
        :class="{ 'markdown-text--inline': inline }"
        v-html="rendered"
    />
</template>

<style scoped>
    .markdown-text {
        min-width: 0;
    }

    .markdown-text :deep(:first-child) {
        margin-top: 0;
    }

    .markdown-text :deep(:last-child) {
        margin-bottom: 0;
    }

    .markdown-text--inline :deep(*) {
        display: inline;
        margin: 0;
    }

    .markdown-text--inline :deep(code) {
        white-space: normal;
    }
</style>
