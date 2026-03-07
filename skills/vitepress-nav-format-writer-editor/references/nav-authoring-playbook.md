# Nav Authoring Playbook

## Preferred File Shape

1. Imports
2. Shared screenshot/URL constants
3. Named top-level section constants
4. Named panel arrays
5. Final `export default createNavItems(...)`

This is preferred over a single deeply nested exported object.

## Example Patterns

### Simple link

```ts
const homeNav = createLinkedNavItem("Home", "/");
```

### Third-party docs link

```ts
const courseNav = createLinkedNavItem("KubeJS Course", {
  href: "https://example.com",
  badge: createNavBadge("3rd-party", "info"),
  desc: "Externally maintained long-form course.",
});
```

If the existing builder signature does not fit, keep the external target explicit with `href` on the final item object.

### Dropdown with named panels

```ts
const docsPanels: NavPanel[] = [
  {
    groups: [
      {
        label: "Guides",
        items: [
          {
            text: "Overview",
            link: "/docs/overview/",
            desc: "Entry point for the docs area.",
          },
        ],
      },
    ],
  },
];

const docsNav = createDropdownNavItem(
  "Docs",
  createNavDropdown({
    layout: "columns",
    panels: docsPanels,
  }),
);
```

### Plain screenshot preview

```ts
const docsPreview = createNavPreviewPanel(
  "Docs Hub",
  "Primary entry point for the documentation area.",
  "Use this when you want the internal docs set, not external references.",
  createScreenshotMedia(
    "Docs hub preview",
    "/imgs/screenshots/nav/docs-hub.png",
    "linear-gradient(135deg, #102038 0%, #2b4c7e 100%)",
  ),
);
```

## Review Checklist

- Are top-level sections named?
- Are dropdowns using builders instead of raw structural blobs?
- Are previews plain by default?
- Are third-party links using `href` and clearly labeled?
- Does the locale still match its sibling locale structurally where expected?
- Did the change avoid touching component registry files?
