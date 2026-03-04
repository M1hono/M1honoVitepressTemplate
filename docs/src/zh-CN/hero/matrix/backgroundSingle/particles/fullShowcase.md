---
layout: home
hero:
  name: "粒子"
  text: "完整高级展示"
  tagline: "一次覆盖复杂粒子配置：自定义纹理、区域颜色映射、随机调色板和运动调优。"
  background:
    type: particles
    particles:
      enabled: true
      type: custom
      count: 520
      spread: 5.2
      appearance:
        type: custom
        texture:
          light: "/icon/mainindex/dashicons--format-chat.png"
          dark: "/icon/mainindex/dashicons--format-chat-dark-v2.png"
        textureColorMode: mask
        color:
          light: "rgba(82, 120, 230, 1)"
          dark: "rgba(198, 220, 255, 1)"
        opacity:
          light: 0.62
          dark: 0.9
        size: 0.11
        colorMode: area
        areaColor:
          axis: radius
          colors:
            - "rgba(66, 102, 228, 1)"
            - "rgba(132, 108, 238, 1)"
            - "rgba(246, 146, 156, 1)"
      movement:
        speed:
          min: 0.07
          max: 0.22
        direction: [0.07, -0.42, 0.05]
        gravity: -0.015
        turbulence: 0.28
        tiltVariance: 0.14
      lifecycle:
        respawn: true
      area:
        type: sphere
        size: [11, 11, 11]
        position: [0, 0.3, 0]
  colors:
    title:
      light: "rgba(18, 30, 58, 0.96)"
      dark: "rgba(255, 255, 255, 1)"
    text:
      light: "rgba(18, 30, 58, 0.96)"
      dark: "rgba(255, 255, 255, 1)"
    tagline:
      light: "rgba(56, 74, 112, 0.92)"
      dark: "rgba(210, 218, 235, 0.92)"
  actions:
    - theme: brand
      text: "契约"
      link: /zh-CN/hero/matrix/backgroundSingle/particles/particlesConfig
    - theme: alt
      text: "自定义纹理"
      link: /zh-CN/hero/matrix/backgroundSingle/particles/customTextures
features:
  - title: "纹理精灵"
    details: "appearance.type=custom + 主题纹理源。"
  - title: "区域渐变"
    details: "colorMode=area + radius 轴映射，调色板统一 rgba。"
  - title: "运动+物理"
    details: "速度区间、方向、重力、湍流、tiltVariance 协同调参。"
  - title: "高密度"
    details: "高 count + spread + sphere 区域实现满屏效果。"
title: "粒子完整展示"
description: "复杂粒子配置的完整展示页。"
priority: 18
---
# 粒子完整展示

主要关注点：在一个页面里展示纹理、颜色策略、运动、生命周期、区域五大配置面。

## 展示面清单

| 配置面 | 关键字段 |
| --- | --- |
| 行为预设 | `particles.type`、`count`、`spread` |
| 外观 | `appearance.type`、`appearance.texture`、`appearance.textureColorMode`、`appearance.size`、`appearance.opacity` |
| 颜色策略 | `appearance.colorMode`、`appearance.areaColor.*`、`appearance.palette`、`appearance.randomColorChance` |
| 运动 | `movement.speed`、`movement.direction`、`movement.gravity`、`movement.turbulence`、`movement.tiltVariance` |
| 空间区域 | `area.type`、`area.size`、`area.position` |
| 生命周期 | `lifecycle.respawn` |

## 变体片段

### 部分随机调色板

```yaml
particles:
  appearance:
    colorMode: palette
    randomColorChance: 0.42
    palette:
      - "rgba(79, 115, 232, 1)"
      - "rgba(138, 105, 239, 1)"
      - "rgba(239, 134, 168, 1)"
```

### 按垂直轴区域映射

```yaml
particles:
  appearance:
    colorMode: area
    areaColor:
      axis: y
      colors:
        - "rgba(95, 125, 230, 1)"
        - "rgba(140, 117, 239, 1)"
        - "rgba(241, 168, 122, 1)"
```

### 无纹理点状外观

```yaml
particles:
  appearance:
    type: dot
    texture: ""
    color: "rgba(99, 152, 255, 1)"
```
