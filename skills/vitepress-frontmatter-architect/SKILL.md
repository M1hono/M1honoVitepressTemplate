---
name: vitepress-frontmatter-architect
description: Build, audit, and document all frontmatter contracts (outer page-level and inner nested component-level) for M1honoVitepressTemplate and the PickAID VSCode extension. Use when adding or changing frontmatter keys, generating frontmatter documentation with YAML examples, syncing `.vscode/md.code-snippets` with `PickAIDDocVSCodeExtension/src/data/FrontmatterRegistry.ts`, or validating coverage for hero/background/waves/floating/features/content/plugin keys.
---

# VitePress Frontmatter Architect

## Quick Workflow

1. Run the audit script:
- `python3 scripts/audit_frontmatter_keys.py --repo-root <repo-path> --output /tmp/frontmatter-audit.md`
2. Read source map:
- `references/frontmatter-source-map.md`
3. Choose scope:
- `outer` keys: top-level keys such as `title`, `layout`, `hero`, `features`, `cssVars`.
- `inner` keys: nested keys such as `hero.background.layers[*].type`, `hero.waves.layers[*].opacity`.
4. For snippet-ready examples, read:
- `references/outer-inner-frontmatter-snippets.md`
5. For VSCode extension sync, read:
- `references/vscode-extension-sync.md`
6. For page-level authoring surfaces, use:
- `docs/src/en-US/frontmatter/page/**`
- `docs/src/en-US/frontmatter/content/**`
- `docs/src/en-US/frontmatter/hero/**`
- and their localized counterparts
7. Apply changes and validate:
- `cd <repo>/docs && yarn locale && yarn sidebar && yarn tags && yarn build`

## Execution Rules

1. Prefer runtime-truth over legacy snippet truth when conflicts exist.
2. Treat `hero.customSnippet` as deprecated and ignored; use `hero.snippets` and `hero.floating.items`.
3. Always include compile-safe YAML examples in docs updates.
4. Keep examples aligned with actual runtime contracts in:
- `docs/src/en-US/frontmatter/page/**`
- `docs/src/en-US/frontmatter/content/**`
- `docs/src/en-US/frontmatter/hero/**`
- `docs/src/en-US/frontmatter/reference/*.md`
- `docs/src/en-US/guide/hero-enhancement*.md`
- `docs/src/en-US/hero/matrix/**/*.md`
5. When local assets are used in frontmatter examples, prefer base-safe project paths and validate in build/runtime.

## Tasks

### 1. Audit Frontmatter Coverage

1. Run:
- `python3 scripts/audit_frontmatter_keys.py --repo-root <repo-path>`
2. Inspect:
- outer keys used by pages
- inner nested key paths
- snippet prefixes in `.vscode/md.code-snippets`
- extension registry keys in `PickAIDDocVSCodeExtension/src/data/FrontmatterRegistry.ts`
3. Use audit output to identify missing docs/snippets/registry entries.

### 2. Author Outer + Inner Frontmatter Docs

1. Update docs under:
- `docs/src/en-US/frontmatter/`
2. Ensure each updated section includes at least one YAML code block.
3. Keep outer/inner split explicit:
- outer table
- nested path table with concrete examples
4. Include both a normal `layout: doc` example and a `layout: home` hero-page example when the contract affects page authoring.
5. When template-derived developer docs changed and other repos should stay aligned, use [$vitepress-doc-sync](../vitepress-doc-sync/SKILL.md).

### 3. Sync VSCode Snippets + Extension Registry

1. Update `.vscode/md.code-snippets` prefixes and bodies for frontmatter.
2. Update `PickAIDDocVSCodeExtension/src/data/FrontmatterRegistry.ts` key coverage and snippets.
3. Re-run audit and close gaps.

## Deliverable Checklist

1. Frontmatter docs include both outer and inner sections.
2. Docs include YAML snippets, not only prose/tables.
3. Snippet templates and extension registry are aligned with runtime keys.
4. Build succeeds.
5. Audit output shows no obvious missing high-value keys.

## Resources

- `scripts/audit_frontmatter_keys.py`
  - Scan markdown frontmatter usage and emit outer/inner key inventory plus snippet/registry coverage summaries.
- `references/frontmatter-source-map.md`
  - Authoritative file map and ownership of frontmatter domains.
- `references/outer-inner-frontmatter-snippets.md`
  - Snippet-ready YAML examples for global, hero, waves, floating, features, and content/UI keys.
- `references/vscode-extension-sync.md`
  - Checklist for keeping template snippets and extension registry synchronized.
- [$vitepress-doc-sync](../vitepress-doc-sync/SKILL.md)
  - Cross-repo sync workflow for template-derived developer docs after frontmatter contract changes.
