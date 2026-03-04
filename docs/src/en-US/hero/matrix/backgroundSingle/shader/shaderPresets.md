---
layout: home
hero:
    name: "Shader Background"
    text: "Shader Presets"
    tagline: "Use built-in shader presets for animated backgrounds."
    background:
        type: shader
        shader:
            type: galaxy
    colors:
        title:
            light: "rgba(255, 255, 255, 1)"
            dark: "rgba(255, 255, 255, 1)"
        tagline:
            light: "rgba(224, 224, 224, 1)"
            dark: "rgba(204, 204, 204, 1)"
    actions:
        - theme: brand
          text: "Custom Shader"
          link: /en-US/hero/matrix/backgroundSingle/shader/customShader
features:
    - title: "Built-in Presets"
      details: "water, galaxy, plasma, noise, ripple, silk, and more."
    - title: "Animation"
      details: "Shaders animate automatically."
title: "Shader Presets"
description: "Use built-in shader presets."
priority: 15
---
# Shader Presets

Primary focus: Use built-in GLSL shader animations.

## Available Presets

| Preset | Description |
|--------|-------------|
| water | Animated water ripple effect |
| galaxy | Cosmic star field |
| plasma | Fluid plasma colors |
| noise | Static noise texture |
| ripple | Concentric ripple waves |
| silk | Soft flowing fabric-like gradients with lightweight cinematic grading |

## Actual Frontmatter

```yaml
---
layout: home
hero:
    background:
        type: shader
        shader:
            type: galaxy
---
```

## API Keys

| Key | Type | Description |
|-----|------|-------------|
| `hero.background.shader.type` | string | Built-in preset name |
| `hero.background.shader.custom.fragment` | string | Custom GLSL fragment shader |
