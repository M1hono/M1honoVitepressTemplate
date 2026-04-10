---
title: 可维护性与扩展指南
description: 面向模板开发者的扩展 API、注册机制、i18n 与插件接入规范。
---

# 可维护性与扩展指南

## 目标

该模板采用扩展优先架构。  
新能力应通过注册 API 与配置注入，不应直接修改核心运行时组件。

## 详细页面

- [开发工作流](./developmentWorkflow)
- [扩展架构说明](./extensionArchitecture)
- [Hero 扩展手册](./heroExtension)

## 核心目录职责

- 运行时与 API：`docs/.vitepress/utils/vitepress/**`
- 主题组件：`docs/.vitepress/theme/components/**`
- 多语言资源：`docs/.vitepress/config/locale/**`
- Markdown 插件实现：`docs/.vitepress/plugins/**`
- 插件组合入口：`docs/.vitepress/config/markdown-plugins.ts`

## 扩展 API

### 1. Hero 排版风格注册表

```ts
import { heroTypographyRegistry } from "@utils/vitepress/api/frontmatter/hero";

heroTypographyRegistry.registerStyle({
    type: "editorial-soft",
    aliases: ["soft-editorial"],
    motion: {
        intensity: 0.9,
        title: { x: 6, y: -4, scale: 1.03 },
        text: { x: 8, y: 3, scale: 1.02 },
        tagline: { x: 4, y: 6, scale: 1.01 },
        image: { x: 5, y: -2, scale: 1.015 },
        transitionDuration: 520,
        transitionDelayStep: 36,
        transitionEasing: "cubic-bezier(0.2, 0.9, 0.2, 1)",
    },
});
```

frontmatter 配置：

```yaml
hero:
  typography:
    type: editorial-soft
```

### 2. 导航下拉布局注册表

```ts
import { navDropdownLayoutRegistry } from "@utils/vitepress/api/navigation";
import VPNavLayoutEditorial from "@components/navigation/layouts/VPNavLayoutEditorial.vue";

navDropdownLayoutRegistry.registerLayout("editorial", VPNavLayoutEditorial);
```

导航配置：

```ts
dropdown: {
  layout: "editorial",
  panels: [...]
}
```

也可逐项覆盖：

```ts
dropdown: {
  layoutComponent: "VPNavLayoutEditorial",
  panels: [...]
}
```

### 3. 浮动元素注册表

```ts
import { floatingElementRegistry } from "@utils/vitepress/api/frontmatter/hero";

floatingElementRegistry.registerType({
    type: "keyword-chip",
    renderAs: "badge",
    className: "floating-keyword-chip",
});
```

frontmatter 示例：

```yaml
hero:
  floating:
    items:
      - type: keyword-chip
        text: Event API
```

完全自定义渲染：

```yaml
hero:
  floating:
    items:
      - component: HeroFloatingCourseCard
        componentProps:
          title: KubeJS Course
          provider: GitBook
```

## 新组件开发流程

1. 在 `docs/.vitepress/theme/components/<category>/` 新建组件。
2. 若组件需复用，导出到 `docs/.vitepress/utils/vitepress/componentRegistry/*Registry.ts`。
3. 若需 Markdown 全局使用，在 `docs/.vitepress/utils/vitepress/components.ts` 注册。
4. 新增中英文翻译 JSON：
   - `docs/.vitepress/config/locale/en-US/components/...`
   - `docs/.vitepress/config/locale/zh-CN/components/...`
5. 更新 `docs/.vitepress/config/locale/component-id-mapping.json`。

最小 i18n 用法：

```vue
<script setup lang="ts">
import { useSafeI18n } from "@utils/i18n/locale";

const { t } = useSafeI18n("my-component", {
  title: "Default title",
});
</script>

<template>
  <h2>{{ t.title }}</h2>
</template>
```

## i18n 运行时保证

- 语言来源于 VitePress 语言状态并保持响应式。
- 缓存维度为 `componentId@locale`。
- 切换语言时文本无需刷新页面即可更新。
- 缺失键自动回退到代码默认文案。
- 组件路径映射统一由 `component-id-mapping.json` 管理。

## Markdown 插件接入流程

1. 在 `docs/.vitepress/plugins/` 编写插件。
2. 在 `docs/.vitepress/config/markdown-plugins.ts` 注册。
3. 如插件渲染依赖组件，补充 `components.ts` 注册。
4. 在 `docs/src/en-US` 与 `docs/src/zh-CN` 增加示例页面。

## 主题同步规范（首屏进入 + 刷新一致）

所有存在主题敏感视觉的组件（Hero 背景、主题图标、导航卡片、元信息类视觉块等）必须遵循以下规则：

1. 不要在业务组件中直接读取 DOM 主题类名作为唯一来源。
2. 不要只依赖原始 `useData().isDark` 处理首屏视觉切换。
3. 使用 `getThemeRuntime(isDark)`，并基于 `effectiveDark`、`themeReady`、`version` 做主题分支，保证首次进入、刷新与运行时切换都一致。
4. Hero 子组件中统一使用 `useHeroTheme()`，优先读取 `isDarkRef.value` 与 `resolveThemeValueByMode(...)`。
5. 对首屏敏感的 Hero 视觉层，必须通过 `themeReady` 控制渲染，避免 light/dark 闪烁。
6. 禁止自动从 dark 回退到 light，或从 light 回退到 dark。共享解析器必须遵循 `dark ?? value` 与 `light ?? value`。
7. 组件目录只保留视图渲染。若主题同步需要 observer、调度或共享生命周期，必须移动到 `docs/.vitepress/utils/vitepress/runtime/theme/**`。

相关 API：
- `@utils/vitepress/runtime/theme/themeRuntime`
- `@utils/vitepress/runtime/theme/heroThemeContext`
- `@utils/vitepress/runtime/theme/themeValueResolver`

最小示例：

```ts
import { useData } from "vitepress";
import { getThemeRuntime } from "@utils/vitepress/runtime/theme";

const { isDark } = useData();
const { effectiveDark, themeReady, version } = getThemeRuntime(isDark);
```

## 尺寸监听规范（Resize）

所有尺寸敏感组件必须使用共享的尺寸监听运行时，禁止重复手写 `ResizeObserver` 生命周期。

1. 使用 `createElementResizeState(targetRef, onResize, { debounceMs })`。
2. 目标元素挂载后执行 `reobserve(targetRef.value)`。
3. 除非有特殊能力缺口，否则禁止在组件内部单独 new `ResizeObserver`。
4. 清理逻辑由共享运行时负责，组件仅保留业务更新函数。

相关 API：
- `@utils/vitepress/runtime/viewport/elementResizeState`

最小示例：

```ts
import { createElementResizeState } from "@utils/vitepress/runtime/viewport";

const targetRef = ref<HTMLElement | null>(null);
const { reobserve } = createElementResizeState(
  targetRef,
  () => syncLayout(),
  { debounceMs: 80 },
);
```

## 日常开发流程

修改框架能力时，建议按以下顺序推进，避免契约与实现脱节：

1. 先改契约层。
   在 `docs/.vitepress/utils/vitepress/api/**` 更新类型、schema、规范化逻辑。
2. 再改共享运行时。
   主题同步、尺寸监听、Hero 自适应、DOM 观察等状态逻辑统一放到 `docs/.vitepress/utils/vitepress/runtime/**`。
3. 最后改视图组件。
   `docs/.vitepress/theme/components/**` 只负责渲染与轻量组合，不承担复杂生命周期。
4. 同步更新示例与文档。
   新 frontmatter 键或扩展点必须至少有一个 markdown 示例，并写明用法。
5. 合并前执行对应校验命令。

推荐在 `docs/` 目录执行：

```bash
yarn locale
yarn sidebar
yarn tags
yarn build
```

若修改了配置或 frontmatter 契约，还应执行：

```bash
yarn frontmatter
```

## 代码放置规则

以下目录是主要职责边界：

- `docs/.vitepress/config/project-config.ts`
  站点级产品配置、功能开关、语言列表、搜索提供方、部署、社交链接。
- `docs/.vitepress/config/lang/**`
  导航、主题、搜索等多语言配置。
- `docs/.vitepress/config/shaders/**`
  内置 shader 模板与 shader 注册表。
- `docs/.vitepress/config/markdown-plugins.ts`
  Markdown 插件组合入口与注册顺序。
- `docs/.vitepress/plugins/**`
  markdown-it 插件实现。
- `docs/.vitepress/theme/components/**`
  Vue 视图层，只消费规范化后的配置与运行时状态。
- `docs/.vitepress/theme/styles/**`
  全局样式层、变量、插件皮肤、共享组件样式。
- `docs/.vitepress/utils/vitepress/api/**`
  契约类型、规范化逻辑、注册表、扩展 API。
- `docs/.vitepress/utils/vitepress/runtime/**`
  有状态域：主题同步、尺寸同步、Hero 行为、媒体观察等。
- `docs/.vitepress/utils/vitepress/componentRegistry/**`
  可复用组件的统一导出入口。
- `docs/.vitepress/utils/vitepress/components.ts`
  markdown / 运行时全局组件注册。

判断原则：

- 负责解析、规范化、校验配置的，放 `api`。
- 负责生命周期、DOM 协调、观察器的，放 `runtime`。
- 只负责展示的，放 `theme/components`。

## 运行时与函数扩展规范

新增函数、composable、service、controller 时：

1. 纯函数与契约辅助逻辑放在 `api`，不要塞进组件。
2. 有状态控制器放在 `runtime`，生命周期复杂时优先采用小粒度类式 API。
3. 新增公共能力要从最近的 `index.ts` barrel 导出。
4. 共享或时序敏感逻辑不要在多个组件里重复直接读取 DOM。
5. 优先做一个共享运行时，而不是在多个组件里重复 new `MutationObserver` / `ResizeObserver`。

当前可参考的成熟模式：

- 主题稳定化：`docs/.vitepress/utils/vitepress/runtime/theme/**`
- 元素尺寸运行时：`docs/.vitepress/utils/vitepress/runtime/viewport/**`
- Hero 导航自适应：`docs/.vitepress/utils/vitepress/runtime/hero/navAdaptiveState.ts`

## 组件与全局注册规范

新增 Vue 组件时：

1. 放到 `docs/.vitepress/theme/components/<category>/` 的正确分类目录。
2. 若需要被框架代码复用，先导出到 `docs/.vitepress/utils/vitepress/componentRegistry/**` 对应 barrel。
3. 若需要在 Markdown 中直接使用，再注册到 `docs/.vitepress/utils/vitepress/components.ts`。
4. 若组件带文案，补齐多语言资源并同步组件 ID 映射。

面向 Markdown 的组件注册链建议固定为：

`组件文件` -> `componentRegistry barrel` -> `components.ts` -> markdown / 运行时消费

## 配置扩展规范

新增配置或 frontmatter 字段时：

1. 先在 `docs/.vitepress/utils/vitepress/api/frontmatter/hero/HeroFrontmatterApi.ts` 或对应 API 模块补充类型。
2. 在同一层完成旧格式与新格式的规范化。
3. 视图组件只读取规范化后的结果，不自行兼容多种输入形态。
4. 若字段影响导航、搜索、主题行为，应更新对应 runtime controller，而不是在组件内部重复处理。
5. 同步补充文档页与示例页面。

站点级配置变更时：

1. 更新 `docs/.vitepress/config/project-config.ts`。
2. 若涉及标签或搜索 locale，同步更新 `docs/.vitepress/config/lang/**`。
3. 若配置需要向文档元数据或生成内容传播，执行 `yarn frontmatter`。

## 样式扩展规范

全局样式层有明确顺序，遵循 `docs/.vitepress/theme/styles/index.css` 的导入层级：

1. 配置变量
2. 基础样式
3. 插件样式
4. 共享组件样式

不同样式需求使用不同载体：

- 组件内 scoped `<style>`：
  只处理组件局部布局与外观。
- `docs/.vitepress/theme/styles/**` 全局 CSS：
  处理跨组件 token、插件皮肤、布局原语、全站级选择器。
- frontmatter / config 驱动的 CSS 变量：
  处理运行时主题值，尤其是 hero/background/nav/search 颜色。

若一个问题可以通过 CSS 变量契约或 scoped 样式解决，就不要新增全局 ad-hoc 选择器。

## Hero 扩展手册

Hero 扩展必须从契约层开始，不要直接从视图组件硬改。

### 1. 新增 Typography 样式

通过排版注册表挂载新样式：

```ts
import { heroTypographyRegistry } from "@utils/vitepress/api/frontmatter/hero";

heroTypographyRegistry.registerStyle({
  type: "editorial-soft",
  aliases: ["soft-editorial"],
  motion: {
    intensity: 0.9,
    title: { x: 6, y: -4, scale: 1.03 },
    text: { x: 8, y: 3, scale: 1.02 },
    tagline: { x: 4, y: 6, scale: 1.01 },
    image: { x: 5, y: -2, scale: 1.015 },
    transitionDuration: 520,
    transitionDelayStep: 36,
    transitionEasing: "cubic-bezier(0.2, 0.9, 0.2, 1)",
  },
});
```

前端通过 `hero.typography.type` 使用该样式。

### 2. 新增 Floating Element 类型

通过浮动元素注册表扩展：

```ts
import { floatingElementRegistry } from "@utils/vitepress/api/frontmatter/hero";

floatingElementRegistry.registerType({
  type: "keyword-chip",
  renderAs: "badge",
  className: "floating-keyword-chip",
});
```

若需要完全自定义渲染，应绑定组件，并明确文档里的 `componentProps` 契约。

### 3. 新增 Shader 模板

Shader 模板在 `docs/.vitepress/config/shaders/index.ts` 注册，模板结构定义在 `docs/.vitepress/config/shaders/templates/base-shader.ts`。

最小写法：

```ts
// @config 别名指向 .vitepress/utils/config/，不覆盖 .vitepress/config/，需用相对路径导入。
// 示例：若文件位于 .vitepress/config/shaders/ 下：
import { registerShaderTemplate } from "./index";
import { baseVertexShader, buildTemplate } from "./templates/base-shader";
// 从其他位置（如 .vitepress/theme/components/ 下的组件）导入时调整路径：
// import { registerShaderTemplate } from "../../../config/shaders";
// import { baseVertexShader, buildTemplate } from "../../../config/shaders/templates/base-shader";

registerShaderTemplate("aurora", buildTemplate({
  key: "aurora",
  vertex: baseVertexShader,
  fragment: `...`,
  defaultUniforms: {
    uIntensity: 0.8,
  },
}));
```

如果要作为内置预设发布，除了动态注册，还应新增独立文件并加入默认 shader registry。

### 4. 新增 Background Renderer 类型

如果不是新增 shader 预设，而是新增真正的背景类型：

1. 在 `HeroFrontmatterApi.ts` 中扩展 `HeroBackgroundType` 与相关契约。
2. 在同一 API 层完成规范化。
3. 在 `docs/.vitepress/theme/components/hero/background/` 新建渲染组件。
4. 在 `docs/.vitepress/theme/components/hero/background/BackgroundLayer.vue` 中接入类型到组件映射。
5. 补充对应中英文示例页面。

### 5. 扩展 Hero Nav/Search 视觉

首页顶部导航与搜索框视觉由 `hero.colors.*` 契约驱动，并在 `docs/.vitepress/utils/vitepress/runtime/hero/navAdaptiveState.ts` 中解析。

若需要新增 Hero 驱动的 nav/search 样式能力：

1. 先在 `HeroFrontmatterApi.ts` 增加 typed color key。
2. 再在 `navAdaptiveState.ts` 中消费并映射为 CSS 变量。
3. 避免在组件内直接写主题分支，优先复用变量契约。

## 文档与校验清单

每个面向框架的扩展至少应同时交付：

1. 类型更新
2. runtime / component 集成
3. 至少一个 markdown 示例
4. 中英文文档同步
5. PR 或 handoff 中记录执行过的验证命令

最低验证要求：

- `yarn locale`
- `yarn sidebar`
- `yarn tags`
- `yarn build`

## 工程规范

- 有状态运行时模块优先采用类式 API。
- 禁止新增旧路径兼容 re-export 文件。
- 内部导入统一使用 `@` 别名。
- 新行为必须通过注册 API 暴露，避免修改系统内核。
- 最低校验：
  - `npx tsc --noEmit`

## 相关页面

- [扩展架构说明](./extensionArchitecture) — 框架代码的归属与分层扩展检查清单
- [开发工作流](./developmentWorkflow) — 日常开发命令与流程
- [Hero 扩展手册](./heroExtension) — Hero 系统扩展的分步指南
- [Frontmatter 键值清单](./keyInventory) — 可用 frontmatter 键的完整列表
