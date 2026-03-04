---
layout: home
hero:
  name: "图层"
  text: "第 5 级"
  tagline: "图层级样式/cssVars + 根级 cssVars，实现深度组合控制。"
  background:
    focus: content
    cssVars:
      --layer-accent-light: "rgba(120, 167, 255, 0.3)"
      --layer-accent-dark: "rgba(68, 112, 187, 0.28)"
    style:
      boxShadow: "inset 0 -120px 140px -90px rgba(15, 23, 42, 0.35)"
    layers:
      - type: image
        zIndex: 0
        image:
          light: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
          dark: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
          size: cover
          position: center
      - type: color
        zIndex: 1
        opacity: 0.46
        blend: multiply
        cssVars:
          --layer-tint: "rgba(20, 41, 79, 0.58)"
        style:
          backdropFilter: "blur(1px)"
        color:
          value:
            light: "rgba(72, 107, 171, 0.38)"
            dark: "rgba(12, 24, 46, 0.52)"
      - type: shader
        zIndex: 2
        opacity: 0.52
        blend: screen
        style:
          mixBlendMode: "screen"
        shader:
          type: plasma
          speed: 0.44
          intensity: 0.45
  actions:
    - theme: brand
      text: "图片布局"
      link: /zh-CN/hero/matrix/imageTypes/frameLayoutFit
    - theme: outline
      text: "图层 API"
      link: /zh-CN/hero/AllConfig
features:
  - title: "每图层覆盖"
    details: "每个图层可以应用自己的 `style` 和 `cssVars`，同时保持 z-index 顺序。"
title: "图层第 5 级：图层样式和 cssVars"
description: "图层第 5 级：图层样式和 cssVars 的展示和配置说明。"
priority: 50
---
# 图层第 5 级：图层样式和 cssVars

重点：根级和图层级样式系统，用于高级视觉控制，无需更改运行时代码。

## 实际使用的 Frontmatter

```yaml
---
layout: home
hero:
  name: "图层"
  text: "第 5 级"
  tagline: "图层级样式/cssVars + 根级 cssVars，实现深度组合控制。"
  background:
    cssVars:
      --layer-accent-light: "rgba(120, 167, 255, 0.3)"
      --layer-accent-dark: "rgba(68, 112, 187, 0.28)"
    style:
      boxShadow: "inset 0 -120px 140px -90px rgba(15, 23, 42, 0.35)"
    layers:
      - type: image
        zIndex: 0
        image:
          light: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
          dark: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
          size: cover
          position: center
      - type: color
        zIndex: 1
        opacity: 0.46
        blend: multiply
        cssVars:
          --layer-tint: "rgba(20, 41, 79, 0.58)"
        style:
          backdropFilter: "blur(1px)"
        color:
          value:
            light: "rgba(72, 107, 171, 0.38)"
            dark: "rgba(12, 24, 46, 0.52)"
      - type: shader
        zIndex: 2
        opacity: 0.52
        blend: screen
        style:
          mixBlendMode: "screen"
        shader:
          type: plasma
          speed: 0.44
          intensity: 0.45
  actions:
    - theme: brand
      text: "图片布局"
      link: /zh-CN/hero/matrix/imageTypes/frameLayoutFit
    - theme: outline
      text: "图层 API"
      link: /zh-CN/hero/AllConfig
features:
  - title: "每图层覆盖"
    details: "每个图层可以应用自己的 `style` 和 `cssVars`，同时保持 z-index 顺序。"
---
```

## 展示的 API 键

| 键 | 全部配置 |
|---|---|
| `hero.background.layers[].style` | [图层全部配置](../../../AllConfig) |
| `hero.background.layers[].cssVars` | [图层全部配置](../../../AllConfig) |
| `hero.background.layers[].blend` | [图层全部配置](../../../AllConfig) |
| `hero.background.layers[].zIndex` | [图层全部配置](../../../AllConfig) |
| `hero.background.style` | [背景全部配置](../../../AllConfig) |
| `hero.background.cssVars` | [背景全部配置](../../../AllConfig) |

