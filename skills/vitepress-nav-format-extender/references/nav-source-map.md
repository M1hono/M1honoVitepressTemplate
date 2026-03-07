# Nav Source Map

Use this file to find the correct ownership boundary before editing nav code.

## Repo Root Shapes

- If the repo root contains `.vitepress/`, then `<theme-root> = .vitepress`
- If the repo root contains `docs/.vitepress/`, then `<theme-root> = docs/.vitepress`
- Resolve all paths in this document from `<theme-root>`

## Contract Files

- `utils/config/navTypes.ts`
  - Root nav interfaces: `NavItem`, `NavDropdown`, `NavPanel`, `NavPreviewPanel`, `NavMedia`
  - Change this first when the data shape must evolve
- `utils/config/navFactory.ts`
  - Typed builders
  - Normalization helpers
  - Builder enforcement markers
  - Default preview media helpers such as screenshot creation
- `utils/config/navConfig.ts`
  - Eager locale module loading
  - Normalization + assertion at config assembly time

## Renderer Files

- `theme/components/navigation/layouts/NavHoverPreviewSheet.vue`
  - Shared preview rendering surface
  - Default screenshot display should stay plain and full-image
- `theme/components/navigation/layouts/VPNavLayoutSpotlight.vue`
  - Spotlight-style dropdown layout
- Adjacent files in `theme/components/navigation/layouts/**`
  - Column or custom layout renderers

## Authoring Files

- `config/locale/<locale>/nav.ts`
  - Human-authored locale nav configuration
  - Prefer named sections and builder helpers over raw nested blobs

## Registry and Extension Files

- `utils/vitepress/components.ts`
  - Global component registration
  - Must keep local `import.meta.glob(...)` registry support for repo-specific additions
- Optional repo-local registry modules discovered by:
  - `<theme-root>/utils/vitepress/componentRegistry/local*.{ts,js}`
  - `<theme-root>/utils/vitepress/componentRegistry/**/*.local.{ts,js}`
  - `<theme-root>/theme/components/**/componentRegistry.local.{ts,js}`
  - `<theme-root>/theme/components/**/components.local.{ts,js}`

## Sync Boundaries

Sync these when the nav infrastructure changes:

- `utils/config/navTypes.ts`
- `utils/config/navFactory.ts`
- `utils/config/navConfig.ts`
- shared layout renderers under `theme/components/navigation/layouts/**`

Do not blindly sync these:

- locale `nav.ts`
- repo-local registry modules
- repo-specific nav content and links
