<script setup lang="ts">
    import "./floating/floating-elements.css";
    import type { FloatingConfig } from "./floating/types";
    import FloatingElementItem from "./floating/FloatingElementItem.vue";
    import { useFloatingElements } from "./floating/useFloatingElements";

    const props = defineProps<{
        config?: FloatingConfig;
        snippetWords?: string[];
    }>();

    const { isEnabled, normalizedItems, motionEnabled, rootStyle, itemStyle } =
        useFloatingElements(props);
</script>

<template>
    <div
        v-if="isEnabled"
        class="hero-floating-elements"
        :style="rootStyle"
        aria-hidden="true"
    >
        <FloatingElementItem
            v-for="item in normalizedItems"
            :key="item.key"
            :item="item"
            :motion-enabled="motionEnabled"
            :item-style="itemStyle(item)"
        />
    </div>
</template>
