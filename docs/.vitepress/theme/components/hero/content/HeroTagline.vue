<script setup lang="ts">
import { computed } from 'vue';
import { motion } from 'motion-v';

const props = defineProps<{
  text?: string;
}>();
</script>

<template>
  <motion.p
    v-if="text"
    class="hero-tagline"
    :initial="{ opacity: 0, y: 20 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8, delay: 0.4 }"
  >
    {{ text }}
  </motion.p>
</template>

<style scoped>
.hero-tagline {
  margin: 0 0 1.5rem 0;
  font-size: clamp(18px, 2.5vw, 28px);
  font-weight: 500;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  max-width: 600px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  position: relative;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05));
}

.dark .hero-tagline {
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.15));
}

@media (max-width: 768px) {
  .hero-tagline {
    font-size: clamp(16px, 4vw, 22px);
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 480px) {
  .hero-tagline {
    font-size: clamp(14px, 5vw, 20px);
    margin-bottom: 1rem;
  }
}
</style>
