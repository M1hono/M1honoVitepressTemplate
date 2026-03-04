---
title: Hero 运行时 Frontmatter
description: 完整的 Hero frontmatter 规范，包括背景系统、波浪、媒体/图像类型和布局控制。
priority: 20
---
# Hero 运行时 Frontmatter

`hero` 是运行时完整的首页 Hero 配置。

## 顶层 Hero 键

| 键 | 类型 | 描述 |
| --- | --- | --- |
| `hero.name` | `string` | Hero 前置标题标签/徽章文本。 |
| `hero.text` | `string` | Hero 主标题。 |
| `hero.tagline` | `string` | Hero 副标题文本。 |
| `hero.actions` | `HeroAction[]` | 行动号召按钮列表。每项支持 `text`、`link`、`linkKey`、`theme`、`target`、`rel`、`style`。 |
| `hero.layout.viewport` | `boolean` | `true`：全视口高度 Hero。`false`：内容高度 Hero。 |
| `hero.typography` | `TypographyConfig` | `name/text/tagline/image` 的样式系统（`floating-tilt`、`grouped-float`、`slanted-wrap` 或 `none`）。 |
| `hero.colors` | `HeroColorConfig` | 文本颜色（`title`、`tagline`、`text`）、导航颜色（`nav*`）和搜索颜色（`search*`）。 |
| `hero.background` | `BackgroundConfig` | 单层/多层背景运行时配置。 |
| `hero.waves` | `WavesConfig` | 规范的波浪过渡系统。 |
| `hero.image` | `HeroImageConfig` | Hero 右侧媒体（`image|video|gif|model3d|lottie`），包含可选的 `background.enabled` 发光开关。 |
| `hero.floating` | `FloatingConfig` | 可选的浮动装饰元素（`text|card|image|lottie|badge|icon|stat|code|shape`），位于背景之上。 |
| `hero.snippets` | `unknown[]` | 浮动元素消费的片段数据。 |

## 排版样式规范（Typography）

`hero.typography` 用于控制标题、主文本、副标题、Hero 图像的呈现风格。

- 默认：`floating-tilt`（轻量运动排版，兼容旧配置）。
- 推荐：`grouped-float`（更大尺寸的分组浮动构图，标题/正文/副标题/图像整体联动）。
- 可选样式：`slanted-wrap`（倾斜文本风格，桌面端可围绕 Hero 图片环绕排版）。
- 可选：`none`（不应用位移/缩放变换）。
- `grouped-float` 在平板/移动端会自动降低位移与缩放强度，避免溢出并保持版式清晰。
- 所有样式类型共用同一套扩展配置：`hero.typography.motion`。
- 此系统只控制 `name/text/tagline/image` 的位移与缩放。

```yaml
hero:
  typography:
    type: grouped-float # floating-tilt | grouped-float | slanted-wrap | none
    motion:
      intensity: 1
      title:
        x: 2
        y: -2
        scale: 1.018
      text:
        x: 6
        y: 4
        scale: 1.03
      tagline:
        x: 3
        y: 7
        scale: 1.014
      image:
        x: 5
        y: -3
        scale: 1.02
      transitionDuration: 560
      transitionDelayStep: 40
      transitionEasing: "cubic-bezier(0.2, 0.9, 0.2, 1)"
```

## 背景配置规范

```yaml
hero:
  background:
    # 单层模式
    type: color # image | video | color | shader | particles | none

    # 或多层模式
    layers:
      - type: image
      - type: shader

    # 组合图层的全局控制
    opacity: 0.98
    brightness: 0.95
    contrast: 1.03
    saturation: 0.94
    filter: hue-rotate(6deg)

    # Hero 背景局部 CSS 变量
    cssVars:
      --hero-overlay-soft:
        light: "rgba(16, 28, 58, 0.22)"
        dark: "rgba(8, 14, 30, 0.52)"

    # 局部样式覆盖
    style:
      backdropFilter: saturate(1.04)
```

### 纯色背景兼容 + 导航/搜索颜色契约

```yaml
hero:
  background:
    type: color
    color:
      # 新版纯色
      solid:
        light: "rgba(55, 90, 160, 1)"
        dark: "rgba(83, 99, 129, 1)"

      # 旧版纯色别名（仍兼容）
      value: "rgba(55, 90, 160, 1)"

      # 新版渐变契约
      gradient:
        enabled: true
        type: linear
        direction: 135deg
        stops:
          - color: "rgba(99, 102, 241, 1)"
            position: 0%
          - color: "rgba(168, 85, 247, 1)"
            position: 52%
          - color: "rgba(236, 72, 153, 1)"
            position: 100%

      # 旧版渐变写法（仍兼容）
      # gradient: ["rgba(99, 102, 241, 1)", "rgba(168, 85, 247, 1)", "rgba(236, 72, 153, 1)"]
      # direction: 135

      # 带可选动画的渐变
      gradient:
        enabled: true
        type: linear
        direction: 135deg
        stops:
          - color: "rgba(99, 102, 241, 1)"
            position: 0%
          - color: "rgba(168, 85, 247, 1)"
            position: 52%
          - color: "rgba(236, 72, 153, 1)"
            position: 100%
        animation:           # 可选的渐变动画
          enabled: true
          type: flow          # flow | rotate | pulse
          duration: 4000      # 每循环毫秒数
  colors:
    # 文本颜色
    title:
      light: "rgba(255, 255, 255, 1)"
      dark: "rgba(255, 255, 255, 1)"
    text:
      light: "rgba(240, 246, 255, 1)"
      dark: "rgba(240, 246, 255, 1)"
    tagline:
      light: "rgba(220, 235, 255, 0.92)"
      dark: "rgba(220, 235, 255, 0.92)"

    # 导航栏颜色
    navText: "rgba(255, 255, 255, 1)"
    navTextHover: "rgba(255, 255, 255, 1)"
    navBackground: "rgba(27, 42, 82, 0.72)"

    # 搜索框颜色
    searchBackground: "rgba(255, 255, 255, 0.16)"
    searchHoverBackground: "rgba(255, 255, 255, 0.24)"
    searchText: "rgba(255, 255, 255, 1)"
    searchTextMuted: "rgba(255, 255, 255, 0.92)"
    searchBorder: "rgba(255, 255, 255, 0.34)"
    searchKeyBackground: "rgba(255, 255, 255, 0.14)"
    searchKeyText: "rgba(255, 255, 255, 0.92)"
```

- 文本/导航/搜索颜色统一使用规范路径：`hero.colors.*`。

| 分组 | 键 |
| --- | --- |
| `hero.colors.text*` | `title`、`text`、`tagline` |
| `hero.colors.nav*` | `navText`、`navTextScrolled`、`navTextHover`、`navTextHoverScrolled`、`navBackground`、`navBackgroundScrolled` |
| `hero.colors.search*` | `searchBackground`、`searchBackgroundScrolled`、`searchHoverBackground`、`searchHoverBackgroundScrolled`、`searchText`、`searchTextScrolled`、`searchTextMuted`、`searchTextMutedScrolled`、`searchBorder`、`searchBorderScrolled`、`searchKeyBackground`、`searchKeyBackgroundScrolled`、`searchKeyText`、`searchKeyTextScrolled` |

### 图层层级覆盖

```yaml
hero:
  background:
    layers:
      - type: image
        cssVars:
          --hero-image-scale: "1.03"
        style:
          transform: scale(var(--hero-image-scale))
      - type: color
        cssVars:
          --hero-layer-color:
            light: "rgba(112, 145, 255, 0.16)"
            dark: "rgba(112, 145, 255, 0.3)"
```

### 粒子配置规范

```yaml
hero:
  background:
    type: particles
    particles:
      enabled: true
      type: stars # stars | snow | rain | bubbles | sparks | custom
      count: 1000
      spread: 3

      appearance:
        size: 0.11
        type: circle # dot | circle | square | star | custom
        textureColorMode: mask # mask | image
        colorMode: palette # solid | random | palette | area
        randomColorChance: 0.7 # 0..1，仅 random/palette 生效
        palette:
          - "rgba(60, 98, 225, 1)"
          - "rgba(132, 102, 238, 1)"
          - "rgba(242, 122, 168, 1)"
        areaColor:
          axis: x # x | y | z | radius
          colors:
            - "rgba(60, 98, 225, 1)"
            - "rgba(132, 102, 238, 1)"
            - "rgba(242, 122, 168, 1)"
        texture: /textures/particle.png # 可选，本地/远程
        color:
          light: "rgba(60, 98, 225, 1)"
          dark: "rgba(186, 208, 255, 1)"
        opacity:
          light: 0.45
          dark: 0.72

      movement:
        speed:
          min: 0.08
          max: 0.4
        direction: [0, -1, 0]
        gravity: -0.01
        turbulence: 0.2
        tiltVariance: 0.1

      lifecycle:
        respawn: true

      area:
        type: box # box | sphere | plane
        size: [8, 4, 8]
        position: [0, 1, 0]
```

- `particles.type` 控制粒子行为预设（运动/默认物理参数）。
- `particles.appearance.type` 控制粒子视觉精灵形状。

测试页面：

- [/zh-CN/hero/matrix/backgroundSingle/particles](/zh-CN/hero/matrix/backgroundSingle/particles)
- [/zh-CN/hero/matrix/layers/level3ShaderParticles](/zh-CN/hero/matrix/layers/level3ShaderParticles)
- [/zh-CN/hero/matrix/layers/level4FullThemeSync](/zh-CN/hero/matrix/layers/level4FullThemeSync)

## 波浪配置规范（规范路径）

- 支持的路径：仅 `hero.waves`。
- 不支持的路径：`hero.background.type: waves`（会被忽略）。

```yaml
hero:
  waves:
    enabled: true
    height: 88
    opacity: 1
    animated: true
    speed: 1
    seamOverlap: 1.6
    outline:
      type: shadow
      blur: 5
    layers:
      - opacity: 0.25
        speed: 1
        direction: 1
      - opacity: 0.5
        speed: 0.86
        direction: -1
      - opacity: 1
        speed: 1.15
        direction: 1
```

## Hero 图像配置规范

```yaml
hero:
  image:
    type: model3d # image | video | gif | model3d | lottie
    background:
      enabled: false # 默认为 false；设为 true 以渲染 Hero 图像发光层

    # 可选的共享边框控制
    shape: rounded
    radius: 28px
    border: true
    borderWidth: 1
    borderColor: "rgba(255,255,255,0.35)"
    shadow: true

    model3d:
      src: /models/duck.glb
      fitPadding: 0.2
      autoRotate: true
      rotationSpeed: 0.6
```

完整示例请参考 [Hero 矩阵](/zh-CN/hero/matrix/index)。

## 浮动元素配置规范

```yaml
hero:
  snippets:
    - name: capabilities
      snippets:
        - Runtime Complete
        - Layered Backgrounds
        - Canonical Waves

  floating:
    enabled: true
    density: 10
    opacity: 0.86
    motion:
      enabled: true
      durationMin: 12
      durationMax: 24
      drift: 36
    items:
      - type: card
        title: "构建状态"
        description: "所有矩阵检查通过"
        x: "8%"
        y: "22%"
      - type: badge
        text: "企业级"
        icon: "✨"
        x: "30%"
        y: "18%"
      - type: image
        src:
          light: /logo.png
          dark: /logodark.png
        alt:
          light: "模板 Logo（亮色主题）"
          dark: "模板 Logo（暗色主题）"
        x: "82%"
        y: "62%"
        width: 120px
      - type: stat
        value: "99.95%"
        title: "可用性"
        x: "64%"
        y: "20%"
      - type: code
        code: "hero.waves.enabled: true"
        x: "24%"
        y: "66%"
      - type: shape
        shape: hexagon
        x: "76%"
        y: "40%"
      - type: text
        text: "扩展就绪的 Frontmatter"
        x: "44%"
        y: "74%"
```

### 浮动元素图解

```yaml
hero:
  floating:
    enabled: boolean
    opacity: number
    density: number
    blur: number
    gradients: ThemeValue<string>[]
    motion:
      enabled: boolean
      style: drift
      durationMin: number
      durationMax: number
      drift: number
    items:
      - type: text | card | image | lottie | badge | icon | stat | code | shape
        x: "0%~100%"
        y: "0%~100%"
        rotate: number
        opacity: number
        delay: number
        duration: number
        driftX: number
        driftY: number
        src: ThemeValue<string>
        alt: ThemeValue<string>
        text: ThemeValue<string>
        title: ThemeValue<string>
        description: ThemeValue<string>
        value: ThemeValue<string>
        icon: ThemeValue<string>
        code: ThemeValue<string>
        background: ThemeValue<string>
        borderColor: ThemeValue<string>
        borderRadius: string
        shadow: ThemeValue<string>
```

- 主题化字段：`floating.gradients` 以及每个元素的 `src`、`alt`、`text`、`title`、`description`、`value`、`icon`、`code`、`background`、`borderColor`、`shadow` 均支持 `ThemeValue<string>`。
- 不支持/忽略：`hero.floating.text`、`hero.floating.card`、`hero.floating.image`、`hero.floating.badge`、`hero.floating.icon`、`hero.floating.stat`、`hero.floating.code`、`hero.floating.shape`。
- 在 `hero.floating.items[*]` 中配置每个元素的样式。
- 对 `image` 与 `lottie` 类型，`items[].width` 会直接作用于渲染媒体宽度。

## 不支持或已移除的键

- `hero.background.type: waves`（波浪仅从 `hero.waves` 渲染）。
- `hero.waves.enabled: false`（会被忽略；波浪始终渲染）。
- `hero.floating.motion.style: legacy-a | legacy-b`（仅支持 `drift`）。
- `hero.customSnippet`（已移除；请改用 `hero.snippets` + `hero.floating.items`）。

## Hero 行动按钮样式覆盖

```yaml
hero:
  actions:
    - theme: brand
      text: "主要操作"
      link: /zh-CN/guide/index
      style:
        # 可选的自定义视觉覆盖
        backgroundColor: "rgba(15, 23, 42, 1)"
        textColor: "rgba(248, 250, 252, 1)"
        outlineWidth: "1px"
        outlineStyle: "solid"
        outlineColor: "rgba(148,163,184,.6)"
        borderRadius: "12px"
        padding: "10px 24px"
        boxShadow: "0 10px 24px rgba(15,23,42,.22)"
        fontWeight: 620
        letterSpacing: "0.01em"
        hover:
          backgroundColor: "rgba(30, 41, 59, 1)"
          textColor: "rgba(255, 255, 255, 1)"
          outlineColor: "rgba(191,219,254,.72)"
          boxShadow: "0 12px 26px rgba(15,23,42,.3)"
```
