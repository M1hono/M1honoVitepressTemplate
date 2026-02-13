# Hero Section Enhancement with TresJS/Three.js

## Overview

This document describes the planned enhancement of the VitePress Hero section using `@tresjs/core` (Vue 3 wrapper for Three.js) to create a visually stunning and highly customizable hero experience. The enhancement will support:
- Configurable backgrounds (images, videos, colors, shaders, particles)
- Animated sea waves as a separate enhancement system (not a background type)
- Particle systems
- 3D model support
- Seamless integration with Motion Vue animations

## Table of Contents

- [Architecture](#architecture)
- [Dependencies](#dependencies)
- [Frontmatter Configuration](#frontmatter-configuration)
- [Features](#features)
- [Component Structure](#component-structure)
- [Implementation Guidelines](#implementation-guidelines)
- [Examples](#examples)

## Architecture

### Core Technologies

- **@tresjs/core**: Vue 3 declarative wrapper for Three.js
- **Three.js**: 3D graphics library for WebGL
- **Motion Vue**: Animation library for Vue 3
- **VitePress**: Static site generator framework

### Component Hierarchy

```
.vitepress/theme/components/hero/
├── VPHero.vue (Main Component, < 500 lines)
├── background/
│   ├── HeroBackground.vue (< 500 lines)
│   ├── BackgroundLayer.vue (< 500 lines)
│   ├── ImageBackground.vue (< 500 lines)
│   ├── VideoBackground.vue (< 500 lines)
│   ├── ColorBackground.vue (< 500 lines)
│   ├── ShaderBackground.vue (< 500 lines, TresJS)
│   └── ParticleSystem.vue (< 500 lines, TresJS/Three.js)
├── waves/
│   └── WaveAnimation.vue (< 500 lines, TresJS/Three.js)
│       └── WaveLayer.vue (< 500 lines)
├── content/
│   ├── HeroContent.vue (< 500 lines)
│   ├── HeroTitle.vue (< 500 lines, Motion Vue)
│   ├── HeroTagline.vue (< 500 lines, Motion Vue)
│   └── HeroActions.vue (< 500 lines, Motion Vue)
├── image/
│   ├── HeroImage.vue (< 500 lines)
│   ├── ImageDisplay.vue (< 500 lines)
│   ├── VideoDisplay.vue (< 500 lines)
│   ├── GifDisplay.vue (< 500 lines)
│   └── Model3D.vue (< 500 lines, TresJS/Three.js)
└── effects/
    ├── ParallaxEffect.vue (< 500 lines)
    ├── BlurEffect.vue (< 500 lines)
    ├── BounceEffect.vue (< 500 lines)
    └── Hover3DEffect.vue (< 500 lines, Motion Vue)
```

### Folder Structure

```
.vitepress/
├── config/
│   ├── locale/
│   │   ├── component-id-mapping.json
│   │   ├── en-US/
│   │   │   └── components/
│   │   │       └── hero/
│   │   │           ├── VPHero.json
│   │   │           ├── background/
│   │   │           ├── waves/
│   │   │           ├── content/
│   │   │           └── image/
│   │   └── zh-CN/
│   │       └── components/
│   │           └── hero/
│   └── shaders/
│       ├── index.ts (Shader registry)
│       ├── water.ts
│       ├── noise.ts
│       ├── galaxy.ts
│       ├── plasma.ts
│       ├── ripple.ts
│       └── templates/
│           └── base-shader.ts
├── theme/
│   ├── components/
│   │   └── hero/
│   │       ├── VPHero.vue
│   │       ├── background/
│   │       ├── waves/
│   │       ├── content/
│   │       ├── image/
│   │       └── effects/
│   └── styles/
│       └── hero/
│           ├── buttons.css (Button styles)
│           ├── background.css
│           └── animations.css
└── utils/
    ├── i18n/
    │   ├── locale/
    │   │   ├── index.ts (useSafeI18n export)
    │   │   ├── translation-cache.ts
    │   │   └── types.ts
    │   └── languageControl.ts
    ├── config/
    │   └── path-resolver.ts
    ├── content/
    │   ├── index.ts
    │   ├── functions.ts
    │   └── ...
    ├── vitepress/
    │   ├── index.ts
    │   ├── components.ts
    │   └── ...
    ├── charts/
    │   └── ...
    └── index.ts (Main utils export)
```

## Dependencies

### Required Packages

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

**Version Recommendations**:
- **@tresjs/core**: `^2.7.0` or latest stable (Vue 3 declarative wrapper)
- **@tresjs/cientos**: `^2.7.0` or latest (Ready-to-use components)
- **three**: `^0.170.0` or latest stable (Core Three.js library)

### Existing Dependencies (Already Installed)

- `motion-v`: Animation library
- `vitepress`: Documentation framework

## VitePress Setup

### Registering TresJS Components

**Important**: TresJS components need to be registered globally in VitePress. The error "Failed to resolve component: TresCanvas" occurs when TresJS is not properly registered.

**Step 1: Create TresJS Setup File**

Create `.vitepress/utils/vitepress/tresjs-setup.ts`:

```typescript
import type { App } from 'vue';
import { TresPlugin } from '@tresjs/core';

export const registerTresJS = (app: App) => {
  // Register TresJS plugin globally
  app.use(TresPlugin);
};
```

**Step 2: Register in Theme Configuration**

Update `.vitepress/theme/index.ts`:

```typescript
import { registerTresJS } from '@utils/vitepress/tresjs-setup';
// ... other imports

export default {
  // ... other config
  async enhanceApp(ctx) {
    // Register TresJS FIRST, before other components
    registerTresJS(ctx.app);
    
    // ... rest of your enhanceApp logic
    DefaultTheme.enhanceApp(ctx);
    registerComponents(ctx.app);
  },
};
```

**Step 3: Vite Configuration (Optional)**

If you encounter module resolution issues, add to `.vitepress/config.mts` (or your VitePress config):

```typescript
import { defineConfig } from 'vitepress';

export default defineConfig({
  vite: {
    optimizeDeps: {
      include: ['three', '@tresjs/core'],
    },
    ssr: {
      noExternal: ['three'], // Required for SSR compatibility
    },
  },
});
```

### Client-Only Component Wrapper

Since TresJS uses WebGL (browser-only), wrap TresJS components in a client-only wrapper for SSR compatibility:

**Option 1: Using defineAsyncComponent**

```vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const ShaderBackground = defineAsyncComponent(() => 
  import('./ShaderBackground.vue')
);
</script>

<template>
  <Suspense>
    <ShaderBackground />
    <template #fallback>
      <div class="tres-loading">Loading 3D scene...</div>
    </template>
  </Suspense>
</template>
```

**Option 2: Using ClientOnly Component**

If your VitePress version supports it:

```vue
<script setup lang="ts">
import { ClientOnly } from 'vitepress/client';
import ShaderBackground from './ShaderBackground.vue';
</script>

<template>
  <ClientOnly>
    <ShaderBackground />
  </ClientOnly>
</template>
```

### Troubleshooting

**Error: "Failed to resolve component: TresCanvas"**
- ✅ Ensure `TresPlugin` is registered in `enhanceApp`
- ✅ Check that `@tresjs/core` is installed
- ✅ Verify imports are correct: `import { TresPlugin } from '@tresjs/core'`

**Error: "Cannot find module 'three'"**
- ✅ Install Three.js: `npm install three`
- ✅ Add to `optimizeDeps.include` in Vite config

**SSR Errors**
- ✅ Wrap TresJS components in `ClientOnly` or `defineAsyncComponent`
- ✅ Add `three` to `ssr.noExternal` in Vite config

## Core Three.js/TresJS APIs

### ✅ Shader Background API Support Confirmation

**Question**: Can the recommended APIs achieve shader backgrounds?

**Answer**: ✅ **YES, fully supported!** All shader background features can be implemented using:

1. **TresCanvas** - Creates WebGL rendering context
2. **extend API** - Adds ShaderMaterial support to TresJS (required for custom shaders)
3. **TresShaderMaterial** - Applies GLSL shaders to geometry (after extending)
4. **useRenderLoop** - Updates uniforms in real-time
5. **useTres** - Access to scene/renderer for advanced configuration

**Important**: TresJS core does NOT include `TresShaderMaterial` by default. You must use the `extend` API to add `ShaderMaterial` support:

```typescript
import { extend } from '@tresjs/core';
import { ShaderMaterial } from 'three';

extend({ ShaderMaterial });
// Now TresShaderMaterial is available
```

**Capabilities**:
- ✅ Custom vertex and fragment shaders (via `extend` API)
- ✅ Real-time uniform updates (time-based animations)
- ✅ Theme variation (light/dark shader colors)
- ✅ Shader templates (reusable shader code)
- ✅ Texture uniforms (supports URLs)
- ✅ Multiple shader types (water, noise, galaxy, plasma, ripple)
- ✅ Performance optimized rendering
- ✅ Responsive shaders (viewport-aware)

### Three Essential APIs for This Framework

For implementing the Hero enhancement features and future 3D functionality, use these three core APIs:

#### 1. TresCanvas (Root Component)

**Purpose**: The root container component that sets up your 3D scene.

**API**: `@tresjs/core`

**Usage**:
```vue
<template>
  <TresCanvas
    clear-color="#000000"
    window-size
    :alpha="true"
  >
    <!-- All 3D content goes here -->
  </TresCanvas>
</template>

<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';
</script>
```

**Key Properties**:
- `clear-color`: Background color of the scene
- `window-size`: Automatically fills the window/viewport
- `alpha`: Enable transparency
- `shadows`: Enable shadow rendering
- `power-preference`: GPU preference ('high-performance' | 'low-power')

**When to Use**:
- Root wrapper for all 3D scenes (waves, shaders, particles, models)
- One TresCanvas per scene (can have multiple scenes)
- Required for any TresJS/Three.js rendering

#### 2. useRenderLoop (Animation Composable)

**Purpose**: Core animation API for frame-based updates.

**API**: `@tresjs/core`

**Usage**:
```typescript
import { useRenderLoop } from '@tresjs/core';

const { onLoop, resume, pause } = useRenderLoop();

onLoop(({ delta, elapsed }) => {
  // delta: time since last frame (for frame-rate independent animations)
  // elapsed: total elapsed time since start
  
  // Update wave animations
  waveMesh.value.rotation.y += delta * waveSpeed.value;
  
  // Update shader uniforms
  shaderMaterial.value.uniforms.uTime.value = elapsed;
  
  // Update particle positions
  updateParticles(delta);
});
```

**Key Features**:
- `onLoop`: Register callback for each frame (~60 FPS)
- `delta`: Time delta for frame-rate independent animations
- `elapsed`: Total elapsed time (useful for shader animations)
- `resume()` / `pause()`: Control animation loop

**When to Use**:
- Wave animations (continuous updates)
- Shader animations (time-based uniforms)
- Particle system updates
- Parallax effects (smooth interpolation)
- Any frame-based animations

**Performance Considerations**:
- Use `delta` for frame-rate independent animations
- Avoid heavy computations in render loop
- Use `pause()` when component is not visible

#### 3. useTres (Scene Context Composable)

**Purpose**: Access to scene, camera, and renderer references.

**API**: `@tresjs/core`

**Usage**:
```typescript
import { useTres } from '@tresjs/core';

const { scene, camera, renderer, sizes } = useTres();

// Access camera for controls
watch(camera, (cam) => {
  if (cam) {
    cam.position.set(0, 0, 5);
  }
});

// Access renderer for custom configurations
watch(renderer, (r) => {
  if (r) {
    r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    r.shadowMap.enabled = true;
  }
});

// Access scene for adding/removing objects
scene.value.add(mesh);

// Access viewport sizes
const { width, height } = sizes.value;
```

**Key Properties**:
- `scene`: Three.js Scene object
- `camera`: Active camera (PerspectiveCamera or OrthographicCamera)
- `renderer`: WebGLRenderer instance
- `sizes`: Viewport dimensions (`{ width, height }`)

**When to Use**:
- Camera positioning and control
- Renderer configuration (shadows, pixel ratio, etc.)
- Adding/removing objects from scene
- Accessing viewport dimensions
- Integrating OrbitControls or other controls
- Theme-aware camera/lighting setup

### Additional Recommended APIs

#### 4. Tres Component System (Auto-mapped Three.js Components)

**Purpose**: Declarative Three.js components.

**API**: `@tresjs/core`

**Usage**:
```vue
<TresCanvas>
  <TresPerspectiveCamera :position="[0, 0, 5]" />
  <TresAmbientLight :intensity="0.5" />
  <TresDirectionalLight :position="[5, 5, 5]" :intensity="1" />
  
  <TresMesh>
    <TresPlaneGeometry :args="[10, 10, 50, 50]" />
    <!-- Standard materials -->
    <TresMeshStandardMaterial :color="0xff0000" />
  </TresMesh>
</TresCanvas>
```

**Common Components**:
- `TresPerspectiveCamera` / `TresOrthographicCamera`
- `TresAmbientLight` / `TresDirectionalLight` / `TresPointLight`
- `TresMesh` / `TresGroup`
- `TresPlaneGeometry` / `TresBoxGeometry` / `TresSphereGeometry`
- `TresMeshStandardMaterial` / `TresMeshBasicMaterial` / `TresMeshPhongMaterial`
- `TresGLTFModel` (for loading GLTF/GLB models)

**When to Use**:
- Declarative 3D scene setup
- Wave geometry and materials
- Particle system geometry
- Standard material setup
- 3D model loading

**Note**: `TresShaderMaterial` is **NOT** a built-in TresJS component. For custom shaders, use the `extend` API (see below).

#### 5. Extend API (Custom Shaders and Three.js Components)

**Purpose**: Add custom Three.js components to TresJS catalogue, including custom shader materials.

**API**: `@tresjs/core` - `extend` function

**Usage for Custom Shaders**:
```vue
<script setup lang="ts">
import { extend } from '@tresjs/core';
import { ShaderMaterial, Vector3 } from 'three';

// Extend TresJS to support ShaderMaterial
extend({ ShaderMaterial });

// Now you can use TresShaderMaterial in template
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  
  void main() {
    gl_FragColor = vec4(uColor, 1.0);
  }
`;

const uniforms = {
  uTime: { value: 0 },
  uColor: { value: new Vector3(0.2, 0.4, 0.8) },
};
</script>

<template>
  <TresCanvas>
    <TresMesh>
      <TresPlaneGeometry :args="[2, 2]" />
      <TresShaderMaterial
        :vertex-shader="vertexShader"
        :fragment-shader="fragmentShader"
        :uniforms="uniforms"
      />
    </TresMesh>
  </TresCanvas>
</template>
```

**Key Points**:
- `extend` allows adding any Three.js class to TresJS
- Required for custom shader materials (`ShaderMaterial`)
- Required for other Three.js classes not in core TresJS
- Once extended, components are available as `Tres{ClassName}`

**Important Import Note**:
- Modern Three.js uses ES modules, so import classes directly: `import { Vector3, Vector2, ShaderMaterial } from 'three'`
- Do NOT use `import { THREE } from 'three'` - this doesn't exist in ES module versions
- Use `new Vector3()` instead of `new THREE.Vector3()`

**When to Use**:
- Custom shader materials (vertex + fragment shaders)
- Custom Three.js classes not in TresJS core
- Advanced Three.js features

#### 6. @tresjs/cientos (Ready-to-Use Components)

**Purpose**: Extended components and utilities.

**API**: `@tresjs/cientos`

**Usage**:
```vue
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos';
</script>

<template>
  <TresCanvas>
    <OrbitControls
      :enable-damping="true"
      :damping-factor="0.05"
      :auto-rotate="autoRotate"
    />
  </TresCanvas>
</template>
```

**Key Components**:
- `OrbitControls`: Camera orbit controls
- `TransformControls`: Object transformation controls
- `Stats`: Performance statistics
- `Sky`: Skybox component
- `Water`: Water effect component

**When to Use**:
- Interactive 3D model controls
- Camera manipulation
- Performance monitoring
- Advanced effects

### Three.js Core APIs (Direct Usage)

For advanced use cases, you may need direct Three.js APIs:

#### Geometry APIs
```typescript
import { PlaneGeometry, BufferGeometry } from 'three';

// For wave meshes
const geometry = new PlaneGeometry(width, height, segmentsX, segmentsY);

// Custom geometry manipulation
const positions = geometry.attributes.position;
```

#### Material APIs
```typescript
import { ShaderMaterial, MeshStandardMaterial } from 'three';

// Custom shader materials
const material = new ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms,
});

// Standard materials with theme variation
const material = new MeshStandardMaterial({
  color: themeColor.value,
  metalness: 0.5,
  roughness: 0.5,
});
```

#### Loader APIs
```typescript
import { GLTFLoader, TextureLoader } from 'three';
import { useLoader } from '@tresjs/core';

// GLTF/GLB model loading
const { scene: model } = await useLoader(GLTFLoader, '/models/logo.glb');

// Texture loading (supports URLs)
const texture = await useLoader(TextureLoader, 'https://example.com/texture.jpg');
```

#### Animation APIs
```typescript
import { Clock, AnimationMixer } from 'three';

// For model animations
const mixer = new AnimationMixer(model);
const clock = new Clock();

useRenderLoop().onLoop(() => {
  mixer.update(clock.getDelta());
});
```

### API Selection Guide

**For Wave Animations**:
- `TresCanvas` (root)
- `useRenderLoop` (animation)
- `TresPlaneGeometry` (wave mesh)
- `TresShaderMaterial` (wave shader)
- `useTres` (scene access)

**For Shader Backgrounds** ✅ **FULLY SUPPORTED**:
- `TresCanvas` (root) ✅ - Required container
- `extend` API ✅ - Required to add ShaderMaterial support
- `useRenderLoop` (uniform updates) ✅ - Real-time animation
- Extended `TresShaderMaterial` (custom shaders) ✅ - After extending ShaderMaterial
- `useTres` (renderer config) ✅ - Scene/renderer access
- Direct `ShaderMaterial` API (advanced) ✅ - Full Three.js control

**Shader Background Capabilities**:
✅ Custom vertex and fragment shaders (via `extend` API)
✅ Real-time uniform updates (via `useRenderLoop`)
✅ Theme variation (light/dark uniforms)
✅ Shader templates (reusable shader code)
✅ Texture uniforms (supports URLs)
✅ Multiple shader types (water, noise, galaxy, plasma, ripple)
✅ Performance optimization (efficient rendering)
✅ Responsive shaders (viewport-aware uniforms)

**Required APIs Summary**:
1. **TresCanvas** - Creates WebGL context and renderer
2. **extend({ ShaderMaterial })** - Adds ShaderMaterial to TresJS catalogue
3. **TresShaderMaterial** - Applies GLSL shaders to geometry (after extending)
4. **useRenderLoop** - Updates uniforms every frame
5. **useTres** - Access to scene, camera, renderer for advanced config

**Complete Shader Background Implementation** (with extend API):
```vue
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { TresCanvas, TresMesh, TresPlaneGeometry, useRenderLoop, useTres, extend } from '@tresjs/core';
import { ShaderMaterial, Vector3, Vector2 } from 'three';
import { useData } from 'vitepress';
import { getShaderTemplate } from '../../../config/shaders';

// IMPORTANT: Extend TresJS to support ShaderMaterial
extend({ ShaderMaterial });

const props = defineProps<{
  config: ShaderConfig;
}>();

const { isDark } = useData();
const { sizes } = useTres();

// Get shader template or use custom
const shaderCode = computed(() => {
  if (props.config.template) {
    const templateName = props.config.template.replace('template:', '');
    const template = getShaderTemplate(templateName);
    if (template) {
      return {
        vertex: template.vertex,
        fragment: template.fragment,
        defaultUniforms: template.uniforms,
      };
    }
  }
  
  return {
    vertex: props.config.custom?.vertex || defaultVertexShader,
    fragment: props.config.custom?.fragment || defaultFragmentShader,
    defaultUniforms: {},
  };
});

// Build uniforms with theme support
const uniforms = computed(() => {
  const baseUniforms = { ...shaderCode.value.defaultUniforms };
  const configUniforms = props.config.uniforms || {};
  
  const result: Record<string, any> = {};
  
  for (const [key, value] of Object.entries({ ...baseUniforms, ...configUniforms })) {
    if (value.type === 'vec3' && (value.light || value.dark)) {
      // Theme-aware color uniform
      const colorValue = isDark.value && value.dark
        ? value.dark
        : (value.light || value.value || [0, 0, 0]);
      result[key] = { value: new Vector3(...colorValue) };
    } else if (value.type === 'float' && (value.light !== undefined || value.dark !== undefined)) {
      // Theme-aware float uniform
      const floatValue = isDark.value && value.dark !== undefined
        ? value.dark
        : (value.light !== undefined ? value.light : value.value);
      result[key] = { value: floatValue };
    } else {
      // Regular uniform
      result[key] = { value: value.value };
    }
  }
  
  // Add resolution uniform
  result.uResolution = {
    value: new Vector2(sizes.value.width, sizes.value.height),
  };
  
  return result;
});

// Update uniforms in render loop
const { onLoop } = useRenderLoop();

onLoop(({ elapsed, delta }) => {
  if (uniforms.value.uTime) {
    uniforms.value.uTime.value = elapsed;
  }
  
  // Update resolution on resize
  uniforms.value.uResolution.value.set(sizes.value.width, sizes.value.height);
});

// Watch theme changes
watch(isDark, () => {
  // Update theme-aware uniforms
  for (const [key, value] of Object.entries(props.config.uniforms || {})) {
    if (value.type === 'vec3' && (value.light || value.dark)) {
      const colorValue = isDark.value && value.dark
        ? value.dark
        : (value.light || value.value);
      uniforms.value[key].value = new Vector3(...colorValue);
    }
  }
});
</script>

<template>
  <TresCanvas
    clear-color="transparent"
    :alpha="true"
    window-size
    class="shader-background"
  >
    <TresOrthographicCamera :position="[0, 0, 1]" />
    <TresMesh>
      <TresPlaneGeometry :args="[2, 2, 1, 1]" />
      <!-- TresShaderMaterial available after extend({ ShaderMaterial }) -->
      <TresShaderMaterial
        :vertex-shader="shaderCode.vertex"
        :fragment-shader="shaderCode.fragment"
        :uniforms="uniforms"
        :transparent="true"
      />
    </TresMesh>
  </TresCanvas>
</template>
```

**For Particle Systems**:
- `TresCanvas` (root)
- `useRenderLoop` (particle updates)
- `BufferGeometry` + `Points` (particle geometry)
- `PointsMaterial` or `ShaderMaterial` (particle material)

**For 3D Models**:
- `TresCanvas` (root)
- `TresGLTFModel` or `useLoader(GLTFLoader)` (model loading)
- `useRenderLoop` (model animations)
- `OrbitControls` from `@tresjs/cientos` (interaction)
- `useTres` (camera setup)

**For Theme Variation**:
- `useTres` (access renderer for theme changes)
- `useRenderLoop` (update uniforms based on theme)
- Reactive refs for theme-aware colors
- Watch theme changes and update materials/uniforms

### Best Practices

1. **One TresCanvas Per Scene**: Use separate TresCanvas for waves, background shaders, and models if needed
2. **Use Composables**: Prefer TresJS composables over direct Three.js when possible
3. **Cleanup**: Always clean up in `onUnmounted`:
   ```typescript
   onUnmounted(() => {
     geometry.dispose();
     material.dispose();
     texture.dispose();
   });
   ```
4. **Performance**: Use `delta` for animations, limit particle counts, optimize shaders
5. **Theme Integration**: Use reactive refs and watch theme changes
6. **Error Handling**: Handle loading errors for models and textures gracefully

## Frontmatter Configuration

### Complete Configuration Schema

```yaml
---
layout: home

hero:
  # Basic Hero Configuration
  name: "VitePress Template"
  text: "A feature-rich documentation template"
  tagline: "A modern documentation template built with VitePress"
  
  # Background Configuration
  background:
    # Configuration Mode: 'single' | 'layers'
    # - 'single': Use type + specific config (simpler, single layer)
    # - 'layers': Use layers array (more flexible, multiple layers with blending)
    mode: single # Default: 'single' if type is specified, 'layers' if layers array is provided
    
    # Single Layer Mode (when mode: 'single' or type is specified)
    # Background Type: 'image' | 'video' | 'color' | 'shader' | 'particles' | 'none'
    type: color
    
    # Image Background Configuration
    image:
      # Image source (supports light/dark theme and URLs)
      # Local paths: /path/to/image.jpg
      # URLs: https://example.com/image.jpg
      light: /path/to/image-light.jpg # or https://example.com/image-light.jpg
      dark: /path/to/image-dark.jpg # or https://example.com/image-dark.jpg
      # Or single image (works with both local paths and URLs)
      src: /path/to/image.jpg # or https://example.com/image.jpg
      alt: Background image
      # Image properties
      opacity: 0.8
      blur: 0
      scale: 1.0
      position: center center
      repeat: no-repeat
      size: cover
      # Animation properties
      parallax:
        enabled: true
        intensity: 0.5
        direction: vertical
      # Motion Vue animation
      motion:
        enabled: true
        type: fadeIn
        duration: 1.0
        delay: 0
    
    # Video Background Configuration
    video:
      # Video source (supports light/dark theme and URLs)
      # Local paths: /path/to/video.mp4
      # URLs: https://example.com/video.mp4
      light: /path/to/video-light.mp4 # or https://example.com/video-light.mp4
      dark: /path/to/video-dark.mp4 # or https://example.com/video-dark.mp4
      # Or single video (works with both local paths and URLs)
      src: /path/to/video.mp4 # or https://example.com/video.mp4
      # Video properties
      autoplay: true
      loop: true
      muted: true
      playsinline: true
      opacity: 0.9
      blur: 0
      scale: 1.0
      position: center center
      # Poster image (shown before video loads, supports URLs)
      poster: /path/to/poster.jpg # or https://example.com/poster.jpg
      # Animation properties
      parallax:
        enabled: true
        intensity: 0.3
        direction: vertical
      # Motion Vue animation
      motion:
        enabled: true
        type: fadeIn
        duration: 1.5
        delay: 0
    
    # Color Background Configuration
    color:
      # Solid color (all colors use rgba format)
      solid:
        light: rgba(255,255,255,1)
        dark: rgba(26,26,26,1)
        # Or single color
        value: rgba(255,255,255,1)
      # Gradient configuration
      gradient:
        enabled: true
        type: linear # 'linear' | 'radial' | 'conic'
        # Linear gradient
        direction: 135deg # angle or 'to right', 'to bottom', etc.
        stops:
          - color: rgba(102,126,234,1)
            position: 0%
          - color: rgba(118,75,162,1)
            position: 100%
        # Radial gradient
        center: 50% 50%
        shape: ellipse # 'ellipse' | 'circle'
        size: farthest-corner
        # Animation
        animation:
          enabled: true
          type: flow # 'flow' | 'rotate' | 'pulse'
          duration: 10s
          easing: ease-in-out
    
    # Shader Background Configuration (TresJS/Three.js)
    # Supports theme variation (light/dark)
    shader:
      enabled: true
      # Shader type: 'custom' | 'water' | 'noise' | 'galaxy' | 'plasma' | 'ripple' | 'template:template-name'
      type: water
      # Shader template (registered in config/shaders/)
      template: null # e.g., 'template:my-custom-shader'
      # Custom shader (GLSL code) - only used if template is null
      custom:
        vertex: |
          // Custom vertex shader code
        fragment: |
          // Custom fragment shader code
      # Shader uniforms (configurable parameters, supports theme variation)
      uniforms:
        uTime:
          type: float
          value: 0
        uColor1:
          type: vec3
          # Theme variation support
          light: [0.2, 0.4, 0.8]
          dark: [0.8, 0.4, 0.2]
          # Or single value (applies to both themes)
          value: [0.2, 0.4, 0.8]
        uColor2:
          type: vec3
          light: [0.8, 0.4, 0.2]
          dark: [0.2, 0.4, 0.8]
          value: [0.8, 0.4, 0.2]
        uSpeed:
          type: float
          value: 1.0
        uIntensity:
          type: float
          value: 1.0
      # Shader-specific configurations (supports theme variation)
      water:
        waveHeight: 0.5
        waveSpeed: 1.0
        waveFrequency: 0.02
        # Theme variation for colors
        color:
          light: [0.2, 0.4, 0.8]
          dark: [0.1, 0.2, 0.4]
          value: [0.2, 0.4, 0.8]
        opacity:
          light: 0.8
          dark: 0.6
          value: 0.8
      noise:
        scale: 100.0
        speed: 0.5
        octaves: 4
        persistence: 0.5
        # Theme variation
        color:
          light: [0.1, 0.1, 0.1]
          dark: [0.9, 0.9, 0.9]
          value: [0.5, 0.5, 0.5]
      galaxy:
        particleCount: 10000
        size: 0.01
        color:
          light: [0.2, 0.2, 0.3]
          dark: [1.0, 1.0, 1.0]
          value: [1.0, 1.0, 1.0]
        speed: 0.5
      plasma:
        speed: 1.0
        scale: 1.0
        color1:
          light: [1.0, 0.0, 0.5]
          dark: [0.5, 0.0, 1.0]
          value: [1.0, 0.0, 0.5]
        color2:
          light: [0.0, 0.5, 1.0]
          dark: [0.0, 1.0, 0.5]
          value: [0.0, 0.5, 1.0]
        color3:
          light: [0.5, 1.0, 0.0]
          dark: [1.0, 0.5, 0.0]
          value: [0.5, 1.0, 0.0]
      ripple:
        center: [0.5, 0.5]
        speed: 1.0
        frequency: 2.0
        amplitude: 0.1
        # Theme variation
        color:
          light: [0.2, 0.4, 0.8]
          dark: [0.8, 0.4, 0.2]
          value: [0.2, 0.4, 0.8]
    
    
    # Particle System Configuration (TresJS/Three.js)
    particles:
      enabled: false
      # Particle system type: 'snow' | 'stars' | 'bubbles' | 'sparks' | 'custom'
      type: stars
      # Particle count
      count: 1000
      # Particle appearance (supports theme variation)
      appearance:
        size: 0.02
        color:
          light: [0.2, 0.2, 0.3]
          dark: [1.0, 1.0, 1.0]
          value: [1.0, 1.0, 1.0]
        opacity:
          light: 0.6
          dark: 0.8
          value: 0.8
        shape: circle # 'circle' | 'square' | 'star' | 'custom'
        texture: null # Path or URL to custom texture (supports URLs)
      # Particle movement
      movement:
        speed:
          min: 0.1
          max: 0.5
        direction: [0, -1, 0] # Vector3
        gravity: 0.0
        turbulence: 0.1
        rotation: true
        rotationSpeed:
          min: 0
          max: 0.1
      # Particle lifecycle
      lifecycle:
        lifetime:
          min: 5
          max: 10
        spawnRate: 100 # Particles per second
        respawn: true
      # Particle area (spawn area)
      area:
        type: box # 'box' | 'sphere' | 'plane'
        size: [10, 10, 10] # Width, Height, Depth
        position: [0, 5, 0] # Center position
      # Custom particle shader (optional)
      shader:
        enabled: false
        vertex: |
          // Custom vertex shader
        fragment: |
          // Custom fragment shader
      # Motion Vue integration
      motion:
        enabled: true
        type: fadeIn
        duration: 2.0
        delay: 0.5
    
    # Multi-Layer Mode (when mode: 'layers' or layers array is provided)
    # NOTE: Waves are NOT part of layers - they render separately on top
    layers:
      # Multiple background layers support
      # Each layer is a discriminated union based on 'type'
      # All media sources support URLs (https://example.com/path)
      - type: color # 'image' | 'video' | 'color' | 'shader' | 'particles'
        # Layer-specific configuration (based on type)
        color:
          gradient:
            enabled: true
            type: radial
            stops:
              - color: rgba(102,126,234,1)
                position: 0%
              - color: rgba(118,75,162,1)
                position: 100%
        # Layer properties
        opacity: 0.5
        zIndex: 1 # Layer stacking order (lower = behind)
        blend: multiply # CSS blend modes: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light' | etc.
        # Layer-specific animations (override global animations)
        animations:
          parallax:
            enabled: true
            intensity: 0.5
            direction: vertical
          blur:
            enabled: false
            amount: 0
            animation:
              enabled: false
              type: pulse # 'pulse' | 'wave' | 'breath' | 'none'
              duration: 2s
          bounce:
            enabled: false
            intensity: 0.1
            duration: 3s
            easing: ease-in-out
      - type: image # Example image layer with URL support
        image:
          src: https://example.com/background.jpg # or /path/to/image.jpg
          light: https://example.com/bg-light.jpg
          dark: https://example.com/bg-dark.jpg
        opacity: 0.8
        zIndex: 1
        blend: overlay
      - type: particles
        # Particles-specific config (supports theme variation)
        particles:
          type: stars
          count: 500
          appearance:
            color:
              light: [0.2, 0.2, 0.3]
              dark: [1.0, 1.0, 1.0]
              value: [1.0, 1.0, 1.0]
        # Layer properties
        opacity: 0.8
        zIndex: 2 # Higher zIndex = on top
        blend: screen
        animations:
          parallax:
            enabled: true
            intensity: 0.3
      - type: shader # Example shader layer with theme variation
        shader:
          type: water
          water:
            color:
              light: [0.2, 0.4, 0.8]
              dark: [0.1, 0.2, 0.4]
              value: [0.2, 0.4, 0.8]
        opacity: 0.6
        zIndex: 1
        blend: normal
    
    # Global background properties
    opacity: 1.0
    brightness: 1.0
    contrast: 1.0
    saturation: 1.0
    
    # Global background animations
    animations:
      # Parallax effect
      parallax:
        enabled: true
        intensity: 0.5
        direction: vertical # 'vertical' | 'horizontal' | 'both'
        smoothness: 0.1 # Smoothing factor (0-1)
      # Blur effect
      blur:
        enabled: false
        amount: 0 # Blur amount in pixels
        animation:
          enabled: false
          type: pulse # 'pulse' | 'wave' | 'breath' | 'none'
          duration: 2s
          minAmount: 0
          maxAmount: 10
          easing: ease-in-out
      # Bounce effect
      bounce:
        enabled: false
        intensity: 0.1 # Bounce intensity (0-1)
        duration: 3s
        easing: ease-in-out
        direction: vertical # 'vertical' | 'horizontal' | 'both'
    
    # Motion Vue animation
    motion:
      enabled: true
      type: fadeIn # 'fadeIn' | 'slideUp' | 'slideDown' | 'zoomIn' | 'none'
      duration: 1.0
      delay: 0
      easing: ease-out
  
  # Wave Enhancement Configuration (TresJS/Three.js)
  # NOTE: Waves are NOT a background type - they are a separate enhancement system
  # that can be enabled/disabled independently and always render on top of background layers
  waves:
    enabled: true # Enable or disable wave animation
    # Wave properties
    count: 3 # Number of wave layers
    layers:
      - height: 0.5
        speed: 1.0
        frequency: 0.02
        color: [0.2, 0.4, 0.8]
        opacity: 0.6
        direction: 1 # 1 for right, -1 for left
      - height: 0.3
        speed: 0.8
        frequency: 0.015
        color: [0.3, 0.5, 0.9]
        opacity: 0.5
        direction: -1
      - height: 0.4
        speed: 1.2
        frequency: 0.025
        color: [0.1, 0.3, 0.7]
        opacity: 0.4
        direction: 1
    # Wave mesh properties
    segments:
      width: 50
      height: 50
    # Animation
    animation:
      enabled: true
      speed: 1.0
      loop: true
    # Z-index: always on top
    zIndex: 1000
  
  # Hero Image Configuration
  image:
    # Image source (supports light/dark theme and URLs)
    # Local paths: /logo.png
    # URLs: https://example.com/logo.png
    light: /logo.png # or https://example.com/logo-light.png
    dark: /logodark.png # or https://example.com/logo-dark.png
    # Or single image (works with both local paths and URLs)
    src: /logo.png # or https://example.com/logo.png
    alt: VitePress Template
    # Image properties
    width: 600
    height: 600
    fit: contain # 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
    position: center center
    # Image type: 'image' | 'video' | 'gif' | 'model3d'
    type: image
    # Video properties (when type is 'video', supports URLs)
    video:
      src: /path/to/video.mp4 # or https://example.com/video.mp4
      autoplay: true
      loop: true
      muted: true
      controls: false
      poster: /path/to/poster.jpg # or https://example.com/poster.jpg
    # GIF properties (when type is 'gif', supports URLs)
    gif:
      src: /path/to/animation.gif # or https://example.com/animation.gif
      loop: true
      autoplay: true
    # 3D Model properties (when type is 'model3d', supports URLs)
    model3d:
      # Model source (supports .glb, .gltf formats)
      # Local paths: /path/to/model.glb
      # URLs: https://example.com/model.glb
      src: /path/to/model.glb # or https://example.com/model.glb
      # Model properties
      scale: [1, 1, 1] # Vector3
      position: [0, 0, 0] # Vector3
      rotation: [0, 0, 0] # Vector3 (in radians)
      # Animation
      animation:
        enabled: true
        type: rotate # 'rotate' | 'bounce' | 'float' | 'custom'
        speed: 1.0
        axis: [0, 1, 0] # Rotation axis for rotate type
        amplitude: 0.1 # For bounce/float types
        frequency: 1.0 # For bounce/float types
      # Model materials (supports theme variation)
      materials:
        - name: material1
          type: MeshStandardMaterial
          color:
            light: [1.0, 1.0, 1.0]
            dark: [0.8, 0.8, 0.8]
            value: [1.0, 1.0, 1.0]
          metalness: 0.5
          roughness: 0.5
          # Custom shader material (optional, supports theme variation)
          shader:
            enabled: false
            vertex: |
              // Custom vertex shader
            fragment: |
              // Custom fragment shader
            uniforms:
              uTime:
                type: float
                value: 0
              uColor:
                type: vec3
                light: [1.0, 1.0, 1.0]
                dark: [0.8, 0.8, 0.8]
                value: [1.0, 1.0, 1.0]
      # Lighting (supports theme variation)
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
        directional:
          color:
            light: [1.0, 1.0, 1.0]
            dark: [0.8, 0.8, 0.9]
            value: [1.0, 1.0, 1.0]
          intensity:
            light: 1.0
            dark: 1.2
            value: 1.0
          position: [5, 5, 5]
        point:
          enabled: false
          color:
            light: [1.0, 1.0, 1.0]
            dark: [1.0, 0.9, 0.8]
            value: [1.0, 1.0, 1.0]
          intensity: 1.0
          position: [0, 0, 0]
      # Camera
      camera:
        type: perspective # 'perspective' | 'orthographic'
        fov: 50
        near: 0.1
        far: 1000
        position: [0, 0, 5]
        target: [0, 0, 0]
      # Interaction
      interaction:
        enabled: true
        rotate: true
        zoom: true
        pan: false
        autoRotate: true
        autoRotateSpeed: 1.0
    # Motion Vue animation
    motion:
      enabled: true
      type: fadeIn
      duration: 0.8
      delay: 0.2
      hover:
        enabled: true
        scale: 1.02
        duration: 0.3
  
  # Hero Actions
  actions:
    - theme: brand
      text: "Get Started"
      link: /en-US/guide/getting-started
      # Button styling (overrides global button styles)
      style:
        variant: filled # 'filled' | 'outlined' | 'text' | 'ghost'
        outline: true # Show outline border
        outlineWidth: 2px
        outlineColor: rgba(102,126,234,1)
        borderRadius: 8px
        padding: 14px 28px
        # No box-shadow by default
        boxShadow: none
        # Hover effects
        hover:
          enabled: true
          # 3D tilt effect (similar to Framer Motion example)
          tilt3D:
            enabled: true
            intensity: 15 # Rotation intensity in degrees
            perspective: 1000px
            transition:
              stiffness: 300
              damping: 30
          # Other hover effects
          scale: 1.05
          outlineColor: rgba(118,75,162,1)
          backgroundColor: rgba(102,126,234,0.9)
    - theme: alt
      text: "Features"
      link: /en-US/guide/features
      style:
        variant: outlined
        outline: true
        outlineWidth: 2px
        outlineColor: rgba(118,75,162,1)
        boxShadow: none
  
  # Hero Snippets (existing feature)
  snippets: []
  customSnippet: false

features:
  # Enhanced features with image/video support
  - icon: 📝
    title: "Markdown Enhancement"
    details: "Supports rich Markdown extensions such as containers, code groups, math formulas, and Mermaid diagrams"
    # Image support (supports URLs)
    image:
      src: /images/feature-markdown.jpg # or https://example.com/feature-markdown.jpg
      alt: Markdown Enhancement
      position: top # 'top' | 'bottom' | 'left' | 'right'
      width: 300
      height: 200
    # Video support (supports URLs)
    video:
      src: /videos/feature-markdown.mp4 # or https://example.com/feature-markdown.mp4
      poster: /images/feature-markdown-poster.jpg # or https://example.com/poster.jpg
      autoplay: false
      loop: true
      muted: true
      position: top
    # Hover 3D effect
    hover3D:
      enabled: true
      intensity: 10
      perspective: 1000px
  - icon: 🌍
    title: "Multilingual Support"
    details: "Built-in support for English and Chinese, easily extendable to more languages"
    image:
      src: /images/feature-i18n.jpg
      alt: Multilingual Support
  - icon: 🎨
    title: "Modern Theme"
    details: "Integrated with Vuetify component library, providing beautiful UI components"
    video:
      src: /videos/feature-theme.mp4
      poster: /images/feature-theme-poster.jpg
      position: bottom
---
```

## Background Configuration Modes

### Single Layer Mode

**Use Case**: Simple backgrounds with one layer.

**Configuration**:
```yaml
background:
  mode: single # or omit mode and just specify type
  type: color
  color:
    gradient:
      enabled: true
      # ... color config
```

**Benefits**:
- Simpler syntax for single-layer backgrounds
- Less verbose
- Easier to understand for basic use cases

### Multi-Layer Mode

**Use Case**: Complex backgrounds with multiple layers, blending effects, and layer-specific animations.

**Configuration**:
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

**Benefits**:
- Full control over layer stacking (zIndex)
- Per-layer blend modes
- Per-layer animations
- More flexible composition

**Type Safety Design** (TypeScript):
```typescript
// Discriminated union for type safety
type BackgroundLayer =
  | { type: 'image'; image: ImageConfig; opacity?: number; zIndex?: number; blend?: string; animations?: LayerAnimations }
  | { type: 'video'; video: VideoConfig; opacity?: number; zIndex?: number; blend?: string; animations?: LayerAnimations }
  | { type: 'color'; color: ColorConfig; opacity?: number; zIndex?: number; blend?: string; animations?: LayerAnimations }
  | { type: 'shader'; shader: ShaderConfig; opacity?: number; zIndex?: number; blend?: string; animations?: LayerAnimations }
  | { type: 'particles'; particles: ParticleConfig; opacity?: number; zIndex?: number; blend?: string; animations?: LayerAnimations };

type BackgroundConfig =
  | { mode: 'single'; type: 'image' | 'video' | 'color' | 'shader' | 'particles' | 'none'; /* ... single config */ }
  | { mode: 'layers'; layers: BackgroundLayer[]; /* ... global config */ };
```

**Auto-Detection Logic**:
- If `layers` array is provided → automatically use `mode: 'layers'`
- If `type` is provided → automatically use `mode: 'single'`
- If both are provided → `layers` takes precedence

## Features

### 1. Animated Sea Waves (Enhancement System)

**Technology**: TresJS/Three.js

**Description**: Realistic animated sea waves using Three.js geometry and shaders. **Waves are NOT a background type** - they are a separate enhancement system that can be enabled/disabled independently and always render on top of all background layers.

**Key Characteristics**:
- Separate from background configuration
- Can be enabled/disabled via `waves.enabled`
- Always rendered on top (z-index: 1000)
- Works with any background type (image, video, color, shader, particles)

**Configuration**:
- Multiple wave layers with independent properties
- Configurable height, speed, frequency, color, and opacity
- Bidirectional wave movement
- Smooth animation loop

**Implementation Notes**:
- Use `PlaneGeometry` with sufficient segments for smooth waves
- Apply sine/cosine functions for wave motion
- Use shader materials for realistic water appearance
- Optimize performance with appropriate segment counts
- Render in separate layer above background

### 2. Background System

#### 2.1 Image Background

**Features**:
- Light/dark theme support
- Configurable opacity, blur, scale, position
- Parallax scrolling effect
- Motion Vue animations

#### 2.2 Video Background

**Features**:
- Light/dark theme support
- Autoplay, loop, mute controls
- Poster image support
- Parallax scrolling effect
- Motion Vue animations

#### 2.3 Color Background

**Features**:
- Solid colors with theme support
- Linear, radial, and conic gradients
- Animated gradients (flow, rotate, pulse)
- Multiple color stops

#### 2.4 Shader Background

**Technology**: TresJS/Three.js with GLSL shaders

**API Support**: ✅ **Yes, fully supported** using:
- `TresCanvas` - Root container
- `TresShaderMaterial` - Shader material component
- `useRenderLoop` - Real-time uniform updates
- `useTres` - Scene/renderer access
- Direct Three.js `ShaderMaterial` API

**Features**:
- Pre-built shader types (water, noise, galaxy, plasma, ripple)
- Custom shader support (vertex and fragment)
- Configurable uniforms
- Real-time shader parameter updates
- **Theme variation support**: All shader colors and uniforms support light/dark theme variants

**Theme Variation**:
- Uniform colors can have `light` and `dark` variants
- Shader-specific color properties support theme variation
- Automatically switches based on current theme
- Falls back to `value` if theme-specific value not provided

**Shader Types**:
- **Water**: Animated water surface with reflections (theme-aware colors)
- **Noise**: Procedural noise patterns (theme-aware colors)
- **Galaxy**: Starfield/galaxy effect (theme-aware particle colors)
- **Plasma**: Colorful plasma effect (theme-aware color palettes)
- **Ripple**: Ripple/wave distortion effect (theme-aware colors)

**Implementation Example** (TresJS with extend API):
```vue
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { TresCanvas, useRenderLoop, useTres, extend } from '@tresjs/core';
import { ShaderMaterial } from 'three';
import { useData } from 'vitepress';

// IMPORTANT: Extend TresJS to support ShaderMaterial
extend({ ShaderMaterial });

const props = defineProps<{
  config: ShaderConfig;
}>();

const { isDark } = useData();

// Shader code
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uSpeed;
  varying vec2 vUv;
  
  void main() {
    float t = sin(uTime * uSpeed + vUv.x * 10.0) * 0.5 + 0.5;
    vec3 color = mix(uColor1, uColor2, t);
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Theme-aware uniforms
const uniforms = computed(() => {
  const color1 = props.config.uniforms?.uColor1;
  const color2 = props.config.uniforms?.uColor2;
  
  return {
    uTime: { value: 0 },
    uSpeed: { value: props.config.uniforms?.uSpeed?.value || 1.0 },
    uColor1: {
      value: isDark.value && color1?.dark
        ? new Vector3(...color1.dark)
        : new Vector3(...(color1?.light || color1?.value || [0.2, 0.4, 0.8]))
    },
    uColor2: {
      value: isDark.value && color2?.dark
        ? new Vector3(...color2.dark)
        : new Vector3(...(color2?.light || color2?.value || [0.8, 0.4, 0.2]))
    },
  };
});

// Update uniforms in render loop
const { onLoop } = useRenderLoop();

onLoop(({ elapsed }) => {
  uniforms.value.uTime.value = elapsed;
});

// Watch theme changes
watch(isDark, () => {
  // Update color uniforms when theme changes
  const color1 = props.config.uniforms?.uColor1;
  const color2 = props.config.uniforms?.uColor2;
  
  uniforms.value.uColor1.value = isDark.value && color1?.dark
    ? new Vector3(...color1.dark)
    : new Vector3(...(color1?.light || color1?.value || [0.2, 0.4, 0.8]));
    
  uniforms.value.uColor2.value = isDark.value && color2?.dark
    ? new Vector3(...color2.dark)
    : new Vector3(...(color2?.light || color2?.value || [0.8, 0.4, 0.2]));
});
</script>

<template>
  <TresCanvas
    clear-color="transparent"
    :alpha="true"
    window-size
    class="shader-background"
  >
    <TresOrthographicCamera :position="[0, 0, 1]" />
    <TresMesh>
      <TresPlaneGeometry :args="[2, 2, 1, 1]" />
      <!-- TresShaderMaterial is available after extending ShaderMaterial -->
      <TresShaderMaterial
        :vertex-shader="vertexShader"
        :fragment-shader="fragmentShader"
        :uniforms="uniforms"
        :transparent="true"
      />
    </TresMesh>
  </TresCanvas>
</template>
```

**Alternative: Direct Three.js API** (without TresJS components):
```typescript
import { ShaderMaterial, PlaneGeometry, Mesh, Vector3 } from 'three';
import { useRenderLoop, useTres } from '@tresjs/core';

const material = new ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new Vector3(0.2, 0.4, 0.8) },
    uColor2: { value: new Vector3(0.8, 0.4, 0.2) },
  },
});

const geometry = new PlaneGeometry(2, 2);
const mesh = new Mesh(geometry, material);

const { scene } = useTres();
scene.value.add(mesh);

const { onLoop } = useRenderLoop();
onLoop(({ elapsed }) => {
  material.uniforms.uTime.value = elapsed;
});
```

**Alternative: Direct Three.js API**:
```typescript
import { ShaderMaterial, PlaneGeometry, Mesh, Vector3 } from 'three';
import { useRenderLoop, useTres } from '@tresjs/core';

const material = new ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new Vector3(0.2, 0.4, 0.8) },
    uColor2: { value: new Vector3(0.8, 0.4, 0.2) },
  },
});

const geometry = new PlaneGeometry(2, 2);
const mesh = new Mesh(geometry, material);

const { scene } = useTres();
scene.value.add(mesh);

const { onLoop } = useRenderLoop();
onLoop(({ elapsed }) => {
  material.uniforms.uTime.value = elapsed;
});
```

**Shader Template Integration**:
```typescript
import { getShaderTemplate } from '../../../config/shaders';
import { useRenderLoop } from '@tresjs/core';

const template = getShaderTemplate('my-custom-shader');
if (template) {
  const uniforms = {
    ...template.uniforms,
    // Override with frontmatter values
    ...props.config.uniforms,
  };
  
  // Use template shader code
  const vertexShader = template.vertex;
  const fragmentShader = template.fragment;
}
```

### 3. Particle System

**Technology**: TresJS/Three.js

**Features**:
- Multiple particle types (snow, stars, bubbles, sparks)
- Custom particle shapes and textures (supports URLs)
- Configurable movement, speed, direction, gravity
- Particle lifecycle management
- Custom particle shaders
- Motion Vue integration
- **Theme variation support**: Particle colors and opacity support light/dark theme variants

**Theme Variation**:
- Particle colors can have `light` and `dark` variants
- Particle opacity supports theme variation
- Texture URLs can be theme-specific
- Automatically switches based on current theme

**Particle Types**:
- **Snow**: Falling snowflakes (theme-aware colors)
- **Stars**: Twinkling stars (theme-aware brightness)
- **Bubbles**: Floating bubbles (theme-aware colors)
- **Sparks**: Sparkle effects (theme-aware colors)

### 4. 3D Model Support

**Technology**: TresJS/Three.js with GLTF/GLB loader

**Features**:
- Support for .glb and .gltf formats (supports URLs)
- Model scaling, positioning, rotation
- Material customization with theme variation
- Custom shader materials with theme variation
- Multiple animation types (rotate, bounce, float)
- Interactive controls (rotate, zoom, pan)
- Auto-rotation
- Configurable lighting (ambient, directional, point) with theme variation
- Camera controls

**URL Support**:
- Models can be loaded from URLs: `https://example.com/model.glb`
- Supports both local paths and remote URLs
- Automatic format detection (.glb, .gltf)

**Theme Variation**:
- Material colors support light/dark variants
- Lighting colors and intensity support theme variation
- Shader uniforms support theme variation
- Automatically adapts to current theme

**Animation Types**:
- **Rotate**: Continuous rotation around axis
- **Bounce**: Vertical bouncing motion
- **Float**: Floating/hovering motion
- **Custom**: User-defined animation

### 5. Motion Vue Integration

**Features**:
- Fade-in animations for all elements
- Slide animations (up, down, left, right)
- Zoom animations
- Staggered animations for multiple elements
- Hover animations
- Scroll-triggered animations
- 3D tilt hover effects (inspired by Framer Motion)

**Animation Types**:
- `fadeIn`: Fade in effect
- `slideUp`: Slide up from bottom
- `slideDown`: Slide down from top
- `zoomIn`: Zoom in effect
- `none`: No animation

### 6. Background Animations

**Technology**: CSS Animations + Motion Vue

**Animation Types**:

#### 6.1 Parallax Effect

**Description**: Creates depth by moving background layers at different speeds based on scroll or mouse position.

**Configuration**:
```yaml
animations:
  parallax:
    enabled: true
    intensity: 0.5 # Movement intensity (0-1)
    direction: vertical # 'vertical' | 'horizontal' | 'both'
    smoothness: 0.1 # Smoothing factor (0-1)
```

**Implementation Logic**:
```typescript
// Pseudocode for parallax effect
const handleParallax = (event: MouseEvent | ScrollEvent) => {
  const { clientX, clientY } = event;
  const { offsetWidth, offsetHeight } = container;
  
  const xPercent = (clientX / offsetWidth - 0.5) * 2;
  const yPercent = (clientY / offsetHeight - 0.5) * 2;
  
  const xOffset = xPercent * intensity * smoothness;
  const yOffset = yPercent * intensity * smoothness;
  
  element.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
};
```

#### 6.2 Blur Effect

**Description**: Applies blur filter with optional animation (pulse, wave, breath).

**Configuration**:
```yaml
animations:
  blur:
    enabled: true
    amount: 5 # Blur amount in pixels
    animation:
      enabled: true
      type: pulse # 'pulse' | 'wave' | 'breath' | 'none'
      duration: 2s
      minAmount: 0
      maxAmount: 10
      easing: ease-in-out
```

**Implementation Logic**:
```typescript
// Pseudocode for animated blur
const blurAnimation = () => {
  const progress = (Date.now() % duration) / duration;
  const amount = minAmount + (maxAmount - minAmount) * easingFunction(progress);
  element.style.filter = `blur(${amount}px)`;
  requestAnimationFrame(blurAnimation);
};
```

#### 6.3 Bounce Effect

**Description**: Creates a subtle bouncing animation for background elements.

**Configuration**:
```yaml
animations:
  bounce:
    enabled: true
    intensity: 0.1 # Bounce intensity (0-1)
    duration: 3s
    easing: ease-in-out
    direction: vertical # 'vertical' | 'horizontal' | 'both'
```

**Implementation Logic**:
```typescript
// Pseudocode for bounce effect
const bounceAnimation = () => {
  const progress = (Date.now() % duration) / duration;
  const offset = Math.sin(progress * Math.PI * 2) * intensity;
  element.style.transform = `translateY(${offset}px)`;
  requestAnimationFrame(bounceAnimation);
};
```

### 7. 3D Hover Effects

**Technology**: Motion Vue (similar to Framer Motion)

**Description**: Creates 3D tilt effect on hover, inspired by Framer Motion's card component.

**Configuration**:
```yaml
hover3D:
  enabled: true
  intensity: 15 # Rotation intensity in degrees
  perspective: 1000px
  transition:
    stiffness: 300
    damping: 30
```

**Implementation Logic** (Vue 3 + Motion Vue):
```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion-v';

const props = defineProps<{
  intensity?: number;
  perspective?: string;
}>();

const cardRef = ref<HTMLElement | null>(null);
const x = useMotionValue(0);
const y = useMotionValue(0);

const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value) return;
  
  const rect = cardRef.value.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  
  const mouseX = (e.clientX - rect.left) * 32.5;
  const mouseY = (e.clientY - rect.top) * 32.5;
  
  const rX = (mouseY / height - 32.5 / 2) * -1;
  const rY = mouseX / width - 32.5 / 2;
  
  x.set(rX * (props.intensity || 15) / 15);
  y.set(rY * (props.intensity || 15) / 15);
};

const handleMouseLeave = () => {
  x.set(0);
  y.set(0);
};
</script>

<template>
  <motion.div
    ref="cardRef"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    :style="{
      transformStyle: 'preserve-3d',
      perspective: props.perspective || '1000px',
      transform,
    }"
  >
    <slot />
  </motion.div>
</template>
```

### 8. Button Styling System

**Description**: Organized button styles with consistent outline and no default box-shadow.

**Style Variants**:
- `filled`: Solid background color
- `outlined`: Transparent background with border
- `text`: Text-only button
- `ghost`: Subtle background on hover

**Configuration**:
```yaml
style:
  variant: filled # 'filled' | 'outlined' | 'text' | 'ghost'
  outline: true # Show outline border
  outlineWidth: 2px
  outlineColor: rgba(102,126,234,1)
  borderRadius: 8px
  padding: 14px 28px
  boxShadow: none # No box-shadow by default
  hover:
    enabled: true
    tilt3D:
      enabled: true
      intensity: 15
```

**CSS Structure** (`.vitepress/theme/styles/hero/buttons.css`):
```css
.hero-button {
  /* Base styles */
  border-radius: var(--button-border-radius, 8px);
  padding: var(--button-padding, 14px 28px);
  border: var(--button-outline-width, 2px) solid var(--button-outline-color);
  box-shadow: none; /* No box-shadow by default */
  transition: all 0.3s ease;
}

.hero-button--filled {
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
}

.hero-button--outlined {
  background-color: transparent;
  color: var(--button-text-color);
}

.hero-button--text {
  background-color: transparent;
  border: none;
  color: var(--button-text-color);
}

.hero-button--ghost {
  background-color: transparent;
  border: var(--button-outline-width, 2px) solid transparent;
}

.hero-button--ghost:hover {
  background-color: var(--button-bg-color-hover);
}
```

### 9. Features Enhancement

**Description**: Features section now supports images and videos with text overlays. All media supports URLs.

**Configuration**:
```yaml
features:
  - icon: 📝
    title: "Feature Title"
    details: "Feature description"
    # Image support (supports URLs)
    image:
      src: /images/feature.jpg # or https://example.com/feature.jpg
      alt: Feature Image
      position: top # 'top' | 'bottom' | 'left' | 'right'
      width: 300
      height: 200
    # Video support (supports URLs)
    video:
      src: /videos/feature.mp4 # or https://example.com/feature.mp4
      poster: /images/feature-poster.jpg # or https://example.com/poster.jpg
      autoplay: false
      loop: true
      muted: true
      position: top
    # Hover 3D effect
    hover3D:
      enabled: true
      intensity: 10
```

**URL Support**:
- All image sources support URLs
- All video sources support URLs
- Poster images support URLs
- Automatic detection of local vs remote resources

### 10. Shader Template System

**Description**: Register custom shader templates in TypeScript for reuse.

**Template Registration** (`.vitepress/config/shaders/my-custom-shader.ts`):
```typescript
import type { ShaderTemplate } from './types';

export const myCustomShader: ShaderTemplate = {
  name: 'my-custom-shader',
  vertex: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragment: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;
    
    void main() {
      float t = sin(uTime + vUv.x * 10.0) * 0.5 + 0.5;
      vec3 color = mix(uColor1, uColor2, t);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  uniforms: {
    uTime: { type: 'float', value: 0 },
    uColor1: { type: 'vec3', value: [0.2, 0.4, 0.8] },
    uColor2: { type: 'vec3', value: [0.8, 0.4, 0.2] },
  },
  defaultConfig: {
    uSpeed: 1.0,
  },
};
```

**Shader Registry** (`.vitepress/config/shaders/index.ts`):
```typescript
import { myCustomShader } from './my-custom-shader';
import { waterShader } from './water';
import { noiseShader } from './noise';
// ... other shaders

export const shaderRegistry = new Map<string, ShaderTemplate>([
  ['my-custom-shader', myCustomShader],
  ['water', waterShader],
  ['noise', noiseShader],
  // ... register other shaders
]);

export function getShaderTemplate(name: string): ShaderTemplate | null {
  return shaderRegistry.get(name) || null;
}

export function registerShaderTemplate(name: string, template: ShaderTemplate): void {
  shaderRegistry.set(name, template);
}
```

**Usage in Frontmatter**:
```yaml
shader:
  enabled: true
  type: template:my-custom-shader
  uniforms:
    uTime:
      type: float
      value: 0
    uColor1:
      type: vec3
      value: [0.2, 0.4, 0.8]
```

### 11. Internationalization (i18n) Support

**Description**: All Vue components support i18n through the `useSafeI18n` composable from the utils system.

**i18n System Location**: `.vitepress/utils/i18n/locale/`

**Composable Usage**:
```typescript
import { useSafeI18n } from '../../../utils/i18n/locale';

const { t } = useSafeI18n('hero-component', {
  getStarted: 'Get Started',
  features: 'Features',
  tagline: 'A modern documentation template',
  // ... default translations
});
```

**Translation File Structure**:
Translation files are located at `.vitepress/config/locale/{lang}/components/{componentPath}.json`

**Example Translation File** (`.vitepress/config/locale/en-US/components/hero/VPHero.json`):
```json
{
  "getStarted": "Get Started",
  "features": "Features",
  "tagline": "A modern documentation template built with VitePress"
}
```

**Example Translation File** (`.vitepress/config/locale/zh-CN/components/hero/VPHero.json`):
```json
{
  "getStarted": "快速开始",
  "features": "功能",
  "tagline": "基于 VitePress 构建的现代化文档模板"
}
```

**Component ID Mapping**:
Component IDs are mapped to file paths in `.vitepress/config/locale/component-id-mapping.json`:
```json
{
  "generatedAt": "2024-01-01T00:00:00.000Z",
  "description": "Component ID to file path mapping",
  "mappings": {
    "hero-component": "hero/VPHero",
    "hero-background": "hero/background/HeroBackground",
    "hero-actions": "hero/content/HeroActions"
  }
}
```

**Usage in Component**:
```vue
<script setup lang="ts">
import { useSafeI18n } from '../../../utils/i18n/locale';

const { t } = useSafeI18n('hero-component', {
  getStarted: 'Get Started',
  features: 'Features',
  tagline: 'A modern documentation template',
});

// Access translations
const buttonText = t.getStarted; // Returns translated or default value
</script>

<template>
  <button>{{ t.getStarted }}</button>
</template>
```

**Key Features**:
- Automatic language detection from URL or VitePress context
- Fallback to default translations if translation file not found
- Reactive translations that update on language change
- Component-scoped translations (each component has its own translation file)
- Type-safe translations with TypeScript

## Component Structure

### Folder Organization

All Vue components are organized in `.vitepress/theme/components/hero/` with the following structure:

```
hero/
├── VPHero.vue                    # Main component (< 500 lines)
├── background/                    # Background-related components
│   ├── HeroBackground.vue         # Main background manager (< 500 lines)
│   ├── BackgroundLayer.vue        # Individual layer wrapper (< 500 lines)
│   ├── ImageBackground.vue        # Image background (< 500 lines)
│   ├── VideoBackground.vue        # Video background (< 500 lines)
│   ├── ColorBackground.vue       # Color/gradient background (< 500 lines)
│   ├── ShaderBackground.vue       # Shader background (< 500 lines)
│   └── ParticleSystem.vue         # Particle system (< 500 lines)
├── waves/                         # Wave system (separate from layers)
│   ├── WaveAnimation.vue          # Main wave animation (< 500 lines)
│   └── WaveLayer.vue              # Individual wave layer (< 500 lines)
├── content/                       # Content components
│   ├── HeroContent.vue            # Content wrapper (< 500 lines)
│   ├── HeroTitle.vue              # Title component (< 500 lines)
│   ├── HeroTagline.vue            # Tagline component (< 500 lines)
│   └── HeroActions.vue             # Actions/buttons (< 500 lines)
├── image/                         # Image/media components
│   ├── HeroImage.vue              # Main image wrapper (< 500 lines)
│   ├── ImageDisplay.vue           # Image display (< 500 lines)
│   ├── VideoDisplay.vue            # Video display (< 500 lines)
│   ├── GifDisplay.vue              # GIF display (< 500 lines)
│   └── Model3D.vue                 # 3D model display (< 500 lines)
└── effects/                       # Animation effects
    ├── ParallaxEffect.vue         # Parallax composable wrapper (< 500 lines)
    ├── BlurEffect.vue             # Blur effect (< 500 lines)
    ├── BounceEffect.vue            # Bounce effect (< 500 lines)
    └── Hover3DEffect.vue           # 3D hover effect (< 500 lines)
```

### Component Details

#### VPHero.vue

**Location**: `.vitepress/theme/components/hero/VPHero.vue`

**Responsibility**: Main hero component that orchestrates all sub-components.

**Props**:
- `config`: Hero configuration object from frontmatter

**Key Features**:
- i18n support via `useHeroI18n()`
- Responsive layout handling
- Component composition
- < 500 lines of code

**Example Structure**:
```vue
<script setup lang="ts">
import { useData } from 'vitepress';
import { useSafeI18n } from '../../../utils/i18n/locale';
import HeroBackground from './background/HeroBackground.vue';
import WaveAnimation from './waves/WaveAnimation.vue';
import HeroContent from './content/HeroContent.vue';
import HeroImage from './image/HeroImage.vue';

const { t } = useSafeI18n('hero-component', {
  getStarted: 'Get Started',
  features: 'Features',
  tagline: 'A modern documentation template',
});

const { frontmatter } = useData();
</script>

<template>
  <div class="vp-hero">
    <HeroBackground :config="frontmatter.hero.background" />
    <WaveAnimation :config="frontmatter.hero.waves" />
    <HeroContent :config="frontmatter.hero" />
    <HeroImage :config="frontmatter.hero.image" />
  </div>
</template>
```

#### HeroBackground.vue

**Location**: `.vitepress/theme/components/hero/background/HeroBackground.vue`

**Responsibility**: Manages all background layers and effects.

**Props**:
- `config`: Background configuration object (supports both single and multi-layer modes)

**Components**:
- `BackgroundLayer.vue`: Individual background layer
- `ParticleSystem.vue`: Particle effects

**Key Features**:
- Auto-detects configuration mode (single vs layers)
- Layer composition and blending
- Animation orchestration (parallax, blur, bounce)
- Performance optimization
- Type-safe layer handling
- < 500 lines of code

**Implementation Logic**:
```typescript
// Type definitions for type safety
type BackgroundLayerType = 'image' | 'video' | 'color' | 'shader' | 'particles';

interface BaseLayer {
  opacity?: number;
  zIndex?: number;
  blend?: string;
  animations?: LayerAnimations;
}

type BackgroundLayer =
  | ({ type: 'image' } & ImageConfig & BaseLayer)
  | ({ type: 'video' } & VideoConfig & BaseLayer)
  | ({ type: 'color' } & ColorConfig & BaseLayer)
  | ({ type: 'shader' } & ShaderConfig & BaseLayer)
  | ({ type: 'particles' } & ParticleConfig & BaseLayer);

type BackgroundConfig =
  | { mode: 'single'; type: BackgroundLayerType | 'none'; /* ... single config */ }
  | { mode: 'layers'; layers: BackgroundLayer[]; /* ... global config */ }
  | { type: BackgroundLayerType; /* ... single config */ } // Auto-detected as 'single'
  | { layers: BackgroundLayer[]; /* ... global config */ }; // Auto-detected as 'layers'

// Component logic
const detectMode = (config: BackgroundConfig): 'single' | 'layers' => {
  if ('layers' in config && Array.isArray(config.layers)) {
    return 'layers';
  }
  if ('mode' in config) {
    return config.mode;
  }
  return 'single';
};

const normalizeConfig = (config: BackgroundConfig) => {
  const mode = detectMode(config);
  
  if (mode === 'layers') {
    // Sort layers by zIndex
    const layers = (config as any).layers.sort((a: BackgroundLayer, b: BackgroundLayer) => 
      (a.zIndex || 0) - (b.zIndex || 0)
    );
    return { mode: 'layers', layers };
  }
  
  // Convert single mode to layer format for unified rendering
  return {
    mode: 'single',
    layers: [{
      type: (config as any).type,
      ...(config as any),
      zIndex: 1,
    }],
  };
};
```

#### WaveAnimation.vue

**Location**: `.vitepress/theme/components/hero/waves/WaveAnimation.vue`

**Responsibility**: Renders animated sea waves using TresJS. **Always rendered on top of background layers.**

**Props**:
- `config`: Wave configuration object

**Key Features**:
- Multiple wave layers via `WaveLayer.vue`
- Shader-based rendering
- Performance optimization
- Separate z-index management (always on top)
- < 500 lines of code

**Important**: Waves are NOT a background type and NOT part of background layers. They are a separate enhancement system that can be enabled/disabled independently and always renders above all background content.

#### BackgroundLayer.vue

**Location**: `.vitepress/theme/components/hero/background/BackgroundLayer.vue`

**Responsibility**: Wrapper for individual background layers (image, video, color, shader, particles).

**Props**:
- `layer`: Complete layer configuration object (discriminated union based on type)
- `globalAnimations`: Global animation config (can be overridden by layer-specific animations)

**Key Features**:
- Type-based component rendering using discriminated unions
- Animation effects (parallax, blur, bounce) with layer-specific overrides
- Motion Vue integration
- Blend mode support
- zIndex-based stacking
- < 500 lines of code

**Type-Safe Rendering**:
```vue
<script setup lang="ts">
import { computed } from 'vue';
import ImageBackground from './ImageBackground.vue';
import VideoBackground from './VideoBackground.vue';
import ColorBackground from './ColorBackground.vue';
import ShaderBackground from './ShaderBackground.vue';
import ParticleSystem from './ParticleSystem.vue';

const props = defineProps<{
  layer: BackgroundLayer;
  globalAnimations?: GlobalAnimations;
}>();

const layerComponent = computed(() => {
  switch (props.layer.type) {
    case 'image':
      return ImageBackground;
    case 'video':
      return VideoBackground;
    case 'color':
      return ColorBackground;
    case 'shader':
      return ShaderBackground;
    case 'particles':
      return ParticleSystem;
    default:
      return null;
  }
});

const effectiveAnimations = computed(() => ({
  ...props.globalAnimations,
  ...props.layer.animations, // Layer-specific overrides
}));
</script>

<template>
  <component
    :is="layerComponent"
    v-if="layerComponent"
    :config="layer"
    :animations="effectiveAnimations"
    :style="{
      opacity: layer.opacity ?? 1,
      zIndex: layer.zIndex ?? 1,
      mixBlendMode: layer.blend ?? 'normal',
    }"
  />
</template>
```

#### HeroActions.vue

**Location**: `.vitepress/theme/components/hero/content/HeroActions.vue`

**Responsibility**: Renders action buttons with organized styling.

**Props**:
- `actions`: Array of action configurations

**Key Features**:
- Button style variants (filled, outlined, text, ghost)
- Consistent outline styling
- No default box-shadow
- 3D hover effects
- i18n support
- < 500 lines of code

**Button Style Logic**:
```vue
<script setup lang="ts">
import { computed } from 'vue';
import { useSafeI18n } from '../../../utils/i18n/locale';
import Hover3DEffect from '../effects/Hover3DEffect.vue';

const props = defineProps<{
  actions: HeroAction[];
}>();

const { t } = useSafeI18n('hero-actions', {
  getStarted: 'Get Started',
  features: 'Features',
  // ... other button texts
});

const getButtonClass = (action: HeroAction) => {
  const variant = action.style?.variant || 'filled';
  return `hero-button hero-button--${variant}`;
};

const getButtonStyle = (action: HeroAction) => {
  const style = action.style || {};
  return {
    borderRadius: style.borderRadius || '8px',
    padding: style.padding || '14px 28px',
    borderWidth: style.outlineWidth || '2px',
    borderColor: style.outlineColor || 'rgba(102,126,234,1)',
    boxShadow: style.boxShadow || 'none',
  };
};

const getButtonText = (action: HeroAction) => {
  // Try to get translation, fallback to provided text
  const translationKey = action.text.toLowerCase().replace(/\s+/g, '');
  return t[translationKey] || action.text;
};
</script>

<template>
  <div class="hero-actions">
    <Hover3DEffect
      v-for="(action, index) in actions"
      :key="index"
      :intensity="action.style?.hover?.tilt3D?.intensity || 15"
    >
      <VPButton
        :class="getButtonClass(action)"
        :style="getButtonStyle(action)"
        :theme="action.theme"
        :text="getButtonText(action)"
        :href="action.link"
      />
    </Hover3DEffect>
  </div>
</template>
```

#### Hover3DEffect.vue

**Location**: `.vitepress/theme/components/hero/effects/Hover3DEffect.vue`

**Responsibility**: Provides 3D tilt hover effect (inspired by Framer Motion).

**Props**:
- `intensity`: Rotation intensity (default: 15)
- `perspective`: CSS perspective value (default: '1000px')

**Key Features**:
- Motion Vue integration
- Spring physics for smooth animation
- Mouse position tracking
- < 500 lines of code

**Implementation**: See "3D Hover Effects" section above for full code example.

#### Model3D.vue

**Location**: `.vitepress/theme/components/hero/image/Model3D.vue`

**Responsibility**: Renders 3D models using TresJS.

**Key Features**:
- GLTF/GLB loading
- Model animation
- Material customization
- Interactive controls
- Lighting setup
- i18n support
- < 500 lines of code

## Implementation Guidelines

### 1. TresJS Setup

**Installation**:
```bash
yarn add @tresjs/core three
yarn add -D @types/three
```

**VitePress Configuration**:
- Register TresJS plugin in `.vitepress/config.mts`
- Configure Vite to handle Three.js properly

### 2. Component Development

**Best Practices**:
- Use Vue 3 Composition API
- Keep components under 500 lines
- Implement proper cleanup in `onUnmounted`
- Optimize Three.js rendering (requestAnimationFrame)
- Use reactive refs for Three.js objects
- Implement error handling for asset loading
- Support i18n via `useSafeI18n()` from `utils/i18n/locale`
- Extract complex logic into utils functions
- Use TypeScript for type safety
- Follow project's utils structure pattern

**Utils Structure Pattern**:
Following the project's established pattern:
- Utils are located in `.vitepress/utils/`
- Each category has its own subdirectory (e.g., `i18n/`, `config/`, `content/`)
- Each subdirectory has an `index.ts` that exports utilities
- Main `utils/index.ts` aggregates all utilities
- Composables/functions follow naming: `use{Name}.ts` or `{name}.ts`

**Component Import Patterns**:
```typescript
// From theme/components/hero/background/HeroBackground.vue
import { useSafeI18n } from '../../../utils/i18n/locale'; // 3 levels up
import { useParallax } from '../../../utils/hero/useParallax';
import { getProjectInfo } from '../../../config/project-config';
```

**Component Size Management**:
- If a component exceeds 500 lines, split into smaller sub-components
- Extract reusable logic into utils functions
- Move complex calculations to utility functions
- Use slots for flexible content composition

**Example: Splitting Large Component**:
```typescript
// Before: HeroBackground.vue (600+ lines)
// After: Split into:
// - HeroBackground.vue (200 lines) - Main orchestrator
// - BackgroundLayerManager.vue (150 lines) - Layer management
// - BackgroundAnimationController.vue (150 lines) - Animation logic
// - utils/hero/useBackgroundAnimation.ts (100 lines) - Reusable logic
```

**Translation File Organization**:
- Translation files: `.vitepress/config/locale/{lang}/components/{componentPath}.json`
- Component path mirrors component file structure
- Example: `theme/components/hero/VPHero.vue` → `config/locale/en-US/components/hero/VPHero.json`
- Component IDs mapped in `config/locale/component-id-mapping.json`

### 3. Performance Optimization

**Strategies**:
- Lazy load 3D models and heavy assets
- Use appropriate geometry segment counts
- Implement frustum culling
- Optimize particle counts
- Use instanced rendering for particles
- Implement level-of-detail (LOD) for models

### 4. Composables and Utils

**Location**: `.vitepress/utils/` (following project structure)

**Utils Organization**:
- `utils/i18n/` - Internationalization utilities
- `utils/config/` - Configuration utilities
- `utils/content/` - Content processing utilities
- `utils/vitepress/` - VitePress-specific utilities
- `utils/charts/` - Chart utilities

**Available Composables** (to be created in `utils/` or as reusable functions):

#### useSafeI18n (from utils/i18n/locale)

**Purpose**: Provides i18n translation function for hero components using the project's i18n system.

**Location**: `.vitepress/utils/i18n/locale/index.ts`

**Usage**:
```typescript
import { useSafeI18n } from '../../../utils/i18n/locale';

const { t } = useSafeI18n('hero-component', {
  getStarted: 'Get Started',
  features: 'Features',
  tagline: 'A modern documentation template',
});

// Access translations
const buttonText = t.getStarted; // Returns translated or default value
```

**Translation File**: `.vitepress/config/locale/{lang}/components/hero/VPHero.json`

#### useBackgroundAnimation.ts

**Purpose**: Manages background animations (parallax, blur, bounce).

**Location**: `.vitepress/utils/hero/useBackgroundAnimation.ts` (or similar utils structure)

**Usage**:
```typescript
import { useBackgroundAnimation } from '../../../utils/hero/useBackgroundAnimation';

const { 
  parallaxRef, 
  blurRef, 
  bounceRef,
  startParallax,
  stopParallax,
  updateBlur,
  startBounce,
} = useBackgroundAnimation({
  parallax: { enabled: true, intensity: 0.5 },
  blur: { enabled: true, amount: 5 },
  bounce: { enabled: true, intensity: 0.1 },
});
```

**Implementation Example**:
```typescript
export function useBackgroundAnimation(config: BackgroundAnimationConfig) {
  const parallaxRef = ref<HTMLElement | null>(null);
  const blurRef = ref<HTMLElement | null>(null);
  const bounceRef = ref<HTMLElement | null>(null);
  
  const handleParallax = (e: MouseEvent) => {
    if (!parallaxRef.value || !config.parallax?.enabled) return;
    
    const rect = parallaxRef.value.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    
    const intensity = config.parallax.intensity || 0.5;
    const smoothness = config.parallax.smoothness || 0.1;
    
    parallaxRef.value.style.transform = 
      `translate3d(${x * intensity * smoothness * 100}px, ${y * intensity * smoothness * 100}px, 0)`;
  };
  
  const startParallax = () => {
    if (config.parallax?.enabled) {
      window.addEventListener('mousemove', handleParallax);
    }
  };
  
  const stopParallax = () => {
    window.removeEventListener('mousemove', handleParallax);
  };
  
  onMounted(() => {
    startParallax();
  });
  
  onUnmounted(() => {
    stopParallax();
  });
  
  return {
    parallaxRef,
    blurRef,
    bounceRef,
    startParallax,
    stopParallax,
  };
}
```

#### useParallax.ts

**Purpose**: Dedicated parallax effect composable.

**Location**: `.vitepress/utils/hero/useParallax.ts`

**Usage**:
```typescript
import { useParallax } from '../../../utils/hero/useParallax';

const { elementRef, start, stop } = useParallax({
  intensity: 0.5,
  direction: 'vertical',
  smoothness: 0.1,
});
```

#### useBlurEffect.ts

**Purpose**: Manages blur animation effects.

**Location**: `.vitepress/utils/hero/useBlurEffect.ts`

**Usage**:
```typescript
import { useBlurEffect } from '../../../utils/hero/useBlurEffect';

const { elementRef, setBlur, startAnimation } = useBlurEffect({
  amount: 5,
  animation: {
    enabled: true,
    type: 'pulse',
    duration: 2000,
    minAmount: 0,
    maxAmount: 10,
  },
});
```

#### useBounceEffect.ts

**Purpose**: Manages bounce animation effects.

**Location**: `.vitepress/utils/hero/useBounceEffect.ts`

**Usage**:
```typescript
import { useBounceEffect } from '../../../utils/hero/useBounceEffect';

const { elementRef, start, stop } = useBounceEffect({
  intensity: 0.1,
  duration: 3000,
  direction: 'vertical',
  easing: 'ease-in-out',
});
```

#### useHover3D.ts

**Purpose**: Provides 3D tilt hover effect functionality.

**Location**: `.vitepress/utils/hero/useHover3D.ts`

**Usage**:
```typescript
import { useHover3D } from '../../../utils/hero/useHover3D';

const { 
  elementRef, 
  x, 
  y, 
  transform,
  handleMouseMove,
  handleMouseLeave,
} = useHover3D({
  intensity: 15,
  perspective: '1000px',
  stiffness: 300,
  damping: 30,
});
```

**Implementation Example**:
```typescript
import { ref } from 'vue';
import { useMotionValue, useSpring, useMotionTemplate } from 'motion-v';

export function useHover3D(config: Hover3DConfig) {
  const elementRef = ref<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const xSpring = useSpring(x, { 
    stiffness: config.stiffness || 300, 
    damping: config.damping || 30 
  });
  const ySpring = useSpring(y, { 
    stiffness: config.stiffness || 300, 
    damping: config.damping || 30 
  });
  
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!elementRef.value) return;
    
    const rect = elementRef.value.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) * 32.5;
    const mouseY = (e.clientY - rect.top) * 32.5;
    
    const rX = (mouseY / height - 32.5 / 2) * -1;
    const rY = mouseX / width - 32.5 / 2;
    
    const intensity = config.intensity || 15;
    x.set(rX * intensity / 15);
    y.set(rY * intensity / 15);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return {
    elementRef,
    x,
    y,
    transform,
    handleMouseMove,
    handleMouseLeave,
  };
}
```

### 5. Responsive Design

**Considerations**:
- Disable heavy effects on mobile devices
- Reduce particle counts on mobile
- Simplify shader complexity on low-end devices
- Provide fallback images/videos
- Disable 3D hover effects on touch devices
- Reduce wave complexity on mobile

### 5. Accessibility

**Requirements**:
- Provide alt text for images
- Support reduced motion preferences
- Ensure keyboard navigation
- Maintain color contrast

### 6. Theme Support

**Implementation**:
- Support light/dark theme variants
- Use CSS variables for theme colors
- Provide theme-specific shader colors
- Handle theme switching smoothly

## Examples

### Example 1: Single Layer Color Background with Wave Enhancement

```yaml
---
layout: home

hero:
  name: "My Project"
  text: "Amazing Documentation"
  background:
    mode: single # Single layer mode (can be omitted)
    type: color
    color:
      gradient:
        enabled: true
        type: linear
        direction: 135deg
        stops:
          - color: rgba(102,126,234,1)
            position: 0%
          - color: rgba(118,75,162,1)
            position: 100%
    animations:
      parallax:
        enabled: true
        intensity: 0.5
        direction: vertical
      blur:
        enabled: true
        amount: 2
        animation:
          enabled: true
          type: pulse
          duration: 3s
          minAmount: 0
          maxAmount: 5
  # Waves are a separate enhancement system (not a background type)
  waves:
    enabled: true
    count: 2
    layers:
      - height: 0.5
        speed: 1.0
        frequency: 0.02
        color: [0.2, 0.4, 0.8]
        opacity: 0.6
---
```

### Example 2: Shader Background with Particles and Waves

```yaml
---
layout: home

hero:
  name: "My Project"
  background:
    type: shader
    shader:
      enabled: true
      type: galaxy
      uniforms:
        uSpeed:
          type: float
          value: 0.5
        uColor1:
          type: vec3
          light: [0.2, 0.2, 0.3]
          dark: [1.0, 1.0, 1.0]
          value: [1.0, 1.0, 1.0]
    particles:
      enabled: true
      type: stars
      count: 2000
  # Waves can be enabled with any background type
  waves:
    enabled: true
    count: 1
    layers:
      - height: 0.3
        speed: 0.8
        color: [0.2, 0.4, 0.8]
        opacity: 0.4
---
```

**API Implementation** (TresJS):
```vue
<!-- ShaderBackground.vue -->
<script setup lang="ts">
import { TresCanvas, TresMesh, TresPlaneGeometry, useRenderLoop, extend } from '@tresjs/core';
import { ShaderMaterial, Vector3 } from 'three';
import { computed } from 'vue';

// IMPORTANT: Extend TresJS to support ShaderMaterial
extend({ ShaderMaterial });

const props = defineProps<{
  config: ShaderConfig;
}>();

const { onLoop } = useRenderLoop();

// Galaxy shader implementation
const galaxyVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const galaxyFragmentShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform vec3 uColor1;
  uniform vec2 uResolution;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    float t = uTime * uSpeed;
    vec3 color = uColor1 * (0.5 + 0.5 * sin(uv.x * 10.0 + t));
    gl_FragColor = vec4(color, 1.0);
  }
`;

const uniforms = computed(() => ({
  uTime: { value: 0 },
  uSpeed: { value: props.config.uniforms?.uSpeed?.value || 0.5 },
  uColor1: { value: new Vector3(...(props.config.uniforms?.uColor1?.value || [1, 1, 1])) },
  uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
}));

onLoop(({ elapsed }) => {
  uniforms.value.uTime.value = elapsed;
});
</script>

<template>
  <TresCanvas clear-color="transparent" :alpha="true" window-size>
    <TresOrthographicCamera :position="[0, 0, 1]" />
    <TresMesh>
      <TresPlaneGeometry :args="[2, 2]" />
      <!-- TresShaderMaterial available after extend({ ShaderMaterial }) -->
      <TresShaderMaterial
        :vertex-shader="galaxyVertexShader"
        :fragment-shader="galaxyFragmentShader"
        :uniforms="uniforms"
      />
    </TresMesh>
  </TresCanvas>
</template>
```

### Example 3: 3D Model Hero Image

```yaml
---
layout: home

hero:
  name: "My Project"
  image:
    type: model3d
    model3d:
      src: /models/logo.glb
      scale: [1, 1, 1]
      animation:
        enabled: true
        type: rotate
        speed: 1.0
        axis: [0, 1, 0]
      interaction:
        enabled: true
        autoRotate: true
---
```

### Example 4: Multi-Layer Background with Video and Gradient Overlay

```yaml
---
layout: home

hero:
  name: "My Project"
  background:
    mode: layers # Explicitly use multi-layer mode
    layers:
      - type: video
        video:
          src: /videos/hero.mp4
          autoplay: true
          loop: true
          muted: true
        opacity: 0.8
        zIndex: 1 # Bottom layer
        animations:
          parallax:
            enabled: true
            intensity: 0.3
          blur:
            enabled: true
            amount: 1
      - type: color
        color:
          gradient:
            enabled: true
            type: radial
            stops:
              - color: rgba(0,0,0,0.8)
                position: 0%
              - color: rgba(0,0,0,0)
                position: 100%
        opacity: 0.5
        zIndex: 2 # Top layer
        blend: overlay
    # Global animations (applied to all layers unless overridden)
    animations:
      bounce:
        enabled: true
        intensity: 0.05
        duration: 4s
        direction: vertical
  waves:
    enabled: true
    count: 1
    layers:
      - height: 0.3
        speed: 0.8
        color: [0.2, 0.4, 0.8]
        opacity: 0.4
---
```

### Example 4b: Single Layer Mode (Simpler)

```yaml
---
layout: home

hero:
  name: "My Project"
  background:
    mode: single # or omit mode
    type: video
    video:
      src: /videos/hero.mp4
      autoplay: true
      loop: true
      muted: true
    opacity: 0.9
    animations:
      parallax:
        enabled: true
        intensity: 0.3
---
```

### Example 5: Custom Shader Background with Template

```yaml
---
layout: home

hero:
  name: "My Project"
  background:
    type: shader
    shader:
      enabled: true
      # Use registered shader template
      type: template:my-custom-shader
      # Override template uniforms
      uniforms:
        uTime:
          type: float
          value: 0
        uColor1:
          type: vec3
          value: [0.2, 0.4, 0.8]
        uColor2:
          type: vec3
          value: [0.8, 0.4, 0.2]
    animations:
      parallax:
        enabled: true
        intensity: 0.4
---
```

### Example 6: Hero with 3D Hover Buttons and Features

```yaml
---
layout: home

hero:
  name: "My Project"
  text: "Amazing Documentation"
  actions:
    - theme: brand
      text: "Get Started"
      link: /guide/getting-started
      style:
        variant: filled
        outline: true
        outlineWidth: 2px
        outlineColor: rgba(102,126,234,1)
        boxShadow: none
        hover:
          enabled: true
          tilt3D:
            enabled: true
            intensity: 15
            perspective: 1000px
    - theme: alt
      text: "Features"
      link: /guide/features
      style:
        variant: outlined
        outline: true
        outlineWidth: 2px
        outlineColor: rgba(118,75,162,1)
        boxShadow: none

features:
  - icon: 📝
    title: "Markdown Enhancement"
    details: "Rich Markdown extensions"
    image:
      src: /images/feature-markdown.jpg # or https://example.com/feature-markdown.jpg
      alt: Markdown Feature
      position: top
    hover3D:
      enabled: true
      intensity: 10
  - icon: 🎨
    title: "Modern Theme"
    details: "Beautiful UI components"
    video:
      src: /videos/feature-theme.mp4 # or https://example.com/feature-theme.mp4
      poster: /images/feature-theme-poster.jpg # or https://example.com/poster.jpg
      position: bottom
      autoplay: false
      loop: true
    hover3D:
      enabled: true
      intensity: 12
---
```

### Example 7: Multi-Layer Background with URLs and Theme Variation

```yaml
---
layout: home

hero:
  name: "My Project"
  background:
    mode: layers
    layers:
      - type: video
        video:
          # URLs supported
          src: https://example.com/hero-background.mp4
          light: https://example.com/hero-light.mp4
          dark: https://example.com/hero-dark.mp4
          autoplay: true
          loop: true
          muted: true
        opacity: 0.8
        zIndex: 1
      - type: shader
        shader:
          type: water
          # Theme variation for shader
          water:
            color:
              light: [0.2, 0.4, 0.8]
              dark: [0.1, 0.2, 0.4]
              value: [0.2, 0.4, 0.8]
            opacity:
              light: 0.8
              dark: 0.6
              value: 0.8
          uniforms:
            uColor1:
              type: vec3
              light: [0.2, 0.4, 0.8]
              dark: [0.8, 0.4, 0.2]
              value: [0.2, 0.4, 0.8]
        opacity: 0.6
        zIndex: 2
        blend: overlay
      - type: particles
        particles:
          type: stars
          count: 1000
          # Theme variation for particles
          appearance:
            color:
              light: [0.2, 0.2, 0.3]
              dark: [1.0, 1.0, 1.0]
              value: [1.0, 1.0, 1.0]
            opacity:
              light: 0.6
              dark: 0.8
              value: 0.8
        opacity: 0.8
        zIndex: 3
        blend: screen
  image:
    type: model3d
    model3d:
      # URL supported
      src: https://example.com/logo.glb
      # Theme variation for materials
      materials:
        - name: mainMaterial
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
---
```

## Migration Guide

### From Current Hero to Enhanced Hero

1. **Update Frontmatter**: Add new background/image configuration
2. **Install Dependencies**: Add `@tresjs/core` and `three`
3. **Update Components**: Replace static backgrounds with dynamic components
4. **Test Performance**: Ensure smooth animations on target devices
5. **Add Fallbacks**: Provide fallback images for unsupported browsers

## Browser Support

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **WebGL Support**: Required for 3D features
- **Fallbacks**: CSS-based fallbacks for non-WebGL browsers

## Performance Considerations

- **Initial Load**: Lazy load 3D assets
- **Frame Rate**: Target 60 FPS, degrade gracefully
- **Memory**: Monitor memory usage with particle systems
- **Mobile**: Reduce effects complexity on mobile devices

## Shader Template Registration

### Creating a Custom Shader Template

**Step 1**: Create shader file (`.vitepress/config/shaders/my-shader.ts`):

```typescript
import type { ShaderTemplate } from './types';

export const myShader: ShaderTemplate = {
  name: 'my-shader',
  vertex: `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragment: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uSpeed;
    varying vec2 vUv;
    
    void main() {
      float t = sin(uTime * uSpeed + vUv.x * 10.0) * 0.5 + 0.5;
      vec3 color = mix(uColor1, uColor2, t);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  uniforms: {
    uTime: { type: 'float', value: 0 },
    uColor1: { type: 'vec3', value: [0.2, 0.4, 0.8] },
    uColor2: { type: 'vec3', value: [0.8, 0.4, 0.2] },
    uSpeed: { type: 'float', value: 1.0 },
  },
  defaultConfig: {
    speed: 1.0,
    color1: [0.2, 0.4, 0.8],
    color2: [0.8, 0.4, 0.2],
  },
};
```

**Step 2**: Register in shader registry (`.vitepress/config/shaders/index.ts`):

```typescript
import { myShader } from './my-shader';
import { shaderRegistry } from './index';

shaderRegistry.set('my-shader', myShader);
```

**Step 3**: Use in frontmatter:

```yaml
shader:
  enabled: true
  type: template:my-shader
  uniforms:
    uSpeed:
      type: float
      value: 1.5
```

## Background Layers Design Benefits

### Type Safety
- **Discriminated Unions**: Each layer type is a discriminated union, ensuring type safety
- **TypeScript Support**: Full TypeScript autocomplete and type checking
- **Runtime Validation**: Type checking at runtime prevents invalid configurations

### Flexibility
- **Single Layer Mode**: Simple syntax for basic use cases
- **Multi-Layer Mode**: Full control for complex compositions
- **Auto-Detection**: Automatically detects mode based on configuration structure

### Maintainability
- **Unified Rendering**: Single rendering path for both modes (normalized internally)
- **Clear Separation**: Each layer type has its own component
- **Easy Extension**: Adding new layer types is straightforward

### Performance
- **Lazy Loading**: Layers can be loaded on demand
- **Optimized Rendering**: Layers sorted by zIndex for efficient rendering
- **Animation Batching**: Global animations applied efficiently

### Developer Experience
- **Intuitive API**: Clear distinction between single and multi-layer modes
- **Better Errors**: Type-safe errors help catch configuration mistakes early
- **Documentation**: Self-documenting through TypeScript types

## URL and Theme Variation Support

### URL Support

**All media sources support URLs**:
- **Images**: `https://example.com/image.jpg` or `/path/to/image.jpg`
- **Videos**: `https://example.com/video.mp4` or `/path/to/video.mp4`
- **GIFs**: `https://example.com/animation.gif` or `/path/to/animation.gif`
- **3D Models**: `https://example.com/model.glb` or `/path/to/model.glb`
- **Textures**: `https://example.com/texture.png` or `/path/to/texture.png`

**Auto-Detection**:
- Automatically detects local paths vs URLs
- Handles CORS for remote resources
- Supports both relative and absolute URLs

### Theme Variation Support

**All theme-variable elements support light/dark variants**:

1. **Colors**:
   ```yaml
   color:
     light: rgba(255,255,255,1)
     dark: rgba(26,26,26,1)
     value: rgba(255,255,255,1) # Fallback
   ```

2. **Shader Uniforms**:
   ```yaml
   uniforms:
     uColor:
       type: vec3
       light: [0.2, 0.4, 0.8]
       dark: [0.8, 0.4, 0.2]
       value: [0.2, 0.4, 0.8]
   ```

3. **Shader-Specific Colors**:
   ```yaml
   water:
     color:
       light: [0.2, 0.4, 0.8]
       dark: [0.1, 0.2, 0.4]
       value: [0.2, 0.4, 0.8]
   ```

4. **Particle Colors**:
   ```yaml
   appearance:
     color:
       light: [0.2, 0.2, 0.3]
       dark: [1.0, 1.0, 1.0]
       value: [1.0, 1.0, 1.0]
   ```

5. **3D Model Materials**:
   ```yaml
   materials:
     - color:
         light: [1.0, 1.0, 1.0]
         dark: [0.8, 0.8, 0.8]
         value: [1.0, 1.0, 1.0]
   ```

6. **Lighting**:
   ```yaml
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

**Theme Detection**:
- Automatically detects current theme (light/dark)
- Falls back to `value` if theme-specific value not provided
- Reactive updates when theme changes
- Supports VitePress theme system integration

## Summary of Key Features

### ✅ URL Support
- All media sources (images, videos, GIFs, models, textures) support URLs
- Automatic detection of local vs remote resources
- CORS handling for remote resources

### ✅ Theme Variation
- All colors support light/dark variants
- Shader uniforms support theme variation
- Particle colors support theme variation
- 3D model materials support theme variation
- Lighting supports theme variation
- Automatic theme detection and switching

### ✅ Background Animations
- **Parallax Effect**: Mouse/scroll-based depth effect
- **Blur Effect**: Animated blur with pulse/wave/breath modes
- **Bounce Effect**: Subtle bouncing animation
- All animations configurable per layer or globally

### ✅ Folder Structure
- Organized component hierarchy in `hero/` directory
- Components split by functionality (background, waves, content, image, effects)
- All components under 500 lines
- Composables for reusable logic

### ✅ Waves Enhancement System
- **NOT a background type** - separate enhancement system
- Can be enabled/disabled independently via `waves.enabled`
- Always rendered on top of all background layers (z-index: 1000)
- Works with any background type (image, video, color, shader, particles)
- Multiple wave layers with independent properties
- Shader-based rendering

### ✅ Color Format
- All colors use `rgba(r,g,b,a)` format for markdown editing
- Supports theme variants (light/dark)
- Gradient support with rgba color stops

### ✅ Shader Templates
- TypeScript-based shader registration
- Reusable shader templates in `config/shaders/`
- Template registry system
- Override template uniforms in frontmatter

### ✅ Button Styling
- Organized style variants (filled, outlined, text, ghost)
- Consistent outline styling
- No default box-shadow
- 3D hover effects support
- Per-button style customization

### ✅ Features Enhancement
- Image support with position control
- Video support with poster and controls
- Text overlay support
- 3D hover effects for feature cards

### ✅ 3D Hover Effects
- Motion Vue-based implementation
- Inspired by Framer Motion card component
- Spring physics for smooth animation
- Configurable intensity and perspective

### ✅ Internationalization
- All components support i18n via `useSafeI18n()` from `utils/i18n/locale`
- Component-scoped translations in `config/locale/{lang}/components/`
- Component ID mapping system for translation file paths
- Automatic language detection from URL or VitePress context
- Fallback to default translations
- Type-safe translations with TypeScript

## Future Enhancements

- VR/AR support
- Advanced physics simulations
- More shader presets
- Performance monitoring dashboard
- A/B testing for backgrounds
- More animation effect types
- Custom particle shapes
- Advanced lighting controls

---

**Note**: This is a planning document. Implementation will follow this specification.