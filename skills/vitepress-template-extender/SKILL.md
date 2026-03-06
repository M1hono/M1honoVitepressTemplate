---
name: vitepress-template-extender
description: Extend and customize the M1hono VitePress template while preserving its existing architecture, style, and i18n conventions. Use when adding or modifying Vue components under docs/.vitepress/theme/components, wiring markdown plugins in docs/.vitepress/config/markdown-plugins.ts, updating project or locale configuration in docs/.vitepress/config, or introducing new template features that must match existing registration, translation, and build workflows.
---

# VitePress Template Extender

## Overview

Use this skill to implement new template elements and config changes in the same structure as this repository. Follow the workflow first, then load only the reference file needed for the current task.

## Quick Workflow

1. Identify extension type:
- `component`: Add or modify a Vue component in `docs/.vitepress/theme/components/**`.
- `page`: Add or modify a normal markdown page in `docs/src/**`.
- `hero-page`: Add or modify a `layout: home` landing page or docs hub.
- `hero-feature`: Extend hero frontmatter, runtime, or render behavior.
- `markdown-plugin`: Add or modify a markdown-it plugin in `docs/.vitepress/plugins/**` and wire it in `docs/.vitepress/config/markdown-plugins.ts`.
- `config`: Add or modify template config in `docs/.vitepress/config/**` or locale files in `docs/.vitepress/config/locale/**`.
2. Load references based on type:
- For file map and wiring chain, read `references/architecture-map.md`.
- For step-by-step implementation checklists, read `references/extension-playbook.md`.
3. Scaffold when adding a new component:
- Run `scripts/scaffold_component.py --repo-root <repo> --name <ComponentName> --category <content|ui|media|navigation|hero>`.
- Add `--write` to create files.
4. Implement changes in existing files using local conventions (imports, naming, export style, i18n mapping).
5. If the same developer-doc change must stay aligned with `CrychicDoc` or `toolkit-box-page`, use [$vitepress-doc-sync](../vitepress-doc-sync/SKILL.md) after the template change is stable.
6. Run verification commands from `docs/`:
- `yarn locale`
- `yarn sidebar`
- `yarn tags`
- `yarn build`

## Component Workflow

1. Place the component in the right category folder:
- `content`, `ui`, `media`, `navigation`, or `hero`.
2. Export it from that category's `index.ts` when the folder uses index exports.
3. If it is a content surface reused by theme internals, export it from `docs/.vitepress/utils/vitepress/componentRegistry/contentRegistry.ts`.
4. Register it in `docs/.vitepress/utils/vitepress/components.ts` if it must be globally available in markdown.
5. If using `useSafeI18n`, add translation JSON under both locales and update `component-id-mapping.json`.
6. If styles are reusable or global, place/update CSS in `docs/.vitepress/theme/styles/components/*.css` and import via `styles/index.css` when needed.

## Page Workflow

### Standard page

1. Create the markdown file under matching relative paths in both locales.
2. Start with `layout: doc` and basic page frontmatter.
3. Update docs hubs or locale nav only if the page should be promoted to a primary entry point.
4. If the page introduces a new contract, update the matching developer docs in `frontmatter/**` and `reference/**`.

### Hero page

1. Start with `layout: home`.
2. Author `hero`, `features`, and hero action data in frontmatter before touching view logic.
3. If the page needs named hero action routes, extend the home-link service and the hero frontmatter API instead of hardcoding component branches.
4. Update localized hub pages and nav if the new page becomes a top-level docs surface.

## Hero Feature Workflow

1. Add the author-facing contract in `docs/.vitepress/utils/vitepress/api/frontmatter/hero/**`.
2. Put shared timing, observer, or viewport logic in `docs/.vitepress/utils/vitepress/runtime/hero/**`.
3. Render the feature in `docs/.vitepress/theme/components/hero/**` only after the contract shape is stable.
4. For typography styles, prefer `HeroTypographyRegistryApi.ts`; for floating item kinds, prefer `FloatingElementRegistryApi.ts`.
5. Add real markdown examples and update the hero extension docs.

## Markdown Plugin Workflow

1. Implement plugin logic in `docs/.vitepress/plugins/`.
2. Reuse `container-plugin-factory.ts` or `tab-plugin-factory.ts` when the plugin fits those patterns.
3. Wire plugin with `md.use(...)` in `docs/.vitepress/config/markdown-plugins.ts`.
4. Add or update matching Vue components if plugin output references custom tags/components.
5. Add docs examples under `docs/src/<locale>/...` to validate rendering.

## Config Workflow

1. Update `docs/.vitepress/config/project-config.ts` for project-level behavior, toggles, or paths.
2. Update language modules in `docs/.vitepress/config/lang/*.ts` for nav/theme locale text.
3. Update `docs/.vitepress/config/locale/<lang>/components/**/*.json` for component text.
4. Keep i18n mapping file aligned:
- `docs/.vitepress/config/locale/component-id-mapping.json`
5. If config changes should sync to content/frontmatter, run:
- `yarn sync-config`
- `yarn frontmatter`
6. When updating developer reference docs, keep these pages aligned:
- `docs/src/en-US/frontmatter/reference/maintainability.md`
- `docs/src/en-US/frontmatter/reference/developmentWorkflow.md`
- `docs/src/en-US/frontmatter/reference/extensionArchitecture.md`
- `docs/src/en-US/frontmatter/reference/heroExtension.md`
- and their `zh-CN` counterparts
7. When the template-derived docs must stay aligned in `toolkit-box-page` or CrychicDoc, finish the template change first, then use [$vitepress-doc-sync](../vitepress-doc-sync/SKILL.md).

## Implementation Rules

1. Preserve existing import style and alias usage (`@utils`, `@config`, `@components`).
2. Keep component IDs kebab-case in `useSafeI18n("<id>", ...)`.
3. Create both `en-US` and `zh-CN` locale JSON files for any new translatable component.
4. For built-in typography styles, update `DEFAULT_TYPOGRAPHY_STYLE_DEFINITIONS`; for project-local styles, register them from a bootstrap module imported by `theme/index.ts`.
5. Prefer minimal, targeted edits over broad refactors.
6. Verify with build scripts before finishing.

## Resources

- `references/architecture-map.md`: Path map and wiring chain for components/plugins/config.
- `references/extension-playbook.md`: Change checklists for common extension types.
- `scripts/scaffold_component.py`: Create starter component and locale JSON files for this template.
- [$vitepress-doc-sync](../vitepress-doc-sync/SKILL.md): Cross-repo sync workflow for template-derived developer docs.
