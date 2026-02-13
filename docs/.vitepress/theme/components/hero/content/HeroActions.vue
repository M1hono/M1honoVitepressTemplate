<script setup lang="ts">
import { computed } from 'vue';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import Hover3DEffect from '../effects/Hover3DEffect.vue';

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

const props = defineProps<{
  actions?: HeroAction[];
}>();

const isExternalLink = (link: string) => {
  return /^https?:\/\//.test(link);
};

const normalizeLink = (link: string) => {
  if (isExternalLink(link)) return link;
  if (link.startsWith('/')) return link;
  return '/' + link;
};

const getButtonClass = (action: HeroAction) => {
  const variant = action.style?.variant || (action.theme === 'alt' ? 'outlined' : 'filled');
  return `hero-button hero-button--${variant}`;
};

const getButtonStyle = (action: HeroAction) => {
  const style = action.style || {};
  return {
    borderRadius: style.borderRadius || '12px',
    padding: style.padding || '14px 28px',
    borderWidth: style.outlineWidth || (style.outline ? '2px' : '0'),
    borderColor: style.outlineColor || 'rgba(102, 126, 234, 1)',
    boxShadow: style.boxShadow || 'none',
  };
};

const shouldShowTilt3D = (action: HeroAction) => {
  return action.style?.hover?.tilt3D?.enabled ?? false;
};

const getTilt3DConfig = (action: HeroAction) => {
  return action.style?.hover?.tilt3D || { intensity: 15, perspective: '1000px' };
};
</script>

<template>
  <div v-if="actions && actions.length > 0" class="hero-actions">
    <template v-for="(action, index) in actions" :key="`action-${index}`">
      <Hover3DEffect
        v-if="shouldShowTilt3D(action)"
        v-bind="getTilt3DConfig(action)"
      >
        <VPButton
          :class="getButtonClass(action)"
          :style="getButtonStyle(action)"
          :theme="action.theme || 'brand'"
          :text="action.text"
          :href="normalizeLink(action.link)"
          :target="action.target || (isExternalLink(action.link) ? '_blank' : undefined)"
          :rel="action.rel || (isExternalLink(action.link) ? 'noopener noreferrer' : undefined)"
          size="medium"
        />
      </Hover3DEffect>
      <VPButton
        v-else
        :class="getButtonClass(action)"
        :style="getButtonStyle(action)"
        :theme="action.theme || 'brand'"
        :text="action.text"
        :href="normalizeLink(action.link)"
        :target="action.target || (isExternalLink(action.link) ? '_blank' : undefined)"
        :rel="action.rel || (isExternalLink(action.link) ? 'noopener noreferrer' : undefined)"
        size="medium"
      />
    </template>
  </div>
</template>

<style scoped>
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
  padding-top: 1rem;
}

.hero-button {
  font-weight: 600 !important;
  font-size: 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  min-width: 140px !important;
  text-align: center !important;
}

.hero-button--filled {
  background-color: var(--vp-c-brand-1) !important;
  color: var(--vp-c-white) !important;
}

.hero-button--outlined {
  background-color: transparent !important;
  color: var(--vp-c-brand-1) !important;
}

.hero-button--text {
  background-color: transparent !important;
  border: none !important;
  color: var(--vp-c-brand-1) !important;
}

.hero-button--ghost {
  background-color: rgba(var(--vp-c-brand-rgb), 0.1) !important;
  border-color: transparent !important;
  color: var(--vp-c-brand-1) !important;
}

.hero-button:hover {
  transform: translateY(-3px) !important;
}

.hero-button--filled:hover {
  box-shadow: 0 8px 30px rgba(var(--vp-c-brand-rgb), 0.3) !important;
}

.hero-button--outlined:hover {
  background-color: rgba(var(--vp-c-brand-rgb), 0.1) !important;
}

@media (max-width: 768px) {
  .hero-actions {
    justify-content: center;
    align-items: center;
  }
}
</style>
