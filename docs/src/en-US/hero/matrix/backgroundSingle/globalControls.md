---
layout: home
hero:
  name: "Single Background"
  text: "Global Controls"
  tagline: "Root-level opacity/filter controls plus page-scoped background cssVars and style."
  background:
    mode: single
    type: color
    opacity: 0.88
    brightness: 1.02
    contrast: 1.08
    saturation: 1.12
    filter: "hue-rotate(-4deg)"
    cssVars:
      --hero-global-overlay-light: "rgba(52, 93, 165, 0.16)"
      --hero-global-overlay-dark: "rgba(15, 35, 72, 0.26)"
    style:
      backgroundImage:
        light: "radial-gradient(120% 120% at 76% -10%, rgba(139, 179, 255, 0.44) 0%, rgba(139, 179, 255, 0) 62%)"
        dark: "radial-gradient(120% 120% at 76% -10%, rgba(56, 92, 152, 0.36) 0%, rgba(56, 92, 152, 0) 62%)"
      backgroundBlendMode: "screen"
    color:
      value:
        light: "linear-gradient(160deg, rgba(238, 243, 255, 1) 0%, rgba(246, 249, 255, 1) 52%, rgba(248, 250, 252, 1) 100%)"
        dark: "linear-gradient(160deg, rgba(11, 18, 34, 1) 0%, rgba(17, 26, 47, 1) 54%, rgba(22, 34, 59, 1) 100%)"
  actions:
    - theme: brand
      text: "Layer CSS Vars"
      link: /en-US/hero/matrix/layers/level5LayerStyleCssvars
    - theme: outline
      text: "Background API"
      link: /en-US/hero/AllConfig
features:
  - title: "Root Filters"
    details: "`opacity`, `brightness`, `contrast`, `saturation`, and `filter` are applied once at background root."
  - title: "Scoped Tokens"
    details: "`hero.background.cssVars` controls this hero background only."
title: "Single Background: Global Controls"
description: "Showcase and configuration notes for Single Background: Global Controls."
priority: 70
---
# Single Background: Global Controls

Primary focus: root background control fields used across all single background types.

## Actual Frontmatter Used

```yaml
---
layout: home
hero:
  name: "Single Background"
  text: "Global Controls"
  tagline: "Root-level opacity/filter controls plus page-scoped background cssVars and style."
  background:
    mode: single
    type: color
    opacity: 0.88
    brightness: 1.02
    contrast: 1.08
    saturation: 1.12
    filter: "hue-rotate(-4deg)"
    cssVars:
      --hero-global-overlay-light: "rgba(52, 93, 165, 0.16)"
      --hero-global-overlay-dark: "rgba(15, 35, 72, 0.26)"
    style:
      backgroundImage:
        light: "radial-gradient(120% 120% at 76% -10%, rgba(139, 179, 255, 0.44) 0%, rgba(139, 179, 255, 0) 62%)"
        dark: "radial-gradient(120% 120% at 76% -10%, rgba(56, 92, 152, 0.36) 0%, rgba(56, 92, 152, 0) 62%)"
      backgroundBlendMode: "screen"
    color:
      value:
        light: "linear-gradient(160deg, rgba(238, 243, 255, 1) 0%, rgba(246, 249, 255, 1) 52%, rgba(248, 250, 252, 1) 100%)"
        dark: "linear-gradient(160deg, rgba(11, 18, 34, 1) 0%, rgba(17, 26, 47, 1) 54%, rgba(22, 34, 59, 1) 100%)"
  actions:
    - theme: brand
      text: "Layer CSS Vars"
      link: /en-US/hero/matrix/layers/level5LayerStyleCssvars
    - theme: outline
      text: "Background API"
      link: /en-US/hero/AllConfig
features:
  - title: "Root Filters"
    details: "`opacity`, `brightness`, `contrast`, `saturation`, and `filter` are applied once at background root."
  - title: "Scoped Tokens"
    details: "`hero.background.cssVars` controls this hero background only."
---
```

## API Keys Demonstrated

| Key | All Config |
|---|---|
| `hero.background.mode` | [Background All Config](../../../AllConfig) |
| `hero.background.opacity` | [Background All Config](../../../AllConfig) |
| `hero.background.brightness` | [Background All Config](../../../AllConfig) |
| `hero.background.contrast` | [Background All Config](../../../AllConfig) |
| `hero.background.saturation` | [Background All Config](../../../AllConfig) |
| `hero.background.filter` | [Background All Config](../../../AllConfig) |
| `hero.background.cssVars` | [Background All Config](../../../AllConfig) |
| `hero.background.style` | [Background All Config](../../../AllConfig) |

