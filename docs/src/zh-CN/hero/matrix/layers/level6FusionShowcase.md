---
layout: home
hero:
    name: "图层"
    text: "Level 6"
    tagline: "完整融合展示：图片+颜色+着色器+粒子，并叠加浮动元素与3D模型。"
    typography:
        type: grouped-float
        motion:
            intensity: 0.86
            title: { x: 10, y: -6, scale: 1.09 }
            text: { x: 12, y: -4, scale: 1.11 }
            tagline: { x: 10, y: 1, scale: 1.06 }
            image: { x: 15, y: -9, scale: 1.1 }
            transitionDuration: 700
            transitionDelayStep: 58
            transitionEasing: "cubic-bezier(0.16, 1, 0.3, 1)"
    background:
        opacity: 1
        brightness: 0.96
        contrast: 1.04
        saturation: 1.08
        layers:
            - type: image
              zIndex: 1
              image:
                  light: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80"
                  dark: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2000&q=80"
                  size: cover
                  position: center
            - type: color
              zIndex: 2
              opacity: 0.34
              color:
                  gradient:
                      enabled: true
                      type: linear
                      direction: 145deg
                      stops:
                          - color:
                                light: "rgba(17, 44, 96, 0.92)"
                                dark: "rgba(8, 19, 42, 0.96)"
                            position: "0%"
                          - color:
                                light: "rgba(35, 82, 168, 0.82)"
                                dark: "rgba(24, 58, 126, 0.86)"
                            position: "52%"
                          - color:
                                light: "rgba(87, 137, 224, 0.76)"
                                dark: "rgba(58, 94, 172, 0.8)"
                            position: "100%"
            - type: shader
              zIndex: 3
              opacity: 0.42
              blend: screen
              shader:
                  type: galaxy
                  speed: 0.62
                  uniforms:
                      uColor1:
                          type: color
                          value:
                              light: "rgba(20, 47, 112, 1)"
                              dark: "rgba(10, 24, 64, 1)"
                      uColor2:
                          type: color
                          value:
                              light: "rgba(81, 129, 235, 1)"
                              dark: "rgba(58, 98, 190, 1)"
                      uColor3:
                          type: color
                          value:
                              light: "rgba(228, 238, 255, 1)"
                              dark: "rgba(168, 198, 255, 1)"
            - type: particles
              zIndex: 4
              opacity: 0.88
              blend: screen
              particles:
                  type: custom
                  count: 360
                  spread: 4.4
                  appearance:
                      size: 0.11
                      type: star
                      colorMode: palette
                      randomColorChance: 0.72
                      palette:
                          - "rgba(80, 122, 236, 1)"
                          - "rgba(143, 114, 247, 1)"
                          - "rgba(245, 153, 180, 1)"
                      color:
                          light: "rgba(80, 122, 236, 1)"
                          dark: "rgba(196, 220, 255, 1)"
                      opacity:
                          light: 0.56
                          dark: 0.84
                  movement:
                      speed:
                          min: 0.08
                          max: 0.22
                      direction: [0.04, -0.46, 0.05]
                      gravity: -0.01
                      turbulence: 0.24
                      tiltVariance: 0.14
                  lifecycle:
                      respawn: true
                  area:
                      type: box
                      size: [9, 5, 9]
                      position: [0, 1, 0]
    image:
        type: model3d
        model3d:
            src: /models/duck.glb
            fitPadding: 1.28
            animation:
                enabled: true
                type: float
            interaction:
                enabled: true
                autoRotate: true
                autoRotateSpeed: 0.72
        frame:
            shape: rounded
            width: 440px
            height: 340px
            radius: 24px
            border: "1px solid rgba(148, 163, 184, 0.45)"
            background:
                light: "rgba(255, 255, 255, 0.8)"
                dark: "rgba(8, 16, 32, 0.66)"
            shadow:
                light: "0 20px 50px rgba(15, 23, 42, 0.22)"
                dark: "0 20px 50px rgba(2, 6, 18, 0.62)"
    floating:
        enabled: true
        opacity: 0.9
        density: 12
        blur: 1
        gradients:
            - "linear-gradient(120deg, rgba(20, 94, 186, 1) 0%, rgba(76, 138, 226, 1) 100%)"
            - "linear-gradient(120deg, rgba(19, 145, 129, 1) 0%, rgba(77, 196, 170, 1) 100%)"
            - "linear-gradient(120deg, rgba(171, 122, 36, 1) 0%, rgba(232, 182, 90, 1) 100%)"
        motion:
            enabled: true
            style: drift
            durationMin: 11
            durationMax: 24
            drift: 38
        items:
            - type: card
              title: "图层堆栈"
              description: "Image + Color + Shader + Particles"
              x: "9%"
              y: "20%"
            - type: badge
              text: "Model3D"
              icon: "🧩"
              x: "66%"
              y: "14%"
            - type: image
              src: /logo.png
              alt: Template Logo
              x: "84%"
              y: "62%"
              width: "96px"
            - type: stat
              value: "6"
              title: "渲染面"
              x: "60%"
              y: "56%"
            - type: code
              code: "hero.background.layers[3].type: particles"
              x: "24%"
              y: "74%"
            - type: shape
              shape: hexagon
              x: "88%"
              y: "36%"
              size: "68px"
            - type: text
              text: "Showcase Ready"
              x: "40%"
              y: "15%"
              colorType: random-gradient
    colors:
        title:
            light: "rgba(248, 251, 255, 1)"
            dark: "rgba(248, 251, 255, 1)"
        text:
            light: "rgba(233, 241, 255, 1)"
            dark: "rgba(233, 241, 255, 1)"
        tagline:
            light: "rgba(209, 224, 245, 1)"
            dark: "rgba(209, 224, 245, 1)"
        searchBackground:
            light: "rgba(255, 255, 255, 0.08)"
            dark: "rgba(8, 16, 32, 0.12)"
        searchBackgroundScrolled:
            light: "rgba(255, 255, 255, 0.08)"
            dark: "rgba(8, 16, 32, 0.12)"
        searchHoverBackground:
            light: "rgba(255, 255, 255, 0.14)"
            dark: "rgba(8, 16, 32, 0.2)"
        searchHoverBackgroundScrolled:
            light: "rgba(255, 255, 255, 0.14)"
            dark: "rgba(8, 16, 32, 0.2)"
        searchText:
            light: "rgba(246, 250, 255, 1)"
            dark: "rgba(232, 242, 255, 1)"
        searchTextScrolled:
            light: "rgba(246, 250, 255, 1)"
            dark: "rgba(232, 242, 255, 1)"
        searchTextMuted:
            light: "rgba(221, 235, 255, 0.9)"
            dark: "rgba(190, 214, 248, 0.86)"
        searchTextMutedScrolled:
            light: "rgba(221, 235, 255, 0.9)"
            dark: "rgba(190, 214, 248, 0.86)"
        searchBorder:
            light: "rgba(216, 230, 255, 0.34)"
            dark: "rgba(150, 184, 238, 0.42)"
        searchBorderScrolled:
            light: "rgba(216, 230, 255, 0.34)"
            dark: "rgba(150, 184, 238, 0.42)"
        searchKeyBackground:
            light: "rgba(255, 255, 255, 0.12)"
            dark: "rgba(14, 31, 64, 0.34)"
        searchKeyBackgroundScrolled:
            light: "rgba(255, 255, 255, 0.12)"
            dark: "rgba(14, 31, 64, 0.34)"
        searchKeyText:
            light: "rgba(241, 248, 255, 0.92)"
            dark: "rgba(208, 226, 255, 0.9)"
        searchKeyTextScrolled:
            light: "rgba(241, 248, 255, 0.92)"
            dark: "rgba(208, 226, 255, 0.9)"
    actions:
        - theme: brand
          text: "Hero 全配置"
          link: /zh-CN/hero/AllConfig
        - theme: alt
          text: "图层目录"
          link: /zh-CN/hero/matrix/layers
features:
    - title: "完整图层栈"
      details: "在同一页组合 image、color、shader、particles 四类背景层。"
    - title: "Model3D 前景"
      details: "Hero 媒体区域使用带边框和阴影的 3D 模型。"
    - title: "浮动覆盖层"
      details: "卡片、徽章、代码、统计等元素在顶层漂浮。"
    - title: "rgba 粒子颜色"
      details: "粒子调色板与基础颜色全部使用 rgba，便于直接调参。"
title: "图层 Level 6：全元素融合展示"
description: "将 Hero 核心能力组合到一个页面的完整展示。"
priority: 60
---

# 图层 Level 6：全元素融合展示

主要关注点：用一个页面同时展示 Hero 的多类渲染能力。

## 包含的渲染面

| 渲染面       | 配置路径                                   |
| ------------ | ------------------------------------------ |
| 图片背景层   | `hero.background.layers[].type: image`     |
| 颜色叠加层   | `hero.background.layers[].type: color`     |
| 着色器动画层 | `hero.background.layers[].type: shader`    |
| 粒子层       | `hero.background.layers[].type: particles` |
| 模型主视觉   | `hero.image.type: model3d`                 |
| 浮动元素层   | `hero.floating.*`                          |

## 演示的 API 键

| 键                                      | All Config                          |
| --------------------------------------- | ----------------------------------- |
| `hero.background.layers[]`              | [Layers Root](../../../AllConfig)   |
| `layers[].zIndex/opacity/blend`         | [Layers Root](../../../AllConfig)   |
| `layers[].image/color/shader/particles` | [Layers Root](../../../AllConfig)   |
| `hero.image.model3d`                    | [Image Root](../../../AllConfig)    |
| `hero.floating.*`                       | [Floating Root](../../../AllConfig) |

## 说明

- 本页是高密度组合页，用于验证跨模块协同。
- 粒子颜色全部采用 `rgba(...)` 字符串，便于快速修改。
- `movement.tiltVariance` 已启用，用于提升小粒子方向变化。
