# Nav Contract Recipes

Use these patterns when extending the shared nav API.

## Recipe: add a preview variant

Author-facing goal: let writers opt into a different preview treatment without changing the meaning of the nav item.

Checklist:
1. Add the new typed field or builder option.
2. Keep the old preview path working.
3. Provide a short example.
4. Keep the renderer fallback safe.

Example sketch:

```ts
const docsPreview = createNavPreviewPanel(
  'Docs Hub',
  'Internal documentation entry point.',
  'Start here for maintained first-party docs.',
  createScreenshotMedia('Docs preview', '/imgs/docs-hub.png'),
)
```

## Recipe: add a new dropdown layout

Author-facing goal: support a new information shape, not just a new visual flourish.

Checklist:
1. Name the layout for the content pattern it solves.
2. Keep the data shape shared and typed.
3. Show when authors should choose it over existing layouts.
4. Avoid introducing renderer-only magic fields.

## Recipe: add stricter builder usage

Author-facing goal: reduce repeated raw object mistakes.

Checklist:
1. Normalize old shapes where practical.
2. Add or refine the builder.
3. Keep the simplest common case easy.
4. Document the preferred new authored form.

## Recipe: current-page-aware behavior

Author-facing goal: preview or navigation should react to current route without authors hardcoding route logic.

Checklist:
1. Keep route awareness inside shared runtime helpers.
2. Do not require locale authors to duplicate route conditions.
3. Verify behavior across locale or base-path changes.
