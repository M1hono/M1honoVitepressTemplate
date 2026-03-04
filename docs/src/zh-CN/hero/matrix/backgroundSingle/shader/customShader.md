---
layout: home
hero:
    name: "着色器背景"
    text: "自定义着色器"
    tagline: "编写自定义 GLSL 片段着色器实现独特效果。"
    background:
        type: shader
        shader:
            fragmentShader: |
                precision mediump float;
                uniform float uTime;
                uniform vec2 uResolution;
                void main() {
                    vec2 uv = gl_FragCoord.xy / uResolution;
                    vec3 color = 0.5 + 0.5 * cos(uTime + uv.xyx + vec3(0, 2, 4));
                    gl_FragColor = vec4(color, 1.0);
                }
    colors:
        title:
            light: "rgba(255, 255, 255, 1)"
            dark: "rgba(255, 255, 255, 1)"
        tagline:
            light: "rgba(224, 224, 224, 1)"
            dark: "rgba(204, 204, 204, 1)"
    actions:
        - theme: brand
          text: "粒子"
          link: /zh-CN/hero/matrix/backgroundSingle/particles
features:
    - title: "自定义 GLSL"
      details: "编写自己的片段着色器代码。"
    - title: "Uniforms"
      details: "访问 uTime、uResolution、uMouse 等变量。"
title: "自定义着色器"
description: "编写自定义 GLSL 片段着色器。"
priority: 16
---
# 自定义着色器

主要关注点：编写自定义 GLSL 片段着色器。

## 可用 Uniforms

| Uniform | 类型 | 说明 |
|---------|------|-------------|
| `uTime` | float | 已用时间（秒） |
| `uResolution` | vec2 | 画布分辨率 |
| `uMouse` | vec2 | 鼠标位置 |
| `uTheme` | string | 当前主题（light/dark） |

## 本页实际 Frontmatter 配置

```yaml
---
layout: home
hero:
    background:
        type: shader
        shader:
            fragmentShader: |
                precision mediump float;
                uniform float uTime;
                void main() {
                    vec2 uv = gl_FragCoord.xy / uResolution;
                    gl_FragColor = vec4(uv, sin(uTime), 1.0);
                }
---
```

## 示例：简单渐变

```glsl
precision mediump float;
uniform float uTime;
uniform vec2 uResolution;

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec3 color = mix(
        vec3(0.2, 0.1, 0.5),
        vec3(0.8, 0.4, 0.2),
        uv.y + sin(uTime) * 0.2
    );
    gl_FragColor = vec4(color, 1.0);
}
```
