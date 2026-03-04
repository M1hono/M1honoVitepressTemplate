---
layout: home
hero:
  name: "浮动元素"
  text: "等级 1"
  tagline: "从纯文本浮动项开始，使用每项样式字段。"
  floating:
    enabled: true
    opacity: 0.9
    density: 8
    motion:
      enabled: true
      style: drift
      durationMin: 14
      durationMax: 24
    items:
      - type: text
        text: "文档平台"
        x: "12%"
        y: "24%"
        colorType: gradient
        gradient: "linear-gradient(120deg,rgba(47, 94, 166, 1) 0%,rgba(109, 149, 216, 1) 100%)"
      - type: text
        text: "主题同步"
        x: "74%"
        y: "26%"
      - type: text
        text: "Frontmatter"
        x: "64%"
        y: "72%"
        colorType: solid
        color:
          light: "rgba(38, 75, 130, 1)"
          dark: "rgba(169, 196, 243, 1)"
  actions:
    - theme: brand
      text: "等级 2"
      link: /zh-CN/hero/matrix/floating/level2Cards
title: "浮动元素等级 1"
description: "浮动元素等级 1 的英雄矩阵配置展示与实践说明。"
priority: 10
---
# 浮动元素等级 1

主要关注点：每项定义的文本项样式。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "浮动元素"
  text: "等级 1"
  tagline: "从纯文本浮动项开始，使用每项样式字段。"
  floating:
    enabled: true
    opacity: 0.9
    density: 8
    motion:
      enabled: true
      style: drift
      durationMin: 14
      durationMax: 24
    items:
      - type: text
        text: "文档平台"
        x: "12%"
        y: "24%"
        colorType: gradient
        gradient: "linear-gradient(120deg,rgba(47, 94, 166, 1) 0%,rgba(109, 149, 216, 1) 100%)"
      - type: text
        text: "主题同步"
        x: "74%"
        y: "26%"
      - type: text
        text: "Frontmatter"
        x: "64%"
        y: "72%"
        colorType: solid
        color:
          light: "rgba(38, 75, 130, 1)"
          dark: "rgba(169, 196, 243, 1)"
  actions:
    - theme: brand
      text: "等级 2"
      link: /zh-CN/hero/matrix/floating/level2Cards
---
```
