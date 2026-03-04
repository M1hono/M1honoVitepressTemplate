---
layout: home
hero:
  name: "图层"
  text: "等级 4"
  tagline: "完整主题同步组合，包含作用域 CSS 变量和运行时滤镜。"
  background:
    opacity: 1
    brightness: 1
    contrast: 1
    saturation: 1.02
    cssVars:
      layer-overlay-color:
        light: "rgba(255, 255, 255, 0.16)"
        dark: "rgba(15, 30, 56, 0.34)"
    layers:
      - type: image
        zIndex: 1
        image:
          light: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1800&q=80"
          dark: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
          size: cover
      - type: shader
        zIndex: 2
        opacity: 0.42
        shader:
          type: water
          uniforms:
            u_intensity:
              light: 0.6
              dark: 0.4
      - type: particles
        zIndex: 3
        particles:
          type: sparks
          count: 110
          appearance:
            opacity:
              light: 0.32
              dark: 0.72
      - type: color
        zIndex: 4
        opacity: 0.2
        style:
          background: "var(--layer-overlay-color)"
  waves:
    enabled: true
    animated: true
    speed: 0.08
    height: 90
  actions:
    - theme: brand
      text: "波浪效果"
      link: /zh-CN/hero/matrix/waves/index
features:
  - title: "作用域变量"
    details: "hero.background.cssVars 仅影响此 hero 背景。"
  - title: "主题同步"
    details: "图片/着色器/粒子值都可以感知明暗主题。"
title: "图层等级 4"
description: "图层等级 4 的英雄矩阵配置展示与实践说明。"
priority: 40
---
# 图层等级 4

主要关注点：全栈分层组合。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "图层"
  text: "等级 4"
  tagline: "完整主题同步组合，包含作用域 CSS 变量和运行时滤镜。"
  background:
    opacity: 1
    brightness: 1
    contrast: 1
    saturation: 1.02
    cssVars:
      layer-overlay-color:
        light: "rgba(255, 255, 255, 0.16)"
        dark: "rgba(15, 30, 56, 0.34)"
    layers:
      - type: image
        zIndex: 1
        image:
          light: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1800&q=80"
          dark: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
          size: cover
      - type: shader
        zIndex: 2
        opacity: 0.42
        shader:
          type: water
          uniforms:
            u_intensity:
              light: 0.6
              dark: 0.4
      - type: particles
        zIndex: 3
        particles:
          type: sparks
          count: 110
          appearance:
            opacity:
              light: 0.32
              dark: 0.72
      - type: color
        zIndex: 4
        opacity: 0.2
        style:
          background: "var(--layer-overlay-color)"
  waves:
    enabled: true
    animated: true
    speed: 0.08
    height: 90
  actions:
    - theme: brand
      text: "波浪效果"
      link: /zh-CN/hero/matrix/waves/index
features:
  - title: "作用域变量"
    details: "hero.background.cssVars 仅影响此 hero 背景。"
  - title: "主题同步"
    details: "图片/着色器/粒子值都可以感知明暗主题。"
---
```
