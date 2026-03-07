# Nav Authoring Map

## Target Files

- If the repo root contains `.vitepress/`, then `<theme-root> = .vitepress`
- If the repo root contains `docs/.vitepress/`, then `<theme-root> = docs/.vitepress`
- Primary locale nav files:
  - `<theme-root>/config/locale/en-US/nav.ts`
  - `<theme-root>/config/locale/zh-CN/nav.ts`

## Primary Builders

- `createNavItems(...)`
  - Final exported array wrapper
- `createLinkedNavItem(...)`
  - Simple top-level internal or external item
- `createDropdownNavItem(...)`
  - Top-level dropdown trigger item
- `createNavDropdown(...)`
  - Dropdown container, panels, preview, layout
- `createNavPreviewPanel(...)`
  - Right-side preview pane with required `type`
- `createScreenshotMedia(...)`
  - Default plain screenshot media
- `createShowcasePreview(...)`
  - High-level preview helper for item previews

## Preview Defaults

- Prefer screenshot previews over ornamental frames.
- Default screenshot variant is plain.
- Use real screenshots under public assets when available.
- Keep hover motion off unless the design explicitly wants it.

## Common Content Patterns

- First-party internal docs:
  - use `link`
- Third-party docs:
  - use `href`
  - mention external ownership in `desc` or preview copy
- Shared screenshots:
  - extract into named constants if reused
- Shared panel groups:
  - extract into named constants if the structure is large
