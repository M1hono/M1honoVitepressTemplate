---
layout: home

hero:
  name: "3D 悬浮效果"
  text: "3D Hover Effect"
  tagline: "按钮和元素支持 3D 悬浮效果"
  background:
    type: color
    color:
      gradient:
        enabled: true
        type: linear
        direction: 135deg
        stops:
          - color: "#0f172a"
            position: 0%
          - color: "#1e293b"
            position: 100%
  actions:
    - theme: brand
      text: "3D 按钮演示"
      link: /zh-CN/hero/index
      style:
        variant: filled
        borderRadius: 8px
        padding: 12px 24px
        hover:
          enabled: true
          tilt3D:
            enabled: true
            intensity: 10
            perspective: 1000px
          scale: 1.05
    - theme: alt
      text: "了解更多"
      link: /zh-CN/hero/index

features:
  - icon: 🎲
    title: "3D 倾斜"
    details: "鼠标悬停时产生 3D 倾斜效果"

  - icon: 📏
    title: "透视效果"
    details: "支持自定义透视距离"

  - icon: 🔄
    title: "缩放动画"
    details: "支持悬停时的缩放效果"
---

# 3D 效果 Hero

此页面展示按钮和元素的 3D 悬浮效果。

## 配置说明

```yaml
hero:
  actions:
    - theme: brand
      text: "3D 按钮"
      style:
        hover:
          enabled: true
          tilt3D:
            enabled: true
            intensity: 10
            perspective: 1000px
          scale: 1.05
```

## 可用特效

- **tilt3D** - 3D 倾斜效果
- **scale** - 缩放效果
- **blur** - 模糊效果
- **bounce** - 弹跳效果

## 其他示例

- [渐变背景](./gradient) - 渐变色背景效果
- [图片背景](./image) - 使用图片作为背景
- [粒子效果](./particles) - 粒子动画背景
- [返回首页](./index) - 返回 Hero 展示首页
