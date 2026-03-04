---
title: Hero 配置矩阵
description: 渐进式 hero 运行时配置指南。每个页面专注于一个配置关注点，并以可控的步骤增加复杂度。
layout: doc
priority: 10
root: true
maxDepth: 5
---
# Hero 配置矩阵

此矩阵是 hero frontmatter 的权威测试和学习集合。

## 嵌套结构

每个展示叶子页都已改为独立目录下的 `index.md`，便于继续按层级扩展而不破坏导航结构。

```text
hero/matrix/
  backgroundSingle/
    color/
    image/
    video/
    shader/
    particles/
  layers/
    level1TwoLayers.md
    level2ThreeLayers.md
    ...
  basic/
    level1Minimal.md
    level2ViewportActions.md
    ...
```

## 渐进规则

1. 每个页面专注于一个主要配置领域。
2. 复杂度逐级递增。
3. 图层页面是累积的，展示真实的组合效果。
4. 视觉基线保持文档优先和前景对比安全。
5. 完整 API 仅维护在单一页面：[Hero 全配置总览](../AllConfig)。

## 建议学习顺序

1. [基础配置](./basic/index)
2. [单一背景](./backgroundSingle/index)
3. [分层背景](./layers/index)
4. [波浪效果](./waves/index)
5. [图片类型](./imageTypes/index)
6. [浮动元素](./floating/index)
7. [按钮与特性](./buttonsFeatures/index)
8. [配置覆盖映射](./configCoverage)
9. [完整配置总览](../AllConfig)

## 章节

- [基础配置](./basic/index)
- [单一背景](./backgroundSingle/index)
- [分层背景](./layers/index)
- [波浪效果](./waves/index)
- [图片类型](./imageTypes/index)
- [浮动元素](./floating/index)
- [按钮与特性](./buttonsFeatures/index)
- [配置覆盖映射](./configCoverage)
- [完整配置总览](../AllConfig)
