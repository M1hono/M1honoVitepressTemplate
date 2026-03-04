---
layout: home
cssVars:
  --vp-home-hero-name-color:
    light: "rgba(220, 134, 76, 0.48)"
    dark: "rgba(199, 205, 219, 0.48)"
hero:
  name: "Hero 运行时"
  text: "等级 3"
  tagline: "页面级 cssVars 仅影响当前页面作用域。"
  actions:
    - theme: brand
      text: "单一背景"
      link: /zh-CN/hero/matrix/backgroundSingle/index
features:
  - title: "页面作用域"
    details: "顶层 cssVars 仅应用于当前页面布局作用域。"
  - title: "非全局"
    details: "这些键不允许全局文档根样式修改。"
title: "等级 3：页面级 CSS 变量"
description: "等级 3：页面级 CSS 变量 的英雄矩阵配置展示与实践说明。"
priority: 30
---
# 等级 3：页面级 CSS 变量

主要关注点：顶层页面作用域 CSS 变量约定。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
cssVars:
  --vp-home-hero-name-color:
    light: "rgba(220, 134, 76, 0.48)"
    dark: "rgba(199, 205, 219, 0.48)"
hero:
  name: "Hero 运行时"
  text: "等级 3"
  tagline: "页面级 cssVars 仅影响当前页面作用域。"
  actions:
    - theme: brand
      text: "单一背景"
      link: /zh-CN/hero/matrix/backgroundSingle/index
features:
  - title: "页面作用域"
    details: "顶层 cssVars 仅应用于当前页面布局作用域。"
  - title: "非全局"
    details: "这些键不允许全局文档根样式修改。"
---
```

## 配置说明

`cssVars` 允许在页面级别自定义 CSS 变量，支持主题感知的值配置。

### CSS 变量格式

```yaml
cssVars:
  --变量名:
    light: "亮色主题值"
    dark: "暗色主题值"
```

### 常用 CSS 变量

| 变量名 | 说明 |
|--------|------|
| `--vp-home-hero-name-color` | Hero 名称颜色 |
| `--vp-home-hero-name-background` | Hero 名称背景渐变 |
| `--vp-home-hero-image-background-image` | Hero 图片背景 |
| `--vp-c-brand-1` | 品牌主色 |
| `--vp-c-brand-2` | 品牌次色 |

## 完整 Frontmatter

```yaml
---
layout: home
cssVars:
  --vp-home-hero-name-color:
    light: "rgba(220, 134, 76, 0.48)"
    dark: "rgba(199, 205, 219, 0.48)"
hero:
  name: "Hero 运行时"
  text: "等级 3"
  tagline: "页面级 cssVars 仅影响当前页面作用域。"
  actions:
    - theme: brand
      text: "单一背景"
      link: /zh-CN/hero/matrix/backgroundSingle/index
features:
  - title: "页面作用域"
    details: "顶层 cssVars 仅应用于当前页面布局作用域。"
  - title: "非全局"
    details: "这些键不允许全局文档根样式修改。"
---
```

## 特点

1. **作用域隔离** - CSS 变量仅影响当前页面
2. **主题感知** - 支持为亮色/暗色主题设置不同值
3. **安全修改** - 不会污染全局样式

## 高级用法：名称渐变效果

```yaml
cssVars:
  --vp-home-hero-name-color: transparent
  --vp-home-hero-name-background:
    light: "-webkit-linear-gradient(120deg, rgba(189, 52, 254, 1) 30%, rgba(71, 202, 255, 1))"
    dark: "-webkit-linear-gradient(120deg, rgba(189, 52, 254, 1) 30%, rgba(71, 202, 255, 1))"
```

这将使 Hero 名称显示渐变色效果。