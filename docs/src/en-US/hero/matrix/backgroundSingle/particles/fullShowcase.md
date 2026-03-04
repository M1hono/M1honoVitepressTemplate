---
layout: home
hero:
  name: "Particles"
  text: "Full Advanced Showcase"
  tagline: "Complete particle setup: custom texture sprites, area color mapping, random palette draws, and tuned motion."
  background:
    type: particles
    particles:
      enabled: true
      type: custom
      count: 520
      spread: 5.2
      appearance:
        type: custom
        texture:
          light: "/icon/mainindex/dashicons--format-chat.png"
          dark: "/icon/mainindex/dashicons--format-chat-dark-v2.png"
        textureColorMode: mask
        color:
          light: "rgba(82, 120, 230, 1)"
          dark: "rgba(198, 220, 255, 1)"
        opacity:
          light: 0.62
          dark: 0.9
        size: 0.11
        colorMode: area
        areaColor:
          axis: radius
          colors:
            - "rgba(66, 102, 228, 1)"
            - "rgba(132, 108, 238, 1)"
            - "rgba(246, 146, 156, 1)"
      movement:
        speed:
          min: 0.07
          max: 0.22
        direction: [0.07, -0.42, 0.05]
        gravity: -0.015
        turbulence: 0.28
        tiltVariance: 0.14
      lifecycle:
        respawn: true
      area:
        type: sphere
        size: [11, 11, 11]
        position: [0, 0.3, 0]
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
      text: "Contract"
      link: /en-US/hero/matrix/backgroundSingle/particles/particlesConfig
    - theme: alt
      text: "Custom Textures"
      link: /en-US/hero/matrix/backgroundSingle/particles/customTextures
features:
  - title: "Texture Sprites"
    details: "appearance.type=custom with theme texture source."
  - title: "Area Gradient"
    details: "colorMode=area with radius axis interpolation in rgba palette."
  - title: "Motion + Physics"
    details: "speed range, direction, gravity, turbulence, and tiltVariance tuned together."
  - title: "High Density"
    details: "Large count with spread and sphere area for full-scene coverage."
title: "Particles Full Showcase"
description: "Full advanced showcase for complex particle configurations."
priority: 18
---
# Particles Full Showcase

Primary focus: one complete advanced setup that exercises texture, color distribution, motion, lifecycle, and area in one page.

## Showcase Contract Surface

| Surface | Key examples |
| --- | --- |
| Behavior preset | `particles.type`, `count`, `spread` |
| Appearance | `appearance.type`, `appearance.texture`, `appearance.textureColorMode`, `appearance.size`, `appearance.opacity` |
| Color strategy | `appearance.colorMode`, `appearance.areaColor.*`, `appearance.palette`, `appearance.randomColorChance` |
| Motion | `movement.speed`, `movement.direction`, `movement.gravity`, `movement.turbulence`, `movement.tiltVariance` |
| World area | `area.type`, `area.size`, `area.position` |
| Lifecycle | `lifecycle.respawn` |

## Variant Snippets

### Partial random palette draws

```yaml
particles:
  appearance:
    colorMode: palette
    randomColorChance: 0.42
    palette:
      - "rgba(79, 115, 232, 1)"
      - "rgba(138, 105, 239, 1)"
      - "rgba(239, 134, 168, 1)"
```

### Area mapping by vertical axis

```yaml
particles:
  appearance:
    colorMode: area
    areaColor:
      axis: y
      colors:
        - "rgba(95, 125, 230, 1)"
        - "rgba(140, 117, 239, 1)"
        - "rgba(241, 168, 122, 1)"
```

### Dot appearance without custom texture

```yaml
particles:
  appearance:
    type: dot
    texture: ""
    color: "rgba(99, 152, 255, 1)"
```
