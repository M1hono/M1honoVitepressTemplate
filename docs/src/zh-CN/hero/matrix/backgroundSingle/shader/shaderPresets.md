---
layout: home
hero:
    name: "着色器背景"
    text: "着色器预设"
    tagline: "使用内置着色器预设创建动画背景。"
    background:
        type: shader
        shader:
            type: galaxy
    colors:
        title:
            light: "rgba(255, 255, 255, 1)"
            dark: "rgba(255, 255, 255, 1)"
        tagline:
            light: "rgba(224, 224, 224, 1)"
            dark: "rgba(204, 204, 204, 1)"
    actions:
        - theme: brand
          text: "自定义着色器"
          link: /zh-CN/hero/matrix/backgroundSingle/shader/customShader
features:
    - title: "内置预设"
      details: "water、galaxy、plasma、noise、ripple、silk 等。"
    - title: "动画"
      details: "着色器自动进行动画渲染。"
title: "着色器预设"
description: "使用内置着色器预设。"
priority: 15
---
# 着色器预设

主要关注点：使用内置 GLSL 着色器动画。

## 可用预设

| 预设 | 说明 |
|--------|-------------|
| water | 动态水波纹效果 |
| galaxy | 宇宙星空 |
| plasma | 流体等离子颜色 |
| noise | 静态噪点纹理 |
| ripple | 同心涟漪波 |
| silk | 轻量电影级调色的丝绸流动渐变 |

## 本页实际 Frontmatter 配置

```yaml
---
layout: home
hero:
    background:
        type: shader
        shader:
            type: galaxy
---
```

## API 配置项

| 键 | 类型 | 说明 |
|-----|------|-------------|
| `hero.background.shader.type` | string | 内置预设名称 |
| `hero.background.shader.custom.fragment` | string | 自定义 GLSL 片段着色器 |
