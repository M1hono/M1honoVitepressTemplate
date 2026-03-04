---
layout: home
hero:
  name: "单一背景"
  text: "粒子"
  tagline: "面向运行时契约的粒子配置参考入口：预设类型、关键路径、有效格式。"
  background:
    type: particles
    particles:
      type: stars
      count: 240
      spread: 3.2
      appearance:
        color:
          light: "rgba(51, 88, 171, 1)"
          dark: "rgba(192, 214, 255, 1)"
        opacity:
          light: 0.82
          dark: 0.94
        size: 0.13
      movement:
        speed:
          min: 0.05
          max: 0.14
        turbulence: 0.12
        tiltVariance: 0.1
  actions:
    - theme: brand
      text: "粒子契约"
      link: /zh-CN/hero/matrix/backgroundSingle/particles/particlesConfig
features:
  - title: "预设类型"
    details: "stars、snow、rain、bubbles、sparks、custom 全部由运行时支持。"
  - title: "契约优先"
    details: "示例只使用 ParticleSystem 真实读取的键。"
  - title: "颜色格式"
    details: "粒子颜色相关字段统一使用 rgba(...) 字符串。"
  - title: "高级展示"
    details: "覆盖自定义纹理、区域映射和复杂组合配置。"
title: "单一粒子背景"
description: "粒子背景参考入口：预设、契约与颜色文档导航。"
priority: 30
---
# 单一粒子背景

主要关注点：粒子配置参考入口。先看本页，再进入契约页和颜色页。

## 参考页面

- [粒子运行时契约](./particlesConfig)
- [粒子颜色与透明度格式](./particlesColor)
- [粒子自定义纹理](./customTextures)
- [粒子完整展示](./fullShowcase)

## 本页实际 Frontmatter 配置

以下 YAML 为当前页面正在使用的完整 frontmatter。

```yaml
---
layout: home
hero:
  name: "单一背景"
  text: "粒子"
  tagline: "面向运行时契约的粒子配置参考入口：预设类型、关键路径、有效格式。"
  background:
    type: particles
    particles:
      type: stars
      count: 240
      spread: 3.2
      appearance:
        color:
          light: "rgba(51, 88, 171, 1)"
          dark: "rgba(192, 214, 255, 1)"
        opacity:
          light: 0.82
          dark: 0.94
        size: 0.13
      movement:
        speed:
          min: 0.05
          max: 0.14
        turbulence: 0.12
        tiltVariance: 0.1
  actions:
    - theme: brand
      text: "粒子契约"
      link: /zh-CN/hero/matrix/backgroundSingle/particles/particlesConfig
features:
  - title: "预设类型"
    details: "stars、snow、rain、bubbles、sparks、custom 全部由运行时支持。"
  - title: "契约优先"
    details: "示例只使用 ParticleSystem 真实读取的键。"
  - title: "颜色格式"
    details: "粒子颜色相关字段统一使用 rgba(...) 字符串。"
---
```

## 运行时支持的预设类型（`particles.type`）

| 类型 | 视觉特征 | 默认摘要 |
| --- | --- | --- |
| `stars` | 漂浮星点 | 颜色 `rgba(53, 86, 186, 1)`、透明度 `0.68`、速度 `0.02-0.08`、区域 `sphere` |
| `snow` | 缓慢下雪 | 颜色 `rgba(242, 246, 255, 1)`、透明度 `0.78`、速度 `0.08-0.26`、区域 `plane` |
| `rain` | 快速雨线 | 颜色 `rgba(123, 156, 255, 1)`、透明度 `0.45`、速度 `1.25-2.3`、区域 `plane` |
| `bubbles` | 上升气泡 | 颜色 `rgba(168, 211, 255, 1)`、透明度 `0.4`、速度 `0.22-0.56`、区域 `box` |
| `sparks` | 发散火花 | 颜色 `rgba(255, 198, 130, 1)`、透明度 `0.72`、速度 `0.8-1.6`、区域 `box` |
| `custom` | 自定义轮廓 | 颜色 `rgba(133, 165, 255, 1)`、透明度 `0.58`、速度 `0.12-0.56`、区域 `box` |

## 关键路径与参考归属

| 键路径 | 参考页 |
| --- | --- |
| `hero.background.type: particles` | [Hero 全配置总览](../../../AllConfig) |
| `hero.background.particles.*` | [粒子运行时契约](./particlesConfig) |
| `hero.background.particles.color / appearance.color` | [粒子颜色与透明度格式](./particlesColor) |
| `hero.background.particles.appearance.texture` | [粒子自定义纹理](./customTextures) |
| 复杂组合完整示例 | [粒子完整展示](./fullShowcase) |
| `hero.background.opacity/brightness/contrast/saturation/filter` | [全局控制](../globalControls) |
