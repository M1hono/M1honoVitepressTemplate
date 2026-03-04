---
layout: home
hero:
  name: "Waves"
  text: "Level 4"
  tagline: "Color, outline, speed, reverse, and custom layers in one page."
  waves:
    enabled: true
    animated: true
    height: 112
    opacity: 0.96
    speed: 1.08
    color: "rgba(223, 231, 245, 1)"
    reversed: false
    outline: true
    zIndex: 2
    layers:
      - amplitude: 12
        frequency: 0.011
        speed: 0.72
        direction: -1
        opacity: 0.26
        color: "rgba(232, 238, 249, 1)"
      - amplitude: 18
        frequency: 0.0072
        speed: 0.88
        direction: 1
        opacity: 0.54
        color: "rgba(225, 234, 248, 1)"
      - amplitude: 24
        frequency: 0.0052
        speed: 1.12
        direction: 1
        opacity: 0.98
        color: "rgba(218, 229, 247, 1)"
  actions:
    - theme: brand
      text: "Buttons and Features"
      link: /en-US/hero/matrix/buttonsFeatures/featuresFullConfig
    - theme: outline
      text: "Waves API"
      link: /en-US/hero/AllConfig
title: "Waves Level 4: Outline and Color Layers"
description: "Showcase and configuration notes for Waves Level 4: Outline and Color Layers."
priority: 40
---
# Waves Level 4: Outline and Color Layers

Primary focus: complete wave visual API while preserving hero-content boundary semantics.

## Actual Frontmatter Used

```yaml
---
layout: home
hero:
  name: "Waves"
  text: "Level 4"
  tagline: "Color, outline, speed, reverse, and custom layers in one page."
  waves:
    enabled: true
    animated: true
    height: 112
    opacity: 0.96
    speed: 1.08
    color: "rgba(223, 231, 245, 1)"
    reversed: false
    outline: true
    zIndex: 2
    layers:
      - amplitude: 12
        frequency: 0.011
        speed: 0.72
        direction: -1
        opacity: 0.26
        color: "rgba(232, 238, 249, 1)"
      - amplitude: 18
        frequency: 0.0072
        speed: 0.88
        direction: 1
        opacity: 0.54
        color: "rgba(225, 234, 248, 1)"
      - amplitude: 24
        frequency: 0.0052
        speed: 1.12
        direction: 1
        opacity: 0.98
        color: "rgba(218, 229, 247, 1)"
  actions:
    - theme: brand
      text: "Buttons and Features"
      link: /en-US/hero/matrix/buttonsFeatures/featuresFullConfig
    - theme: outline
      text: "Waves API"
      link: /en-US/hero/AllConfig
---
```

## API Keys Demonstrated

| Key | All Config |
|---|---|
| `hero.waves.height` | [Waves All Config](../../../AllConfig) |
| `hero.waves.opacity` | [Waves All Config](../../../AllConfig) |
| `hero.waves.speed` | [Waves All Config](../../../AllConfig) |
| `hero.waves.color` | [Waves All Config](../../../AllConfig) |
| `hero.waves.reversed` | [Waves All Config](../../../AllConfig) |
| `hero.waves.outline` | [Waves All Config](../../../AllConfig) |
| `hero.waves.layers[]` | [Wave Layers All Config](../../../AllConfig) |

