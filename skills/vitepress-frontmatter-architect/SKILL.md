---
name: vitepress-frontmatter-architect
description: Design, document, audit, and migrate page, hero, content, sidebar, prev-next, and plugin frontmatter for the M1hono VitePress stack. Use whenever the task is to add a key, rename or deprecate one, explain supported YAML, update editor completions or hover docs, or keep docs, extension, and runtime behavior aligned for frontmatter-driven features.
---

# VitePress Frontmatter Architect

Use this skill to define the author-facing frontmatter contract before you start tracing implementation files.

## Start Here

1. Classify the request:
- `add-key`: introduce a new frontmatter key or nested path
- `refine-key`: change allowed values, defaults, or behavior
- `document-key`: explain an existing contract clearly
- `migrate-key`: deprecate, rename, or replace a contract
- `sync-editor`: update completions, hover docs, or snippets for existing frontmatter
2. Read the author-facing references first:
- `references/frontmatter-authoring-playbook.md`
- `references/outer-inner-frontmatter-snippets.md` when you need ready-to-insert YAML
- `references/vscode-extension-sync.md` when editor hints or completions are in scope
3. Write the contract in this order:
- exact key path
- outer or inner layer
- accepted type or shape
- default behavior
- rendering or editor effect
- one minimal example
- one realistic example if the feature is non-trivial
- migration note if old syntax exists
4. Only after the contract is clear, use `references/frontmatter-source-map.md` or `scripts/audit_frontmatter_keys.py` to verify runtime ownership.
5. If the change touches Hero Editor, Chart Editor, Mermaid editor, Smart Insert, or CodeLens, also use `../vitepress-visual-authoring-system/SKILL.md`.

## Core Rules

1. Author-facing clarity is the main output. Internal implementation details are secondary.
2. Never describe a frontmatter key without valid YAML.
3. Keep outer page keys and inner nested keys explicitly separated.
4. If the extension exposes the key through completion, hover, or editor UI, update that surface in the same task.
5. If a key is deprecated, say what replaces it and whether old syntax is ignored, converted, or still accepted.
6. Prefer compile-safe examples that can live in real docs pages.
7. If the same contract affects multiple locales, keep the docs structure aligned even if the prose differs.

## Working Patterns

### Add a new outer page key

1. Define the purpose in one sentence.
2. Decide the exact value type.
3. Add a minimal YAML example.
4. Add one realistic example showing interaction with nearby keys.
5. Update docs, snippets, and extension registry if the key is author-facing.

Example:

```yaml
---
layout: doc
showEditor: true
editor:
  type: sidebar
---
```

### Add a new inner nested key

1. Place it under the correct parent contract.
2. Document the full path, not just the leaf name.
3. Show the smallest valid parent structure.
4. Explain whether omission falls back to defaults.

Example:

```yaml
---
layout: home
hero:
  background:
    layers:
      - kind: gradient
        opacity: 0.7
---
```

### Migrate or replace a key

1. Document the old form.
2. Document the new form.
3. Explain which one wins if both appear.
4. Update examples so the preferred syntax dominates future usage.
5. If extension hover or completion still teaches the old syntax, fix it in the same task.

### Audit frontmatter coverage

1. Use the playbook to define the expected contract surface first.
2. Run the audit script only after you know what should exist.
3. Compare docs, snippets, and extension registry against the contract.
4. Close gaps in authoring surfaces before polishing implementation details.

## Deliverable Checklist

1. The contract is described in author terms, not just implementation terms.
2. YAML examples cover both minimal and realistic usage where needed.
3. Outer and inner keys are not mixed together ambiguously.
4. Extension completion or hover coverage matches the documented contract when relevant.
5. Deprecations include clear replacement guidance.
6. Validation commands or audit output do not show obvious coverage gaps.

## Resources

- `references/frontmatter-authoring-playbook.md`
  - Main operating guide for designing and documenting frontmatter.
- `references/outer-inner-frontmatter-snippets.md`
  - Ready YAML patterns for common page, hero, and content structures.
- `references/vscode-extension-sync.md`
  - How to keep snippet and extension metadata aligned.
- `references/frontmatter-source-map.md`
  - Fallback file ownership map when you need to verify where runtime truth lives.
- `scripts/audit_frontmatter_keys.py`
  - Audit helper for coverage checks after the contract is defined.
- `../vitepress-visual-authoring-system/SKILL.md`
  - Use alongside this skill for visual-authoring surfaces.
