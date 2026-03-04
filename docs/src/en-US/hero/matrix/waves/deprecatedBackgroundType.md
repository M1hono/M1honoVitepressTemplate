---
layout: home
hero:
  name: "Waves"
  text: "Unsupported Input"
  tagline: "background.type=waves is unsupported and should be ignored."
  background:
    type: waves
  waves:
    enabled: true
  actions:
    - theme: brand
      text: "Image Types"
      link: /en-US/hero/matrix/imageTypes/index
features:
  - title: "Expected Behavior"
    details: "Runtime warns in dev and still renders waves only from hero.waves."
title: "Unsupported Background Type"
description: "Showcase and configuration notes for Unsupported Background Type."
priority: 90
---
# Unsupported Background Type

Primary focus: unsupported configuration behavior.

## Actual Frontmatter Used

The YAML below is the exact full frontmatter used by this page. Copy it to reproduce the same result.

```yaml
---
layout: home
hero:
  name: "Waves"
  text: "Unsupported Input"
  tagline: "background.type=waves is unsupported and should be ignored."
  background:
    type: waves
  waves:
    enabled: true
  actions:
    - theme: brand
      text: "Image Types"
      link: /en-US/hero/matrix/imageTypes/index
features:
  - title: "Expected Behavior"
    details: "Runtime warns in dev and still renders waves only from hero.waves."
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

