---
layout: home
hero:
    name: "Single Background"
    text: "Gradient Colors"
    tagline: "Use gradient colors for dynamic visual effects."
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
          text: "Theme Sync"
          link: /en-US/hero/matrix/backgroundSingle/color/themeSyncColors
features:
    - title: "Gradient Support"
      details: "Linear/radial/conic gradients with themed stops."
    - title: "Direction Control"
      details: "Set gradient angle or center/shape depending on gradient type."
    - title: "Search Box Styling"
      details: "Configure search colors under hero.colors.search*."
title: "Gradient Colors"
description: "Showcase and configuration for gradient color backgrounds."
priority: 15
---

# Gradient Colors

Primary focus: `hero.background.type=color` with the modern gradient contract.

## Modern Contract (Recommended)

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

## Legacy Contract (Still Supported)

```yaml
hero:
    background:
        type: color
        color:
            gradient: ["rgba(99, 102, 241, 1)", "rgba(168, 85, 247, 1)", "rgba(236, 72, 153, 1)"]
            direction: 135
```

## Nav/Search Keys For Color Background Pages (`hero.colors.*`)

| Group | Key | Description |
| --- | --- | --- |
| Nav | `hero.colors.navText` | Nav text color |
| Nav | `hero.colors.navTextScrolled` | Nav text color after scroll |
| Nav | `hero.colors.navTextHover` | Nav hover/active text color |
| Nav | `hero.colors.navTextHoverScrolled` | Nav hover/active color after scroll |
| Nav | `hero.colors.navBackground` | Nav background color |
| Nav | `hero.colors.navBackgroundScrolled` | Nav background color after scroll |
| Search | `hero.colors.searchBackground` | Search button background |
| Search | `hero.colors.searchBackgroundScrolled` | Search background after scroll |
| Search | `hero.colors.searchHoverBackground` | Search hover background |
| Search | `hero.colors.searchHoverBackgroundScrolled` | Search hover background after scroll |
| Search | `hero.colors.searchText` | Search text/icon color |
| Search | `hero.colors.searchTextScrolled` | Search text/icon color after scroll |
| Search | `hero.colors.searchTextMuted` | Search placeholder/muted color |
| Search | `hero.colors.searchTextMutedScrolled` | Search placeholder/muted after scroll |
| Search | `hero.colors.searchBorder` | Search border color |
| Search | `hero.colors.searchBorderScrolled` | Search border color after scroll |
| Search | `hero.colors.searchKeyBackground` | Keyboard key-chip background |
| Search | `hero.colors.searchKeyBackgroundScrolled` | Keyboard key-chip background after scroll |
| Search | `hero.colors.searchKeyText` | Keyboard key-chip text |
| Search | `hero.colors.searchKeyTextScrolled` | Keyboard key-chip text after scroll |
