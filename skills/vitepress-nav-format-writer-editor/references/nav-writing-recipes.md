# Nav Writing Recipes

Use these patterns when editing locale nav content.

## Recipe: simple internal link

```ts
const guideNav = createLinkedNavItem('Guide', '/guide/')
```

Use this when the item does not need preview content or dropdown structure.

## Recipe: external docs link

```ts
const kubejsCourseNav = createLinkedNavItem('KubeJS Course', {
  href: 'https://example.com',
  desc: 'Third-party long-form reference.',
})
```

Use this when the target is outside the current docs set.

## Recipe: dropdown with named panels

```ts
const guidePanels = [
  {
    groups: [
      {
        label: 'Guides',
        items: [{ text: 'Overview', link: '/guide/' }],
      },
    ],
  },
]
```

Use named arrays so later edits stay local and readable.

## Recipe: preview for orientation

```ts
const guidePreview = createNavPreviewPanel(
  'Guide Hub',
  'Entry point for the internal guide set.',
  'Use this when you want first-party tutorials.',
  createScreenshotMedia('Guide preview', '/imgs/guide-hub.png'),
)
```

Use this when the preview genuinely helps users choose the section.
