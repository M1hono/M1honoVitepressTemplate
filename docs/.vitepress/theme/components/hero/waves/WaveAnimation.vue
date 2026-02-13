<script setup lang="ts">
import { computed } from 'vue';
import WaveLayer from './WaveLayer.vue';

interface WaveLayerConfig {
  height?: number;
  speed?: number;
  frequency?: number;
  color?: number[];
  opacity?: number;
  direction?: number;
}

interface WavesConfig {
  enabled?: boolean;
  count?: number;
  layers?: WaveLayerConfig[];
  segments?: {
    width?: number;
    height?: number;
  };
  animation?: {
    enabled?: boolean;
    speed?: number;
    loop?: boolean;
  };
  zIndex?: number;
}

const props = defineProps<{
  config?: WavesConfig;
}>();

const wavesEnabled = computed(() => {
  return props.config?.enabled ?? false;
});

const waveLayers = computed(() => {
  if (!props.config?.layers || props.config.layers.length === 0) {
    // Default waves if no config
    return [
      { height: 0.5, speed: 1.0, frequency: 0.02, color: [0.2, 0.4, 0.8], opacity: 0.6, direction: 1 },
      { height: 0.3, speed: 0.8, frequency: 0.015, color: [0.3, 0.5, 0.9], opacity: 0.5, direction: -1 },
      { height: 0.4, speed: 1.2, frequency: 0.025, color: [0.1, 0.3, 0.7], opacity: 0.4, direction: 1 },
    ];
  }
  return props.config.layers;
});

const segments = computed(() => {
  return {
    width: props.config?.segments?.width ?? 50,
    height: props.config?.segments?.height ?? 50,
  };
});

const animationEnabled = computed(() => {
  return props.config?.animation?.enabled ?? true;
});

const animationSpeed = computed(() => {
  return props.config?.animation?.speed ?? 1.0;
});
</script>

<template>
  <div v-if="wavesEnabled" class="wave-animation">
    <WaveLayer
      v-for="(layer, index) in waveLayers"
      :key="`wave-${index}`"
      :height="layer.height ?? 0.5"
      :speed="layer.speed ?? 1.0"
      :frequency="layer.frequency ?? 0.02"
      :color="layer.color ?? [0.2, 0.4, 0.8]"
      :opacity="layer.opacity ?? 0.6"
      :direction="layer.direction ?? 1"
      :segments="segments"
      :animated="animationEnabled"
      :animation-speed="animationSpeed"
      :style="{ zIndex: (config?.zIndex ?? 1000) - index }"
    />
  </div>
</template>

<style scoped>
.wave-animation {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}
</style>
