<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import ImageDisplay from './ImageDisplay.vue';
import VideoDisplay from './VideoDisplay.vue';
import GifDisplay from './GifDisplay.vue';
import Model3D from './Model3D.vue';

interface ThemeableSource {
  src?: string;
  light?: string;
  dark?: string;
  alt?: string;
}

interface ImageConfig {
  light?: string;
  dark?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  position?: string;
}

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

interface GifConfig {
  src?: string;
  loop?: boolean;
  autoplay?: boolean;
}

interface Model3DConfig {
  src?: string;
  scale?: number[];
  position?: number[];
  rotation?: number[];
  animation?: {
    enabled?: boolean;
    type?: 'rotate' | 'bounce' | 'float';
    speed?: number;
    axis?: number[];
    amplitude?: number;
    frequency?: number;
  };
  materials?: any[];
  lighting?: any;
  camera?: any;
  interaction?: {
    enabled?: boolean;
    rotate?: boolean;
    zoom?: boolean;
    pan?: boolean;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
  };
}

interface HeroImageConfig {
  light?: string;
  dark?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  fit?: string;
  type?: 'image' | 'video' | 'gif' | 'model3d';
  image?: ImageConfig;
  video?: VideoConfig;
  gif?: GifConfig;
  model3d?: Model3DConfig;
  motion?: {
    enabled?: boolean;
    type?: string;
    duration?: number;
    delay?: number;
  };
}

const props = defineProps<{
  config?: HeroImageConfig;
}>();

const { isDark } = useData();

const imageType = computed(() => {
  return props.config?.type || 'image';
});

const imageSrc = computed(() => {
  const config = props.config;
  if (!config) return '';
  
  if (config.image) {
    const img = config.image;
    if (isDark.value && img.dark) return img.dark;
    if (!isDark.value && img.light) return img.light;
    return img.src || '';
  }
  
  if (isDark.value && config.dark) return config.dark;
  if (!isDark.value && config.light) return config.light;
  return config.src || '';
});

const imageAlt = computed(() => {
  return props.config?.alt || props.config?.image?.alt || 'Hero image';
});

const hasImage = computed(() => {
  return !!imageSrc.value;
});
</script>

<template>
  <div v-if="hasImage" class="hero-image">
    <ImageDisplay
      v-if="imageType === 'image'"
      :src="imageSrc"
      :alt="imageAlt"
      :width="config?.width || config?.image?.width || 600"
      :height="config?.height || config?.image?.height || 600"
      :fit="config?.fit || config?.image?.fit || 'contain'"
    />
    <VideoDisplay
      v-else-if="imageType === 'video'"
      :config="config?.video"
    />
    <GifDisplay
      v-else-if="imageType === 'gif'"
      :src="config?.gif?.src || imageSrc"
      :loop="config?.gif?.loop ?? true"
      :autoplay="config?.gif?.autoplay ?? true"
    />
    <Model3D
      v-else-if="imageType === 'model3d'"
      :config="config?.model3d"
    />
  </div>
</template>

<style scoped>
.hero-image {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  height: 100%;
  max-height: 600px;
}
</style>
