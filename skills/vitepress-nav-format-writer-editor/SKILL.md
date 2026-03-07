---
name: vitepress-nav-format-writer-editor
description: Write and edit locale VitePress nav.ts files using the typed nav builders used by CrychicDoc, M1honoVitepressTemplate, and toolkit-box-page. Use when adding or reorganizing nav sections, dropdown panels, preview panes, screenshots, third-party links, or locale-specific navigation copy while keeping the format readable, extensible, and aligned with the shared nav contract.
---

# VitePress Nav Format Writer Editor

Use this skill when the task is content authoring or restructuring inside locale `nav.ts` files.

## Quick Workflow

1. Open the target locale nav file first:
- If the repo root contains `.vitepress/`, use `.vitepress/config/locale/<locale>/nav.ts`
- If the repo root contains `docs/.vitepress/`, use `docs/.vitepress/config/locale/<locale>/nav.ts`
- Treat that resolved location as `<theme-root>/config/locale/<locale>/nav.ts`
2. Load references as needed:
- `references/nav-authoring-map.md` for builder and file-path reminders
- `references/nav-authoring-playbook.md` for writing patterns
3. Restructure the file into named typed sections instead of one giant exported object:
- top-level items such as `homeNav`
- grouped dropdown panels such as `docsPanels`
- preview constants when reused
4. Use builders for structural nav content:
- `createLinkedNavItem`
- `createDropdownNavItem`
- `createNavDropdown`
- `createNavPreviewPanel`
- `createNavItems`
- `createScreenshotMedia`
- `createShowcasePreview`
5. Keep previews content-rich but visually restrained by default:
- full-image screenshot
- no forced browser frame
- no forced hover effect
- no shadow shell unless explicitly requested
6. Mark third-party documentation clearly:
- use `href`
- add a badge when useful
- mention that it is third-party in the copy
7. Keep locale parity where the information architecture is meant to match.
8. Do not touch component registries unless the nav content truly requires a new renderer or component.
9. Verify with `yarn build` in the touched repo.

## Authoring Rules

1. Do not export a raw deeply nested JSON-like blob as the main nav authoring style.
2. Do not inline preview objects everywhere when a named preview constant improves reuse.
3. Do not use `link` for third-party docs. Use `href`.
4. Do not omit required typed fields such as preview `type` when writing raw objects. Prefer builders so this cannot happen.
5. Do not bury site-structure meaning in anonymous arrays. Use named sections and named panels.
6. Do not edit shared renderer or contract files for simple nav copy changes.

## Typical Tasks

### Add a new top-level docs area

1. Create named panel constants.
2. Build preview content with builder helpers.
3. Export with `createNavItems(...)`.
4. Mirror the structure to sibling locales when appropriate.

### Reclassify a link as third-party

1. Switch from `link` to `href`.
2. Add a badge such as `3rd-party` if the distinction matters in the UI.
3. Update preview/body copy so users know they are leaving the main docs set.

### Improve a screenshot preview

1. Add or update a real screenshot path under the site's public assets.
2. Use `createScreenshotMedia(...)` or `createShowcasePreview(...)`.
3. Keep the default variant plain unless the design explicitly calls for a custom frame.

## Files To Inspect First

- `<theme-root>/config/locale/en-US/nav.ts`
- `<theme-root>/config/locale/zh-CN/nav.ts`
- `<theme-root>/utils/config/navFactory.ts`
- `<theme-root>/utils/config/navTypes.ts`

## Related Skills

- [$vitepress-nav-format-extender](../vitepress-nav-format-extender/SKILL.md) for contract and renderer changes
- [$vitepress-template-extender](../vitepress-template-extender/SKILL.md) for broader template feature work

## Resources

- `references/nav-authoring-map.md`
- `references/nav-authoring-playbook.md`
