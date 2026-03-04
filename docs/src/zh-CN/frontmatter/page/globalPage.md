---
title: 全局页面 Frontmatter
description: 页面级 frontmatter 键，用于控制当前页面行为，支持页面级 cssVars。
priority: 10
---
# 全局页面 Frontmatter

## 核心键

| 键 | 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| `cssVars` | `Record<string, value | { light, dark, value }>` | `undefined` | 将 CSS 自定义属性应用到当前页面作用域。 |
| `layoutClass` | `string` | `undefined` | 在布局包装器上添加额外类名，用于页面特定样式。 |
| `layout` | `string` | VitePress 默认值 | 标准 VitePress 布局选择。 |
| `isHome` | `boolean` | 由布局推断 | 用于某些主题组件检测首页上下文。 |

## 示例

```yaml
layoutClass: docs-premium
cssVars:
  --page-accent:
    light: "rgba(63, 99, 214, 1)"
    dark: "rgba(142, 167, 255, 1)"
  --surface-soft:
    light: "rgba(63, 99, 214, 0.08)"
    dark: "rgba(142, 167, 255, 0.16)"
```

## 作用域划分

- 页面作用域：`cssVars`
- Hero 背景作用域：`hero.background.cssVars`
- Hero 图层作用域：`hero.background.layers[*].cssVars`