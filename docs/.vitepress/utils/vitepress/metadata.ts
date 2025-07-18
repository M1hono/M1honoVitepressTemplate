/**
 * Metadata utilities for VitePress articles
 * Extracted from ArticleMetadataCN component
 */

import type { MetadataConfig, TranslationDictionary } from '../content/types';

/**
 * Calculate reading time based on word count and image count
 */
export const readingTime = {
  /** Calculate word reading time (default: 275 words per minute) */
  calculateWordTime: (wordCount: number, wordsPerMinute: number = 275): number => {
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
  calculateTotalTime: (wordCount: number, imageCount: number, wordsPerMinute: number = 275): number => {
    const wordTime = readingTime.calculateWordTime(wordCount, wordsPerMinute);
    const imageTime = readingTime.calculateImageTime(imageCount);
    return Math.ceil((wordTime + imageTime) / 60);
  }
};

/**
 * Content analysis utilities
 */
export const contentAnalysis = {
  /** Analyze content container for word and image count */
  analyzeContent: (selector: string = "#VPContent"): { wordCount: number; imageCount: number } => {
    const docDomContainer = window.document.querySelector(selector);
    
    // Count images
    const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>(".content-container .main img");
    const imageCount = imgs?.length || 0;
    
    // Count words
    const textContent = docDomContainer?.querySelector(".content-container .main")?.textContent || "";
    
    return { wordCount: 0, imageCount }; // Note: wordCount calculation needs the countWord function
  },

  /** Remove existing metadata elements */
  cleanupMetadata: (): void => {
    document.querySelectorAll(".meta-des").forEach((v) => v.remove());
  }
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
  }
};

/**
 * Get icon for metadata key
 */
export const getMetadataIcon = (key: string): string => {
  return metadataTranslations.icons[key] || "";
}; 