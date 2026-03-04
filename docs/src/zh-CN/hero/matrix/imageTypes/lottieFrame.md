---
layout: home
hero:
  name: "图片类型"
  text: "Lottie"
  tagline: "Lottie 英雄图像在边框容器内渲染，可配置速度与渲染器。"
  image:
    type: lottie
    lottie:
      src: "https://raw.githubusercontent.com/b-wils/lottiefiles-test-files/main/data/properties/scalar-linear.json"
      loop: true
      autoplay: true
      speed: 1
      renderer: svg
      fit: contain
    frame:
      shape: rounded
      width: 360px
      height: 300px
      radius: 24px
      border: "1px solid rgba(148, 163, 184, 0.45)"
      background:
        light: "rgba(255, 255, 255, 0.84)"
        dark: "rgba(10, 16, 30, 0.62)"
  actions:
    - theme: brand
      text: "3D 模型"
      link: /zh-CN/hero/matrix/imageTypes/model3dCentered
title: "Lottie 边框"
description: "Lottie 边框 的英雄矩阵配置展示与实践说明。"
priority: 35
---
# Lottie 边框

主要关注点：在 Hero 图片槽位中渲染 Lottie，并使用统一边框配置。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "图片类型"
  text: "Lottie"
  tagline: "Lottie 英雄图像在边框容器内渲染，可配置速度与渲染器。"
  image:
    type: lottie
    lottie:
      src: "https://raw.githubusercontent.com/b-wils/lottiefiles-test-files/main/data/properties/scalar-linear.json"
      loop: true
      autoplay: true
      speed: 1
      renderer: svg
      fit: contain
    frame:
      shape: rounded
      width: 360px
      height: 300px
      radius: 24px
      border: "1px solid rgba(148, 163, 184, 0.45)"
      background:
        light: "rgba(255, 255, 255, 0.84)"
        dark: "rgba(10, 16, 30, 0.62)"
  actions:
    - theme: brand
      text: "3D 模型"
      link: /zh-CN/hero/matrix/imageTypes/model3dCentered
---
```
