---
title: Features And Home Frontmatter
description: Frontmatter configuration for home feature cards and endless scrolling behavior.
priority: 30
---
# Features And Home Frontmatter

## Feature Data

```yaml
features:
  - icon: mdi:rocket-launch-outline
    title: "Runtime Complete"
    details: "Supports shader, particles, waves and model3d."
    theme: brand
    link: /en-US/hero/matrix/index
```

## Scroller Config Keys

Only canonical key path is supported:

- `featuresConfig`

### Supported Fields

| Path | Type | Default |
| --- | --- | --- |
| `featuresConfig.scroll.speed` | `number` | `0.6` |
| `featuresConfig.scroll.dragMultiplier` | `number` | `2` |
| `featuresConfig.scroll.pauseOnHover` | `boolean` | `true` |
| `featuresConfig.scroll.minItems` | `number` | `12` |
| `featuresConfig.scroll.edgeFade` | `boolean` | `true` |
| `featuresConfig.scroll.gap` | `number` | `24` |
| `featuresConfig.scroll.gapTablet` | `number` | `32` |
| `featuresConfig.scroll.gapDesktop` | `number` | `40` |
| `featuresConfig.cards.width` | `number` | `340` |
| `featuresConfig.cards.widthTablet` | `number` | `380` |
| `featuresConfig.cards.widthDesktop` | `number` | `420` |
