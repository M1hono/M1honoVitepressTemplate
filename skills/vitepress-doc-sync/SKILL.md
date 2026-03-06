---
name: vitepress-doc-sync
description: Sync template-derived developer documentation across M1honoVitepressTemplate, CrychicDoc, and toolkit-box-page. Use when updating shared developer docs such as maintainability, development workflow, extension architecture, hero extension, frontmatter reference hubs, or hero AllConfig link-key docs, and when you need to verify that template-derived documentation stays aligned across those repositories.
---

# VitePress Doc Sync

## Overview

Use this skill when a developer-documentation or shared frontmatter-documentation change should stay aligned across the template family instead of landing in only one repository.

The upstream source of truth is this repository (`M1honoVitepressTemplate`).  
`toolkit-box-page` is a close template clone for documentation pages.  
`CrychicDoc` is an adapted downstream repo that needs mapped updates instead of raw file copying.

## Workflow

1. Read `references/repo-map.md`.
2. If the change belongs to the shared developer-doc or frontmatter-doc set, update the template first.
3. Run `scripts/sync_template_docs.py check` to inspect drift.
4. If the cloned toolkit docs should match the template, run `scripts/sync_template_docs.py sync-toolkit`.
5. For CrychicDoc, use the mapped checklist in `references/repo-map.md` and the script's `check-crychic` mode to verify the adapted pages and nav/home entry points.
6. Run the verification commands listed below in each affected repo.

## Verification Commands

- Template: `cd <template-root>/docs && yarn locale && yarn sidebar && yarn tags && yarn build`
- CrychicDoc: `cd <crychic-root> && yarn locale && yarn sidebar && yarn tags && yarn build`
- toolkit-box-page: `cd <toolkit-root>/docs && yarn locale && yarn sidebar && yarn tags && yarn build`

## Sync Rules

1. Treat `M1honoVitepressTemplate/docs/src/*/frontmatter/**` plus `docs/src/*/hero/AllConfig.md` as the upstream source for the shared frontmatter/developer doc surface unless the user explicitly wants repo divergence.
2. Sync toolkit-box-page by file copy only for the curated doc set listed in `references/repo-map.md`.
3. Do not blindly copy template docs into CrychicDoc.
   CrychicDoc uses different paths, different root docs hubs, and a product-specific home/nav structure.
4. Keep hero action link-key docs aligned with actual runtime support.
5. When doc hubs or nav entry points change, verify both the docs index pages and the locale nav files.
6. The bundled script assumes a sibling checkout layout by default:
   - template root: current repo
   - toolkit root: `../toolkit-box-page`
   - CrychicDoc root: `../CrychicDoc`
   Override those with `--template-root`, `--toolkit-root`, and `--crychic-root` when your workspace layout differs.

## Resources

### scripts/

- `scripts/sync_template_docs.py`
  Check drift, sync the toolkit clone doc set from the template, and verify the CrychicDoc adapted surface.

### references/

- `references/repo-map.md`
  Repo roots, synced file sets, and the CrychicDoc adaptation map.
