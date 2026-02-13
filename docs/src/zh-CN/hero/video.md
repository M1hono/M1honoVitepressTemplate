---
layout: home

hero:
  name: "视频背景"
  text: "Video Hero"
  tagline: "使用视频作为背景，营造沉浸式体验"
  background:
    type: video
    video:
      light: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      dark: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    opacity: 0.6
  actions:
    - theme: brand
      text: "观看演示"
      link: /zh-CN/hero/particles
    - theme: alt
      text: "了解更多"
      link: /zh-CN/hero/3d-effect

features:
  - icon: 🎬
    title: "自动播放"
    details: "视频自动播放，支持静音"

  - icon: 🔁
    title: "循环播放"
    details: "视频自动循环播放"

  - icon: 📱
    title: "移动端优化"
    details: "完美适配移动端显示"
---

# 视频背景 Hero

此页面展示如何使用视频作为 Hero 区域背景。

## 配置说明

```yaml
hero:
  background:
    type: video
    video:
      src: "https://example.com/video.mp4"
      autoplay: true
      loop: true
      muted: true
    opacity: 0.6
```

## 其他示例

- [渐变背景](./gradient) - 渐变色背景效果
- [图片背景](./image) - 使用图片作为背景
- [粒子效果](./particles) - 粒子动画背景
- [返回首页](./index) - 返回 Hero 展示首页
