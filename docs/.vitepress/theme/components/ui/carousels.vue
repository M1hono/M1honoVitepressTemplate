<template>
    <div
        class="carousel"
        ref="carouselContainer"
        @wheel.prevent="handleWheel"
    >
        <v-carousel
            v-if="isReady"
            v-model="currentIndex"
            :height="carouselHeight"
            :show-arrows="showArrows"
            :cycle="cycle"
            :interval="interval"
            :hide-delimiters="hideDelimiters"
        >
            <slot></slot>
        </v-carousel>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { createElementResizeState } from "@utils/vitepress/runtime/viewport";

    defineProps({
        showArrows: {
            type: [Boolean, String],
            default: true,
        },
        cycle: {
            type: Boolean,
            default: false,
        },
        interval: {
            type: Number,
            default: 6000,
        },
        hideDelimiters: {
            type: Boolean,
            default: false,
        },
    });

    const carouselContainer = ref(null);
    const carouselHeight = ref("auto");
    const isReady = ref(false);
    const currentIndex = ref(0);

    // ===== Height measurement =====
    const updateCarouselHeight = () => {
        if (!carouselContainer.value) return;
        const items = carouselContainer.value.querySelectorAll(".v-carousel__item");
        let maxHeight = 0;
        items.forEach((item) => {
            item.style.display = "block";
            const h = item.scrollHeight;
            item.style.display = "";
            if (h > maxHeight) maxHeight = h;
        });
        carouselHeight.value = maxHeight > 0 ? `${maxHeight}px` : "auto";
        isReady.value = true;
    };

    // ===== Resize observation via shared viewport API =====
    createElementResizeState(carouselContainer, () => {
        updateCarouselHeight();
    });

    // ===== Mouse wheel navigation =====
    const handleWheel = (e) => {
        if (!carouselContainer.value) return;
        const items = carouselContainer.value.querySelectorAll(".v-carousel__item");
        const total = items.length;
        if (total === 0) return;
        if (e.deltaY > 0) {
            currentIndex.value = Math.min(currentIndex.value + 1, total - 1);
        } else {
            currentIndex.value = Math.max(currentIndex.value - 1, 0);
        }
    };

    onMounted(() => {
        updateCarouselHeight();
    });
</script>

<style scoped>
    .carousel {
        width: 100%;
        max-width: 100vw;
    }

    :deep(.v-carousel__item) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :deep(.v-carousel__item img) {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    /* ===== Symmetric prev/next arrow buttons ===== */
    :deep(.v-window__prev),
    :deep(.v-window__next) {
        top: 50% !important;
        transform: translateY(-50%) !important;
        margin: 0 !important;
    }

    /* ===== Centered delimiter dots ===== */
    :deep(.v-carousel__controls) {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        width: 100% !important;
        padding: 0 !important;
        left: 0 !important;
        right: 0 !important;
    }
</style>
