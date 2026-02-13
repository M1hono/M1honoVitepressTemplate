---
layout: home

hero:
  name: "3D Hover Effect"
  text: "3D Hover Effect"
  tagline: "Buttons and elements support 3D hover effects"
  background:
    type: color
    color:
      gradient:
        enabled: true
        type: linear
        direction: 135deg
        stops:
          - color: "#0f172a"
            position: 0%
          - color: "#1e293b"
            position: 100%
  actions:
    - theme: brand
      text: "3D Button Demo"
      link: /en-US/hero/index
      style:
        variant: filled
        borderRadius: 8px
        padding: 12px 24px
        hover:
          enabled: true
          tilt3D:
            enabled: true
            intensity: 10
            perspective: 1000px
          scale: 1.05
    - theme: alt
      text: "Learn More"
      link: /en-US/hero/index

features:
  - icon: 🎲
    title: "3D Tilt"
    details: "3D tilt effect on hover"

  - icon: 📏
    title: "Perspective"
    details: "Customizable perspective distance"

  - icon: 🔄
    title: "Scale Animation"
    details: "Support hover scaling effect"
---

# 3D Effect Hero

This page shows button and element 3D hover effects.

## Configuration

```yaml
hero:
  actions:
    - theme: brand
      text: "3D Button"
      style:
        hover:
          enabled: true
          tilt3D:
            enabled: true
            intensity: 10
            perspective: 1000px
          scale: 1.05
```

## Available Effects

- **tilt3D** - 3D tilt effect
- **scale** - Scale effect
- **blur** - Blur effect
- **bounce** - Bounce effect

## Other Examples

- [Gradient Background](./gradient) - Gradient color background effect
- [Image Background](./image) - Use image as background
- [Particles Effect](./particles) - Particle animation background
- [Back to Home](./index) - Back to Hero showcase home
