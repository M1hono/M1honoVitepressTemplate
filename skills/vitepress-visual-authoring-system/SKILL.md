---
name: vitepress-visual-authoring-system
description: Control the synchronized Hero, chart, and Mermaid authoring system across M1honoVitepressTemplate and PickAIDDocVSCodeExtension. Use whenever the task changes a visual authoring contract, editor workflow, Smart Insert or CodeLens behavior, tooltip or placeholder system, or any feature that must stay aligned between template runtime, docs, and the VS Code extension.
---

# VitePress Visual Authoring System

Use this skill when the author-facing feature is visual and the same concept must stay coherent across runtime, docs, and editor tooling.

## Start Here

1. Classify the task first:
- `hero-contract`: hero frontmatter, layout, backgrounds, floating items, waves, actions, typography, colors
- `chart-contract`: `::: chart` config, data grammar, tooltip system, palette system, placeholders, chart-type options
- `mermaid-contract`: Mermaid fence behavior, structured editor coverage, preamble settings, Smart Insert, CodeLens
- `parity-fix`: runtime supports something but editor/docs do not, or the editor teaches a feature the runtime does not actually support
- `docs-only`: author docs/examples/guide text for an existing supported capability
2. Read only the matching authoring reference first:
- `references/hero-authoring.md`
- `references/chart-authoring.md`
- `references/mermaid-authoring.md`
3. Read `references/change-playbook.md` before editing implementation files.
4. Use `references/system-map.md` only after the author-facing contract is already clear.

## Working Model

Always define the feature at these four layers before changing code:

1. Author surface: what the writer can type or configure
2. Runtime surface: what the template renders or resolves
3. Editor surface: what the extension can edit, suggest, insert, or preserve
4. Docs surface: what examples and wording teach the feature

If one layer changes and the others are not checked, the task is incomplete.

## Core Rules

1. Start from author-facing behavior, not source-tree location.
2. Do not teach a feature in the editor unless runtime truth exists, or both ship in the same change.
3. Do not silently narrow a runtime contract in the editor unless the loss is documented and intentional.
4. Keep example syntax real and copyable.
5. Treat fallback boundaries as first-class behavior. A skill user must know when visual editing stops and raw source or raw option editing takes over.
6. When docs examples change, keep the extension guide text and placeholders aligned with the same vocabulary.
7. Prefer high-level config fields before raw passthrough, but document both when both are supported.

## Domain Guidance

### Hero work

Use the hero reference for:
- `layout: home` hero pages
- hero text, actions, image/media, colors
- single and layered backgrounds
- floating items and typography styles
- wave and viewport behavior
- theme-aware values and text formatting behavior

### Chart work

Use the chart reference for:
- `::: chart <type> { ...config }`
- per-chart data grammar
- tooltip templates, rules, overrides, and per-data tooltips
- palette behavior in light and dark mode
- `{fetch:...}` placeholders and dynamic text
- raw `seriesOptions`, axis blocks, and `option` passthrough
- editor round-trip limitations

### Mermaid work

Use the Mermaid reference for:
- Mermaid fence detection and save targets
- Smart Insert and CodeLens coverage
- supported structured diagram types
- Mermaid preamble settings such as title, theme, look, and curve
- source-mode fallback and unsupported grammar boundaries

## Deliverable Checklist

1. The author-facing contract is explicitly stated.
2. Runtime, editor, and docs are checked together.
3. Copyable examples exist for the affected capability.
4. Any fallback-to-source or lossy round-trip behavior is documented.
5. Verification is run on the touched surfaces.

## Verification

- Template runtime/docs: `cd <template-root>/docs && yarn locale && yarn sidebar && yarn tags && yarn build`
- Extension editor/runtime: `cd <extension-root> && npm run compile:extension`

## Resources

- `references/hero-authoring.md`
- `references/chart-authoring.md`
- `references/mermaid-authoring.md`
- `references/change-playbook.md`
- `references/system-map.md`
- `../vitepress-template-extender/SKILL.md`
- `../vitepress-frontmatter-architect/SKILL.md`
