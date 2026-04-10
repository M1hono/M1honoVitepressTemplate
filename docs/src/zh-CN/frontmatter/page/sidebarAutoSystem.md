---
title: 自动侧边栏 Frontmatter
description: 内置自动侧边栏生成器的声明式 frontmatter 规范（前端文档以 frontmatter 排序为主）。
priority: 50
---
# 自动侧边栏 Frontmatter

本文档介绍 `docs/.vitepress/utils/sidebar` 中侧边栏引擎使用的规范 frontmatter 配置。

## 为什么这很重要

侧边栏系统是**声明式优先**的：

1. `index.md` 和页面 frontmatter 定义结构意图。
2. 侧边栏生成器构建目录树。
3. 运行时路径里不再保留 sidebar JSON 配置层，sidebar 真值只来自 markdown frontmatter。

在构建内容模板、代码片段和扩展补全时，请以本页面为真实来源。

## 当前策略：Frontmatter 优先

1. 侧边栏排序由 `index.md` 和子页面的 `priority` 控制。
2. 页面 `description` 放在 frontmatter，便于文档元数据和扩展生成。
3. `itemOrder` 仅在 `priority` 不够表达排序时再使用。

## 目录级键（`index.md`）

| 键 | 类型 | 默认值 | 效果 |
| --- | --- | --- | --- |
| `root` | `boolean` | `false` | 将目录标记为独立的侧边栏根路由。 |
| `title` | `string` | 目录名称 | 此目录/根的侧边栏标签。 |
| `description` | `string` | 空 | 用于文档/扩展的摘要元信息。 |
| `hidden` | `boolean` | `false` | 从侧边栏输出中隐藏此目录。 |
| `priority` | `number` | `0` | 数值越小排序越靠前。 |
| `maxDepth` | `number` | `3` | 生成项目的最大递归深度。 |
| `collapsed` | `boolean` | `false` | 此目录组的默认折叠状态。 |
| `useChildrenCollapsed` | `object` | 不写 | 通过 `mode` 和 `depth` 控制当前生成树里的子项折叠显示。 |
| `itemOrder` | `string[] | Record<string, number>` | `{}` | 可选显式排序映射（Frontmatter 优先模式下通常不需要）。 |
| `groups` | `GroupConfig[]` | `[]` | 将子路径提取为生成的分组区块。 |
| `externalLinks` | `ExternalLinkConfig[]` | `[]` | 在同一区块中添加外部链接。 |

## 页面级键（`*.md`）

| 键 | 类型 | 默认值 | 效果 |
| --- | --- | --- | --- |
| `title` | `string` | 文件名 | 侧边栏页面标签。 |
| `description` | `string` | 空 | 页面摘要元信息（文档/扩展使用）。 |
| `hidden` | `boolean` | `false` | 从侧边栏输出中隐藏此页面。 |
| `priority` | `number` | `0` | 兄弟页面间的排序值（以 frontmatter 为准）。 |

## 根区块示例

```yaml
---
title: Hero 演练场
layout: doc
root: true
maxDepth: 6
collapsed: false
---
```

## 嵌套 Root（Root Inside Root）示例

在子区块 `index.md` 继续设置 `root: true`，可以得到更深层的侧边栏路由范围。

```yaml
# /hero/index.md
---
title: Hero 演练场
root: true
maxDepth: 6
---

# /hero/matrix/index.md
---
title: Hero 配置矩阵
root: true
maxDepth: 5
priority: 10
---
```

## 当前生成树折叠控制：`useChildrenCollapsed`

如果你的目标只是让当前目录决定当前这棵生成出来的 sidebar 树里子目录或子 root 如何显示折叠状态，使用 `useChildrenCollapsed`。

```yaml
---
title: 整合包文档
root: true
collapsed: false
useChildrenCollapsed:
  mode: self
  depth: 2
---
```

需要注意：

1. `useChildrenCollapsed` 只影响当前这次生成出来的 sidebar 视图。
2. 它不会改写子 root 自己的 `collapsed`。
3. 它不会改写子 root 自己的 `maxDepth`。
4. 如果子目录自己也声明了 `useChildrenCollapsed`，它会接管自己子树的显示规则。

## 分组 + 外部链接示例

```yaml
---
title: 平台文档
root: true
groups:
  - title: API 模块
    path: api/modules
    priority: 10
    maxDepth: 4
externalLinks:
  - text: 内部仪表盘
    link: https://example.com/dashboard
    priority: 50
---
```

## 可选 `itemOrder` 示例

```yaml
---
title: Frontmatter 系统
itemOrder:
  hero-runtime.md: 1
  sidebar-auto-system.md: 2
  key-inventory.md: 3
---
```

## Markdown 驱动的 Sidebar 规则

Sidebar 真值只来自：

- `index.md` 或 `sidebarIndex.md` 的目录 frontmatter
- markdown 页面自己的 frontmatter
- `/.sidebarrc.yml` 中的结构默认值

运行时不再依赖 sidebar JSON 配置层。

## 重新生成命令

```bash
cd docs
yarn sidebar
```

构建流水线：

```bash
cd docs
yarn locale
yarn sidebar
yarn tags
yarn build
```

## 故障排除

如果侧边栏输出看起来过时：

1. 确保该区块有一个带 `root: true` 的 `index.md`。
2. 重新运行 `yarn sidebar`。
3. 重新执行 `yarn sidebar` 后确认区块已经重新生成，而不是去检查任何 JSON 缓存产物。
4. 先检查 markdown frontmatter 里的 `priority` 和 `useChildrenCollapsed`，再判断是否需要重新生成。
