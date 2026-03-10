---
title: 内容与 UI Frontmatter
description: 用于元数据、状态、评论、浮动按钮、预览和标签的 frontmatter 键。
priority: 40
---
# 内容与 UI Frontmatter {#content-and-ui-frontmatter}

## 键映射

| 键 | 类型 | 默认值 | 使用者 |
| --- | --- | --- | --- |
| `description` | `string` | 页面摘要 | `Preview.vue` |
| `tags` | `string[]` | `[]` | `PageTags.vue` |
| `metadata` | `boolean` | `true` | `ArticleMetadata.vue` |
| `date` | `string | Date` | 回退到 git 时间 | `ArticleMetadata.vue` |
| `lastUpdated` | `Date` | 回退到 git 时间 | `ArticleMetadata.vue` |
| `progress` | `number | false` | `false` | `ProgressLinear.vue` |
| `state` | `preliminary | unfinished | outdated | renovating` | 未设置 | `State.vue` |
| `showComment` | `boolean` | `true` | `comment.vue` |
| `buttons` | `boolean` | `true` | `Buttons.vue` |
| `backPath` | `string` | 自动路由逻辑 | `Buttons.vue` |
| `showEditor` | `boolean` | `true` | `ResponsibleEditor.vue` |
| `editor` | `string` | 项目作者 | `ResponsibleEditor.vue` |

## 示例

```yaml
description: "简洁的页面摘要，显示在预览区域。"
tags: ["hero", "frontmatter", "guide"]
metadata: true
progress: 78
state: preliminary
showComment: true
buttons: true
backPath: /zh-CN/guide/index
showEditor: true
editor: "模板团队"
```
