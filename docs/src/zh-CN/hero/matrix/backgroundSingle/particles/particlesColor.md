---
layout: home
hero:
    name: "粒子背景"
    text: "颜色与透明度"
    tagline: "粒子颜色配置以 rgba 为主的参考文档。"
    background:
        type: particles
        particles:
            type: custom
            count: 280
            appearance:
                size: 0.11
                type: circle
                colorMode: palette
                randomColorChance: 0.82
                palette:
                    - "rgba(72, 113, 228, 1)"
                    - "rgba(132, 102, 238, 1)"
                    - "rgba(242, 122, 168, 1)"
                areaColor:
                    axis: y
                    colors:
                        - "rgba(72, 113, 228, 1)"
                        - "rgba(136, 120, 236, 1)"
                        - "rgba(248, 155, 128, 1)"
                color:
                    light: "rgba(72, 113, 228, 1)"
                    dark: "rgba(192, 214, 255, 1)"
                opacity:
                    light: 0.58
                    dark: 0.86
            movement:
                speed:
                    min: 0.06
                    max: 0.14
                turbulence: 0.18
                tiltVariance: 0.12
    colors:
        title:
            light: "rgba(20, 30, 52, 0.96)"
            dark: "rgba(255, 255, 255, 1)"
        text:
            light: "rgba(20, 30, 52, 0.96)"
            dark: "rgba(255, 255, 255, 1)"
        tagline:
            light: "rgba(52, 72, 108, 0.92)"
            dark: "rgba(210, 218, 235, 0.92)"
    actions:
        - theme: brand
          text: "粒子契约"
          link: /zh-CN/hero/matrix/backgroundSingle/particles/particlesConfig
features:
    - title: "rgba 约定"
      details: "所有粒子颜色相关字段都建议使用 rgba(...) 字符串。"
    - title: "部分随机"
      details: "使用 colorMode=random/palette + randomColorChance 控制“部分粒子随机色”。"
    - title: "区域映射"
      details: "使用 colorMode=area + areaColor，并统一 rgba 格式。"
title: "粒子颜色与透明度"
description: "hero.background.particles 的 rgba 优先颜色和透明度规范。"
priority: 16
---

# 粒子颜色与透明度

主要关注点：`particles.color`、`particles.appearance.color`、`appearance.palette`、`appearance.areaColor.colors` 统一使用 `rgba(...)`。

## 展示页面

- [粒子自定义纹理](./customTextures)
- [粒子完整展示](./fullShowcase)

## 值解析顺序

运行时按以下顺序读取颜色：

1. `particles.appearance.color`（推荐）
2. `particles.color`（兼容别名）

透明度同理：

1. `particles.appearance.opacity`（推荐）
2. `particles.opacity`（兼容别名）

## 支持的颜色格式（项目约定）

| 格式 | 示例 | 说明 |
| --- | --- | --- |
| `rgba` 字符串 | `"rgba(99, 102, 241, 1)"` | 所有粒子颜色字段的推荐写法。 |
| `ThemeValue<RgbaColor>` | `{ light: "rgba(...)" , dark: "rgba(...)" }` | 主题切换场景下的亮暗配色映射。 |

`RgbaColor` = `rgba(r, g, b, a)` 字符串。

## 颜色分布模式（`appearance.colorMode`）

| 模式 | 行为 |
| --- | --- |
| `solid` | 全部粒子使用基础颜色（`appearance.color` 或 `particles.color`）。 |
| `random` | 每次重生时围绕基础颜色做随机偏移。 |
| `palette` | 每次重生时从 `appearance.palette` 随机取色。 |
| `area` | 按位置从 `appearance.areaColor.colors` 采样颜色。 |

### 只让“部分粒子”随机着色

`appearance.randomColorChance` 取值 `0..1`，用于 `random/palette`：

```yaml
particles:
    appearance:
        colorMode: palette
        randomColorChance: 0.35
        palette:
            - "rgba(91, 123, 232, 1)"
            - "rgba(143, 116, 248, 1)"
            - "rgba(241, 124, 179, 1)"
```

### 区域颜色映射

```yaml
particles:
    appearance:
        colorMode: area
        areaColor:
            axis: x # x | y | z | radius
            colors:
                - "rgba(79, 115, 232, 1)"
                - "rgba(138, 105, 239, 1)"
                - "rgba(239, 134, 168, 1)"
```

## 可直接复制的示例

### 1) 单色 rgba

```yaml
particles:
    appearance:
        color: "rgba(99, 102, 241, 1)"
        opacity: 0.64
```

### 2) 主题同步 rgba + 透明度

```yaml
particles:
    appearance:
        color:
            light: "rgba(72, 113, 228, 1)"
            dark: "rgba(192, 214, 255, 1)"
            value: "rgba(116, 148, 236, 1)"
        opacity:
            light: 0.58
            dark: 0.86
            value: 0.72
```

### 3) 别名写法（可用但不优先）

```yaml
particles:
    color:
        light: "rgba(91, 123, 232, 1)"
        dark: "rgba(208, 225, 255, 1)"
    opacity:
        light: 0.5
        dark: 0.82
```

## 无效键（运行时无效果）

| 无效键 | 原因 |
| --- | --- |
| `particles.colorType` | 运行时不读取。 |
| `particles.colors` | 运行时不读取。 |
| `particles.theme` | 不是粒子配置契约。 |
| `particles.appearance.frameType` | 不属于粒子外观契约。 |
