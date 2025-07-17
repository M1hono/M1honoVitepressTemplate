<script lang="ts" setup>
// @i18n
import { useData } from "vitepress";
import { computed, ref, onMounted } from "vue";
import utils from "../../../utils";
import ProgressLinear from "../ui/ProgressLinear.vue";
import State from "../ui/State.vue";
import { useSafeI18n } from "../../../utils/i18n/locale";

const { t } = useSafeI18n("article-metadata", {
    lastUpdated: "Last updated on: {date}",
    wordCount: "Word count: {count} words",
    readingTime: "Reading time: {time} minutes",
    pageViews: "Page views: {count}",
});

const { page, frontmatter, lang } = useData();

const update = computed(() =>
    page.value.lastUpdated
        ? new Date(page.value.lastUpdated).toLocaleDateString()
        : ""
);

const wordCount = ref(0);
const imageCount = ref(0);
const pageViews = ref(0);

const readTime = computed(() => {
    const time = utils.vitepress.readingTime.calculateTotalTime(
        wordCount.value,
        imageCount.value
    );
    return typeof time === 'number' ? time : 0;
});

function analyze() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        utils.vitepress.contentAnalysis.cleanupMetadata();

        const mainContainer = window.document.querySelector(".content-container .main");
        if (!mainContainer) return;

        // Clone the container to avoid modifying the live DOM
        const clone = mainContainer.cloneNode(true) as HTMLElement;

        // Remove all dialog cards from the cloned container before analysis
        clone.querySelectorAll('.md-dialog-card').forEach(el => el.remove());

        const imgs = clone.querySelectorAll<HTMLImageElement>("img");
        imageCount.value = imgs?.length || 0;
        
        const words = clone.textContent || "";
        const count = utils.content.countWord(words);
        wordCount.value = typeof count === 'number' ? count : 0;
    }
}

onMounted(() => {
    analyze();
    
    const checkPageViews = () => {
        const pvElement = document.querySelector('#busuanzi_value_page_pv');
        const text = pvElement?.innerHTML;
        const parsed = parseInt(text || '0');
        if (!isNaN(parsed)) {
            pageViews.value = parsed;
        }
    };
    
    const interval = setInterval(checkPageViews, 1000);
    setTimeout(() => clearInterval(interval), 10000);
    setTimeout(checkPageViews, 2000);
});

const isMetadata = computed(() => {
    return frontmatter.value?.metadata ?? true;
});

/**
 * Get icon name by metadata key
 */
const icon = (key: string) => {
    return utils.vitepress.getMetadataIcon(key);
};

const metadataContent = computed(() => ({
    update: t.lastUpdated.replace('{date}', update.value || ''),
    wordCount: t.wordCount.replace('{count}', String(wordCount.value || 0)),
    readTime: t.readingTime.replace('{time}', String(readTime.value || 0)),
    pageViews: t.pageViews.replace('{count}', String(pageViews.value || 0)),
}));

const metadataKeys = ["update", "wordCount", "readTime", "pageViews"] as const;
</script>

<template>
    <div v-if="isMetadata" class="word">
        <div>
            <v-row no-gutters>
                <v-col v-for="key in metadataKeys" :key="key">
                    <v-btn
                        class="mx-0 btn btn-icon"
                        rounded="lg"
                        variant="text"
                        density="comfortable"
                        :prepend-icon="icon(key)"
                    >
                        {{ metadataContent[key] }}
                    </v-btn>
                </v-col>
            </v-row>
            <ProgressLinear />
        </div>
    </div>
    <State />
    
    <!-- 不蒜子统计元素 - 必须可见才能正确统计 -->
    <span id="busuanzi_container_page_pv" style="position: absolute; left: -9999px;">
        <span id="busuanzi_value_page_pv"></span>
    </span>
</template>

<style>
    .word,
    .btn {
        color: var(--metadata-text-color);
        font-size: var(--metadata-font-size);
    }

    .btn {
        padding-left: 12px;
        padding-right: 8px;
        font-weight: 300;
    }

    .btn-icon .v-btn__prepend {
        margin-inline: calc(var(--v-btn-height) / -9) 0px;
        color: var(--metadata-text-color);
        opacity: var(--metadata-icon-opacity);
    }
</style>
