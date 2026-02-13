<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  position?: string;
}>(), {
  alt: 'Hero image',
  width: 600,
  height: 600,
  fit: 'contain',
  position: 'center center'
});

const imageStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  objectFit: props.fit,
  objectPosition: props.position
}));
</script>

<template>
  <div class="image-display">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      :style="imageStyle"
      class="hero-image-src"
      loading="eager"
    />
  </div>
</template>

<style scoped>
.image-display {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image-src {
  max-width: 100%;
  max-height: 100%;
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-image-src:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}
</style>
