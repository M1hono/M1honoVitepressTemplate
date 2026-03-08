---
title: Maintainability and Extension Guide
description: Engineering conventions for extending the template through APIs, registries, i18n, and plugin wiring.
---

# Maintainability and Extension Guide

## Objective

This template follows an extension-first architecture.  
New behavior should be introduced through registries and APIs, not by editing core runtime components.

## Detailed Pages

- [Development Workflow](./developmentWorkflow)
- [Extension Architecture](./extensionArchitecture)
- [Hero Extension Playbook](./heroExtension)

## Source-of-Truth Paths

- Runtime and APIs: `docs/.vitepress/utils/vitepress/**`
- Theme components: `docs/.vitepress/theme/components/**`
- Locale resources: `docs/.vitepress/config/locale/**`
- Markdown plugins: `docs/.vitepress/plugins/**`
- Plugin composition: `docs/.vitepress/config/markdown-plugins.ts`

## Extension APIs

### 1. Hero Typography Registry

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

Then configure:

```yaml
hero:
  typography:
    type: editorial-soft
```

### 2. Navigation Dropdown Layout Registry

```ts
import { navDropdownLayoutRegistry } from "@utils/vitepress/api/navigation";
import VPNavLayoutEditorial from "@components/navigation/layouts/VPNavLayoutEditorial.vue";

navDropdownLayoutRegistry.registerLayout("editorial", VPNavLayoutEditorial);
```

Then use:

```ts
dropdown: {
  layout: "editorial",
  panels: [...]
}
```

or explicit per-item component override:

```ts
dropdown: {
  layoutComponent: "VPNavLayoutEditorial",
  panels: [...]
}
```

### 3. Floating Element Registry

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

For complete custom rendering:

```yaml
hero:
  floating:
    items:
      - component: HeroFloatingCourseCard
        componentProps:
          title: KubeJS Course
          provider: GitBook
```

## New Component Workflow

1. Add component under `docs/.vitepress/theme/components/<category>/`.
2. Export via `docs/.vitepress/utils/vitepress/componentRegistry/*Registry.ts` when reusable.
3. Register globally in `docs/.vitepress/utils/vitepress/components.ts` if Markdown usage is required.
4. Add locale JSON files:
   - `docs/.vitepress/config/locale/en-US/components/...`
   - `docs/.vitepress/config/locale/zh-CN/components/...`
5. Update `docs/.vitepress/config/locale/component-id-mapping.json`.

Minimal i18n usage:

```vue
<script setup lang="ts">
import { useSafeI18n } from "@utils/i18n/locale";

const { t } = useSafeI18n("my-component", {
  title: "Default title",
});
</script>

<template>
  <h2>{{ t.title }}</h2>
</template>
```

## i18n Runtime Guarantees

- Locale is resolved reactively from VitePress language state.
- Cache bucket granularity is `componentId@locale`.
- Language switching updates text without page reload.
- Missing keys fall back to in-code defaults.
- Component path mapping is centralized in `component-id-mapping.json`.

## Markdown Plugin Workflow

1. Implement plugin under `docs/.vitepress/plugins/`.
2. Register in `docs/.vitepress/config/markdown-plugins.ts`.
3. Register required rendering components in `components.ts` if needed.
4. Add localized usage pages under `docs/src/en-US` and `docs/src/zh-CN`.

## Theme Sync Standard (First Enter + Reload Safe)

Use this standard for every component that has theme-sensitive visuals (hero backgrounds, themed assets, icon sets, metadata-like visual blocks, nav cards).

1. Do not read DOM theme classes directly in feature components.
2. Do not use raw `useData().isDark` as the sole source for first-paint visuals.
3. Use `getThemeRuntime(isDark)` and consume `effectiveDark`, `themeReady`, and `version` for visual decisions that must be stable on first enter, reload, and runtime toggle.
4. Inside hero descendants, use `useHeroTheme()` and prefer `isDarkRef.value` plus `resolveThemeValueByMode(...)`.
5. For first-paint-sensitive hero parts, gate rendering with `themeReady` in `VPHero` to avoid light/dark flash.
6. Never fallback from dark to light or light to dark automatically. Shared resolvers must follow `dark ?? value` and `light ?? value`.
7. Component folders stay view-only. If theme sync needs observers, scheduling, or shared lifecycle, move that logic into `docs/.vitepress/utils/vitepress/runtime/theme/**`.

Reference APIs:
- `@utils/vitepress/runtime/theme/themeRuntime`
- `@utils/vitepress/runtime/theme/heroThemeContext`
- `@utils/vitepress/runtime/theme/themeValueResolver`

Minimal pattern:

```ts
import { useData } from "vitepress";
import { getThemeRuntime } from "@utils/vitepress/runtime/theme";

const { isDark } = useData();
const { effectiveDark, themeReady, version } = getThemeRuntime(isDark);
```

## Resize Sync Standard

All resize-sensitive components must use the shared resize runtime instead of ad-hoc observers.

1. Use `createElementResizeState(targetRef, onResize, { debounceMs })`.
2. Re-observe once the target element exists (`if (targetRef.value) reobserve(targetRef.value)`).
3. Do not create manual `ResizeObserver` instances unless the shared API cannot satisfy a special case.
4. Keep cleanup lifecycle in the shared runtime, not duplicated per component.

Reference API:
- `@utils/vitepress/runtime/viewport/elementResizeState`

Minimal pattern:

```ts
import { createElementResizeState } from "@utils/vitepress/runtime/viewport";

const targetRef = ref<HTMLElement | null>(null);
const { reobserve } = createElementResizeState(
  targetRef,
  () => syncLayout(),
  { debounceMs: 80 },
);
```

## Day-to-Day Development Workflow

Use this order when changing framework behavior so contracts stay synchronized:

1. Change the contract first.
   Update schema, types, and normalization in `docs/.vitepress/utils/vitepress/api/**`.
2. Change shared runtime second.
   Put stateful lifecycle, DOM observation, viewport sync, theme sync, or adaptive logic in `docs/.vitepress/utils/vitepress/runtime/**`.
3. Change view components third.
   Keep `docs/.vitepress/theme/components/**` focused on rendering and light composition.
4. Update examples and docs immediately.
   If a new frontmatter key or extension point exists, add at least one markdown example and document the intended usage.
5. Run the matching verification commands before merge.

Recommended command sequence from `docs/`:

```bash
yarn locale
yarn sidebar
yarn tags
yarn build
```

When config or frontmatter contracts changed, also run:

```bash
yarn sync-config
yarn frontmatter
```

## Code Placement Guide

Use these directories as the primary source of truth:

- `docs/.vitepress/config/project-config.ts`
  Site-level product settings, feature toggles, language list, search provider, deployment, social links.
- `docs/.vitepress/config/lang/**`
  Nav/theme/search locale modules.
- `docs/.vitepress/config/shaders/**`
  Built-in shader templates and shader registry.
- `docs/.vitepress/config/markdown-plugins.ts`
  Markdown plugin composition and registration order.
- `docs/.vitepress/plugins/**`
  Markdown-it plugin implementations.
- `docs/.vitepress/theme/components/**`
  Vue rendering layer. Components should stay thin and consume normalized config/runtime state.
- `docs/.vitepress/theme/styles/**`
  Global style layers, variables, plugin styles, shared component CSS.
- `docs/.vitepress/utils/vitepress/api/**`
  Schemas, normalization, registries, contract types, extension APIs.
- `docs/.vitepress/utils/vitepress/runtime/**`
  Stateful domains such as theme sync, viewport sync, hero behavior, media/runtime observers.
- `docs/.vitepress/utils/vitepress/componentRegistry/**`
  Reusable export barrels for globally shared components.
- `docs/.vitepress/utils/vitepress/components.ts`
  Final global component registration for markdown/runtime use.

Rule of thumb:

- If it parses or validates config, it belongs in `api`.
- If it owns lifecycle or DOM coordination, it belongs in `runtime`.
- If it just renders props/state, it belongs in `theme/components`.

## Runtime and Function Extension Playbook

When adding a new function, composable, service, or controller:

1. Put pure contract helpers in `api`, not `theme/components`.
2. Put stateful controllers in `runtime`, preferably as small class-based modules when lifecycle is non-trivial.
3. Export new public APIs from the nearest `index.ts` barrel.
4. Avoid direct DOM reads in feature components when the behavior is shared or timing-sensitive.
5. Prefer one shared observer/runtime over repeated `MutationObserver` or `ResizeObserver` instances inside many components.

Good examples already in the framework:

- Theme stabilization: `docs/.vitepress/utils/vitepress/runtime/theme/**`
- Element resize runtime: `docs/.vitepress/utils/vitepress/runtime/viewport/**`
- Hero nav adaptation: `docs/.vitepress/utils/vitepress/runtime/hero/navAdaptiveState.ts`

## Component and Global Registration Playbook

When adding a new Vue component:

1. Create it under the correct folder in `docs/.vitepress/theme/components/<category>/`.
2. If it should be imported by other framework code, export it from the matching barrel in `docs/.vitepress/utils/vitepress/componentRegistry/**`.
3. If markdown users should be able to write it directly, register it in `docs/.vitepress/utils/vitepress/components.ts`.
4. If it has UI text, add locale resources and keep component ID mapping synchronized.

For markdown-facing components, the registry chain should stay:

`component file` -> `componentRegistry barrel` -> `components.ts` -> markdown/runtime consumption

## Configuration Extension Playbook

For new configuration or frontmatter fields:

1. Add the type to `docs/.vitepress/utils/vitepress/api/frontmatter/hero/HeroFrontmatterApi.ts` or the relevant API module.
2. Normalize legacy and modern forms in the same API layer.
3. Keep rendering components consuming normalized values only.
4. If the field affects nav/search/theme behavior, update the matching runtime controller rather than duplicating logic in the component.
5. Add a docs example page and update the maintainability/reference docs in the same change.

For site-level feature changes:

1. Update `docs/.vitepress/config/project-config.ts`.
2. Update locale config under `docs/.vitepress/config/lang/**` if labels or search locales change.
3. Run `yarn sync-config` and `yarn frontmatter` when the configuration must propagate into docs metadata or generated content.

## Style Extension Playbook

Global styling is layered deliberately. Follow the import order in `docs/.vitepress/theme/styles/index.css`:

1. Config variables
2. Base styles
3. Plugin styles
4. Shared component styles

Use the right style vehicle for the job:

- Scoped `<style>` in a component:
  Use for component-local layout and visuals.
- Global CSS under `docs/.vitepress/theme/styles/**`:
  Use for cross-component tokens, plugin skinning, layout primitives, and theme-wide selectors.
- CSS variables via frontmatter/config:
  Use for runtime-themable values, especially hero/background/nav/search colors.

Do not introduce ad-hoc global selectors when a CSS variable contract or scoped rule is enough.

## Hero Extension Playbook

Hero extension work should start from the contract layer, not the view layer.

### 1. Add a Typography Style

Register new styles with the typography registry:

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

Use the registered type in frontmatter as `hero.typography.type`.

### 2. Add a Floating Element Type

Register custom floating item types in the floating registry:

```ts
import { floatingElementRegistry } from "@utils/vitepress/api/frontmatter/hero";

floatingElementRegistry.registerType({
  type: "keyword-chip",
  renderAs: "badge",
  className: "floating-keyword-chip",
});
```

If the type requires custom rendering, bind it to a component and document the required `componentProps`.

### 3. Add a Shader Template

Shader templates are registered in `docs/.vitepress/config/shaders/index.ts` and shaped by `docs/.vitepress/config/shaders/templates/base-shader.ts`.

Minimal pattern:

```ts
// No @ alias covers .vitepress/config/ — use a relative import from your file location.
// Example: if your file is in .vitepress/config/shaders/, use:
import { registerShaderTemplate } from "./index";
import { baseVertexShader, buildTemplate } from "./templates/base-shader";
// From elsewhere (e.g. a component in .vitepress/theme/components/), adjust the path:
// import { registerShaderTemplate } from "../../../config/shaders";
// import { baseVertexShader, buildTemplate } from "../../../config/shaders/templates/base-shader";

registerShaderTemplate("aurora", buildTemplate({
  key: "aurora",
  vertex: baseVertexShader,
  fragment: `...`,
  defaultUniforms: {
    uIntensity: 0.8,
  },
}));
```

If it should ship as a built-in preset, also add a dedicated file under `docs/.vitepress/config/shaders/` and include it in the default registry map.

### 4. Add a New Background Renderer Type

If the new feature is not just a new shader preset but a new background type:

1. Extend `HeroBackgroundType` and related contracts in `HeroFrontmatterApi.ts`.
2. Normalize the new config shape in the same API layer.
3. Create the renderer component under `docs/.vitepress/theme/components/hero/background/`.
4. Wire the type-to-component mapping in `docs/.vitepress/theme/components/hero/background/BackgroundLayer.vue`.
5. Add a localized example page proving the new type works.

### 5. Extend Hero Nav/Search Visuals

Top-of-page nav and search visuals are driven by the `hero.colors.*` contract and resolved in `docs/.vitepress/utils/vitepress/runtime/hero/navAdaptiveState.ts`.

If you need new hero-driven nav/search behavior:

1. Add the typed color key to `HeroFrontmatterApi.ts`.
2. Resolve it in `navAdaptiveState.ts`.
3. Consume it through CSS variables rather than direct component branching.

## Documentation and Verification Checklist

Every framework-facing extension should ship with:

1. Type updates
2. Runtime/component integration
3. At least one markdown example
4. Locale/doc updates in both languages when applicable
5. Verification commands recorded in the PR or handoff

Minimum verification for framework work:

- `yarn locale`
- `yarn sidebar`
- `yarn tags`
- `yarn build`

## Engineering Rules

- Prefer class-based APIs for stateful runtime domains.
- Avoid compatibility re-export stubs for obsolete imports.
- Use `@` aliases for all internal imports.
- Expose new behavior through registration APIs instead of system patching.
- Validate with:
  - `npx tsc --noEmit`

## Related Pages

- [Extension Architecture](./extensionArchitecture) — Where framework code belongs and layer-by-layer extension checklists
- [Development Workflow](./developmentWorkflow) — Day-to-day development commands and processes
- [Hero Extension Playbook](./heroExtension) — Step-by-step guide for extending the hero system
- [Frontmatter Key Inventory](./keyInventory) — Complete listing of available frontmatter keys
