# Hero Authoring

Use this reference when the task touches `layout: home` hero pages, the Hero Editor, or the hero runtime contract.

## Start Here

1. Classify the task:
- hero text and layout
- actions and CTA behavior
- hero image or media
- single background or layered background
- waves
- typography and motion
- colors and theme-aware values
- floating items
- editor parity or docs parity
2. Define whether the change belongs in:
- typed hero frontmatter contract
- editor-exposed advanced vocabulary
- runtime normalization only
- docs/examples only

## Base Hero Shape

A hero page begins with `layout: home` and a `hero` object.

```yaml
---
layout: home
hero:
  name: Example Project
  text: First line\nSecond line
  tagline: Small support line
---
```

## Core Hero Sections

### Text block

Common text fields:
- `hero.name`
- `hero.text`
- `hero.tagline`

Practical guidance:
- text fields are author-facing content, not implementation labels
- newline-oriented authoring must be preserved clearly in examples
- runtime resolves escaped newlines and dynamic text tokens, so docs should not reduce these fields to plain one-line labels
- hero text is ultimately rendered as trusted HTML after runtime resolution, so examples should assume trusted content only

### Actions

Each action supports:
- `theme`
- `text`
- `link`
- `linkKey`
- `target`
- `rel`
- `style`

Supported built-in themes include:
- `brand`
- `alt`
- `sponsor`
- `outline`
- `ghost`
- `danger`

The action style object can include custom visual overrides such as:
- `variant`
- `backgroundColor`
- `textColor`
- `outlineColor`
- `outlineWidth`
- `outlineStyle`
- `borderRadius`
- `padding`
- `boxShadow`
- `fontWeight`
- `letterSpacing`
- `hover.*`

Important parity note:
- runtime supports richer hover behavior such as 3D tilt options that are not fully exposed by the current editor UI

Use `linkKey` when the project defines stable route keys and you want project-aware navigation instead of a raw URL.

### Image and media

`hero.image.type` supports:
- `image`
- `video`
- `gif`
- `model3d`
- `lottie`

Common fields:
- `src`
- `light`
- `dark`
- `alt`
- `width`
- `height`
- `fit`
- `position`
- `frame`
- `background`

Type-specific fields:
- `video.*`: `src`, `autoplay`, `loop`, `muted`, `controls`, `poster`
- `lottie.*`: `src`, `autoplay`, `loop`, `speed`, `renderer`
- `model3d.*`: runtime model supports nested camera, lighting, interaction, and animation concepts

Theme-aware asset switching uses `light` and `dark` fields.

Important parity notes:
- editor and runtime do not currently model `image.frame` the same way; runtime expects an object-style contract while editor UI tends to simplify it
- editor and runtime also diverge on `model3d` shape: the editor exposes flatter convenience fields while runtime model rendering expects a richer nested contract

## Background System

The hero background system has two authoring modes:
- single background
- layered backgrounds

### Single background

Supported single types:
- `image`
- `video`
- `color`
- `shader`
- `particles`
- `none`

Common background-level controls:
- `mode`
- `type`
- `opacity`
- `brightness`
- `contrast`
- `saturation`
- `filter`
- `readability`

Important rule:
- `hero.background.type: waves` is invalid and ignored
- waves belong in `hero.waves`

### Color backgrounds

Supported color contracts:
- solid color
- gradient color
- theme-aware values with `{ light, dark }`

Gradient model supports:
- `enabled`
- `type`: `linear`, `radial`, `conic`
- `direction`
- `center`
- `shape`
- `size`
- `stops`
- `animation.enabled`
- `animation.type`: `flow`, `rotate`, `pulse`
- `animation.duration`

Legacy aliases exist, but the skill should prefer the modern contract in docs and examples.

### Image backgrounds

Common fields:
- `src`
- `light`
- `dark`
- `size`
- `position`
- `repeat`
- `blur`
- `scale`

### Video backgrounds

Common fields:
- `src`
- `light`
- `dark`
- `autoplay`
- `loop`
- `muted`
- `controls`
- `poster`
- `fit`
- `position`
- `playbackRate`

Important parity note:
- the editor exposes `fit`, `position`, and `playbackRate`, but current background video runtime behavior does not apply all of those fields consistently

### Shader backgrounds

Editor/runtime vocabulary exposes shader preset + speed. Built-in presets include visual modes such as water, noise, galaxy, plasma, ripple, and silk.

### Particle backgrounds

Editor/runtime vocabulary exposes at least:
- particle preset/type
- count
- enabled
- appearance settings such as type, color mode, color, size, opacity
- movement settings such as gravity and turbulence

Runtime particle support is broader than the editor surface. A strong skill should document stable author-facing fields first, then call out when the editor UI only exposes a subset.

### Layered backgrounds

Layer items support:
- `type`
- `opacity`
- `zIndex`
- `blend`
- type-specific nested config such as `color`, `image`, `video`, `shader`, `particles`

A good skill must teach:
- lower `zIndex` renders behind higher values
- layering uses compositing, not just ordered arrays
- color layers can also have full gradient contracts
- image, video, shader, and particles layers each bring their own nested option set

## Waves

Waves are controlled through `hero.waves`, not background type.

Common fields:
- `enabled`
- `height`
- `animated`
- `opacity`

Editor/runtime vocabulary also exposes advanced wave controls such as:
- `speed`
- `color`
- `reversed`
- `zIndex`
- `seamOverlap`
- `outline.*`

Important parity notes:
- editor vocabulary for wave outline and seam behavior is richer than what runtime currently consumes
- current runtime behavior around `waves.enabled` is weaker than it appears in the editor, so disabling waves needs careful verification rather than assumption

## Typography and Motion

Supported built-in typography styles:
- `floating-tilt`
- `grouped-float`
- `slanted-wrap`
- `none`

Typography motion supports:
- `intensity`
- per-element motion for `title`, `text`, `tagline`, `image`
- `transitionDuration`
- `transitionDelayStep`
- `transitionEasing`

The typography registry also supports style aliases such as `default` and `static`.

Important parity note:
- the editor exposes `typography.motion.enabled`, but runtime behavior is driven by resolved motion values rather than that flag directly

## Colors and Theme-Aware Values

Hero color overrides support theme-aware values for:
- title text
- subtitle text
- tagline text
- nav text and hover states
- nav backgrounds
- search bar backgrounds, text, placeholder, border, and keycap styles

Pattern:

```yaml
colors:
  title:
    light: '#111827'
    dark: '#f8fafc'
```

Use theme-aware values when the hero must remain legible in both themes.

Important parity note:
- editor populate and save flows can flatten theme-aware values into scalar fields if the editing path is not careful

## Floating System

The floating overlay supports these built-in item types:
- `text`
- `card`
- `image`
- `lottie`
- `badge`
- `icon`
- `stat`
- `code`
- `shape`

Global floating controls include:
- `enabled`
- density or opacity controls
- blur
- motion settings
- z-index

Per-item controls commonly include:
- `type`
- content fields such as `text`, `title`, `description`, `value`, `code`, `icon`
- media fields such as `src`, `alt`, `fit`
- placement fields such as `x`, `y`, `width`, `size`, `rotate`
- appearance fields such as `color`, `background`, `borderColor`, `borderRadius`, `shadow`
- motion fields such as `delay`, `duration`, `driftX`, `driftY`

Important placement rule:
- editor treats plain numeric x/y inputs as percentages
- width and size may use `%`, `vw`, `vh`, `rem`, `px`, and other CSS lengths

Important parity notes:
- runtime floating support is broader than the basic editor item UI in several places
- snippets can feed floating-word style runtime behavior, but there is no dedicated editor UI for snippets at the same depth as other hero sections

## Layout and Viewport

Hero layout includes viewport behavior such as `hero.layout.viewport`.

Teach the result in author terms:
- full viewport hero
- content-sized hero
- non-viewport hero

Important parity note:
- runtime effectively uses boolean viewport semantics, while editor vocabulary may present richer layout choices; this must be explained as a current mismatch rather than hidden

## Runtime and Editor Sync Rules

1. The editor vocabulary is partly driven from frontmatter registry and hero field text, so docs language should match that vocabulary.
2. Typed API covers the stable core, but editor-exposed advanced keys may exist beyond the narrow TypeScript interfaces. Do not erase them from docs just because they are normalized more loosely.
3. Background normalization sorts layers by `zIndex` and rejects unsupported layer types.
4. A feature taught in docs should exist in both runtime and editor if the editor claims to support it.
5. Save flows can inject many defaults, so round-tripping through the editor may materialize a much larger hero config than the original handwritten YAML.

## High-Value Caveats A Skill Must Teach

- `waves` is not a background type
- layered backgrounds and single backgrounds are separate authoring models
- theme-aware asset and color values should be preferred for dual-theme hero surfaces
- floating placement accepts CSS lengths and percentage-like values, not just plain numbers
- built-in typography styles are registry-driven, not arbitrary free text
- hero text/examples should stay aligned with the Hero Editor wording
- `background.readability` and `background.focus` exist in the contract/vocabulary, but should be treated carefully because current runtime usage is limited
- `image.frame`, `image.model3d`, `layout.viewport`, and several wave fields have known editor/runtime shape drift
- trusted-content assumptions matter because hero content is rendered after dynamic text resolution

## Example Blocks

### Basic hero with theme-aware color background

```yaml
---
layout: home
hero:
  name: Example Project
  text: Build once\nShip cleanly
  tagline: Runtime and editor stay aligned
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
  background:
    type: color
    color:
      solid:
        light: '#f6f7fb'
        dark: '#0f172a'
---
```

### Layered background hero

```yaml
---
layout: home
hero:
  name: Layered Hero
  background:
    mode: layers
    layers:
      - type: color
        zIndex: 0
        color:
          gradient:
            enabled: true
            type: linear
            direction: 135
            stops:
              - color: '#1d4ed8'
                position: '0%'
              - color: '#38bdf8'
                position: '100%'
      - type: image
        zIndex: 1
        opacity: 0.35
        image:
          src: /imgs/hero-bg.png
          size: cover
          position: center
---
```

### Floating and typography example

```yaml
---
layout: home
hero:
  name: Motion Example
  typography:
    type: grouped-float
    motion:
      intensity: 1
      transitionDuration: 700
  floating:
    enabled: true
    items:
      - type: badge
        text: Stable API
        x: '14%'
        y: '24%'
        background: 'rgba(255,255,255,0.12)'
      - type: stat
        value: '99%'
        text: Build success
        x: '72%'
        y: '18%'
---
```
