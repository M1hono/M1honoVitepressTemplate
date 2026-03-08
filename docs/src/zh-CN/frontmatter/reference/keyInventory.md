---
title: Frontmatter 键清单
description: 运行时使用的活跃规范 frontmatter 键。
priority: 60
---
# Frontmatter 键清单

| 键路径 | 作用域 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `cssVars` | 当前页面作用域 | 未设置 | 页面级 CSS 自定义属性。 |
| `layoutClass` | 全局页面 | 未设置 | 向布局包装器添加类名。 |
| `layout` | 全局页面 | VitePress 默认值 | 布局选择。 |
| `isHome` | 全局页面 | 推断 | 首页检测回退。 |
| `root` | 侧边栏目录 | `false` | 将 `index.md` 目录标记为侧边栏根。 |
| `maxDepth` | 侧边栏目录 | `3` | 生成的侧边栏条目的递归深度上限。 |
| `collapsed` | 侧边栏目录 | `false` | 目录区块的默认折叠状态。 |
| `itemOrder` | 侧边栏目录 | `{}` | 手动子条目排序映射/数组。 |
| `groups` | 侧边栏目录 | `[]` | 侧边栏输出中提取的分组区块。 |
| `externalLinks` | 侧边栏目录 | `[]` | 追加到区块的外部链接。 |
| `priority` | 侧边栏目录/页面 | `0` | 兄弟条目间的排序优先级。 |
| `hidden` | 侧边栏目录/页面 | `false` | 从侧边栏输出中隐藏目录/页面。 |
| `hero` | 首页/运行时 | `{}` | Hero 编排器配置。 |
| `hero.layout.viewport` | hero | `true` | 全视口 Hero 开关。 |
| `hero.background` | hero | 未设置 | 单层/多层背景系统。 |
| `hero.background.type` | hero 背景 | 未设置 | `image|video|color|shader|particles|none`。 |
| `hero.background.layers` | hero 背景 | `[]` | 图层模式。 |
| `hero.background.opacity` | hero 背景 | `1` | 全局背景不透明度。 |
| `hero.background.brightness` | hero 背景 | `1` | 全局背景亮度。 |
| `hero.background.contrast` | hero 背景 | `1` | 全局背景对比度。 |
| `hero.background.saturation` | hero 背景 | `1` | 全局背景饱和度。 |
| `hero.background.filter` | hero 背景 | 未设置 | 额外滤镜链。 |
| `hero.background.cssVars` | hero 背景 | 未设置 | 背景根 CSS 变量。 |
| `hero.background.style` | hero 背景 | 未设置 | 内联样式覆盖。 |
| `hero.background.layers[*].cssVars` | hero 图层 | 未设置 | 每图层 CSS 变量。 |
| `hero.background.layers[*].style` | hero 图层 | 未设置 | 每图层内联样式。 |
| `hero.colors` | hero | 未设置 | 文本颜色（`title`、`tagline`、`text`）和导航/搜索颜色覆盖。 |
| `hero.colors.title` | hero 颜色 | 未设置 | Hero name（H1）颜色，支持 `{ light, dark }`。 |
| `hero.colors.text` | hero 颜色 | 未设置 | Hero text（副标题）颜色。 |
| `hero.colors.tagline` | hero 颜色 | 未设置 | Hero tagline 颜色。 |
| `hero.colors.navText` | hero 颜色 | 未设置 | 导航链接文字颜色。 |
| `hero.colors.navBackground` | hero 颜色 | 未设置 | 导航栏背景颜色。 |
| `hero.colors.searchBackground` | hero 颜色 | 未设置 | 搜索按钮背景颜色。 |
| `hero.background.color.gradient.animation` | hero 背景 | 未设置 | 渐变动画：`flow`、`rotate`、`pulse`。 |
| `hero.actions[*].linkKey` | hero 行动 | 未设置 | 行动按钮链接的命名路由键，包含 `maintainabilityGuide`、`developmentWorkflow`、`extensionArchitecture`、`heroExtension` 等开发文档路由。 |
| `hero.actions[*].style` | hero 行动 | 未设置 | 行动按钮视觉覆盖。 |
| `hero.snippets` | hero | 未设置 | 浮动元素消费的片段数据。 |
| `hero.floating` | hero | 未设置 | 浮动装饰元素配置。 |
| `hero.floating.density` | 浮动 | `1` | 可见浮动元素数量。 |
| `hero.image.background.enabled` | hero 图像 | `false` | 启用 Hero 图像后方的发光层。 |
| `hero.image.frame` | hero 图像 | 未设置 | Hero 图像的边框形状、边框、阴影和布局。 |
| `hero.waves` | hero 覆盖层 | 默认启用 | 规范的波浪过渡配置。 |
| `hero.image` | hero 媒体 | 未设置 | `image|video|gif|model3d|lottie` 运行时。 |
| `features` | 首页/特性 | `[]` | 特性卡片数据源。 |
| `featuresConfig` | 首页/特性 | 应用默认值 | 特性滚动器选项。 |
| `tags` | 内容 | `[]` | 页面标签芯片。 |
| `description` | 内容 | 空 | 预览组件文本。 |
| `metadata` | 内容 | `true` | 元数据行开关。 |
| `date` | 内容 | 回退时间戳 | 元数据日期覆盖。 |
| `lastUpdated` | 内容 | 回退时间戳 | 元数据日期覆盖。 |
| `progress` | 内容 | `false` | 进度条百分比。 |
| `state` | 内容 | 未设置 | 内容状态区块。 |
| `showComment` | 内容 | `true` | 评论模块开关。 |
| `buttons` | UI 控件 | `true` | 浮动实用按钮开关。 |
| `backPath` | UI 控件 | 自动路由 | 显式返回目标。 |
| `showEditor` | 内容 | `true` | 责任编辑区块开关。 |
| `editor` | 内容 | 项目作者 | 责任编辑名称覆盖。 |

## 不支持 / 已移除（运行时无效果）

- `hero.background.type: waves`
- `hero.waves.enabled: false`（波浪始终渲染）
- `hero.floating.motion.style: legacy-a | legacy-b`
- `hero.customSnippet`
- `hero.floating.text`、`hero.floating.card`、`hero.floating.image`、`hero.floating.badge`、`hero.floating.icon`、`hero.floating.stat`、`hero.floating.code`、`hero.floating.shape`

## 相关页面

- [扩展架构说明](./extensionArchitecture) — 框架代码的归属与分层扩展检查清单
- [开发工作流](./developmentWorkflow) — 日常开发命令与流程
- [Hero 扩展手册](./heroExtension) — Hero 系统扩展的分步指南
- [可维护性与扩展指南](./maintainability) — 所有扩展 API 的深度技术参考
