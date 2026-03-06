---
title: Hero Extension Playbook
layout: doc
description: How to extend hero typography, floating items, shaders, background renderers, and nav/search visuals.
priority: 13
---

# Hero Extension Playbook

Hero work should start from the contract layer and flow downward into runtime and rendering.  
Do not begin by editing a background component until the new shape is defined and normalized.

## Core Hero Extension Points

These files are the main source of truth:

- `docs/.vitepress/utils/vitepress/api/frontmatter/hero/HeroFrontmatterApi.ts`
- `docs/.vitepress/utils/vitepress/api/frontmatter/hero/HeroTypographyRegistryApi.ts`
- `docs/.vitepress/utils/vitepress/api/frontmatter/hero/FloatingElementRegistryApi.ts`
- `docs/.vitepress/utils/vitepress/runtime/hero/navAdaptiveState.ts`
- `docs/.vitepress/theme/components/hero/HeroBackground.vue`
- `docs/.vitepress/theme/components/hero/background/BackgroundLayer.vue`
- `docs/.vitepress/config/shaders/index.ts`
- `docs/.vitepress/config/shaders/templates/base-shader.ts`

## Add a Typography Style

Do not add a new `if styleType === ...` branch directly in hero components.  
Register the style through the typography registry and let the runtime resolve it.

Use one of these registration modes:

1. Shared built-in style
   Add the definition to `DEFAULT_TYPOGRAPHY_STYLE_DEFINITIONS` in `HeroTypographyRegistryApi.ts`.
2. Project-local bootstrap style
   Call `heroTypographyRegistry.registerStyle(...)` from a startup module imported by `docs/.vitepress/theme/index.ts`.

The definition should keep the canonical type lowercase and move aliases into `aliases`.

```ts
import { heroTypographyRegistry } from "@utils/vitepress/api/frontmatter/hero";

heroTypographyRegistry.registerStyle({
  type: "editorial-soft",
  aliases: ["soft-editorial"],
  motion: {
    intensity: 0.9,
    title: { x: 6, y: -4, scale: 1.03 },
    text: { x: 8, y: 3, scale: 1.02 },
    tagline: { x: 4, y: 6, scale: 1.01 },
    image: { x: 5, y: -2, scale: 1.015 },
    transitionDuration: 520,
    transitionDelayStep: 36,
    transitionEasing: "cubic-bezier(0.2, 0.9, 0.2, 1)",
  },
});
```

Frontmatter:

```yaml
hero:
  typography:
    type: editorial-soft
```

Registration checklist:

1. Define the motion defaults in `HeroTypographyRegistryApi.ts`.
2. Keep the canonical type and aliases lowercase because the registry normalizes them.
3. If the new style needs different structure or class hooks, update the hero content components or `docs/.vitepress/theme/components/hero/styles/vp-hero-typography.css`.
4. Verify the resolved style through the shared runtime in `docs/.vitepress/utils/vitepress/runtime/hero/typographyState.ts`, not by duplicating motion logic in multiple components.
5. Add a frontmatter example page and update the hero extension docs.

## Create a New Hero Page

Use a hero page when the page itself is a landing surface instead of a normal article.

```yaml
---
layout: home
hero:
  name: Hero Runtime
  text: Extend Backgrounds, Typography, and Nav
  tagline: Shared contract-first hero configuration
  typography:
    type: floating-tilt
  actions:
    - theme: brand
      text: Hero Extension
      link: /frontmatter/reference/heroExtension
features:
  - title: Shared Runtime
    details: Keep theme, resize, and viewport logic centralized.
---
```

Checklist:

1. Start from `layout: home`.
2. Keep hero configuration in frontmatter and avoid page-local component hacks.
3. Reuse action `linkKey` routes when the target belongs to the shared hero/home navigation system.
4. If this page becomes a primary entry point, wire nav and home hub links in the same change.

## Add a Floating Element Type

Register custom floating item types through the floating registry:

```ts
import { floatingElementRegistry } from "@utils/vitepress/api/frontmatter/hero";

floatingElementRegistry.registerType({
  type: "keyword-chip",
  renderAs: "badge",
  className: "floating-keyword-chip",
});
```

Frontmatter:

```yaml
hero:
  floating:
    items:
      - type: keyword-chip
        text: Event API
```

If the visual needs fully custom rendering, prefer a component-based item instead of hardcoding a special branch into the shared renderer.

## Add a New Hero Feature

When the feature is author-facing and not just a one-off style tweak:

1. Add the new field to `HeroFrontmatterApi.ts` and normalize it there.
2. If the feature has shared state, timing, observers, or viewport behavior, create or extend a runtime module under `docs/.vitepress/utils/vitepress/runtime/hero/**`.
3. Render the feature from the appropriate hero component only after the contract shape is stable.
4. Add real markdown examples under `docs/src/en-US/hero/**` and `docs/src/zh-CN/hero/**`.
5. If the feature changes home hero actions or named links, update the home-link service and the docs tables that describe valid `linkKey` values.

## Add a Shader Preset

Built-in shaders belong in `docs/.vitepress/config/shaders/**`.

Recommended steps:

1. Create or extend a preset file such as `docs/.vitepress/config/shaders/silk.ts`.
2. Reuse helpers from `docs/.vitepress/config/shaders/templates/base-shader.ts` where possible.
3. Export the preset from `docs/.vitepress/config/shaders/index.ts`.
4. Reference the preset through normalized hero frontmatter rather than importing it directly in a page component.

Example frontmatter:

```yaml
hero:
  background:
    type: shader
    shader:
      preset: silk
```

## Add a New Background Renderer Type

When the existing `color`, `image`, `video`, `shader`, or `particles` renderers are not enough:

1. Add the new type to hero frontmatter normalization in `HeroFrontmatterApi.ts`.
2. Add the matching rendering branch in `docs/.vitepress/theme/components/hero/background/BackgroundLayer.vue`.
3. Create a dedicated renderer component under `docs/.vitepress/theme/components/hero/background/`.
4. Keep theme-sensitive behavior and observers in shared runtime modules if the renderer needs them.
5. Add a markdown example page under `docs/src/en-US/hero/**` and `docs/src/zh-CN/hero/**`.

## Extend Nav and Search Visuals

Hero-adjacent nav and search visuals are part of the hero contract when they depend on scroll position, theme stabilization, or frontmatter-driven colors.

Use this rule:

1. Put adaptive calculations in `docs/.vitepress/utils/vitepress/runtime/hero/navAdaptiveState.ts`.
2. Put theme-safe value resolution in the shared theme runtime, not ad-hoc component branches.
3. Expose author-facing colors through frontmatter-backed CSS variables when the look should be configurable per page.
4. Avoid direct DOM theme reads inside `Nav`, `Search`, or hero child components.

## Hero Extension Checklist

Before finishing a hero extension:

1. The new field or type is normalized in the API layer.
2. Rendering components consume normalized values only.
3. Theme and resize behavior use shared runtime helpers.
4. At least one real markdown example exists.
5. The change is documented in `docs/src`.
6. `yarn build` passes in the template before downstream sync.
