---
title: Hero 全配置总览
layout: doc
description: Hero 所有 frontmatter 字段的完整 API 参考——所有域集中在一页。
priority: 20
---

# Hero 全配置总览

Hero 系统所有可配置字段，按功能域组织。除非标注**必填**，所有字段均为可选。

## 命名规范

- Hero 配置键统一使用 camelCase（驼峰命名）风格。
- 不再支持 kebab-case 旧别名。

---

## Hero 根字段 (`hero.*`)

| 字段 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| `hero.name` | `string` | — | H1 显示标题（前置标签/徽章） |
| `hero.text` | `string` | — | 副标题 / 品牌文本 |
| `hero.tagline` | `string` | — | 小型辅助说明文本 |
| `hero.layout.viewport` | `boolean` | `true` | 全视口高度 Hero；`false` 为内容高度 |
| `hero.typography.type` | `'floating-tilt'\|'grouped-float'\|'slanted-wrap'\|'none'` | `'floating-tilt'` | 排版动效风格选择器 |
| `hero.colors.*` | `ThemeValue<string>` | — | Hero/导航/搜索颜色契约 |
| `hero.actions[].text` | `string` | **必填** | 按钮文案 |
| `hero.actions[].link` | `string` | — | URL 或路径 |
| `hero.actions[].linkKey` | `string` | — | 命名路由键（详见[按钮链接键](#按钮链接键)） |
| `hero.actions[].theme` | `'brand'\|'alt'\|'outline'\|'ghost'\|'danger'\|'sponsor'` | `'brand'` | 按钮样式预设 |
| `hero.actions[].target` | `string` | `'_self'` | HTML target 属性 |
| `hero.actions[].rel` | `string` | `''` | HTML rel 属性 |
| `hero.actions[].style` | `object` | — | 视觉覆盖（详见[按钮样式覆盖](#按钮样式覆盖)） |
| `hero.snippets` | `unknown[]` | — | 浮动元素消费的片段数据 |
| `cssVars.[--name]` | `ThemeValue<string>` | — | 页面级 CSS 变量 |

### 按钮链接键

`hero.actions[].linkKey` 通过命名键路由到特定页面，无需硬编码路径：

| 键 | 目标 |
| --- | --- |
| `home` | 站点首页 |
| `heroMatrix` | Hero 矩阵索引 |
| `heroAllConfig` | Hero 全配置参考 |
| `frontmatterApi` | Frontmatter API 参考 |
| `stylesPlugins` | 样式与插件页面 |
| `allPages` | 所有页面索引 |
| `backgroundModes` | 背景模式页面 |
| `wavesMatrix` | 波浪矩阵页面 |
| `floatingElements` | 浮动元素页面 |
| `imageTypes` | 图像类型页面 |

---

## Hero 排版样式 (`hero.typography.*`)

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `hero.typography.type` | `'floating-tilt'\|'grouped-float'\|'slanted-wrap'\|'none'` | `'floating-tilt'` | 样式行为选择器 |
| `hero.typography.motion.intensity` | `number` | `1` | 主运动强度（0–2） |
| `hero.typography.motion.title.x` | `number` | 类型默认值 | 标题 X 轴偏移量（px） |
| `hero.typography.motion.title.y` | `number` | 类型默认值 | 标题 Y 轴偏移量（px） |
| `hero.typography.motion.title.scale` | `number` | 类型默认值 | 标题缩放系数 |
| `hero.typography.motion.text.x` | `number` | 类型默认值 | 正文 X 轴偏移量（px） |
| `hero.typography.motion.text.y` | `number` | 类型默认值 | 正文 Y 轴偏移量（px） |
| `hero.typography.motion.text.scale` | `number` | 类型默认值 | 正文缩放系数 |
| `hero.typography.motion.tagline.x` | `number` | 类型默认值 | 副标题 X 轴偏移量（px） |
| `hero.typography.motion.tagline.y` | `number` | 类型默认值 | 副标题 Y 轴偏移量（px） |
| `hero.typography.motion.tagline.scale` | `number` | 类型默认值 | 副标题缩放系数 |
| `hero.typography.motion.image.x` | `number` | 类型默认值 | 图像 X 轴偏移量（px） |
| `hero.typography.motion.image.y` | `number` | 类型默认值 | 图像 Y 轴偏移量（px） |
| `hero.typography.motion.image.scale` | `number` | 类型默认值 | 图像缩放系数 |
| `hero.typography.motion.transitionDuration` | `number` | `560` | 过渡动效时长（ms） |
| `hero.typography.motion.transitionDelayStep` | `number` | `40` | 元素间交错延迟（ms） |
| `hero.typography.motion.transitionEasing` | `string` | `cubic-bezier(0.2, 0.9, 0.2, 1)` | CSS 缓动函数 |

**风格类型行为：**
- `floating-tilt` — 轻量运动浮动布局（默认，兼容旧配置）
- `grouped-float` — 更大尺寸的分组浮动构图，平板/移动端自动降低强度
- `slanted-wrap` — 倾斜文本风格，桌面端支持文字环绕 Hero 图像
- `none` — 不应用任何位移/缩放变换

### 示例

```yaml
hero:
  typography:
    type: grouped-float
    motion:
      intensity: 0.96
      title: { x: 2, y: -2, scale: 1.018 }
      text: { x: 6, y: 4, scale: 1.03 }
      tagline: { x: 3, y: 7, scale: 1.014 }
      image: { x: 5, y: -3, scale: 1.02 }
      transitionDuration: 560
      transitionDelayStep: 40
      transitionEasing: "cubic-bezier(0.2, 0.9, 0.2, 1)"
```

---

## Hero 文本排版 CSS 变量 (`cssVars.*`)

通过 `cssVars` 控制 Hero 文本布局和字体，所有变量使用标准 CSS 值。

### `hero.name` (标题)

| CSS 变量 | 默认值 | 说明 |
| -------- | ------ | ---- |
| `--hero-name-font` | `inherit` | 标题字体族 |
| `--hero-name-weight` | `760` | 字重 |
| `--hero-name-letter-spacing` | `-0.03em` | 字间距 |
| `--hero-name-line-height` | `1.05` | 行高 |
| `--hero-name-align` | `inherit` | 文本对齐：`left`、`center`、`right` |
| `--hero-name-max-width` | `680px` | 标题元素最大宽度 |
| `--hero-name-accent-color` | `transparent` | 下划线强调色（渐变或纯色） |
| `--hero-name-accent-height` | `4px` | 下划线强调条高度 |

### `hero.text` (副标题)

| CSS 变量 | 默认值 | 说明 |
| -------- | ------ | ---- |
| `--hero-text-font` | `inherit` | 字体族 |
| `--hero-text-weight` | `700` | 字重 |
| `--hero-text-letter-spacing` | `-0.03em` | 字间距 |
| `--hero-text-line-height` | `1.08` | 行高 |
| `--hero-text-align` | `inherit` | 文本对齐 |
| `--hero-text-color` | `var(--vp-c-text-1)` | 颜色覆盖 |
| `--hero-text-max-width` | `680px` | 最大宽度 |

### `hero.tagline` (副文本)

| CSS 变量 | 默认值 | 说明 |
| -------- | ------ | ---- |
| `--hero-tagline-font` | `inherit` | 字体族 |
| `--hero-tagline-weight` | `520` | 字重 |
| `--hero-tagline-letter-spacing` | `0` | 字间距 |
| `--hero-tagline-line-height` | `1.55` | 行高 |
| `--hero-tagline-align` | `inherit` | 文本对齐 |
| `--hero-tagline-color` | `var(--vp-c-text-2)` | 颜色覆盖 |
| `--hero-tagline-max-width` | `640px` | 最大宽度 |
| `--hero-tagline-padding-top` | `14px` | 顶部间距 |

### 布局形状

| CSS 变量 | 默认值 | 说明 |
| -------- | ------ | ---- |
| `--hero-content-align` | `inherit` | 对齐整个 Hero 内容块（`left`、`center`） |
| `--hero-heading-gap` | `0.08em` | name 与 text 之间的间距 |
| `--hero-heading-bar-color` | `var(--vp-c-brand-1)` | 左侧强调条颜色（需在 heading 上设置 `data-shape="bar"`） |

---

## 背景配置 (`hero.background.*`)

> `type` 与 `layers[]` 互斥。`type: 'waves'` 不受支持——请使用 `hero.waves`。

### 全局控制

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `background.type` | `'image'\|'video'\|'color'\|'shader'\|'particles'\|'none'` | `'none'` | 单背景类型 |
| `background.opacity` | `number` | `1` | 全局背景不透明度 |
| `background.brightness` | `number` | `1` | 亮度系数 |
| `background.contrast` | `number` | `1` | 对比度系数 |
| `background.saturation` | `number` | `1` | 饱和度系数 |
| `background.filter` | `string` | — | 附加 CSS 滤镜字符串（如 `hue-rotate(6deg)`） |
| `background.cssVars` | `Record<string, ThemeValue<string>>` | — | 背景根 CSS 变量 |
| `background.style` | `Record<string, unknown>` | — | 内联样式覆盖 |


### 图片背景 (`hero.background.image.*`)

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `background.image.src` | `string` | — | 图片 URL（两个主题通用） |
| `background.image.light` | `string` | — | 浅色主题图片 URL |
| `background.image.dark` | `string` | — | 深色主题图片 URL |
| `background.image.alt` | `string` | `''` | 替代文本 |

### 视频背景 (`hero.background.video.*`)

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `background.video.src` | `string` | — | 视频 URL |
| `background.video.light` | `string` | — | 浅色主题视频 URL |
| `background.video.dark` | `string` | — | 深色主题视频 URL |
| `background.video.autoplay` | `boolean` | `true` | 自动播放 |
| `background.video.loop` | `boolean` | `true` | 循环播放 |
| `background.video.muted` | `boolean` | `true` | 静音 |
| `background.video.controls` | `boolean` | `false` | 显示播放控件 |
| `background.video.poster` | `string` | — | 播放前显示的封面图 URL |
| `background.video.fit` | `'contain'\|'cover'\|'fill'\|'none'\|'scale-down'` | `'cover'` | object-fit 行为 |
| `background.video.position` | `string` | `'center'` | CSS object-position |

### 着色器背景 (`hero.background.shader.*`)

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `background.shader.type` | `'water'\|'noise'\|'galaxy'\|'plasma'\|'ripple'\|'silk'` | — | 内置着色器预设名 |
| `background.shader.template` | `string` | — | 自定义模板名（覆盖预设） |
| `background.shader.speed` | `number` | `1` | 动画速度系数 |
| `background.shader.uniforms.[name].type` | `'float'\|'int'\|'vec2'\|'vec3'\|'color'\|'sampler2D'` | — | Uniform GLSL 类型 |
| `background.shader.uniforms.[name].value` | `ThemeValue<number\|string\|number[]>` | — | Uniform 值（支持 light/dark 主题变体） |
| `background.shader.custom.vertex` | `string` | — | 自定义 GLSL 顶点着色器 |
| `background.shader.custom.fragment` | `string` | — | 自定义 GLSL 片段着色器 |

**内置着色器预设：** `water`（水面）、`noise`（噪声）、`galaxy`（星河）、`plasma`（等离子）、`ripple`（涟漪）、`silk`（丝绸流动）

### 粒子背景 (`hero.background.particles.*`)

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `background.particles.enabled` | `boolean` | `true` | 启用粒子系统 |
| `background.particles.type` | `'stars'\|'snow'\|'rain'\|'bubbles'\|'sparks'\|'custom'` | `'stars'` | 行为预设 |
| `background.particles.count` | `number` | `1000` | 粒子数量 |
| `background.particles.spread` | `number` | `3` | 体积分布系数 |
| `background.particles.appearance.size` | `number` | `0.11` | 粒子大小（世界单位） |
| `background.particles.appearance.type` | `'dot'\|'circle'\|'square'\|'star'\|'custom'` | `'circle'` | 精灵形状 |
| `background.particles.appearance.colorMode` | `'solid'\|'random'\|'palette'\|'area'` | `'solid'` | 颜色分布模式 |
| `background.particles.appearance.color` | `ThemeValue<string>` | — | 基础粒子颜色 |
| `background.particles.appearance.opacity` | `ThemeValue<number>` | — | 每主题粒子不透明度 |
| `background.particles.appearance.palette` | `string[]` | — | 调色板（用于 `palette`/`random` 模式） |
| `background.particles.appearance.randomColorChance` | `number` | `0.7` | 从调色板选色的概率（0–1） |
| `background.particles.appearance.areaColor.axis` | `'x'\|'y'\|'z'\|'radius'` | `'y'` | 区域映射轴 |
| `background.particles.appearance.areaColor.colors` | `string[]` | — | 沿轴映射的颜色列表 |
| `background.particles.appearance.texture` | `string` | — | 自定义精灵纹理 URL |
| `background.particles.appearance.textureColorMode` | `'mask'\|'image'` | `'mask'` | `mask` 用粒子色着色纹理；`image` 使用原始纹理 |
| `background.particles.movement.speed.min` | `number` | `0.08` | 最小速度 |
| `background.particles.movement.speed.max` | `number` | `0.4` | 最大速度 |
| `background.particles.movement.direction` | `[number, number, number]` | `[0,-1,0]` | 基础运动方向向量 |
| `background.particles.movement.gravity` | `number` | `-0.01` | 重力强度 |
| `background.particles.movement.turbulence` | `number` | `0.2` | 随机湍流强度 |
| `background.particles.movement.tiltVariance` | `number` | `0.1` | 方向倾斜随机性 |
| `background.particles.lifecycle.respawn` | `boolean` | `true` | 越界后重新生成 |
| `background.particles.area.type` | `'box'\|'sphere'\|'plane'` | `'box'` | 生成区域形状 |
| `background.particles.area.size` | `number\|[number,number,number]` | — | 生成区域尺寸 |
| `background.particles.area.position` | `[number,number,number]` | `[0,0,0]` | 生成区域中心位置 |

### 颜色背景契约 (`hero.background.color.*`)

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `background.color.solid` | `ThemeValue<string>` | 新版纯色（支持 `{ light, dark }`） |
| `background.color.value` | `ThemeValue<string>` | 旧版别名，仍兼容 |
| `background.color.gradient.enabled` | `boolean` | 启用渐变 |
| `background.color.gradient.type` | `'linear'\|'radial'\|'conic'` | 渐变类型 |
| `background.color.gradient.direction` | `string\|number` | 角度；数字在运行时被标准化为 `deg` |
| `background.color.gradient.center` | `string` | 径向/圆锥渐变中心点 |
| `background.color.gradient.shape` | `string` | 径向形状（`circle`、`ellipse`） |
| `background.color.gradient.size` | `string` | 径向大小（`closest-side`、`farthest-corner` 等） |
| `background.color.gradient.stops[].color` | `ThemeValue<string>` | 渐变色阶颜色（支持 light/dark） |
| `background.color.gradient.stops[].position` | `string` | 色阶位置，如 `52%` |
| `background.color.gradient.colors` | `ThemeValue<string>[]` | 旧版 stops 别名 |
| `background.color.gradient` | `ThemeValue<string>[]` | 旧版数组简写 |
| `background.color.direction` | `string\|number` | 旧版数组形式的方向 |
| `background.color.gradient.animation.enabled` | `boolean` | 启用渐变动画 |
| `background.color.gradient.animation.type` | `'flow'\|'rotate'\|'pulse'` | 动画样式 |
| `background.color.gradient.animation.duration` | `number` | 动画循环时长（ms） |

---

## 背景图层 (`hero.background.layers[]`)

> 每个图层支持与单背景模式相同的类型专属键。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `layers[].type` | `'image'\|'video'\|'color'\|'shader'\|'particles'\|'none'` | **必填** | 图层类型 |
| `layers[].zIndex` | `number` | 自动（索引序） | 层叠顺序 |
| `layers[].opacity` | `number` | `1` | 图层不透明度 |
| `layers[].blend` | `string` | `'normal'` | CSS mix-blend-mode |
| `layers[].cssVars` | `Record<string, ThemeValue<string>>` | — | 图层级 CSS 变量 |
| `layers[].style` | `Record<string, unknown>` | — | 图层内联样式覆盖 |
| `layers[].image` | `object` | — | 图片配置（与 `background.image.*` 相同） |
| `layers[].video` | `object` | — | 视频配置（与 `background.video.*` 相同） |
| `layers[].color` | `object` | — | 颜色配置（与 `background.color.*` 相同） |
| `layers[].shader` | `object` | — | 着色器配置（与 `background.shader.*` 相同） |
| `layers[].particles` | `object` | — | 粒子配置（与 `background.particles.*` 相同） |

---

## Hero 颜色 (`hero.colors.*`)

### 文本颜色

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `hero.colors.title` | `ThemeValue<string>` | Hero `name`（H1）颜色 |
| `hero.colors.text` | `ThemeValue<string>` | Hero `text`（副标题）颜色 |
| `hero.colors.tagline` | `ThemeValue<string>` | Hero `tagline` 颜色 |

### 导航栏颜色

| 字段 | 说明 |
| --- | --- |
| `hero.colors.navText` | 导航链接文字（页面顶部） |
| `hero.colors.navTextScrolled` | 滚动后导航链接文字 |
| `hero.colors.navTextHover` | 导航链接悬停颜色 |
| `hero.colors.navTextHoverScrolled` | 滚动后导航悬停颜色 |
| `hero.colors.navBackground` | 导航栏背景 |
| `hero.colors.navBackgroundScrolled` | 滚动后导航栏背景 |

### 搜索框颜色

| 字段 | 说明 |
| --- | --- |
| `hero.colors.searchBackground` | 搜索按钮背景 |
| `hero.colors.searchBackgroundScrolled` | 滚动后搜索按钮背景 |
| `hero.colors.searchHoverBackground` | 搜索悬停背景 |
| `hero.colors.searchHoverBackgroundScrolled` | 滚动后搜索悬停背景 |
| `hero.colors.searchText` | 搜索文字/图标 |
| `hero.colors.searchTextScrolled` | 滚动后搜索文字/图标 |
| `hero.colors.searchTextMuted` | 搜索占位符文字 |
| `hero.colors.searchTextMutedScrolled` | 滚动后搜索占位符 |
| `hero.colors.searchBorder` | 搜索边框 |
| `hero.colors.searchBorderScrolled` | 滚动后搜索边框 |
| `hero.colors.searchKeyBackground` | 快捷键标签背景 |
| `hero.colors.searchKeyBackgroundScrolled` | 滚动后快捷键标签背景 |
| `hero.colors.searchKeyText` | 快捷键标签文字 |
| `hero.colors.searchKeyTextScrolled` | 滚动后快捷键标签文字 |

所有颜色值均支持 `ThemeValue<string>`——使用 `{ light: "...", dark: "..." }` 区分主题，或使用纯字符串适用于两个主题。

---

## 波浪 (`hero.waves.*`)

> 波浪在 Hero 页面始终渲染。`waves.enabled: false` 会被运行时忽略。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `waves.enabled` | `boolean` | `true` | 运行时忽略；波浪始终渲染 |
| `waves.animated` | `boolean` | `true` | 启用波浪动画 |
| `waves.height` | `number` | `80` px | 波浪元素高度 |
| `waves.opacity` | `number` | `1` | 整体不透明度 |
| `waves.speed` | `number` | `1` | 动画速度（限制 0.1–3） |
| `waves.color` | `string` | `var(--vp-c-bg)` | 波浪填充颜色 |
| `waves.reversed` | `boolean` | `false` | 翻转波浪方向 |
| `waves.outline` | `boolean\|object` | `true` | 启用/配置轮廓阴影 |
| `waves.outline.type` | `string` | `'shadow'` | 轮廓类型 |
| `waves.outline.blur` | `number` | `5` | 轮廓模糊半径 |
| `waves.zIndex` | `number` | `1` | 波浪元素 z-index |
| `waves.seamOverlap` | `number` | `1.6` | 避免渲染接缝的重叠系数 |
| `waves.layers[].opacity` | `number` | 0.25/0.5/1.0 | 每图层不透明度 |
| `waves.layers[].speed` | `number` | 0.6/0.8/1.0 | 每图层速度系数 |
| `waves.layers[].direction` | `number` | `1` | 运动方向（`1` 或 `-1`） |
| `waves.layers[].amplitude` | `number` | 12/16/20 | 波浪振幅 |
| `waves.layers[].frequency` | `number` | 0.01/0.007/0.005 | 波浪频率 |
| `waves.layers[].color` | `string` | 继承 | 每图层颜色覆盖 |

---

## Hero 图像 (`hero.image.*`)

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `image.type` | `'image'\|'video'\|'gif'\|'model3d'\|'lottie'` | **必填** | 媒体类型选择器 |
| `image.background.enabled` | `boolean` | `false` | 启用图像后方的发光/背景层 |
| `image.width` | `number\|string` | — | 图像元素宽度 |
| `image.height` | `number\|string` | — | 图像元素高度 |
| `image.fit` | `'contain'\|'cover'\|'fill'\|'none'\|'scale-down'` | `'contain'` | object-fit 行为 |
| `image.position` | `string` | `'center'` | CSS object-position |

### 图片类型 (`image.image.*`)

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `image.image.src` | `string` | — | 图片 URL（两个主题通用） |
| `image.image.light` | `string` | — | 浅色主题 URL |
| `image.image.dark` | `string` | — | 深色主题 URL |
| `image.image.alt` | `string` | `''` | 替代文本 |

### 视频类型 (`image.video.*`)

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `image.video.src` | `string` | — | 视频 URL |
| `image.video.light` | `string` | — | 浅色主题视频 URL |
| `image.video.dark` | `string` | — | 深色主题视频 URL |
| `image.video.autoplay` | `boolean` | `true` | 自动播放 |
| `image.video.loop` | `boolean` | `true` | 循环播放 |
| `image.video.muted` | `boolean` | `true` | 静音 |
| `image.video.controls` | `boolean` | `false` | 显示播放控件 |
| `image.video.poster` | `string` | — | 播放前封面图 |
| `image.video.fit` | `'contain'\|'cover'\|'fill'\|'none'\|'scale-down'` | `'contain'` | object-fit |
| `image.video.position` | `string` | `'center'` | CSS object-position |

### GIF 类型 (`image.gif.*`)

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `image.gif.src` | `string` | — | GIF URL |
| `image.gif.alt` | `string` | `''` | 替代文本 |
| `image.gif.loop` | `boolean` | `true` | 循环动画 |
| `image.gif.autoplay` | `boolean` | `true` | 自动播放 |
| `image.gif.fit` | `'contain'\|'cover'\|'fill'\|'none'\|'scale-down'` | `'contain'` | object-fit |
| `image.gif.position` | `string` | `'center'` | CSS object-position |

### 3D 模型类型 (`image.model3d.*`)

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `image.model3d.src` | `string` | **必填** | GLB/GLTF 文件路径 |
| `image.model3d.fitPadding` | `number` | 自动 | 相机适配填充系数 |
| `image.model3d.scale` | `[number,number,number]` | `[1,1,1]` | 模型缩放 `[x,y,z]` |
| `image.model3d.position` | `[number,number,number]` | `[0,0,0]` | 模型位置偏移 |
| `image.model3d.rotation` | `[number,number,number]` | `[0,0,0]` | 初始旋转（弧度） |
| `image.model3d.animation.enabled` | `boolean` | `false` | 启用内置动画 |
| `image.model3d.animation.type` | `'rotate'\|'bounce'\|'float'` | `'rotate'` | 动画行为 |
| `image.model3d.animation.speed` | `number` | `1` | 动画速度 |
| `image.model3d.animation.axis` | `[number,number,number]` | `[0,1,0]` | `rotate` 类型的旋转轴 |
| `image.model3d.animation.amplitude` | `number` | — | `bounce`/`float` 的运动范围 |
| `image.model3d.animation.frequency` | `number` | — | `bounce`/`float` 的振荡频率 |
| `image.model3d.interaction.enabled` | `boolean` | `false` | 启用用户交互 |
| `image.model3d.interaction.rotate` | `boolean` | `false` | 允许拖拽旋转 |
| `image.model3d.interaction.autoRotate` | `boolean` | `false` | 无交互时自动旋转 |
| `image.model3d.interaction.autoRotateSpeed` | `number` | `1` | 自动旋转速度 |
| `image.model3d.camera.fov` | `number` | `45` | 相机视角（度） |
| `image.model3d.camera.near` | `number` | `0.1` | 近裁剪面 |
| `image.model3d.camera.far` | `number` | `100` | 远裁剪面 |
| `image.model3d.camera.position` | `[number,number,number]` | 自动 | 相机位置 |
| `image.model3d.lighting.ambient.intensity` | `number` | `1` | 环境光强度 |
| `image.model3d.lighting.ambient.color` | `string` | `'#ffffff'` | 环境光颜色 |
| `image.model3d.lighting.directional.intensity` | `number` | `1` | 平行光强度 |
| `image.model3d.lighting.directional.color` | `string` | `'#ffffff'` | 平行光颜色 |
| `image.model3d.lighting.directional.position` | `[number,number,number]` | `[1,2,3]` | 平行光位置 |
| `image.model3d.lighting.point.enabled` | `boolean` | `false` | 启用点光源 |
| `image.model3d.lighting.point.intensity` | `number` | `1` | 点光源强度 |
| `image.model3d.lighting.point.color` | `string` | `'#ffffff'` | 点光源颜色 |
| `image.model3d.lighting.point.position` | `[number,number,number]` | `[0,2,2]` | 点光源位置 |

### Lottie 类型 (`image.lottie.*`)

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `image.lottie.src` | `string` | — | Lottie JSON URL（两个主题通用） |
| `image.lottie.light` | `string` | — | 浅色主题 Lottie URL |
| `image.lottie.dark` | `string` | — | 深色主题 Lottie URL |
| `image.lottie.loop` | `boolean` | `true` | 循环播放 |
| `image.lottie.autoplay` | `boolean` | `true` | 自动播放 |
| `image.lottie.speed` | `number` | `1` | 播放速度 |
| `image.lottie.renderer` | `'svg'\|'canvas'` | `'svg'` | 渲染后端 |
| `image.lottie.fit` | `'contain'\|'cover'\|'fill'\|'none'\|'scale-down'` | `'contain'` | object-fit |
| `image.lottie.position` | `string` | `'center'` | CSS object-position |
| `image.lottie.background` | `string` | `'transparent'` | 画布背景色 |

### 图像边框 (`image.frame.*`)

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `image.frame.shape` | `'rounded'\|'circle'\|'squircle'\|'diamond'\|'custom'\|'none'` | `'none'` | 边框形状预设 |
| `image.frame.width` | `string\|number` | — | 边框宽度 |
| `image.frame.height` | `string\|number` | — | 边框高度 |
| `image.frame.maxWidth` | `string\|number` | — | 最大宽度 |
| `image.frame.maxHeight` | `string\|number` | — | 最大高度 |
| `image.frame.padding` | `string\|number` | — | 内边距 |
| `image.frame.radius` | `string\|number` | — | 圆角（覆盖形状预设） |
| `image.frame.border` | `string\|boolean` | — | 边框简写（如 `"1px solid rgba(255,255,255,0.3)"`）或 `true` 使用默认 |
| `image.frame.borderWidth` | `string\|number` | — | 边框宽度 |
| `image.frame.borderColor` | `string` | — | 边框颜色 |
| `image.frame.background` | `ThemeValue<string>` | — | 边框背景（支持 light/dark） |
| `image.frame.shadow` | `ThemeValue<string>` | — | 阴影（支持 light/dark） |
| `image.frame.aspectRatio` | `string\|number` | — | 宽高比（如 `"16/9"` 或 `1.78`） |
| `image.frame.clipPath` | `string` | — | 自定义 CSS clip-path（用于 `shape: custom`） |
| `image.frame.overflow` | `string` | `'hidden'` | CSS overflow |

---

## 浮动元素 (`hero.floating.*`)

### 全局配置

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `floating.enabled` | `boolean` | `true` | 显示浮动元素 |
| `floating.opacity` | `number` | `1` | 整体不透明度 |
| `floating.density` | `number` | `1` | 可见元素数量 |
| `floating.blur` | `number` | `0` | 背景模糊（px） |
| `floating.gradients` | `ThemeValue<string>[]` | — | 支持主题切换的渐变字符串列表 |
| `floating.motion.enabled` | `boolean` | `true` | 启用浮动运动 |
| `floating.motion.style` | `'drift'` | `'drift'` | 运动样式（仅支持 `drift`） |
| `floating.motion.durationMin` | `number` | `15` s | 最小动画周期时长 |
| `floating.motion.durationMax` | `number` | `28` s | 最大动画周期时长 |
| `floating.motion.drift` | `number` | `20` px | 漂移幅度 |

### 每元素字段（所有类型通用）

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items[].type` | `'text'\|'card'\|'image'\|'lottie'\|'badge'\|'icon'\|'stat'\|'code'\|'shape'` | `'text'` | 元素类型 |
| `items[].x` | `string` | 随机 | 水平位置（如 `"25%"`） |
| `items[].y` | `string` | 随机 | 垂直位置（如 `"40%"`） |
| `items[].opacity` | `number` | `1` | 元素不透明度 |
| `items[].rotate` | `number` | `0` 度 | 初始旋转角 |
| `items[].delay` | `number` | `0` ms | 动画启动延迟 |
| `items[].duration` | `number` | 随机 | 动画周期时长 |
| `items[].driftX` | `number` | `motion.drift` | X 轴漂移幅度覆盖 |
| `items[].driftY` | `number` | `motion.drift` | Y 轴漂移幅度覆盖 |
| `items[].motionStyle` | `'drift'` | `motion.style` | 单元素运动样式覆盖 |
| `items[].colorType` | `'solid'\|'gradient'\|'random-gradient'` | `'solid'` | 背景颜色生成模式 |
| `items[].src` | `ThemeValue<string>` | 类型默认值 | 图片/Lottie 资源地址，支持明暗主题切换 |
| `items[].alt` | `ThemeValue<string>` | 类型默认值 | 图片/Lottie 说明文本，支持明暗主题切换 |
| `items[].text/title/description/value/icon/code` | `ThemeValue<string>` | 类型默认值 | 支持主题切换的内容字段 |
| `items[].background` | `ThemeValue<string>` | 类型默认值 | 背景颜色/渐变 |
| `items[].borderColor` | `ThemeValue<string>` | 类型默认值 | 边框颜色 |
| `items[].borderRadius` | `string` | 类型默认值 | 圆角 |
| `items[].shadow` | `ThemeValue<string>` | 类型默认值 | 阴影 |

### 各类型专属字段

| 类型 | 专属字段 |
| ---- | -------- |
| `text` | `text`（**必填**，支持 `ThemeValue<string>`）、`color`、`size`、`weight`、`letterSpacing`、`textShadow` |
| `card` | `title` 或 `description`（**必填**，支持 `ThemeValue<string>`）、`titleColor`、`descriptionColor` |
| `image` | `src`（**必填**，支持 `ThemeValue<string>`）、`alt`（`ThemeValue<string>`）、`width`、`fit` |
| `lottie` | `src`（**必填**，支持 `ThemeValue<string>`）、`alt`（`ThemeValue<string>`）、`width`、`fit`、`loop`、`autoplay`、`speed` |
| `badge` | `text` 或 `icon`（**必填**，支持 `ThemeValue<string>`）、`color` |
| `icon` | `icon`（**必填**，支持 `ThemeValue<string>`）、`color`、`size` |
| `stat` | `value`（**必填**，支持 `ThemeValue<string>`）、`text`（**必填**，支持 `ThemeValue<string>`）、`color` |
| `code` | `code`（**必填**，支持 `ThemeValue<string>`）、`color`、`size` |
| `shape` | `shape`（**必填**：`circle`、`square`、`diamond`、`hexagon`）、`size` |

---

## 按钮样式覆盖 (`hero.actions[].style.*`)

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `style.backgroundColor` | `string` | 按钮背景色 |
| `style.textColor` | `string` | 按钮文字颜色 |
| `style.outlineWidth` | `string` | 轮廓宽度 |
| `style.outlineStyle` | `string` | 轮廓样式（`solid`、`dashed` 等） |
| `style.outlineColor` | `string` | 轮廓颜色 |
| `style.borderRadius` | `string` | 圆角 |
| `style.padding` | `string` | 内边距 |
| `style.boxShadow` | `string` | 阴影 |
| `style.fontWeight` | `string\|number` | 字重 |
| `style.letterSpacing` | `string` | 字间距 |
| `style.hover.enabled` | `boolean` | 启用悬停状态覆盖 |
| `style.hover.backgroundColor` | `string` | 悬停背景 |
| `style.hover.textColor` | `string` | 悬停文字颜色 |
| `style.hover.outlineColor` | `string` | 悬停轮廓颜色 |
| `style.hover.boxShadow` | `string` | 悬停阴影 |
| `style.hover.tilt3D.enabled` | `boolean` | 悬停时启用 3D 倾斜 |
| `style.hover.tilt3D.intensity` | `number` | 倾斜强度 |
| `style.hover.tilt3D.perspective` | `string` | CSS perspective 值 |

---

## 嵌套展示地图

- [矩阵首页](./matrix/)
- [基础示例](./matrix/basic/)
- [单背景](./matrix/backgroundSingle/)
- [颜色背景](./matrix/backgroundSingle/color/)
- [渐变颜色](./matrix/backgroundSingle/color/gradientColors)
- [主题同步颜色](./matrix/backgroundSingle/color/themeSyncColors)
- [图片背景](./matrix/backgroundSingle/image/)
- [视频背景](./matrix/backgroundSingle/video/)
- [着色器背景](./matrix/backgroundSingle/shader/)
- [粒子背景](./matrix/backgroundSingle/particles/)
- [层叠背景](./matrix/layers/)
- [波浪](./matrix/waves/)
- [图像类型](./matrix/imageTypes/)
- [浮动元素](./matrix/floating/)
- [按钮与特性](./matrix/buttonsFeatures/)
- [配置覆盖映射](./matrix/configCoverage)
