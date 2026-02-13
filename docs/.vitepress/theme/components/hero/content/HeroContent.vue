<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import HeroTitle from './HeroTitle.vue';
import HeroTagline from './HeroTagline.vue';
import HeroActions from './HeroActions.vue';

interface HeroAction {
  theme?: 'brand' | 'alt';
  text: string;
  link: string;
  target?: string;
  rel?: string;
  style?: {
    variant?: 'filled' | 'outlined' | 'text' | 'ghost';
    outline?: boolean;
    outlineWidth?: string;
    outlineColor?: string;
    borderRadius?: string;
    padding?: string;
    boxShadow?: string;
    hover?: {
      enabled?: boolean;
      tilt3D?: {
        enabled?: boolean;
        intensity?: number;
        perspective?: string;
      };
      scale?: number;
    };
  };
}

interface HeroConfig {
  name?: string;
  text?: string;
  tagline?: string;
  actions?: HeroAction[];
}

const props = defineProps<{
  config?: HeroConfig;
}>();

const { frontmatter } = useData();

const heroConfig = computed(() => props.config || frontmatter.value.hero || {});

const hasContent = computed(() => {
  return !!(heroConfig.value.name || heroConfig.value.text || heroConfig.value.tagline);
});
</script>

<template>
  <div v-if="hasContent" class="hero-content">
    <HeroTitle 
      v-if="heroConfig.name" 
      :text="heroConfig.name" 
    />
    
    <HeroTagline 
      v-if="heroConfig.tagline" 
      :text="heroConfig.tagline" 
    />
    
    <HeroActions 
      v-if="heroConfig.actions && heroConfig.actions.length > 0" 
      :actions="heroConfig.actions" 
    />
  </div>
</template>

<style scoped>
.hero-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
}
</style>
