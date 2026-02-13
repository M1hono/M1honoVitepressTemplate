---
layout: home

hero:
  name: "Particles Effect"
  text: "Particles Hero"
  tagline: "Use particle system to create dynamic background effects"
  background:
    type: particles
    particles:
      count: 80
      size: 2
      color: "#6366f1"
      speed: 1
      opacity: 0.5
      links:
        enabled: true
        color: "#6366f1"
        distance: 150
  actions:
    - theme: brand
      text: "3D Effect"
      link: /en-US/hero/3d-effect
    - theme: alt
      text: "Back to Home"
      link: /en-US/hero/index

features:
  - icon: ✨
    title: "Particle Animation"
    details: "Create dynamic particle background effects"

  - icon: 🔗
    title: "Link Effect"
    details: "Auto-connect particles with lines"

  - icon: 🎪
    title: "Customizable"
    details: "Support color, size, count configuration"
---

# Particles Effect Hero

This page shows how to use particle system as Hero area background.

## Configuration

```yaml
hero:
  background:
    type: particles
    particles:
      count: 80
      size: 2
      color: "#6366f1"
      speed: 1
      opacity: 0.5
      links:
        enabled: true
        distance: 150
```

## Other Examples

- [Gradient Background](./gradient) - Gradient color background effect
- [Image Background](./image) - Use image as background
- [Video Background](./video) - Use video as background
- [Back to Home](./index) - Back to Hero showcase home
