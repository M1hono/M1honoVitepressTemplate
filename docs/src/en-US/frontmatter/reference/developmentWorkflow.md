---
title: Development Workflow
layout: doc
description: Recommended change order, verification commands, and upstream/downstream sync rules for template work.
priority: 11
---

# Development Workflow

This page is the operational guide for changing the template without breaking the contract between frontmatter, runtime, and rendering.

## Start With the Template

This repository is the upstream source of truth.  
When a change belongs to the framework itself, implement and verify it here first, then port it into downstream sites such as CrychicDoc.

Recommended order:

1. Update `docs/.vitepress/utils/vitepress/api/**` first.
   Change types, schema, normalization, registry input shapes, and compatibility behavior here.
2. Update `docs/.vitepress/utils/vitepress/runtime/**` second.
   Move lifecycle, DOM observation, theme stabilization, viewport sync, and adaptive state into shared runtime modules.
3. Update `docs/.vitepress/theme/components/**` third.
   Keep view components thin. They should consume normalized props and runtime state, not reinvent parsing or observers.
4. Update `docs/src/**` examples and reference docs in the same change.
   Every new frontmatter key or extension point should have at least one concrete markdown example.
5. Sync downstream repositories only after the template build is stable.

## Verification Commands

Run these commands from `docs/` after any framework change:

```bash
yarn locale
yarn sidebar
yarn tags
yarn build
```

Run these too when project config or frontmatter contracts changed:

```bash
yarn sync-config
yarn frontmatter
```

## Change Routing Guide

Use this routing rule before editing files:

- `docs/.vitepress/utils/vitepress/api/**`
  Contract layer. Use for schema, normalization, registries, and extension-facing types.
- `docs/.vitepress/utils/vitepress/runtime/**`
  Shared runtime state. Use for theme sync, resize sync, viewport logic, scheduling, and shared lifecycle.
- `docs/.vitepress/theme/components/**`
  Rendering layer. Use for Vue markup, light composition, and local presentation logic.
- `docs/.vitepress/config/**`
  Site-level defaults, locale configuration, shader registries, and plugin composition.
- `docs/.vitepress/plugins/**`
  Markdown-it implementations.
- `docs/.vitepress/theme/styles/**`
  Global style layers, component skinning, and shared CSS variables.
- `docs/src/**`
  User-facing documentation, examples, and reference pages.

## Task Entry Patterns

Use these starting points for common work:

- New normal page
  Start in `docs/src/<locale>/...` and mirror the same relative path in both locales before wiring new top-level nav entry points.
- New hero page
  Start with `layout: home`, author the `hero` and `features` frontmatter, then add any new hero contract keys in `api/frontmatter/hero/**` before touching render components.
- New reusable component
  Start in `docs/.vitepress/theme/components/**`, then finish the full registration chain: component registry export, global markdown registration when needed, locale JSON, and `component-id-mapping.json`.
- New hero feature
  Start in `docs/.vitepress/utils/vitepress/api/frontmatter/hero/**`, then add shared runtime in `runtime/hero/**`, then render branches in `theme/components/hero/**`.
- New markdown plugin
  Start in `docs/.vitepress/plugins/**`, wire it in `docs/.vitepress/config/markdown-plugins.ts`, then register any rendering component it needs.

## Upstream to Downstream Sync

When a framework-level change must land in a product repository:

1. Finish the template implementation first.
2. Build and visually verify the template.
3. Port the same contract/runtime/view changes downstream.
4. Keep naming and file ownership aligned so future syncs remain mechanical.
5. Avoid adding downstream-only workarounds unless the product truly diverges from the template.

## Review Checklist

Before considering the change done, verify these questions:

1. Is the source of truth clear?
   Contract logic should not be duplicated in components.
2. Is the runtime shared?
   Repeated `MutationObserver`, `ResizeObserver`, or direct theme DOM reads usually belong in `runtime`.
3. Is the extension documented?
   New keys, types, or registries should be described in `docs/src`.
4. Is the example realistic?
   Prefer compile-safe YAML and real component names over pseudo syntax.
5. Is the downstream sync plan obvious?
   Future maintainers should be able to follow the same file map in both repositories.

## Common Mistakes to Avoid

- Adding ad-hoc parsing logic directly inside Vue components
- Reading dark-mode DOM classes directly in feature components
- Introducing a new global style rule when a CSS variable contract would be cleaner
- Adding a new extension point without documenting the intended path in `docs/src`
- Implementing template changes downstream first and trying to back-port them later

## Related Pages

- [Extension Architecture](./extensionArchitecture) — Where framework code belongs and layer-by-layer extension checklists
- [Hero Extension Playbook](./heroExtension) — Step-by-step guide for extending the hero system
- [Frontmatter Key Inventory](./keyInventory) — Complete listing of available frontmatter keys
- [Maintainability and Extension Guide](./maintainability) — Deep technical reference for all extension APIs
