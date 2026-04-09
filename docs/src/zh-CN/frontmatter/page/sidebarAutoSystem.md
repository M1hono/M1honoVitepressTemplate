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
3. `docs/.vitepress/config/sidebar/**` 下的 JSON 仅用于标签与视图状态补充。

在构建内容模板、代码片段和扩展补全时，请以本页面为真实来源。

## 当前策略：Frontmatter 优先

1. 侧边栏排序由 `index.md` 和子页面的 `priority` 控制。
2. 页面 `description` 放在 frontmatter，便于文档元数据和扩展生成。
3. `order.json` 默认保持空对象，避免覆盖 frontmatter 排序。

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
| `collapseControl` | `object` | 不写 | 控制当前生成的 sidebar 视图里子目录或子 root 的折叠状态。 |
| `viewControl` | `object` | root 默认为 `self`，非 root 默认为 `all` | 高级 nested-root 遍历控制。 |
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

## 推荐折叠控制：`collapseControl`

如果你的目标只是让父 root 决定当前 sidebar 视图里哪些子目录默认折叠、哪些默认展开，优先使用 `collapseControl`。

```yaml
---
title: 整合包文档
root: true
collapsed: false
collapseControl:
  default: true
  paths:
    "kubejs/1.20.1": false
    "kubejs/1.21": false
---
```

需要注意：

1. `collapseControl` 只影响当前这次生成出来的 sidebar 视图。
2. 它不会改写子 root 自己的 `collapsed`。
3. 它不会改写子 root 自己的 `maxDepth`。
4. `paths` 总是相对当前 sidebar 视图根目录来写。

## 高级遍历控制：`viewControl`

`viewControl` 保留给少数 nested-root 场景，用来决定当前这轮生成时由谁接管遍历控制。

```yaml
---
title: KubeJS 1.20.1
viewControl:
  controlledByParent: false
---
```

即使子 root 当前继续跟随父级生成，它依然保留自己的本地 `maxDepth` 和本地 `viewControl`，在它自己生成 sidebar 时继续生效。

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

## JSON 覆盖层

引擎将生成的结构与以下位置的 JSON 文件同步：

- `docs/.vitepress/config/sidebar/<lang>/<section>/locales.json`
- `docs/.vitepress/config/sidebar/<lang>/<section>/collapsed.json`
- `docs/.vitepress/config/sidebar/<lang>/<section>/hidden.json`

`order.json` 为兼容保留，但本项目默认保持空对象，不作为主排序来源。
长期结构意图请使用声明式 frontmatter。

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
3. 检查 `docs/.vitepress/cache/sidebar/sidebar_<lang>.json` 中生成的路由。
4. 先检查 markdown frontmatter 中的 `priority`，再考虑 JSON 文件是否需要调整。
