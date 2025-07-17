<template>
    <div class="chat-panel">
        <div class="title" v-if="title">{{ title }}</div>
        <div class="content" :style="contentStyle" ref="contentRef">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        props: {
            title: String,
            maxHeight: [Number, String],
            autoScroll: {
                type: Boolean,
                default: true,
            },
        },
        computed: {
            contentStyle() {
                const style: Record<string, any> = {};
                if (this.maxHeight) {
                    style.maxHeight =
                        typeof this.maxHeight === "number"
                            ? `${this.maxHeight}px`
                            : this.maxHeight;
                    style.overflowY = "auto" as const;
                }
                return style;
            },
        },
        mounted() {
            if (this.autoScroll) {
                this.scrollToBottom();
            }
        },
        updated() {
            if (this.autoScroll) {
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            }
        },
        methods: {
            scrollToBottom() {
                const content = this.$refs.contentRef as HTMLElement;
                if (content) {
                    content.scrollTop = content.scrollHeight;
                }
            },
        },
    };
</script>

<style lang="scss">
    $msgbox-left: 3.6rem;
    
    .chat-panel {
        margin: 1.5rem 0;
        border-radius: 8px;
        border: 1px solid var(--vp-c-border);
        background-color: var(--vp-c-bg-alt);
        overflow: hidden;

        .title {
            text-align: center;
            font-size: 15px;
            font-weight: 600;
            color: var(--vp-c-text-1);
            padding: 0.75rem 1rem;
            background-color: var(--vp-c-bg-alt);
        }

        .content {
            padding: 0.75rem;
            background-color: var(--vp-c-bg-alt);

            :deep(.chat-message) {
                margin: 0.4rem 0 !important;
            }

            > p {
                font-size: 0.8rem;
                color: var(--vp-c-text-3);
                margin: 0.25rem 0;
                text-align: center;
            }

            :deep(.chat-message:last-child) {
                margin-bottom: 0;
            }

            &::-webkit-scrollbar {
                width: 6px;
            }

            &::-webkit-scrollbar-track {
                background: transparent;
            }

            &::-webkit-scrollbar-thumb {
                background: var(--vp-c-text-3);
                border-radius: 3px;
                opacity: 0.3;

                &:hover {
                    opacity: 0.6;
                }
            }
        }

        .message-box {
            position: relative;
            margin-left: $msgbox-left;
            width: fit-content;
            max-width: calc(100% - #{$msgbox-left});
            border-radius: 0.5rem;
            background-color: var(--vp-c-bg);
            word-break: break-word;
            border: 1px solid var(--vp-c-border);
            padding: 0.4rem 0.6rem !important;

            &::before {
                content: "";
                position: absolute;
                right: 100%;
                top: 8px;
                width: 0;
                height: 0;
                border: 6px solid transparent;
                border-right-color: var(--vp-c-bg);
                border-left: 0;
                filter: drop-shadow(-1px 0 0 var(--vp-c-border));
            }

            &::after {
                content: "";
                position: absolute;
                right: 100%;
                top: 9px;
                width: 0;
                height: 0;
                border: 5px solid transparent;
                border-right-color: var(--vp-c-bg);
                border-left: 0;
                z-index: 1;
            }

            .vp-doc {
                padding: 0;
                font-family: var(--vp-font-family-base);
                font-size: 14px;
                line-height: 1.4 !important;
                color: var(--vp-c-text-1);
                word-wrap: break-word;
            }

            .vp-doc :deep(p),
            .vp-doc :deep(summary) {
                margin: 4px 0 !important;
            }
        }

        @media (max-width: 768px) {
            margin: 1rem 0;
            
            .title {
                font-size: 14px;
                padding: 0.6rem 0.75rem;
            }
            
            .content {
                padding: 0.6rem;
            }
        }
    }
</style>
