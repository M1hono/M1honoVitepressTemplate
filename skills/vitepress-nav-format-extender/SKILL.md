---
name: vitepress-nav-format-extender
description: Extend the shared VitePress navigation contract used across the M1hono repo family. Use whenever the task is to change nav types, builders, validation rules, preview media behavior, dropdown layouts, current-page awareness, or sync a structural nav capability across multiple repos without breaking local authoring flexibility.
---

# VitePress Nav Format Extender

Use this skill when the job is changing the shared nav system itself, not just editing one locale file.

## Start Here

1. Decide what kind of change is needed:
- `contract`: shape of nav items, dropdowns, panels, preview media, or layout keys
- `builder`: helper APIs that authors use when writing nav.ts files
- `validation`: normalization or enforcement rules
- `renderer`: dropdown layout or preview behavior
- `sync`: shared rollout to sibling repos after the primary repo is stable
2. Read these first:
- `references/nav-extension-playbook.md`
- `references/nav-contract-recipes.md`
3. Define the author-visible result before editing code:
- what new thing an author can express
- what the simplest example looks like
- whether the change is default behavior or opt-in behavior
- whether existing authored configs remain valid
4. Only then inspect implementation ownership with `references/nav-source-map.md`.
5. Prove the change in the primary repo first. Sync shared infrastructure to sibling repos only after the API and rendering behavior are stable.

## Core Rules

1. A nav-system change should make authoring clearer, not just more powerful.
2. Default preview behavior stays restrained: plain screenshot, no forced browser chrome, no bounce, no decorative frame unless explicitly chosen.
3. Do not solve structural problems by hardcoding route-specific logic in renderers.
4. Preserve local component registries and local layout escape hatches.
5. Keep simple links simple. Do not force dropdown machinery on content that does not need it.
6. When introducing a stricter rule, provide a migration path or normalization step.
7. Every contract change should come with at least one example authors can copy.

## Working Patterns

### Add a new preview capability

1. Define the author-facing field or builder shape.
2. Provide the simplest valid example.
3. Decide whether it is opt-in or the new default.
4. Update types, builders, and renderer in that order.
5. Verify light, dark, and narrow dropdown states.

### Add a new dropdown layout

1. Decide what content structure the new layout is for.
2. Keep the input driven by shared nav data, not one-off renderer state.
3. Give authors a short example showing when to choose the layout.
4. If only one repo needs it, keep the shared contract narrow and let local registration own the custom part.

### Tighten validation

1. Normalize historical shapes first.
2. Reject only what is truly unsafe or ambiguous.
3. Avoid punishing common simple patterns.
4. Document the preferred authored form so future locale files get cleaner.

### Sync shared nav infrastructure

1. Land and verify the change in the primary repo.
2. Copy only shared contract and renderer files.
3. Do not overwrite repo-local nav content or local component registries.
4. Rebuild each mirror after syncing.

## Deliverable Checklist

1. The new capability is explained in author terms.
2. A minimal example exists.
3. Validation and rendering match the documented contract.
4. Default styling and interaction remain restrained unless the task explicitly changes them.
5. Local registry behavior still works.
6. Shared sync is limited to actual shared infrastructure.

## Resources

- `references/nav-extension-playbook.md`
  - Main workflow for changing the shared nav system.
- `references/nav-contract-recipes.md`
  - Copyable structural patterns for new nav capabilities.
- `references/nav-source-map.md`
  - Fallback file ownership map when you need exact implementation locations.
- `../vitepress-nav-format-writer-editor/SKILL.md`
  - Use when the task is locale authoring rather than system extension.
- `../vitepress-template-extender/SKILL.md`
  - Use when the change expands beyond nav into broader template work.
