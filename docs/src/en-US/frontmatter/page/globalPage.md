---
title: Global Page Frontmatter
description: Page-level frontmatter keys for current-page behavior with page-scoped cssVars.
priority: 10
---
# Global Page Frontmatter

## Core Keys

| Key | Type | Default | Purpose |
| --- | --- | --- | --- |
| `cssVars` | `Record<string, value | { light, dark, value }>` | `undefined` | Apply CSS custom properties to current page scope only.
| `layoutClass` | `string` | `undefined` | Extra class on layout wrapper for page-specific styling.
| `layout` | `string` | VitePress default | Standard VitePress layout selection.
| `isHome` | `boolean` | inferred by layout | Used by some theme components to detect home context.

## Example

```yaml
layoutClass: docs-premium
cssVars:
  --page-accent:
    light: "rgba(63, 99, 214, 1)"
    dark: "rgba(142, 167, 255, 1)"
  --surface-soft:
    light: "rgba(63, 99, 214, 0.08)"
    dark: "rgba(142, 167, 255, 0.16)"
```

## Scope Split

- Page scope: `cssVars`
- Hero background scope: `hero.background.cssVars`
- Hero layer scope: `hero.background.layers[*].cssVars`
