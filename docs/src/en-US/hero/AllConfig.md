---
title: All Hero Configuration
layout: doc
description: Complete API map for every hero frontmatter field — all domains on one page.
priority: 20
---

# All Hero Configuration

Every configurable field in the hero system, organized by domain. All fields are optional unless marked **required**.

## FileNaming

- Use `FileNaming` style (camelCase object keys) across hero configuration.
- Legacy kebab-case aliases are not supported.

---

## Hero Root (`hero.*`)

| Field                   | Type                                                      | Default   | Description                 |
| ----------------------- | --------------------------------------------------------- | --------- | --------------------------- |
| `hero.name`             | `string`                                                  | —         | H1 display heading (pre-title badge) |
| `hero.text`             | `string`                                                  | —         | Subtitle / brand text       |
| `hero.tagline`          | `string`                                                  | —         | Small supporting text       |
| `hero.layout.viewport`  | `boolean`                                                 | `true`    | Full-viewport hero height; `false` for content-height |
| `hero.typography.type`  | `'floating-tilt'\|'grouped-float'\|'slanted-wrap'\|'none'` | `'floating-tilt'` | Motion profile selector |
| `hero.colors.*`         | `ThemeValue<string>`                                      | —         | Hero/nav/search color contract |
| `hero.actions[].text`   | `string`                                                  | **required** | Button label |
| `hero.actions[].link`   | `string`                                                  | —         | URL or path |
| `hero.actions[].linkKey`| `string`                                                  | —         | Named route key (see [Action Link Keys](#action-link-keys)) |
| `hero.actions[].theme`  | `'brand'\|'alt'\|'outline'\|'ghost'\|'danger'\|'sponsor'` | `'brand'` | Button style preset |
| `hero.actions[].target` | `string`                                                  | `'_self'` | Link target attribute |
| `hero.actions[].rel`    | `string`                                                  | `''`      | Link rel attribute          |
| `hero.actions[].style`  | `object`                                                  | —         | Visual override (see [Action Style Overrides](#action-style-overrides)) |
| `hero.snippets`         | `unknown[]`                                               | —         | Snippet data consumed by floating elements |
| `cssVars.[--name]`      | `ThemeValue<string>`                                      | —         | Page-scoped CSS variable    |

### Action Link Keys

`hero.actions[].linkKey` routes to a named page without hardcoding a path. Supported values:

| Key | Destination |
| --- | --- |
| `home` | Site home |
| `heroMatrix` | Hero matrix index |
| `heroAllConfig` | All hero config reference |
| `frontmatterApi` | Frontmatter API reference |
| `maintainabilityGuide` | Maintainability and extension guide |
| `developmentWorkflow` | Development workflow guide |
| `extensionArchitecture` | Extension architecture guide |
| `heroExtension` | Hero extension playbook |
| `stylesPlugins` | Styles and plugins page |
| `allPages` | All pages index |
| `backgroundModes` | Background modes page |
| `wavesMatrix` | Waves matrix page |
| `floatingElements` | Floating elements page |
| `imageTypes` | Image types page |
| `basicHero` | Basic hero matrix |
| `colorBackground` | Color background examples |
| `imageBackground` | Image background examples |
| `videoBackground` | Video background examples |
| `shaderBackground` | Shader background examples |
| `particlesBackground` | Particles background examples |
| `layersBackground` | Layered background examples |
| `buttonThemes` | Buttons and features matrix |
| `featuresConfig` | Full features configuration page |

---

## Hero Typography Style (`hero.typography.*`)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `hero.typography.type` | `'floating-tilt'\|'grouped-float'\|'slanted-wrap'\|'none'` | `'floating-tilt'` | Style behavior selector |
| `hero.typography.motion.intensity` | `number` | `1` | Master motion intensity (0–2) |
| `hero.typography.motion.title.x` | `number` | type default | Title X offset in px |
| `hero.typography.motion.title.y` | `number` | type default | Title Y offset in px |
| `hero.typography.motion.title.scale` | `number` | type default | Title scale factor |
| `hero.typography.motion.text.x` | `number` | type default | Text X offset in px |
| `hero.typography.motion.text.y` | `number` | type default | Text Y offset in px |
| `hero.typography.motion.text.scale` | `number` | type default | Text scale factor |
| `hero.typography.motion.tagline.x` | `number` | type default | Tagline X offset in px |
| `hero.typography.motion.tagline.y` | `number` | type default | Tagline Y offset in px |
| `hero.typography.motion.tagline.scale` | `number` | type default | Tagline scale factor |
| `hero.typography.motion.image.x` | `number` | type default | Image X offset in px |
| `hero.typography.motion.image.y` | `number` | type default | Image Y offset in px |
| `hero.typography.motion.image.scale` | `number` | type default | Image scale factor |
| `hero.typography.motion.transitionDuration` | `number` | `560` | Transition duration in ms |
| `hero.typography.motion.transitionDelayStep` | `number` | `40` | Stagger delay between elements in ms |
| `hero.typography.motion.transitionEasing` | `string` | `cubic-bezier(0.2, 0.9, 0.2, 1)` | Shared CSS easing |

**Type behaviors:**
- `floating-tilt` — subtle motion-forward layout (default, compatible with legacy configs)
- `grouped-float` — larger grouped floating composition; auto-attenuates on tablet/mobile
- `slanted-wrap` — slanted profile; desktop text wraps around hero image
- `none` — no motion transforms

### Example

```yaml
hero:
  typography:
    type: grouped-float
    motion:
      intensity: 0.96
      title: { x: 2, y: -2, scale: 1.018 }
      text: { x: 6, y: 4, scale: 1.03 }
      tagline: { x: 3, y: 7, scale: 1.014 }
      image: { x: 5, y: -3, scale: 1.02 }
      transitionDuration: 560
      transitionDelayStep: 40
      transitionEasing: "cubic-bezier(0.2, 0.9, 0.2, 1)"
```

---

## Hero Text Typography CSS Variables (`cssVars.*`)

Control hero text layout and fonts via `cssVars`. All variables use standard CSS values.

### `hero.name` (`HeroTitle`)

| CSS Variable                 | Default       | Description                                                                               |
| ---------------------------- | ------------- | ----------------------------------------------------------------------------------------- |
| `--hero-name-font`           | `inherit`     | Font family for the `name` heading                                                        |
| `--hero-name-weight`         | `760`         | Font weight                                                                               |
| `--hero-name-letter-spacing` | `-0.03em`     | Letter spacing                                                                            |
| `--hero-name-line-height`    | `1.05`        | Line height                                                                               |
| `--hero-name-align`          | `inherit`     | Text alignment: `left`, `center`, `right`                                                 |
| `--hero-name-max-width`      | `680px`       | Max width of name element                                                                 |
| `--hero-name-accent-color`   | `transparent` | Gradient/color for underline accent bar |
| `--hero-name-accent-height`  | `4px`         | Height of the underline accent bar                                                        |

### `hero.text` (`HeroContent .text`)

| CSS Variable                 | Default              | Description         |
| ---------------------------- | -------------------- | ------------------- |
| `--hero-text-font`           | `inherit`            | Font family         |
| `--hero-text-weight`         | `700`                | Font weight         |
| `--hero-text-letter-spacing` | `-0.03em`            | Letter spacing      |
| `--hero-text-line-height`    | `1.08`               | Line height         |
| `--hero-text-align`          | `inherit`            | Text alignment      |
| `--hero-text-color`          | `var(--vp-c-text-1)` | Text color override |
| `--hero-text-max-width`      | `680px`              | Max width           |

### `hero.tagline` (`HeroTagline`)

| CSS Variable                    | Default              | Description           |
| ------------------------------- | -------------------- | --------------------- |
| `--hero-tagline-font`           | `inherit`            | Font family           |
| `--hero-tagline-weight`         | `520`                | Font weight           |
| `--hero-tagline-letter-spacing` | `0`                  | Letter spacing        |
| `--hero-tagline-line-height`    | `1.55`               | Line height           |
| `--hero-tagline-align`          | `inherit`            | Text alignment        |
| `--hero-tagline-color`          | `var(--vp-c-text-2)` | Color override        |
| `--hero-tagline-max-width`      | `640px`              | Max width             |
| `--hero-tagline-padding-top`    | `14px`               | Spacing above tagline |

### Layout Shape

| CSS Variable               | Default               | Description                                                              |
| -------------------------- | --------------------- | ------------------------------------------------------------------------ |
| `--hero-content-align`     | `inherit`             | Align entire hero content block (`left`, `center`)                       |
| `--hero-heading-gap`       | `0.08em`              | Gap between name and text within heading                                 |
| `--hero-heading-bar-color` | `var(--vp-c-brand-1)` | Color of left-border accent bar (requires `data-shape="bar"` on heading) |

### Example

```yaml
cssVars:
    --hero-name-font: "'Outfit', sans-serif"
    --hero-name-weight: "800"
    --hero-name-letter-spacing: "-0.05em"
    --hero-name-accent-color: "linear-gradient(90deg, rgba(99, 102, 241, 1), rgba(168, 85, 247, 1))"
    --hero-name-accent-height: "5px"
    --hero-tagline-font: "'Inter', sans-serif"
    --hero-tagline-letter-spacing: "0.01em"
    --hero-content-align: "center"
```

---

## Background (`hero.background.*`)

> `type` and `layers[]` are mutually exclusive. `type: 'waves'` is unsupported — use `hero.waves`.

### Global Controls

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `background.type` | `'image'\|'video'\|'color'\|'shader'\|'particles'\|'none'` | `'none'` | Single background type |
| `background.opacity` | `number` | `1` | Global background opacity |
| `background.brightness` | `number` | `1` | Brightness multiplier |
| `background.contrast` | `number` | `1` | Contrast multiplier |
| `background.saturation` | `number` | `1` | Saturation multiplier |
| `background.filter` | `string` | — | Additional CSS filter string (e.g., `hue-rotate(6deg)`) |
| `background.cssVars` | `Record<string, ThemeValue<string>>` | — | Background-root CSS vars |
| `background.style` | `Record<string, unknown>` | — | Inline style overrides |


### Image Background (`hero.background.image.*`)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `background.image.src` | `string` | — | Image URL (used for both themes) |
| `background.image.light` | `string` | — | Light theme image URL |
| `background.image.dark` | `string` | — | Dark theme image URL |
| `background.image.alt` | `string` | `''` | Alt text |

### Video Background (`hero.background.video.*`)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `background.video.src` | `string` | — | Video URL |
| `background.video.light` | `string` | — | Light theme video URL |
| `background.video.dark` | `string` | — | Dark theme video URL |
| `background.video.autoplay` | `boolean` | `true` | Auto-play on load |
| `background.video.loop` | `boolean` | `true` | Loop video |
| `background.video.muted` | `boolean` | `true` | Mute audio |
| `background.video.controls` | `boolean` | `false` | Show player controls |
| `background.video.poster` | `string` | — | Poster image URL shown before play |
| `background.video.fit` | `'contain'\|'cover'\|'fill'\|'none'\|'scale-down'` | `'cover'` | Object-fit behavior |
| `background.video.position` | `string` | `'center'` | CSS object-position |

### Shader Background (`hero.background.shader.*`)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `background.shader.type` | `'water'\|'noise'\|'galaxy'\|'plasma'\|'ripple'\|'silk'` | — | Built-in shader preset name |
| `background.shader.template` | `string` | — | Custom template name (overrides preset) |
| `background.shader.speed` | `number` | `1` | Animation speed multiplier |
| `background.shader.uniforms.[name].type` | `'float'\|'int'\|'vec2'\|'vec3'\|'color'\|'sampler2D'` | — | Uniform GLSL type |
| `background.shader.uniforms.[name].value` | `ThemeValue<number\|string\|number[]>` | — | Uniform value (supports light/dark variants) |
| `background.shader.custom.vertex` | `string` | — | Custom GLSL vertex shader |
| `background.shader.custom.fragment` | `string` | — | Custom GLSL fragment shader |

**Built-in shader presets:** `water`, `noise`, `galaxy`, `plasma`, `ripple`, `silk`

### Particle Background (`hero.background.particles.*`)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `background.particles.enabled` | `boolean` | `true` | Enable particle system |
| `background.particles.type` | `'stars'\|'snow'\|'rain'\|'bubbles'\|'sparks'\|'custom'` | `'stars'` | Behavior preset |
| `background.particles.count` | `number` | `1000` | Particle count |
| `background.particles.spread` | `number` | `3` | Volume spread factor |
| `background.particles.appearance.size` | `number` | `0.11` | Particle size in world units |
| `background.particles.appearance.type` | `'dot'\|'circle'\|'square'\|'star'\|'custom'` | `'circle'` | Visual sprite shape |
| `background.particles.appearance.colorMode` | `'solid'\|'random'\|'palette'\|'area'` | `'solid'` | Color distribution mode |
| `background.particles.appearance.color` | `ThemeValue<string>` | — | Base particle color |
| `background.particles.appearance.opacity` | `ThemeValue<number>` | — | Particle opacity per theme |
| `background.particles.appearance.palette` | `string[]` | — | Color palette for `palette` / `random` modes |
| `background.particles.appearance.randomColorChance` | `number` | `0.7` | Probability of picking a palette color (0–1) |
| `background.particles.appearance.areaColor.axis` | `'x'\|'y'\|'z'\|'radius'` | `'y'` | Axis used for area color mapping |
| `background.particles.appearance.areaColor.colors` | `string[]` | — | Colors mapped along the axis |
| `background.particles.appearance.texture` | `string` | — | Custom sprite texture URL |
| `background.particles.appearance.textureColorMode` | `'mask'\|'image'` | `'mask'` | Texture color behavior: `mask` tints with particle color; `image` uses raw texture |
| `background.particles.movement.speed.min` | `number` | `0.08` | Minimum particle speed |
| `background.particles.movement.speed.max` | `number` | `0.4` | Maximum particle speed |
| `background.particles.movement.direction` | `[number, number, number]` | `[0,-1,0]` | Base movement direction vector |
| `background.particles.movement.gravity` | `number` | `-0.01` | Gravity force |
| `background.particles.movement.turbulence` | `number` | `0.2` | Random turbulence strength |
| `background.particles.movement.tiltVariance` | `number` | `0.1` | Direction tilt randomness |
| `background.particles.lifecycle.respawn` | `boolean` | `true` | Respawn particles when out of bounds |
| `background.particles.area.type` | `'box'\|'sphere'\|'plane'` | `'box'` | Spawn area shape |
| `background.particles.area.size` | `number\|[number,number,number]` | — | Spawn area dimensions |
| `background.particles.area.position` | `[number,number,number]` | `[0,0,0]` | Spawn area center position |

### Color Background Contract (`hero.background.color.*`)

| Field | Type | Notes |
| --- | --- | --- |
| `background.color.solid` | `ThemeValue<string>` | Modern solid color (supports `{ light, dark }`) |
| `background.color.value` | `ThemeValue<string>` | Legacy alias for `solid`; still supported |
| `background.color.gradient.enabled` | `boolean` | Enable gradient |
| `background.color.gradient.type` | `'linear'\|'radial'\|'conic'` | Gradient kind |
| `background.color.gradient.direction` | `string\|number` | Angle; number normalized to `deg` at runtime |
| `background.color.gradient.center` | `string` | Radial/conic center point |
| `background.color.gradient.shape` | `string` | Radial shape (`circle`, `ellipse`) |
| `background.color.gradient.size` | `string` | Radial size (`closest-side`, `farthest-corner`, etc.) |
| `background.color.gradient.stops[].color` | `ThemeValue<string>` | Gradient color stop (supports light/dark) |
| `background.color.gradient.stops[].position` | `string` | Stop position, e.g., `52%` |
| `background.color.gradient.colors` | `ThemeValue<string>[]` | Legacy alias for `stops` |
| `background.color.gradient` | `ThemeValue<string>[]` | Legacy array shorthand |
| `background.color.direction` | `string\|number` | Legacy direction for array gradient form |
| `background.color.gradient.animation.enabled` | `boolean` | Enable gradient animation |
| `background.color.gradient.animation.type` | `'flow'\|'rotate'\|'pulse'` | Animation style |
| `background.color.gradient.animation.duration` | `number` | Animation cycle duration in ms |

---

## Background Layers (`hero.background.layers[]`)

> Each layer supports the same type-specific keys as single-background mode.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `layers[].type` | `'image'\|'video'\|'color'\|'shader'\|'particles'\|'none'` | **required** | Layer type |
| `layers[].zIndex` | `number` | auto (index) | Stacking order |
| `layers[].opacity` | `number` | `1` | Layer opacity |
| `layers[].blend` | `string` | `'normal'` | CSS mix-blend-mode |
| `layers[].cssVars` | `Record<string, ThemeValue<string>>` | — | Layer-scoped CSS vars |
| `layers[].style` | `Record<string, unknown>` | — | Layer inline style overrides |
| `layers[].image` | `object` | — | Image config (same keys as `background.image.*`) |
| `layers[].video` | `object` | — | Video config (same keys as `background.video.*`) |
| `layers[].color` | `object` | — | Color config (same keys as `background.color.*`) |
| `layers[].shader` | `object` | — | Shader config (same keys as `background.shader.*`) |
| `layers[].particles` | `object` | — | Particles config (same keys as `background.particles.*`) |

---

## Hero Colors (`hero.colors.*`)

### Text Colors

| Field | Type | Description |
| --- | --- | --- |
| `hero.colors.title` | `ThemeValue<string>` | Hero `name` (H1) color |
| `hero.colors.text` | `ThemeValue<string>` | Hero `text` (subtitle) color |
| `hero.colors.tagline` | `ThemeValue<string>` | Hero `tagline` color |

### Nav Colors

| Field | Purpose |
| --- | --- |
| `hero.colors.navText` | Nav link text (top of page) |
| `hero.colors.navTextScrolled` | Nav link text after scroll |
| `hero.colors.navTextHover` | Nav link hover color |
| `hero.colors.navTextHoverScrolled` | Nav link hover color after scroll |
| `hero.colors.navBackground` | Nav bar background |
| `hero.colors.navBackgroundScrolled` | Nav bar background after scroll |

### Search Colors

| Field | Purpose |
| --- | --- |
| `hero.colors.searchBackground` | Search button background |
| `hero.colors.searchBackgroundScrolled` | Search button background (scrolled) |
| `hero.colors.searchHoverBackground` | Search hover background |
| `hero.colors.searchHoverBackgroundScrolled` | Search hover background (scrolled) |
| `hero.colors.searchText` | Search text/icon |
| `hero.colors.searchTextScrolled` | Search text/icon (scrolled) |
| `hero.colors.searchTextMuted` | Search placeholder text |
| `hero.colors.searchTextMutedScrolled` | Search placeholder (scrolled) |
| `hero.colors.searchBorder` | Search border |
| `hero.colors.searchBorderScrolled` | Search border (scrolled) |
| `hero.colors.searchKeyBackground` | Keyboard shortcut chip background |
| `hero.colors.searchKeyBackgroundScrolled` | Keyboard shortcut chip background (scrolled) |
| `hero.colors.searchKeyText` | Keyboard shortcut chip text |
| `hero.colors.searchKeyTextScrolled` | Keyboard shortcut chip text (scrolled) |

All color values support `ThemeValue<string>` — use `{ light: "...", dark: "..." }` for theme-specific values or a plain string for both themes.

---

## Waves (`hero.waves.*`)

> Waves are always rendered on hero pages. `waves.enabled: false` is ignored.

| Field                      | Type      | Default             | Description |
| -------------------------- | --------- | ------------------- | --- |
| `waves.enabled`            | `boolean` | `true`              | Ignored at runtime; waves always render |
| `waves.animated`           | `boolean` | `true`              | Enable wave animation |
| `waves.height`             | `number`  | `80` px             | Wave element height |
| `waves.opacity`            | `number`  | `1`                 | Overall wave opacity |
| `waves.speed`              | `number`  | `1`                 | Animation speed (clamped 0.1–3) |
| `waves.color`              | `string`  | `var(--vp-c-bg)`    | Wave fill color |
| `waves.reversed`           | `boolean` | `false`             | Flip wave direction |
| `waves.outline`            | `boolean\|object` | `true`       | Enable/configure outline shadow |
| `waves.outline.type`       | `string`  | `'shadow'`          | Outline type (`shadow` or custom) |
| `waves.outline.blur`       | `number`  | `5`                 | Outline blur radius |
| `waves.zIndex`             | `number`  | `1`                 | Wave element z-index |
| `waves.seamOverlap`        | `number`  | `1.6`               | Overlap factor to avoid rendering seams |
| `waves.layers[].opacity`   | `number`  | 0.25/0.5/1.0        | Per-layer opacity |
| `waves.layers[].speed`     | `number`  | 0.6/0.8/1.0         | Per-layer speed multiplier |
| `waves.layers[].direction` | `number`  | `1`                 | Movement direction (`1` or `-1`) |
| `waves.layers[].amplitude` | `number`  | 12/16/20            | Wave height amplitude |
| `waves.layers[].frequency` | `number`  | 0.01/0.007/0.005    | Wave frequency |
| `waves.layers[].color`     | `string`  | inherits            | Per-layer color override |

---

## Hero Image (`hero.image.*`)

| Field                          | Type                                                           | Default      | Description |
| ------------------------------ | -------------------------------------------------------------- | ------------ | --- |
| `image.type`                   | `'image'\|'video'\|'gif'\|'model3d'\|'lottie'`                 | **required** | Media type selector |
| `image.background.enabled`     | `boolean`                                                      | `false`      | Enable glow/background layer behind image |
| `image.width`                  | `number\|string`                                               | —            | Image element width |
| `image.height`                 | `number\|string`                                               | —            | Image element height |
| `image.fit`                    | `'contain'\|'cover'\|'fill'\|'none'\|'scale-down'`             | `'contain'`  | Object-fit behavior |
| `image.position`               | `string`                                                       | `'center'`   | CSS object-position |

### Image Type (`image.image.*`)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `image.image.src` | `string` | — | Image URL (both themes) |
| `image.image.light` | `string` | — | Light theme URL |
| `image.image.dark` | `string` | — | Dark theme URL |
| `image.image.alt` | `string` | `''` | Alt text |

### Video Type (`image.video.*`)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `image.video.src` | `string` | — | Video URL |
| `image.video.light` | `string` | — | Light theme video URL |
| `image.video.dark` | `string` | — | Dark theme video URL |
| `image.video.autoplay` | `boolean` | `true` | Auto-play |
| `image.video.loop` | `boolean` | `true` | Loop playback |
| `image.video.muted` | `boolean` | `true` | Mute audio |
| `image.video.controls` | `boolean` | `false` | Show player controls |
| `image.video.poster` | `string` | — | Poster image shown before play |
| `image.video.fit` | `'contain'\|'cover'\|'fill'\|'none'\|'scale-down'` | `'contain'` | Object-fit |
| `image.video.position` | `string` | `'center'` | CSS object-position |

### GIF Type (`image.gif.*`)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `image.gif.src` | `string` | — | GIF URL |
| `image.gif.alt` | `string` | `''` | Alt text |
| `image.gif.loop` | `boolean` | `true` | Loop animation |
| `image.gif.autoplay` | `boolean` | `true` | Auto-play on load |
| `image.gif.fit` | `'contain'\|'cover'\|'fill'\|'none'\|'scale-down'` | `'contain'` | Object-fit |
| `image.gif.position` | `string` | `'center'` | CSS object-position |

### 3D Model Type (`image.model3d.*`)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `image.model3d.src` | `string` | **required** | GLB/GLTF file path |
| `image.model3d.fitPadding` | `number` | auto | Camera fit padding multiplier |
| `image.model3d.scale` | `[number,number,number]` | `[1,1,1]` | Model scale `[x,y,z]` |
| `image.model3d.position` | `[number,number,number]` | `[0,0,0]` | Model position offset |
| `image.model3d.rotation` | `[number,number,number]` | `[0,0,0]` | Initial rotation in radians |
| `image.model3d.animation.enabled` | `boolean` | `false` | Enable built-in animation |
| `image.model3d.animation.type` | `'rotate'\|'bounce'\|'float'` | `'rotate'` | Animation behavior |
| `image.model3d.animation.speed` | `number` | `1` | Animation speed |
| `image.model3d.animation.axis` | `[number,number,number]` | `[0,1,0]` | Rotation axis for `rotate` type |
| `image.model3d.animation.amplitude` | `number` | — | Movement range for `bounce`/`float` |
| `image.model3d.animation.frequency` | `number` | — | Oscillation frequency for `bounce`/`float` |
| `image.model3d.interaction.enabled` | `boolean` | `false` | Enable user interaction |
| `image.model3d.interaction.rotate` | `boolean` | `false` | Allow drag-to-rotate |
| `image.model3d.interaction.autoRotate` | `boolean` | `false` | Auto-rotate when no interaction |
| `image.model3d.interaction.autoRotateSpeed` | `number` | `1` | Auto-rotate speed |
| `image.model3d.camera.fov` | `number` | `45` | Camera field of view in degrees |
| `image.model3d.camera.near` | `number` | `0.1` | Camera near clipping plane |
| `image.model3d.camera.far` | `number` | `100` | Camera far clipping plane |
| `image.model3d.camera.position` | `[number,number,number]` | auto | Camera position |
| `image.model3d.lighting.ambient.intensity` | `number` | `1` | Ambient light intensity |
| `image.model3d.lighting.ambient.color` | `string` | `'#ffffff'` | Ambient light color |
| `image.model3d.lighting.directional.intensity` | `number` | `1` | Directional light intensity |
| `image.model3d.lighting.directional.color` | `string` | `'#ffffff'` | Directional light color |
| `image.model3d.lighting.directional.position` | `[number,number,number]` | `[1,2,3]` | Directional light position |
| `image.model3d.lighting.point.enabled` | `boolean` | `false` | Enable point light |
| `image.model3d.lighting.point.intensity` | `number` | `1` | Point light intensity |
| `image.model3d.lighting.point.color` | `string` | `'#ffffff'` | Point light color |
| `image.model3d.lighting.point.position` | `[number,number,number]` | `[0,2,2]` | Point light position |

### Lottie Type (`image.lottie.*`)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `image.lottie.src` | `string` | — | Lottie JSON URL (both themes) |
| `image.lottie.light` | `string` | — | Light theme Lottie URL |
| `image.lottie.dark` | `string` | — | Dark theme Lottie URL |
| `image.lottie.loop` | `boolean` | `true` | Loop animation |
| `image.lottie.autoplay` | `boolean` | `true` | Auto-play |
| `image.lottie.speed` | `number` | `1` | Playback speed |
| `image.lottie.renderer` | `'svg'\|'canvas'` | `'svg'` | Rendering backend |
| `image.lottie.fit` | `'contain'\|'cover'\|'fill'\|'none'\|'scale-down'` | `'contain'` | Object-fit |
| `image.lottie.position` | `string` | `'center'` | CSS object-position |
| `image.lottie.background` | `string` | `'transparent'` | Canvas background color |

### Image Frame (`image.frame.*`)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `image.frame.shape` | `'rounded'\|'circle'\|'squircle'\|'diamond'\|'custom'\|'none'` | `'none'` | Frame shape preset |
| `image.frame.width` | `string\|number` | — | Frame width |
| `image.frame.height` | `string\|number` | — | Frame height |
| `image.frame.maxWidth` | `string\|number` | — | Max frame width |
| `image.frame.maxHeight` | `string\|number` | — | Max frame height |
| `image.frame.padding` | `string\|number` | — | Inner padding |
| `image.frame.radius` | `string\|number` | — | Border radius (overrides shape preset) |
| `image.frame.border` | `string\|boolean` | — | Border shorthand (e.g., `"1px solid rgba(255,255,255,0.3)"`) or `true` for default |
| `image.frame.borderWidth` | `string\|number` | — | Border width |
| `image.frame.borderColor` | `string` | — | Border color |
| `image.frame.background` | `ThemeValue<string>` | — | Frame background (supports light/dark) |
| `image.frame.shadow` | `ThemeValue<string>` | — | Box shadow (supports light/dark) |
| `image.frame.aspectRatio` | `string\|number` | — | Aspect ratio (e.g., `"16/9"` or `1.78`) |
| `image.frame.clipPath` | `string` | — | Custom CSS clip-path (for `shape: custom`) |
| `image.frame.overflow` | `string` | `'hidden'` | CSS overflow |

---

## Floating Elements (`hero.floating.*`)

### Global Config

| Field                         | Type                   | Default   | Description |
| ----------------------------- | ---------------------- | --------- | --- |
| `floating.enabled`            | `boolean`              | `true`    | Show floating elements |
| `floating.opacity`            | `number`               | `1`       | Global opacity |
| `floating.density`            | `number`               | `1`       | Number of visible items |
| `floating.blur`               | `number`               | `0`       | Backdrop blur in px |
| `floating.gradients`          | `ThemeValue<string>[]` | —         | Theme-aware gradient strings applied to element backgrounds |
| `floating.motion.enabled`     | `boolean`              | `true`    | Enable floating motion |
| `floating.motion.style`       | `'drift'`              | `'drift'` | Motion style (only `drift` supported) |
| `floating.motion.durationMin` | `number`               | `15` s    | Min animation cycle duration |
| `floating.motion.durationMax` | `number`               | `28` s    | Max animation cycle duration |
| `floating.motion.drift`       | `number`               | `20` px   | Drift amplitude |

### Per-Item Fields (all types)

| Field                   | Type                                     | Default        | Description |
| ----------------------- | ---------------------------------------- | -------------- | --- |
| `items[].type`          | `'text'\|'card'\|'image'\|'lottie'\|'badge'\|'icon'\|'stat'\|'code'\|'shape'` | `'text'` | Element type |
| `items[].x`             | `string`                                 | random         | Horizontal position (e.g., `"25%"`) |
| `items[].y`             | `string`                                 | random         | Vertical position (e.g., `"40%"`) |
| `items[].opacity`       | `number`                                 | `1`            | Item opacity |
| `items[].rotate`        | `number`                                 | `0` deg        | Initial rotation |
| `items[].delay`         | `number`                                 | `0` ms         | Animation start delay |
| `items[].duration`      | `number`                                 | random         | Animation cycle duration |
| `items[].driftX`        | `number`                                 | `motion.drift` | X drift amplitude override |
| `items[].driftY`        | `number`                                 | `motion.drift` | Y drift amplitude override |
| `items[].motionStyle`   | `'drift'`                                | `motion.style` | Per-item motion style |
| `items[].colorType`     | `'solid'\|'gradient'\|'random-gradient'` | `'solid'`      | Background color generation mode |
| `items[].src`           | `ThemeValue<string>`                     | type-default   | Image/Lottie source; supports light/dark variants |
| `items[].alt`           | `ThemeValue<string>`                     | type-default   | Image/Lottie alt text; supports light/dark variants |
| `items[].text/title/description/value/icon/code` | `ThemeValue<string>` | type-default | Theme-aware content fields |
| `items[].background`    | `ThemeValue<string>`                     | type-default   | Background color/gradient |
| `items[].borderColor`   | `ThemeValue<string>`                     | type-default   | Border color |
| `items[].borderRadius`  | `string`                                 | type-default   | Border radius |
| `items[].shadow`        | `ThemeValue<string>`                     | type-default   | Box shadow |

### Per-Type Fields

| Type    | Key Fields                                                                          |
| ------- | ----------------------------------------------------------------------------------- |
| `text`  | `text` (**req**, supports `ThemeValue<string>`), `color`, `size`, `weight`, `letterSpacing`, `textShadow` |
| `card`  | `title` or `description` (**req**, supports `ThemeValue<string>`), `titleColor`, `descriptionColor` |
| `image` | `src` (**req**, supports `ThemeValue<string>`), `alt` (`ThemeValue<string>`), `width`, `fit` |
| `lottie` | `src` (**req**, supports `ThemeValue<string>`), `alt` (`ThemeValue<string>`), `width`, `fit`, `loop`, `autoplay`, `speed` |
| `badge` | `text` or `icon` (**req**, supports `ThemeValue<string>`), `color` |
| `icon`  | `icon` (**req**, supports `ThemeValue<string>`), `color`, `size` |
| `stat`  | `value` (**req**, supports `ThemeValue<string>`), `text` (**req**, supports `ThemeValue<string>`), `color` |
| `code`  | `code` (**req**, supports `ThemeValue<string>`), `color`, `size` |
| `shape` | `shape` (**req**: `circle`, `square`, `diamond`, `hexagon`), `size`                 |

---

## Action Style Overrides (`hero.actions[].style.*`)

| Field | Type | Description |
| --- | --- | --- |
| `style.backgroundColor` | `string` | Button background color |
| `style.textColor` | `string` | Button text color |
| `style.outlineWidth` | `string` | Outline width |
| `style.outlineStyle` | `string` | Outline style (`solid`, `dashed`, etc.) |
| `style.outlineColor` | `string` | Outline color |
| `style.borderRadius` | `string` | Border radius |
| `style.padding` | `string` | Button padding |
| `style.boxShadow` | `string` | Box shadow |
| `style.fontWeight` | `string\|number` | Font weight |
| `style.letterSpacing` | `string` | Letter spacing |
| `style.hover.enabled` | `boolean` | Enable hover state overrides |
| `style.hover.backgroundColor` | `string` | Hover background |
| `style.hover.textColor` | `string` | Hover text color |
| `style.hover.outlineColor` | `string` | Hover outline color |
| `style.hover.boxShadow` | `string` | Hover box shadow |
| `style.hover.tilt3D.enabled` | `boolean` | Enable 3D tilt on hover |
| `style.hover.tilt3D.intensity` | `number` | Tilt intensity |
| `style.hover.tilt3D.perspective` | `string` | CSS perspective value |

### Example

```yaml
hero:
  actions:
    - theme: brand
      text: "Get Started"
      link: /en-US/guide/
      style:
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

---

## Nested Showcase Map

- [Matrix Home](./matrix/)
- [Basic](./matrix/basic/)
- [Single Background](./matrix/backgroundSingle/)
- [Color Background](./matrix/backgroundSingle/color/)
- [Gradient Colors](./matrix/backgroundSingle/color/gradientColors)
- [Theme Sync Colors](./matrix/backgroundSingle/color/themeSyncColors)
- [Image Background](./matrix/backgroundSingle/image/)
- [Video Background](./matrix/backgroundSingle/video/)
- [Shader Background](./matrix/backgroundSingle/shader/)
- [Particles Background](./matrix/backgroundSingle/particles/)
- [Layered Background](./matrix/layers/)
- [Waves](./matrix/waves/)
- [Image Types](./matrix/imageTypes/)
- [Floating Elements](./matrix/floating/)
- [Buttons and Features](./matrix/buttonsFeatures/)
- [Configuration Coverage Map](./matrix/configCoverage)
