---
layout: home
hero:
  name: "图层"
  text: "等级 3"
  tagline: "添加着色器和粒子，同时保持前景对比与文档层次结构。"
  background:
    layers:
      - type: color
        zIndex: 1
        color:
          gradient:
            enabled: true
            type: linear
            direction: 140deg
            stops:
              - color:
                  light: "rgba(245, 249, 255, 1)"
                  dark: "rgba(10, 20, 42, 1)"
                position: "0%"
              - color:
                  light: "rgba(232, 241, 255, 1)"
                  dark: "rgba(18, 37, 66, 1)"
                position: "100%"
      - type: shader
        zIndex: 2
        opacity: 0.58
        shader:
          type: ripple
      - type: particles
        zIndex: 3
        opacity: 0.75
        particles:
          type: snow
          count: 130
          movement:
            turbulence: 0.28
  actions:
    - theme: brand
      text: "等级 4"
      link: /zh-CN/hero/matrix/layers/level4FullThemeSync
features:
  - title: "效果作为图层"
    details: "着色器和粒子仍然是可选的增强图层。"
title: "图层等级 3"
description: "图层等级 3 的英雄矩阵配置展示与实践说明。"
priority: 30
---
# 图层等级 3

主要关注点：着色器 + 粒子在分层模式下。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "图层"
  text: "等级 3"
  tagline: "添加着色器和粒子，同时保持前景对比与文档层次结构。"
  background:
    layers:
      - type: color
        zIndex: 1
        color:
          gradient:
            enabled: true
            type: linear
            direction: 140deg
            stops:
              - color:
                  light: "rgba(245, 249, 255, 1)"
                  dark: "rgba(10, 20, 42, 1)"
                position: "0%"
              - color:
                  light: "rgba(232, 241, 255, 1)"
                  dark: "rgba(18, 37, 66, 1)"
                position: "100%"
      - type: shader
        zIndex: 2
        opacity: 0.58
        shader:
          type: ripple
      - type: particles
        zIndex: 3
        opacity: 0.75
        particles:
          type: snow
          count: 130
          movement:
            turbulence: 0.28
  actions:
    - theme: brand
      text: "等级 4"
      link: /zh-CN/hero/matrix/layers/level4FullThemeSync
features:
  - title: "效果作为图层"
    details: "着色器和粒子仍然是可选的增强图层。"
---
```
