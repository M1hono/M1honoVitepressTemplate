---
layout: home
hero:
  name: "Waves"
  text: "Level 3"
  tagline: "Tune baseline geometry for mobile while relying on built-in responsive scaling."
  waves:
    enabled: true
    animated: true
    height: 96
    speed: 0.92
    layers:
      - amplitude: 12
        frequency: 0.011
        speed: 0.72
        direction: -1
      - amplitude: 16
        frequency: 0.0076
        speed: 0.88
        direction: 1
      - amplitude: 22
        frequency: 0.0058
        speed: 1.05
        direction: 1
  actions:
    - theme: brand
      text: "Unsupported Keys"
      link: /en-US/hero/matrix/waves/deprecatedBackgroundType
title: "Waves Level 3"
description: "Showcase and configuration notes for Waves Level 3."
priority: 30
---
# Waves Level 3

Primary focus: mobile-specific wave geometry controls.

## Actual Frontmatter Used

The YAML below is the exact full frontmatter used by this page. Copy it to reproduce the same result.

```yaml
---
layout: home
hero:
  name: "Waves"
  text: "Level 3"
  tagline: "Tune baseline geometry for mobile while relying on built-in responsive scaling."
  waves:
    enabled: true
    animated: true
    height: 96
    speed: 0.92
    layers:
      - amplitude: 12
        frequency: 0.011
        speed: 0.72
        direction: -1
      - amplitude: 16
        frequency: 0.0076
        speed: 0.88
        direction: 1
      - amplitude: 22
        frequency: 0.0058
        speed: 1.05
        direction: 1
  actions:
    - theme: brand
      text: "Unsupported Keys"
      link: /en-US/hero/matrix/waves/deprecatedBackgroundType
---
```

## API Keys Demonstrated

| Key | All Config |
|---|---|
| `hero.waves.enabled/animated/height/opacity` | [Waves Root](../../../AllConfig) |
| `hero.waves.speed/color/reversed/outline/zIndex` | [Waves Root](../../../AllConfig) |
| `hero.waves.layers[]` | [Wave Layers](../../../AllConfig) |

## Configuration Focus

This page focuses on **hero-to-content boundary shaping and motion tuning**.
Primary contract area: wave bridge (`hero.waves`).

## Field Notes

| Topic | Guidance |
|-------|----------|
| Boundary role | Waves bridge hero section to document body, not background type |
| Shape tuning | `height`, layer `amplitude/frequency/opacity` |
| Motion tuning | `animated`, `speed`, and per-layer `direction` |

## Runtime Flow Diagram

```mermaid
flowchart LR
  A["Page frontmatter"] --> B["hero-frontmatter normalizer"]
  B --> C["wave bridge (`hero.waves`)"]
  C --> D["VPHero orchestrator"]
  D --> E["Hero + doc content output"]
```

