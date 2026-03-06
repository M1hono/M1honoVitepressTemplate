/**
 * Pattern matching words in multiple scripts:
 * - Latin, Greek, Cyrillic, Arabic (as single words)
 * - CJK, Hiragana, Korean (each character counted separately)
 */
const WORD_PATTERN = /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g

/** Unicode code point for CJK characters */
const CJK_CODE_POINT = 0x4E00

/**
 * Counts words in text, handling CJK languages where each character is a word.
 * @param data - Text to count words in
 * @returns Total word count
 */
export function countWord(data: string): number {
    const matches = data.match(WORD_PATTERN)
    if (!matches) return 0

    return matches.reduce((count, match) => {
        const isCJK = match.charCodeAt(0) >= CJK_CODE_POINT
        return count + (isCJK ? match.length : 1)
    }, 0)
}