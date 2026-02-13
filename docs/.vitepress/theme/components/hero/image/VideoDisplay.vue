<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useData } from 'vitepress';

interface VideoConfig {
  src?: string;
  light?: string;
  dark?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  poster?: string;
}

const props = defineProps<{
  config?: VideoConfig;
}>();

const { isDark } = useData();
const videoRef = ref<HTMLVideoElement | null>(null);

const videoSrc = computed(() => {
  if (!props.config) return '';
  if (isDark.value && props.config.dark) return props.config.dark;
  if (!isDark.value && props.config.light) return props.config.light;
  return props.config.src || '';
});

const posterSrc = computed(() => {
  return props.config?.poster || '';
});

const videoOptions = computed(() => ({
  autoplay: props.config?.autoplay ?? true,
  loop: props.config?.loop ?? true,
  muted: props.config?.muted ?? true,
  controls: props.config?.controls ?? false,
  playsinline: true
}));

onMounted(() => {
  if (videoRef.value && videoOptions.value.autoplay) {
    videoRef.value.play().catch(() => {
      // Autoplay was prevented
    });
  }
});
</script>

<template>
  <div class="video-display">
    <video
      v-if="videoSrc"
      ref="videoRef"
      :src="videoSrc"
      :poster="posterSrc"
      :autoplay="videoOptions.autoplay"
      :loop="videoOptions.loop"
      :muted="videoOptions.muted"
      :controls="videoOptions.controls"
      playsinline
      class="hero-video-src"
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
  max-width: 600px;
  max-height: 600px;
  object-fit: contain;
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-video-src:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}
</style>
