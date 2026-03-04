---
layout: home
hero:
    name: "Single Background"
    text: "Color"
    tagline: "Start with a static color background for stable hierarchy."
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
          text: "Gradient Colors"
          link: /en-US/hero/matrix/backgroundSingle/color/gradientColors
features:
    - title: "Solid Colors"
      details: "Simple solid color background."
    - title: "Single-Page Nav/Search Colors"
      details: "Use hero.colors.nav* / hero.colors.search* to style topbar and search box."
    - title: "Gradient"
      details: "Linear / radial / conic gradient backgrounds."
title: "Single Color Background"
description: "Color background configuration for hero section."
priority: 10
---

# Color Background

Use solid or gradient colors as hero background.

## Pages

- [Solid Colors](./) - Basic solid color background
- [Gradient Colors](./gradientColors) - Modern gradient contract + legacy compatibility
- [Theme Sync](./themeSyncColors) - Light/dark mode colors

## Nav/Search Configuration For Single-Color Pages

Use `hero.colors.nav*` and `hero.colors.search*` to style topbar + search on color background pages.

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

| Key Group | Keys |
| --- | --- |
| Nav (`hero.colors`) | `navText`, `navTextScrolled`, `navTextHover`, `navTextHoverScrolled`, `navBackground`, `navBackgroundScrolled` |
| Search (`hero.colors`) | `searchBackground`, `searchBackgroundScrolled`, `searchHoverBackground`, `searchHoverBackgroundScrolled`, `searchText`, `searchTextScrolled`, `searchTextMuted`, `searchTextMutedScrolled`, `searchBorder`, `searchBorderScrolled`, `searchKeyBackground`, `searchKeyBackgroundScrolled`, `searchKeyText`, `searchKeyTextScrolled` |
