---
layout: home
hero:
  name: "波浪"
  text: "不支持的输入"
  tagline: "background.type=waves 不受支持，应被忽略。"
  background:
    type: waves
  waves:
    enabled: true
  actions:
    - theme: brand
      text: "图片类型"
      link: /zh-CN/hero/matrix/imageTypes/index
features:
  - title: "预期行为"
    details: "运行时在开发环境中会发出警告，但仍会从 hero.waves 渲染波浪。"
title: "不支持的背景类型"
description: "不支持的背景类型 的英雄矩阵配置展示与实践说明。"
priority: 90
---
# 不支持的背景类型

主要关注点：不支持配置的行为。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "波浪"
  text: "不支持的输入"
  tagline: "background.type=waves 不受支持，应被忽略。"
  background:
    type: waves
  waves:
    enabled: true
  actions:
    - theme: brand
      text: "图片类型"
      link: /zh-CN/hero/matrix/imageTypes/index
features:
  - title: "预期行为"
    details: "运行时在开发环境中会发出警告，但仍会从 hero.waves 渲染波浪。"
---
```
