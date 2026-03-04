---
title: Hero 演练场
layout: doc
root: true
maxDepth: 6
collapsed: false
description: "Hero 演练场 的 Hero 配置与导航入口。"
priority: 10
---
# Hero 演练场

使用渐进式矩阵验证所有 hero 运行时配置路径。

## 快速入口

- [Hero 全配置总览](./AllConfig) — 每个 hero frontmatter 字段的完整 API 参考
- [Hero 配置矩阵](./matrix/index) — 每条配置路径的渐进式展示页面

## Hero 系统概览

Hero 系统完全由每个页面 YAML front matter 中的 `frontmatter.hero.*` 控制。

| 系统 | 键 | 说明 |
| --- | --- | --- |
| 布局 | `hero.layout.viewport` | 全视口或内容高度 Hero |
| 排版 | `hero.typography` | 标题/正文/副标题/图像的运动风格 |
| 背景 | `hero.background` | 单层或多层背景（image/video/color/shader/particles） |
| 波浪 | `hero.waves` | Hero 底部的 SVG 波浪过渡 |
| 图像 | `hero.image` | 右侧 Hero 媒体（image/video/gif/model3d/lottie） |
| 浮动 | `hero.floating` | 背景上方的装饰浮动元素 |
| 颜色 | `hero.colors` | 文本、导航栏和搜索框颜色覆盖 |
| 按钮 | `hero.actions` | 支持完整样式自定义的 CTA 按钮 |