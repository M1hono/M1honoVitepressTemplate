---
layout: home
hero:
  name: "Single Background"
  text: "Particles"
  tagline: "Runtime-accurate reference for particles presets, key paths, and valid frontmatter."
  background:
    type: particles
    particles:
      type: stars
      count: 240
      spread: 3.2
      appearance:
        color:
          light: "rgba(51, 88, 171, 1)"
          dark: "rgba(192, 214, 255, 1)"
        opacity:
          light: 0.82
          dark: 0.94
        size: 0.13
      movement:
        speed:
          min: 0.05
          max: 0.14
        turbulence: 0.12
        tiltVariance: 0.1
  actions:
    - theme: brand
      text: "Particles Contract"
      link: /en-US/hero/matrix/backgroundSingle/particles/particlesConfig
features:
  - title: "Preset Types"
    details: "stars, snow, rain, bubbles, sparks, custom are all runtime-supported."
  - title: "Contract-First"
    details: "Examples below only use keys consumed by ParticleSystem runtime."
  - title: "Color Format"
    details: "Use rgba(...) strings for all particle color-related fields."
  - title: "Advanced Showcase"
    details: "Custom textures, area color mapping, and full complex config demonstrations."
title: "Single Particles Background"
description: "Reference entry for particle background presets and contract links."
priority: 50
---
# Single Particles Background

Primary focus: reference-first entry for particles. Use this page to navigate all valid config formats.

## Reference Pages

- [Particles Runtime Contract](./particlesConfig)
- [Particles Color and Opacity Formats](./particlesColor)
- [Particles Custom Textures](./customTextures)
- [Particles Full Showcase](./fullShowcase)

## Actual Frontmatter Used

The YAML below is the exact full frontmatter used by this page. Copy it to reproduce the same result.

```yaml
---
layout: home
hero:
  name: "Single Background"
  text: "Particles"
  tagline: "Runtime-accurate reference for particles presets, key paths, and valid frontmatter."
  background:
    type: particles
    particles:
      type: stars
      count: 240
      spread: 3.2
      appearance:
        color:
          light: "rgba(51, 88, 171, 1)"
          dark: "rgba(192, 214, 255, 1)"
        opacity:
          light: 0.82
          dark: 0.94
        size: 0.13
      movement:
        speed:
          min: 0.05
          max: 0.14
        turbulence: 0.12
        tiltVariance: 0.1
  actions:
    - theme: brand
      text: "Particles Contract"
      link: /en-US/hero/matrix/backgroundSingle/particles/particlesConfig
features:
  - title: "Preset Types"
    details: "stars, snow, rain, bubbles, sparks, custom are all runtime-supported."
  - title: "Contract-First"
    details: "Examples below only use keys consumed by ParticleSystem runtime."
  - title: "Color Format"
    details: "Use rgba(...) strings for all particle color-related fields."
---
```

## Runtime-Supported Presets (`particles.type`)

| Type | Typical visual | Runtime defaults summary |
| --- | --- | --- |
| `stars` | drifting points | color `rgba(53, 86, 186, 1)`, opacity `0.68`, speed `0.02-0.08`, area `sphere` |
| `snow` | slow snowfall | color `rgba(242, 246, 255, 1)`, opacity `0.78`, speed `0.08-0.26`, area `plane` |
| `rain` | fast rain streaks | color `rgba(123, 156, 255, 1)`, opacity `0.45`, speed `1.25-2.3`, area `plane` |
| `bubbles` | upward bubbles | color `rgba(168, 211, 255, 1)`, opacity `0.4`, speed `0.22-0.56`, area `box` |
| `sparks` | energetic sparks | color `rgba(255, 198, 130, 1)`, opacity `0.72`, speed `0.8-1.6`, area `box` |
| `custom` | fully tuned profile | color `rgba(133, 165, 255, 1)`, opacity `0.58`, speed `0.12-0.56`, area `box` |

## Key Paths and Reference Ownership

| Key | All Config |
| --- | --- |
| `hero.background.type: particles` | [All Hero Configuration](../../../AllConfig) |
| `hero.background.particles.*` | [Particles Runtime Contract](./particlesConfig) |
| `hero.background.particles.color / appearance.color` | [Particles Color and Opacity](./particlesColor) |
| `hero.background.particles.appearance.texture` | [Particles Custom Textures](./customTextures) |
| full advanced composition | [Particles Full Showcase](./fullShowcase) |
| `hero.background.opacity/brightness/contrast/saturation/filter` | [Global Controls](../globalControls) |
