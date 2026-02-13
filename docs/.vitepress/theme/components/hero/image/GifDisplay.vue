<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = withDefaults(defineProps<{
  src?: string;
  loop?: boolean;
  autoplay?: boolean;
}>(), {
  loop: true,
  autoplay: true
});

const gifRef = ref<HTMLImageElement | null>(null);

onMounted(() => {
  if (gifRef.value && props.autoplay) {
    // GIFs autoplay by default, but we can ensure it plays
    const playGif = () => {
      if (gifRef.value) {
        gifRef.value.src = props.src || '';
      }
    };
    playGif();
  }
});
</script>

<template>
  <div class="gif-display">
    <img
      v-if="src"
      ref="gifRef"
      :src="src"
      :alt="'Animated GIF'"
      :class="{ 'gif-loop': loop }"
      class="hero-gif-src"
      loading="eager"
    />
  </div>
</template>

<style scoped>
.gif-display {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-gif-src {
  max-width: 100%;
  max-height: 100%;
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-gif-src:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.gif-loop {
  animation-iteration-count: infinite;
}
</style>
