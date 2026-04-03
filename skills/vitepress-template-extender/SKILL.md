---
name: vitepress-template-extender
description: Extend the M1hono VitePress template without breaking its authoring model, i18n system, component registration, or editor/runtime parity. Use whenever the task is to add a Vue component, markdown feature, config option, translatable UI surface, project capability, or page pattern, and the change should fit the existing template instead of becoming a one-off patch.
---

# VitePress Template Extender

Use this skill to add or evolve template features from the outside in: author surface first, implementation layers second.

## Start Here

1. Identify the requested outcome:
- `page`: add or revise a normal docs page
- `landing-page`: add or revise a home-style page
- `component`: add or evolve a Vue component
- `markdown-feature`: add a container, directive, or authored syntax feature
- `config`: add or revise project config, locale config, or feature toggles
- `hero-or-visual`: hand off to `../vitepress-visual-authoring-system/SKILL.md`
- `frontmatter-contract`: hand off to `../vitepress-frontmatter-architect/SKILL.md`
2. Read these first:
- `references/extension-playbook.md`
- `references/template-extension-recipes.md`
3. Define the change at four layers before editing code:
- author surface: what the writer or site maintainer can now do
- runtime surface: what renders or behaves differently
- editor surface: what completion, hover, or editor UI must understand
- i18n surface: what text or locale assets must be added
4. Use `references/architecture-map.md` only after the change shape is clear.
5. Touch the smallest set of files that fully expresses the feature.

## Core Rules

1. Start with the author experience, not the implementation directory.
2. Keep new features aligned with existing registration, i18n, and build patterns.
3. Prefer small, composable additions over one-off special cases.
4. If a feature introduces author-facing syntax or config, add real docs examples in the same task.
5. If a component is translatable, treat locale files and component mapping as part of the feature, not cleanup.
6. Do not widen a localized change into a repo-wide refactor unless the user asked for it.
7. Use the visual-authoring or frontmatter skills when those domains are primary.

## Working Patterns

### Add a new component

1. Define who uses it and whether markdown pages invoke it directly.
2. Decide whether it needs global registration, internal registry exposure, or both.
3. Add locale text if the component renders author-facing strings.
4. Add one real usage page or example.

### Add a new markdown feature

1. Define the authored syntax first.
2. Decide what HTML or component output it should produce.
3. Wire the plugin only after the authored contract is stable.
4. Add examples that prove the feature in real docs content.

### Add a new project config option

1. Document what behavior the toggle changes.
2. Decide its default value and failure mode.
3. Update docs or examples where the option matters.
4. If downstream tooling reads the config, update it in the same task.

### Add a new page pattern

1. Start from frontmatter and content structure.
2. Promote it into nav or hub pages only if it is meant to be discoverable.
3. Keep localization expectations explicit.

## Deliverable Checklist

1. The new feature is understandable from author-facing examples.
2. Runtime, editor, and i18n surfaces are all considered.
3. Registration and locale wiring are complete where needed.
4. The change fits existing template patterns rather than adding an isolated workaround.
5. Verification commands pass for the touched repo.

## Resources

- `references/extension-playbook.md`
  - Main decision guide for adding or changing template features.
- `references/template-extension-recipes.md`
  - Concrete patterns for common extension tasks.
- `references/architecture-map.md`
  - Fallback file ownership map for runtime wiring.
- `../vitepress-visual-authoring-system/SKILL.md`
  - Use for hero, chart, Mermaid, Smart Insert, and editor/runtime parity work.
- `../vitepress-frontmatter-architect/SKILL.md`
  - Use for frontmatter contract design and migration work.
