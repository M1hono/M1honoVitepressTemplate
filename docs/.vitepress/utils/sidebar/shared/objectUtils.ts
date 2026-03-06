/**
 * @fileoverview Object manipulation utilities for the sidebar generation system.
 *
 * This module provides essential utility functions for working with objects,
 * paths, and data transformations throughout the sidebar generation process.
 * All functions are pure and side-effect free for predictable behavior.
 *
 * @module ObjectUtils
 * @version 1.0.0
 * @author M1hono
 * @since 1.0.0
 */

/**
 * Performs a deep merge of multiple objects, returning a new object.
 *
 * Recursively merges properties from source objects into a new target object.
 * Arrays are replaced rather than concatenated. The input objects are never
 * mutated.
 *
 * @template T - The type of the target object
 * @param {T} target - The target object to use as base (not mutated)
 * @param {...Partial<T>[]} sources - Source objects to merge from
 * @returns {T} A new merged object
 * @since 1.0.0
 * @example
 * ```typescript
 * const result = deepMerge(
 *   { a: 1, b: { x: 1 } },
 *   { b: { y: 2 } },
 *   { c: 3 }
 * );
 * // Result: { a: 1, b: { x: 1, y: 2 }, c: 3 }
 * ```
 */
export function deepMerge<T extends object>(target: T, ...sources: Partial<T>[]): T {
    if (!sources.length) return { ...target };

    let result = { ...target };

    for (const source of sources) {
        if (!source) continue;

        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                const sourceValue = source[key];
                const resultValue = result[key];

                if (
                    isPlainObject(sourceValue) &&
                    isPlainObject(resultValue)
                ) {
                    result = {
                        ...result,
                        [key]: deepMerge({ ...resultValue } as object, sourceValue as Partial<object>)
                    };
                } else {
                    result = {
                        ...result,
                        [key]: sourceValue
                    };
                }
            }
        }
    }

    return result;
}

/**
 * Checks if a value is a plain object (not an array, not null).
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Normalizes path separators to forward slashes for cross-platform compatibility.
 *
 * Converts all backslashes to forward slashes, ensuring consistent path
 * format across Windows, macOS, and Linux systems. This is essential
 * for generating reliable relative path keys and URL paths.
 *
 * @param {string} filePath - File or directory path to normalize
 * @returns {string} Path with normalized forward slash separators
 * @since 1.0.0
 * @example
 * ```typescript
 * normalizePathSeparators('C:\\Users\\docs\\file.md'); // 'C:/Users/docs/file.md'
 * normalizePathSeparators('docs/guide/index.md'); // 'docs/guide/index.md' (unchanged)
 * ```
 */
export function normalizePathSeparators(filePath: string): string {
    return filePath.replace(/\\/g, '/');
}

/**
 * Sanitizes a string to be file-system and URL path friendly.
 *
 * Transforms titles and names into safe path components by:
 * - Converting to lowercase for consistency
 * - Replacing spaces and unsafe characters with hyphens
 * - Consolidating multiple hyphens into single hyphens
 * - Removing leading and trailing hyphens
 * - Providing fallback for empty results
 *
 * @param {string} title - The string to sanitize (typically a title or name)
 * @returns {string} A sanitized string suitable for use in file paths and URLs
 * @since 1.0.0
 * @example
 * ```typescript
 * sanitizeTitleForPath('Core Concepts & Ideas'); // 'core-concepts-ideas'
 * sanitizeTitleForPath('Getting Started!'); // 'getting-started'
 * sanitizeTitleForPath('---'); // 'untitled'
 * sanitizeTitleForPath(''); // 'untitled'
 * ```
 */
export function sanitizeTitleForPath(title: string): string {
    if (!title) return 'untitled';

    const UNSAFE_CHARS_PATTERN = /[\s/?<>\\:*|"^]/g;
    const MULTI_HYPHEN_PATTERN = /-+/g;
    const EDGE_HYPHEN_PATTERN = /^-+|-+$/g;

    return title
        .toLowerCase()
        .replace(UNSAFE_CHARS_PATTERN, '-')
        .replace(MULTI_HYPHEN_PATTERN, '-')
        .replace(EDGE_HYPHEN_PATTERN, '') || 'untitled';
}

/**
 * Performs a deep comparison of two objects for equality.
 *
 * Recursively compares all properties of two objects to determine if they
 * are structurally equivalent. Handles primitives, objects, arrays, and
 * null/undefined values correctly. Uses strict equality for primitives.
 *
 * @param {unknown} obj1 - The first object to compare
 * @param {unknown} obj2 - The second object to compare
 * @returns {boolean} True if the objects are deeply equal, false otherwise
 * @since 1.0.0
 * @example
 * ```typescript
 * isDeepEqual({ a: 1, b: { x: 2 } }, { a: 1, b: { x: 2 } }); // true
 * isDeepEqual({ a: 1 }, { a: 1, b: 2 }); // false
 * isDeepEqual([1, 2, 3], [1, 2, 3]); // true
 * isDeepEqual(null, undefined); // false
 * ```
 */
export function isDeepEqual(obj1: unknown, obj2: unknown): boolean {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!keys2.includes(key) || !isDeepEqual((obj1 as Record<string, unknown>)[key], (obj2 as Record<string, unknown>)[key])) {
            return false;
        }
    }

    return true;
}

