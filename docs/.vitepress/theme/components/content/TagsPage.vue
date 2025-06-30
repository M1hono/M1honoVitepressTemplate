<template>
    <div class="tags-page">
        <!-- Page Title -->
        <div class="page-header">
            <h1 class="page-title">{{ page.frontmatter.title || t.pageTitle }}</h1>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
            <div class="loading-spinner"></div>
            <p>{{ t.loadingTagData }}</p>
        </div>

        <!-- Error State -->
        <div v-else-if="loadError" class="error-state">
            <div class="error-icon">⚠️</div>
            <p>{{ loadError }}</p>
            <button class="retry-button" @click="loadTagData">
                {{ t.retry || 'Retry' }}
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
                        <span class="tag-item__pages">{{ tag.count }} {{ t.pages }}</span>
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
                            {{ lang === 'zh' ? '等 ' : '' }}{{ tag.pages.length - 3 }} {{ t.morePages }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Selected Tag Pages -->
            <div
                v-if="selectedTags.length > 0"
                class="selected-tag-section"
            >
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
                        <span class="selected-count">({{ selectedTagPages.length }} {{ t.pages }})</span>
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
                            <div v-if="page.progress" class="page-card__progress">
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
                        <p v-if="page.description" class="page-card__description">
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
    import { ref, computed, onMounted, watch } from "vue";
    import { useData } from "vitepress";
    import TagBadge from "../ui/TagBadge.vue";

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

    interface LanguageMetadata {
        code: string;
        name: string;
        dir: string;
        isDefault?: boolean;
    }

    const { page, lang } = useData();

    // Multi-language support
    const translations = {
        'en-US': {
            pageTitle: 'Tags',
            searchPlaceholder: 'Search tags...',
            tagCloud: 'Tag Cloud',
            list: 'List',
            selectedTags: 'Selected Tags:',
            clearSelection: 'Clear Selection',
            pages: 'pages',
            totalTags: 'Total Tags',
            totalPages: 'Total Pages',
            matchingTags: 'Matching Tags',
            morePages: 'more pages...',
            languageNotSupported: 'Language not supported',
            loadingTagData: 'Loading tag data...',
            noTagsFound: 'No tags found for this language',
            retry: 'Retry',
            noMatchingPages: 'No pages found with all selected tags',
            noMatchingPagesHint: 'Try removing some tags or selecting different ones'
        },
        'zh-CN': {
            pageTitle: '标签',
            searchPlaceholder: '搜索标签...',
            tagCloud: '标签云',
            list: '列表',
            selectedTags: '已选标签:',
            clearSelection: '清除选择',
            pages: '个页面',
            totalTags: '标签总数',
            totalPages: '页面总数',
            matchingTags: '匹配标签',
            morePages: '个页面...',
            languageNotSupported: '不支持的语言',
            loadingTagData: '加载标签数据中...',
            noTagsFound: '该语言暂无标签',
            retry: '重试',
            noMatchingPages: '未找到包含所有选中标签的页面',
            noMatchingPagesHint: '尝试移除一些标签或选择其他标签'
        }
    };

    // Enhanced language mapping with fallback support
    const langMapping: Record<string, string> = {
        'zh-CN': 'zh-CN',
        'zh': 'zh-CN',
        'en-US': 'en-US', 
        'en': 'en-US',
        'jp': 'en-US',
        'ja': 'en-US'
    };

    const t = computed(() => {
        const translationLang = langMapping[lang.value] || 'en-US';
        return translations[translationLang as keyof typeof translations] || translations['en-US'];
    });

    // Language metadata
    const supportedLanguages = ref<LanguageMetadata[]>([]);

    // Get current language code for tag data loading
    const currentLanguageCode = computed(() => {
        // Map VitePress language to our language codes
        const vitepressLang = lang.value;
        if (vitepressLang === 'zh-CN' || vitepressLang === 'zh') {
            return 'zh';
        } else if (vitepressLang === 'en-US' || vitepressLang === 'en') {
            return 'en';
        }
        
        // Fallback to checking supported languages from metadata
        if (supportedLanguages.value.length > 0) {
            const found = supportedLanguages.value.find(lang => 
                vitepressLang.startsWith(lang.code) || lang.code.startsWith(vitepressLang.split('-')[0])
            );
            return found?.code || supportedLanguages.value[0]?.code || 'zh';
        }
        
        return 'zh'; // Default fallback
    });

    // Reactive state
    const searchQuery = ref("");
    const viewMode = ref<"cloud" | "list">("cloud");
    const selectedTags = ref<string[]>([]);
    const tagData = ref<Record<string, TagInfo>>({});
    const isLoading = ref(false);
    const loadError = ref<string | null>(null);

    // Computed properties
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
        
        // If multiple tags selected, find pages that have ALL selected tags
        if (selectedTags.value.length === 1) {
            const tag = selectedTags.value[0];
            return tagData.value[tag]?.pages || [];
        } else {
            // Find intersection of pages across all selected tags
            const allPages = new Map<string, PageInfo>();
            
            selectedTags.value.forEach((tag, index) => {
                const tagPages = tagData.value[tag]?.pages || [];
                
                if (index === 0) {
                    // First tag: add all pages
                    tagPages.forEach(page => allPages.set(page.path, page));
                } else {
                    // Subsequent tags: keep only pages that exist in current set
                    const currentPaths = new Set(tagPages.map(p => p.path));
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
            0
        );
    });

    // Methods
    function getTagSize(count: number): string {
        const maxCount = Math.max(
            ...Object.values(tagData.value).map((tag) => tag.count)
        );
        const minSize = 0.75;
        const maxSize = 1.5;
        const ratio = count / maxCount;
        const size = minSize + (maxSize - minSize) * ratio;
        return `${size}rem`;
    }

    function selectTag(tagName: string) {
        if (selectedTags.value.includes(tagName)) {
            // Remove tag if already selected
            selectedTags.value = selectedTags.value.filter(t => t !== tagName);
        } else {
            // Add tag to selection
            selectedTags.value.push(tagName);
        }
        
        // Update URL without navigation
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

    // Load language metadata
    async function loadLanguageMetadata() {
        try {
            const response = await fetch('/tag-data-index.json');
            if (response.ok) {
                const data = await response.json();
                supportedLanguages.value = data.languages || [];
                console.log(`[TagsPage] Loaded metadata for ${supportedLanguages.value.length} languages`);
            } else {
                console.warn('Language metadata not found, using defaults');
                supportedLanguages.value = [
                    { code: 'zh', name: '简体中文', dir: 'zh', isDefault: true },
                    { code: 'en', name: 'English', dir: 'en' }
                ];
            }
        } catch (error) {
            console.error("Failed to load language metadata:", error);
            supportedLanguages.value = [
                { code: 'zh', name: '简体中文', dir: 'zh', isDefault: true },
                { code: 'en', name: 'English', dir: 'en' }
            ];
        }
    }

    // Enhanced tag data loading with language support
    async function loadTagData() {
        isLoading.value = true;
        loadError.value = null;
        
        try {
            const langCode = currentLanguageCode.value;
            const response = await fetch(`/tag-data-${langCode}.json`);
            
            if (response.ok) {
                const data = await response.json();
                tagData.value = data.tags || {};
                console.log(`[TagsPage] Loaded ${Object.keys(tagData.value).length} tags for language: ${langCode}`);
            } else {
                console.warn(`Tag data for ${langCode} not found (${response.status}), using empty data`);
                loadError.value = `${t.value.languageNotSupported}: ${langCode}`;
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

    // Get URL parameters
    function getUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const tagsParam = urlParams.get("tags");
        return tagsParam ? tagsParam.split(",") : [];
    }

    // Watch for language changes and reload tag data
    watch(currentLanguageCode, (newLang, oldLang) => {
        if (newLang !== oldLang) {
            console.log(`[TagsPage] Language changed from ${oldLang} to ${newLang}, reloading tag data`);
            loadTagData();
        }
    });

    onMounted(async () => {
        // Load language metadata first, then tag data
        await loadLanguageMetadata();
        loadTagData();

        // Set initial selected tags from URL
        const tagsFromUrl = getUrlParams();
        if (tagsFromUrl.length > 0) {
            selectedTags.value = tagsFromUrl;
        }

        // Listen for URL changes
        window.addEventListener("popstate", () => {
            const tagsFromUrl = getUrlParams();
            selectedTags.value = tagsFromUrl;
        });
    });
</script>

<style scoped>
    .tags-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 0;
    }

    /* Page Header */
    .page-header {
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--vp-c-divider);
        text-align: center;
    }

    .page-title {
        margin: 0;
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--vp-c-text-1);
        line-height: 1.2;
    }

    .tags-controls {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        align-items: center;
    }

    .search-box {
        position: relative;
        flex: 1;
        min-width: 300px;
    }

    .search-icon {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        width: 1rem;
        height: 1rem;
        color: var(--vp-c-text-3);
    }

    .search-input {
        width: 100%;
        padding: 0.75rem 0.75rem 0.75rem 2.5rem;
        border: 1px solid var(--vp-c-divider);
        border-radius: 8px;
        background-color: var(--vp-c-bg);
        color: var(--vp-c-text-1);
        font-size: 0.875rem;
        transition: all 0.2s ease;
    }

    .search-input:focus {
        outline: none;
        border-color: var(--vp-c-brand-1);
        box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
    }

    .view-controls {
        display: flex;
        gap: 0.5rem;
    }

    .view-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border: 1px solid var(--vp-c-divider);
        border-radius: 6px;
        background-color: var(--vp-c-bg);
        color: var(--vp-c-text-2);
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .view-btn svg {
        width: 1rem;
        height: 1rem;
    }

    .view-btn:hover {
        background-color: var(--vp-c-bg-soft);
        color: var(--vp-c-text-1);
    }

    .view-btn--active {
        background-color: var(--vp-c-brand-1);
        color: white;
        border-color: var(--vp-c-brand-1);
    }

    .tags-cloud {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-bottom: 2rem;
        padding: 2rem;
        background-color: var(--vp-c-bg-soft);
        border-radius: 12px;
        justify-content: center;
        align-items: center;
    }

    .tags-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .tag-item {
        padding: 1.5rem;
        background-color: var(--vp-c-bg-soft);
        border: 1px solid var(--vp-c-divider);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .tag-item:hover {
        border-color: var(--vp-c-brand-1);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .tag-item__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }

    .tag-item__pages {
        font-size: 0.875rem;
        color: var(--vp-c-text-2);
    }

    .tag-item__preview {
        font-size: 0.875rem;
        color: var(--vp-c-text-2);
        line-height: 1.5;
    }

    .page-preview {
        color: var(--vp-c-text-2);
    }

    .more-pages {
        font-style: italic;
        color: var(--vp-c-text-3);
    }

    .selected-tag-section {
        margin: 3rem 0;
        padding-top: 2rem;
        border-top: 2px solid var(--vp-c-divider);
    }

    .selected-tag-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
    }

    .selected-tag-header h2 {
        margin: 0;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
    }

    .selected-count {
        font-size: 0.875rem;
        color: var(--vp-c-text-2);
        font-weight: normal;
    }

    .clear-selection {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background-color: var(--vp-c-bg-soft);
        border: 1px solid var(--vp-c-divider);
        border-radius: 6px;
        color: var(--vp-c-text-2);
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .clear-selection svg {
        width: 1rem;
        height: 1rem;
    }

    .clear-selection:hover {
        background-color: var(--vp-c-bg-alt);
        color: var(--vp-c-text-1);
    }

    .pages-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }

    .page-card {
        display: block;
        padding: 1.5rem;
        background-color: var(--vp-c-bg-soft);
        border: 1px solid var(--vp-c-divider);
        border-radius: 8px;
        text-decoration: none;
        color: inherit;
        transition: all 0.2s ease;
    }

    .page-card:hover {
        border-color: var(--vp-c-brand-1);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .page-card__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 0.75rem;
        gap: 1rem;
    }

    .page-card__title {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--vp-c-text-1);
        line-height: 1.4;
    }

    .page-card__progress {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;
    }

    .progress-bar {
        width: 60px;
        height: 6px;
        background-color: var(--vp-c-divider);
        border-radius: 3px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background-color: var(--vp-c-brand-1);
        transition: width 0.2s ease;
    }

    .progress-text {
        font-size: 0.75rem;
        color: var(--vp-c-text-3);
        font-weight: 500;
    }

    .page-card__description {
        margin: 0 0 1rem 0;
        font-size: 0.875rem;
        color: var(--vp-c-text-2);
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .page-card__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        align-items: center;
    }

    .more-tags {
        font-size: 0.75rem;
        color: var(--vp-c-text-3);
        font-weight: 500;
    }

    .tags-stats {
        display: flex;
        gap: 2rem;
        justify-content: center;
        padding: 2rem;
        background-color: var(--vp-c-bg-soft);
        border-radius: 12px;
        margin-top: 3rem;
    }

    .stat-item {
        text-align: center;
    }

    .stat-number {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: var(--vp-c-brand-1);
        line-height: 1;
    }

    .stat-label {
        display: block;
        font-size: 0.875rem;
        color: var(--vp-c-text-2);
        margin-top: 0.5rem;
    }

    /* Loading, Error, and Empty States */
    .loading-state,
    .error-state,
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4rem 2rem;
        text-align: center;
        color: var(--vp-c-text-2);
    }

    .loading-spinner {
        width: 2rem;
        height: 2rem;
        border: 3px solid var(--vp-c-divider);
        border-top: 3px solid var(--vp-c-brand-1);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .error-icon,
    .empty-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .retry-button {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background-color: var(--vp-c-brand-1);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .retry-button:hover {
        background-color: var(--vp-c-brand-2);
    }

    /* No matching pages state */
    .no-matching-pages {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem 2rem;
        text-align: center;
        background-color: var(--vp-c-bg-soft);
        border: 1px solid var(--vp-c-divider);
        border-radius: 8px;
        margin-top: 1rem;
    }

    .no-match-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        opacity: 0.6;
    }

    .no-matching-pages p {
        margin: 0.5rem 0;
        color: var(--vp-c-text-2);
    }

    .no-match-hint {
        font-size: 0.875rem !important;
        color: var(--vp-c-text-3) !important;
        font-style: italic;
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .tags-page {
            padding: 1rem 0;
        }

        .page-title {
            font-size: 2rem;
        }

        .tags-controls {
            flex-direction: column;
            align-items: stretch;
        }

        .search-box {
            min-width: auto;
        }

        .view-controls {
            justify-content: center;
        }

        .selected-tag-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
        }

        .pages-grid {
            grid-template-columns: 1fr;
        }

        .tags-stats {
            flex-direction: column;
            gap: 1rem;
        }

        .page-card__header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
    }
</style>
 