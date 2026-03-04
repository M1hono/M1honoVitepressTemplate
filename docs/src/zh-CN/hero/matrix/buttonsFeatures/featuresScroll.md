---
layout: home
hero:
  name: "特性"
  text: "滚动"
  tagline: "特性卡片支持连续滚动和悬停交互提示。"
  actions:
    - theme: brand
      text: "参考"
      link: /zh-CN/hero/AllConfig
features:
  enabled: true
  autoScroll: true
  speed: 0.42
  pauseOnHover: true
  items:
    - icon: mdi:rocket-launch
      title: "运行时完整"
      details: "着色器、粒子、波浪、3D模型均为活跃路径。"
      theme: brand
    - icon: mdi:palette-swatch
      title: "设计系统"
      details: "统一的按钮和卡片样式语言。"
      theme: info
    - icon: mdi:file-document-edit-outline
      title: "Frontmatter 优先"
      details: "配置矩阵页面已为扩展做好准备。"
      theme: tip
    - icon: mdi:theme-light-dark
      title: "主题同步"
      details: "媒体和着色器设置响应明暗切换。"
      theme: warning
title: "特性滚动"
description: "特性滚动 的英雄矩阵配置展示与实践说明。"
priority: 20
---
# 特性滚动

主要关注点：特性滚动配置。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "特性"
  text: "滚动"
  tagline: "特性卡片支持连续滚动和悬停交互提示。"
  actions:
    - theme: brand
      text: "参考"
      link: /zh-CN/hero/AllConfig
features:
  enabled: true
  autoScroll: true
  speed: 0.42
  pauseOnHover: true
  items:
    - icon: mdi:rocket-launch
      title: "运行时完整"
      details: "着色器、粒子、波浪、3D模型均为活跃路径。"
      theme: brand
    - icon: mdi:palette-swatch
      title: "设计系统"
      details: "统一的按钮和卡片样式语言。"
      theme: info
    - icon: mdi:file-document-edit-outline
      title: "Frontmatter 优先"
      details: "配置矩阵页面已为扩展做好准备。"
      theme: tip
    - icon: mdi:theme-light-dark
      title: "主题同步"
      details: "媒体和着色器设置响应明暗切换。"
      theme: warning
---
```
