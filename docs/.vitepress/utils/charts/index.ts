/**
 * Chart utilities for M1honoVitepressTemplate
 * Data visualization and chart generation helpers
 */

export * from "./github";
export * from "./mermaid";

import * as github from "./github";
import { initMermaidConfig } from "./mermaid";

/** Light theme color palette */
const LIGHT_PALETTE = ["#3eaf7c", "#2c3e50", "#e74c3c", "#f39c12", "#9b59b6"] as const;

/** Dark theme color palette */
const DARK_PALETTE = ["#4ade80", "#e5e7eb", "#ef4444", "#f59e0b", "#a855f7"] as const;

/** Color palette type */
export type ColorPalette = readonly string[];

/**
 * Chart configuration utilities
 */
export const config = {
  /** Default theme name */
  defaultTheme: "light" as const,

  /** Chart color palettes */
  palettes: {
    light: LIGHT_PALETTE,
    dark: DARK_PALETTE,
  },

  /** Get palette for a given theme */
  getPalette: (theme: "light" | "dark" = "light"): ColorPalette => {
    return theme === "dark" ? DARK_PALETTE : LIGHT_PALETTE;
  },
};

/**
 * Data processing utilities
 */
export const data = {
  /**
   * Validate that a value is a non-empty array.
   *
   * @param value - Value to check
   * @returns True if value is a non-empty array
   */
  isValidChartData: (value: unknown): value is unknown[] => {
    return Array.isArray(value) && value.length > 0;
  },

  /**
   * Ensure data is an array, returning empty array for invalid inputs.
   *
   * @param value - Value to normalize
   * @returns Array of items or empty array
   */
  normalizeToArray: <T>(value: unknown): T[] => {
    return Array.isArray(value) ? (value as T[]) : [];
  },
};

/**
 * Main charts utilities export
 */
export const chartsUtils = {
  config,
  data,
  github,
  initMermaidConfig,
};

export default chartsUtils;
