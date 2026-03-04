---
layout: home
hero:
    name: "Particles Background"
    text: "Runtime Contract"
    tagline: "Canonical key map for hero.background.particles, aligned with ParticleSystem runtime."
    background:
        type: particles
        particles:
            enabled: true
            type: custom
            count: 360
            spread: 3.8
            appearance:
                size: 0.11
                type: star
                colorMode: area
                areaColor:
                    axis: x
                    colors:
                        - "rgba(62, 96, 210, 1)"
                        - "rgba(132, 102, 238, 1)"
                        - "rgba(242, 122, 168, 1)"
                color:
                    light: "rgba(62, 96, 210, 1)"
                    dark: "rgba(190, 216, 255, 1)"
                opacity:
                    light: 0.58
                    dark: 0.82
            movement:
                speed:
                    min: 0.05
                    max: 0.16
                direction: [0.06, -0.52, 0.04]
                gravity: -0.01
                turbulence: 0.22
            lifecycle:
                respawn: true
            area:
                type: box
                size: [8, 4, 8]
                position: [0, 0.8, 0]
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
          text: "Color Formats"
          link: /en-US/hero/matrix/backgroundSingle/particles/particlesColor
features:
    - title: "Top-Level Keys"
      details: "enabled, type, count, spread, size/color/opacity/speed aliases."
    - title: "Nested Objects"
      details: "appearance, movement, lifecycle, and area with strict formats."
    - title: "Color Modes"
      details: "solid, random, palette, and area modes are runtime-supported."
title: "Particles Runtime Contract"
description: "Complete key contract for hero.background.particles."
priority: 15
---
# Particles Runtime Contract

Primary focus: exact key formats consumed by `ParticleSystem.vue`.

## Showcase Pages

- [Particles Custom Textures](./customTextures)
- [Particles Full Showcase](./fullShowcase)

## Canonical Key Path

```yaml
hero:
    background:
        type: particles
        particles:
            ...
```

## Top-Level Keys (`hero.background.particles.*`)

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `enabled` | `boolean` | `true` | Disables renderer when `false`. |
| `type` | `'stars' \| 'snow' \| 'rain' \| 'bubbles' \| 'sparks' \| 'custom'` | `stars` | Preset profile with type-based defaults. |
| `count` | `number` | `420` | Particle count, clamped to `40..deviceLimit` (roughly `600-2200`). |
| `spread` | `number` | `3` | Distribution scale, clamped to `1..12`. |
| `size` | `number` | by `type` | Alias of `appearance.size`. |
| `color` | `RgbaColor \| ThemeValue<RgbaColor>` | by `type` | Alias of `appearance.color`. |
| `opacity` | `number \| ThemeValue<number>` | by `type` | Alias of `appearance.opacity`, clamped to `0.04..1`. |
| `speed` | `number \| { min?: number; max?: number }` | by `type` | Alias of `movement.speed`. |

`RgbaColor` = `rgba(r, g, b, a)` string.

## Type Domains (Important)

| Key | Domain |
| --- | --- |
| `particles.type` | Motion/behavior preset (stars/snow/rain/bubbles/sparks/custom). |
| `particles.appearance.type` | Visual sprite shape (`dot/circle/square/star/custom`). |

Use `particles.type` to control movement defaults.  
Use `appearance.type` (or alias `appearance.shape`) to control the rendered point look.

## Nested Contracts

### `appearance`

| Key | Type | Default | Notes |
| --- | --- | --- | --- |
| `appearance.size` | `number` | by `type` | Runtime-normalized to render size. |
| `appearance.type` | `'dot' \| 'circle' \| 'square' \| 'star' \| 'custom'` | by `type` | Visual sprite type. `dot` maps to `circle`. |
| `appearance.shape` | `'dot' \| 'circle' \| 'square' \| 'star' \| 'custom'` | by `type` | Backward-compatible alias of `appearance.type`. |
| `appearance.texture` | `string \| ThemeValue<string>` | unset | Path/URL, loaded as point texture. |
| `appearance.textureColorMode` | `'mask' \| 'image'` | `'mask'` | `mask`: color comes from rgba settings. `image`: keep texture original colors. |
| `appearance.color` | `RgbaColor \| ThemeValue<RgbaColor>` | by `type` | Preferred color key. |
| `appearance.opacity` | `number \| ThemeValue<number>` | by `type` | Preferred opacity key. |
| `appearance.colorMode` | `'solid' \| 'random' \| 'palette' \| 'area'` | auto | Color distribution strategy. |
| `appearance.randomColorChance` | `number` | `1` | Chance for random/palette color per spawn (`0..1`). |
| `appearance.palette` | `RgbaColor[]` | `[]` | Palette source for `palette` mode. |
| `appearance.areaColor.axis` | `'x' \| 'y' \| 'z' \| 'radius'` | `x` | Axis used by `area` mode. |
| `appearance.areaColor.colors` | `RgbaColor[]` | `[]` | Area gradient palette. |

### `movement`

| Key | Type | Default | Notes |
| --- | --- | --- | --- |
| `movement.speed` | `number \| { min?: number; max?: number }` | by `type` | Number expands to approx `0.75x..1.25x`. |
| `movement.direction` | `[number, number, number]` | by `type` | Direction vector for velocity initialization. |
| `movement.gravity` | `number` | by `type` | Clamped to `-1..1`. |
| `movement.turbulence` | `number` | by `type` | Clamped to `0..2`. |
| `movement.tiltVariance` | `number` | auto (small particle boost) | Adds positive/negative lateral tilt variance, useful for tiny particles. |

### `lifecycle`

| Key | Type | Default | Notes |
| --- | --- | --- | --- |
| `lifecycle.respawn` | `boolean` | `true` | `false` makes out-of-bounds particles bounce instead of respawn. |

### `area`

| Key | Type | Default | Notes |
| --- | --- | --- | --- |
| `area.type` | `'box' \| 'sphere' \| 'plane'` | by `type` | Spawn volume geometry. |
| `area.size` | `number \| [number, number, number]` | by `type` | Number expands to `[n, n, n]`. |
| `area.position` | `[number, number, number]` | by `type` | Spawn volume center. |

## Full Reference Template

```yaml
hero:
    background:
        type: particles
        particles:
            enabled: true
            type: custom
            count: 360
            spread: 3.8

            appearance:
                size: 0.11
                type: star
                textureColorMode: mask
                colorMode: palette
                randomColorChance: 0.72
                palette:
                    - "rgba(62, 96, 210, 1)"
                    - "rgba(132, 102, 238, 1)"
                    - "rgba(242, 122, 168, 1)"
                areaColor:
                    axis: x
                    colors:
                        - "rgba(62, 96, 210, 1)"
                        - "rgba(132, 102, 238, 1)"
                        - "rgba(242, 122, 168, 1)"
                texture:
                    light: "/textures/particle-light.png"
                    dark: "/textures/particle-dark.png"
                color:
                    light: "rgba(62, 96, 210, 1)"
                    dark: "rgba(190, 216, 255, 1)"
                opacity:
                    light: 0.58
                    dark: 0.82

            movement:
                speed:
                    min: 0.05
                    max: 0.16
                direction: [0.06, -0.52, 0.04]
                gravity: -0.01
                turbulence: 0.22
                tiltVariance: 0.1

            lifecycle:
                respawn: true

            area:
                type: box
                size: [8, 4, 8]
                position: [0, 0.8, 0]
```

## Preset Type Examples

### `stars`

```yaml
particles:
    type: stars
    count: 280
    spread: 3.4
```

### `snow`

```yaml
particles:
    type: snow
    count: 260
    movement:
        turbulence: 0.55
```

### `rain`

```yaml
particles:
    type: rain
    count: 460
    area:
        type: plane
        size: [10, 2.5, 10]
```

### `bubbles`

```yaml
particles:
    type: bubbles
    count: 220
    movement:
        direction: [0, 1.1, 0]
```

### `sparks`

```yaml
particles:
    type: sparks
    count: 240
    movement:
        turbulence: 0.75
```

### `custom`

```yaml
particles:
    type: custom
    appearance:
        type: custom
        texture: "/textures/custom-particle.png"
```

## Invalid Keys to Remove

| Invalid key | Why |
| --- | --- |
| `particles.colorType` | Not read by runtime. |
| `particles.colors` | Not read by runtime. |
| `particles.theme` | Not a supported particles contract. |
| `particles.appearance.frameType` | Not part of particles appearance contract. |
