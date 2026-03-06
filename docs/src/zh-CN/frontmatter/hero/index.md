---
title: Hero 配置
layout: doc
description: Hero 运行时 frontmatter 契约。
priority: 10
---
# Hero 配置

Hero 运行时 frontmatter，用于首页组合。

## 页面

- [Hero 运行时](./heroRuntime) - 包含示例的完整 hero frontmatter 契约
- [Hero 全配置总览](../../hero/AllConfig) - 每个字段的完整 API 参考表
- [Hero 扩展手册](../reference/heroExtension) - 排版、浮动元素、Shader、背景与导航搜索视觉扩展
- [可维护性与扩展指南](../reference/maintainability) - Hero 相关框架改动应遵循的共享规范

## 主要章节

- **背景**：`hero.background` — `image | video | color | shader | particles`，支持背景遮罩和多层合成
- **波浪**：`hero.waves` — SVG 波浪过渡，支持逐层控制
- **图像**：`hero.image` — `image | video | gif | model3d | lottie`，支持边框和发光选项
- **排版**：`hero.typography` — 运动风格（`floating-tilt`、`grouped-float`、`slanted-wrap`）
- **颜色**：`hero.colors` — 文本颜色、导航栏颜色和搜索框颜色
- **浮动**：`hero.floating` — `text | card | image | lottie | badge | icon | stat | code | shape`
- **按钮**：`hero.actions` — 支持 theme、linkKey 和样式覆盖
