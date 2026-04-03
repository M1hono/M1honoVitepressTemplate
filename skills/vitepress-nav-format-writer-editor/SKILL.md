---
name: vitepress-nav-format-writer-editor
description: Write and refactor locale nav.ts files for the shared VitePress navigation system. Use whenever the task is to add or reorganize sections, create dropdowns or preview panes, label third-party links, improve readability, fix locale-aware paths, or restructure a nav file into maintainable named sections without changing the shared nav contract.
---

# VitePress Nav Format Writer Editor

Use this skill when the job is authoring or reorganizing locale `nav.ts` content.

## Start Here

1. Define the authoring outcome:
- add a top-level link
- create or simplify a dropdown
- add screenshot or showcase preview content
- mark external documentation clearly
- fix path correctness or locale/base behavior
- refactor a bloated nav file into named sections
2. Read these first:
- `references/nav-authoring-playbook.md`
- `references/nav-writing-recipes.md`
3. Work from author meaning outward:
- what should the reader see first
- which links are internal versus external
- which sections deserve preview treatment
- which parts are reusable enough to name once
4. Inspect the shared builders only after the structure is decided.
5. Keep the file readable enough that a human maintainer can reorganize it later without reading runtime code.

## Core Rules

1. Write nav as clear code, not as a giant anonymous data blob.
2. Use named constants for sections, groups, panels, and reused previews.
3. Use `href` for third-party targets and label them clearly when the distinction matters.
4. Keep preview surfaces visually quiet by default.
5. Respect current locale and base-aware link rules.
6. Do not edit shared nav types or renderers for simple content work.
7. If the file gets harder to read after the change, the refactor is not done yet.

## Working Patterns

### Add a simple top-level link

1. Prefer the simplest builder or item shape.
2. Keep the text direct.
3. Use the correct internal link format for the current project.
4. Do not wrap a simple link in dropdown structure.

### Add a dropdown docs area

1. Name the panel arrays.
2. Separate information groups clearly.
3. Add preview content only when it helps orientation.
4. Keep the exported structure shallow and readable.

### Add a third-party docs entry

1. Use `href`, not `link`.
2. Add a small badge or description if users may confuse it with first-party docs.
3. Keep the preview or copy explicit that it leaves the current doc set.

### Refactor a messy locale nav file

1. Split repeated preview data into named constants.
2. Split panels into named arrays.
3. Group top-level sections near the top of the file.
4. Leave the final export as the easiest place to understand the site structure.

## Deliverable Checklist

1. The file is easier to scan than before.
2. Internal and external targets are correctly distinguished.
3. Paths match current locale and base rules.
4. Preview content helps orientation without overwhelming the text.
5. Shared contract files were left alone unless the task truly required them.

## Resources

- `references/nav-authoring-playbook.md`
  - Main operating guide for writing locale nav files.
- `references/nav-writing-recipes.md`
  - Copyable patterns for common nav authoring tasks.
- `references/nav-authoring-map.md`
  - Fallback map for builder names and common file locations.
- `../vitepress-nav-format-extender/SKILL.md`
  - Switch to this when the task requires changing the shared nav API.
- `../vitepress-template-extender/SKILL.md`
  - Use alongside this skill for broader template feature work.
