---
layout: home
hero:
    name: "Particles Background"
    text: "Color and Opacity"
    tagline: "Reference for rgba-first particle color configuration."
    background:
        type: particles
        particles:
            type: custom
            count: 280
            appearance:
                size: 0.11
                type: circle
                colorMode: palette
                randomColorChance: 0.82
                palette:
                    - "rgba(72, 113, 228, 1)"
                    - "rgba(132, 102, 238, 1)"
                    - "rgba(242, 122, 168, 1)"
                areaColor:
                    axis: y
                    colors:
                        - "rgba(72, 113, 228, 1)"
                        - "rgba(136, 120, 236, 1)"
                        - "rgba(248, 155, 128, 1)"
                color:
                    light: "rgba(72, 113, 228, 1)"
                    dark: "rgba(192, 214, 255, 1)"
                opacity:
                    light: 0.58
                    dark: 0.86
            movement:
                speed:
                    min: 0.06
                    max: 0.14
                turbulence: 0.18
                tiltVariance: 0.12
    colors:
        title:
            light: "rgba(20, 30, 52, 0.96)"
            dark: "rgba(255, 255, 255, 1)"
        text:
            light: "rgba(20, 30, 52, 0.96)"
            dark: "rgba(255, 255, 255, 1)"
        tagline:
            light: "rgba(52, 72, 108, 0.92)"
            dark: "rgba(210, 218, 235, 0.92)"
    actions:
        - theme: brand
          text: "Particles Contract"
          link: /en-US/hero/matrix/backgroundSingle/particles/particlesConfig
features:
    - title: "rgba Convention"
      details: "All particle color-related fields should use rgba(...) strings."
    - title: "Random Draws"
      details: "Use colorMode=random/palette with randomColorChance for partial random particles."
    - title: "Area Mapping"
      details: "Use colorMode=area with areaColor axis + colors in rgba format."
title: "Particles Color and Opacity"
description: "rgba-first color and opacity formats for hero.background.particles."
priority: 16
---
# Particles Color and Opacity

Primary focus: `rgba(...)` for `particles.color`, `particles.appearance.color`, `appearance.palette`, and `appearance.areaColor.colors`.

## Showcase Pages

- [Particles Custom Textures](./customTextures)
- [Particles Full Showcase](./fullShowcase)

## Value Resolution Order

Runtime reads values in this order:

1. `particles.appearance.color` (preferred)
2. `particles.color` (fallback alias)

Opacity follows the same pattern:

1. `particles.appearance.opacity` (preferred)
2. `particles.opacity` (fallback alias)

## Supported Color Formats (Project Convention)

| Format | Example | Notes |
| --- | --- | --- |
| `rgba` string | `"rgba(99, 102, 241, 1)"` | Preferred and documented default for all particle color fields. |
| `ThemeValue<RgbaColor>` | `{ light: "rgba(...)" , dark: "rgba(...)" }` | Theme-aware light/dark color mapping. |

`RgbaColor` = `rgba(r, g, b, a)` string.

## Color Distribution Modes (`appearance.colorMode`)

| Mode | Behavior |
| --- | --- |
| `solid` | All particles use base color (`appearance.color` or `particles.color`). |
| `random` | Per-spawn hue/lightness randomization around base color. |
| `palette` | Per-spawn random pick from `appearance.palette`. |
| `area` | Color sampled by position from `appearance.areaColor.colors`. |

### Random on some particles only

Use `appearance.randomColorChance` (`0..1`) with `random` or `palette`:

```yaml
particles:
    appearance:
        colorMode: palette
        randomColorChance: 0.35
        palette:
            - "rgba(91, 123, 232, 1)"
            - "rgba(143, 116, 248, 1)"
            - "rgba(241, 124, 179, 1)"
```

### Area color mapping

```yaml
particles:
    appearance:
        colorMode: area
        areaColor:
            axis: x # x | y | z | radius
            colors:
                - "rgba(79, 115, 232, 1)"
                - "rgba(138, 105, 239, 1)"
                - "rgba(239, 134, 168, 1)"
```

## Compile-Safe Examples

### 1) Single rgba color

```yaml
particles:
    appearance:
        color: "rgba(99, 102, 241, 1)"
        opacity: 0.64
```

### 2) Theme-synced rgba + opacity

```yaml
particles:
    appearance:
        color:
            light: "rgba(72, 113, 228, 1)"
            dark: "rgba(192, 214, 255, 1)"
            value: "rgba(116, 148, 236, 1)"
        opacity:
            light: 0.58
            dark: 0.86
            value: 0.72
```

### 3) Alias usage (valid but less preferred)

```yaml
particles:
    color:
        light: "rgba(91, 123, 232, 1)"
        dark: "rgba(208, 225, 255, 1)"
    opacity:
        light: 0.5
        dark: 0.82
```

## Invalid Keys (No Runtime Effect)

| Invalid key | Why |
| --- | --- |
| `particles.colorType` | Not consumed by runtime. |
| `particles.colors` | Not consumed by runtime. |
| `particles.theme` | Not a recognized particles object. |
| `particles.appearance.frameType` | Not part of particles appearance contract. |
