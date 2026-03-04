---
layout: home
hero:
    name: "视频背景"
    text: "视频控制"
    tagline: "通过自动播放、循环和静音设置控制视频播放。"
    background:
        type: video
        video:
            src: /videos/hero-bg.mp4
            autoplay: true
            loop: true
            muted: true
            playsinline: true
    colors:
        title:
            light: "rgba(255, 255, 255, 1)"
            dark: "rgba(255, 255, 255, 1)"
        tagline:
            light: "rgba(224, 224, 224, 1)"
            dark: "rgba(204, 204, 204, 1)"
    actions:
        - theme: brand
          text: "着色器"
          link: /zh-CN/hero/matrix/backgroundSingle/shader
features:
    - title: "自动播放"
      details: "页面加载时视频自动开始播放。"
    - title: "循环"
      details: "视频播放结束后重复播放。"
    - title: "静音"
      details: "大多数浏览器要求静音才能自动播放。"
title: "视频控制"
description: "视频背景播放配置。"
priority: 15
---
# 视频控制

主要关注点：配置视频背景的播放行为。

## 本页实际 Frontmatter 配置

```yaml
---
layout: home
hero:
    background:
        type: video
        video:
            src: /videos/hero-bg.mp4
            autoplay: true
            loop: true
            muted: true
            playsinline: true
---
```

## API 配置项

| 键 | 类型 | 默认值 | 说明 |
|-----|------|---------|-------------|
| `hero.background.video.src` | string | 必填 | 视频文件路径 |
| `hero.background.video.autoplay` | boolean | true | 加载时自动播放 |
| `hero.background.video.loop` | boolean | true | 循环播放 |
| `hero.background.video.muted` | boolean | true | 静音 |
| `hero.background.video.playsinline` | boolean | true | 移动端内联播放 |

## 最佳实践

- 为确保自动播放生效，请始终设置 `muted: true`
- 使用优化的视频文件（WebM/MP4）
- 提供封面图片用于加载状态
