---
layout: home
hero:
    name: "Background Image"
    text: "Overlay Effects"
    tagline: "Add overlay effects to background images for cleaner text contrast."
    background:
        type: image
        image:
            src: /images/hero-bg.jpg
            overlay: true
            overlayOpacity: 0.5
            overlayColor: "rgba(0, 0, 0, 1)"
    colors:
        title:
            light: "rgba(255, 255, 255, 1)"
            dark: "rgba(255, 255, 255, 1)"
        tagline:
            light: "rgba(224, 224, 224, 1)"
            dark: "rgba(204, 204, 204, 1)"
        navText:
            light: "rgba(255, 255, 255, 1)"
            dark: "rgba(255, 255, 255, 1)"
        navTextScrolled:
            light: "rgba(26, 26, 46, 1)"
            dark: "rgba(224, 224, 224, 1)"
    actions:
        - theme: brand
          text: "Position"
          link: /en-US/hero/matrix/backgroundSingle/image/backgroundPosition
features:
    - title: "Overlay"
      details: "Add semi-transparent overlay for text contrast."
    - title: "Opacity Control"
      details: "Adjust overlay intensity from 0 to 1."
title: "Image Overlay"
description: "Background image with overlay effects."
priority: 15
---
# Image Overlay

Primary focus: Background image with overlay for text contrast.

## Actual Frontmatter

```yaml
---
layout: home
hero:
    background:
        type: image
        image:
            src: /images/hero-bg.jpg
            overlay: true
            overlayOpacity: 0.5
            overlayColor: "rgba(0, 0, 0, 1)"
---
```

## API Keys

| Key | Type | Description |
|-----|------|-------------|
| `hero.background.image.overlay` | boolean | Enable overlay |
| `hero.background.image.overlayOpacity` | number | Overlay opacity (0-1) |
| `hero.background.image.overlayColor` | string | Overlay color |
