---
title: 特性与首页 Frontmatter
description: 首页特性卡片和无限滚动行为的 frontmatter 配置。
priority: 30
---
# 特性与首页 Frontmatter

## 特性数据

```yaml
features:
  - icon: mdi:rocket-launch-outline
    title: "运行时完整"
    details: "支持着色器、粒子、波浪和 3D 模型。"
    theme: brand
    link: /zh-CN/hero/matrix/index
```

## 滚动器配置键

仅支持规范键路径：

- `featuresConfig`

### 支持的字段

| 路径 | 类型 | 默认值 |
| --- | --- | --- |
| `featuresConfig.scroll.speed` | `number` | `0.6` |
| `featuresConfig.scroll.dragMultiplier` | `number` | `2` |
| `featuresConfig.scroll.pauseOnHover` | `boolean` | `true` |
| `featuresConfig.scroll.minItems` | `number` | `12` |
| `featuresConfig.scroll.edgeFade` | `boolean` | `true` |
| `featuresConfig.scroll.gap` | `number` | `24` |
| `featuresConfig.scroll.gapTablet` | `number` | `32` |
| `featuresConfig.scroll.gapDesktop` | `number` | `40` |
| `featuresConfig.cards.width` | `number` | `340` |
| `featuresConfig.cards.widthTablet` | `number` | `380` |
| `featuresConfig.cards.widthDesktop` | `number` | `420` |