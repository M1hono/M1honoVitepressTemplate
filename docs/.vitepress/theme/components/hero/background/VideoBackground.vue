<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { resolveAssetWithBase } from "@utils/assets";

interface ThemeableSource {
  src?: string;
  light?: string;
  dark?: string;
}

interface VideoConfig extends ThemeableSource {
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  poster?: string;
  playbackRate?: number;
}

const props = defineProps<{
  config?: VideoConfig;
}>();

const { isDark } = useData();

const resolvedSrc = computed(() => {
  const source = props.config;
  if (!source) return '';

  if (isDark.value && source.dark) return resolveAssetWithBase(source.dark);
  if (!isDark.value && source.light) return resolveAssetWithBase(source.light);
  return resolveAssetWithBase(source.src || source.light || source.dark || '');
});

const options = computed(() => ({
  autoplay: props.config?.autoplay ?? true,
  loop: props.config?.loop ?? true,
  muted: props.config?.muted ?? true,
  controls: props.config?.controls ?? false,
  poster: resolveAssetWithBase(props.config?.poster),
  playbackRate: props.config?.playbackRate ?? 1,
}));
</script>

<template>
  <video
    v-if="resolvedSrc"
    class="video-background"
    :src="resolvedSrc"
    :poster="options.poster"
    :autoplay="options.autoplay"
    :loop="options.loop"
    :muted="options.muted"
    :controls="options.controls"
    playsinline
  />
</template>

<style scoped>
.video-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
