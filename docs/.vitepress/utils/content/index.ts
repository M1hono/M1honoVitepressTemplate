/**
 * Content utilities for CryChicDoc
 */

import { countWord } from "./functions";
import * as navLinkType from "./navLinkType";

export * from "./billing";

export const text = {
    countWord,
    getReadingTime: (text: string, wordsPerMinute: number = 200): number => {
        const wordCount = countWord(text);
        return Math.ceil(wordCount / wordsPerMinute);
    },
};

export const contentUtils = {
    text,
    countWord,
    getReadingTime: text.getReadingTime,
    navLinkType,
};

export default contentUtils;