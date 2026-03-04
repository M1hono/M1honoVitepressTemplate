---
layout: home
hero:
  name: "Hero 运行时"
  text: "等级 1"
  tagline: "最小化首页 Hero，使用默认视口框架，无高级特效。"
  actions:
    - theme: brand
      text: "下一等级"
      link: /zh-CN/hero/matrix/basic/level2ViewportActions
features:
  - title: "专注核心"
    details: "仅配置标题、文本、标语和操作按钮。"
  - title: "稳定可靠"
    details: "无背景/图片覆盖，是最安全的基线配置。"
  - title: "默认行为"
    details: "hero.layout.viewport 默认为 true。"
title: "等级 1：最小配置"
description: "等级 1：最小配置 的英雄矩阵配置展示与实践说明。"
priority: 10
---
# 等级 1：最小配置

主要关注点：基础 Hero 内容约定。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "Hero 运行时"
  text: "等级 1"
  tagline: "最小化首页 Hero，使用默认视口框架，无高级特效。"
  actions:
    - theme: brand
      text: "下一等级"
      link: /zh-CN/hero/matrix/basic/level2ViewportActions
features:
  - title: "专注核心"
    details: "仅配置标题、文本、标语和操作按钮。"
  - title: "稳定可靠"
    details: "无背景/图片覆盖，是最安全的基线配置。"
  - title: "默认行为"
    details: "hero.layout.viewport 默认为 true。"
---
```

## 配置说明

这是最简单的 Hero 配置，仅包含 VitePress 原生支持的核心字段：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | `string` | 否 | Hero 名称，显示在主标题上方 |
| `text` | `string` | 是 | 主标题文本 |
| `tagline` | `string` | 否 | 副标题/标语 |
| `actions` | `array` | 否 | 操作按钮数组 |

## 完整 Frontmatter

```yaml
---
layout: home
hero:
  name: "Hero 运行时"
  text: "等级 1"
  tagline: "最小化首页 Hero，使用默认视口框架，无高级特效。"
  actions:
    - theme: brand
      text: "下一等级"
      link: /zh-CN/hero/matrix/basic/level2ViewportActions
features:
  - title: "专注核心"
    details: "仅配置标题、文本、标语和操作按钮。"
  - title: "稳定可靠"
    details: "无背景/图片覆盖，是最安全的基线配置。"
  - title: "默认行为"
    details: "hero.layout.viewport 默认为 true。"
---
```

## 特点

1. **无背景配置** - 使用 VitePress 默认背景
2. **全屏视口** - `hero.layout.viewport` 默认为 `true`，Hero 区域占据整个视口高度
3. **文档优先** - 最适合以内容为主的文档首页