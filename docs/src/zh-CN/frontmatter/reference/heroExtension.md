---
title: Hero 扩展手册
layout: doc
description: 如何扩展 Hero 排版、浮动元素、Shader、背景渲染器与导航搜索视觉。
priority: 13
---

# Hero 扩展手册

Hero 相关能力必须从契约层开始，再向下流向运行时与渲染层。  
不要一开始就直接修改背景组件，而应先定义与规范化新的数据形态。

## Hero 关键扩展点

以下文件是主要事实来源：

- `docs/.vitepress/utils/vitepress/api/frontmatter/hero/HeroFrontmatterApi.ts`
- `docs/.vitepress/utils/vitepress/api/frontmatter/hero/HeroTypographyRegistryApi.ts`
- `docs/.vitepress/utils/vitepress/api/frontmatter/hero/FloatingElementRegistryApi.ts`
- `docs/.vitepress/utils/vitepress/runtime/hero/navAdaptiveState.ts`
- `docs/.vitepress/theme/components/hero/HeroBackground.vue`
- `docs/.vitepress/theme/components/hero/background/BackgroundLayer.vue`
- `docs/.vitepress/config/shaders/index.ts`
- `docs/.vitepress/config/shaders/templates/base-shader.ts`

## 新增排版风格

不要在 Hero 组件里直接新增 `if styleType === ...` 这样的分支。  
应通过 typography registry 注册新样式，让运行时统一解析。

有两种注册方式：

1. 共享内建样式
   直接把定义加入 `HeroTypographyRegistryApi.ts` 里的 `DEFAULT_TYPOGRAPHY_STYLE_DEFINITIONS`。
2. 项目级启动注册
   在一个被 `docs/.vitepress/theme/index.ts` 引入的启动模块里调用 `heroTypographyRegistry.registerStyle(...)`。

定义里的 canonical `type` 与 `aliases` 都应保持小写，registry 会按小写规则解析。

新增 Hero 排版时，应注册到 typography registry，而不是在组件里直接写新的特殊分支：

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

frontmatter 示例：

```yaml
hero:
  typography:
    type: editorial-soft
```

注册检查清单：

1. 在 `HeroTypographyRegistryApi.ts` 里定义 motion defaults。
2. 保持 canonical type 与 aliases 为小写。
3. 如果新样式需要不同的结构或 class hook，同步更新 hero content 组件或 `docs/.vitepress/theme/components/hero/styles/vp-hero-typography.css`。
4. 通过 `docs/.vitepress/utils/vitepress/runtime/hero/typographyState.ts` 验证运行时解析，不要把 motion 逻辑复制到多个组件里。
5. 补 frontmatter 示例页面，并更新 hero 扩展文档。

## 创建新的 Hero 页面

当页面本身是入口页或落地页时，使用 Hero 页面：

```yaml
---
layout: home
hero:
  name: Hero Runtime
  text: Extend Backgrounds, Typography, and Nav
  tagline: Shared contract-first hero configuration
  typography:
    type: floating-tilt
  actions:
    - theme: brand
      text: Hero Extension
      link: /frontmatter/reference/heroExtension
features:
  - title: Shared Runtime
    details: Keep theme, resize, and viewport logic centralized.
---
```

检查清单：

1. 以 `layout: home` 开始。
2. 把 Hero 配置保持在 frontmatter 中，避免页面局部组件 hack。
3. 如果目标属于共享的 hero/home 导航系统，优先复用 action `linkKey` 路由。
4. 如果该页面会成为主入口，同步更新 nav 与首页入口。

## 新增浮动元素类型

自定义浮动元素类型应通过 floating registry 扩展：

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

如果视觉需求已经超出共享类型模型，优先使用组件型 item，而不是在共享渲染器里硬塞一个特殊分支。

## 新增 Hero 特性

如果这是一个作者可配置的 Hero 特性，而不是一次性的视觉小改动：

1. 先在 `HeroFrontmatterApi.ts` 中新增字段并做规范化。
2. 如果特性包含共享状态、定时、observer 或 viewport 行为，在 `docs/.vitepress/utils/vitepress/runtime/hero/**` 中新增或扩展运行时模块。
3. 契约形状稳定后，再在对应的 Hero 组件里渲染它。
4. 在 `docs/src/en-US/hero/**` 与 `docs/src/zh-CN/hero/**` 下补真实 markdown 示例。
5. 如果它会影响首页 Hero actions 或命名链接，也要同步更新 home-link service 与 `linkKey` 文档表。

## 新增 Shader 预设

内置 Shader 应放在 `docs/.vitepress/config/shaders/**`。

推荐步骤：

1. 在 `docs/.vitepress/config/shaders/silk.ts` 这类文件中新增或扩展预设。
2. 尽量复用 `docs/.vitepress/config/shaders/templates/base-shader.ts` 的工具函数。
3. 在 `docs/.vitepress/config/shaders/index.ts` 中统一导出。
4. 页面只通过规范化后的 hero frontmatter 引用预设，不要在页面组件里直接 import shader 文件。

frontmatter 示例：

```yaml
hero:
  background:
    type: shader
    shader:
      preset: silk
```

## 新增背景渲染器类型

当现有 `color`、`image`、`video`、`shader`、`particles` 已无法满足需求时：

1. 先在 `HeroFrontmatterApi.ts` 中加入新类型并完成规范化。
2. 在 `docs/.vitepress/theme/components/hero/background/BackgroundLayer.vue` 中增加对应分发分支。
3. 在 `docs/.vitepress/theme/components/hero/background/` 下创建专用渲染组件。
4. 若该渲染器依赖主题同步、observer 或调度逻辑，应放入共享运行时，而不是写死在组件内部。
5. 在 `docs/src/en-US/hero/**` 与 `docs/src/zh-CN/hero/**` 增加真实示例页面。

## 扩展导航与搜索视觉

当 Hero 附近的导航与搜索视觉依赖滚动位置、主题稳定或 frontmatter 驱动颜色时，也应视为 Hero 契约的一部分。

推荐规则：

1. 自适应计算放入 `docs/.vitepress/utils/vitepress/runtime/hero/navAdaptiveState.ts`。
2. 主题安全的取值逻辑放入共享主题运行时，不要在组件里临时写分支。
3. 若视觉需要按页面配置，优先通过 frontmatter 驱动 CSS 变量暴露给作者。
4. 禁止在导航、搜索或 Hero 子组件中直接读取 DOM 主题类名。

## Hero 扩展完成前检查

1. 新字段或新类型已经在 API 层规范化。
2. 渲染组件只消费规范化后的值。
3. 主题与尺寸逻辑复用了共享运行时。
4. 至少存在一个真实 markdown 示例。
5. `docs/src` 中已有对应文档。
6. 模板仓库 `yarn build` 通过后再同步到下游。
