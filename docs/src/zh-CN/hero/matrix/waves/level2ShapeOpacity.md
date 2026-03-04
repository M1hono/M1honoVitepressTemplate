---
layout: home
hero:
  name: "波浪"
  text: "等级 2"
  tagline: "使用振幅和图层透明度调整平滑度，而非锐利边缘。"
  waves:
    enabled: true
    animated: true
    height: 100
    speed: 0.095
    layers:
      - amplitude: 30
        wavelength: 240
        opacity: 0.22
      - amplitude: 24
        wavelength: 200
        opacity: 0.5
      - amplitude: 18
        wavelength: 170
        opacity: 0.92
  actions:
    - theme: brand
      text: "等级 3"
      link: /zh-CN/hero/matrix/waves/level3MobileTuning
features:
  - title: "柔和边缘"
    details: "振幅、波长和透明度共同控制感知的锐利度。"
title: "波浪等级 2"
description: "波浪等级 2 的英雄矩阵配置展示与实践说明。"
priority: 20
---
# 波浪等级 2

主要关注点：hero 内容接缝处的平滑视觉连续性。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "波浪"
  text: "等级 2"
  tagline: "使用振幅和图层透明度调整平滑度，而非锐利边缘。"
  waves:
    enabled: true
    animated: true
    height: 100
    speed: 0.095
    layers:
      - amplitude: 30
        wavelength: 240
        opacity: 0.22
      - amplitude: 24
        wavelength: 200
        opacity: 0.5
      - amplitude: 18
        wavelength: 170
        opacity: 0.92
  actions:
    - theme: brand
      text: "等级 3"
      link: /zh-CN/hero/matrix/waves/level3MobileTuning
features:
  - title: "柔和边缘"
    details: "振幅、波长和透明度共同控制感知的锐利度。"
---
```
