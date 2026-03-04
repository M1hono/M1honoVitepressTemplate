---
layout: home
hero:
    name: "单一背景"
    text: "渐变颜色"
    tagline: "使用渐变颜色实现动态视觉效果。"
    background:
        type: color
        color:
            gradient:
                enabled: true
                type: linear
                direction: 135deg
                stops:
                    - color: "rgba(99, 102, 241, 1)"
                      position: 0%
                    - color: "rgba(168, 85, 247, 1)"
                      position: 52%
                    - color: "rgba(236, 72, 153, 1)"
                      position: 100%
    typography:
        type: grouped-float
        motion:
            intensity: 0.86
            title: { x: 10, y: -6, scale: 1.09 }
            text: { x: 12, y: -4, scale: 1.11 }
            tagline: { x: 10, y: 1, scale: 1.06 }
            image: { x: 15, y: -9, scale: 1.1 }
            transitionDuration: 700
            transitionDelayStep: 58
            transitionEasing: "cubic-bezier(0.16, 1, 0.3, 1)"
    colors:
        title: "rgba(255, 255, 255, 1)"
        tagline:
            light: "rgba(224, 229, 236, 1)"
            dark: "rgba(208, 213, 220, 1)"
        navText: "rgba(255, 255, 255, 1)"
        navTextScrolled:
            light: "rgba(26, 26, 46, 1)"
            dark: "rgba(224, 224, 224, 1)"
        navTextHover:
            light: "rgba(255, 255, 255, 1)"
            dark: "rgba(255, 255, 255, 1)"
        searchBackground: "rgba(255, 255, 255, 0.16)"
        searchHoverBackground: "rgba(255, 255, 255, 0.24)"
        searchText: "rgba(255, 255, 255, 1)"
        searchTextMuted: "rgba(255, 255, 255, 0.92)"
        searchBorder: "rgba(255, 255, 255, 0.34)"
        searchKeyBackground: "rgba(255, 255, 255, 0.14)"
        searchKeyText: "rgba(255, 255, 255, 0.92)"
    actions:
        - theme: brand
          text: "主题同步"
          link: /zh-CN/hero/matrix/backgroundSingle/color/themeSyncColors
features:
    - title: "渐变支持"
      details: "支持线性/径向/锥形渐变与主题色标。"
    - title: "方向控制"
      details: "可设置方向角度与渐变几何参数。"
    - title: "搜索框配色"
      details: "可在 hero.colors.search* 下配置搜索框颜色。"
title: "渐变颜色"
description: "渐变颜色背景的配置展示与实践说明。"
priority: 15
---

# 渐变颜色

主要关注点：`hero.background.type=color` 的新版渐变契约。

## 推荐写法（新版）

```yaml
hero:
    background:
        type: color
        color:
            gradient:
                enabled: true
                type: linear # linear | radial | conic
                direction: 135deg
                stops:
                    - color: "rgba(99, 102, 241, 1)"
                      position: 0%
                    - color: "rgba(168, 85, 247, 1)"
                      position: 52%
                    - color: "rgba(236, 72, 153, 1)"
                      position: 100%
```

## 兼容写法（旧版）

```yaml
hero:
    background:
        type: color
        color:
            gradient: ["rgba(99, 102, 241, 1)", "rgba(168, 85, 247, 1)", "rgba(236, 72, 153, 1)"]
            direction: 135
```

## 单色背景页面导航/搜索键位（`hero.colors.*`）

| 分组 | 键 | 说明 |
| --- | --- | --- |
| 导航栏 | `hero.colors.navText` | 导航文字颜色 |
| 导航栏 | `hero.colors.navTextScrolled` | 滚动后导航文字颜色 |
| 导航栏 | `hero.colors.navTextHover` | 导航悬停/激活文字颜色 |
| 导航栏 | `hero.colors.navTextHoverScrolled` | 滚动后导航悬停/激活文字颜色 |
| 导航栏 | `hero.colors.navBackground` | 导航背景色 |
| 导航栏 | `hero.colors.navBackgroundScrolled` | 滚动后导航背景色 |
| 搜索框 | `hero.colors.searchBackground` | 搜索按钮背景色 |
| 搜索框 | `hero.colors.searchBackgroundScrolled` | 滚动后搜索背景色 |
| 搜索框 | `hero.colors.searchHoverBackground` | 搜索按钮悬停背景色 |
| 搜索框 | `hero.colors.searchHoverBackgroundScrolled` | 滚动后搜索悬停背景色 |
| 搜索框 | `hero.colors.searchText` | 搜索文本/图标颜色 |
| 搜索框 | `hero.colors.searchTextScrolled` | 滚动后搜索文本/图标颜色 |
| 搜索框 | `hero.colors.searchTextMuted` | 搜索占位与弱化文本颜色 |
| 搜索框 | `hero.colors.searchTextMutedScrolled` | 滚动后搜索占位与弱化文本颜色 |
| 搜索框 | `hero.colors.searchBorder` | 搜索边框颜色 |
| 搜索框 | `hero.colors.searchBorderScrolled` | 滚动后搜索边框颜色 |
| 搜索框 | `hero.colors.searchKeyBackground` | 快捷键胶囊背景色 |
| 搜索框 | `hero.colors.searchKeyBackgroundScrolled` | 滚动后快捷键胶囊背景色 |
| 搜索框 | `hero.colors.searchKeyText` | 快捷键胶囊文字色 |
| 搜索框 | `hero.colors.searchKeyTextScrolled` | 滚动后快捷键胶囊文字色 |
