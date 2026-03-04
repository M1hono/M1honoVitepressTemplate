---
layout: home
hero:
  name: "Floating"
  text: "Level 4"
  tagline: "Global motion, density, blur, and gradient palette configuration."
  floating:
    enabled: true
    opacity: 0.92
    density: 14
    blur: 2
    gradients:
      - "linear-gradient(120deg, rgba(15, 76, 154, 1) 0%, rgba(47, 111, 192, 1) 52%, rgba(106, 163, 232, 1) 100%)"
      - "linear-gradient(120deg, rgba(13, 123, 102, 1) 0%, rgba(21, 148, 129, 1) 54%, rgba(67, 188, 160, 1) 100%)"
      - "linear-gradient(120deg, rgba(138, 95, 26, 1) 0%, rgba(185, 131, 35, 1) 56%, rgba(226, 173, 75, 1) 100%)"
    motion:
      enabled: true
      style: drift
      durationMin: 10
      durationMax: 24
      drift: 42
    items:
      - type: text
        text: "Adaptive Contrast"
        x: "18%"
        y: "18%"
        motionStyle: drift
        driftX: 28
        driftY: 14
        duration: 14
      - type: card
        title: "Control Surface"
        description: "Global motion defaults + per-item overrides"
        x: "70%"
        y: "24%"
        delay: 1.6
      - type: code
        code: "floating.motion.durationMin: 10"
        x: "32%"
        y: "76%"
      - type: shape
        shape: circle
        x: "84%"
        y: "62%"
        size: "72px"
  actions:
    - theme: brand
      text: "Waves Level 4"
      link: /en-US/hero/matrix/waves/level4OutlineColor
    - theme: outline
      text: "Floating API"
      link: /en-US/hero/AllConfig
title: "Floating Level 4: Motion, Density, Blur"
description: "Showcase and configuration notes for Floating Level 4: Motion, Density, Blur."
priority: 40
---
# Floating Level 4: Motion, Density, Blur

Primary focus: full floating global control fields plus per-item motion overrides.

## Actual Frontmatter Used

```yaml
---
layout: home
hero:
  name: "Floating"
  text: "Level 4"
  tagline: "Global motion, density, blur, and gradient palette configuration."
  floating:
    enabled: true
    opacity: 0.92
    density: 14
    blur: 2
    gradients:
      - "linear-gradient(120deg, rgba(15, 76, 154, 1) 0%, rgba(47, 111, 192, 1) 52%, rgba(106, 163, 232, 1) 100%)"
      - "linear-gradient(120deg, rgba(13, 123, 102, 1) 0%, rgba(21, 148, 129, 1) 54%, rgba(67, 188, 160, 1) 100%)"
      - "linear-gradient(120deg, rgba(138, 95, 26, 1) 0%, rgba(185, 131, 35, 1) 56%, rgba(226, 173, 75, 1) 100%)"
    motion:
      enabled: true
      style: drift
      durationMin: 10
      durationMax: 24
      drift: 42
    items:
      - type: text
        text: "Adaptive Contrast"
        x: "18%"
        y: "18%"
        motionStyle: drift
        driftX: 28
        driftY: 14
        duration: 14
      - type: card
        title: "Control Surface"
        description: "Global motion defaults + per-item overrides"
        x: "70%"
        y: "24%"
        delay: 1.6
      - type: code
        code: "floating.motion.durationMin: 10"
        x: "32%"
        y: "76%"
      - type: shape
        shape: circle
        x: "84%"
        y: "62%"
        size: "72px"
  actions:
    - theme: brand
      text: "Waves Level 4"
      link: /en-US/hero/matrix/waves/level4OutlineColor
    - theme: outline
      text: "Floating API"
      link: /en-US/hero/AllConfig
---
```

## API Keys Demonstrated

| Key | All Config |
|---|---|
| `hero.floating.opacity` | [Floating All Config](../../../AllConfig) |
| `hero.floating.density` | [Floating All Config](../../../AllConfig) |
| `hero.floating.blur` | [Floating All Config](../../../AllConfig) |
| `hero.floating.gradients` | [Floating All Config](../../../AllConfig) |
| `hero.floating.motion.*` | [Floating All Config](../../../AllConfig) |
| `hero.floating.items[].motionStyle` | [Floating All Config](../../../AllConfig) |
| `hero.floating.items[].driftX/driftY` | [Floating All Config](../../../AllConfig) |
| `hero.floating.items[].duration/delay` | [Floating All Config](../../../AllConfig) |
