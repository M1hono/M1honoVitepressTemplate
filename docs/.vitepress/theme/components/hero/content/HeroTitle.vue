<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';

const props = defineProps<{
  text?: string;
}>();

const words = computed(() => {
  if (!props.text) return [];
  return props.text.split(' ');
});
</script>

<template>
  <div v-if="text" class="hero-title">
    <h1 class="title">
      <span
        v-for="(word, wordIndex) in words"
        :key="`word-${wordIndex}`"
        class="word"
      >
        <span
          v-for="(letter, letterIndex) in word.split('')"
          :key="`letter-${wordIndex}-${letterIndex}`"
          class="letter"
        >
          {{ letter }}
        </span>
        <span class="word-space">&nbsp;</span>
      </span>
    </h1>
  </div>
</template>

<style scoped>
.hero-title {
  margin-bottom: 1.5rem;
}

.title {
  margin: 0;
  font-size: clamp(40px, 8vw, 80px);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  position: relative;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  color: var(--vp-c-brand-1);
}

.word {
  display: inline-block;
}

.letter {
  display: inline-block;
  transform-origin: bottom;
}

.word-space {
  display: inline-block;
  width: 0.25em;
}

.dark .title {
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.4));
}

@media (max-width: 768px) {
  .title {
    font-size: clamp(32px, 10vw, 60px);
    text-align: center;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: clamp(28px, 12vw, 48px);
  }
}
</style>
