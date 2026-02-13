---
layout: home

hero:
  name: "Video Background"
  text: "Video Hero"
  tagline: "Use video as background for immersive experience"
  background:
    type: video
    video:
      light: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      dark: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    opacity: 0.6
  actions:
    - theme: brand
      text: "Watch Demo"
      link: /en-US/hero/particles
    - theme: alt
      text: "Learn More"
      link: /en-US/hero/3d-effect

features:
  - icon: 🎬
    title: "Auto Play"
    details: "Video autoplay with muted support"

  - icon: 🔁
    title: "Loop Play"
    details: "Video loops automatically"

  - icon: 📱
    title: "Mobile Optimized"
    details: "Perfect mobile display support"
---

# Video Background Hero

This page shows how to use video as Hero area background.

## Configuration

```yaml
hero:
  background:
    type: video
    video:
      src: "https://example.com/video.mp4"
      autoplay: true
      loop: true
      muted: true
    opacity: 0.6
```

## Other Examples

- [Gradient Background](./gradient) - Gradient color background effect
- [Image Background](./image) - Use image as background
- [Particles Effect](./particles) - Particle animation background
- [Back to Home](./index) - Back to Hero showcase home
