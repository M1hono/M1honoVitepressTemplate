---
title: Auto Sidebar Frontmatter
description: Declarative frontmatter contract for the built-in auto sidebar generator with frontmatter-first ordering.
priority: 50
---
# Auto Sidebar Frontmatter

This page documents the canonical frontmatter contract consumed by the sidebar engine in `docs/.vitepress/utils/sidebar`.

## Why This Matters

The sidebar system is **declarative-first**:

1. `index.md` and page frontmatter define structure intent.
2. Sidebar generator builds the tree.
3. JSON overrides under `docs/.vitepress/config/sidebar/**` are now reserved for labels and view state only.

Use this page as the source-of-truth when building content templates, snippets, and extension completions.

## Frontmatter-First Policy (Current)

1. Sidebar ordering is controlled by frontmatter `priority` on `index.md` and leaf `*.md` pages.
2. Page `description` is documented in frontmatter (for docs metadata and extension generation).
3. `order.json` is kept empty by default so it does not override frontmatter priorities.

## Directory-Level Keys (`index.md`)

| Key | Type | Default | Effect |
| --- | --- | --- | --- |
| `root` | `boolean` | `false` | Marks the directory as an independent sidebar root route. |
| `title` | `string` | directory name | Sidebar label for this directory/root. |
| `description` | `string` | empty | Metadata summary for docs/extension tooling. |
| `hidden` | `boolean` | `false` | Hides this directory from sidebar output. |
| `priority` | `number` | `0` | Lower numbers sort earlier. |
| `maxDepth` | `number` | `3` | Maximum recursive depth for generated items. |
| `collapsed` | `boolean` | `false` | Default collapsed state for this directory group. |
| `collapseControl` | `object` | omitted | Controls child directory or child-root collapsed state in the current generated sidebar view. |
| `viewControl` | `object` | roots default to `self`; non-roots default to `all` | Advanced traversal ownership for nested-root generation. |
| `itemOrder` | `string[] | Record<string, number>` | `{}` | Optional explicit ordering map (not required in frontmatter-first mode). |
| `groups` | `GroupConfig[]` | `[]` | Extracts subpaths into generated group sections. |
| `externalLinks` | `ExternalLinkConfig[]` | `[]` | Adds external links in the same section. |

## Page-Level Keys (`*.md`)

| Key | Type | Default | Effect |
| --- | --- | --- | --- |
| `title` | `string` | filename | Sidebar page label. |
| `description` | `string` | empty | Page summary metadata for docs tooling. |
| `hidden` | `boolean` | `false` | Hides this page from sidebar output. |
| `priority` | `number` | `0` | Sorting value among sibling pages (frontmatter authority). |

## Root Section Example

```yaml
---
title: Hero Playground
layout: doc
root: true
maxDepth: 6
collapsed: false
---
```

## Nested Root (Root Inside Root) Example

Use `root: true` in a child section `index.md` to create deeper sidebar route scopes.

```yaml
# /hero/index.md
---
title: Hero Playground
root: true
maxDepth: 6
---

# /hero/matrix/index.md
---
title: Hero Config Matrix
root: true
maxDepth: 5
priority: 10
---
```

## Recommended Folding Control: `collapseControl`

Use `collapseControl` when the parent root should decide which child directories start collapsed in the current sidebar view.

```yaml
---
title: Modpack Docs
root: true
collapsed: false
collapseControl:
  default: true
  paths:
    "kubejs/1.20.1": false
    "kubejs/1.21": false
---
```

Important behavior:

1. `collapseControl` only changes the current generated view.
2. It does not rewrite a child root's own `collapsed`.
3. It does not rewrite a child root's own `maxDepth`.
4. Paths are written relative to the current sidebar view root.

## Advanced Traversal Ownership: `viewControl`

Keep `viewControl` for the smaller set of nested-root cases where you need to decide who owns traversal during the current generation pass.

```yaml
---
title: KubeJS 1.20.1
viewControl:
  controlledByParent: false
---
```

When a child root stays under parent control, it still keeps its own local `maxDepth` and local `viewControl` for its own sidebar generation.

## Group + External Links Example

```yaml
---
title: Platform Docs
root: true
groups:
  - title: API Modules
    path: api/modules
    priority: 10
    maxDepth: 4
externalLinks:
  - text: Internal Dashboard
    link: https://example.com/dashboard
    priority: 50
---
```

## Optional `itemOrder` Example

```yaml
---
title: Frontmatter System
itemOrder:
  hero-runtime.md: 1
  sidebar-auto-system.md: 2
  key-inventory.md: 3
---
```

## JSON Override Layer

The engine synchronizes generated structure with JSON files under:

- `docs/.vitepress/config/sidebar/<lang>/<section>/locales.json`
- `docs/.vitepress/config/sidebar/<lang>/<section>/collapsed.json`
- `docs/.vitepress/config/sidebar/<lang>/<section>/hidden.json`

`order.json` exists for compatibility, but in this project it is intentionally kept empty and should not be used as the primary ordering source.
Use declarative frontmatter for long-term structure intent.

## Regeneration Commands

```bash
cd docs
yarn sidebar
```

Build pipeline:

```bash
cd docs
yarn locale
yarn sidebar
yarn tags
yarn build
```

## Troubleshooting

If sidebar output looks stale:

1. Ensure the section has an `index.md` with `root: true`.
2. Re-run `yarn sidebar`.
3. Check `docs/.vitepress/cache/sidebar/sidebar_<lang>.json` for generated routes.
4. Verify `priority` values directly in markdown frontmatter before touching sidebar JSON files.
