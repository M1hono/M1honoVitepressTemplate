---
layout: home

hero:
  name: "渐变背景"
  text: "Gradient Hero"
  tagline: "使用渐变色作为背景，支持径向渐变和线性渐变"
  background:
    type: color
    color:
      gradient:
        enabled: true
        type: linear
        direction: 135deg
        stops:
          - color: "#667eea"
            position: 0%
          - color: "#764ba2"
            position: 100%
  actions:
    - theme: brand
      text: "了解更多"
      link: /zh-CN/hero/image
    - theme: alt
      text: "演示"
      link: /zh-CN/hero/particles

features:
  - icon: 🌈
    title: "线性渐变"
    details: "支持任意角度的线性渐变背景"

  - icon: ⭕
    title: "径向渐变"
    details: "支持径向和圆形渐变效果"

  - icon: 🔄
    title: "锥形渐变"
    details: "支持 CSS 锥形渐变"
---

# 渐变背景 Hero

此页面展示如何使用渐变色作为 Hero 区域背景。

## 配置说明

```yaml
hero:
  background:
    type: color
    color:
      gradient:
        enabled: true
        type: linear
        direction: 135deg
        stops:
          - color: "#667eea"
            position: 0%
          - color: "#764ba2"
            position: 100%
```

## 其他示例

- [图片背景](./image) - 使用图片作为背景
- [视频背景](./video) - 使用视频作为背景
- [粒子效果](./particles) - 粒子动画背景
- [返回首页](./index) - 返回 Hero 展示首页
