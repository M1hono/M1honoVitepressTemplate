<template>
  <div v-if="layers.length" class="hero-background">
    <div
      v-for="(layer, index) in layers"
      :key="`${layer.type}-${index}`"
      class="hero-bg-layer"
      :style="layerStyle(layer, index)"
    >
      <div
        v-if="layer.type === 'color'"
        class="hero-bg-color"
        :style="colorStyle(layer)"
      ></div>
      <div
        v-else-if="layer.type === 'image'"
        class="hero-bg-image"
        :style="imageStyle(layer)"
      ></div>
      <video
        v-else-if="layer.type === 'video'"
        class="hero-bg-video"
        :src="videoSrc(layer)"
        :autoplay="layer.video?.autoplay ?? true"
        :loop="layer.video?.loop ?? true"
        :muted="layer.video?.muted ?? true"
        playsinline
      ></video>
      <HeroShaderBackground
        v-else-if="layer.type === 'shader'"
        :vertex-shader="layer.shader?.custom?.vertex"
        :fragment-shader="layer.shader?.custom?.fragment"
        :preset="layer.shader?.preset"
        :speed="layer.shader?.speed ?? 1"
        :paused="layer.shader?.paused ?? false"
      />
      <ParticleSystem
        v-else-if="layer.type === 'particles'"
        :config="layer.particles ?? layer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import ParticleSystem from './ParticleSystem.vue';
import HeroShaderBackground from './HeroShaderBackground.vue';

interface ThemeableSource {
  src?: string;
  light?: string;
  dark?: string;
  alt?: string;
}

interface BackgroundLayer {
  type: 'image' | 'video' | 'color' | 'shader' | 'particles' | 'none';
  zIndex?: number;
  opacity?: number;
  blend?: string;
  image?: ThemeableSource & Record<string, any>;
  video?: ThemeableSource & Record<string, any>;
  color?: Record<string, any>;
  shader?: Record<string, any>;
  particles?: Record<string, any>;
}

interface BackgroundConfig extends Partial<BackgroundLayer> {
  mode?: 'single' | 'layers';
  layers?: BackgroundLayer[];
}

const props = defineProps<{ config?: BackgroundConfig }>();
const { isDark } = useData();

const layers = computed<BackgroundLayer[]>(() => {
  const config = props.config;
  if (!config) return [];
  if (config.mode === 'layers' && Array.isArray(config.layers)) {
    return config.layers as BackgroundLayer[];
  }
  if (config.type && config.type !== 'none') {
    return [config as BackgroundLayer];
  }
  return [];
});

const layerStyle = (layer: BackgroundLayer, index: number) => ({
  zIndex: layer.zIndex ?? index,
  opacity: layer.opacity ?? 1,
  mixBlendMode: layer.blend ?? 'normal',
});

const resolveThemeableSrc = (source?: ThemeableSource) => {
  if (!source) return '';
  if (source.light || source.dark) {
    return isDark.value ? source.dark || source.light || '' : source.light || source.dark || '';
  }
  return source.src || '';
};

const imageStyle = (layer: BackgroundLayer) => {
  const image = layer.image;
  const src = resolveThemeableSrc(image);
  return {
    backgroundImage: src ? `url(${src})` : 'none',
    backgroundSize: image?.size ?? 'cover',
    backgroundPosition: image?.position ?? 'center center',
    backgroundRepeat: image?.repeat ?? 'no-repeat',
    filter: image?.blur ? `blur(${image.blur}px)` : undefined,
    transform: image?.scale ? `scale(${image.scale})` : undefined,
  };
};

const videoSrc = (layer: BackgroundLayer) => resolveThemeableSrc(layer.video);

const colorStyle = (layer: BackgroundLayer) => {
  const color = layer.color || {};
  if (color.gradient?.enabled) {
    const stops = (color.gradient.stops || [])
      .map((stop: any) => `${stop.color} ${stop.position ?? ''}`.trim())
      .join(', ');
    if (color.gradient.type === 'radial') {
      return {
        backgroundImage: `radial-gradient(${color.gradient.shape ?? 'ellipse'} ${color.gradient.size ?? 'farthest-corner'} at ${color.gradient.center ?? '50% 50%'}, ${stops})`,
      };
    }
    if (color.gradient.type === 'conic') {
      return {
        backgroundImage: `conic-gradient(from ${color.gradient.direction ?? '0deg'} at ${color.gradient.center ?? '50% 50%'}, ${stops})`,
      };
    }
    return {
      backgroundImage: `linear-gradient(${color.gradient.direction ?? '135deg'}, ${stops})`,
    };
  }
  const solid = color.solid || {};
  const solidValue = solid.light || solid.dark || solid.value;
  if (solidValue && (solid.light || solid.dark)) {
    return {
      backgroundColor: isDark.value ? solid.dark || solid.light : solid.light || solid.dark,
    };
  }
  return {
    backgroundColor: solid.value || 'transparent',
  };
};
</script>

<style scoped>
.hero-background {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.hero-bg-layer {
  position: absolute;
  inset: 0;
}

.hero-bg-color,
.hero-bg-image,
.hero-bg-video {
  width: 100%;
  height: 100%;
}

.hero-bg-video {
  object-fit: cover;
}
</style>
