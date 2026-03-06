/**
 * @fileoverview Item sorting utilities for sidebar generation.
 * 
 * This module provides functionality for sorting sidebar items based on
 * priority values, item order configurations, and fallback alphabetical
 * ordering. It handles both explicit priority assignments and order
 * configurations from JSON files.
 * 
 * @module ItemSorter
 * @version 1.0.0
 * @author M1hono
 * @since 1.0.0
 */

import { SidebarItem } from '../types';

/**
 * Applies item order configuration to priority values for sidebar items.
 * Creates a new array with updated priority values without mutating the input.
 *
 * Converts itemOrder configuration (typically from order.json files) into
 * priority values that can be used for sorting. This ensures that explicit
 * ordering configurations properly influence the final sidebar structure.
 * Recursively processes nested items to maintain hierarchical ordering.
 *
 * @param {SidebarItem[]} items - Array of SidebarItems to process
 * @param {Record<string, number>} [itemOrderConfig={}] - The itemOrder configuration from order.json
 * @returns {SidebarItem[]} New array of items with updated priorities
 * @since 1.0.0
 * @private
 */
function applyItemOrderToPriority(
    items: SidebarItem[],
    itemOrderConfig: Record<string, number> = {}
): SidebarItem[] {
    return items.map(item => {
        const orderKey = item._relativePathKey || item.text;
        let newPriority = item._priority;

        if (orderKey && Object.prototype.hasOwnProperty.call(itemOrderConfig, orderKey)) {
            newPriority = itemOrderConfig[orderKey];
        } else if (newPriority === undefined) {
            newPriority = 0;
        }

        const newItem: SidebarItem = {
            ...item,
            _priority: newPriority
        };

        if (item.items && Array.isArray(item.items)) {
            newItem.items = applyItemOrderToPriority(item.items, itemOrderConfig);
        }

        return newItem;
    });
}

/**
 * Sorts an array of SidebarItems based on their priority values and configurations.
 *
 * Performs comprehensive sorting of sidebar items by first applying item order
 * configurations to set priorities, then sorting based on priority values with
 * alphabetical fallback. Recursively sorts nested items to maintain proper
 * hierarchical ordering throughout the sidebar structure.
 *
 * @param {SidebarItem[]} itemsToSort - The array of SidebarItems to sort
 * @param {Record<string, number>} [itemOrderConfig={}] - The itemOrder configuration from order.json
 * @returns {SidebarItem[]} A new array of sorted SidebarItems
 * @since 1.0.0
 * @public
 * @example
 * ```typescript
 * const sortedItems = sortItems(sidebarItems, {
 *   'introduction.md': 1,
 *   'advanced/': 2,
 *   'api/': 3
 * });
 * ```
 */
export function sortItems(
    itemsToSort: SidebarItem[],
    itemOrderConfig: Record<string, number> = {}
): SidebarItem[] {
    const itemsWithAppliedPriorities = applyItemOrderToPriority(itemsToSort, itemOrderConfig);

    const itemsWithSortInfo = itemsWithAppliedPriorities.map(item => ({
        item,
        priority: item._priority ?? 0,
        originalText: item.text || item._relativePathKey || ''
    }));

    itemsWithSortInfo.sort((a, b) => {
        if (a.priority !== b.priority) {
            return a.priority - b.priority;
        }

        return a.originalText.localeCompare(b.originalText);
    });

    return itemsWithSortInfo.map(wrappedItem => wrappedItem.item);
} 

