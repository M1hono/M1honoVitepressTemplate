---
title: Extension Architecture
layout: doc
description: Source-of-truth directories and checklists for components, functions, configuration, plugins, and style extension.
priority: 12
---

# Extension Architecture

This page explains where framework code belongs and how to extend the template without mixing contracts, runtime state, and rendering.

## Architectural Rule

Use this separation consistently:

- `api` owns contract truth
- `runtime` owns shared state and lifecycle
- `theme/components` owns rendering
- `config` owns project defaults and registration wiring
- `docs/src` owns examples and developer-facing documentation

If one change starts touching all five layers, move in that order instead of editing randomly.

## Create a Standard Page

For a normal documentation page:

1. Create the markdown file under the same relative path in both locales.
   Example: `docs/src/en-US/guide/example.md` and `docs/src/zh-CN/guide/example.md`.
2. Start with simple page frontmatter:

```yaml
---
title: Example Page
layout: doc
description: What this page covers.
---
```

3. Only add nav or homepage entry points if the page should be discoverable from a top-level surface.
4. If the page introduces a new frontmatter contract, update the matching `frontmatter/**` reference page in the same change.
5. If the page lives in a new directory branch, make sure the sidebar metadata for that branch exists and builds cleanly.

## Create a Home or Hero Page

For a landing page or hub page driven by the hero system:

1. Use `layout: home`.
2. Author the hero contract in frontmatter first:

```yaml
---
layout: home
hero:
  name: Framework Docs
  text: Build and Extend the Template
  tagline: Runtime, frontmatter, plugins, and component workflows
  actions:
    - theme: brand
      text: Development Workflow
      link: /frontmatter/reference/developmentWorkflow
---
```

3. Add `features` or `featureCards` only after the hero content is stable.
4. If the page uses reusable hero action keys, extend the link-key contract in the home-link service and hero frontmatter API instead of hardcoding branches in a component.
5. If the page changes nav/search/hero visuals, document the corresponding frontmatter keys immediately.

## Component Extension

When adding a new component:

1. Place it under the right category in `docs/.vitepress/theme/components/<category>/`.
2. Export it from the matching barrel in `docs/.vitepress/utils/vitepress/componentRegistry/**` when it should be reused internally.
3. Register it in `docs/.vitepress/utils/vitepress/components.ts` when markdown users should be able to reference it directly.
4. Add locale resources under both `docs/.vitepress/config/locale/en-US/components/**` and `docs/.vitepress/config/locale/zh-CN/components/**` when the component has UI text.
5. Keep `docs/.vitepress/config/locale/component-id-mapping.json` synchronized with any new `useSafeI18n("<component-id>", ...)` identifier.

## Register New Content

Use this deeper chain for content-style components that appear in markdown or in the document shell:

1. Create the Vue file under `docs/.vitepress/theme/components/content/`.
2. Export it from `docs/.vitepress/theme/components/content/index.ts` if that barrel exists.
3. Export it from `docs/.vitepress/utils/vitepress/componentRegistry/contentRegistry.ts` when other theme modules should import it through the registry layer.
4. Register it in `docs/.vitepress/utils/vitepress/components.ts` when markdown pages should call it directly by tag name.
5. If it uses `useSafeI18n`, add locale JSON files and add the component ID mapping entry.
6. If it is emitted by a markdown plugin, make sure the plugin outputs a registered tag and not an unregistered custom element.
7. Add at least one real markdown usage page so the component is validated in build output instead of only in isolation.

Use this rule of thumb:

- `componentRegistry/contentRegistry.ts`
  Internal reuse inside the theme layer.
- `components.ts`
  Public markdown/global registration.

## Function and Runtime Extension

When adding a function, composable, service, or controller:

1. Put pure data normalization in `docs/.vitepress/utils/vitepress/api/**`.
2. Put shared stateful behavior in `docs/.vitepress/utils/vitepress/runtime/**`.
3. Export public entry points from the nearest `index.ts` barrel.
4. Prefer one shared runtime over many local observers inside components.
5. Do not let feature components become the only place where a behavior is implemented if multiple views will need it later.

Strong examples already in the template:

- Theme sync: `docs/.vitepress/utils/vitepress/runtime/theme/**`
- Hero nav adaptation: `docs/.vitepress/utils/vitepress/runtime/hero/navAdaptiveState.ts`
- Frontmatter contract normalization: `docs/.vitepress/utils/vitepress/api/frontmatter/hero/HeroFrontmatterApi.ts`

## Configuration Extension

Use the configuration layer for anything that should be centrally declared and then consumed by runtime or views.

Typical files:

- `docs/.vitepress/config/project-config.ts`
  Global project settings, feature toggles, social links, routing helpers, and search setup.
- `docs/.vitepress/config/lang/**`
  Locale-facing nav and theme configuration.
- `docs/.vitepress/config/markdown-plugins.ts`
  Markdown plugin composition order.
- `docs/.vitepress/config/shaders/**`
  Built-in shader presets and shader registry wiring.

Checklist:

1. Define the new field or registry entry.
2. Normalize it in the correct API layer.
3. Consume only normalized values in runtime or views.
4. Add a docs example immediately.
5. Run `yarn sync-config` and `yarn frontmatter` when generated metadata depends on the change.

## Style Extension

Global style ownership should stay explicit. Follow the import layering in `docs/.vitepress/theme/styles/index.css`.

Use the correct vehicle:

- Scoped `<style>` for component-local layout and visuals
- Global CSS under `docs/.vitepress/theme/styles/**` for shared tokens, plugin skinning, and cross-component selectors
- Frontmatter or config-backed CSS variables for theme-sensitive or runtime-sensitive values

Prefer CSS variable contracts over one-off hardcoded global selectors when a value is meant to be themed or changed by content authors.

## Create a New Markdown Plugin

When adding a markdown plugin:

1. Implement it in `docs/.vitepress/plugins/**`.
2. Register it in `docs/.vitepress/config/markdown-plugins.ts`.
3. Register any required rendering component in `docs/.vitepress/utils/vitepress/components.ts`.
4. Add usage pages under both `docs/src/en-US/**` and `docs/src/zh-CN/**`.
5. Build and verify actual rendered output, not just the parser.

If the plugin creates a reusable authoring surface, also document:

- the markdown syntax
- the rendered component name
- any frontmatter dependency
- copy-paste-safe examples in both locales

## Recommended File Ownership Table

Use this quick lookup when deciding where to edit:

- New hero field or nested frontmatter key: `docs/.vitepress/utils/vitepress/api/frontmatter/**`
- Theme-ready lifecycle or observer logic: `docs/.vitepress/utils/vitepress/runtime/**`
- New Vue block or visual surface: `docs/.vitepress/theme/components/**`
- New markdown syntax: `docs/.vitepress/plugins/**` plus `docs/.vitepress/config/markdown-plugins.ts`
- New global token or shared skin: `docs/.vitepress/theme/styles/**`
- New usage guide or extension manual: `docs/src/**`

## Import Alias Reference

The project uses TypeScript path aliases configured in `docs/tsconfig.json` and mirrored in `docs/.vitepress/config/common-config.ts` (Vite `resolve.alias`). Always use aliases instead of deep relative paths.

| Alias | Resolves to | Example import |
|---|---|---|
| `@utils` | `docs/.vitepress/utils/` | `import { getThemeRuntime } from '@utils'` |
| `@utils/*` | `docs/.vitepress/utils/*` | `import { resolveThemeValueByMode } from '@utils/vitepress/runtime/theme/themeValueResolver'` |
| `@utils/vitepress` | `docs/.vitepress/utils/vitepress/index.ts` | `import { useHeroTheme } from '@utils/vitepress'` |
| `@config` | `docs/.vitepress/utils/config/` | `import { someConfigUtil } from '@config'` |
| `@config/*` | `docs/.vitepress/utils/config/*` | `import { someHelper } from '@config/helpers'` |
| `@components` | `docs/.vitepress/theme/components/` | `import MyComponent from '@components/content/MyComponent.vue'` |
| `@components/*` | `docs/.vitepress/theme/components/*` | `import Footer from '@components/navigation/Footer.vue'` |

::: warning @config does NOT point to docs/.vitepress/config/
`@config` resolves to `docs/.vitepress/utils/config/`, **not** `docs/.vitepress/config/`. Files in `docs/.vitepress/config/` (such as shaders, locale data, and project-config) have **no alias**. Use relative imports to reach them, e.g. `import { getShaderTemplate } from '../../../../config/shaders'`.
:::

## Services Layer

Services are stateless or lightly-stateful modules that perform a focused task. They live under `docs/.vitepress/utils/vitepress/services/`.

Key services already in the template:

- **home-link service** — Resolves named action keys (e.g. `"get-started"`, `"guide"`) into actual route URLs. Used by hero action buttons so links can be authored as symbolic keys rather than hardcoded paths.
- **i18n service** (`useSafeI18n`) — Provides safe locale string lookup. Returns the key itself when a translation is missing, preventing blank UI. Paired with `component-id-mapping.json` for per-component namespacing.

When adding a new service:

1. Create it in `docs/.vitepress/utils/vitepress/services/`.
2. Export from the nearest barrel.
3. Keep it decoupled from Vue component lifecycle — services should be importable from runtime, API, or component layers.

## System Layer

System modules handle cross-cutting wiring that glues configuration, locale, and runtime together. They live under `docs/.vitepress/utils/vitepress/system/`.

Key system modules:

- **component-id-mapping** — Maps component identifiers to locale namespaces. When a component calls `useSafeI18n("my-component", ...)`, this mapping tells the i18n service which JSON file holds the strings.
- **locale wiring** — Ensures locale JSON files under `docs/.vitepress/config/locale/{en-US,zh-CN}/` are correctly loaded and made available to the i18n service.

When adding a new system module:

1. Create it in `docs/.vitepress/utils/vitepress/system/`.
2. If it affects i18n, update `component-id-mapping.json` and both locale directories.
3. Export from the system barrel so other layers can consume it.

## Component Registry Barrels

Components are organized into four registries under `docs/.vitepress/utils/vitepress/componentRegistry/`. These barrels control **internal reuse** across the theme layer (distinct from `components.ts` which controls **markdown-facing global registration**).

### contentRegistry.ts (15 components)

`CustomAlert`, `comment`, `Linkcard`, `PageTags`, `TagsPage`, `Bills`, `MdDialog`, `MdMultiPageDialog`, `ChatMessage`, `ChatPanel`, `ArticleMetadata`, `ResponsibleEditor`, `MarkMapView`, `VChart`, `ShaderEffectBlock`

### mediaRegistry.ts (3 components)

`PdfViewer`, `YoutubeVideo`, `BilibiliVideo`

### navigationRegistry.ts (1 component)

`Footer`

### uiRegistry.ts (8 components)

`ProgressLinear`, `Buttons`, `State`, `Animation`, `NotFound`, `Preview`, `Carousels`, `Steps`

When adding a new component to the registry:

1. Place the Vue file in the appropriate category under `docs/.vitepress/theme/components/<category>/`.
2. Export it from the matching registry barrel above.
3. If markdown users should also use it by tag name, additionally register in `docs/.vitepress/utils/vitepress/components.ts`.

## Related Pages

- [Development Workflow](./developmentWorkflow) — Day-to-day development commands and processes
- [Hero Extension Playbook](./heroExtension) — Step-by-step guide for extending the hero system
- [Frontmatter Key Inventory](./keyInventory) — Complete listing of available frontmatter keys
- [Maintainability and Extension Guide](./maintainability) — Deep technical reference for all extension APIs
