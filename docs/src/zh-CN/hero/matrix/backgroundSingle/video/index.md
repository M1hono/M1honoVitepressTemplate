---
layout: home
hero:
  name: "单一背景"
  text: "视频"
  tagline: "视频背景，支持明确的媒体层控制。"
  background:
    type: video
    video:
      src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      muted: true
      autoplay: true
      loop: true
      fit: cover
      position: center
  actions:
    - theme: brand
      text: "着色器案例"
      link: /zh-CN/hero/matrix/backgroundSingle/shader
features:
  - title: "媒体契约"
title: "单一视频背景"
description: "单一视频背景 的英雄矩阵配置展示与实践说明。"
priority: 50
---
# 单一视频背景

主要关注点：`hero.background.video` 配置约定。

## 页面

- [基础视频](./) - 视频背景配置
- [视频控制](./videoControls) - 自动播放、循环和静音设置

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "单一背景"
  text: "视频"
  tagline: "视频背景，支持明确的媒体层控制。"
  background:
    type: video
    video:
      src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      muted: true
      autoplay: true
      loop: true
      fit: cover
      position: center
  actions:
    - theme: brand
      text: "着色器案例"
      link: /zh-CN/hero/matrix/backgroundSingle/shader
features:
  - title: "媒体契约"
---
```

## 基础配置

视频背景为 Hero 区域添加动态视觉效果，适合需要视觉冲击力的落地页。

## 配置选项

### 视频配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `string` | - | 背景类型，设为 `video` |
| `video.src` | `string` | - | 通用视频源 |
| `video.light` | `string` | - | 亮色主题视频源 |
| `video.dark` | `string` | - | 暗色主题视频源 |
| `video.autoplay` | `boolean` | `true` | 自动播放 |
| `video.loop` | `boolean` | `true` | 循环播放 |
| `video.muted` | `boolean` | `true` | 静音（自动播放必须） |
| `video.controls` | `boolean` | `false` | 显示控制条 |
| `video.poster` | `string` | - | 封面图片 |
| `video.playbackRate` | `number` | `1` | 播放速度 |

---

## 完整 Frontmatter

```yaml
---
layout: home
hero:
  name: "单一背景"
  text: "视频"
  tagline: "视频背景，支持明确的媒体层控制。"
  background:
    type: video
    video:
      src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      muted: true
      autoplay: true
      loop: true
      fit: cover
      position: center
  actions:
    - theme: brand
      text: "着色器案例"
      link: /zh-CN/hero/matrix/backgroundSingle/shader
features:
  - title: "媒体契约"
---
```

---

## 视频源配置

### 单一视频源

```yaml
hero:
  background:
    type: video
    video:
      src: "/videos/hero-bg.mp4"
```

### 主题感知视频源

```yaml
hero:
  background:
    type: video
    video:
      light: "/videos/hero-light.mp4"
      dark: "/videos/hero-dark.mp4"
```

---

## 自动播放注意事项

大多数现代浏览器要求视频必须静音才能自动播放：

```yaml
hero:
  background:
    type: video
    video:
      src: "/videos/hero-bg.mp4"
      autoplay: true  # 自动播放
      muted: true     # 必须静音才能自动播放
      loop: true      # 循环播放
```

---

## 完整配置示例

### 基础视频背景

```yaml
hero:
  background:
    type: video
    video:
      src: "https://example.com/video.mp4"
      muted: true
      autoplay: true
      loop: true
```

### 带封面图片

```yaml
hero:
  background:
    type: video
    video:
      src: "/videos/hero.mp4"
      poster: "/images/hero-poster.jpg"
      muted: true
      autoplay: true
      loop: true
```

### 带控制条

```yaml
hero:
  background:
    type: video
    video:
      src: "/videos/demo.mp4"
      muted: false
      autoplay: false
      controls: true
      loop: false
```

### 慢速播放

```yaml
hero:
  background:
    type: video
    video:
      src: "/videos/slow-motion.mp4"
      playbackRate: 0.5  # 0.5 倍速
      muted: true
      autoplay: true
      loop: true
```

---

## 视频格式建议

| 格式 | 兼容性 | 文件大小 | 质量 |
|------|--------|----------|------|
| MP4 (H.264) | 最好 | 中等 | 好 |
| WebM (VP9) | 好 | 小 | 好 |
| MOV | 中等 | 大 | 好 |

### 推荐配置

- **分辨率**：1080p 或更低（避免过大文件）
- **比特率**：2-5 Mbps（平衡质量和大小）
- **时长**：10-30 秒（循环播放）
- **帧率**：24-30 fps

---

## 性能优化

### 1. 压缩视频

```bash
# 使用 ffmpeg 压缩
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow output.mp4
```

### 2. 提供封面图片

```yaml
video:
  poster: "/images/video-poster.jpg"  # 加载前显示
```

### 3. 移动端优化

考虑在移动设备上使用图片替代视频：

```yaml
hero:
  background:
    type: image  # 或使用图层条件渲染
    image:
      src: "/images/hero-poster.jpg"
```

---

## 视频源路径

视频源支持以下格式：

| 格式 | 说明 |
|------|------|
| 绝对 URL | `https://example.com/video.mp4` |
| 相对路径 | `/videos/hero.mp4`（相对于 `src/public/`） |

### 本地视频示例

```yaml
# 视频位于 docs/src/public/videos/
video:
  src: "/videos/hero-bg.mp4"
```
