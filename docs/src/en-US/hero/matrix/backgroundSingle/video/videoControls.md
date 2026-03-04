---
layout: home
hero:
    name: "Video Background"
    text: "Video Controls"
    tagline: "Control video playback with autoplay, loop, and mute settings."
    background:
        type: video
        video:
            src: /videos/hero-bg.mp4
            autoplay: true
            loop: true
            muted: true
            playsinline: true
    colors:
        title:
            light: "rgba(255, 255, 255, 1)"
            dark: "rgba(255, 255, 255, 1)"
        tagline:
            light: "rgba(224, 224, 224, 1)"
            dark: "rgba(204, 204, 204, 1)"
    actions:
        - theme: brand
          text: "Shader"
          link: /en-US/hero/matrix/backgroundSingle/shader
features:
    - title: "Autoplay"
      details: "Video starts automatically on page load."
    - title: "Loop"
      details: "Video repeats when finished."
    - title: "Muted"
      details: "Required for autoplay in most browsers."
title: "Video Controls"
description: "Video background playback configuration."
priority: 15
---
# Video Controls

Primary focus: Configure video background playback behavior.

## Actual Frontmatter

```yaml
---
layout: home
hero:
    background:
        type: video
        video:
            src: /videos/hero-bg.mp4
            autoplay: true
            loop: true
            muted: true
            playsinline: true
---
```

## API Keys

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `hero.background.video.src` | string | required | Video file path |
| `hero.background.video.autoplay` | boolean | true | Auto-play on load |
| `hero.background.video.loop` | boolean | true | Loop playback |
| `hero.background.video.muted` | boolean | true | Mute audio |
| `hero.background.video.playsinline` | boolean | true | Inline playback on mobile |

## Best Practices

- Always set `muted: true` for autoplay to work
- Use optimized video files (WebM/MP4)
- Provide poster image for loading state
