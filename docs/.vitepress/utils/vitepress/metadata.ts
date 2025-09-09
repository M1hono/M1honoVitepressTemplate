
import type { MetadataConfig, TranslationDictionary } from "../content/types";

export const readingTime = {
    calculateWordTime: (
        wordCount: number,
        wordsPerMinute: number = 275
    ): number => {
        return (wordCount / wordsPerMinute) * 60;
    },

    calculateImageTime: (imageCount: number): number => {
        const n = imageCount;
        if (n <= 10) {
            return n * 13 + (n * (n - 1)) / 2;
        }
        return 175 + (n - 10) * 3;
    },

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

export const contentAnalysis = {
    analyzeContent: (
        selector: string = "#VPContent"
    ): { wordCount: number; imageCount: number } => {
        const docDomContainer = window.document.querySelector(selector);

        const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>(
            ".content-container .main img"
        );
        const imageCount = imgs?.length || 0;

        const textContent =
            docDomContainer?.querySelector(".content-container .main")
                ?.textContent || "";

        return { wordCount: 0, imageCount };
    },

    cleanupMetadata: (): void => {
        document.querySelectorAll(".meta-des").forEach((v) => v.remove());
    },
};

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

export const getMetadataIcon = (key: string): string => {
    return metadataTranslations.icons[key] || "";
};

export const clearBusuanziCache = (): void => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return;
    }
    
    try {
        localStorage.removeItem(BUSUANZI_CACHE_KEY);
        
        localStorage.removeItem('footer_stats_cache');
        
        const cacheKey = `page_views_${window.location.pathname}`;
        localStorage.removeItem(cacheKey);
        
        console.log('Busuanzi cache cleared');
    } catch (error) {
        console.warn('Failed to clear busuanzi cache:', error);
    }
};

export const debugBusuanzi = (): void => {
    if (typeof window === 'undefined') {
        console.log('Not in browser environment');
        return;
    }
    
    console.log('=== Busuanzi Debug Info ===');
    console.log('Current URL:', window.location.href);
    
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
    
    const sitePvElement = document.querySelector('#busuanzi_value_site_pv');
    const siteUvElement = document.querySelector('#busuanzi_value_site_uv');
    const pagePvElement = document.querySelector('#busuanzi_value_page_pv');
    
    console.log('DOM elements:');
    console.log('- site_pv:', sitePvElement?.textContent || 'Not found');
    console.log('- site_uv:', siteUvElement?.textContent || 'Not found');
    console.log('- page_pv:', pagePvElement?.textContent || 'Not found');
    
    console.log('========================');
};

export interface UvPvData {
    site_pv?: number;
    page_pv?: number;
    site_uv?: number;
}

const BUSUANZI_CACHE_KEY = 'busuanzi_cache';
const BUSUANZI_CACHE_DURATION = 5 * 60 * 1000;

interface CachedBusuanziData {
    data: UvPvData;
    timestamp: number;
    url: string;
}

const getCachedBusuanziData = (currentUrl: string): UvPvData | null => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return null;
    }
    
    try {
        const cached = localStorage.getItem(BUSUANZI_CACHE_KEY);
        if (!cached) return null;
        
        const parsedCache: CachedBusuanziData = JSON.parse(cached);
        const now = Date.now();
        
        if (now - parsedCache.timestamp < BUSUANZI_CACHE_DURATION && 
            parsedCache.url === currentUrl) {
            return parsedCache.data;
        }
    } catch (error) {
        console.warn('Failed to read busuanzi cache:', error);
    }
    
    return null;
};

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

export const initBusuanzi = (): Promise<boolean> => {
    return new Promise((resolve) => {
        if (typeof window === 'undefined') {
            resolve(false);
            return;
        }

        const existingScript = window.document.querySelector('script[src*="busuanzi"]');
        if (existingScript) {
            resolve(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
        script.async = true;

        script.onload = () => {
            resolve(true);
        };

        script.onerror = () => {
            resolve(false);
        };

        document.body.appendChild(script);
    });
};

export const getBusuanziStats = (): Promise<UvPvData> => {
    return new Promise((resolve, reject) => {
        const maxAttempts = 20;
        let attempts = 0;

        const checkStats = () => {
            attempts++;
            
            const sitePvElement = document.querySelector('#busuanzi_value_site_pv');
            const siteUvElement = document.querySelector('#busuanzi_value_site_uv');
            const pagePvElement = document.querySelector('#busuanzi_value_page_pv');

            const sitePvText = sitePvElement?.textContent || sitePvElement?.innerHTML || '0';
            const siteUvText = siteUvElement?.textContent || siteUvElement?.innerHTML || '0';
            const pagePvText = pagePvElement?.textContent || pagePvElement?.innerHTML || '0';

            const sitePv = parseInt(sitePvText) || 0;
            const siteUv = parseInt(siteUvText) || 0;
            const pagePv = parseInt(pagePvText) || 0;

            if (sitePv > 0 || siteUv > 0 || pagePv > 0) {
                const data: UvPvData = {
                    site_pv: sitePv,
                    site_uv: siteUv,
                    page_pv: pagePv,
                };
                
                resolve(data);
                return;
            }

            if (attempts < maxAttempts) {
                setTimeout(checkStats, 1000);
            } else {
                resolve({
                    site_pv: 1,
                    site_uv: 1,
                    page_pv: 1
                });
            }
        };

        setTimeout(checkStats, 2000);
    });
};

export const callBusuanzi = async (): Promise<UvPvData> => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    const cachedData = getCachedBusuanziData(currentUrl);
    if (cachedData) {
        console.log('Using cached busuanzi data:', cachedData);
        
        initBusuanzi().then(() => {
            getBusuanziStats().then(freshData => {
                setCachedBusuanziData(freshData, currentUrl);
            }).catch(() => {
            });
        });
        
        return cachedData;
    }
    
    try {
        const scriptLoaded = await initBusuanzi();
        if (!scriptLoaded) {
            throw new Error('Failed to load busuanzi script');
        }
        
        const data = await getBusuanziStats();
        
        setCachedBusuanziData(data, currentUrl);
        
        return data;
    } catch (error) {
        console.warn('Failed to get busuanzi statistics:', error);
        throw error;
    }
};
