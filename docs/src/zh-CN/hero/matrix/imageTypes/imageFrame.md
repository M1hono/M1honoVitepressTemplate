---
layout: home
hero:
  name: "图片类型"
  text: "图片 + 边框"
  tagline: "边框形状控制在 image/gif/video/model3d 之间共享。"
  image:
    type: image
    image:
      src: /logo.png
      fit: contain
    frame:
      shape: squircle
      width: 340px
      height: 340px
      padding: 20px
      border: "1px solid rgba(148, 163, 184, 0.45)"
      background:
        light: "rgba(255, 255, 255, 0.86)"
        dark: "rgba(10, 16, 30, 0.66)"
  actions:
    - theme: brand
      text: "GIF 边框"
      link: /zh-CN/hero/matrix/imageTypes/gifFrame
title: "图片边框"
description: "图片边框 的英雄矩阵配置展示与实践说明。"
priority: 10
---
# 图片边框

主要关注点：`hero.image.frame` 形状和表面。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "图片类型"
  text: "图片 + 边框"
  tagline: "边框形状控制在 image/gif/video/model3d 之间共享。"
  image:
    type: image
    image:
      src: /logo.png
      fit: contain
    frame:
      shape: squircle
      width: 340px
      height: 340px
      padding: 20px
      border: "1px solid rgba(148, 163, 184, 0.45)"
      background:
        light: "rgba(255, 255, 255, 0.86)"
        dark: "rgba(10, 16, 30, 0.66)"
  actions:
    - theme: brand
      text: "GIF 边框"
      link: /zh-CN/hero/matrix/imageTypes/gifFrame
---
```
