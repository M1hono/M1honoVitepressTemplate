---
title: Frontmatter Key Inventory
description: Active canonical frontmatter keys consumed by runtime.
priority: 60
---
# Frontmatter Key Inventory

| Key Path | Scope | Default | Notes |
| --- | --- | --- | --- |
| `cssVars` | current page scope | unset | Page-scoped CSS custom properties.
| `layoutClass` | global page | unset | Adds class to layout wrapper.
| `layout` | global page | VitePress default | Layout selection.
| `isHome` | global page | inferred | Home detection fallback.
| `root` | sidebar directory | `false` | Marks an `index.md` directory as a sidebar root.
| `maxDepth` | sidebar directory | `3` | Recursive depth cap for generated sidebar items.
| `collapsed` | sidebar directory | `false` | Default collapse state for directory sections.
| `useChildrenCollapsed` | sidebar directory | omitted | Current-tree child collapsed display rule with `mode` and `depth`.
| `useChildrenCollapsed.mode` | sidebar directory | `children` when object is present | `children \| self \| collapsed \| open`.
| `useChildrenCollapsed.depth` | sidebar directory | `1` when object is present | Positive integer depth for descendant display overrides.
| `groups` | sidebar directory | `[]` | Extracted grouped sections in sidebar output.
| `externalLinks` | sidebar directory | `[]` | External links appended to a section.
| `priority` | sidebar directory/page | `0` | Sorting priority among siblings.
| `hidden` | sidebar directory/page | `false` | Hides directory/page from sidebar output.
| `hero` | home/runtime | `{}` | Hero orchestrator config.
| `hero.layout.viewport` | hero | `true` | Full viewport hero toggle.
| `hero.background` | hero | unset | Single/layered background system.
| `hero.background.type` | hero background | unset | `image|video|color|shader|particles|none`.
| `hero.background.layers` | hero background | `[]` | Layer mode.
| `hero.background.opacity` | hero background | `1` | Global background opacity.
| `hero.background.brightness` | hero background | `1` | Global background brightness.
| `hero.background.contrast` | hero background | `1` | Global background contrast.
| `hero.background.saturation` | hero background | `1` | Global background saturation.
| `hero.background.filter` | hero background | unset | Extra filter chain.
| `hero.background.cssVars` | hero background | unset | Background-root CSS vars.
| `hero.background.style` | hero background | unset | Inline style overrides.
| `hero.background.layers[*].cssVars` | hero layer | unset | Per-layer CSS vars.
| `hero.background.layers[*].style` | hero layer | unset | Per-layer inline style.
| `hero.colors` | hero | unset | Text colors (`title`, `tagline`, `text`) and nav/search color overrides.
| `hero.colors.title` | hero colors | unset | Hero name (H1) color, supports `{ light, dark }`.
| `hero.colors.text` | hero colors | unset | Hero text (subtitle) color.
| `hero.colors.tagline` | hero colors | unset | Hero tagline color.
| `hero.colors.navText` | hero colors | unset | Nav link text color.
| `hero.colors.navBackground` | hero colors | unset | Nav bar background color.
| `hero.colors.searchBackground` | hero colors | unset | Search button background color.
| `hero.background.color.gradient.animation` | hero background | unset | Gradient animation: `flow`, `rotate`, `pulse`.
| `hero.actions[*].linkKey` | hero actions | unset | Named route key for action button link, including developer docs such as `maintainabilityGuide`, `developmentWorkflow`, `extensionArchitecture`, and `heroExtension`.
| `hero.actions[*].style` | hero actions | unset | Visual overrides for action button.
| `hero.snippets` | hero | unset | Snippet data for floating elements.
| `hero.floating` | hero | unset | Floating decorative elements config.
| `hero.floating.density` | floating | `1` | Number of visible floating items.
| `hero.image.background.enabled` | hero image | `false` | Enable glow layer behind hero image.
| `hero.image.frame` | hero image | unset | Frame shape, border, shadow, and layout for hero image.
| `hero.waves` | hero overlay | enabled by default | Canonical wave bridge config.
| `hero.image` | hero media | unset | `image|video|gif|model3d|lottie` runtime.
| `features` | home/features | `[]` | Feature cards data source.
| `featuresConfig` | home/features | defaults applied | Feature scroller options.
| `tags` | content | `[]` | Page tag chips.
| `description` | content | empty | Preview component text.
| `metadata` | content | `true` | Metadata row toggle.
| `date` | content | fallback timestamp | Metadata date override.
| `lastUpdated` | content | fallback timestamp | Metadata date override.
| `progress` | content | `false` | Progress bar percentage.
| `state` | content | unset | Content state block.
| `showComment` | content | `true` | Comment module toggle.
| `buttons` | UI controls | `true` | Floating utility buttons toggle.
| `backPath` | UI controls | auto route | Explicit back target.
| `showEditor` | content | `true` | Responsible editor block toggle.
| `editor` | content | project author | Responsible editor name override.

## Unsupported / Removed (No Runtime Effect)

- `hero.background.type: waves`
- `hero.waves.enabled: false` (waves are always rendered)
- `hero.floating.motion.style: legacy-a | legacy-b`
- `hero.customSnippet`
- `hero.floating.text`, `hero.floating.card`, `hero.floating.image`, `hero.floating.badge`, `hero.floating.icon`, `hero.floating.stat`, `hero.floating.code`, `hero.floating.shape`

## Related Pages

- [Extension Architecture](./extensionArchitecture) — Where framework code belongs and layer-by-layer extension checklists
- [Development Workflow](./developmentWorkflow) — Day-to-day development commands and processes
- [Hero Extension Playbook](./heroExtension) — Step-by-step guide for extending the hero system
- [Maintainability and Extension Guide](./maintainability) — Deep technical reference for all extension APIs
