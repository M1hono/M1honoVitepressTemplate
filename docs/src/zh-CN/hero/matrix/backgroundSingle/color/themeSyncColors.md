---
layout: home
hero:
    name: "单一背景"
    text: "主题同步"
    tagline: "颜色会自动适应亮色/暗色模式。"
    background:
        type: color
        color:
            solid:
                light: "rgba(248, 250, 252, 1)"
                dark: "rgba(15, 23, 42, 1)"
    colors:
        title:
            light: "rgba(15, 23, 42, 1)"
            dark: "rgba(248, 250, 252, 1)"
        tagline:
            light: "rgba(71, 85, 105, 1)"
            dark: "rgba(148, 163, 184, 1)"
        navText:
            light: "rgba(15, 23, 42, 1)"
            dark: "rgba(248, 250, 252, 1)"
        navTextScrolled:
            light: "rgba(15, 23, 42, 1)"
            dark: "rgba(248, 250, 252, 1)"
        navTextHover:
            light: "rgba(17, 24, 39, 1)"
            dark: "rgba(255, 255, 255, 1)"
        navTextHoverScrolled:
            light: "rgba(15, 23, 42, 1)"
            dark: "rgba(248, 250, 252, 1)"
        navBackground:
            light: "rgba(248, 250, 252, 0.78)"
            dark: "rgba(15, 23, 42, 0.78)"
        navBackgroundScrolled:
            light: "rgba(248, 250, 252, 0.92)"
            dark: "rgba(15, 23, 42, 0.92)"
        searchBackground:
            light: "rgba(15, 23, 42, 0.08)"
            dark: "rgba(248, 250, 252, 0.08)"
        searchBackgroundScrolled:
            light: "rgba(15, 23, 42, 0.12)"
            dark: "rgba(248, 250, 252, 0.14)"
        searchHoverBackground:
            light: "rgba(15, 23, 42, 0.12)"
            dark: "rgba(248, 250, 252, 0.14)"
        searchHoverBackgroundScrolled:
            light: "rgba(15, 23, 42, 0.18)"
            dark: "rgba(248, 250, 252, 0.2)"
        searchText:
            light: "rgba(15, 23, 42, 1)"
            dark: "rgba(248, 250, 252, 1)"
        searchTextScrolled:
            light: "rgba(15, 23, 42, 1)"
            dark: "rgba(248, 250, 252, 1)"
        searchTextMuted:
            light: "rgba(71, 85, 105, 1)"
            dark: "rgba(148, 163, 184, 1)"
        searchTextMutedScrolled:
            light: "rgba(51, 65, 85, 1)"
            dark: "rgba(203, 213, 225, 1)"
        searchBorder:
            light: "rgba(15, 23, 42, 0.16)"
            dark: "rgba(248, 250, 252, 0.22)"
        searchBorderScrolled:
            light: "rgba(15, 23, 42, 0.22)"
            dark: "rgba(248, 250, 252, 0.3)"
        searchKeyBackground:
            light: "rgba(15, 23, 42, 0.06)"
            dark: "rgba(248, 250, 252, 0.08)"
        searchKeyBackgroundScrolled:
            light: "rgba(15, 23, 42, 0.1)"
            dark: "rgba(248, 250, 252, 0.12)"
        searchKeyText:
            light: "rgba(51, 65, 85, 1)"
            dark: "rgba(203, 213, 225, 1)"
        searchKeyTextScrolled:
            light: "rgba(30, 41, 59, 1)"
            dark: "rgba(226, 232, 240, 1)"
    actions:
        - theme: brand
          text: "全局控制"
          link: /zh-CN/hero/matrix/backgroundSingle/globalControls
features:
    - title: "主题值"
      details: "使用 light/dark 对象实现主题感知颜色。"
    - title: "自动切换"
      details: "颜色会根据主题自动切换。"
    - title: "搜索框同步"
      details: "通过 color.search.* 让搜索框在亮/暗色下自动同步。"
title: "主题同步颜色"
description: "主题同步颜色的配置展示与实践说明。"
priority: 16
---

# 主题同步颜色

主要关注点：亮色/暗色主题感知颜色配置。

## 本页实际 Frontmatter

```yaml
hero:
    background:
        type: color
        color:
            solid:
                light: "rgba(248, 250, 252, 1)"
                dark: "rgba(15, 23, 42, 1)"
    colors:
        navText:
            light: "rgba(15, 23, 42, 1)"
            dark: "rgba(248, 250, 252, 1)"
        searchText:
            light: "rgba(15, 23, 42, 1)"
            dark: "rgba(248, 250, 252, 1)"
        searchTextMuted:
            light: "rgba(71, 85, 105, 1)"
            dark: "rgba(148, 163, 184, 1)"
```

## 导航/搜索键（完整，`hero.colors.*`）

| 键 | 说明 |
| --- | --- |
| `hero.colors.navText(.light/.dark)` | 导航文字颜色 |
| `hero.colors.navTextScrolled(.light/.dark)` | 滚动后导航文字颜色 |
| `hero.colors.navTextHover(.light/.dark)` | 导航悬停/激活文字颜色 |
| `hero.colors.navTextHoverScrolled(.light/.dark)` | 滚动后导航悬停/激活文字颜色 |
| `hero.colors.navBackground(.light/.dark)` | 导航背景色 |
| `hero.colors.navBackgroundScrolled(.light/.dark)` | 滚动后导航背景色 |
| `hero.colors.searchBackground(.light/.dark)` | 搜索按钮背景色 |
| `hero.colors.searchBackgroundScrolled(.light/.dark)` | 滚动后搜索背景色 |
| `hero.colors.searchHoverBackground(.light/.dark)` | 搜索悬停背景色 |
| `hero.colors.searchHoverBackgroundScrolled(.light/.dark)` | 滚动后搜索悬停背景色 |
| `hero.colors.searchText(.light/.dark)` | 搜索文本/图标颜色 |
| `hero.colors.searchTextScrolled(.light/.dark)` | 滚动后搜索文本/图标颜色 |
| `hero.colors.searchTextMuted(.light/.dark)` | 搜索占位与弱化文本颜色 |
| `hero.colors.searchTextMutedScrolled(.light/.dark)` | 滚动后搜索占位与弱化文本颜色 |
| `hero.colors.searchBorder(.light/.dark)` | 搜索边框颜色 |
| `hero.colors.searchBorderScrolled(.light/.dark)` | 滚动后搜索边框颜色 |
| `hero.colors.searchKeyBackground(.light/.dark)` | 快捷键胶囊背景色 |
| `hero.colors.searchKeyBackgroundScrolled(.light/.dark)` | 滚动后快捷键胶囊背景色 |
| `hero.colors.searchKeyText(.light/.dark)` | 快捷键胶囊文字色 |
| `hero.colors.searchKeyTextScrolled(.light/.dark)` | 滚动后快捷键胶囊文字色 |
