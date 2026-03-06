
import type { MetadataConfig, TranslationDictionary } from "../content/types";

export const readingTime = {
    calculateWordTime: (
        wordCount: number,
        wordsPerMinute: number = 275
    ): number => {
        return (wordCount / wordsPerMinute) * 60;
    },

    calculateImageTime: (imageCount: number): number => {
        // First 10 images: 13s + 12s + 11s + ... + 4s (arithmetic series)
        // Additional images: 3s each
        if (imageCount <= 10) {
            return imageCount * 13 - (imageCount * (imageCount - 1)) / 2;
        }
        return 85 + (imageCount - 10) * 3;
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

        const wordCount = textContent.trim().split(/\s+/).filter(Boolean).length;

        return { wordCount, imageCount };
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
        script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
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
