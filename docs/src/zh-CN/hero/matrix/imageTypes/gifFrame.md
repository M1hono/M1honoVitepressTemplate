---
layout: home
hero:
  name: "图片类型"
  text: "GIF"
  tagline: "GIF 使用相同的边框约定和媒体适应控制。"
  image:
    type: gif
    gif:
      src: "https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif"
      autoplay: true
      loop: true
      fit: cover
    frame:
      shape: rounded
      width: 360px
      height: 280px
      radius: 24px
  actions:
    - theme: brand
      text: "视频边框"
      link: /zh-CN/hero/matrix/imageTypes/videoFrame
title: "GIF 边框"
description: "GIF 边框 的英雄矩阵配置展示与实践说明。"
priority: 20
---
# GIF 边框

主要关注点：gif 源 + 边框尺寸。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "图片类型"
  text: "GIF"
  tagline: "GIF 使用相同的边框约定和媒体适应控制。"
  image:
    type: gif
    gif:
      src: "https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif"
      autoplay: true
      loop: true
      fit: cover
    frame:
      shape: rounded
      width: 360px
      height: 280px
      radius: 24px
  actions:
    - theme: brand
      text: "视频边框"
      link: /zh-CN/hero/matrix/imageTypes/videoFrame
---
```
