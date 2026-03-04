---
layout: home
hero:
  name: "Features"
  text: "Full Config"
  tagline: "Hero actions + feature scroll config with card sizing and interaction tuning."
  actions:
    - theme: brand
      text: "Coverage Map"
      link: /en-US/hero/matrix/configCoverage
    - theme: outline
      text: "Back to Matrix"
      link: /en-US/hero/matrix/index
featuresConfig:
  scroll:
    speed: 0.68
    dragMultiplier: 1.9
    pauseOnHover: true
    minItems: 10
    edgeFade: true
    gap: 20
    gapTablet: 30
    gapDesktop: 38
  cards:
    width: 336
    widthTablet: 380
    widthDesktop: 430
features:
  - icon: mdi:chart-timeline-variant
    title: "Configuration Complete"
    details: "Show pages map runtime keys to concrete visual outcomes."
    theme: brand
    link: /en-US/hero/matrix/configCoverage
    linkText: "View Coverage"
  - icon: mdi:card-text-outline
    title: "Config Connected"
    details: "Each demo page links directly to the AllConfig hub."
    theme: info
    link: /en-US/hero/AllConfig
    linkText: "Open All Config"
  - icon: mdi:gesture-tap-button
    title: "Interaction Tuned"
    details: "Auto scroll and drag multiplier are controlled through `featuresConfig`."
    theme: tip
  - icon: mdi:cellphone-cog
    title: "Responsive Surface"
    details: "Gap and card width values are split for mobile, tablet, and desktop."
    theme: warning
title: "Features Full Configuration"
description: "Showcase and configuration notes for Features Full Configuration."
priority: 30
---
# Features Full Configuration

Primary focus: complete features section controls with scroll and card dimensions.

## Actual Frontmatter Used

```yaml
---
layout: home
hero:
  name: "Features"
  text: "Full Config"
  tagline: "Hero actions + feature scroll config with card sizing and interaction tuning."
  actions:
    - theme: brand
      text: "Coverage Map"
      link: /en-US/hero/matrix/configCoverage
    - theme: outline
      text: "Back to Matrix"
      link: /en-US/hero/matrix/index
featuresConfig:
  scroll:
    speed: 0.68
    dragMultiplier: 1.9
    pauseOnHover: true
    minItems: 10
    edgeFade: true
    gap: 20
    gapTablet: 30
    gapDesktop: 38
  cards:
    width: 336
    widthTablet: 380
    widthDesktop: 430
features:
  - icon: mdi:chart-timeline-variant
    title: "Configuration Complete"
    details: "Show pages map runtime keys to concrete visual outcomes."
    theme: brand
    link: /en-US/hero/matrix/configCoverage
    linkText: "View Coverage"
  - icon: mdi:card-text-outline
    title: "Config Connected"
    details: "Each demo page links directly to the AllConfig hub."
    theme: info
    link: /en-US/hero/AllConfig
    linkText: "Open All Config"
  - icon: mdi:gesture-tap-button
    title: "Interaction Tuned"
    details: "Auto scroll and drag multiplier are controlled through `featuresConfig`."
    theme: tip
  - icon: mdi:cellphone-cog
    title: "Responsive Surface"
    details: "Gap and card width values are split for mobile, tablet, and desktop."
    theme: warning
---
```

## API Keys Demonstrated

| Key | All Config |
|---|---|
| `hero.actions[]` | [Hero Root All Config](../../../AllConfig) |
| `features[]` | [All Config](../../../AllConfig) |
| `featuresConfig.scroll.speed` | [All Config](../../../AllConfig) |
| `featuresConfig.scroll.dragMultiplier` | [All Config](../../../AllConfig) |
| `featuresConfig.scroll.pauseOnHover` | [All Config](../../../AllConfig) |
| `featuresConfig.scroll.minItems` | [All Config](../../../AllConfig) |
| `featuresConfig.scroll.edgeFade` | [All Config](../../../AllConfig) |
| `featuresConfig.cards.width*` | [All Config](../../../AllConfig) |

