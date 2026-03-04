---
layout: home
hero:
  name: "Hero 图片"
  text: "框架布局和适配"
  tagline: "根级媒体尺寸 + 框架塑形，支持自定义 clip-path 和定位。"
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
      alt: "产品仪表盘"
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
      text: "浮动动画"
      link: /zh-CN/hero/matrix/floating/level4MotionDensityBlur
    - theme: outline
      text: "图片 API"
      link: /zh-CN/hero/AllConfig
features:
  - title: "框架契约"
    details: "形状、边框、阴影、clip-path 和尺寸均由 frontmatter 驱动。"
title: "Hero 图片：框架布局和适配"
description: "Hero 图片：框架布局和适配的展示和配置说明。"
priority: 50
---
# Hero 图片：框架布局和适配

重点：完整的 `hero.image` 根级尺寸契约和 `hero.image.frame` 形状控制。

## 实际使用的 Frontmatter

```yaml
---
layout: home
hero:
  name: "Hero 图片"
  text: "框架布局和适配"
  tagline: "根级媒体尺寸 + 框架塑形，支持自定义 clip-path 和定位。"
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
      alt: "产品仪表盘"
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
      text: "浮动动画"
      link: /zh-CN/hero/matrix/floating/level4MotionDensityBlur
    - theme: outline
      text: "图片 API"
      link: /zh-CN/hero/AllConfig
features:
  - title: "框架契约"
    details: "形状、边框、阴影、clip-path 和尺寸均由 frontmatter 驱动。"
---
```

## 展示的 API 键

| 键 | 全部配置 |
|---|---|
| `hero.image.background.enabled` | [图片全部配置](../../../AllConfig) |
| `hero.image.width` | [图片全部配置](../../../AllConfig) |
| `hero.image.height` | [图片全部配置](../../../AllConfig) |
| `hero.image.fit` | [图片全部配置](../../../AllConfig) |
| `hero.image.position` | [图片全部配置](../../../AllConfig) |
| `hero.image.frame.*` | [框架全部配置](../../../AllConfig) |

