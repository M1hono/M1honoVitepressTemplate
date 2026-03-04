---
title: Hero Playground
layout: doc
root: true
maxDepth: 6
collapsed: false
description: "Hero documentation and configuration entry for Hero Playground."
priority: 10
---
# Hero Playground

Use the progressive matrix to validate every hero runtime configuration path.

## Quick Links

- [All Hero Configuration](./AllConfig) — Complete API reference for every hero frontmatter field
- [Hero Config Matrix](./matrix/index) — Progressive showcase pages for every configuration path

## Hero System Overview

The hero system is controlled entirely by `frontmatter.hero.*` in each page's YAML front matter.

| System | Key | Description |
| --- | --- | --- |
| Layout | `hero.layout.viewport` | Full-viewport or content-height hero |
| Typography | `hero.typography` | Motion profile for title/text/tagline/image |
| Background | `hero.background` | Single or layered backgrounds (image/video/color/shader/particles) |
| Waves | `hero.waves` | SVG wave bridge at the bottom of the hero |
| Image | `hero.image` | Right-side hero media (image/video/gif/model3d/lottie) |
| Floating | `hero.floating` | Decorative floating elements above the background |
| Colors | `hero.colors` | Text, nav bar, and search box color overrides |
| Actions | `hero.actions` | CTA buttons with full style customization |
