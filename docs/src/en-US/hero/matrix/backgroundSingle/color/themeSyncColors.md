---
layout: home
hero:
    name: "Single Background"
    text: "Theme Sync"
    tagline: "Colors that automatically adapt to light/dark mode."
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
          text: "Global Controls"
          link: /en-US/hero/matrix/backgroundSingle/globalControls
features:
    - title: "Theme Values"
      details: "Use light/dark objects for theme-aware colors."
    - title: "Automatic"
      details: "Colors switch automatically based on theme."
    - title: "Search Box Sync"
      details: "Search UI follows light/dark palettes through color.search.*"
title: "Theme Sync Colors"
description: "Showcase and configuration for theme-synced colors."
priority: 16
---

# Theme Sync Colors

Primary focus: Light/dark theme-aware color configuration.

## Actual Frontmatter

```yaml
hero:
    background:
        type: color
        color:
            solid:
                light: "rgba(248, 250, 252, 1)"
                dark: "rgba(15, 23, 42, 1)"
            nav:
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

## Nav/Search Keys (Full, `hero.colors.*`)

| Key | Description |
| --- | --- |
| `hero.colors.navText(.light/.dark)` | Nav text color |
| `hero.colors.navTextScrolled(.light/.dark)` | Nav text color after scroll |
| `hero.colors.navTextHover(.light/.dark)` | Nav hover/active text color |
| `hero.colors.navTextHoverScrolled(.light/.dark)` | Nav hover/active color after scroll |
| `hero.colors.navBackground(.light/.dark)` | Nav background color |
| `hero.colors.navBackgroundScrolled(.light/.dark)` | Nav background after scroll |
| `hero.colors.searchBackground(.light/.dark)` | Search button background |
| `hero.colors.searchBackgroundScrolled(.light/.dark)` | Search background after scroll |
| `hero.colors.searchHoverBackground(.light/.dark)` | Search hover background |
| `hero.colors.searchHoverBackgroundScrolled(.light/.dark)` | Search hover background after scroll |
| `hero.colors.searchText(.light/.dark)` | Search text/icon color |
| `hero.colors.searchTextScrolled(.light/.dark)` | Search text/icon after scroll |
| `hero.colors.searchTextMuted(.light/.dark)` | Search placeholder/muted text |
| `hero.colors.searchTextMutedScrolled(.light/.dark)` | Search placeholder after scroll |
| `hero.colors.searchBorder(.light/.dark)` | Search border color |
| `hero.colors.searchBorderScrolled(.light/.dark)` | Search border after scroll |
| `hero.colors.searchKeyBackground(.light/.dark)` | Keyboard chip background |
| `hero.colors.searchKeyBackgroundScrolled(.light/.dark)` | Keyboard chip background after scroll |
| `hero.colors.searchKeyText(.light/.dark)` | Keyboard chip text |
| `hero.colors.searchKeyTextScrolled(.light/.dark)` | Keyboard chip text after scroll |
