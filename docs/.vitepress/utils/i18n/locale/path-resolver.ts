/**
 * @file Resolves the relative path of a Vue component.
 */
import type { ComponentInternalInstance } from 'vue';

const componentPathCache = new Map<object, string>();
const COMPONENTS_BASE_DIR = '/theme/components/';

/**
 * Gets the relative path of a component instance from the '/theme/components/' directory.
 * The result is cached for performance.
 *
 * @param instance The component instance from `getCurrentInstance()`.
 * @returns The relative path (e.g., 'content/Contributors') or null if not found.
 */
export function resolveComponentPath(instance: ComponentInternalInstance | null): string | null {
    if (!instance || !instance.type.__file) {
        return null;
    }
    
    if (componentPathCache.has(instance.type)) {
        return componentPathCache.get(instance.type)!;
    }

    const filePath = instance.type.__file;
    const pathIndex = filePath.indexOf(COMPONENTS_BASE_DIR);

    if (pathIndex === -1) {
        return null;
    }

    const relativePath = filePath.substring(pathIndex + COMPONENTS_BASE_DIR.length).replace(/\.vue$/, '');
    
    componentPathCache.set(instance.type, relativePath);
    
    return relativePath;
} 