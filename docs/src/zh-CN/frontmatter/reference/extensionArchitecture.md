---
title: 扩展架构说明
layout: doc
description: 组件、函数、配置、插件与样式扩展的职责边界与落点规则。
priority: 12
---

# 扩展架构说明

本页说明框架代码应该放在哪里，以及如何在不混淆契约、运行时与渲染层职责的前提下扩展模板。

## 架构分层规则

请始终保持这套分层：

- `api` 负责契约事实来源
- `runtime` 负责共享状态与生命周期
- `theme/components` 负责渲染
- `config` 负责项目默认值与注册接线
- `docs/src` 负责示例与开发者文档

若一项改动同时触及五层，不要随机编辑，而应按这个顺序推进。

## 创建普通页面

新增普通文档页时：

1. 在两个语言目录中创建相同相对路径的 markdown 文件。
   例如：`docs/src/en-US/guide/example.md` 与 `docs/src/zh-CN/guide/example.md`。
2. 从最基础的 frontmatter 开始：

```yaml
---
title: 示例页面
layout: doc
description: 这页讲什么。
---
```

3. 只有在页面需要从顶层入口被发现时，才补导航或首页入口。
4. 如果页面引入了新的 frontmatter 契约，同步更新对应的 `frontmatter/**` 参考文档。
5. 如果页面位于新的目录分支，确保该分支的 sidebar 元数据存在且能正常构建。

## 创建首页或 Hero 页面

落地页或文档入口页使用这一套：

1. 使用 `layout: home`。
2. 先写 Hero frontmatter：

```yaml
---
layout: home
hero:
  name: Framework Docs
  text: Build and Extend the Template
  tagline: Runtime、frontmatter、plugin 与组件工作流
  actions:
    - theme: brand
      text: Development Workflow
      link: /frontmatter/reference/developmentWorkflow
---
```

3. Hero 主体稳定后，再补 `features` 或 `featureCards`。
4. 如果页面要复用命名的 Hero action 链接，请扩展 home-link service 与 hero frontmatter API，而不是在组件里硬编码。
5. 如果页面会改动 nav/search/hero 视觉，也要同步补齐对应 frontmatter 键文档。

## 组件扩展

新增组件时：

1. 放到 `docs/.vitepress/theme/components/<category>/` 的正确分类下。
2. 若需要内部复用，导出到 `docs/.vitepress/utils/vitepress/componentRegistry/**` 对应 barrel。
3. 若需要 markdown 用户直接使用，在 `docs/.vitepress/utils/vitepress/components.ts` 注册。
4. 若组件包含 UI 文案，需补充 `docs/.vitepress/config/locale/en-US/components/**` 与 `docs/.vitepress/config/locale/zh-CN/components/**` 两套资源。
5. 若新增 `useSafeI18n("<component-id>", ...)` 标识，必须同步 `docs/.vitepress/config/locale/component-id-mapping.json`。

## 深入说明：注册新的内容组件

当组件属于内容层，并会出现在 markdown 页面或文档壳层时，按这条链路处理：

1. 在 `docs/.vitepress/theme/components/content/` 下创建 Vue 文件。
2. 如果该目录有 barrel，先导出到 `docs/.vitepress/theme/components/content/index.ts`。
3. 如果主题内部其他模块要通过 registry 复用它，再导出到 `docs/.vitepress/utils/vitepress/componentRegistry/contentRegistry.ts`。
4. 如果 markdown 页面需要直接通过标签名调用它，再注册到 `docs/.vitepress/utils/vitepress/components.ts`。
5. 如果组件使用了 `useSafeI18n`，补全 locale JSON，并加入 `component-id-mapping.json`。
6. 如果它由 markdown 插件输出，确保插件输出的是已注册的标签，而不是未注册的自定义元素。
7. 至少补一页真实 markdown 示例，确保它在构建产物里被验证，而不是只在单独调试时能跑。

可以这样理解：

- `componentRegistry/contentRegistry.ts`
  给主题内部复用。
- `components.ts`
  给 markdown / 全局标签注册。

## 函数与运行时扩展

新增函数、composable、service 或 controller 时：

1. 纯数据规范化逻辑放入 `docs/.vitepress/utils/vitepress/api/**`。
2. 共享状态型能力放入 `docs/.vitepress/utils/vitepress/runtime/**`。
3. 从最近的 `index.ts` barrel 暴露公共入口。
4. 优先建设一个共享运行时，而不是在多个组件中各写一套 observer。
5. 如果未来多个视图都会用到，不能只把能力藏在某一个组件实现里。

模板中已经存在的优秀样例：

- 主题同步：`docs/.vitepress/utils/vitepress/runtime/theme/**`
- Hero 导航自适应：`docs/.vitepress/utils/vitepress/runtime/hero/navAdaptiveState.ts`
- Frontmatter 契约规范化：`docs/.vitepress/utils/vitepress/api/frontmatter/hero/HeroFrontmatterApi.ts`

## 配置扩展

凡是应该集中声明并被运行时或视图消费的能力，都应走配置层。

常见文件：

- `docs/.vitepress/config/project-config.ts`
  全局项目设置、功能开关、社交链接、路由辅助与搜索配置。
- `docs/.vitepress/config/lang/**`
  面向多语言的导航与主题配置。
- `docs/.vitepress/config/markdown-plugins.ts`
  Markdown 插件组合顺序。
- `docs/.vitepress/config/shaders/**`
  内置 Shader 预设与注册接线。

推荐检查顺序：

1. 先定义字段或注册项。
2. 再在 API 层做规范化。
3. 运行时与视图层只消费规范化结果。
4. 立刻补充文档示例。
5. 若生成元数据依赖该配置，执行 `yarn sync-config` 与 `yarn frontmatter`。

## 样式扩展

全局样式归属必须清晰。请遵循 `docs/.vitepress/theme/styles/index.css` 的导入层次。

为不同类型的样式选择正确载体：

- 组件局部布局与视觉：使用 scoped `<style>`
- 跨组件共享 Token、插件皮肤、全局选择器：放入 `docs/.vitepress/theme/styles/**`
- 主题敏感或运行时敏感的值：通过 frontmatter 或配置驱动 CSS 变量

只要某个值需要被主题化或被内容作者调整，就优先做成 CSS 变量契约，而不是写死在一条全局规则里。

## 创建新的 Markdown 插件

新增 Markdown 插件时：

1. 在 `docs/.vitepress/plugins/**` 实现。
2. 在 `docs/.vitepress/config/markdown-plugins.ts` 注册。
3. 若渲染依赖 Vue 组件，在 `docs/.vitepress/utils/vitepress/components.ts` 一并注册。
4. 在 `docs/src/en-US/**` 与 `docs/src/zh-CN/**` 增加示例页面。
5. 最后以真实渲染效果验证，而不是只验证解析逻辑。

如果插件会成为一个可复用的作者入口，也要同时补上：

- markdown 语法
- 对应渲染组件名
- 是否依赖 frontmatter
- 两个语言都能直接复制使用的示例

## 文件职责速查表

遇到改动时，可按下表快速判断落点：

- 新的 hero 字段或嵌套 frontmatter 键：`docs/.vitepress/utils/vitepress/api/frontmatter/**`
- 主题稳定、观察器或共享生命周期：`docs/.vitepress/utils/vitepress/runtime/**`
- 新的 Vue 视觉块或结构组件：`docs/.vitepress/theme/components/**`
- 新的 Markdown 语法：`docs/.vitepress/plugins/**` 与 `docs/.vitepress/config/markdown-plugins.ts`
- 新的全局 Token 或共享皮肤：`docs/.vitepress/theme/styles/**`
- 新的用法说明与开发手册：`docs/src/**`
