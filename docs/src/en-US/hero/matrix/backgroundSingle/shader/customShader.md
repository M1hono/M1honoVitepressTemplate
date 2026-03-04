---
layout: home
hero:
    name: "Shader Background"
    text: "Custom Shader"
    tagline: "Write custom GLSL fragment shaders for unique effects."
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
          text: "Particles"
          link: /en-US/hero/matrix/backgroundSingle/particles
features:
    - title: "Custom GLSL"
      details: "Write your own fragment shader code."
    - title: "Uniforms"
      details: "Access uTime, uResolution, uMouse and more."
title: "Custom Shader"
description: "Write custom GLSL fragment shaders."
priority: 16
---
# Custom Shader

Primary focus: Write custom GLSL fragment shaders.

## Available Uniforms

| Uniform | Type | Description |
|---------|------|-------------|
| `uTime` | float | Elapsed time in seconds |
| `uResolution` | vec2 | Canvas resolution |
| `uMouse` | vec2 | Mouse position |
| `uTheme` | string | Current theme (light/dark) |

## Actual Frontmatter

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

## Example: Simple Gradient

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
