---
layout: home
hero:
  name: "功能特性"
  text: "完整配置"
  tagline: "Hero 操作按钮 + 特性滚动配置，包含卡片尺寸和交互调优。"
  actions:
    - theme: brand
      text: "配置覆盖图"
      link: /zh-CN/hero/matrix/configCoverage
    - theme: outline
      text: "返回矩阵"
      link: /zh-CN/hero/matrix/index
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
    title: "配置完整"
    details: "展示页面将运行时键映射到具体的视觉效果。"
    theme: brand
    link: /zh-CN/hero/matrix/configCoverage
    linkText: "查看覆盖图"
  - icon: mdi:card-text-outline
    title: "配置关联"
    details: "每个演示页面都直接链接到 AllConfig 中心。"
    theme: info
    link: /zh-CN/hero/AllConfig
    linkText: "打开全部配置"
  - icon: mdi:gesture-tap-button
    title: "交互调优"
    details: "自动滚动和拖动乘数通过 `featuresConfig` 控制。"
    theme: tip
  - icon: mdi:cellphone-cog
    title: "响应式布局"
    details: "间距和卡片宽度值分为移动端、平板和桌面端。"
    theme: warning
title: "功能特性完整配置"
description: "功能特性完整配置的展示和配置说明。"
priority: 30
---
# 功能特性完整配置

重点：完整的特性区块控制，包含滚动和卡片尺寸。

## 实际使用的 Frontmatter

```yaml
---
layout: home
hero:
  name: "功能特性"
  text: "完整配置"
  tagline: "Hero 操作按钮 + 特性滚动配置，包含卡片尺寸和交互调优。"
  actions:
    - theme: brand
      text: "配置覆盖图"
      link: /zh-CN/hero/matrix/configCoverage
    - theme: outline
      text: "返回矩阵"
      link: /zh-CN/hero/matrix/index
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
    title: "配置完整"
    details: "展示页面将运行时键映射到具体的视觉效果。"
    theme: brand
    link: /zh-CN/hero/matrix/configCoverage
    linkText: "查看覆盖图"
  - icon: mdi:card-text-outline
    title: "配置关联"
    details: "每个演示页面都直接链接到 AllConfig 中心。"
    theme: info
    link: /zh-CN/hero/AllConfig
    linkText: "打开全部配置"
  - icon: mdi:gesture-tap-button
    title: "交互调优"
    details: "自动滚动和拖动乘数通过 `featuresConfig` 控制。"
    theme: tip
  - icon: mdi:cellphone-cog
    title: "响应式布局"
    details: "间距和卡片宽度值分为移动端、平板和桌面端。"
    theme: warning
---
```

## 展示的 API 键

| 键 | 全部配置 |
|---|---|
| `hero.actions[]` | [Hero 根配置全部配置](../../../AllConfig) |
| `features[]` | [全部配置](../../../AllConfig) |
| `featuresConfig.scroll.speed` | [全部配置](../../../AllConfig) |
| `featuresConfig.scroll.dragMultiplier` | [全部配置](../../../AllConfig) |
| `featuresConfig.scroll.pauseOnHover` | [全部配置](../../../AllConfig) |
| `featuresConfig.scroll.minItems` | [全部配置](../../../AllConfig) |
| `featuresConfig.scroll.edgeFade` | [全部配置](../../../AllConfig) |
| `featuresConfig.cards.width*` | [全部配置](../../../AllConfig) |

