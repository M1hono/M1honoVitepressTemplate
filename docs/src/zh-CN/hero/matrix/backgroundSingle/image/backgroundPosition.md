---
layout: home
hero:
    name: "背景图片"
    text: "位置与尺寸"
    tagline: "控制背景图片的位置、尺寸和重复方式。"
    background:
        type: image
        image:
            src: /images/hero-bg.jpg
            position: center
            size: cover
            repeat: no-repeat
    colors:
        title:
            light: "rgba(255, 255, 255, 1)"
            dark: "rgba(255, 255, 255, 1)"
        tagline:
            light: "rgba(224, 224, 224, 1)"
            dark: "rgba(204, 204, 204, 1)"
    actions:
        - theme: brand
          text: "视频背景"
          link: /zh-CN/hero/matrix/backgroundSingle/video
features:
    - title: "位置"
      details: "设置图片位置：center、top、bottom、left、right。"
    - title: "尺寸"
      details: "cover、contain 或具体尺寸。"
    - title: "重复"
      details: "控制重复行为。"
title: "图片位置与尺寸"
description: "控制背景图片位置和尺寸。"
priority: 16
---
# 图片位置与尺寸

主要关注点：控制背景图片的定位和缩放。

## 本页实际 Frontmatter 配置

```yaml
---
layout: home
hero:
    background:
        type: image
        image:
            src: /images/hero-bg.jpg
            position: center
            size: cover
            repeat: no-repeat
---
```

## API 配置项

| 键 | 值 | 说明 |
|-----|--------|-------------|
| `hero.background.image.position` | center, top, bottom, left, right | 图片位置 |
| `hero.background.image.size` | cover, contain, auto, 或具体尺寸 | 图片尺寸 |
| `hero.background.image.repeat` | repeat, no-repeat, repeat-x, repeat-y | 重复方式 |
