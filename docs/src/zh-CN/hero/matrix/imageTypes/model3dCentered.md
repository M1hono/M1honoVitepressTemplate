---
layout: home
hero:
  name: "图片类型"
  text: "Model3D"
  tagline: "模型居中并自动适应，避免被边框裁剪。"
  image:
    type: model3d
    model3d:
      src: /models/duck.glb
      fitPadding: 1.36
      animation:
        enabled: true
        type: float
      interaction:
        enabled: true
        autoRotate: true
        autoRotateSpeed: 0.7
    frame:
      shape: rounded
      width: 420px
      height: 330px
      radius: 20px
      background:
        light: "rgba(245, 248, 255, 0.86)"
        dark: "rgba(8, 14, 26, 0.74)"
  actions:
    - theme: brand
      text: "浮动元素"
      link: /zh-CN/hero/matrix/floating/index
features:
  - title: "居中"
    details: "模型运行时自动重新定位几何体并调整相机距离。"
title: "Model3D 居中"
description: "Model3D 居中 的英雄矩阵配置展示与实践说明。"
priority: 40
---
# Model3D 居中

主要关注点：非裁剪的 3D 模型框架。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "图片类型"
  text: "Model3D"
  tagline: "模型居中并自动适应，避免被边框裁剪。"
  image:
    type: model3d
    model3d:
      src: /models/duck.glb
      fitPadding: 1.36
      animation:
        enabled: true
        type: float
      interaction:
        enabled: true
        autoRotate: true
        autoRotateSpeed: 0.7
    frame:
      shape: rounded
      width: 420px
      height: 330px
      radius: 20px
      background:
        light: "rgba(245, 248, 255, 0.86)"
        dark: "rgba(8, 14, 26, 0.74)"
  actions:
    - theme: brand
      text: "浮动元素"
      link: /zh-CN/hero/matrix/floating/index
features:
  - title: "居中"
    details: "模型运行时自动重新定位几何体并调整相机距离。"
---
```
