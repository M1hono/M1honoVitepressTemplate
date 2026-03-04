---
layout: home
hero:
  name: "图层"
  text: "等级 2"
  tagline: "添加视频图层和显式混合控制。"
  background:
    layers:
      - type: video
        zIndex: 1
        video:
          src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          muted: true
          autoplay: true
          loop: true
          fit: cover
      - type: color
        zIndex: 2
        opacity: 0.34
        blend: multiply
        color:
          solid:
            color:
              light: "rgba(218, 231, 255, 1)"
              dark: "rgba(10, 22, 48, 1)"
      - type: color
        zIndex: 3
        opacity: 0.22
        blend: screen
        color:
          solid:
            color:
              light: "rgba(248, 251, 255, 1)"
              dark: "rgba(31, 49, 95, 1)"
  actions:
    - theme: brand
      text: "等级 3"
      link: /zh-CN/hero/matrix/layers/level3ShaderParticles
features:
  - title: "混合模式"
    details: "图层级别的混合控制让你可以安全地调节媒体强度。"
title: "图层等级 2"
description: "图层等级 2 的英雄矩阵配置展示与实践说明。"
priority: 20
---
# 图层等级 2

主要关注点：视频 + 混合组合。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "图层"
  text: "等级 2"
  tagline: "添加视频图层和显式混合控制。"
  background:
    layers:
      - type: video
        zIndex: 1
        video:
          src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          muted: true
          autoplay: true
          loop: true
          fit: cover
      - type: color
        zIndex: 2
        opacity: 0.34
        blend: multiply
        color:
          solid:
            color:
              light: "rgba(218, 231, 255, 1)"
              dark: "rgba(10, 22, 48, 1)"
      - type: color
        zIndex: 3
        opacity: 0.22
        blend: screen
        color:
          solid:
            color:
              light: "rgba(248, 251, 255, 1)"
              dark: "rgba(31, 49, 95, 1)"
  actions:
    - theme: brand
      text: "等级 3"
      link: /zh-CN/hero/matrix/layers/level3ShaderParticles
features:
  - title: "混合模式"
    details: "图层级别的混合控制让你可以安全地调节媒体强度。"
---
```
