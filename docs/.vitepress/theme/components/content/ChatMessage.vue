<template>
    <div
        ref="root"
        class="chat-message"
        :class="{ shown, [`location-${location}`]: location }"
    >
        <div class="avatar" :style="{ backgroundColor }">
            <a
                v-if="effectiveAvatarLink"
                :href="effectiveAvatarLink"
                target="_blank"
                rel="noopener noreferrer"
                class="avatar-link"
                @click="handleAvatarLinkClick"
                @contextmenu.prevent
            >
                <div
                    v-if="isLoadingGithubAvatar && avatarType === 'github'"
                    class="loading-spinner"
                ></div>
                <img
                    v-else-if="avatar && !avatarLoadError"
                    :src="avatar"
                    alt="avatar"
                    @error="handleAvatarError"
                    @load="handleAvatarLoad"
                    class="avatar-img"
                />
                <span v-else-if="avatarType === 'icon'" class="avatar-icon">{{
                    avatarText
                }}</span>
                <span v-else class="avatar-text">{{ avatarText }}</span>
            </a>
            <template v-else>
                <div
                    v-if="isLoadingGithubAvatar && avatarType === 'github'"
                    class="loading-spinner"
                ></div>
                <img
                    v-else-if="avatar && !avatarLoadError"
                    :src="avatar"
                    alt="avatar"
                    @error="handleAvatarError"
                    @load="handleAvatarLoad"
                    class="avatar-img"
                />
                <span v-else-if="avatarType === 'icon'" class="avatar-icon">{{
                    avatarText
                }}</span>
                <span v-else class="avatar-text">{{ avatarText }}</span>
            </template>
        </div>
        <div class="nickname">{{ nickname || "Unknown" }}</div>
        <div class="message-box">
            <div class="vp-doc">
                <slot>&nbsp;</slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {
        computed,
        getCurrentInstance,
        onBeforeUnmount,
        onMounted,
        ref,
        watch,
    } from "vue";

    const colorMap: Record<string, string> = {
        Alice: "#cc0066",
        Bob: "#00994d",
        Carol: "#1e90ff",
        Dave: "#f4a460",
        Charlie: "#ff6b6b",
        Diana: "#4ecdc4",
        Eve: "#45b7d1",
        Frank: "#96ceb4",
        Grace: "#ffeaa7",
        Henry: "#dda0dd",
    };

    const avatarMap: Record<string, string> = {
        Koishi: "https://koishi.chat/logo.png",
        System: "https://github.com/github.png",
        Admin: "https://avatars.githubusercontent.com/u/1?v=4",
    };

    const iconMap: Record<string, string> = {
        user: "👤",
        bot: "🤖",
        system: "⚙️",
        admin: "👑",
        guest: "👻",
        ai: "🧠",
        helper: "💬",
        support: "🆘",
    };

    const props = defineProps<{
        nickname?: string;
        color?: string;
        avatar?: string;
        avatarType?: "avatarmap" | "github" | "icon" | "custom" | "text";
        avatarLink?: string;
        location?: "left" | "right";
    }>();

    const githubAvatarCache = new Map<string, string>();
    const githubAvatarUrl = ref<string>("");
    const isLoadingGithubAvatar = ref(false);
    const avatarLoadError = ref(false);
    const shown = ref(false);
    const active = ref(false);
    const moving = ref(false);
    const root = ref<HTMLElement>();

    async function fetchGithubAvatar(username: string): Promise<string> {
        if (githubAvatarCache.has(username)) {
            return githubAvatarCache.get(username)!;
        }

        try {
            const response = await fetch(
                `https://api.github.com/users/${username}`
            );
            if (response.ok) {
                const data = await response.json();
                const avatarUrl = data.avatar_url;
                githubAvatarCache.set(username, avatarUrl);
                return avatarUrl;
            }
        } catch (error) {
            console.warn(
                `Failed to fetch GitHub avatar for ${username}:`,
                error
            );
        }

        const fallbackUrl = `https://github.com/${username}.png`;
        githubAvatarCache.set(username, fallbackUrl);
        return fallbackUrl;
    }

    const backgroundColor = computed(() => {
        if (props.color) return props.color;
        if (props.nickname && colorMap[props.nickname])
            return colorMap[props.nickname];
        const colors = Object.values(colorMap);
        return colors[Math.floor(Math.random() * colors.length)];
    });

    const avatar = computed(() => {
        if (props.avatar) return props.avatar;

        switch (props.avatarType) {
            case "avatarmap":
                return avatarMap[props.nickname as keyof typeof avatarMap];
            case "github":
                return (
                    githubAvatarUrl.value ||
                    `https://github.com/${props.nickname}.png`
                );
            case "custom":
                return props.avatar;
            case "icon":
                return null;
            case "text":
            default:
                return null;
        }
    });

    const avatarText = computed(() => {
        if (props.avatarType === "icon") {
            return (
                iconMap[props.nickname as keyof typeof iconMap] || iconMap.user
            );
        }
        return props.nickname?.[0]?.toUpperCase() || "?";
    });

    const effectiveAvatarLink = computed(() => {
        if (props.avatarLink) {
            return props.avatarLink;
        }

        if (props.avatarType === "github" && props.nickname) {
            return `https://github.com/${props.nickname}`;
        }

        return null;
    });

    watch(
        () => [props.nickname, props.avatarType],
        async ([newNickname, newAvatarType]) => {
            if (newAvatarType === "github" && newNickname && !props.avatar) {
                isLoadingGithubAvatar.value = true;
                avatarLoadError.value = false;
                try {
                    const avatarUrl = await fetchGithubAvatar(newNickname);
                    githubAvatarUrl.value = avatarUrl;
                } finally {
                    isLoadingGithubAvatar.value = false;
                }
            }
        },
        { immediate: true }
    );

    function handleAvatarError() {
        avatarLoadError.value = true;
        console.warn("Avatar failed to load, using fallback");
    }

    function handleAvatarLoad() {
        avatarLoadError.value = false;
    }

    function handleAvatarLinkClick(event: MouseEvent) {
        if (effectiveAvatarLink.value) {
            event.preventDefault();
            window.open(effectiveAvatarLink.value, "_blank");
        }
    }

    function getPrevious(): Element | undefined {
        if (!root.value) return undefined;

        let last: Element | undefined;
        const messages = Array.from(document.querySelectorAll(".chat-message"));

        for (const current of messages) {
            if (current === root.value) return last;
            last = current;
        }
        return undefined;
    }

    watch(active, (value) => {
        if (!value) {
            shown.value = false;
            return;
        }

        const prev = getPrevious();
        if (!prev) {
            appear();
            return;
        }

        const rect = prev.getBoundingClientRect();
        if (rect.bottom < 0) {
            appear();
            return;
        }

        const prevVue = (prev as any).__vue__;
        if (prevVue?.exposed) {
            const prevExposed = prevVue.exposed;
            if (prevExposed.moving?.value || !prevExposed.shown?.value) {
                prevExposed.onappear?.(appear);
            } else {
                appear();
            }
        } else {
            appear();
        }
    });

    let appearCallback = () => {};

    function appear() {
        shown.value = true;
        moving.value = true;
        setTimeout(() => {
            moving.value = false;
            appearCallback();
            appearCallback = () => {};
        }, 100);
    }

    function handleScroll() {
        if (!root.value) return;

        const rect = root.value.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            active.value = true;
        }
    }

    const instance = getCurrentInstance();

    const exposed = {
        moving,
        shown,
        onappear(callback: () => void) {
            appearCallback = callback || (() => {});
        },
    };

    defineExpose(exposed);

    onMounted(() => {
        if (root.value && instance) {
            (root.value as any).__vue__ = instance;
            handleScroll();
            window.addEventListener("scroll", handleScroll);
            window.addEventListener("resize", handleScroll);
        }
    });

    onBeforeUnmount(() => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
    });
</script>

<style lang="scss">
    $avatar-size: 2.4rem;
    $msgbox-left: 3.6rem;

    .chat-message {
        position: relative;
        margin: 0.5rem 0 !important;
        opacity: 0;
        transform: translateX(-20%);
        transition: transform 0.3s ease-out, opacity 0.3s ease;

        &.shown {
            opacity: 1;
            transform: translateX(0);
        }

        &.location-right {
            .avatar {
                right: 0;
                left: auto;
            }

            .nickname {
                text-align: right;
                margin-right: $msgbox-left !important;
                margin-left: 0 !important;
            }

            .message-box {
                margin-left: auto;
                margin-right: $msgbox-left;

                &::before {
                    content: "";
                    position: absolute;
                    left: 100%;
                    right: auto;
                    top: 8px;
                    width: 0;
                    height: 0;
                    border: 6px solid transparent;
                    border-left-color: var(--vp-c-bg);
                    border-right: 0;
                    filter: drop-shadow(1px 0 0 var(--vp-c-border));
                }

                &::after {
                    content: "";
                    position: absolute;
                    left: 100%;
                    right: auto;
                    top: 9px;
                    width: 0;
                    height: 0;
                    border: 5px solid transparent;
                    border-left-color: var(--vp-c-bg);
                    border-right: 0;
                    z-index: 1;
                }
            }
        }

        .avatar {
            width: $avatar-size;
            height: $avatar-size;
            position: absolute;
            border-radius: 100%;
            transform: translateY(-1px);
            user-select: none;
            text-align: center;
            line-height: $avatar-size;
            font-size: 1.3rem;
            color: white;
            font-family: "Comic Sans MS", cursive, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            cursor: default;

            .avatar-link {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: inherit;
                text-decoration: none;
                transition: transform 0.2s ease;

                &:focus {
                    outline: none;
                }

                &:hover {
                    transform: scale(1.05);
                }

                &:hover img {
                    pointer-events: none;
                }
            }

            .avatar-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 100%;
                -webkit-user-drag: none;
                user-drag: none;
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            .avatar-text,
            .avatar-icon {
                font-weight: bold;
                font-size: inherit;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }

            .loading-spinner {
                width: 1.2rem;
                height: 1.2rem;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top: 2px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
        }

        .nickname {
            user-select: none;
            position: relative;
            margin: 0 0 0.15rem $msgbox-left !important;
            font-weight: 600;
            font-size: 0.85rem;
            color: var(--vp-c-text-2);
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
            padding: 0.5rem 0.5rem !important;

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

            .vp-doc p,
            .vp-doc :deep(summary) {
                margin: 4px 0 !important;
            }

            .vp-doc p,
            .vp-doc summary {
                margin: 4px 0 !important;
            }
        }

        @media (max-width: 768px) {
            .message-box {
                max-width: calc(100% - 3rem) !important;
            }

            &.location-right {
                .message-box {
                    max-width: calc(100% - 3rem) !important;
                    margin-right: 3rem !important;
                }

                .nickname {
                    margin-right: 3rem !important;
                }
            }
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
