---
name: vitepress-nav-format-extender
description: Extend the typed navigation system used by CrychicDoc, M1honoVitepressTemplate, and toolkit-box-page. Use when changing nav types, builder helpers, nav validation, preview media behavior, dropdown layout components, or the shared nav rendering contract, especially when the same nav infrastructure must stay synced across the repo family without breaking each repo's local component registry.
---

# VitePress Nav Format Extender

Use this skill when the job is structural nav work, not just editing one locale's menu copy.

## Quick Workflow

1. Classify the task:
- `contract`: `navTypes.ts`, builder helpers, validation rules, or data shape changes
- `renderer`: dropdown layouts, preview rendering, or nav component behavior
- `registry`: layout registration or global component exposure for nav surfaces
- `sync`: propagate shared nav infrastructure to Template and Toolkit after CrychicDoc is stable
2. Load only the reference you need:
- Read `references/nav-source-map.md` for file ownership and repo path mapping.
- Read `references/nav-extension-playbook.md` for change checklists.
3. Detect the repo shape before editing:
- If the repo root contains `.vitepress/`, use `.vitepress/**`
- If the repo root contains `docs/.vitepress/`, use `docs/.vitepress/**`
- Treat that resolved location as `<theme-root>`
4. Keep the authoring surface typed:
- Shared nav contracts live in `utils/config/navTypes.ts`
- Builder and normalization logic live in `utils/config/navFactory.ts`
- Locale module loading and enforcement live in `utils/config/navConfig.ts`
5. Keep default screenshot previews plain:
- Default media should be full-image, no macOS chrome, no hover zoom, no forced shadow frame
- Only use framed/browser-like presentation when a renderer explicitly opts into it
6. Preserve local extensibility:
- Do not flatten or remove per-repo local registry loading in `utils/vitepress/components.ts`
- Shared nav changes must keep room for repo-local components and repo-local nav layouts
7. Sync shared infrastructure after the primary repo is stable:
- CrychicDoc is the main proving ground
- Mirror only the shared files to Template and Toolkit
- Do not overwrite locale-specific content or repo-specific local registries
8. Verify each touched repo with the narrowest meaningful command:
- `yarn build`
- `tsc -p tsconfig.json --noEmit` when the touched repo is currently type-checkable
- `git diff --check`

## Core Rules

1. Do not solve nav shape problems by hardcoding route-specific logic in render components.
2. Do not allow raw mega-dropdown blobs to become the de facto API. Push structure into builders and named typed sections.
3. Do not break simple top-level links just to enforce dropdown-builder rules.
4. Do not move shared nav behavior into unrelated theme runtime or route utilities.
5. Do not remove local `import.meta.glob(...)` component registry support. Shared nav infrastructure must coexist with repo-specific extras.
6. Do not widen scope into a full theme rewrite unless the user explicitly asks for it.

## Common Tasks

### Add a new nav preview media capability

1. Extend `NavMedia` in `navTypes.ts`.
2. Add or update a builder in `navFactory.ts`.
3. Update the preview renderer components.
4. Keep plain screenshot behavior as the default path.
5. Add an example to a locale `nav.ts` only after the contract is stable.

### Tighten nav validation

1. Normalize first in `navFactory.ts`.
2. Validate in `navConfig.ts`.
3. Enforce builders for dropdown formulas, panels, groups, and preview panels.
4. Leave simple link-only items alone unless there is a strong reason to constrain them.

### Add or change a dropdown layout

1. Update or add the layout component under `theme/components/navigation/layouts/**`.
2. Keep the layout data-driven off `NavDropdown`, `NavPanel`, and `NavPreviewPanel`.
3. If a repo needs a local-only layout, preserve that path through local component registration rather than forcing the shared layer to own it.

### Sync shared nav infrastructure

1. Stabilize CrychicDoc first.
2. Mirror shared nav contract and renderer files to Template and Toolkit.
3. Rebuild both mirrors.
4. Confirm their local component registries still load repo-specific additions.

## Files To Inspect First

- `<theme-root>/utils/config/navTypes.ts`
- `<theme-root>/utils/config/navFactory.ts`
- `<theme-root>/utils/config/navConfig.ts`
- `<theme-root>/theme/components/navigation/layouts/NavHoverPreviewSheet.vue`
- `<theme-root>/theme/components/navigation/layouts/VPNavLayoutSpotlight.vue`
- `<theme-root>/utils/vitepress/components.ts`

## Related Skills

- [$vitepress-template-extender](../vitepress-template-extender/SKILL.md) for broader template component/config work
- [$vitepress-doc-sync](../vitepress-doc-sync/SKILL.md) when shared developer docs must stay aligned

## Resources

- `references/nav-source-map.md`
- `references/nav-extension-playbook.md`
