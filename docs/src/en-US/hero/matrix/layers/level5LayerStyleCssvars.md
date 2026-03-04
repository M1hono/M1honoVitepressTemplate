---
layout: home
hero:
  name: "Layers"
  text: "Level 5"
  tagline: "Layer-level style/cssVars plus root-level cssVars for deep composition control."
  background:
    cssVars:
      --layer-accent-light: "rgba(120, 167, 255, 0.3)"
      --layer-accent-dark: "rgba(68, 112, 187, 0.28)"
    style:
      boxShadow: "inset 0 -120px 140px -90px rgba(15, 23, 42, 0.35)"
    layers:
      - type: image
        zIndex: 0
        image:
          light: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
          dark: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
          size: cover
          position: center
      - type: color
        zIndex: 1
        opacity: 0.46
        blend: multiply
        cssVars:
          --layer-tint: "rgba(20, 41, 79, 0.58)"
        style:
          backdropFilter: "blur(1px)"
        color:
          value:
            light: "rgba(72, 107, 171, 0.38)"
            dark: "rgba(12, 24, 46, 0.52)"
      - type: shader
        zIndex: 2
        opacity: 0.52
        blend: screen
        style:
          mixBlendMode: "screen"
        shader:
          type: plasma
          speed: 0.44
          intensity: 0.45
  actions:
    - theme: brand
      text: "Image Layout"
      link: /en-US/hero/matrix/imageTypes/frameLayoutFit
    - theme: outline
      text: "Layers API"
      link: /en-US/hero/AllConfig
features:
  - title: "Per-Layer Overrides"
    details: "Each layer can apply its own `style` and `cssVars` while keeping z-index ordering."
title: "Layers Level 5: Layer Style and cssVars"
description: "Showcase and configuration notes for Layers Level 5: Layer Style and cssVars."
priority: 50
---
# Layers Level 5: Layer Style and cssVars

Primary focus: root and layer style systems for advanced visual control without changing runtime code.

## Actual Frontmatter Used

```yaml
---
layout: home
hero:
  name: "Layers"
  text: "Level 5"
  tagline: "Layer-level style/cssVars plus root-level cssVars for deep composition control."
  background:
    cssVars:
      --layer-accent-light: "rgba(120, 167, 255, 0.3)"
      --layer-accent-dark: "rgba(68, 112, 187, 0.28)"
    style:
      boxShadow: "inset 0 -120px 140px -90px rgba(15, 23, 42, 0.35)"
    layers:
      - type: image
        zIndex: 0
        image:
          light: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
          dark: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
          size: cover
          position: center
      - type: color
        zIndex: 1
        opacity: 0.46
        blend: multiply
        cssVars:
          --layer-tint: "rgba(20, 41, 79, 0.58)"
        style:
          backdropFilter: "blur(1px)"
        color:
          value:
            light: "rgba(72, 107, 171, 0.38)"
            dark: "rgba(12, 24, 46, 0.52)"
      - type: shader
        zIndex: 2
        opacity: 0.52
        blend: screen
        style:
          mixBlendMode: "screen"
        shader:
          type: plasma
          speed: 0.44
          intensity: 0.45
  actions:
    - theme: brand
      text: "Image Layout"
      link: /en-US/hero/matrix/imageTypes/frameLayoutFit
    - theme: outline
      text: "Layers API"
      link: /en-US/hero/AllConfig
features:
  - title: "Per-Layer Overrides"
    details: "Each layer can apply its own `style` and `cssVars` while keeping z-index ordering."
---
```

## API Keys Demonstrated

| Key | All Config |
|---|---|
| `hero.background.layers[].style` | [Layers All Config](../../../AllConfig) |
| `hero.background.layers[].cssVars` | [Layers All Config](../../../AllConfig) |
| `hero.background.layers[].blend` | [Layers All Config](../../../AllConfig) |
| `hero.background.layers[].zIndex` | [Layers All Config](../../../AllConfig) |
| `hero.background.style` | [Background All Config](../../../AllConfig) |
| `hero.background.cssVars` | [Background All Config](../../../AllConfig) |

