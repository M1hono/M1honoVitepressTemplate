---
layout: home
hero:
    name: "Background Image"
    text: "Position & Size"
    tagline: "Control background image position, size, and repeat behavior."
    background:
        type: image
        image:
            src: /images/hero-bg.jpg
            position: center
            size: cover
            repeat: no-repeat
    colors:
        title:
            light: "rgba(255, 255, 255, 1)"
            dark: "rgba(255, 255, 255, 1)"
        tagline:
            light: "rgba(224, 224, 224, 1)"
            dark: "rgba(204, 204, 204, 1)"
    actions:
        - theme: brand
          text: "Video Background"
          link: /en-US/hero/matrix/backgroundSingle/video
features:
    - title: "Position"
      details: "Set image position: center, top, bottom, left, right."
    - title: "Size"
      details: "cover, contain, or specific dimensions."
    - title: "Repeat"
      details: "Control repeat behavior."
title: "Image Position & Size"
description: "Control background image position and sizing."
priority: 16
---
# Image Position & Size

Primary focus: Control background image positioning and scaling.

## Actual Frontmatter

```yaml
---
layout: home
hero:
    background:
        type: image
        image:
            src: /images/hero-bg.jpg
            position: center
            size: cover
            repeat: no-repeat
---
```

## API Keys

| Key | Values | Description |
|-----|--------|-------------|
| `hero.background.image.position` | center, top, bottom, left, right | Image position |
| `hero.background.image.size` | cover, contain, auto, or dimensions | Image sizing |
| `hero.background.image.repeat` | repeat, no-repeat, repeat-x, repeat-y | Repeat behavior |
