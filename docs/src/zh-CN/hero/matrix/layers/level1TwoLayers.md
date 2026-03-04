---
layout: home
hero:
  name: "图层"
  text: "等级 1"
  tagline: "从两个图层开始：图片底层 + 颜色叠加。"
  background:
    layers:
      - type: image
        zIndex: 1
        image:
          src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80"
          size: cover
          position: center
      - type: color
        zIndex: 2
        opacity: 0.46
        color:
          solid:
            color:
              light: "rgba(236, 243, 255, 1)"
              dark: "rgba(11, 23, 48, 1)"
  actions:
    - theme: brand
      text: "等级 2"
      link: /zh-CN/hero/matrix/layers/level2ThreeLayers
features:
  - title: "堆叠顺序"
    details: "zIndex 控制视觉组合顺序。"
title: "图层等级 1"
description: "图层等级 1 的英雄矩阵配置展示与实践说明。"
priority: 10
---
# 图层等级 1

主要关注点：基础 `background.layers` 组合。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "图层"
  text: "等级 1"
  tagline: "从两个图层开始：图片底层 + 颜色叠加。"
  background:
    layers:
      - type: image
        zIndex: 1
        image:
          src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80"
          size: cover
          position: center
      - type: color
        zIndex: 2
        opacity: 0.46
        color:
          solid:
            color:
              light: "rgba(236, 243, 255, 1)"
              dark: "rgba(11, 23, 48, 1)"
  actions:
    - theme: brand
      text: "等级 2"
      link: /zh-CN/hero/matrix/layers/level2ThreeLayers
features:
  - title: "堆叠顺序"
    details: "zIndex 控制视觉组合顺序。"
---
```
