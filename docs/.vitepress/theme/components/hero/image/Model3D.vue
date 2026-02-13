<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useData } from 'vitepress';

interface MaterialConfig {
  name?: string;
  type?: string;
  color?: {
    light?: number[];
    dark?: number[];
    value?: number[];
  };
  metalness?: number;
  roughness?: number;
  shader?: any;
}

interface LightingConfig {
  ambient?: {
    color?: {
      light?: number[];
      dark?: number[];
      value?: number[];
    };
    intensity?: {
      light?: number;
      dark?: number;
      value?: number;
    };
  };
  directional?: {
    color?: {
      light?: number[];
      dark?: number[];
      value?: number[];
    };
    intensity?: {
      light?: number;
      dark?: number;
      value?: number;
    };
    position?: number[];
  };
  point?: {
    enabled?: boolean;
    color?: {
      light?: number[];
      dark?: number[];
      value?: number[];
    };
    intensity?: number;
    position?: number[];
  };
}

interface CameraConfig {
  type?: 'perspective' | 'orthographic';
  fov?: number;
  near?: number;
  far?: number;
  position?: number[];
  target?: number[];
}

interface InteractionConfig {
  enabled?: boolean;
  rotate?: boolean;
  zoom?: boolean;
  pan?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
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
  materials?: MaterialConfig[];
  lighting?: LightingConfig;
  camera?: CameraConfig;
  interaction?: InteractionConfig;
}

const props = defineProps<{
  config?: Model3DConfig;
}>();

const { isDark } = useData();
const containerRef = ref<HTMLElement | null>(null);
const isLoading = ref(true);
const loadError = ref(false);

const modelSrc = computed(() => props.config?.src || '');

const modelStyle = computed(() => ({
  width: '100%',
  height: '100%',
  maxWidth: '600px',
  maxHeight: '600px'
}));

// Note: Full 3D model support requires TresJS integration
// This is a placeholder component that shows the model URL
// For actual 3D rendering, integrate with @tresjs/core and @tresjs/cientos

onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});

watch(() => props.config?.src, (newSrc) => {
  if (newSrc) {
    isLoading.value = true;
    loadError.value = false;
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
});
</script>

<template>
  <div ref="containerRef" class="model-3d-container">
    <div v-if="isLoading" class="model-loading">
      <div class="loading-spinner"></div>
      <span>Loading 3D Model...</span>
    </div>
    <div v-else-if="loadError" class="model-error">
      <span>Failed to load 3D model</span>
    </div>
    <div v-else class="model-display">
      <!-- Placeholder: Full implementation requires TresJS -->
      <div class="model-placeholder">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
        <p class="model-path">{{ modelSrc }}</p>
        <p class="model-hint">3D Model: {{ config?.animation?.type || 'rotate' }} animation</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.model-3d-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.model-loading,
.model-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--vp-c-text-2);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.model-display {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.model-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--vp-c-text-2);
  padding: 2rem;
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  border-radius: 16px;
  border: 1px dashed var(--vp-c-divider);
}

.model-placeholder svg {
  opacity: 0.5;
}

.model-path {
  font-family: monospace;
  font-size: 0.875rem;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.model-hint {
  font-size: 0.75rem;
  opacity: 0.7;
}
</style>
