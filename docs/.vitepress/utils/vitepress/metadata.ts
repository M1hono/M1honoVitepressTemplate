/**
 * Metadata utilities for VitePress articles
 * Extracted from ArticleMetadataCN component
 */

import type { MetadataConfig, TranslationDictionary } from "../content/types";

/**
 * Calculate reading time based on word count and image count
 */
export const readingTime = {
    /** Calculate word reading time (default: 275 words per minute) */
    calculateWordTime: (
        wordCount: number,
        wordsPerMinute: number = 275
    ): number => {
        return (wordCount / wordsPerMinute) * 60;
    },

    /** Calculate image viewing time */
    calculateImageTime: (imageCount: number): number => {
        const n = imageCount;
        if (n <= 10) {
            return n * 13 + (n * (n - 1)) / 2;
        }
        return 175 + (n - 10) * 3;
    },

    /** Calculate total reading time in minutes */
    calculateTotalTime: (
        wordCount: number,
        imageCount: number,
        wordsPerMinute: number = 275
    ): number => {
        const wordTime = readingTime.calculateWordTime(
            wordCount,
            wordsPerMinute
        );
        const imageTime = readingTime.calculateImageTime(imageCount);
        return Math.ceil((wordTime + imageTime) / 60);
    },
};

/**
 * Content analysis utilities
 */
export const contentAnalysis = {
    /** Analyze content container for word and image count */
    analyzeContent: (
        selector: string = "#VPContent"
    ): { wordCount: number; imageCount: number } => {
        const docDomContainer = window.document.querySelector(selector);

        // Count images
        const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>(
            ".content-container .main img"
        );
        const imageCount = imgs?.length || 0;

        // Count words
        const textContent =
            docDomContainer?.querySelector(".content-container .main")
                ?.textContent || "";

        return { wordCount: 0, imageCount }; // Note: wordCount calculation needs the countWord function
    },

    /** Remove existing metadata elements */
    cleanupMetadata: (): void => {
        document.querySelectorAll(".meta-des").forEach((v) => v.remove());
    },
};

/**
 * Metadata translations
 */
export const metadataTranslations: {
    icons: Record<string, string>;
} = {
    icons: {
        update: "mdi-refresh",
        wordCount: "mdi-text-shadow",
        readTime: "mdi-timer-outline",
        pageViews: "mdi-eye-outline",
    },
};

/**
 * Get icon for metadata key
 */
export const getMetadataIcon = (key: string): string => {
    return metadataTranslations.icons[key] || "";
};

/**
 * Clear all busuanzi related cache
 */
export const clearBusuanziCache = (): void => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return;
    }
    
    try {
        // Clear main busuanzi cache
        localStorage.removeItem(BUSUANZI_CACHE_KEY);
        
        // Clear footer stats cache
        localStorage.removeItem('footer_stats_cache');
        
        // Clear page views cache for current page
        const cacheKey = `page_views_${window.location.pathname}`;
        localStorage.removeItem(cacheKey);
        
        console.log('Busuanzi cache cleared');
    } catch (error) {
        console.warn('Failed to clear busuanzi cache:', error);
    }
};

/**
 * Debug function to check busuanzi status
 */
export const debugBusuanzi = (): void => {
    if (typeof window === 'undefined') {
        console.log('Not in browser environment');
        return;
    }
    
    console.log('=== Busuanzi Debug Info ===');
    console.log('Current URL:', window.location.href);
    
    // Check cache
    try {
        const cached = localStorage.getItem(BUSUANZI_CACHE_KEY);
        console.log('Cached data:', cached ? JSON.parse(cached) : 'None');
        
        const footerCache = localStorage.getItem('footer_stats_cache');
        console.log('Footer cache:', footerCache ? JSON.parse(footerCache) : 'None');
        
        const pageViewsCache = localStorage.getItem(`page_views_${window.location.pathname}`);
        console.log('Page views cache:', pageViewsCache ? JSON.parse(pageViewsCache) : 'None');
    } catch (error) {
        console.log('Cache check error:', error);
    }
    
    // Check DOM elements
    const sitePvElement = document.querySelector('#busuanzi_value_site_pv');
    const siteUvElement = document.querySelector('#busuanzi_value_site_uv');
    const pagePvElement = document.querySelector('#busuanzi_value_page_pv');
    
    console.log('DOM elements:');
    console.log('- site_pv:', sitePvElement?.textContent || 'Not found');
    console.log('- site_uv:', siteUvElement?.textContent || 'Not found');
    console.log('- page_pv:', pagePvElement?.textContent || 'Not found');
    
    console.log('========================');
};

/**
 * Busuanzi page view tracking utilities
 */
export interface UvPvData {
    site_pv?: number;
    page_pv?: number;
    site_uv?: number;
}

/**
 * Storage key for cached busuanzi data
 */
const BUSUANZI_CACHE_KEY = 'busuanzi_cache';
const BUSUANZI_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Cached busuanzi data with timestamp
 */
interface CachedBusuanziData {
    data: UvPvData;
    timestamp: number;
    url: string;
}

/**
 * Get cached busuanzi data if still valid
 */
const getCachedBusuanziData = (currentUrl: string): UvPvData | null => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return null;
    }
    
    try {
        const cached = localStorage.getItem(BUSUANZI_CACHE_KEY);
        if (!cached) return null;
        
        const parsedCache: CachedBusuanziData = JSON.parse(cached);
        const now = Date.now();
        
        // Check if cache is still valid and for the same URL
        if (now - parsedCache.timestamp < BUSUANZI_CACHE_DURATION && 
            parsedCache.url === currentUrl) {
            return parsedCache.data;
        }
    } catch (error) {
        console.warn('Failed to read busuanzi cache:', error);
    }
    
    return null;
};

/**
 * Cache busuanzi data
 */
const setCachedBusuanziData = (data: UvPvData, url: string): void => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return;
    }
    
    try {
        const cacheData: CachedBusuanziData = {
            data,
            timestamp: Date.now(),
            url
        };
        localStorage.setItem(BUSUANZI_CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
        console.warn('Failed to cache busuanzi data:', error);
    }
};

/**
 * Create a script tag for loading external scripts
 */
export const createScript = (
    url: string,
    immediate = true
): HTMLScriptElement => {
    const scriptDom = document.createElement("script") as HTMLScriptElement;
    scriptDom.type = "text/javascript";
    scriptDom.defer = true;
    scriptDom.src = url;
    if (immediate) document.body.appendChild(scriptDom);
    return scriptDom;
};

/**
 * Request busuanzi counter data using JSONP with caching and retry mechanism
 */
export const callBusuanzi = (
    url = "//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback",
    maxRetries = 3,
    retryDelay = 1000
): Promise<UvPvData> => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    // Try to get cached data first
    const cachedData = getCachedBusuanziData(currentUrl);
    if (cachedData) {
        return Promise.resolve(cachedData);
    }
    
    const attemptRequest = (attempt: number): Promise<UvPvData> => {
        return new Promise((resolve, reject) => {
            const jsonpCallback =
                "BusuanziCallback_" + Math.floor(1099511627776 * Math.random()) + "_" + Date.now();
            const requestUrl = url.replace("=BusuanziCallback", "=" + jsonpCallback);

            const scriptDom = createScript(requestUrl);
            scriptDom.referrerPolicy = "no-referrer-when-downgrade";

            let response: UvPvData | undefined;
            let hasResolved = false;
            
            // Set up timeout for the request
            const timeoutId = setTimeout(() => {
                if (!hasResolved) {
                    hasResolved = true;
                    cleanup();
                    
                    if (attempt < maxRetries) {
                        console.warn(`Busuanzi request timeout, retrying... (${attempt + 1}/${maxRetries})`);
                        setTimeout(() => {
                            attemptRequest(attempt + 1).then(resolve).catch(reject);
                        }, retryDelay * attempt);
                    } else {
                        reject(new Error(`Busuanzi request timeout after ${maxRetries} attempts`));
                    }
                }
            }, 10000); // 10 second timeout

            // busuanzi 请求成功后，自动触发该函数进行数据赋值
            (window as any)[jsonpCallback] = (data: UvPvData) => {
                response = data;
                if (!hasResolved && data) {
                    hasResolved = true;
                    cleanup();
                    
                    // Cache the successful response
                    setCachedBusuanziData(data, currentUrl);
                    resolve(data);
                }
            };
            
            const cleanup = () => {
                clearTimeout(timeoutId);
                
                // Clean up callback function
                try {
                    delete (window as any)[jsonpCallback];
                } catch (e) {
                    (window as any)[jsonpCallback] = undefined;
                }
                
                // Remove script element
                setTimeout(() => {
                    if (document.body.contains(scriptDom)) {
                        document.body.removeChild(scriptDom);
                    }
                }, 100);
            };

            scriptDom.onload = () => {
                // Give some time for the callback to be executed
                setTimeout(() => {
                    if (!hasResolved) {
                        if (response) {
                            hasResolved = true;
                            cleanup();
                            setCachedBusuanziData(response, currentUrl);
                            resolve(response);
                        } else {
                            // No response received, treat as error
                            hasResolved = true;
                            cleanup();
                            
                            if (attempt < maxRetries) {
                                console.warn(`Busuanzi no response, retrying... (${attempt + 1}/${maxRetries})`);
                                setTimeout(() => {
                                    attemptRequest(attempt + 1).then(resolve).catch(reject);
                                }, retryDelay * attempt);
                            } else {
                                reject(new Error(`No busuanzi response after ${maxRetries} attempts`));
                            }
                        }
                    }
                }, 2000); // Wait 2 seconds for callback
            };
            
            scriptDom.onerror = () => {
                if (!hasResolved) {
                    hasResolved = true;
                    cleanup();
                    
                    if (attempt < maxRetries) {
                        console.warn(`Busuanzi script load error, retrying... (${attempt + 1}/${maxRetries})`);
                        setTimeout(() => {
                            attemptRequest(attempt + 1).then(resolve).catch(reject);
                        }, retryDelay * attempt);
                    } else {
                        reject(new Error(`Busuanzi script load error after ${maxRetries} attempts`));
                    }
                }
            };
        });
    };
    
    return attemptRequest(1);
};
