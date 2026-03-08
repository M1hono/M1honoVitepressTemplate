---
title: 开发工作流
layout: doc
description: 模板开发推荐的改动顺序、校验命令与上下游同步规则。
priority: 11
---

# 开发工作流

本页用于说明如何在不破坏 frontmatter、运行时与渲染层契约的前提下修改模板。

## 先从模板仓库开始

该仓库是框架层的上游事实来源。  
只要改动属于模板能力本身，就应先在这里实现与验证，再同步到 CrychicDoc 之类的下游站点。

推荐顺序：

1. 先修改 `docs/.vitepress/utils/vitepress/api/**`。
   在这里更新类型、schema、规范化逻辑、注册表输入结构与兼容行为。
2. 再修改 `docs/.vitepress/utils/vitepress/runtime/**`。
   主题稳定、DOM 观察、尺寸同步、调度与自适应状态都应进入共享运行时。
3. 最后修改 `docs/.vitepress/theme/components/**`。
   视图组件应保持轻量，只消费规范化后的配置与运行时状态。
4. 在同一次改动中补充 `docs/src/**` 示例与参考文档。
   任何新增 frontmatter 键或扩展点都应至少有一个真实 markdown 示例。
5. 模板构建稳定后，再同步到下游仓库。

## 校验命令

框架改动后，请在 `docs/` 目录执行：

```bash
yarn locale
yarn sidebar
yarn tags
yarn build
```

若改动影响项目配置或 frontmatter 契约，还应执行：

```bash
yarn sync-config
yarn frontmatter
```

## 改动归类规则

动手前，先判断改动属于哪一层：

- `docs/.vitepress/utils/vitepress/api/**`
  契约层。负责 schema、规范化、注册表与扩展类型。
- `docs/.vitepress/utils/vitepress/runtime/**`
  共享运行时。负责主题同步、尺寸监听、调度与共享生命周期。
- `docs/.vitepress/theme/components/**`
  渲染层。负责 Vue 结构、轻量组合与局部表现逻辑。
- `docs/.vitepress/config/**`
  项目默认配置、语言配置、Shader 注册与插件组合。
- `docs/.vitepress/plugins/**`
  Markdown-it 插件实现。
- `docs/.vitepress/theme/styles/**`
  全局样式层、共享 CSS 变量与组件皮肤。
- `docs/src/**`
  面向使用者的文档、示例与扩展手册。

## 常见任务起点

遇到这些任务时，优先从下面的入口开始：

- 新建普通页面
  先在两个语言目录中创建相同相对路径的 markdown 文件，再决定是否需要新增顶层导航入口。
- 新建 Hero 页面
  先从 `layout: home` 与 `hero` / `features` frontmatter 开始；如果需要新的 Hero 配置键，先改 `api/frontmatter/hero/**`，再改渲染组件。
- 新建可复用组件
  先在 `docs/.vitepress/theme/components/**` 创建组件，再补齐完整注册链：component registry 导出、全局 markdown 注册、locale JSON、`component-id-mapping.json`。
- 新建 Hero 特性
  先改 `docs/.vitepress/utils/vitepress/api/frontmatter/hero/**`，再在 `runtime/hero/**` 放共享状态，最后再改 `theme/components/hero/**`。
- 新建 Markdown 插件
  先在 `docs/.vitepress/plugins/**` 实现，再接入 `docs/.vitepress/config/markdown-plugins.ts`，并补齐渲染组件注册。

## 上游到下游同步规则

当框架改动需要同步到产品仓库时：

1. 先完成模板实现。
2. 先在模板中完成构建与视觉校验。
3. 再将相同的契约、运行时与视图改动同步到下游。
4. 尽量保持命名与文件职责一致，保证后续同步仍然机械化、可追踪。
5. 除非产品仓库真的产生分叉，否则不要添加下游专属补丁式逻辑。

## 提交前检查清单

在认为改动完成前，先检查：

1. 事实来源是否清晰？
   契约逻辑不应散落在组件中重复实现。
2. 运行时是否共享？
   重复的 `MutationObserver`、`ResizeObserver` 或直接 DOM 主题读取通常应进入 `runtime`。
3. 扩展点是否已文档化？
   新键、新类型、新注册表都应出现在 `docs/src`。
4. 示例是否真实可编译？
   优先使用真实 YAML 与真实组件名，不要写伪代码式配置。
5. 下游同步路径是否清楚？
   未来维护者应能按相同文件地图完成同步。

## 常见错误

- 直接在 Vue 组件中新增临时解析逻辑
- 在业务组件里直接读取 dark-mode DOM 类名
- 明明可以用 CSS 变量契约，却先写一条临时全局样式
- 新增扩展点却没有同步文档与示例
- 先在下游仓库实现，再反向尝试回填模板

## 相关页面

- [扩展架构说明](./extensionArchitecture) — 框架代码的归属与分层扩展检查清单
- [Hero 扩展手册](./heroExtension) — Hero 系统扩展的分步指南
- [Frontmatter 键值清单](./keyInventory) — 可用 frontmatter 键的完整列表
- [可维护性与扩展指南](./maintainability) — 所有扩展 API 的深度技术参考
