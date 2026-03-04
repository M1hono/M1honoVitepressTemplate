---
layout: home
hero:
  name: "波浪"
  text: "第 4 级"
  tagline: "颜色、轮廓、速度、反转和自定义图层集于一身。"
  waves:
    enabled: true
    animated: true
    height: 112
    opacity: 0.96
    speed: 1.08
    color: "rgba(223, 231, 245, 1)"
    reversed: false
    outline: true
    zIndex: 2
    layers:
      - amplitude: 12
        frequency: 0.011
        speed: 0.72
        direction: -1
        opacity: 0.26
        color: "rgba(232, 238, 249, 1)"
      - amplitude: 18
        frequency: 0.0072
        speed: 0.88
        direction: 1
        opacity: 0.54
        color: "rgba(225, 234, 248, 1)"
      - amplitude: 24
        frequency: 0.0052
        speed: 1.12
        direction: 1
        opacity: 0.98
        color: "rgba(218, 229, 247, 1)"
  actions:
    - theme: brand
      text: "按钮和功能"
      link: /zh-CN/hero/matrix/buttonsFeatures/featuresFullConfig
    - theme: outline
      text: "波浪 API"
      link: /zh-CN/hero/AllConfig
title: "波浪第 4 级：轮廓和颜色图层"
description: "波浪第 4 级：轮廓和颜色图层的展示和配置说明。"
priority: 40
---
# 波浪第 4 级：轮廓和颜色图层

重点：完整的波浪视觉 API，同时保留 hero 内容边界语义。

## 实际使用的 Frontmatter

```yaml
---
layout: home
hero:
  name: "波浪"
  text: "第 4 级"
  tagline: "颜色、轮廓、速度、反转和自定义图层集于一身。"
  waves:
    enabled: true
    animated: true
    height: 112
    opacity: 0.96
    speed: 1.08
    color: "rgba(223, 231, 245, 1)"
    reversed: false
    outline: true
    zIndex: 2
    layers:
      - amplitude: 12
        frequency: 0.011
        speed: 0.72
        direction: -1
        opacity: 0.26
        color: "rgba(232, 238, 249, 1)"
      - amplitude: 18
        frequency: 0.0072
        speed: 0.88
        direction: 1
        opacity: 0.54
        color: "rgba(225, 234, 248, 1)"
      - amplitude: 24
        frequency: 0.0052
        speed: 1.12
        direction: 1
        opacity: 0.98
        color: "rgba(218, 229, 247, 1)"
  actions:
    - theme: brand
      text: "按钮和功能"
      link: /zh-CN/hero/matrix/buttonsFeatures/featuresFullConfig
    - theme: outline
      text: "波浪 API"
      link: /zh-CN/hero/AllConfig
---
```

## 展示的 API 键

| 键 | 全部配置 |
|---|---|
| `hero.waves.height` | [波浪全部配置](../../../AllConfig) |
| `hero.waves.opacity` | [波浪全部配置](../../../AllConfig) |
| `hero.waves.speed` | [波浪全部配置](../../../AllConfig) |
| `hero.waves.color` | [波浪全部配置](../../../AllConfig) |
| `hero.waves.reversed` | [波浪全部配置](../../../AllConfig) |
| `hero.waves.outline` | [波浪全部配置](../../../AllConfig) |
| `hero.waves.layers[]` | [波浪图层全部配置](../../../AllConfig) |

