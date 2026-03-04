---
title: Hero 配置覆盖映射
layout: doc
description: 将运行时配置键映射到分层展示页。API 统一在 AllConfig 页面维护。
priority: 80
---
# Hero 配置覆盖映射

此页面把运行时配置键映射到对应的嵌套展示页。

唯一 API 权威页：
- [Hero 全配置总览](../../AllConfig)

## Hero 根配置

| Key | Showcase |
| --- | --- |
| `hero.name` / `hero.text` / `hero.tagline` | [基础 L1](../basic/level1Minimal) |
| `hero.layout.viewport` | [基础 L2](../basic/level2ViewportActions) |
| `hero.actions[]` | [按钮主题](../buttonsFeatures/buttonsThemes) |
| page-level `cssVars` | [基础 L3](../basic/level3PageCssvars) |

## 单背景模式

| Key | Showcase |
| --- | --- |
| `hero.background.type: color` | [颜色背景](../backgroundSingle/color) |
| `hero.background.type: image` | [图片背景](../backgroundSingle/image) |
| `hero.background.type: video` | [视频背景](../backgroundSingle/video) |
| `hero.background.type: shader` | [Shader 背景](../backgroundSingle/shader) |
| `hero.background.type: particles` | [粒子背景](../backgroundSingle/particles) |

## 分层背景模式

| Key | Showcase |
| --- | --- |
| `hero.background.layers[]` 基础组合 | [Layers L1](../layers/level1TwoLayers) |
| `layers[].zIndex/opacity/blend` | [Layers L2](../layers/level2ThreeLayers) |
| `layers[].shader` + `layers[].particles` | [Layers L3](../layers/level3ShaderParticles) |
| 主题同步层叠组合 | [Layers L4](../layers/level4FullThemeSync) |

## 波浪系统

| Key | Showcase |
| --- | --- |
| 默认波浪桥接 | [Waves L1](../waves/level1Default) |
| 形状与透明度 | [Waves L2](../waves/level2ShapeOpacity) |
| 移动端调优 | [Waves L3](../waves/level3MobileTuning) |
| 不支持 `background.type: waves` 的处理 | [不支持示例](../waves/deprecatedBackgroundType) |

## 图片类型

| Key | Showcase |
| --- | --- |
| `hero.image.type: image` | [图片框](../imageTypes/imageFrame) |
| `hero.image.type: gif` | [GIF 框](../imageTypes/gifFrame) |
| `hero.image.type: video` | [视频框](../imageTypes/videoFrame) |
| `hero.image.type: lottie` | [Lottie 框](../imageTypes/lottie-frame) |
| `hero.image.type: model3d` | [Model3D 居中](../imageTypes/model3dCentered) |

## 浮动元素

| Key | Showcase |
| --- | --- |
| `hero.floating.enabled` + 文本基础 | [Floating L1](../floating/level1Text) |
| 卡片样式 | [Floating L2](../floating/level2Cards) |
| 混合元素 | [Floating L3](../floating/level3Mixed) |

## 按钮与特性

| Key | Showcase |
| --- | --- |
| 操作按钮主题与布局 | [按钮主题](../buttonsFeatures/buttonsThemes) |
| 特性卡片滚动 | [特性滚动](../buttonsFeatures/featuresScroll) |

## 文档内导航

- [矩阵首页](../index)
- [Hero 全配置总览](../../AllConfig)
