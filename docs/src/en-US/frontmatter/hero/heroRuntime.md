---
title: Hero Runtime Frontmatter
description: Full hero frontmatter contract including background systems, waves, media/image types, and layout controls.
priority: 20
---
# Hero Runtime Frontmatter

`hero` is the runtime-complete home hero contract.

## Top-Level Hero Keys

| Key | Type | Description |
| --- | --- | --- |
| `hero.name` | `string` | Hero pre-title label / badge text.
| `hero.text` | `string` | Hero primary heading.
| `hero.tagline` | `string` | Hero secondary text.
| `hero.actions` | `HeroAction[]` | CTA button list. Each item supports `text`, `link`, `linkKey`, `theme`, `target`, `rel`, `style`.
| `hero.layout.viewport` | `boolean` | `true`: full viewport hero. `false`: content-height hero.
| `hero.typography` | `TypographyConfig` | Style system for `name/text/tagline/image` (`floating-tilt`, `grouped-float`, `slanted-wrap`, or `none`).
| `hero.colors` | `HeroColorConfig` | Text colors (`title`, `tagline`, `text`), nav colors (`nav*`), and search colors (`search*`).
| `hero.background` | `BackgroundConfig` | Single/layered background runtime.
| `hero.waves` | `WavesConfig` | Canonical wave bridge system.
| `hero.image` | `HeroImageConfig` | Hero right-side media (`image|video|gif|model3d|lottie`), including optional `background.enabled` glow toggle.
| `hero.floating` | `FloatingConfig` | Optional floating decorative items (`text|card|image|lottie|badge|icon|stat|code|shape`) above background.
| `hero.snippets` | `unknown[]` | Snippet data consumed by floating elements.

## Typography Style Contract

`hero.typography` controls visual composition for title/text/tagline/image.

- Default: `floating-tilt` (legacy subtle motion composition).
- Recommended grouped style: `grouped-float` (larger grouped floating composition for title/text/tagline/image).
- Optional style: `slanted-wrap` (slanted text profile, desktop text wraps around hero image).
- Alternative: `none` (no transform motion).
- `grouped-float` automatically attenuates on tablet/mobile to avoid overflow and keep composition readable.
- All style types share a single extension contract: `hero.typography.motion`.
- This system only controls movement + resize of `name/text/tagline/image`.

```yaml
hero:
  typography:
    type: grouped-float # floating-tilt | grouped-float | slanted-wrap | none
    motion:
      intensity: 1
      title:
        x: 2
        y: -2
        scale: 1.018
      text:
        x: 6
        y: 4
        scale: 1.03
      tagline:
        x: 3
        y: 7
        scale: 1.014
      image:
        x: 5
        y: -3
        scale: 1.02
      transitionDuration: 560
      transitionDelayStep: 40
      transitionEasing: "cubic-bezier(0.2, 0.9, 0.2, 1)"
```

## Background Contract

```yaml
hero:
  background:
    # single mode
    type: color # image | video | color | shader | particles | none

    # or layered mode
    layers:
      - type: image
      - type: shader

    # global controls for composed layers
    opacity: 0.98
    brightness: 0.95
    contrast: 1.03
    saturation: 0.94
    filter: hue-rotate(6deg)

    # hero background-local CSS vars
    cssVars:
      --hero-overlay-soft:
        light: "rgba(16, 28, 58, 0.22)"
        dark: "rgba(8, 14, 30, 0.52)"

    # local style overrides
    style:
      backdropFilter: saturate(1.04)
```

### Color Background Compatibility + Nav/Search Color Contract

```yaml
hero:
  background:
    type: color
    color:
      # modern solid
      solid:
        light: "rgba(55, 90, 160, 1)"
        dark: "rgba(83, 99, 129, 1)"

      # legacy solid alias (still supported)
      value: "rgba(55, 90, 160, 1)"

      # modern gradient contract
      gradient:
        enabled: true
        type: linear
        direction: 135deg
        stops:
          - color: "rgba(99, 102, 241, 1)"
            position: 0%
          - color: "rgba(168, 85, 247, 1)"
            position: 52%
          - color: "rgba(236, 72, 153, 1)"
            position: 100%

      # legacy gradient aliases (still supported)
      # gradient: ["rgba(99, 102, 241, 1)", "rgba(168, 85, 247, 1)", "rgba(236, 72, 153, 1)"]
      # direction: 135

      # gradient with optional animation
      gradient:
        enabled: true
        type: linear
        direction: 135deg
        stops:
          - color: "rgba(99, 102, 241, 1)"
            position: 0%
          - color: "rgba(168, 85, 247, 1)"
            position: 52%
          - color: "rgba(236, 72, 153, 1)"
            position: 100%
        animation:           # optional animated gradient
          enabled: true
          type: flow          # flow | rotate | pulse
          duration: 4000      # ms per cycle
  colors:
    # text colors
    title:
      light: "rgba(255, 255, 255, 1)"
      dark: "rgba(255, 255, 255, 1)"
    text:
      light: "rgba(240, 246, 255, 1)"
      dark: "rgba(240, 246, 255, 1)"
    tagline:
      light: "rgba(220, 235, 255, 0.92)"
      dark: "rgba(220, 235, 255, 0.92)"

    # nav colors
    navText: "rgba(255, 255, 255, 1)"
    navTextHover: "rgba(255, 255, 255, 1)"
    navBackground: "rgba(27, 42, 82, 0.72)"

    # search colors
    searchBackground: "rgba(255, 255, 255, 0.16)"
    searchHoverBackground: "rgba(255, 255, 255, 0.24)"
    searchText: "rgba(255, 255, 255, 1)"
    searchTextMuted: "rgba(255, 255, 255, 0.92)"
    searchBorder: "rgba(255, 255, 255, 0.34)"
    searchKeyBackground: "rgba(255, 255, 255, 0.14)"
    searchKeyText: "rgba(255, 255, 255, 0.92)"
```

- Text/nav/search colors all belong to the canonical `hero.colors.*` contract.

| Group | Keys |
| --- | --- |
| `hero.colors.text*` | `title`, `text`, `tagline` |
| `hero.colors.nav*` | `navText`, `navTextScrolled`, `navTextHover`, `navTextHoverScrolled`, `navBackground`, `navBackgroundScrolled` |
| `hero.colors.search*` | `searchBackground`, `searchBackgroundScrolled`, `searchHoverBackground`, `searchHoverBackgroundScrolled`, `searchText`, `searchTextScrolled`, `searchTextMuted`, `searchTextMutedScrolled`, `searchBorder`, `searchBorderScrolled`, `searchKeyBackground`, `searchKeyBackgroundScrolled`, `searchKeyText`, `searchKeyTextScrolled` |

### Layer-Level Overrides

```yaml
hero:
  background:
    layers:
      - type: image
        cssVars:
          --hero-image-scale: "1.03"
        style:
          transform: scale(var(--hero-image-scale))
      - type: color
        cssVars:
          --hero-layer-color:
            light: "rgba(112, 145, 255, 0.16)"
            dark: "rgba(112, 145, 255, 0.3)"
```

### Particle Contract

```yaml
hero:
  background:
    type: particles
    particles:
      enabled: true
      type: stars # stars | snow | rain | bubbles | sparks | custom
      count: 1000
      spread: 3

      appearance:
        size: 0.11
        type: circle # dot | circle | square | star | custom
        textureColorMode: mask # mask | image
        colorMode: palette # solid | random | palette | area
        randomColorChance: 0.7 # 0..1, used by random/palette
        palette:
          - "rgba(60, 98, 225, 1)"
          - "rgba(132, 102, 238, 1)"
          - "rgba(242, 122, 168, 1)"
        areaColor:
          axis: x # x | y | z | radius
          colors:
            - "rgba(60, 98, 225, 1)"
            - "rgba(132, 102, 238, 1)"
            - "rgba(242, 122, 168, 1)"
        texture: /textures/particle.png # optional, local/remote
        color:
          light: "rgba(60, 98, 225, 1)"
          dark: "rgba(186, 208, 255, 1)"
        opacity:
          light: 0.45
          dark: 0.72

      movement:
        speed:
          min: 0.08
          max: 0.4
        direction: [0, -1, 0]
        gravity: -0.01
        turbulence: 0.2
        tiltVariance: 0.1

      lifecycle:
        respawn: true

      area:
        type: box # box | sphere | plane
        size: [8, 4, 8]
        position: [0, 1, 0]
```

- `particles.type` controls movement preset behavior.
- `particles.appearance.type` controls visual sprite shape.

Use test pages:

- [/en-US/hero/matrix/backgroundSingle/particles](/en-US/hero/matrix/backgroundSingle/particles)
- [/en-US/hero/matrix/layers/level3ShaderParticles](/en-US/hero/matrix/layers/level3ShaderParticles)
- [/en-US/hero/matrix/layers/level4FullThemeSync](/en-US/hero/matrix/layers/level4FullThemeSync)

## Waves Contract (Canonical)

- Supported path: `hero.waves` only.
- Unsupported path: `hero.background.type: waves` (ignored).

```yaml
hero:
  waves:
    enabled: true
    height: 88
    opacity: 1
    animated: true
    speed: 1
    seamOverlap: 1.6
    outline:
      type: shadow
      blur: 5
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
```

## Hero Image Contract

```yaml
hero:
  image:
    type: model3d # image | video | gif | model3d | lottie
    background:
      enabled: false # default is false; set true to render hero image glow layer

    # optional shared frame controls
    shape: rounded
    radius: 28px
    border: true
    borderWidth: 1
    borderColor: "rgba(255,255,255,0.35)"
    shadow: true

    model3d:
      src: /models/duck.glb
      fitPadding: 0.2
      autoRotate: true
      rotationSpeed: 0.6
```

For full samples, use [Hero Matrix](/en-US/hero/matrix/index).

## Floating Elements Contract

```yaml
hero:
  snippets:
    - name: capabilities
      snippets:
        - Runtime Complete
        - Layered Backgrounds
        - Canonical Waves

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
      - type: card
        title: "Build Status"
        description: "All matrix checks passing"
        x: "8%"
        y: "22%"
      - type: badge
        text: "Business Grade"
        icon: "✨"
        x: "30%"
        y: "18%"
      - type: image
        src:
          light: /logo.png
          dark: /logodark.png
        alt:
          light: "Template logo (light mode)"
          dark: "Template logo (dark mode)"
        x: "82%"
        y: "62%"
        width: 120px
      - type: stat
        value: "99.95%"
        title: "Uptime"
        x: "64%"
        y: "20%"
      - type: code
        code: "hero.waves.enabled: true"
        x: "24%"
        y: "66%"
      - type: shape
        shape: hexagon
        x: "76%"
        y: "40%"
      - type: text
        text: "Extension-Ready Frontmatter"
        x: "44%"
        y: "74%"
```

### Floating Diagram

```yaml
hero:
  floating:
    enabled: boolean
    opacity: number
    density: number
    blur: number
    gradients: ThemeValue<string>[]
    motion:
      enabled: boolean
      style: drift
      durationMin: number
      durationMax: number
      drift: number
    items:
      - type: text | card | image | lottie | badge | icon | stat | code | shape
        x: "0%~100%"
        y: "0%~100%"
        rotate: number
        opacity: number
        delay: number
        duration: number
        driftX: number
        driftY: number
        src: ThemeValue<string>
        alt: ThemeValue<string>
        text: ThemeValue<string>
        title: ThemeValue<string>
        description: ThemeValue<string>
        value: ThemeValue<string>
        icon: ThemeValue<string>
        code: ThemeValue<string>
        background: ThemeValue<string>
        borderColor: ThemeValue<string>
        borderRadius: string
        shadow: ThemeValue<string>
```

- Theme-aware fields: `floating.gradients`, and per-item `src`, `alt`, `text`, `title`, `description`, `value`, `icon`, `code`, `background`, `borderColor`, `shadow` all accept `ThemeValue<string>`.
- Unsupported/ignored: `hero.floating.text`, `hero.floating.card`, `hero.floating.image`, `hero.floating.badge`, `hero.floating.icon`, `hero.floating.stat`, `hero.floating.code`, `hero.floating.shape`.
- Configure style per item in `hero.floating.items[*]`.
- For `image` and `lottie` items, `items[].width` is applied directly to rendered media width.

## Unsupported And Removed Keys

- `hero.background.type: waves` (waves are rendered only from `hero.waves`).
- `hero.waves.enabled: false` (ignored; waves are always rendered).
- `hero.floating.motion.style: legacy-a | legacy-b` (only `drift` is supported).
- `hero.customSnippet` (removed; use `hero.snippets` + `hero.floating.items`).

## Hero Action Style Overrides

```yaml
hero:
  actions:
    - theme: brand
      text: "Executive CTA"
      link: /en-US/guide/index
      style:
        # Optional custom visual overrides
        backgroundColor: "rgba(15, 23, 42, 1)"
        textColor: "rgba(248, 250, 252, 1)"
        outlineWidth: "1px"
        outlineStyle: "solid"
        outlineColor: "rgba(148,163,184,.6)"
        borderRadius: "12px"
        padding: "10px 24px"
        boxShadow: "0 10px 24px rgba(15,23,42,.22)"
        fontWeight: 620
        letterSpacing: "0.01em"
        hover:
          backgroundColor: "rgba(30, 41, 59, 1)"
          textColor: "rgba(255, 255, 255, 1)"
          outlineColor: "rgba(191,219,254,.72)"
          boxShadow: "0 12px 26px rgba(15,23,42,.3)"
```
