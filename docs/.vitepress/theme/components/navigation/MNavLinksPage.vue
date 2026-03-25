<script setup lang="ts">
    import { computed } from "vue";

    import MNavLinks from "./MNavLinks.vue";
    import { navLinksData } from "@utils/content/navLinksData";

    const { groups, hasNavLinks, pageColumns, pageNoIcon } = navLinksData();
    const visibleGroups = computed(() => groups.value.filter((group) => group.items.length > 0));
</script>

<template>
    <section v-if="hasNavLinks && visibleGroups.length > 0" class="m-nav-page">
        <MNavLinks
            v-for="group in visibleGroups"
            :key="group.title"
            :title="group.title"
            :description="group.description"
            :items="group.items"
            :noIcon="pageNoIcon || undefined"
            :columns="group.columns ?? pageColumns"
            :collapsed="group.collapsed"
            :groupIcon="group.icon"
        />
    </section>
</template>
