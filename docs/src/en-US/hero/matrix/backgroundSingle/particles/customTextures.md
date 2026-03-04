---
layout: home
hero:
  name: "Particles"
  text: "Custom Texture Sprites"
  tagline: "Use custom sprite textures with explicit appearance type and rgba-driven color control."
  background:
    type: particles
    particles:
      enabled: true
      type: custom
      count: 260
      spread: 4.1
      appearance:
        type: custom
        texture:
          light: "/icon/mainindex/material-symbols--markdown-copy-sharp.png"
          dark: "/icon/mainindex/material-symbols--markdown-copy-sharp-dark-v2.png"
        textureColorMode: mask
        colorMode: palette
        randomColorChance: 0.6
        palette:
          - "rgba(70, 109, 232, 1)"
          - "rgba(132, 98, 235, 1)"
          - "rgba(245, 136, 166, 1)"
        size: 0.12
        opacity:
          light: 0.66
          dark: 0.9
      movement:
        speed:
          min: 0.08
          max: 0.2
        direction: [0.04, -0.55, 0.03]
        turbulence: 0.2
        tiltVariance: 0.12
      area:
        type: box
        size: [9, 5, 9]
        position: [0, 1, 0]
  colors:
    title:
      light: "rgba(18, 30, 58, 0.96)"
      dark: "rgba(255, 255, 255, 1)"
    text:
      light: "rgba(18, 30, 58, 0.96)"
      dark: "rgba(255, 255, 255, 1)"
    tagline:
      light: "rgba(56, 74, 112, 0.92)"
      dark: "rgba(210, 218, 235, 0.92)"
  actions:
    - theme: brand
      text: "Full Showcase"
      link: /en-US/hero/matrix/backgroundSingle/particles/fullShowcase
features:
  - title: "appearance.type"
    details: "Separate visual sprite type from particles motion preset type."
  - title: "Texture Color Mode"
    details: "Use textureColorMode=mask to keep colors controlled by rgba settings."
  - title: "Palette Random"
    details: "Use colorMode=palette with randomColorChance for controlled diversity."
title: "Particles Custom Textures"
description: "Custom texture sprite setup and contract for particle appearance."
priority: 17
---
# Particles Custom Textures

Primary focus: texture-driven particle sprites and clear type-domain separation.

## Type Domains

| Key | Domain |
| --- | --- |
| `particles.type` | Motion preset profile (`stars/snow/rain/bubbles/sparks/custom`). |
| `particles.appearance.type` | Visual sprite type (`dot/circle/square/star/custom`). |

`particles.type` is not a frame or sprite key. Sprite selection belongs to `appearance.type`.

## Actual Frontmatter Used

```yaml
---
layout: home
hero:
  background:
    type: particles
    particles:
      enabled: true
      type: custom
      count: 260
      spread: 4.1
      appearance:
        type: custom
        texture:
          light: "/icon/mainindex/material-symbols--markdown-copy-sharp.png"
          dark: "/icon/mainindex/material-symbols--markdown-copy-sharp-dark-v2.png"
        textureColorMode: mask
        colorMode: palette
        randomColorChance: 0.6
        palette:
          - "rgba(70, 109, 232, 1)"
          - "rgba(132, 98, 235, 1)"
          - "rgba(245, 136, 166, 1)"
        size: 0.12
        opacity:
          light: 0.66
          dark: 0.9
      movement:
        speed:
          min: 0.08
          max: 0.2
        direction: [0.04, -0.55, 0.03]
        turbulence: 0.2
        tiltVariance: 0.12
      area:
        type: box
        size: [9, 5, 9]
        position: [0, 1, 0]
---
```

## Texture Contract

| Key | Type | Notes |
| --- | --- | --- |
| `appearance.type` | `dot \| circle \| square \| star \| custom` | `custom` enables direct texture-oriented usage. |
| `appearance.texture` | `string \| ThemeValue<string>` | Path or URL for sprite texture. |
| `appearance.textureColorMode` | `'mask' \| 'image'` | `mask` uses rgba-driven color; `image` preserves original texture color. |
| `appearance.shape` | same union | Backward-compatible alias of `appearance.type`. |

## Full Texture + Complex Controls (Template)

```yaml
hero:
  background:
    type: particles
    particles:
      type: custom
      count: 320
      spread: 4.6
      appearance:
        type: custom
        texture:
          light: "/icon/mainindex/material-symbols--markdown-copy-sharp.png"
          dark: "/icon/mainindex/material-symbols--markdown-copy-sharp-dark-v2.png"
        textureColorMode: mask
        colorMode: area
        areaColor:
          axis: x
          colors:
            - "rgba(79, 115, 232, 1)"
            - "rgba(138, 105, 239, 1)"
            - "rgba(239, 134, 168, 1)"
        size: 0.11
        opacity:
          light: 0.62
          dark: 0.86
      movement:
        speed:
          min: 0.06
          max: 0.16
        direction: [0.03, -0.4, 0.03]
        gravity: -0.01
        turbulence: 0.22
        tiltVariance: 0.12
      lifecycle:
        respawn: true
      area:
        type: box
        size: [10, 5, 10]
        position: [0, 1, 0]
```
