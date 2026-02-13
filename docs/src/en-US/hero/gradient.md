---
layout: home

hero:
  name: "Gradient Background"
  text: "Gradient Hero"
  tagline: "Use gradient colors as background, support radial and linear gradients"
  background:
    type: color
    color:
      gradient:
        enabled: true
        type: linear
        direction: 135deg
        stops:
          - color: "#667eea"
            position: 0%
          - color: "#764ba2"
            position: 100%
  actions:
    - theme: brand
      text: "Learn More"
      link: /en-US/hero/image
    - theme: alt
      text: "Demo"
      link: /en-US/hero/particles

features:
  - icon: 🌈
    title: "Linear Gradient"
    details: "Support linear gradient background with any angle"

  - icon: ⭕
    title: "Radial Gradient"
    details: "Support radial and circular gradient effects"

  - icon: 🔄
    title: "Conic Gradient"
    details: "Support CSS conic gradient"
---

# Gradient Background Hero

This page shows how to use gradient colors as Hero area background.

## Configuration

```yaml
hero:
  background:
    type: color
    color:
      gradient:
        enabled: true
        type: linear
        direction: 135deg
        stops:
          - color: "#667eea"
            position: 0%
          - color: "#764ba2"
            position: 100%
```

## Other Examples

- [Image Background](./image) - Use image as background
- [Video Background](./video) - Use video as background
- [Particles Effect](./particles) - Particle animation background
- [Back to Home](./index) - Back to Hero showcase home
