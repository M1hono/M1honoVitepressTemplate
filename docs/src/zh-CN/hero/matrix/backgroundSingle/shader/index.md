---
layout: home
hero:
  name: "单一背景"
  text: "着色器"
  tagline: "TresJS 着色器预设，支持主题感知 uniform 与对比度控制。"
  background:
    type: shader
    shader:
      type: water
      uniforms:
        u_intensity:
          light: 0.62
          dark: 0.48
  actions:
    - theme: brand
      text: "粒子案例"
      link: /zh-CN/hero/matrix/backgroundSingle/particles
features:
  - title: "TresJS 运行时"
    details: "着色器渲染仅在客户端执行，确保 SSR 安全。"
title: "单一着色器背景"
description: "单一着色器背景 的英雄矩阵配置展示与实践说明。"
priority: 40
---
# 单一着色器背景

主要关注点：`hero.background.shader` 预设与 uniform 配置。

## 页面

- [基础着色器](./) - 着色器预设配置
- [着色器预设](./shaderPresets) - 内置 GLSL 着色器动画
- [自定义着色器](./customShader) - 编写自定义 GLSL 片段着色器

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "单一背景"
  text: "着色器"
  tagline: "TresJS 着色器预设，支持主题感知 uniform 与对比度控制。"
  background:
    type: shader
    shader:
      type: water
      uniforms:
        u_intensity:
          light: 0.62
          dark: 0.48
  actions:
    - theme: brand
      text: "粒子案例"
      link: /zh-CN/hero/matrix/backgroundSingle/particles
features:
  - title: "TresJS 运行时"
    details: "着色器渲染仅在客户端执行，确保 SSR 安全。"
---
```

## 基础配置

着色器背景使用 TresJS（Three.js 的 Vue 封装）渲染 GLSL 着色器效果。

## 配置选项

### 着色器配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `string` | `water` | 预设着色器类型 |
| `template` | `string` | - | 着色器模板名称 |
| `speed` | `number` | `1` | 动画速度倍率 |
| `uniforms` | `object` | - | 自定义 uniform 值 |
| `custom.vertex` | `string` | - | 自定义顶点着色器 |
| `custom.fragment` | `string` | - | 自定义片段着色器 |

---

## 内置预设

| 预设名称 | 说明 |
|----------|------|
| `water` | 水波纹效果 |
| `galaxy` | 星系效果 |
| `plasma` | 等离子效果 |
| `noise` | 噪点效果 |
| `ripple` | 涟漪效果 |
| `silk` | 丝绸流动效果 |

---

## 完整 Frontmatter

```yaml
---
layout: home
hero:
  name: "单一背景"
  text: "着色器"
  tagline: "TresJS 着色器预设，支持主题感知 uniform 与对比度控制。"
  background:
    type: shader
    shader:
      type: water
      uniforms:
        u_intensity:
          light: 0.62
          dark: 0.48
  actions:
    - theme: brand
      text: "粒子案例"
      link: /zh-CN/hero/matrix/backgroundSingle/particles
features:
  - title: "TresJS 运行时"
    details: "着色器渲染仅在客户端执行，确保 SSR 安全。"
---
```

---

## 预设示例

### 水波效果

```yaml
hero:
  background:
    type: shader
    shader:
      type: water
      uniforms:
        u_intensity: 0.5
```

### 星系效果

```yaml
hero:
  background:
    type: shader
    shader:
      type: galaxy
      speed: 0.8
      uniforms:
        u_star_density:
          light: 0.4
          dark: 0.8
```

### 等离子效果

```yaml
hero:
  background:
    type: shader
    shader:
      type: plasma
      speed: 1.2
      uniforms:
        u_complexity: 4.0
```

### 噪点效果

```yaml
hero:
  background:
    type: shader
    shader:
      type: noise
      speed: 0.5
      uniforms:
        u_scale: 2.0
        u_color1:
          light: "rgba(224, 231, 255, 1)"
          dark: "rgba(30, 27, 75, 1)"
        u_color2:
          light: "rgba(199, 210, 254, 1)"
          dark: "rgba(49, 46, 129, 1)"
```

### 涟漪效果

```yaml
hero:
  background:
    type: shader
    shader:
      type: ripple
      speed: 1.0
      uniforms:
        u_frequency: 8.0
        u_amplitude: 0.15
```

### 丝绸效果

```yaml
hero:
  background:
    type: shader
    shader:
      type: silk
      speed: 0.72
      uniforms:
        uColor1:
          type: vec3
          value: [0.86, 0.9, 0.8]
        uColor2:
          type: vec3
          value: [0.75, 0.82, 0.67]
        uColor3:
          type: vec3
          value: [0.62, 0.71, 0.56]
```

---

## Uniform 配置

### 基础值

```yaml
shader:
  uniforms:
    u_intensity: 0.5
    u_speed: 1.2
```

### 主题感知值

```yaml
shader:
  uniforms:
    u_color:
      light: "rgba(102, 126, 234, 1)"
      dark: "rgba(76, 81, 191, 1)"
    u_intensity:
      light: 0.6
      dark: 0.8
```

### 类型化 Uniform

```yaml
shader:
  uniforms:
    u_resolution:
      type: vec2
      value: [1920, 1080]
    u_color:
      type: color
      value: "rgba(102, 126, 234, 1)"
    u_offset:
      type: float
      value: 0.5
```

### Uniform 类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `float` | 浮点数 | `0.5` |
| `int` | 整数 | `10` |
| `vec2` | 二维向量 | `[1.0, 2.0]` |
| `vec3` | 三维向量 | `[1.0, 0.5, 0.0]` |
| `color` | 颜色 | `"rgba(102, 126, 234, 1)"` 或 `[1.0, 0.5, 0.0]` |
| `sampler2D` | 纹理 | 图片 URL |

---

## 自定义着色器

### 完整自定义

```yaml
hero:
  background:
    type: shader
    shader:
      custom:
        vertex: |
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        fragment: |
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            vec3 color = vec3(vUv.x, vUv.y, sin(uTime) * 0.5 + 0.5);
            gl_FragColor = vec4(color, 1.0);
          }
      uniforms:
        uTime: 0
```

### 基于预设修改

```yaml
hero:
  background:
    type: shader
    shader:
      type: water
      custom:
        fragment: |
          uniform float uTime;
          uniform vec2 uResolution;
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;
            float wave = sin(uv.x * 10.0 + uTime) * 0.5 + 0.5;
            vec3 color = mix(vec3(0.1, 0.3, 0.6), vec3(0.2, 0.5, 0.8), wave);
            gl_FragColor = vec4(color, 1.0);
          }
```

---

## 内置 Uniform

每个着色器自动获得以下内置 uniform：

| Uniform | 类型 | 说明 |
|---------|------|------|
| `uTime` | `float` | 动画时间（秒） |
| `uResolution` | `vec2` | 画布分辨率 |
| `uThemeIsDark` | `float` | 是否暗色主题（0/1） |
| `uBgColor` | `vec3` | 背景颜色（从 CSS 变量获取） |

---

## 性能注意事项

1. **SSR 安全** - 着色器仅在客户端渲染，避免 SSR 错误
2. **分辨率自适应** - 自动跟踪容器尺寸
3. **帧率控制** - 使用 `requestAnimationFrame` 优化
4. **主题切换** - 平滑过渡，避免视觉闪烁

### 移动端优化

复杂着色器可能在低端设备上影响性能：

```yaml
hero:
  background:
    type: shader
    shader:
      type: noise  # 选择较简单的预设
      speed: 0.5   # 降低动画速度
```

---

## 完整配置示例

```yaml
hero:
  background:
    type: shader
    shader:
      type: galaxy
      speed: 0.8
      uniforms:
        u_star_density:
          light: 0.3
          dark: 0.7
        u_color:
          light: "rgba(224, 231, 255, 1)"
          dark: "rgba(30, 27, 75, 1)"
        u_rotation_speed: 0.2
```
