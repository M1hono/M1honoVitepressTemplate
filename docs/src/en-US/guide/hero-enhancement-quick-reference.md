# Hero Enhancement Quick Reference

A quick reference guide for configuring the enhanced Hero section with TresJS/Three.js.

## Quick Start

### 1. Install Dependencies

```bash
npm install @tresjs/core three
npm install -D @types/three
```

### 2. Register TresJS in VitePress

**Create `.vitepress/utils/vitepress/tresjs-setup.ts`**:
```typescript
import type { App } from 'vue';
import TresPlugin from '@tresjs/core';

export const registerTresJS = (app: App) => {
  app.use(TresPlugin);
};
```

**Update `.vitepress/theme/index.ts`**:
```typescript
import { registerTresJS } from '@utils/vitepress/tresjs-setup';

export default {
  async enhanceApp(ctx) {
    registerTresJS(ctx.app); // Register TresJS FIRST
    DefaultTheme.enhanceApp(ctx);
    registerComponents(ctx.app);
  },
};
```

**Important**: Without this registration, you'll get "Failed to resolve component: TresCanvas" error.

### 3. Minimal Configuration

```yaml
---
layout: home
hero:
  name: "My Project"
  background:
    type: color
    color:
      solid:
        value: rgba(255,255,255,1)
  # Waves are a separate enhancement (not a background type)
  waves:
    enabled: true
---
```

## Background Configuration Modes

### Single Layer Mode (Simple)

```yaml
background:
  type: color # or image, video, shader, particles
  color:
    gradient:
      enabled: true
      type: linear
      stops:
        - color: rgba(102,126,234,1)
          position: 0%
```

### Multi-Layer Mode (Advanced)

```yaml
background:
  mode: layers
  layers:
    - type: color
      color: { ... }
      opacity: 0.5
      zIndex: 1
      blend: multiply
    - type: particles
      particles: { ... }
      opacity: 0.8
      zIndex: 2
      blend: screen
```

**Auto-Detection**: If `layers` array is provided, mode is automatically `layers`. If `type` is provided, mode is automatically `single`.

## Background Types

### 1. Image Background

```yaml
background:
  type: image
  image:
    # Supports URLs: https://example.com/bg-light.jpg
    light: /images/bg-light.jpg # or https://example.com/bg-light.jpg
    dark: /images/bg-dark.jpg # or https://example.com/bg-dark.jpg
    # Or single image
    src: /images/bg.jpg # or https://example.com/bg.jpg
    opacity: 0.8
    parallax:
      enabled: true
      intensity: 0.5
```

### 2. Video Background

```yaml
background:
  type: video
  video:
    # Supports URLs: https://example.com/hero.mp4
    src: /videos/hero.mp4 # or https://example.com/hero.mp4
    light: /videos/hero-light.mp4 # or https://example.com/hero-light.mp4
    dark: /videos/hero-dark.mp4 # or https://example.com/hero-dark.mp4
    autoplay: true
    loop: true
    muted: true
    opacity: 0.9
    poster: /images/poster.jpg # or https://example.com/poster.jpg
```

### 3. Color Background (Gradient)

```yaml
background:
  type: color
  color:
    gradient:
      enabled: true
      type: linear
      direction: 135deg
      stops:
        - color: "#667eea"
          position: 0%
        - color: "#764ba2"
          position: 100%
    animation:
      enabled: true
      type: flow
      duration: 10s
```

### 4. Shader Background (Theme Variation Supported)

**✅ API Support**: Fully supported with TresJS APIs:
- `TresCanvas` - Root container
- `TresShaderMaterial` - Shader material
- `useRenderLoop` - Uniform updates
- `useTres` - Scene access

```yaml
background:
  type: shader
  shader:
    enabled: true
    type: water # 'water' | 'noise' | 'galaxy' | 'plasma' | 'ripple' | 'template:name'
    # Use shader template
    template: template:my-custom-shader
    # Or custom shader code
    custom:
      vertex: |
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      fragment: |
        uniform float uTime;
        uniform vec3 uColor1;
        varying vec2 vUv;
        void main() {
          gl_FragColor = vec4(uColor1, 1.0);
        }
    uniforms:
      uSpeed:
        type: float
        value: 1.0
      uColor1:
        type: vec3
        # Theme variation support
        light: [0.2, 0.4, 0.8]
        dark: [0.8, 0.4, 0.2]
        value: [0.2, 0.4, 0.8] # Fallback
      uTexture:
        type: sampler2D
        value: /textures/noise.jpg # or https://example.com/noise.jpg
    # Shader-specific theme variation
    water:
      color:
        light: [0.2, 0.4, 0.8]
        dark: [0.1, 0.2, 0.4]
        value: [0.2, 0.4, 0.8]
```

**Implementation** (Recommended: @loop event):
```vue
<script setup>
import { ref } from 'vue';
import { TresCanvas, extend } from '@tresjs/core';
import { ShaderMaterial, Vector3 } from 'three';

extend({ ShaderMaterial });

const uniforms = ref({
  uTime: { value: 0 },
  uColor1: { value: new Vector3(0.2, 0.4, 0.8) },
});

const handleLoop = (context: any) => {
  const elapsed = context?.elapsed || performance.now() * 0.001;
  uniforms.value.uTime.value = elapsed;
};
</script>

<template>
  <TresCanvas clear-color="transparent" :alpha="true" @loop="handleLoop">
    <TresMesh>
      <TresPlaneGeometry :args="[2, 2]" />
      <TresShaderMaterial
        vertex-shader="varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }"
        fragment-shader="uniform vec3 uColor1; void main() { gl_FragColor = vec4(uColor1, 1.0); }"
        :uniforms="uniforms"
      />
    </TresMesh>
  </TresCanvas>
</template>
```

**⚠️ Animation Best Practices**:
- ✅ Recommended: Use `@loop` event on `TresCanvas` (simpler, no injection errors)
- ⚠️ Alternative: `useRenderLoop()` must be called synchronously in `setup()`, not conditionally
- ❌ Never call `useRenderLoop()` in event handlers or async functions

### Shader Effect Markdown Plugin

Render custom GLSL shaders directly in markdown documentation.

**Status**: Finished

````md
::: shader-effect{"speed":1}
```glsl
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

```glsl  
uniform float uTime;
uniform vec3 uBgColor;
uniform float uThemeIsDark;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= 1.78;
  float r = length(uv);
  float angle = atan(uv.y, uv.x);
  float swirl = angle + uTime * 0.5 + r * 5.0;
  float ring = smoothstep(0.95, 0.15, r);
  float core = smoothstep(0.02, 0.12, r);
  float accretion = sin(swirl * 3.0) * 0.5 + 0.5;
  float glow = exp(-r * 3.0) * 0.6;
  vec3 diskColor = mix(uColor1, uColor2, accretion);
  float effectMask = ring * core;
  vec3 effectColor = diskColor * effectMask + glow * vec3(0.3, 0.4, 0.8);
  vec3 finalColor = mix(uBgColor, effectColor, effectMask + glow * 0.3);
  gl_FragColor = vec4(finalColor, 1.0);
}
```
:::
````

**Options**: `preset` (wave/ocean/sunset/mono), `speed`, `paused`  
**Uniforms**: `uTime`, `uBgColor`, `uThemeIsDark`, `uColor1`-`uColor3`

### 5. Particle System (Theme Variation Supported)

```yaml
background:
  type: particles
  particles:
    enabled: true
    type: stars # 'snow' | 'stars' | 'bubbles' | 'sparks'
    count: 1000
    appearance:
      size: 0.02
      # Theme variation support
      color:
        light: [0.2, 0.2, 0.3]
        dark: [1.0, 1.0, 1.0]
        value: [1.0, 1.0, 1.0]
      opacity:
        light: 0.6
        dark: 0.8
        value: 0.8
      # Texture supports URLs
      texture: /textures/particle.png # or https://example.com/particle.png
```

## Wave Enhancement (Separate System)

**Note**: Waves are NOT a background type. They are a separate enhancement system that can be enabled/disabled independently and always render on top of background layers.

```yaml
hero:
  background:
    type: color # or image, video, shader, particles
    # ... background configuration
  # Waves are configured separately
  waves:
    enabled: true # Enable or disable waves
    count: 3
    layers:
      - height: 0.5
        speed: 1.0
        frequency: 0.02
        color: [0.2, 0.4, 0.8]
        opacity: 0.6
```

## Hero Image Types

### Standard Image (URL Supported)

```yaml
hero:
  image:
    # Supports URLs
    light: /logo.png # or https://example.com/logo-light.png
    dark: /logodark.png # or https://example.com/logo-dark.png
    # Or single image
    src: /logo.png # or https://example.com/logo.png
    alt: Logo
```

### Video (URL Supported)

```yaml
hero:
  image:
    type: video
    video:
      # Supports URLs
      src: /videos/hero.mp4 # or https://example.com/hero.mp4
      light: /videos/hero-light.mp4 # or https://example.com/hero-light.mp4
      dark: /videos/hero-dark.mp4 # or https://example.com/hero-dark.mp4
      autoplay: true
      loop: true
      poster: /images/poster.jpg # or https://example.com/poster.jpg
```

### GIF (URL Supported)

```yaml
hero:
  image:
    type: gif
    gif:
      # Supports URLs
      src: /animations/hero.gif # or https://example.com/hero.gif
      loop: true
```

### 3D Model (URL & Theme Variation Supported)

```yaml
hero:
  image:
    type: model3d
    model3d:
      # Supports URLs
      src: /models/logo.glb # or https://example.com/logo.glb
      scale: [1, 1, 1]
      animation:
        enabled: true
        type: rotate
        speed: 1.0
        axis: [0, 1, 0]
      # Theme variation for materials
      materials:
        - name: material1
          color:
            light: [1.0, 1.0, 1.0]
            dark: [0.8, 0.8, 0.8]
            value: [1.0, 1.0, 1.0]
      # Theme variation for lighting
      lighting:
        ambient:
          color:
            light: [1.0, 1.0, 1.0]
            dark: [0.5, 0.5, 0.5]
            value: [1.0, 1.0, 1.0]
          intensity:
            light: 0.5
            dark: 0.8
            value: 0.5
      interaction:
        enabled: true
        autoRotate: true
```

## Common Patterns

### Pattern 1: Wave Background with 3D Model

```yaml
hero:
  name: "My Project"
  background:
    type: waves
    waves:
      enabled: true
  image:
    type: model3d
    model3d:
      src: /models/logo.glb
      animation:
        type: rotate
```

### Pattern 2: Shader + Particles

```yaml
hero:
  background:
    layers:
      - type: shader
        shader:
          type: galaxy
        opacity: 0.7
      - type: particles
        particles:
          type: stars
          count: 2000
        opacity: 0.8
```

### Pattern 3: Video with Gradient Overlay

```yaml
hero:
  background:
    layers:
      - type: video
        video:
          src: /videos/bg.mp4
        opacity: 0.8
      - type: color
        color:
          gradient:
            enabled: true
            type: radial
            stops:
              - color: "#000000"
                position: 0%
              - color: "transparent"
                position: 100%
        opacity: 0.5
        blend: overlay
```

### Pattern 4: Animated Gradient with Particles

```yaml
hero:
  background:
    type: color
    color:
      gradient:
        enabled: true
        type: linear
        direction: 135deg
        stops:
          - color: "#667eea"
            position: 0%
          - color: "#764ba2"
            position: 100%
      animation:
        enabled: true
        type: flow
        duration: 10s
    particles:
      enabled: true
      type: bubbles
      count: 500
```

## Motion Vue Animations

### Fade In

```yaml
motion:
  enabled: true
  type: fadeIn
  duration: 1.0
  delay: 0
```

### Slide Up

```yaml
motion:
  enabled: true
  type: slideUp
  duration: 0.8
  delay: 0.2
```

### Zoom In

```yaml
motion:
  enabled: true
  type: zoomIn
  duration: 1.2
  delay: 0
```

## Shader Uniforms Reference

### Common Uniform Types

- `float`: Single floating-point number
- `vec2`: 2D vector `[x, y]`
- `vec3`: 3D vector `[x, y, z]` (for colors: `[r, g, b]`)
- `vec4`: 4D vector `[x, y, z, w]`
- `int`: Integer
- `sampler2D`: Texture sampler

### Example Uniforms

```yaml
uniforms:
  uTime:
    type: float
    value: 0
  uColor:
    type: vec3
    value: [0.2, 0.4, 0.8]
  uSpeed:
    type: float
    value: 1.0
  uTexture:
    type: sampler2D
    value: /textures/noise.png
```

## Performance Tips

1. **Reduce particle counts on mobile**: Use `count: 500` instead of `count: 2000`
2. **Simplify shaders**: Use built-in shader types when possible
3. **Lazy load 3D models**: Models load automatically when needed
4. **Disable heavy effects on mobile**: Check device capabilities
5. **Optimize wave segments**: Use `segments: { width: 30, height: 30 }` for better performance

## Browser Compatibility

- **WebGL Required**: For 3D features (waves, shaders, particles, models)
- **Fallbacks**: CSS-based fallbacks for non-WebGL browsers
- **Mobile**: Reduced effects automatically on mobile devices

## Troubleshooting

### Waves Not Animating
- Check WebGL support: `navigator.webgl`
- Verify TresJS is properly installed
- Check browser console for errors

### 3D Model Not Loading
- Verify model format: `.glb` or `.gltf`
- Check file path is correct
- Ensure model file exists in public directory

### Shader Not Working
- Verify GLSL syntax is correct
- Check uniform types match values
- Ensure shader code is properly formatted

### Performance Issues
- Reduce particle counts
- Simplify shader complexity
- Use lower resolution textures
- Disable unnecessary effects

## URL Support

**All media sources support URLs**:
- Images: `https://example.com/image.jpg` or `/path/to/image.jpg`
- Videos: `https://example.com/video.mp4` or `/path/to/video.mp4`
- GIFs: `https://example.com/animation.gif` or `/path/to/animation.gif`
- 3D Models: `https://example.com/model.glb` or `/path/to/model.glb`
- Textures: `https://example.com/texture.png` or `/path/to/texture.png`

**Auto-Detection**: Automatically detects local paths vs URLs

## Theme Variation

**All theme-variable elements support light/dark variants**:

### Color Format
```yaml
color:
  light: rgba(255,255,255,1)
  dark: rgba(26,26,26,1)
  value: rgba(255,255,255,1) # Fallback
```

### Shader Uniforms
```yaml
uniforms:
  uColor:
    type: vec3
    light: [0.2, 0.4, 0.8]
    dark: [0.8, 0.4, 0.2]
    value: [0.2, 0.4, 0.8]
```

### Shader-Specific Colors
```yaml
water:
  color:
    light: [0.2, 0.4, 0.8]
    dark: [0.1, 0.2, 0.4]
    value: [0.2, 0.4, 0.8]
```

### Particle Colors
```yaml
appearance:
  color:
    light: [0.2, 0.2, 0.3]
    dark: [1.0, 1.0, 1.0]
    value: [1.0, 1.0, 1.0]
```

### 3D Model Materials & Lighting
```yaml
materials:
  - color:
      light: [1.0, 1.0, 1.0]
      dark: [0.8, 0.8, 0.8]
      value: [1.0, 1.0, 1.0]
lighting:
  ambient:
    color:
      light: [1.0, 1.0, 1.0]
      dark: [0.5, 0.5, 0.5]
      value: [1.0, 1.0, 1.0]
    intensity:
      light: 0.5
      dark: 0.8
      value: 0.5
```

**Theme Detection**: Automatically detects current theme and falls back to `value` if theme-specific value not provided

## i18n System

### Using Translations in Components

```typescript
import { useSafeI18n } from '../../../utils/i18n/locale';

const { t } = useSafeI18n('hero-component', {
  getStarted: 'Get Started',
  features: 'Features',
  tagline: 'A modern documentation template',
});

// Access translations
const text = t.getStarted; // Returns translated or default value
```

### Translation File Location

Translation files: `.vitepress/config/locale/{lang}/components/{componentPath}.json`

**Example**: `.vitepress/config/locale/en-US/components/hero/VPHero.json`
```json
{
  "getStarted": "Get Started",
  "features": "Features",
  "tagline": "A modern documentation template"
}
```

### Component ID Mapping

Component IDs are mapped in `.vitepress/config/locale/component-id-mapping.json`:
```json
{
  "mappings": {
    "hero-component": "hero/VPHero",
    "hero-background": "hero/background/HeroBackground"
  }
}
```

## Utils Structure

### Import Pattern

From components in `.vitepress/theme/components/hero/`:
```typescript
// i18n
import { useSafeI18n } from '../../../utils/i18n/locale';

// Hero-specific utils (to be created)
import { useParallax } from '../../../utils/hero/useParallax';
import { useBlurEffect } from '../../../utils/hero/useBlurEffect';

// Config
import { getProjectInfo } from '../../../config/project-config';
```

### Utils Organization

```
.vitepress/utils/
├── i18n/              # Internationalization
│   └── locale/        # useSafeI18n
├── config/            # Configuration utilities
├── content/           # Content processing
├── vitepress/         # VitePress-specific
├── charts/            # Chart utilities
└── hero/              # Hero-specific utils (to be created)
    ├── useParallax.ts
    ├── useBlurEffect.ts
    ├── useBounceEffect.ts
    └── useHover3D.ts
```

## Core Three.js/TresJS APIs

### Three Essential APIs

#### 1. TresCanvas (Root Component)
```vue
<TresCanvas clear-color="#000000" window-size>
  <!-- 3D content -->
</TresCanvas>
```

#### 2. extend API (Required for Custom Shaders)
```typescript
import { extend } from '@tresjs/core';
import { ShaderMaterial } from 'three';

// Extend TresJS to support ShaderMaterial
extend({ ShaderMaterial });

// Now TresShaderMaterial is available in template
```

#### 3. useRenderLoop (Animation)
```typescript
import { useRenderLoop } from '@tresjs/core';

const { onLoop } = useRenderLoop();

onLoop(({ delta, elapsed }) => {
  // Update animations
  mesh.value.rotation.y += delta * speed;
  material.value.uniforms.uTime.value = elapsed;
});
```

#### 4. useTres (Scene Context)
```typescript
import { useTres } from '@tresjs/core';

const { scene, camera, renderer, sizes } = useTres();

// Access scene, camera, renderer
scene.value.add(mesh);
camera.value.position.set(0, 0, 5);
```

### Additional APIs

#### Tres Components
```vue
<TresPerspectiveCamera :position="[0, 0, 5]" />
<TresAmbientLight :intensity="0.5" />
<TresMesh>
  <TresPlaneGeometry :args="[10, 10, 50, 50]" />
  <!-- TresShaderMaterial requires extend({ ShaderMaterial }) first -->
  <TresShaderMaterial
    :vertex-shader="vertexShader"
    :fragment-shader="fragmentShader"
    :uniforms="uniforms"
  />
</TresMesh>
```

#### @tresjs/cientos
```vue
<script setup>
import { OrbitControls } from '@tresjs/cientos';
</script>

<TresCanvas>
  <OrbitControls :auto-rotate="true" />
</TresCanvas>
```

## Dependencies

```json
{
  "dependencies": {
    "@tresjs/core": "^2.7.0",
    "@tresjs/cientos": "^2.7.0",
    "three": "^0.170.0"
  },
  "devDependencies": {
    "@types/three": "^0.170.0"
  }
}
```

## Installation

```bash
yarn add @tresjs/core @tresjs/cientos three
yarn add -D @types/three
```

---

For detailed documentation, see [Hero Enhancement Guide](./hero-enhancement.md).