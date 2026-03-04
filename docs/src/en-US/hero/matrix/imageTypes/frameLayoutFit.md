---
layout: home
hero:
  name: "Hero Image"
  text: "Frame Layout and Fit"
  tagline: "Root media sizing + frame shaping with custom clip-path and positioning."
  image:
    type: image
    background:
      enabled: false
    width: "520px"
    height: "360px"
    fit: contain
    position: "center"
    image:
      src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80"
      alt: "Product dashboard"
    frame:
      shape: custom
      width: "560px"
      height: "390px"
      padding: "18px"
      border: "1px solid rgba(148, 163, 184, 0.42)"
      radius: "20px"
      clipPath: "polygon(0 0, 94% 0, 100% 16%, 100% 100%, 6% 100%, 0 84%)"
      shadow:
        light: "0 22px 48px rgba(15, 23, 42, 0.16)"
        dark: "0 22px 48px rgba(2, 8, 24, 0.52)"
  actions:
    - theme: brand
      text: "Floating Motion"
      link: /en-US/hero/matrix/floating/level4MotionDensityBlur
    - theme: outline
      text: "Image API"
      link: /en-US/hero/AllConfig
features:
  - title: "Frame Contract"
    details: "Shape, border, shadow, clip-path, and dimensions are all frontmatter-driven."
title: "Hero Image: Frame Layout and Fit"
description: "Showcase and configuration notes for Hero Image: Frame Layout and Fit."
priority: 50
---
# Hero Image: Frame Layout and Fit

Primary focus: the full `hero.image` root sizing contract and `hero.image.frame` shape controls.

## Actual Frontmatter Used

```yaml
---
layout: home
hero:
  name: "Hero Image"
  text: "Frame Layout and Fit"
  tagline: "Root media sizing + frame shaping with custom clip-path and positioning."
  image:
    type: image
    background:
      enabled: false
    width: "520px"
    height: "360px"
    fit: contain
    position: "center"
    image:
      src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80"
      alt: "Product dashboard"
    frame:
      shape: custom
      width: "560px"
      height: "390px"
      padding: "18px"
      border: "1px solid rgba(148, 163, 184, 0.42)"
      radius: "20px"
      clipPath: "polygon(0 0, 94% 0, 100% 16%, 100% 100%, 6% 100%, 0 84%)"
      shadow:
        light: "0 22px 48px rgba(15, 23, 42, 0.16)"
        dark: "0 22px 48px rgba(2, 8, 24, 0.52)"
  actions:
    - theme: brand
      text: "Floating Motion"
      link: /en-US/hero/matrix/floating/level4MotionDensityBlur
    - theme: outline
      text: "Image API"
      link: /en-US/hero/AllConfig
features:
  - title: "Frame Contract"
    details: "Shape, border, shadow, clip-path, and dimensions are all frontmatter-driven."
---
```

## API Keys Demonstrated

| Key | All Config |
|---|---|
| `hero.image.background.enabled` | [Image All Config](../../../AllConfig) |
| `hero.image.width` | [Image All Config](../../../AllConfig) |
| `hero.image.height` | [Image All Config](../../../AllConfig) |
| `hero.image.fit` | [Image All Config](../../../AllConfig) |
| `hero.image.position` | [Image All Config](../../../AllConfig) |
| `hero.image.frame.*` | [Frame All Config](../../../AllConfig) |

