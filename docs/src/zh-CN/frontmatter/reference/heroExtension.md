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

## 注册表详解：HeroTypographyRegistry

**源文件**：`docs/.vitepress/utils/vitepress/api/frontmatter/hero/HeroTypographyRegistryApi.ts`
**单例导入**：`import { heroTypographyRegistry } from "@utils/vitepress/api/frontmatter/hero";`

`HeroTypographyRegistryApi` 类管理 Hero 排版样式 —— 每种样式定义了 Hero 文字元素（title、text、tagline、image）如何响应鼠标/视窗交互产生视差运动。样式统一注册在这里，运行时通过单一查找解析，避免在各 Hero 组件里散落 `if styleType === ...` 分支。

### 内置样式

| 规范类型 | 别名 | 说明 |
|---|---|---|
| `"floating-tilt"` | `["default"]` | 默认视差效果，所有 Hero 文字节点带有倾斜运动。未指定类型或类型无法识别时自动回退到此样式。 |
| `"grouped-float"` | — | 所有文字节点作为整体统一浮动。 |
| `"slanted-wrap"` | — | 对角线运动模式，文字带有换行对齐。 |
| `"none"` | `["static"]` | 禁用所有运动。页面需要完全静态 Hero 时使用。 |

如果 frontmatter 指定了无法识别的类型（如 `type: banana`），registry 会静默回退到 `"floating-tilt"`。

### Motion 字段说明

每种样式为四个**节点目标**和四个**全局控制**定义运动默认值：

**节点级 motion**（分别针对 `title`、`text`、`tagline`、`image`）：

| 字段 | 类型 | 含义 |
|---|---|---|
| `x` | `number` | 水平像素偏移量。正值 = 鼠标移动时元素向右偏移。 |
| `y` | `number` | 垂直像素偏移量。正值 = 鼠标移动时元素向下偏移。 |
| `scale` | `number` | 缩放因子。`1.0` = 不缩放，`1.03` = 悬停时放大 3%。 |

**全局 motion 控制**：

| 字段 | 类型 | 含义 |
|---|---|---|
| `intensity` | `number` | 所有运动值的乘数。`1.0` = 完整强度，`0.5` = 半强度。 |
| `transitionDuration` | `number` | 运动过渡持续时间（毫秒）。 |
| `transitionDelayStep` | `number` | 各节点过渡启动之间的交错延迟（毫秒），产生级联效果。 |
| `transitionEasing` | `string` | 过渡使用的 CSS 缓动函数。 |

### API 方法

```ts
import { heroTypographyRegistry } from "@utils/vitepress/api/frontmatter/hero";

// 注册单个样式及其 motion 默认值
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

// 批量注册多个样式
heroTypographyRegistry.registerStyles([
  { type: "cinematic", motion: { /* ... */ } },
  { type: "minimal-slide", aliases: ["slide"], motion: { /* ... */ } },
]);

// 检查样式是否存在
heroTypographyRegistry.hasStyle("editorial-soft"); // true
heroTypographyRegistry.hasStyle("default");        // true（floating-tilt 的别名）

// 解析类型名称为规范形式（跟随别名，应用回退）
heroTypographyRegistry.resolveStyleType("default");  // "floating-tilt"
heroTypographyRegistry.resolveStyleType("static");   // "none"
heroTypographyRegistry.resolveStyleType("banana");   // "floating-tilt"（回退）

// 获取 motion 默认值的深拷贝副本（可安全修改）
const motion = heroTypographyRegistry.resolveMotionDefaults("floating-tilt");
motion.intensity = 0.5; // 安全 —— 这是深拷贝，不影响原始数据

// 列出所有已注册的样式类型名称
heroTypographyRegistry.listStyleTypes(); // ["floating-tilt", "grouped-float", "slanted-wrap", "none", ...]
```

### 解析流程

1. 读取 frontmatter `hero.typography.type`（如 `"default"`）。
2. `resolveStyleType("default")` 查找别名 → 得到 `"floating-tilt"`。
3. `resolveMotionDefaults("floating-tilt")` 返回该样式 motion 配置的**深拷贝**。
4. 运行时将这些值应用到 Hero 文字节点，用于视差渲染。
5. 如果步骤 2 中类型未知，registry 静默回退到 `"floating-tilt"`。

> **拷贝安全性**：`resolveMotionDefaults` 始终返回新对象。组件可以自由修改返回的 motion 配置，不会影响 registry 存储的默认值。

---

## 注册表详解：FloatingElementRegistry

**源文件**：`docs/.vitepress/utils/vitepress/api/frontmatter/hero/FloatingElementRegistryApi.ts`
**单例导入**：`import { floatingElementRegistry } from "@utils/vitepress/api/frontmatter/hero";`

`FloatingElementRegistryApi` 类管理浮动元素类型 —— 可出现在 Hero 区域周围的装饰性元素（徽章、图标、图片、代码片段等）。每个类型定义控制元素的渲染方式。

### 内置类型

| 类型 | 说明 |
|---|---|
| `"text"` | 纯文本元素。未知类型时的默认回退。 |
| `"card"` | 卡片式容器，可带阴影和边框。 |
| `"image"` | 图片元素，用于 Hero 装饰。 |
| `"lottie"` | Lottie 动画播放器。 |
| `"badge"` | 小型标签式元素（标签、关键词）。 |
| `"icon"` | 使用项目图标系统的图标元素。 |
| `"stat"` | 统计数据展示（数字 + 标签）。 |
| `"code"` | 代码片段块。 |
| `"shape"` | 几何 SVG 形状。 |

如果 frontmatter 指定了无法识别的类型，registry 会回退到 `"text"`。

### 类型定义结构

```ts
interface FloatingElementTypeDefinition {
  type: string;         // 规范类型名称（小写）
  renderAs?: string;    // 映射到另一个类型的渲染器（如 renderAs: "badge" 使用 badge 渲染）
  component?: Component; // 用于完全自定义渲染的 Vue 组件
  className?: string;   // 附加到浮动包装器的 CSS 类名
}
```

- **`renderAs`**：复用另一个类型的渲染器。示例：`{ type: "keyword-chip", renderAs: "badge" }` —— keyword-chip 元素使用 badge 渲染器渲染。
- **`component`**：完全覆盖渲染逻辑，使用自定义 Vue 组件。当 `renderAs` 不够用时使用。
- **`className`**：注入一个 CSS 类，无需自定义渲染器即可实现类型特定样式。

### API 方法

```ts
import { floatingElementRegistry } from "@utils/vitepress/api/frontmatter/hero";

// 注册单个类型
floatingElementRegistry.registerType({
  type: "keyword-chip",
  renderAs: "badge",
  className: "floating-keyword-chip",
});

// 批量注册多个类型
floatingElementRegistry.registerTypes([
  { type: "author-avatar", renderAs: "image", className: "floating-avatar" },
  { type: "live-metric", component: LiveMetricWidget },
]);

// 解析类型到其定义（未知类型返回 "text" 的定义作为回退）
const def = floatingElementRegistry.resolveType("keyword-chip");
// { type: "keyword-chip", renderAs: "badge", className: "floating-keyword-chip" }

const unknown = floatingElementRegistry.resolveType("banana");
// 返回 "text" 类型定义（回退）

// 列出所有已注册的类型名称
floatingElementRegistry.listRegisteredTypes();
// ["text", "card", "image", "lottie", "badge", "icon", "stat", "code", "shape", "keyword-chip", ...]
```

### 解析流程

1. 读取 frontmatter `hero.floating.items[].type`（如 `"keyword-chip"`）。
2. `resolveType("keyword-chip")` 查找 registry → 返回其 `FloatingElementTypeDefinition`。
3. 如果类型有 `renderAs`，渲染器代理到该类型的视觉逻辑。
4. 如果类型有 `component`，则挂载自定义 Vue 组件。
5. 如果类型未知，registry 静默回退到 `"text"` 定义。

---

## 注册表详解：Shader Registry

**源文件**：`docs/.vitepress/config/shaders/index.ts`
**导入路径**：`docs/.vitepress/config/` 没有对应的别名。需从你的文件位置使用相对导入（如从 hero 目录下的组件使用 `'../../../../config/shaders'`）。

Shader registry 管理 Hero 背景的 WebGL shader 预设。每个预设定义片段着色器代码和可配置参数（颜色、速度、缩放等）。预设通过名称在 frontmatter 中引用，运行时在渲染时解析。

### 内置 Shader 预设

| 预设名称 | 说明 |
|---|---|
| `water` | 带波浪变形的水面动画。 |
| `noise` | Perlin/simplex 噪声图案，带动态演化。 |
| `galaxy` | 宇宙星场，带旋转星云效果。 |
| `plasma` | 彩色等离子波与渐变混合。 |
| `ripple` | 从中心向外的同心涟漪效果。 |
| `silk` | 丝绸/织物流动动画。 |

### API 函数

```ts
// 注意：@config 别名解析到 .vitepress/utils/config/，而非 .vitepress/config/。
// 必须从你的文件位置使用相对导入。
import {
  listShaderTemplates,
  getShaderTemplate,
  getShaderTemplateByType,
  registerShaderTemplate,
} from "../../../../config/shaders";
import type { ShaderTemplate } from "../../../../config/shaders";

// 列出所有已注册的 shader 预设名称
const names = listShaderTemplates();
// ["water", "noise", "galaxy", "plasma", "ripple", "silk"]

// 按名称获取 shader 模板
const silk = getShaderTemplate("silk");

// 按 type 字段获取 shader 模板
const waterShader = getShaderTemplateByType("water");

// 注册自定义 shader 预设
registerShaderTemplate({
  name: "aurora",
  type: "aurora",
  // ... shader 配置（片段代码、uniforms、参数）
});
```

### Frontmatter 用法

```yaml
hero:
  background:
    type: shader
    shader:
      preset: silk
```

运行时读取 `hero.background.shader.preset`，调用 `getShaderTemplate("silk")` 加载 shader 配置，然后传递给 `BackgroundLayer.vue` 中的 WebGL 渲染器。

### 扩展步骤

1. 创建新的 shader 文件（如 `docs/.vitepress/config/shaders/aurora.ts`）。
2. 复用 `docs/.vitepress/config/shaders/templates/base-shader.ts` 的工具函数处理通用 uniforms 和初始化。
3. 通过 `registerShaderTemplate(...)` 从 `docs/.vitepress/config/shaders/index.ts` 导出预设。
4. 在 frontmatter 中引用：`shader.preset: aurora`。
5. 在明暗两种主题下测试渲染 —— shader 颜色通常需要按主题调整。

> **导入路径警告**：`@config` 别名解析到 `.vitepress/utils/config/`，而**不是** `.vitepress/config/`。Shader 文件位于 `.vitepress/config/shaders/`，因此必须使用相对路径。详见[扩展架构说明](./extensionArchitecture)中的导入别名参考。

---

## Hero 扩展完成前检查

1. 新字段或新类型已经在 API 层规范化。
2. 渲染组件只消费规范化后的值。
3. 主题与尺寸逻辑复用了共享运行时。
4. 至少存在一个真实 markdown 示例。
5. `docs/src` 中已有对应文档。
6. 模板仓库 `yarn build` 通过后再同步到下游。

## 相关页面

- [扩展架构说明](./extensionArchitecture) — 框架代码的归属与分层扩展检查清单
- [开发工作流](./developmentWorkflow) — 日常开发命令与流程
- [Frontmatter 键值清单](./keyInventory) — 可用 frontmatter 键的完整列表
- [可维护性与扩展指南](./maintainability) — 所有扩展 API 的深度技术参考
