<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { resolveAssetWithBase } from "@utils/assets";

interface ThemeableSource {
  src?: string;
  light?: string;
  dark?: string;
}

interface ImageConfig extends ThemeableSource {
  size?: string;
  position?: string;
  repeat?: string;
  blur?: number;
  scale?: number;
  opacity?: number;
}

const props = defineProps<{
  config?: ImageConfig;
}>();

const { isDark } = useData();

const resolvedSrc = computed(() => {
  const source = props.config;
  if (!source) return '';

  if (isDark.value && source.dark) return resolveAssetWithBase(source.dark);
  if (!isDark.value && source.light) return resolveAssetWithBase(source.light);
  return resolveAssetWithBase(source.src || source.light || source.dark || '');
});

const imageStyle = computed(() => {
  const cfg = props.config || {};
  return {
    backgroundImage: resolvedSrc.value ? `url(${resolvedSrc.value})` : 'none',
    backgroundSize: cfg.size || 'cover',
    backgroundPosition: cfg.position || 'center',
    backgroundRepeat: cfg.repeat || 'no-repeat',
    filter: typeof cfg.blur === 'number' && cfg.blur > 0 ? `blur(${cfg.blur}px)` : undefined,
    transform: typeof cfg.scale === 'number' && cfg.scale !== 1 ? `scale(${cfg.scale})` : undefined,
    opacity: typeof cfg.opacity === 'number' ? String(cfg.opacity) : undefined,
  } as Record<string, string | undefined>;
});
</script>

<template>
  <div class="image-background" :style="imageStyle" />
</template>

<style scoped>
.image-background {
  position: absolute;
  inset: 0;
}
</style>
