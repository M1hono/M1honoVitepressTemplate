---
layout: home
hero:
    name: "背景图片"
    text: "叠加效果"
    tagline: "为背景图片添加叠加效果，提升文字对比度。"
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
          text: "位置"
          link: /zh-CN/hero/matrix/backgroundSingle/image/backgroundPosition
features:
    - title: "叠加层"
      details: "添加半透明叠加层以提高文字对比度。"
    - title: "透明度控制"
      details: "调整叠加层强度（0到1）。"
title: "图片叠加"
description: "带叠加效果的背景图片。"
priority: 15
---
# 图片叠加

主要关注点：带叠加层的背景图片，用于增强文字对比度。

## 本页实际 Frontmatter 配置

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

## API 配置项

| 键 | 类型 | 说明 |
|-----|------|-------------|
| `hero.background.image.overlay` | boolean | 启用叠加层 |
| `hero.background.image.overlayOpacity` | number | 叠加层透明度（0-1） |
| `hero.background.image.overlayColor` | string | 叠加层颜色 |
