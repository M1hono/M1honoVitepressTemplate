---
layout: home
hero:
    name: "单一背景"
    text: "纯色"
    tagline: "从静态纯色背景开始，确保稳定的前景对比。"
    background:
        type: color
        color:
            solid:
                light: "rgba(55, 90, 160, 1)"
                dark: "rgba(83, 99, 129, 1)"
    colors:
        title:
            light: "rgba(255, 255, 255, 1)"
            dark: "rgba(255, 255, 255, 1)"
        tagline:
            light: "rgba(221, 228, 240, 1)"
            dark: "rgba(204, 204, 204, 1)"
        navText:
            light: "rgba(255, 255, 255, 1)"
            dark: "rgba(255, 255, 255, 1)"
        navTextScrolled:
            light: "rgba(26, 26, 46, 1)"
            dark: "rgba(224, 224, 224, 1)"
        navTextHover:
            light: "rgba(248, 251, 255, 1)"
            dark: "rgba(255, 255, 255, 1)"
        searchBackground:
            light: "rgba(255, 255, 255, 0.16)"
            dark: "rgba(8, 12, 26, 0.46)"
        searchHoverBackground:
            light: "rgba(255, 255, 255, 0.22)"
            dark: "rgba(8, 12, 26, 0.58)"
        searchTextMuted:
            light: "rgba(255, 255, 255, 0.92)"
            dark: "rgba(226, 236, 255, 0.86)"
        searchBorder:
            light: "rgba(255, 255, 255, 0.36)"
            dark: "rgba(164, 184, 224, 0.38)"
        searchKeyBackground:
            light: "rgba(255, 255, 255, 0.12)"
            dark: "rgba(255, 255, 255, 0.08)"
        searchKeyText:
            light: "rgba(255, 255, 255, 0.9)"
            dark: "rgba(236, 242, 255, 0.88)"
    actions:
        - theme: brand
          text: "渐变颜色"
          link: /zh-CN/hero/matrix/backgroundSingle/color/gradientColors
features:
    - title: "纯色背景"
      details: "简单稳定的纯色背景方案。"
    - title: "单页导航/搜索配色"
      details: "使用 hero.colors.nav* / hero.colors.search* 直接配置顶部导航和搜索框。"
    - title: "渐变扩展"
      details: "支持线性/径向/锥形渐变。"
title: "单一纯色背景"
description: "单一纯色背景 的英雄矩阵配置展示与实践说明。"
priority: 10
---

# 单一纯色背景

主要关注点：`hero.background.type=color`。

## 页面

- [纯色背景](./) - 基础纯色背景
- [渐变颜色](./gradientColors) - 新版渐变契约 + 旧版兼容
- [主题同步](./themeSyncColors) - 亮色/暗色模式颜色

## 单色背景页面的导航/搜索配置

使用 `hero.colors.nav*` / `hero.colors.search*` 可直接配置导航栏与搜索框颜色。

```yaml
hero:
    colors:
        navText: "rgba(255, 255, 255, 1)"
        navTextScrolled: "rgba(26, 26, 46, 1)"
        navTextHover: "rgba(255, 255, 255, 1)"
        navBackground: "rgba(30,45,90,0.72)"
        searchBackground: "rgba(255,255,255,0.16)"
        searchHoverBackground: "rgba(255,255,255,0.22)"
        searchText: "rgba(255, 255, 255, 1)"
        searchTextMuted: "rgba(255,255,255,0.92)"
        searchBorder: "rgba(255,255,255,0.36)"
        searchKeyBackground: "rgba(255,255,255,0.12)"
        searchKeyText: "rgba(255,255,255,0.9)"
```

| 键分组 | 键 |
| --- | --- |
| 导航栏（`hero.colors`） | `navText`、`navTextScrolled`、`navTextHover`、`navTextHoverScrolled`、`navBackground`、`navBackgroundScrolled` |
| 搜索框（`hero.colors`） | `searchBackground`、`searchBackgroundScrolled`、`searchHoverBackground`、`searchHoverBackgroundScrolled`、`searchText`、`searchTextScrolled`、`searchTextMuted`、`searchTextMutedScrolled`、`searchBorder`、`searchBorderScrolled`、`searchKeyBackground`、`searchKeyBackgroundScrolled`、`searchKeyText`、`searchKeyTextScrolled` |
