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
3. No sidebar JSON config layer remains in the runtime path; sidebar truth stays in markdown frontmatter.

Use this page as the source-of-truth when building content templates, snippets, and extension completions.

## Frontmatter-First Policy (Current)

1. Sidebar ordering is controlled by frontmatter `priority` on `index.md` and leaf `*.md` pages.
2. Page `description` is documented in frontmatter (for docs metadata and extension generation).
3. `itemOrder` is optional and should only be used when frontmatter `priority` is not enough.

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
| `useChildrenCollapsed` | `object` | omitted | Current-tree child collapsed display rule with `mode` and `depth`. |
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

## Current-Tree Folding: `useChildrenCollapsed`

Use `useChildrenCollapsed` when the current directory should control how child directories or child roots appear in the current generated sidebar tree.

```yaml
---
title: Modpack Docs
root: true
collapsed: false
useChildrenCollapsed:
  mode: self
  depth: 2
---
```

Important behavior:

1. `useChildrenCollapsed` only changes the current generated view.
2. It does not rewrite a child root's own `collapsed`.
3. It does not rewrite a child root's own `maxDepth`.
4. Nearest descendant `useChildrenCollapsed` replaces the inherited rule for its own subtree.

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

## Markdown-Driven Sidebar Rule

Sidebar truth comes from:

- directory frontmatter in `index.md` or `sidebarIndex.md`
- page frontmatter in markdown files
- structural defaults in `/.sidebarrc.yml`

There is no live sidebar JSON config layer.

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
3. Confirm the section is regenerated after `yarn sidebar` instead of checking any JSON cache artifact.
4. Verify `priority` and `useChildrenCollapsed` directly in markdown frontmatter before assuming the generator is stale.
