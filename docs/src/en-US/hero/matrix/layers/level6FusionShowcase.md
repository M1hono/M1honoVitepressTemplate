---
layout: home
hero:
  name: "Layers"
  text: "Level 6"
  tagline: "Full fusion showcase with image + color + shader + particles, plus floating overlays and a 3D model hero image."
  background:
    opacity: 1
    brightness: 0.96
    contrast: 1.04
    saturation: 1.08
    layers:
      - type: image
        zIndex: 1
        image:
          light: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80"
          dark: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2000&q=80"
          size: cover
          position: center
      - type: color
        zIndex: 2
        opacity: 0.34
        color:
          gradient:
            enabled: true
            type: linear
            direction: 145deg
            stops:
              - color:
                  light: "rgba(17, 44, 96, 0.92)"
                  dark: "rgba(8, 19, 42, 0.96)"
                position: "0%"
              - color:
                  light: "rgba(35, 82, 168, 0.82)"
                  dark: "rgba(24, 58, 126, 0.86)"
                position: "52%"
              - color:
                  light: "rgba(87, 137, 224, 0.76)"
                  dark: "rgba(58, 94, 172, 0.8)"
                position: "100%"
      - type: shader
        zIndex: 3
        opacity: 0.42
        blend: screen
        shader:
          type: galaxy
          speed: 0.62
          uniforms:
            uColor1:
              type: color
              value:
                light: "rgba(20, 47, 112, 1)"
                dark: "rgba(10, 24, 64, 1)"
            uColor2:
              type: color
              value:
                light: "rgba(81, 129, 235, 1)"
                dark: "rgba(58, 98, 190, 1)"
            uColor3:
              type: color
              value:
                light: "rgba(228, 238, 255, 1)"
                dark: "rgba(168, 198, 255, 1)"
      - type: particles
        zIndex: 4
        opacity: 0.88
        blend: screen
        particles:
          type: custom
          count: 360
          spread: 4.4
          appearance:
            size: 0.11
            type: star
            colorMode: palette
            randomColorChance: 0.72
            palette:
              - "rgba(80, 122, 236, 1)"
              - "rgba(143, 114, 247, 1)"
              - "rgba(245, 153, 180, 1)"
            color:
              light: "rgba(80, 122, 236, 1)"
              dark: "rgba(196, 220, 255, 1)"
            opacity:
              light: 0.56
              dark: 0.84
          movement:
            speed:
              min: 0.08
              max: 0.22
            direction: [0.04, -0.46, 0.05]
            gravity: -0.01
            turbulence: 0.24
            tiltVariance: 0.14
          lifecycle:
            respawn: true
          area:
            type: box
            size: [9, 5, 9]
            position: [0, 1, 0]
  image:
    type: model3d
    model3d:
      src: /models/duck.glb
      fitPadding: 1.28
      animation:
        enabled: true
        type: float
      interaction:
        enabled: true
        autoRotate: true
        autoRotateSpeed: 0.72
    frame:
      shape: rounded
      width: 440px
      height: 340px
      radius: 24px
      border: "1px solid rgba(148, 163, 184, 0.45)"
      background:
        light: "rgba(255, 255, 255, 0.8)"
        dark: "rgba(8, 16, 32, 0.66)"
      shadow:
        light: "0 20px 50px rgba(15, 23, 42, 0.22)"
        dark: "0 20px 50px rgba(2, 6, 18, 0.62)"
  floating:
    enabled: true
    opacity: 0.9
    density: 12
    blur: 1
    gradients:
      - "linear-gradient(120deg, rgba(20, 94, 186, 1) 0%, rgba(76, 138, 226, 1) 100%)"
      - "linear-gradient(120deg, rgba(19, 145, 129, 1) 0%, rgba(77, 196, 170, 1) 100%)"
      - "linear-gradient(120deg, rgba(171, 122, 36, 1) 0%, rgba(232, 182, 90, 1) 100%)"
    motion:
      enabled: true
      style: drift
      durationMin: 11
      durationMax: 24
      drift: 38
    items:
      - type: card
        title: "Layer Stack"
        description: "Image + Color + Shader + Particles"
        x: "9%"
        y: "20%"
      - type: badge
        text: "Model3D"
        icon: "🧩"
        x: "66%"
        y: "14%"
      - type: image
        src: /logo.png
        alt: Template Logo
        x: "84%"
        y: "62%"
        width: "96px"
      - type: stat
        value: "6"
        title: "Render Surfaces"
        x: "60%"
        y: "56%"
      - type: code
        code: "hero.background.layers[3].type: particles"
        x: "24%"
        y: "74%"
      - type: shape
        shape: hexagon
        x: "88%"
        y: "36%"
        size: "68px"
      - type: text
        text: "Showcase Ready"
        x: "40%"
        y: "15%"
        colorType: random-gradient
  colors:
    title:
      light: "rgba(248, 251, 255, 1)"
      dark: "rgba(248, 251, 255, 1)"
    text:
      light: "rgba(233, 241, 255, 1)"
      dark: "rgba(233, 241, 255, 1)"
    tagline:
      light: "rgba(209, 224, 245, 1)"
      dark: "rgba(209, 224, 245, 1)"
    searchBackground:
      light: "rgba(255, 255, 255, 0.08)"
      dark: "rgba(8, 16, 32, 0.12)"
    searchBackgroundScrolled:
      light: "rgba(255, 255, 255, 0.08)"
      dark: "rgba(8, 16, 32, 0.12)"
    searchHoverBackground:
      light: "rgba(255, 255, 255, 0.14)"
      dark: "rgba(8, 16, 32, 0.2)"
    searchHoverBackgroundScrolled:
      light: "rgba(255, 255, 255, 0.14)"
      dark: "rgba(8, 16, 32, 0.2)"
    searchText:
      light: "rgba(246, 250, 255, 1)"
      dark: "rgba(232, 242, 255, 1)"
    searchTextScrolled:
      light: "rgba(246, 250, 255, 1)"
      dark: "rgba(232, 242, 255, 1)"
    searchTextMuted:
      light: "rgba(221, 235, 255, 0.9)"
      dark: "rgba(190, 214, 248, 0.86)"
    searchTextMutedScrolled:
      light: "rgba(221, 235, 255, 0.9)"
      dark: "rgba(190, 214, 248, 0.86)"
    searchBorder:
      light: "rgba(216, 230, 255, 0.34)"
      dark: "rgba(150, 184, 238, 0.42)"
    searchBorderScrolled:
      light: "rgba(216, 230, 255, 0.34)"
      dark: "rgba(150, 184, 238, 0.42)"
    searchKeyBackground:
      light: "rgba(255, 255, 255, 0.12)"
      dark: "rgba(14, 31, 64, 0.34)"
    searchKeyBackgroundScrolled:
      light: "rgba(255, 255, 255, 0.12)"
      dark: "rgba(14, 31, 64, 0.34)"
    searchKeyText:
      light: "rgba(241, 248, 255, 0.92)"
      dark: "rgba(208, 226, 255, 0.9)"
    searchKeyTextScrolled:
      light: "rgba(241, 248, 255, 0.92)"
      dark: "rgba(208, 226, 255, 0.9)"
  actions:
    - theme: brand
      text: "All Hero Config"
      link: /en-US/hero/AllConfig
    - theme: alt
      text: "Layers Index"
      link: /en-US/hero/matrix/layers
features:
  - title: "Complete Layer Stack"
    details: "Combines image, color, shader, and particles in one layered background."
  - title: "Model3D Foreground"
    details: "Hero media slot uses a framed 3D model with auto-rotate interaction."
  - title: "Floating Overlay"
    details: "Cards, badges, code, and status elements float above all render layers."
  - title: "rgba-First Particle Colors"
    details: "Particle palette and base colors use rgba format for direct tuning."
title: "Layers Level 6: Full Fusion Showcase"
description: "One-page showcase combining all major hero systems together."
priority: 60
---

# Layers Level 6: Full Fusion Showcase

Primary focus: a single page that combines all major hero surfaces in one composition.

## Surfaces Included

| Surface | Config path |
| --- | --- |
| Image background layer | `hero.background.layers[].type: image` |
| Color overlay layer | `hero.background.layers[].type: color` |
| Shader animation layer | `hero.background.layers[].type: shader` |
| Particle layer | `hero.background.layers[].type: particles` |
| Model hero image | `hero.image.type: model3d` |
| Floating overlay elements | `hero.floating.*` |

## API Keys Demonstrated

| Key | All Config |
|---|---|
| `hero.background.layers[]` | [Layers Root](../../../AllConfig) |
| `layers[].zIndex/opacity/blend` | [Layers Root](../../../AllConfig) |
| `layers[].image/color/shader/particles` | [Layers Root](../../../AllConfig) |
| `hero.image.model3d` | [Image Root](../../../AllConfig) |
| `hero.floating.*` | [Floating Root](../../../AllConfig) |

## Notes

- This page is intentionally dense to validate cross-system compatibility.
- Particle colors use `rgba(...)` strings to match the new color-editing convention.
- `movement.tiltVariance` is set for better small-particle directional variety.
