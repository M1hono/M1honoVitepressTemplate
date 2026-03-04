---
layout: home
hero:
  name: "单一背景"
  text: "全局控制"
  tagline: "根级不透明度/滤镜控制 + 页面级背景 cssVars 和样式。"
  background:
    mode: single
    type: color
    opacity: 0.88
    brightness: 1.02
    contrast: 1.08
    saturation: 1.12
    filter: "hue-rotate(-4deg)"
    cssVars:
      --hero-global-overlay-light: "rgba(52, 93, 165, 0.16)"
      --hero-global-overlay-dark: "rgba(15, 35, 72, 0.26)"
    style:
      backgroundImage:
        light: "radial-gradient(120% 120% at 76% -10%, rgba(139, 179, 255, 0.44) 0%, rgba(139, 179, 255, 0) 62%)"
        dark: "radial-gradient(120% 120% at 76% -10%, rgba(56, 92, 152, 0.36) 0%, rgba(56, 92, 152, 0) 62%)"
      backgroundBlendMode: "screen"
    color:
      value:
        light: "linear-gradient(160deg, rgba(238, 243, 255, 1) 0%, rgba(246, 249, 255, 1) 52%, rgba(248, 250, 252, 1) 100%)"
        dark: "linear-gradient(160deg, rgba(11, 18, 34, 1) 0%, rgba(17, 26, 47, 1) 54%, rgba(22, 34, 59, 1) 100%)"
  actions:
    - theme: brand
      text: "图层 CSS 变量"
      link: /zh-CN/hero/matrix/layers/level5LayerStyleCssvars
    - theme: outline
      text: "背景 API"
      link: /zh-CN/hero/AllConfig
features:
  - title: "根级滤镜"
    details: "`opacity`、`brightness`、`contrast`、`saturation` 和 `filter` 在背景根级应用一次。"
  - title: "作用域令牌"
    details: "`hero.background.cssVars` 仅控制当前 hero 背景。"
title: "单一背景：全局控制"
description: "单一背景：全局控制的展示和配置说明。"
priority: 70
---
# 单一背景：全局控制

重点：用于所有单一背景类型的根级背景控制字段。

## 实际使用的 Frontmatter

```yaml
---
layout: home
hero:
  name: "单一背景"
  text: "全局控制"
  tagline: "根级不透明度/滤镜控制 + 页面级背景 cssVars 和样式。"
  background:
    mode: single
    type: color
    opacity: 0.88
    brightness: 1.02
    contrast: 1.08
    saturation: 1.12
    filter: "hue-rotate(-4deg)"
    cssVars:
      --hero-global-overlay-light: "rgba(52, 93, 165, 0.16)"
      --hero-global-overlay-dark: "rgba(15, 35, 72, 0.26)"
    style:
      backgroundImage:
        light: "radial-gradient(120% 120% at 76% -10%, rgba(139, 179, 255, 0.44) 0%, rgba(139, 179, 255, 0) 62%)"
        dark: "radial-gradient(120% 120% at 76% -10%, rgba(56, 92, 152, 0.36) 0%, rgba(56, 92, 152, 0) 62%)"
      backgroundBlendMode: "screen"
    color:
      value:
        light: "linear-gradient(160deg, rgba(238, 243, 255, 1) 0%, rgba(246, 249, 255, 1) 52%, rgba(248, 250, 252, 1) 100%)"
        dark: "linear-gradient(160deg, rgba(11, 18, 34, 1) 0%, rgba(17, 26, 47, 1) 54%, rgba(22, 34, 59, 1) 100%)"
  actions:
    - theme: brand
      text: "图层 CSS 变量"
      link: /zh-CN/hero/matrix/layers/level5LayerStyleCssvars
    - theme: outline
      text: "背景 API"
      link: /zh-CN/hero/AllConfig
features:
  - title: "根级滤镜"
    details: "`opacity`、`brightness`、`contrast`、`saturation` 和 `filter` 在背景根级应用一次。"
  - title: "作用域令牌"
    details: "`hero.background.cssVars` 仅控制当前 hero 背景。"
---
```

## 展示的 API 键

| 键 | 全部配置 |
|---|---|
| `hero.background.mode` | [背景全部配置](../../../AllConfig) |
| `hero.background.opacity` | [背景全部配置](../../../AllConfig) |
| `hero.background.brightness` | [背景全部配置](../../../AllConfig) |
| `hero.background.contrast` | [背景全部配置](../../../AllConfig) |
| `hero.background.saturation` | [背景全部配置](../../../AllConfig) |
| `hero.background.filter` | [背景全部配置](../../../AllConfig) |
| `hero.background.cssVars` | [背景全部配置](../../../AllConfig) |
| `hero.background.style` | [背景全部配置](../../../AllConfig) |

