---
layout: home
hero:
  name: "图片类型"
  text: "视频"
  tagline: "视频 hero 图片应保持在边框形状内。"
  image:
    type: video
    video:
      src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      muted: true
      autoplay: true
      loop: true
      fit: cover
    frame:
      shape: rounded
      width: 380px
      height: 300px
      radius: 24px
      overflow: hidden
  actions:
    - theme: brand
      text: "Model3D"
      link: /zh-CN/hero/matrix/imageTypes/model3dCentered
title: "视频边框"
description: "视频边框 的英雄矩阵配置展示与实践说明。"
priority: 30
---
# 视频边框

主要关注点：自定义边框边界内的视频媒体。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "图片类型"
  text: "视频"
  tagline: "视频 hero 图片应保持在边框形状内。"
  image:
    type: video
    video:
      src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      muted: true
      autoplay: true
      loop: true
      fit: cover
    frame:
      shape: rounded
      width: 380px
      height: 300px
      radius: 24px
      overflow: hidden
  actions:
    - theme: brand
      text: "Model3D"
      link: /zh-CN/hero/matrix/imageTypes/model3dCentered
---
```
