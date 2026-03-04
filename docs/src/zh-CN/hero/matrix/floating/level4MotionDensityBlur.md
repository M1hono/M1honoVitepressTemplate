---
layout: home
hero:
  name: "浮动元素"
  text: "第 4 级"
  tagline: "全局运动、密度、模糊和渐变调色板配置。"
  floating:
    enabled: true
    opacity: 0.92
    density: 14
    blur: 2
    gradients:
      - "linear-gradient(120deg, rgba(15, 76, 154, 1) 0%, rgba(47, 111, 192, 1) 52%, rgba(106, 163, 232, 1) 100%)"
      - "linear-gradient(120deg, rgba(13, 123, 102, 1) 0%, rgba(21, 148, 129, 1) 54%, rgba(67, 188, 160, 1) 100%)"
      - "linear-gradient(120deg, rgba(138, 95, 26, 1) 0%, rgba(185, 131, 35, 1) 56%, rgba(226, 173, 75, 1) 100%)"
    motion:
      enabled: true
      style: drift
      durationMin: 10
      durationMax: 24
      drift: 42
    items:
      - type: text
        text: "自适应对比度"
        x: "18%"
        y: "18%"
        motionStyle: drift
        driftX: 28
        driftY: 14
        duration: 14
      - type: card
        title: "控制面板"
        description: "全局运动默认值 + 每项覆盖"
        x: "70%"
        y: "24%"
        delay: 1.6
      - type: code
        code: "floating.motion.durationMin: 10"
        x: "32%"
        y: "76%"
      - type: shape
        shape: circle
        x: "84%"
        y: "62%"
        size: "72px"
  actions:
    - theme: brand
      text: "波浪第 4 级"
      link: /zh-CN/hero/matrix/waves/level4OutlineColor
    - theme: outline
      text: "浮动元素 API"
      link: /zh-CN/hero/AllConfig
title: "浮动元素第 4 级：运动、密度、模糊"
description: "浮动元素第 4 级：运动、密度、模糊的展示和配置说明。"
priority: 40
---
# 浮动元素第 4 级：运动、密度、模糊

重点：完整的浮动元素全局控制字段，以及每项运动覆盖。

## 实际使用的 Frontmatter

```yaml
---
layout: home
hero:
  name: "浮动元素"
  text: "第 4 级"
  tagline: "全局运动、密度、模糊和渐变调色板配置。"
  floating:
    enabled: true
    opacity: 0.92
    density: 14
    blur: 2
    gradients:
      - "linear-gradient(120deg, rgba(15, 76, 154, 1) 0%, rgba(47, 111, 192, 1) 52%, rgba(106, 163, 232, 1) 100%)"
      - "linear-gradient(120deg, rgba(13, 123, 102, 1) 0%, rgba(21, 148, 129, 1) 54%, rgba(67, 188, 160, 1) 100%)"
      - "linear-gradient(120deg, rgba(138, 95, 26, 1) 0%, rgba(185, 131, 35, 1) 56%, rgba(226, 173, 75, 1) 100%)"
    motion:
      enabled: true
      style: drift
      durationMin: 10
      durationMax: 24
      drift: 42
    items:
      - type: text
        text: "自适应对比度"
        x: "18%"
        y: "18%"
        motionStyle: drift
        driftX: 28
        driftY: 14
        duration: 14
      - type: card
        title: "控制面板"
        description: "全局运动默认值 + 每项覆盖"
        x: "70%"
        y: "24%"
        delay: 1.6
      - type: code
        code: "floating.motion.durationMin: 10"
        x: "32%"
        y: "76%"
      - type: shape
        shape: circle
        x: "84%"
        y: "62%"
        size: "72px"
  actions:
    - theme: brand
      text: "波浪第 4 级"
      link: /zh-CN/hero/matrix/waves/level4OutlineColor
    - theme: outline
      text: "浮动元素 API"
      link: /zh-CN/hero/AllConfig
---
```

## 展示的 API 键

| 键 | 全部配置 |
|---|---|
| `hero.floating.opacity` | [浮动元素全部配置](../../../AllConfig) |
| `hero.floating.density` | [浮动元素全部配置](../../../AllConfig) |
| `hero.floating.blur` | [浮动元素全部配置](../../../AllConfig) |
| `hero.floating.gradients` | [浮动元素全部配置](../../../AllConfig) |
| `hero.floating.motion.*` | [浮动元素全部配置](../../../AllConfig) |
| `hero.floating.items[].motionStyle` | [浮动元素全部配置](../../../AllConfig) |
| `hero.floating.items[].driftX/driftY` | [浮动元素全部配置](../../../AllConfig) |
| `hero.floating.items[].duration/delay` | [浮动元素全部配置](../../../AllConfig) |
