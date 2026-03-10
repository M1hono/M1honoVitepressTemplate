---
title: Content And UI Frontmatter
description: Frontmatter keys used by metadata, state, comments, floating buttons, preview and tags.
priority: 40
---

# Content And UI {#content-and-ui-frontmatter}

## Key Map

| Key           | Type                                                  | Default              | Used By                 |
| ------------- | ----------------------------------------------------- | -------------------- | ----------------------- |
| `description` | `string`                                              | page excerpt         | `Preview.vue`           |
| `tags`        | `string[]`                                            | `[]`                 | `PageTags.vue`          |
| `metadata`    | `boolean`                                             | `true`               | `ArticleMetadata.vue`   |
| `date`        | `string \| Date`                                      | fallback to git time | `ArticleMetadata.vue`   |
| `lastUpdated` | `Date`                                                | fallback to git time | `ArticleMetadata.vue`   |
| `progress`    | `number \| false`                                     | `false`              | `ProgressLinear.vue`    |
| `state`       | `preliminary \| unfinished \| outdated \| renovating` | unset                | `State.vue`             |
| `showComment` | `boolean`                                             | `true`               | `comment.vue`           |
| `buttons`     | `boolean`                                             | `true`               | `Buttons.vue`           |
| `backPath`    | `string`                                              | auto route logic     | `Buttons.vue`           |
| `showEditor`  | `boolean`                                             | `true`               | `ResponsibleEditor.vue` |
| `editor`      | `string`                                              | project author       | `ResponsibleEditor.vue` |

## Example

```yaml
description: "Concise page summary shown in preview area."
tags: ["hero", "frontmatter", "guide"]
metadata: true
progress: 78
state: preliminary
showComment: true
buttons: true
backPath: /en-US/guide/index
showEditor: true
editor: "Template Team"
```
