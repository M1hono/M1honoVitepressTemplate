<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useData } from 'vitepress';

const props = withDefaults(defineProps<{
  height?: number;
  speed?: number;
  frequency?: number;
  color?: number[];
  opacity?: number;
  direction?: number;
  segments?: {
    width: number;
    height: number;
  };
  animated?: boolean;
  animationSpeed?: number;
}>(), {
  height: 0.5,
  speed: 1.0,
  frequency: 0.02,
  color: () => [0.2, 0.4, 0.8],
  opacity: 0.6,
  direction: 1,
  segments: () => ({ width: 50, height: 50 }),
  animated: true,
  animationSpeed: 1.0
});

const { isDark } = useData();

const waveRef = ref<HTMLElement | null>(null);
const time = ref(0);
let animationFrame: number | null = null;

const waveColor = computed(() => {
  const baseColor = isDark.value ? [0.1, 0.2, 0.4] : props.color;
  return `rgba(${baseColor.join(',')}, ${props.opacity})`;
});

const animate = () => {
  if (!props.animated) return;
  
  time.value += 0.016 * props.speed * props.animationSpeed;
  
  if (waveRef.value) {
    const waveOffset = Math.sin(time.value * props.frequency * 100) * props.height * 20;
    waveRef.value.style.transform = `translateY(${waveOffset}px)`;
  }
  
  animationFrame = requestAnimationFrame(animate);
};

onMounted(() => {
  if (props.animated) {
    animate();
  }
});

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});

watch(() => props.animated, (newVal) => {
  if (newVal && !animationFrame) {
    animate();
  } else if (!newVal && animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
});
</script>

<template>
  <div ref="waveRef" class="wave-layer">
    <svg
      class="wave-svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient :id="`wave-gradient-${Math.random().toString(36).substr(2, 9)}`" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" :stop-color="waveColor" stop-opacity="1" />
          <stop offset="50%" :stop-color="waveColor" stop-opacity="0.8" />
          <stop offset="100%" :stop-color="waveColor" stop-opacity="1" />
        </linearGradient>
      </defs>
      <path
        :fill="`url(#${`wave-gradient-${Math.random().toString(36).substr(2, 9)}`})`"
        :d="generateWavePath(time, height, frequency, direction)"
        class="wave-path"
      />
    </svg>
  </div>
</template>

<script lang="ts">
function generateWavePath(time: number, height: number, frequency: number, direction: number): string {
  const width = 1440;
  const baseHeight = 320;
  const amplitude = height * 50;
  
  let path = `M0,${baseHeight} `;
  
  for (let x = 0; x <= width; x += 10) {
    const y = baseHeight - amplitude * (0.3 + 0.7 * Math.abs(Math.sin((x * frequency) + time * direction)));
    path += `L${x},${y} `;
  }
  
  path += `L${width},${baseHeight} Z`;
  
  return path;
}
</script>

<style scoped>
.wave-layer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wave-svg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 150px;
}

.wave-path {
  transition: transform 0.1s linear;
}
</style>
