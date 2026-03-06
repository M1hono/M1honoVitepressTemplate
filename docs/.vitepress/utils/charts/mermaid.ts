import mermaid from "mermaid";

/** Mermaid configuration options */
interface MermaidConfigOptions {
  /** Theme to use: 'default', 'dark', 'forest', 'neutral' */
  theme?: "default" | "dark" | "forest" | "neutral";
  /** Security level: 'strict', 'loose', 'antiscript' */
  securityLevel?: "strict" | "loose" | "antiscript";
}

/**
 * Initialize Mermaid diagram rendering library.
 *
 * WARNING: The default securityLevel 'loose' allows arbitrary JavaScript in diagrams.
 * Consider using 'strict' or 'antiscript' for untrusted content sources.
 *
 * @param options - Configuration options for theme and security level
 * @returns void
 * @throws Error if initialization fails (only in browser environment)
 */
export function initMermaidConfig(options: MermaidConfigOptions = {}): void {
  if (typeof window === "undefined") {
    return;
  }

  const { theme = "default", securityLevel = "loose" } = options;

  try {
    mermaid.initialize({
      startOnLoad: true,
      theme,
      securityLevel,
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: "cardinal",
      },
      sequence: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        mirrorActors: true,
      },
      gantt: {
        titleTopMargin: 25,
        barHeight: 20,
        barGap: 4,
        topPadding: 50,
        leftPadding: 75,
        gridLineStartPadding: 35,
        fontSize: 11,
        numberSectionStyles: 4,
        axisFormat: "%Y-%m-%d",
      },
    });
  } catch (error) {
    console.error("Failed to initialize Mermaid:", error);
    throw error;
  }
} 