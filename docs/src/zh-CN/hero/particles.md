---
layout: home

hero:
  name: "粒子效果"
  text: "Particles Hero"
  tagline: "使用粒子系统创建动态背景效果"
  background:
    type: particles
    particles:
      count: 80
      size: 2
      color: "#6366f1"
      speed: 1
      opacity: 0.5
      links:
        enabled: true
        color: "#6366f1"
        distance: 150
  actions:
    - theme: brand
      text: "3D 效果"
      link: /zh-CN/hero/3d-effect
    - theme: alt
      text: "返回首页"
      link: /zh-CN/hero/index

features:
  - icon: ✨
    title: "粒子动画"
    details: "创建动态粒子背景效果"

  - icon: 🔗
    title: "连线效果"
    details: "粒子之间自动连线"

  - icon: 🎪
    title: "可自定义"
    details: "支持颜色、大小、数量等配置"
---

# 粒子效果 Hero

此页面展示如何使用粒子系统作为 Hero 区域背景。

## 配置说明

```yaml
hero:
  background:
    type: particles
    particles:
      count: 80
      size: 2
      color: "#6366f1"
      speed: 1
      opacity: 0.5
      links:
        enabled: true
        distance: 150
```

## 其他示例

- [渐变背景](./gradient) - 渐变色背景效果
- [图片背景](./image) - 使用图片作为背景
- [视频背景](./video) - 使用视频作为背景
- [返回首页](./index) - 返回 Hero 展示首页
