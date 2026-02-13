---
layout: home

hero:
  name: "图片背景"
  text: "Image Hero"
  tagline: "使用图片作为背景，支持深色/浅色模式自动切换"
  background:
    type: image
    image:
      light: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80"
      dark: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80"
      alt: "Background"
      size: cover
      position: center center
      repeat: no-repeat
    opacity: 0.8
  actions:
    - theme: brand
      text: "开始使用"
      link: /zh-CN/hero/video
    - theme: alt
      text: "查看特效"
      link: /zh-CN/hero/particles

features:
  - icon: 🖼️
    title: "深浅模式"
    details: "自动根据主题切换深色/浅色图片"

  - icon: 🎭
    title: "混合模式"
    details: "支持多种图片混合模式"

  - icon: 📐
    title: "自定义样式"
    details: "支持缩放、定位、重复等属性"
---

# 图片背景 Hero

此页面展示如何使用图片作为 Hero 区域背景。

## 配置说明

```yaml
hero:
  background:
    type: image
    image:
      light: "https://example.com/light.jpg"
      dark: "https://example.com/dark.jpg"
      size: cover
      position: center center
    opacity: 0.8
```

## 其他示例

- [渐变背景](./gradient) - 渐变色背景效果
- [视频背景](./video) - 使用视频作为背景
- [粒子效果](./particles) - 粒子动画背景
- [返回首页](./index) - 返回 Hero 展示首页
