# Outer and Inner Frontmatter Snippets

Use these snippet-ready examples when updating docs, templates, or extension completions.

## 1) Outer Frontmatter (Global Page Scope)

```yaml
---
title: "Page Title"
description: "Page summary for SEO and preview."
layout: doc
layoutClass: docs-premium
cssVars:
  --page-accent:
    light: "#3f63d6"
    dark: "#8ea7ff"
  --content-max-width: "1180px"
cssVariables:
  --surface-soft:
    light: "rgba(63, 99, 214, 0.08)"
    dark: "rgba(142, 167, 255, 0.16)"
tags:
  - frontmatter
  - runtime
metadata: true
progress: 80
state: preliminary
showComment: true
buttons: true
backPath: /en-US/guide/index
showEditor: true
editor: "Template Team"
---
```

## 2) Inner Frontmatter (Hero Runtime Scope)

```yaml
hero:
  name: "Hero Showcase"
  text: "Runtime Complete Hero"
  tagline: "Supports layered backgrounds, waves, model3d, and floating elements."

  layout:
    viewport: true

  background:
    readability:
      mode: auto # auto | on | off
    opacity: 0.98
    brightness: 0.95
    contrast: 1.02
    saturation: 0.94
    cssVars:
      --hero-overlay-soft:
        light: "rgba(16, 28, 58, 0.2)"
        dark: "rgba(8, 14, 30, 0.52)"
    layers:
      - type: image
        src:
          light: /images/hero-light.jpg
          dark: /images/hero-dark.jpg
      - type: shader
        shader:
          type: water

  waves:
    enabled: true
    height: 88
    opacity: 1
    animated: true
    speed: 1
    layers:
      - opacity: 0.25
        speed: 1
        direction: 1
      - opacity: 0.5
        speed: 0.86
        direction: -1
      - opacity: 1
        speed: 1.15
        direction: 1

  image:
    type: model3d # image | video | gif | model3d
    background:
      enabled: false # default off
    frame:
      shape: rounded
      borderWidth: 1px
      borderColor: "rgba(255,255,255,0.35)"
    model3d:
      src: /models/duck.glb
      autoRotate: true
      fitPadding: 1.28

  snippets:
    - name: capabilities
      snippets:
        - Runtime Complete
        - Canonical Waves
        - Layered Backgrounds

  floating:
    enabled: true
    density: 10
    opacity: 0.86
    motion:
      enabled: true
      durationMin: 12
      durationMax: 24
      drift: 36
    items:
      - type: text
        text: "Extension-Ready Frontmatter"
        x: "46%"
        y: "74%"
      - type: card
        title: "Build Status"
        description: "All matrix checks passing"
        x: "10%"
        y: "24%"
      - type: image
        src: /logo.png
        x: "82%"
        y: "62%"
      - type: badge
        text: "Business Grade"
        icon: "✨"
        x: "28%"
        y: "18%"
      - type: icon
        icon: "⚙️"
        x: "8%"
        y: "48%"
      - type: stat
        value: "99.95%"
        title: "Uptime"
        x: "62%"
        y: "18%"
      - type: code
        code: "hero.waves.enabled: true"
        x: "24%"
        y: "66%"
      - type: shape
        shape: hexagon
        x: "74%"
        y: "38%"

  actions:
    - theme: brand
      text: "Get Started"
      link: /en-US/guide/index
      style:
        variant: filled
        borderRadius: "12px"
        padding: "10px 24px"
        backgroundColor: "#0f172a"
        textColor: "#f8fafc"
    - theme: alt
      text: "View Matrix"
      link: /en-US/hero/matrix/index
```

## 3) Inner Frontmatter (Features Scroller Scope)

```yaml
features:
  - icon: mdi:rocket-launch-outline
    title: "Runtime Complete"
    details: "Shader, particles, waves, model3d and layered backgrounds."
    theme: brand
    link: /en-US/hero/matrix/index

featuresConfig:
  scroll:
    speed: 0.78
    dragMultiplier: 2
    pauseOnHover: true
    minItems: 12
    edgeFade: true
    gap: 20
    gapTablet: 28
    gapDesktop: 36
  cards:
    width: 320
    widthTablet: 360
    widthDesktop: 400

featureScroll:
  speed: 0.72

featureCards:
  width: 340
```

## 4) Plugin/Tag-Oriented Frontmatter (Sidebar Tagging Scope)

```yaml
method: GET
status: stable
version: 1.0.0
difficulty: beginner
category: tutorial
featured: true
priority: high
language: typescript
score: 92
externalLinks:
  - text: "API Spec"
    link: "https://example.com/spec"
    priority: 0
```

## 5) Deprecated Pattern Rule

Do not generate new examples using:

```yaml
hero:
  customSnippet: true
```

Use `hero.snippets` and/or `hero.floating.items` instead.

