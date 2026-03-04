---
title: Hero Matrix Configuration Coverage
layout: doc
description: "Coverage map from runtime keys to nested showcase pages. Use one canonical API page: AllConfig."
priority: 80
---
# Hero Matrix Configuration Coverage

This page maps runtime keys to **nested showcase pages**.

API authority is centralized in one page:
- [All Hero Configuration](../../AllConfig)

## Hero Root

| Key | Showcase |
| --- | --- |
| `hero.name` / `hero.text` / `hero.tagline` | [Basic L1](../basic/level1Minimal) |
| `hero.layout.viewport` | [Basic L2](../basic/level2ViewportActions) |
| `hero.actions[]` | [Buttons Themes](../buttonsFeatures/buttonsThemes) |
| page-level `cssVars` | [Basic L3](../basic/level3PageCssvars) |

## Background Single Mode

| Key | Showcase |
| --- | --- |
| `hero.background.type: color` | [Color](../backgroundSingle/color) |
| `hero.background.type: image` | [Image](../backgroundSingle/image) |
| `hero.background.type: video` | [Video](../backgroundSingle/video) |
| `hero.background.type: shader` | [Shader](../backgroundSingle/shader) |
| `hero.background.type: particles` | [Particles](../backgroundSingle/particles) |
| global controls (`opacity/brightness/contrast/saturation/filter/cssVars/style`) | [Global Controls](../backgroundSingle/globalControls) |

## Background Layer Mode

| Key | Showcase |
| --- | --- |
| `hero.background.layers[]` basic composition | [Layers L1](../layers/level1TwoLayers) |
| `layers[].zIndex/opacity/blend` | [Layers L2](../layers/level2ThreeLayers) |
| `layers[].shader` + `layers[].particles` | [Layers L3](../layers/level3ShaderParticles) |
| theme-synced layered composition | [Layers L4](../layers/level4FullThemeSync) |
| `layers[].style/cssVars` with root style/cssVars | [Layers L5](../layers/level5LayerStyleCssvars) |

## Waves

| Key | Showcase |
| --- | --- |
| default wave bridge | [Waves L1](../waves/level1Default) |
| shape + opacity + layer tuning | [Waves L2](../waves/level2ShapeOpacity) |
| mobile tuning | [Waves L3](../waves/level3MobileTuning) |
| color/reversed/outline/zIndex | [Waves L4](../waves/level4OutlineColor) |
| unsupported `background.type: waves` behavior | [Unsupported Case](../waves/deprecatedBackgroundType) |

## Hero Image Types

| Key | Showcase |
| --- | --- |
| `hero.image.type: image` | [Image Frame](../imageTypes/imageFrame) |
| `hero.image.type: gif` | [GIF Frame](../imageTypes/gifFrame) |
| `hero.image.type: video` | [Video Frame](../imageTypes/videoFrame) |
| `hero.image.type: lottie` | [Lottie Frame](../imageTypes/lottieFrame) |
| `hero.image.type: model3d` | [Model3D Centered](../imageTypes/model3dCentered) |
| frame controls (`shape/width/height/maxWidth/maxHeight/padding/radius`) | [Frame Layout and Fit](../imageTypes/frameLayoutFit) |

## Floating Elements

| Key | Showcase |
| --- | --- |
| `hero.floating.enabled` + text baseline | [Floating L1](../floating/level1Text) |
| card-focused surface controls | [Floating L2](../floating/level2Cards) |
| mixed element types | [Floating L3](../floating/level3Mixed) |
| motion/density/blur/gradient controls | [Floating L4](../floating/level4MotionDensityBlur) |

## Buttons and Features

| Key | Showcase |
| --- | --- |
| action themes and button layout | [Buttons Themes](../buttonsFeatures/buttonsThemes) |
| feature card scrolling | [Features Scroll](../buttonsFeatures/featuresScroll) |
| full feature config (`featuresConfig`) | [Features Full Config](../buttonsFeatures/featuresFullConfig) |
