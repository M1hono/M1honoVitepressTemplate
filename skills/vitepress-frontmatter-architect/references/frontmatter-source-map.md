# Frontmatter Source Map

Use these files as the source of truth when auditing and documenting frontmatter.

## Runtime and Docs Contracts

- `docs/src/en-US/frontmatter/index.md`
  - Entry point for the frontmatter reference section.
- `docs/src/en-US/frontmatter/page/index.md`
  - Page-level authoring overview and entry points.
- `docs/src/en-US/frontmatter/page/globalPage.md`
  - Outer/global page keys (`cssVars`, `layoutClass`, `layout`, `isHome`).
- `docs/src/en-US/frontmatter/page/sidebarAutoSystem.md`
  - Sidebar automation and directory metadata behavior.
- `docs/src/en-US/frontmatter/content/index.md`
  - Content/UI authoring overview.
- `docs/src/en-US/frontmatter/content/featuresAndHome.md`
  - `features`, `featuresConfig`, `featureScroll`, `featureCards`.
- `docs/src/en-US/frontmatter/content/contentAndUi.md`
  - Metadata and UI toggles (`tags`, `metadata`, `progress`, `state`, `showComment`, `buttons`, `backPath`, `showEditor`, `editor`).
- `docs/src/en-US/frontmatter/hero/index.md`
  - Hero authoring overview.
- `docs/src/en-US/frontmatter/hero/heroRuntime.md`
  - Inner hero runtime keys (`hero.layout`, `hero.background`, `hero.waves`, `hero.image`, `hero.floating`).
- `docs/src/en-US/frontmatter/reference/keyInventory.md`
  - Cross-feature inventory of consumed keys.

## Hero Runtime Examples (Validation Pages)

- `docs/src/en-US/hero/matrix/**`
  - Compile-safe runtime matrix pages for backgrounds, waves, image types, floating, features, buttons.

## VSCode Snippet Sources

- `.vscode/md.code-snippets`
  - Template snippet prefixes and inserted frontmatter block content.
  - Known stale keys can exist here and must be aligned with runtime behavior.

## VSCode Extension Registry

- `../PickAIDDocVSCodeExtension/src/data/FrontmatterRegistry.ts`
  - Completion registry used by the extension.
  - Must align with runtime contracts and snippet templates.

## Runtime Behavior References

- `docs/src/en-US/guide/hero-enhancement.md`
- `docs/src/en-US/guide/hero-enhancement-quick-reference.md`
  - Runtime architecture and configuration details for hero enhancement system.

## Authoring Flow Notes

- Use `layout: doc` examples for normal page contracts.
- Use `layout: home` examples for hero-page and landing-page contracts.
- Keep the paired `page`, `content`, `hero`, and `reference` docs aligned whenever a new author-facing key is added.
