---
layout: home

hero:
  name: "Image Background"
  text: "Image Hero"
  tagline: "Use image as background, support dark/light mode auto-switching"
  background:
    type: image
    image:
      light: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80"
      dark: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80"
      alt: "Background"
      size: cover
      position: center center
      repeat: no-repeat
    opacity: 0.8
  actions:
    - theme: brand
      text: "Get Started"
      link: /en-US/hero/video
    - theme: alt
      text: "View Effects"
      link: /en-US/hero/particles

features:
  - icon: 🖼️
    title: "Dark/Light Mode"
    details: "Auto-switch images based on theme mode"

  - icon: 🎭
    title: "Blend Mode"
    details: "Support multiple image blend modes"

  - icon: 📐
    title: "Custom Style"
    details: "Support scaling, positioning, repeat and more"
---

# Image Background Hero

This page shows how to use images as Hero area background.

## Configuration

```yaml
hero:
  background:
    type: image
    image:
      light: "https://example.com/light.jpg"
      dark: "https://example.com/dark.jpg"
      size: cover
      position: center center
    opacity: 0.8
```

## Other Examples

- [Gradient Background](./gradient) - Gradient color background effect
- [Video Background](./video) - Use video as background
- [Particles Effect](./particles) - Particle animation background
- [Back to Home](./index) - Back to Hero showcase home
