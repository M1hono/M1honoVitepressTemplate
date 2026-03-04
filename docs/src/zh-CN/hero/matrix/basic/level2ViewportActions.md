---
layout: home
hero:
  name: "Hero 运行时"
  text: "等级 2"
  tagline: "切换到内容高度模式，并调整操作按钮主题。"
  layout:
    viewport: false
  actions:
    - theme: brand
      text: "品牌按钮"
      link: /zh-CN/hero/matrix/basic/level3PageCssvars
    - theme: alt
      text: "替代按钮"
      link: /zh-CN/hero/matrix/index
    - theme: outline
      text: "描边按钮"
      link: /zh-CN/hero/matrix/buttonsFeatures/buttonsThemes
features:
  - title: "视口切换"
    details: "hero.layout.viewport=false 使 Hero 高度由内容决定。"
  - title: "按钮约定"
    details: "theme/text/link 与现有运行时用法保持兼容。"
title: "等级 2：视口 + 操作按钮"
description: "等级 2：视口 + 操作按钮 的英雄矩阵配置展示与实践说明。"
priority: 20
---
# 等级 2：视口 + 操作按钮

主要关注点：布局视口切换和按钮主题约定。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "Hero 运行时"
  text: "等级 2"
  tagline: "切换到内容高度模式，并调整操作按钮主题。"
  layout:
    viewport: false
  actions:
    - theme: brand
      text: "品牌按钮"
      link: /zh-CN/hero/matrix/basic/level3PageCssvars
    - theme: alt
      text: "替代按钮"
      link: /zh-CN/hero/matrix/index
    - theme: outline
      text: "描边按钮"
      link: /zh-CN/hero/matrix/buttonsFeatures/buttonsThemes
features:
  - title: "视口切换"
    details: "hero.layout.viewport=false 使 Hero 高度由内容决定。"
  - title: "按钮约定"
    details: "theme/text/link 与现有运行时用法保持兼容。"
---
```

## 配置说明

### 视口布局

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `layout.viewport` | `boolean` | `true` | 控制是否使用全屏视口高度 |

- `viewport: true` - Hero 区域占据整个视口高度（默认）
- `viewport: false` - Hero 高度由内容决定，适合内容较少的页面

### 操作按钮

每个操作按钮支持以下属性：

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `theme` | `string` | 是 | 按钮主题样式 |
| `text` | `string` | 是 | 按钮文本 |
| `link` | `string` | 是 | 链接地址 |
| `target` | `string` | 否 | 链接目标（如 `_blank`） |
| `rel` | `string` | 否 | 链接关系属性 |

### 按钮主题类型

| 主题 | 说明 |
|------|------|
| `brand` | 品牌主色调按钮，最常用的主操作按钮 |
| `alt` | 替代样式按钮，用于次要操作 |
| `outline` | 描边按钮，透明背景带边框 |
| `ghost` | 幽灵按钮，无边框透明背景 |
| `danger` | 危险操作按钮，红色警告样式 |
| `sponsor` | 赞助按钮，特殊样式 |

## 完整 Frontmatter

```yaml
---
layout: home
hero:
  name: "Hero 运行时"
  text: "等级 2"
  tagline: "切换到内容高度模式，并调整操作按钮主题。"
  layout:
    viewport: false
  actions:
    - theme: brand
      text: "品牌按钮"
      link: /zh-CN/hero/matrix/basic/level3PageCssvars
    - theme: alt
      text: "替代按钮"
      link: /zh-CN/hero/matrix/index
    - theme: outline
      text: "描边按钮"
      link: /zh-CN/hero/matrix/buttonsFeatures/buttonsThemes
features:
  - title: "视口切换"
    details: "hero.layout.viewport=false 使 Hero 高度由内容决定。"
  - title: "按钮约定"
    details: "theme/text/link 与现有运行时用法保持兼容。"
---
```

## 使用场景

- **viewport: true** - 适用于首页、落地页，需要视觉冲击力
- **viewport: false** - 适用于内容页、功能页，节省空间