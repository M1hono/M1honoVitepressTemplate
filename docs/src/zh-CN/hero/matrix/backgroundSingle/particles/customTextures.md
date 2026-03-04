---
layout: home
hero:
    name: "粒子"
    text: "自定义纹理精灵"
    tagline: "使用自定义粒子纹理，并基于 rgba 明确控制颜色。"
    background:
        type: particles
        particles:
            enabled: true
            type: custom
            count: 260
            spread: 4.1
            appearance:
                type: custom
                texture:
                    light: "/icon/mainindex/material-symbols--markdown-copy-sharp.png"
                    dark: "/icon/mainindex/material-symbols--markdown-copy-sharp-dark-v2.png"
                textureColorMode: mask
                colorMode: palette
                randomColorChance: 0.6
                palette:
                    - "rgba(70, 109, 232, 1)"
                    - "rgba(132, 98, 235, 1)"
                    - "rgba(245, 136, 166, 1)"
                size: 1
                opacity:
                    light: 1
                    dark: 1
            movement:
                speed:
                    min: 0.08
                    max: 0.2
                direction: [0.04, -0.55, 0.03]
                turbulence: 0.2
                tiltVariance: 0.12
            area:
                type: box
                size: [9, 5, 9]
                position: [0, 1, 0]
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
          text: "完整展示"
          link: /zh-CN/hero/matrix/backgroundSingle/particles/fullShowcase
features:
    - title: "appearance.type"
      details: "将粒子行为类型与粒子外观类型分离。"
    - title: "纹理颜色模式"
      details: "使用 textureColorMode=mask，让颜色完全由 rgba 配置控制。"
    - title: "调色板随机"
      details: "colorMode=palette + randomColorChance 控制颜色离散度。"
title: "粒子自定义纹理"
description: "粒子自定义纹理与外观契约完整示例。"
priority: 17
---

# 粒子自定义纹理

主要关注点：基于纹理的粒子精灵与类型域区分。

## 类型域区分

| 键                          | 含义                                                      |
| --------------------------- | --------------------------------------------------------- |
| `particles.type`            | 粒子行为预设（`stars/snow/rain/bubbles/sparks/custom`）。 |
| `particles.appearance.type` | 粒子精灵外观类型（`dot/circle/square/star/custom`）。     |

`particles.type` 不是帧或贴图类型字段。粒子外观应使用 `appearance.type`。

## 本页实际 Frontmatter

```yaml
---
layout: home
hero:
    background:
        type: particles
        particles:
            enabled: true
            type: custom
            count: 260
            spread: 4.1
            appearance:
                type: custom
                texture:
                    light: "/icon/mainindex/material-symbols--markdown-copy-sharp.png"
                    dark: "/icon/mainindex/material-symbols--markdown-copy-sharp-dark-v2.png"
                textureColorMode: mask
                colorMode: palette
                randomColorChance: 0.6
                palette:
                    - "rgba(70, 109, 232, 1)"
                    - "rgba(132, 98, 235, 1)"
                    - "rgba(245, 136, 166, 1)"
                size: 0.12
                opacity:
                    light: 0.66
                    dark: 0.9
            movement:
                speed:
                    min: 0.08
                    max: 0.2
                direction: [0.04, -0.55, 0.03]
                turbulence: 0.2
                tiltVariance: 0.12
            area:
                type: box
                size: [9, 5, 9]
                position: [0, 1, 0]
---
```

## 纹理契约

| 键                            | 类型                                        | 说明                                            |
| ----------------------------- | ------------------------------------------- | ----------------------------------------------- |
| `appearance.type`             | `dot \| circle \| square \| star \| custom` | `custom` 通常配合纹理贴图。                     |
| `appearance.texture`          | `string \| ThemeValue<string>`              | 纹理资源路径或 URL。                            |
| `appearance.textureColorMode` | `'mask' \| 'image'`                         | `mask` 使用 rgba 着色；`image` 保留原纹理颜色。 |
| `appearance.shape`            | 同上                                        | `appearance.type` 的兼容别名。                  |

## 纹理 + 高级控制模板

```yaml
hero:
    background:
        type: particles
        particles:
            type: custom
            count: 320
            spread: 4.6
            appearance:
                type: custom
                texture:
                    light: "/icon/mainindex/material-symbols--markdown-copy-sharp.png"
                    dark: "/icon/mainindex/material-symbols--markdown-copy-sharp-dark-v2.png"
                textureColorMode: mask
                colorMode: area
                areaColor:
                    axis: x
                    colors:
                        - "rgba(79, 115, 232, 1)"
                        - "rgba(138, 105, 239, 1)"
                        - "rgba(239, 134, 168, 1)"
                size: 0.11
                opacity:
                    light: 0.62
                    dark: 0.86
            movement:
                speed:
                    min: 0.06
                    max: 0.16
                direction: [0.03, -0.4, 0.03]
                gravity: -0.01
                turbulence: 0.22
                tiltVariance: 0.12
            lifecycle:
                respawn: true
            area:
                type: box
                size: [10, 5, 10]
                position: [0, 1, 0]
```
