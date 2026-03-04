---
layout: home
hero:
  name: "浮动元素"
  text: "等级 2"
  tagline: "添加卡片项并保持默认配置简洁和项驱动。"
  floating:
    enabled: true
    opacity: 0.92
    density: 10
    gradients:
      - "linear-gradient(120deg,rgba(15, 76, 154, 1) 0%,rgba(47, 111, 192, 1) 50%,rgba(106, 163, 232, 1) 100%)"
      - "linear-gradient(120deg,rgba(10, 122, 106, 1) 0%,rgba(19, 144, 124, 1) 52%,rgba(71, 184, 159, 1) 100%)"
    items:
      - type: card
        title: "运行时完整"
        description: "着色器、粒子、波浪、3D模型均为配置驱动。"
        x: "8%"
        y: "22%"
      - type: card
        title: "默认可读"
        description: "媒体背景由叠加层与对比度策略保护。"
        x: "66%"
        y: "64%"
      - type: text
        text: "仅每项样式"
        x: "64%"
        y: "20%"
        colorType: random-gradient
  actions:
    - theme: brand
      text: "等级 3"
      link: /zh-CN/hero/matrix/floating/level3Mixed
title: "浮动元素等级 2"
description: "浮动元素等级 2 的英雄矩阵配置展示与实践说明。"
priority: 20
---
# 浮动元素等级 2

主要关注点：每项配置风格的卡片项。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "浮动元素"
  text: "等级 2"
  tagline: "添加卡片项并保持默认配置简洁和项驱动。"
  floating:
    enabled: true
    opacity: 0.92
    density: 10
    gradients:
      - "linear-gradient(120deg,rgba(15, 76, 154, 1) 0%,rgba(47, 111, 192, 1) 50%,rgba(106, 163, 232, 1) 100%)"
      - "linear-gradient(120deg,rgba(10, 122, 106, 1) 0%,rgba(19, 144, 124, 1) 52%,rgba(71, 184, 159, 1) 100%)"
    items:
      - type: card
        title: "运行时完整"
        description: "着色器、粒子、波浪、3D模型均为配置驱动。"
        x: "8%"
        y: "22%"
      - type: card
        title: "默认可读"
        description: "媒体背景由叠加层与对比度策略保护。"
        x: "66%"
        y: "64%"
      - type: text
        text: "仅每项样式"
        x: "64%"
        y: "20%"
        colorType: random-gradient
  actions:
    - theme: brand
      text: "等级 3"
      link: /zh-CN/hero/matrix/floating/level3Mixed
---
```
