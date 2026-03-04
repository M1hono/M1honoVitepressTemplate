---
layout: home
hero:
  name: "单一背景"
  text: "图片"
  tagline: "媒体背景，支持主题感知图片源与叠加层控制。"
  background:
    type: image
    image:
      light: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80"
      dark: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=80"
      size: cover
      position: center
  actions:
    - theme: brand
      text: "视频案例"
      link: /zh-CN/hero/matrix/backgroundSingle/video
    - theme: outline
      text: "图层案例"
      link: /zh-CN/hero/matrix/layers/level2ThreeLayers
features:
  - title: "叠加层控制"
    details: "通过叠加层与滤镜组合提升前景对比度。"
  - title: "主题同步"
    details: "亮色/暗色图片源可根据主题模式切换。"
title: "单一图片背景"
description: "单一图片背景 的英雄矩阵配置展示与实践说明。"
priority: 20
---
# 单一图片背景

主要关注点：主题感知图片源与叠加层对比控制。

## 页面

- [基础图片](./) - 带主题同步的图片
- [叠加效果](./backgroundOverlay) - 添加叠加层增强前景对比
- [位置与尺寸](./backgroundPosition) - 控制图片定位

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "单一背景"
  text: "图片"
  tagline: "媒体背景，支持主题感知图片源与叠加层控制。"
  background:
    type: image
    image:
      light: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80"
      dark: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=80"
      size: cover
      position: center
  actions:
    - theme: brand
      text: "视频案例"
      link: /zh-CN/hero/matrix/backgroundSingle/video
    - theme: outline
      text: "图层案例"
      link: /zh-CN/hero/matrix/layers/level2ThreeLayers
features:
  - title: "叠加层控制"
    details: "通过叠加层与滤镜组合提升前景对比度。"
  - title: "主题同步"
    details: "亮色/暗色图片源可根据主题模式切换。"
---
```

## 基础配置

图片背景支持主题感知的图片源，并可通过叠加层增强文本对比。

## 配置选项

### 图片配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `string` | - | 背景类型，设为 `image` |
| `image.src` | `string` | - | 通用图片源（无主题区分） |
| `image.light` | `string` | - | 亮色主题图片源 |
| `image.dark` | `string` | - | 暗色主题图片源 |
| `image.size` | `string` | `cover` | 背景尺寸 |
| `image.position` | `string` | `center` | 背景位置 |
| `image.repeat` | `string` | `no-repeat` | 背景重复 |
| `image.blur` | `number` | - | 模糊程度（像素） |
| `image.scale` | `number` | - | 缩放比例 |
| `image.opacity` | `number` | - | 透明度（0-1） |

### 背景尺寸值

| 值 | 说明 |
|----|------|
| `cover` | 覆盖整个区域，可能裁剪图片 |
| `contain` | 完整显示图片，可能留白 |
| `auto` | 图片原始尺寸 |
| `100% 100%` | 拉伸填满 |
| 自定义 | 如 `50%`、`300px` |

### 背景位置值

| 值 | 说明 |
|----|------|
| `center` | 居中 |
| `top` / `bottom` | 顶部 / 底部 |
| `left` / `right` | 左侧 / 右侧 |
| 组合 | 如 `center top`、`left center` |
| 百分比 | 如 `50% 25%` |

---

## 完整 Frontmatter

```yaml
---
layout: home
hero:
  name: "单一背景"
  text: "图片"
  tagline: "媒体背景，支持主题感知图片源与叠加层控制。"
  background:
    type: image
    image:
      light: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80"
      dark: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=80"
      size: cover
      position: center
  actions:
    - theme: brand
      text: "视频案例"
      link: /zh-CN/hero/matrix/backgroundSingle/video
features:
  - title: "叠加层控制"
    details: "通过叠加层与滤镜组合提升前景对比度。"
  - title: "主题同步"
    details: "亮色/暗色图片源可根据主题模式切换。"
---
```

---

## 图片滤镜

### 模糊效果

```yaml
hero:
  background:
    type: image
    image:
      src: "/images/hero-bg.jpg"
      blur: 8  # 8像素模糊
```

### 缩放效果

```yaml
hero:
  background:
    type: image
    image:
      src: "/images/hero-bg.jpg"
      scale: 1.1  # 放大 10%
```

### 透明度

```yaml
hero:
  background:
    type: image
    image:
      src: "/images/hero-bg.jpg"
      opacity: 0.7  # 70% 不透明度
```

---

## 完整配置示例

### 带模糊和叠加层控制的全配置

```yaml
hero:
  background:
    type: image
    image:
      light: "/images/hero-light.jpg"
      dark: "/images/hero-dark.jpg"
      size: cover
      position: center center
      repeat: no-repeat
      blur: 2
      opacity: 0.95
```

### 单张图片（无主题区分）

```yaml
hero:
  background:
    type: image
    image:
      src: "/images/hero-bg.jpg"
      size: cover
      position: center
```

### 平铺图案

```yaml
hero:
  background:
    type: image
    image:
      src: "/images/pattern.png"
      size: 100px 100px
      repeat: repeat
      opacity: 0.1
```

---

## 图片源解析

图片源支持以下格式：

| 格式 | 说明 |
|------|------|
| 绝对 URL | `https://example.com/image.jpg` |
| 相对路径 | `/images/hero.jpg`（相对于 `src/public/`） |
| 本地资源 | 自动通过 `resolveAssetWithBase` 解析 |

### 路径示例

```yaml
# 远程图片
image:
  src: "https://images.unsplash.com/photo-xxx"

# 本地图片（位于 docs/src/public/images/）
image:
  src: "/images/hero-bg.jpg"

# 主题区分
image:
  light: "/images/hero-light.jpg"
  dark: "/images/hero-dark.jpg"
```
