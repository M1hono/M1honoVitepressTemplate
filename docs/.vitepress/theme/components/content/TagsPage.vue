<template>
    <div class="tags-page">
        <!-- Page Title -->
        <div class="page-header">
            <h1 class="page-title">
                {{ page.frontmatter.title || t.pageTitle }}
            </h1>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
            <div class="loading-spinner"></div>
            <p>{{ t.loadingTagData }}</p>
        </div>

        <!-- Error State -->
        <div v-else-if="loadError" class="error-state">
            <div class="error-icon">⚠️</div>
            <p>{{ t.loadingError }}</p>
            <button class="retry-button" @click="loadTagData">
                {{ t.retry }}
            </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="totalTags === 0" class="empty-state">
            <div class="empty-icon">🏷️</div>
            <p>{{ t.noTagsFound }}</p>
        </div>

        <!-- Main Content -->
        <template v-else>
            <!-- Search and Filter Controls -->
            <div class="tags-controls">
                <div class="search-box">
                    <svg
                        class="search-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        v-model="searchQuery"
                        type="text"
                        :placeholder="t.searchPlaceholder"
                        class="search-input"
                    />
                </div>

                <div class="view-controls">
                    <button
                        :class="[
                            'view-btn',
                            { 'view-btn--active': viewMode === 'cloud' },
                        ]"
                        @click="viewMode = 'cloud'"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path
                                d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"
                            />
                        </svg>
                        {{ t.tagCloud }}
                    </button>
                    <button
                        :class="[
                            'view-btn',
                            { 'view-btn--active': viewMode === 'list' },
                        ]"
                        @click="viewMode = 'list'"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <line x1="8" y1="6" x2="21" y2="6" />
                            <line x1="8" y1="12" x2="21" y2="12" />
                            <line x1="8" y1="18" x2="21" y2="18" />
                            <line x1="3" y1="6" x2="3.01" y2="6" />
                            <line x1="3" y1="12" x2="3.01" y2="12" />
                            <line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                        {{ t.list }}
                    </button>
                </div>
            </div>

            <!-- Tags Display -->
            <div v-if="viewMode === 'cloud'" class="tags-cloud">
                <TagBadge
                    v-for="tag in filteredTags"
                    :key="tag.name"
                    :tag="tag.name"
                    :count="tag.count"
                    :clickable="true"
                    :style="{ fontSize: getTagSize(tag.count) }"
                    @click="selectTag"
                />
            </div>

            <div v-else class="tags-list">
                <div
                    v-for="tag in filteredTags"
                    :key="tag.name"
                    class="tag-item"
                    @click="selectTag(tag.name)"
                >
                    <div class="tag-item__header">
                        <TagBadge
                            :tag="tag.name"
                            :count="tag.count"
                            :clickable="true"
                        />
                        <span class="tag-item__pages"
                            >{{ tag.count }} {{ t.pages }}</span
                        >
                    </div>
                    <div class="tag-item__preview">
                        <span
                            v-for="(page, index) in tag.pages.slice(0, 3)"
                            :key="page.path"
                            class="page-preview"
                        >
                            {{ page.title
                            }}{{
                                index < Math.min(tag.pages.length, 3) - 1
                                    ? ", "
                                    : ""
                            }}
                        </span>
                        <span v-if="tag.pages.length > 3" class="more-pages">
                            {{
                                t.morePages.replace(
                                    "{count}",
                                    (tag.pages.length - 3).toString(),
                                )
                            }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Selected Tag Pages -->
            <div v-if="selectedTags.length > 0" class="selected-tag-section">
                <div class="selected-tag-header">
                    <h2>
                        {{ t.selectedTags }}
                        <TagBadge
                            v-for="tag in selectedTags"
                            :key="tag"
                            :tag="tag"
                            :clickable="true"
                            @click="selectTag"
                        />
                        <span class="selected-count"
                            >({{ selectedTagPages.length }} {{ t.pages }})</span
                        >
                    </h2>
                    <button class="clear-selection" @click="clearSelection">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        {{ t.clearSelection }}
                    </button>
                </div>

                <div v-if="selectedTagPages.length > 0" class="pages-grid">
                    <a
                        v-for="page in selectedTagPages"
                        :key="page.path"
                        :href="page.path"
                        class="page-card"
                    >
                        <div class="page-card__header">
                            <h3 class="page-card__title">{{ page.title }}</h3>
                            <div
                                v-if="page.progress"
                                class="page-card__progress"
                            >
                                <div class="progress-bar">
                                    <div
                                        class="progress-fill"
                                        :style="{ width: `${page.progress}%` }"
                                    ></div>
                                </div>
                                <span class="progress-text"
                                    >{{ page.progress }}%</span
                                >
                            </div>
                        </div>
                        <p
                            v-if="page.description"
                            class="page-card__description"
                        >
                            {{ page.description }}
                        </p>
                        <div class="page-card__tags">
                            <TagBadge
                                v-for="tag in page.tags.slice(0, 3)"
                                :key="tag"
                                :tag="tag"
                                :clickable="false"
                            />
                            <span v-if="page.tags.length > 3" class="more-tags">
                                +{{ page.tags.length - 3 }}
                            </span>
                        </div>
                    </a>
                </div>

                <!-- No matching pages message -->
                <div v-else class="no-matching-pages">
                    <div class="no-match-icon">🔍</div>
                    <p>{{ t.noMatchingPages }}</p>
                    <p class="no-match-hint">{{ t.noMatchingPagesHint }}</p>
                </div>
            </div>

            <!-- Statistics -->
            <div class="tags-stats">
                <div class="stat-item">
                    <span class="stat-number">{{ totalTags }}</span>
                    <span class="stat-label">{{ t.totalTags }}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">{{ totalPages }}</span>
                    <span class="stat-label">{{ t.totalPages }}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">{{ filteredTags.length }}</span>
                    <span class="stat-label">{{ t.matchingTags }}</span>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
    // @i18n
    import { ref, computed, onMounted, watch } from "vue";
    import { useData, withBase } from "vitepress";
    import TagBadge from "../ui/TagBadge.vue";
    import { useSafeI18n } from "@utils/i18n/locale";
    import {
        getLanguageByCode,
        getDefaultLanguage,
    } from "@config/project-config";

    // Type definitions
    interface PageInfo {
        title: string;
        path: string;
        tags: string[];
        description?: string;
        progress?: number;
    }

    interface TagInfo {
        name: string;
        count: number;
        pages: PageInfo[];
    }

    const { t } = useSafeI18n("tags-page", {
        pageTitle: "Tags",
        loadingTagData: "Loading tag data...",
        loadingError: "Failed to load tag data. Please try again.",
        retry: "Retry",
        noTagsFound: "No tags found.",
        searchPlaceholder: "Search tags...",
        tagCloud: "Cloud",
        list: "List",
        pages: "pages",
        morePages: "and {count} more.",
        selectedTags: "Pages with tags:",
        clearSelection: "Clear",
        noMatchingPages: "No pages match all selected tags.",
        noMatchingPagesHint: "Try removing some tags to see more results.",
        totalTags: "Total Tags",
        totalPages: "Total Pages",
        matchingTags: "Matching Tags",
    });

    const { page, lang } = useData();

    const currentLanguage = computed(() => {
        return getLanguageByCode(lang.value) || getDefaultLanguage();
    });

    const activeLangCode = computed(() => {
        return currentLanguage.value.code || getDefaultLanguage().code;
    });

    type TagData = {
        [key: string]: {
            name: string;
            count: number;
            pages: PageInfo[];
        };
    };

    const tagData = ref<TagData>({});
    const isLoading = ref(false);
    const loadError = ref<string | null>(null);

    const searchQuery = ref("");
    const viewMode = ref<"cloud" | "list">("cloud");
    const selectedTags = ref<string[]>([]);

    const filteredTags = computed(() => {
        const tags = Object.values(tagData.value);

        if (!searchQuery.value) {
            return tags.sort((a, b) => b.count - a.count);
        }

        const query = searchQuery.value.toLowerCase();
        return tags
            .filter((tag) => tag.name.toLowerCase().includes(query))
            .sort((a, b) => b.count - a.count);
    });

    const selectedTagPages = computed(() => {
        if (selectedTags.value.length === 0) {
            return [];
        }

        if (selectedTags.value.length === 1) {
            const tag = selectedTags.value[0];
            return tagData.value[tag]?.pages || [];
        } else {
            const allPages = new Map<string, PageInfo>();

            selectedTags.value.forEach((tag, index) => {
                const tagPages = tagData.value[tag]?.pages || [];

                if (index === 0) {
                    tagPages.forEach((page) => allPages.set(page.path, page));
                } else {
                    const currentPaths = new Set(tagPages.map((p) => p.path));
                    for (const [path, page] of allPages) {
                        if (!currentPaths.has(path)) {
                            allPages.delete(path);
                        }
                    }
                }
            });

            return Array.from(allPages.values());
        }
    });

    const totalTags = computed(() => Object.keys(tagData.value).length);
    const totalPages = computed(() => {
        return Object.values(tagData.value).reduce(
            (sum, tag) => sum + tag.count,
            0,
        );
    });

    function getTagSize(count: number): string {
        const maxCount = Math.max(
            ...Object.values(tagData.value).map((tag) => tag.count),
        );
        const minSize = 0.75;
        const maxSize = 1.5;
        const ratio = count / maxCount;
        const size = minSize + (maxSize - minSize) * ratio;
        return `${size}rem`;
    }

    function selectTag(tagName: string) {
        if (selectedTags.value.includes(tagName)) {
            selectedTags.value = selectedTags.value.filter(
                (t) => t !== tagName,
            );
        } else {
            selectedTags.value.push(tagName);
        }

        const url = new URL(window.location.href);
        if (selectedTags.value.length > 0) {
            url.searchParams.set("tags", selectedTags.value.join(","));
        } else {
            url.searchParams.delete("tags");
        }
        window.history.pushState({}, "", url.toString());
    }

    function clearSelection() {
        selectedTags.value = [];
        const url = new URL(window.location.href);
        url.searchParams.delete("tags");
        window.history.pushState({}, "", url.toString());
    }

    // Enhanced tag data loading with language support
    async function loadTagData() {
        isLoading.value = true;
        loadError.value = null;

        try {
            const langCode = activeLangCode.value;
            const defaultLangCode = getDefaultLanguage().code;
            const candidateUrls = Array.from(
                new Set([
                    withBase(`/data/${langCode}/tags.json`),
                    withBase(`/data/${defaultLangCode}/tags.json`),
                ]),
            );

            let loadedData: { tags?: TagData } | null = null;
            let loadedUrl = "";

            for (const candidateUrl of candidateUrls) {
                const response = await fetch(candidateUrl);
                if (!response.ok) continue;
                loadedData = await response.json();
                loadedUrl = candidateUrl;
                break;
            }

            if (loadedData) {
                tagData.value = loadedData.tags || {};
                console.log(
                    `[TagsPage] Loaded ${Object.keys(tagData.value).length} tags for language: ${langCode} from ${loadedUrl}`,
                );
            } else {
                console.warn(
                    `Tag data not found for ${langCode}, using empty data`,
                );
                loadError.value = `${t.loadingError}: ${langCode}`;
                tagData.value = {};
            }
        } catch (error) {
            console.error("Failed to load tag data:", error);
            loadError.value = `Failed to load tag data: ${error}`;
            tagData.value = {};
        } finally {
            isLoading.value = false;
        }
    }

    function getUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const tagsParam = urlParams.get("tags");
        return tagsParam ? tagsParam.split(",") : [];
    }

    // Watch for language changes and reload tag data
    watch(lang, (newLang, oldLang) => {
        if (newLang !== oldLang) {
            console.log(
                `[TagsPage] Language changed from ${oldLang} to ${newLang}, reloading tag data`,
            );
            loadTagData();
        }
    });

    onMounted(async () => {
        loadTagData();

        // Set initial selected tags from URL
        const tagsFromUrl = getUrlParams();
        if (tagsFromUrl.length > 0) {
            selectedTags.value = tagsFromUrl;
        }

        window.addEventListener("popstate", () => {
            const tagsFromUrl = getUrlParams();
            selectedTags.value = tagsFromUrl;
        });
    });
</script>

<style scoped>
    .tags-page {
        max-width: 1024px;
        margin: 0 auto;
        padding: 4rem 2rem;
    }

    /* Page Header */
    .page-header {
        margin-bottom: 4rem;
        text-align: left;
    }

    .page-title {
        margin: 0;
        font-size: 2.75rem;
        font-weight: 700;
        letter-spacing: -0.015em;
        color: var(--vp-c-text-1);
        line-height: 1.1;
    }

    /* Controls (Search & View Toggles) */
    .tags-controls {
        display: flex;
        gap: 1rem;
        margin-bottom: 3rem;
        align-items: center;
        border-bottom: 1px solid var(--vp-c-divider);
        padding-bottom: 1.5rem;
    }

    .search-box {
        position: relative;
        flex: 1;
        max-width: 320px;
    }

    .search-icon {
        position: absolute;
        left: 0.85rem;
        top: 50%;
        transform: translateY(-50%);
        width: 1rem;
        height: 1rem;
        color: var(--vp-c-text-3);
    }

    .search-input {
        width: 100%;
        padding: 0.65rem 1rem 0.65rem 2.5rem;
        border: 1px solid var(--vp-c-divider);
        border-radius: 8px;
        background-color: var(--vp-c-bg);
        color: var(--vp-c-text-1);
        font-size: 0.9rem;
        transition: border-color 0.2s ease;
    }

    .search-input:focus {
        outline: none;
        border-color: var(--vp-c-text-3);
    }

    .search-input:focus + .search-icon {
        color: var(--vp-c-text-2);
    }

    .view-controls {
        display: flex;
        gap: 0.25rem;
        background-color: var(--vp-c-bg-soft);
        padding: 0.25rem;
        border-radius: 8px;
        margin-left: auto;
    }

    .view-btn {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        border: none;
        background: transparent;
        color: var(--vp-c-text-2);
        font-size: 0.85rem;
        font-weight: 500;
        cursor: pointer;
        transition:
            background-color 0.2s ease,
            color 0.2s ease;
    }

    .view-btn svg {
        width: 1rem;
        height: 1rem;
    }

    .view-btn--active {
        background-color: var(--vp-c-bg);
        color: var(--vp-c-text-1);
    }

    html.dark .view-btn--active {
        background-color: var(--vp-c-bg);
    }

    /* Tags Displays */
    .tags-cloud {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-bottom: 4rem;
        align-items: center;
    }

    .tags-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1rem;
        margin-bottom: 4rem;
    }

    .tag-item {
        padding: 1.25rem;
        background-color: transparent;
        border: 1px solid var(--vp-c-divider);
        border-radius: 12px;
        cursor: pointer;
    }

    .tag-item__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.75rem;
    }

    .tag-item__pages {
        font-size: 0.8rem;
        color: var(--vp-c-text-3);
    }

    .tag-item__preview {
        font-size: 0.85rem;
        color: var(--vp-c-text-2);
        line-height: 1.5;
    }

    .page-preview {
        color: var(--vp-c-text-2);
    }

    .more-pages {
        color: var(--vp-c-text-3);
    }

    /* Selected Tag Section */
    .selected-tag-section {
        margin: 4rem 0;
    }

    .selected-tag-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
        border-bottom: 1px solid var(--vp-c-divider);
        padding-bottom: 1rem;
    }

    .selected-tag-header h2 {
        margin: 0;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
        font-weight: 600;
        letter-spacing: -0.01em;
    }

    .selected-count {
        font-size: 0.9rem;
        color: var(--vp-c-text-3);
        font-weight: 400;
    }

    .clear-selection {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.4rem 0.8rem;
        background-color: transparent;
        border: none;
        color: var(--vp-c-text-3);
        font-size: 0.875rem;
        cursor: pointer;
        transition: color 0.2s ease;
    }

    .clear-selection svg {
        width: 1rem;
        height: 1rem;
    }

    /* Pages Grid */
    .pages-grid {
        display: flex;
        flex-direction: column;
        gap: 0;
        border-top: 1px solid var(--vp-c-divider);
    }

    .page-card {
        display: block;
        padding: 1.5rem 0;
        border-bottom: 1px solid var(--vp-c-divider);
        text-decoration: none;
        color: inherit;
        transition: opacity 0.2s ease;
    }

    .page-card__header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        gap: 1rem;
    }

    .page-card__title {
        margin: 0;
        font-size: 1.15rem;
        font-weight: 600;
        color: var(--vp-c-text-1);
        letter-spacing: -0.01em;
    }

    .page-card__progress {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;
    }

    .progress-bar {
        width: 48px;
        height: 4px;
        background-color: var(--vp-c-divider);
        border-radius: 2px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background-color: var(--vp-c-text-2);
    }

    .progress-text {
        font-size: 0.75rem;
        color: var(--vp-c-text-3);
    }

    .page-card__description {
        margin: 0 0 1rem 0;
        font-size: 0.9rem;
        color: var(--vp-c-text-2);
        line-height: 1.5;
        max-width: 800px;
    }

    .page-card__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        align-items: center;
    }

    .more-tags {
        font-size: 0.8rem;
        color: var(--vp-c-text-3);
    }

    /* Stats Section */
    .tags-stats {
        display: flex;
        gap: 4rem;
        padding: 3rem 0;
        margin-top: 4rem;
        border-top: 1px solid var(--vp-c-divider);
    }

    .stat-item {
        text-align: left;
    }

    .stat-number {
        display: block;
        font-size: 2rem;
        font-weight: 600;
        color: var(--vp-c-text-1);
        line-height: 1;
        margin-bottom: 0.5rem;
        letter-spacing: -0.02em;
    }

    .stat-label {
        display: block;
        font-size: 0.85rem;
        color: var(--vp-c-text-3);
    }

    /* States */
    .loading-state,
    .error-state,
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 6rem 0;
        text-align: center;
        color: var(--vp-c-text-3);
    }

    .loading-spinner {
        width: 1.5rem;
        height: 1.5rem;
        border: 2px solid var(--vp-c-divider);
        border-top: 2px solid var(--vp-c-text-3);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .error-icon,
    .empty-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
        opacity: 0.5;
    }

    .loading-state p,
    .error-state p,
    .empty-state p {
        font-size: 0.95rem;
        color: var(--vp-c-text-2);
    }

    .retry-button {
        margin-top: 1.5rem;
        padding: 0.5rem 1rem;
        background-color: transparent;
        color: var(--vp-c-text-1);
        border: 1px solid var(--vp-c-divider);
        border-radius: 6px;
        font-size: 0.85rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .no-matching-pages {
        padding: 4rem 0;
        text-align: center;
        color: var(--vp-c-text-3);
    }

    .no-match-icon {
        display: none;
    }

    .no-matching-pages p {
        margin: 0.5rem 0;
        font-size: 0.95rem;
    }

    .no-match-hint {
        font-size: 0.85rem !important;
        font-style: normal;
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .tags-page {
            padding: 2rem 1.5rem;
        }

        .page-header {
            margin-bottom: 2rem;
        }

        .page-title {
            font-size: 2rem;
        }

        .tags-controls {
            flex-direction: column;
            align-items: stretch;
            border-bottom: none;
        }

        .search-box {
            max-width: none;
        }

        .view-controls {
            margin-left: 0;
            justify-content: center;
        }

        .selected-tag-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
        }

        .clear-selection {
            padding: 0;
        }

        .tags-stats {
            flex-direction: column;
            gap: 2rem;
        }

        .page-card__header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
        }
    }
</style>
