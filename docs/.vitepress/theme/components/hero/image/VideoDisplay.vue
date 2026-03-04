<script setup lang="ts">
    import { computed, onMounted, ref, watch } from "vue";
    import { useData } from "vitepress";
    import { resolveAssetWithBase } from "@utils/assets";

    interface VideoConfig {
        src?: string;
        light?: string;
        dark?: string;
        autoplay?: boolean;
        loop?: boolean;
        muted?: boolean;
        controls?: boolean;
        poster?: string;
        fit?: "contain" | "cover" | "fill" | "none" | "scale-down";
        position?: string;
    }

    const props = defineProps<{
        config?: VideoConfig;
    }>();

    const { isDark } = useData();
    const videoRef = ref<HTMLVideoElement | null>(null);

    const source = computed(() => {
        if (!props.config) return "";
        if (isDark.value && props.config.dark) return props.config.dark;
        if (!isDark.value && props.config.light) return props.config.light;
        return resolveAssetWithBase(
            props.config.src || props.config.light || props.config.dark || "",
        );
    });

    const options = computed(() => ({
        autoplay: props.config?.autoplay ?? true,
        loop: props.config?.loop ?? true,
        muted: props.config?.muted ?? true,
        controls: props.config?.controls ?? false,
        poster: resolveAssetWithBase(props.config?.poster),
        fit: props.config?.fit ?? "contain",
        position: props.config?.position ?? "center center",
    }));

    const tryAutoPlay = () => {
        if (!videoRef.value || !options.value.autoplay) return;
        videoRef.value.play().catch(() => {
            // Ignore autoplay restrictions.
        });
    };

    onMounted(() => {
        tryAutoPlay();
    });

    watch(source, () => {
        tryAutoPlay();
    });
</script>

<template>
    <div class="video-display">
        <video
            v-if="source"
            ref="videoRef"
            class="hero-video-src"
            :src="source"
            :poster="options.poster"
            :autoplay="options.autoplay"
            :loop="options.loop"
            :muted="options.muted"
            :controls="options.controls"
            :style="{
                objectFit: options.fit,
                objectPosition: options.position,
            }"
            playsinline
        />
    </div>
</template>

<style scoped>
    .video-display {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .hero-video-src {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        border-radius: inherit;
    }
</style>
