---
layout: home
hero:
    name: "粒子背景"
    text: "运行时契约"
    tagline: "hero.background.particles 的规范键位文档，与 ParticleSystem 运行时保持一致。"
    background:
        type: particles
        particles:
            enabled: true
            type: custom
            count: 360
            spread: 3.8
            appearance:
                size: 0.11
                type: star
                textureColorMode: mask
                colorMode: area
                areaColor:
                    axis: x
                    colors:
                        - "rgba(62, 96, 210, 1)"
                        - "rgba(132, 102, 238, 1)"
                        - "rgba(242, 122, 168, 1)"
                color:
                    light: "rgba(62, 96, 210, 1)"
                    dark: "rgba(190, 216, 255, 1)"
                opacity:
                    light: 0.58
                    dark: 0.82
            movement:
                speed:
                    min: 0.05
                    max: 0.16
                direction: [0.06, -0.52, 0.04]
                gravity: -0.01
                turbulence: 0.22
                tiltVariance: 0.1
            lifecycle:
                respawn: true
            area:
                type: box
                size: [8, 4, 8]
                position: [0, 0.8, 0]
    colors:
        title:
            light: "rgba(20, 30, 52, 0.96)"
            dark: "rgba(255, 255, 255, 1)"
        text:
            light: "rgba(20, 30, 52, 0.96)"
            dark: "rgba(255, 255, 255, 1)"
        tagline:
            light: "rgba(52, 72, 108, 0.92)"
            dark: "rgba(210, 218, 235, 0.92)"
    actions:
        - theme: brand
          text: "颜色格式"
          link: /zh-CN/hero/matrix/backgroundSingle/particles/particlesColor
features:
    - title: "顶层键"
      details: "enabled、type、count、spread 与 size/color/opacity/speed 别名。"
    - title: "嵌套对象"
      details: "appearance、movement、lifecycle、area 四组契约。"
    - title: "颜色模式"
      details: "solid、random、palette、area 四种分布策略。"
title: "粒子运行时契约"
description: "hero.background.particles 的完整键位文档。"
priority: 15
---

# 粒子运行时契约

主要关注点：`ParticleSystem.vue` 实际读取的配置键和格式。

## 展示页面

- [粒子自定义纹理](./customTextures)
- [粒子完整展示](./fullShowcase)

## 规范键路径

```yaml
hero:
    background:
        type: particles
        particles: ...
```

## 顶层键（`hero.background.particles.*`）

| 键 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `true` | `false` 时关闭粒子渲染。 |
| `type` | `'stars' \| 'snow' \| 'rain' \| 'bubbles' \| 'sparks' \| 'custom'` | `stars` | 预设类型，不同类型有不同默认参数。 |
| `count` | `number` | `420` | 粒子数量，运行时会限制在 `40..deviceLimit`（约 `600-2200`）。 |
| `spread` | `number` | `3` | 分布范围，限制为 `1..12`。 |
| `size` | `number` | 随 `type` | `appearance.size` 的别名。 |
| `color` | `RgbaColor \| ThemeValue<RgbaColor>` | 随 `type` | `appearance.color` 的别名。 |
| `opacity` | `number \| ThemeValue<number>` | 随 `type` | `appearance.opacity` 的别名，限制 `0.04..1`。 |
| `speed` | `number \| { min?: number; max?: number }` | 随 `type` | `movement.speed` 的别名。 |

`RgbaColor` = `rgba(r, g, b, a)` 字符串。

## 类型域区分（重点）

| 键 | 含义 |
| --- | --- |
| `particles.type` | 粒子行为预设（stars/snow/rain/bubbles/sparks/custom）。 |
| `particles.appearance.type` | 粒子外观精灵类型（dot/circle/square/star/custom）。 |

`particles.type` 控制运动和默认物理参数。  
`appearance.type`（兼容别名 `appearance.shape`）只控制视觉形状。

## 嵌套对象契约

### `appearance`

| 键 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `appearance.size` | `number` | 随 `type` | 运行时会归一化为渲染尺寸。 |
| `appearance.type` | `'dot' \| 'circle' \| 'square' \| 'star' \| 'custom'` | 随 `type` | 粒子精灵外观类型，`dot` 会映射为 `circle`。 |
| `appearance.shape` | `'dot' \| 'circle' \| 'square' \| 'star' \| 'custom'` | 随 `type` | `appearance.type` 的兼容别名。 |
| `appearance.texture` | `string \| ThemeValue<string>` | 空 | 纹理路径或 URL。 |
| `appearance.textureColorMode` | `'mask' \| 'image'` | `'mask'` | `mask`: 纹理仅作 alpha 蒙版，颜色来自 rgba。`image`: 保留纹理原图颜色。 |
| `appearance.color` | `RgbaColor \| ThemeValue<RgbaColor>` | 随 `type` | 推荐使用该键设置颜色。 |
| `appearance.opacity` | `number \| ThemeValue<number>` | 随 `type` | 推荐使用该键设置透明度。 |
| `appearance.colorMode` | `'solid' \| 'random' \| 'palette' \| 'area'` | 自动 | 颜色分布策略。 |
| `appearance.randomColorChance` | `number` | `1` | 随机/调色板模式下每次重生触发随机色的概率（`0..1`）。 |
| `appearance.palette` | `RgbaColor[]` | `[]` | `palette` 模式颜色池。 |
| `appearance.areaColor.axis` | `'x' \| 'y' \| 'z' \| 'radius'` | `x` | `area` 模式采样轴。 |
| `appearance.areaColor.colors` | `RgbaColor[]` | `[]` | `area` 模式分布调色板。 |

### `movement`

| 键 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `movement.speed` | `number \| { min?: number; max?: number }` | 随 `type` | 单值会展开为约 `0.75x..1.25x` 区间。 |
| `movement.direction` | `[number, number, number]` | 随 `type` | 初始速度方向向量。 |
| `movement.gravity` | `number` | 随 `type` | 限制在 `-1..1`。 |
| `movement.turbulence` | `number` | 随 `type` | 限制在 `0..2`。 |
| `movement.tiltVariance` | `number` | 自动（小粒子增强） | 额外叠加正负方向的横向倾斜速度，避免小粒子轨迹单向。 |

### `lifecycle`

| 键 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `lifecycle.respawn` | `boolean` | `true` | `false` 时离开边界后反弹，不重生。 |

### `area`

| 键 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `area.type` | `'box' \| 'sphere' \| 'plane'` | 随 `type` | 生成区域形状。 |
| `area.size` | `number \| [number, number, number]` | 随 `type` | 单值会扩展为 `[n, n, n]`。 |
| `area.position` | `[number, number, number]` | 随 `type` | 生成区域中心点。 |

## 完整参考模板

```yaml
hero:
    background:
        type: particles
        particles:
            enabled: true
            type: custom
            count: 360
            spread: 3.8

            appearance:
                size: 0.11
                type: star
                textureColorMode: mask
                colorMode: palette
                randomColorChance: 0.72
                palette:
                    - "rgba(62, 96, 210, 1)"
                    - "rgba(132, 102, 238, 1)"
                    - "rgba(242, 122, 168, 1)"
                areaColor:
                    axis: x
                    colors:
                        - "rgba(62, 96, 210, 1)"
                        - "rgba(132, 102, 238, 1)"
                        - "rgba(242, 122, 168, 1)"
                texture:
                    light: "/textures/particle-light.png"
                    dark: "/textures/particle-dark.png"
                color:
                    light: "rgba(62, 96, 210, 1)"
                    dark: "rgba(190, 216, 255, 1)"
                opacity:
                    light: 0.58
                    dark: 0.82

            movement:
                speed:
                    min: 0.05
                    max: 0.16
                direction: [0.06, -0.52, 0.04]
                gravity: -0.01
                turbulence: 0.22
                tiltVariance: 0.1

            lifecycle:
                respawn: true

            area:
                type: box
                size: [8, 4, 8]
                position: [0, 0.8, 0]
```

## 预设类型示例

### `stars`

```yaml
particles:
    type: stars
    count: 280
    spread: 3.4
```

### `snow`

```yaml
particles:
    type: snow
    count: 260
    movement:
        turbulence: 0.55
```

### `rain`

```yaml
particles:
    type: rain
    count: 460
    area:
        type: plane
        size: [10, 2.5, 10]
```

### `bubbles`

```yaml
particles:
    type: bubbles
    count: 220
    movement:
        direction: [0, 1.1, 0]
```

### `sparks`

```yaml
particles:
    type: sparks
    count: 240
    movement:
        turbulence: 0.75
```

### `custom`

```yaml
particles:
    type: custom
    appearance:
        type: custom
        texture: "/textures/custom-particle.png"
```

## 需要删除的无效键

| 无效键 | 原因 |
| --- | --- |
| `particles.colorType` | 运行时不读取。 |
| `particles.colors` | 运行时不读取。 |
| `particles.theme` | 不是粒子配置契约。 |
| `particles.appearance.frameType` | 不属于粒子外观契约。 |
