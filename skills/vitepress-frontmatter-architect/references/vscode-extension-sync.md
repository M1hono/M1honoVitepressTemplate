# VSCode Extension Sync Checklist

Use this checklist when frontmatter contracts change.

## Source Files

- Template snippets: `M1honoVitepressTemplate/.vscode/md.code-snippets`
- Extension registry: `PickAIDDocVSCodeExtension/src/data/FrontmatterRegistry.ts`
- Runtime/frontmatter docs: `M1honoVitepressTemplate/docs/src/en-US/frontmatter/**`

## Sync Procedure

1. Update runtime docs first (`docs/src/en-US/frontmatter/**`).
2. Update snippet templates:
- Add new keys and nested YAML examples.
- Remove stale keys from default snippets.
- Keep prefixes stable where possible.
3. Update extension registry:
- Add/adjust `FrontmatterField` entries.
- Ensure `key`, `snippet`, and `description` match runtime behavior.
4. Run audit:
- `python3 <skill>/scripts/audit_frontmatter_keys.py --repo-root <repo>`
5. Resolve mismatches:
- Missing in snippets
- Missing in extension registry
- Deprecated keys still exposed

## High-Priority Contract Rules

1. Keep outer keys covered:
- `title`, `description`, `layout`, `layoutClass`, `cssVars`, `cssVariables`, `hero`, `features`, `tags`, `metadata`, `progress`, `state`, `showComment`, `buttons`, `backPath`, `showEditor`, `editor`.
2. Keep hero inner keys covered:
- `hero.layout.viewport`
- `hero.background.*` and `hero.background.layers[*].*`
- `hero.waves.*`
- `hero.image.type` and `hero.image.background.enabled`
- `hero.floating.*` including `text|card|image|badge|icon|stat|code|shape`
- `hero.actions[*].style`
3. Keep features inner keys covered:
- `featuresConfig.scroll.*`, `featuresConfig.cards.*`, aliases `featureScroll`, `featureCards`.

## Deprecated Keys

Treat as deprecated/ignored and do not generate by default:

- `hero.customSnippet`

Prefer:

- `hero.snippets`
- `hero.floating.items`

