---
layout: home
hero:
  name: "浮动元素"
  text: "等级 3"
  tagline: "混合卡片、徽章、图标、统计、代码、图片和文本。"
  floating:
    enabled: true
    opacity: 0.94
    density: 12
    motion:
      enabled: true
      style: drift
      drift: 30
      durationMin: 12
      durationMax: 22
    items:
      - type: card
        title: "项目健康"
        description: "构建和矩阵检查通过。"
        x: "10%"
        y: "22%"
      - type: image
        src:
          light: /logo.png
          dark: /logodark.png
        alt:
          light: "模板 Logo（亮色主题）"
          dark: "模板 Logo（暗色主题）"
        x: "82%"
        y: "64%"
        width: "110px"
      - type: lottie
        src:
          light: "https://raw.githubusercontent.com/b-wils/lottiefiles-test-files/main/data/layers/precomp.json"
          dark: "https://raw.githubusercontent.com/b-wils/lottiefiles-test-files/main/data/layers/precomp.json"
        alt:
          light: "Lottie 预合成测试（亮色主题）"
          dark: "Lottie 预合成测试（暗色主题）"
        x: "76%"
        y: "18%"
        width: "120px"
        speed: 0.8
      - type: badge
        text:
          light: "企业文档"
          dark: "企业文档 · 暗色"
        icon:
          light: "✨"
          dark: "🌙"
        x: "56%"
        y: "12%"
      - type: icon
        icon:
          light: "⚙️"
          dark: "🛠️"
        x: "6%"
        y: "52%"
      - type: stat
        value: "99.95%"
        title: "可用性"
        x: "58%"
        y: "56%"
      - type: code
        code: "hero.waves.enabled: true"
        x: "30%"
        y: "72%"
      - type: shape
        shape: hexagon
        x: "90%"
        y: "42%"
      - type: text
        text: "Frontmatter 扩展就绪"
        x: "34%"
        y: "16%"
        colorType: random-gradient
  actions:
    - theme: brand
      text: "按钮与特性"
      link: /zh-CN/hero/matrix/buttonsFeatures/index
title: "浮动元素等级 3"
description: "浮动元素等级 3 的英雄矩阵配置展示与实践说明。"
priority: 30
---
# 浮动元素等级 3

主要关注点：完整项类型矩阵。

## 本页实际 Frontmatter 配置

以下 YAML 即当前页面正在使用的完整 frontmatter，可直接复制用于复现同样效果。

```yaml
---
layout: home
hero:
  name: "浮动元素"
  text: "等级 3"
  tagline: "混合卡片、徽章、图标、统计、代码、图片和文本。"
  floating:
    enabled: true
    opacity: 0.94
    density: 12
    motion:
      enabled: true
      style: drift
      drift: 30
      durationMin: 12
      durationMax: 22
    items:
      - type: card
        title: "项目健康"
        description: "构建和矩阵检查通过。"
        x: "10%"
        y: "22%"
      - type: image
        src:
          light: /logo.png
          dark: /logodark.png
        alt:
          light: "模板 Logo（亮色主题）"
          dark: "模板 Logo（暗色主题）"
        x: "82%"
        y: "64%"
        width: "110px"
      - type: lottie
        src:
          light: "https://raw.githubusercontent.com/b-wils/lottiefiles-test-files/main/data/layers/precomp.json"
          dark: "https://raw.githubusercontent.com/b-wils/lottiefiles-test-files/main/data/layers/precomp.json"
        alt:
          light: "Lottie 预合成测试（亮色主题）"
          dark: "Lottie 预合成测试（暗色主题）"
        x: "76%"
        y: "18%"
        width: "120px"
        speed: 0.8
      - type: badge
        text:
          light: "企业文档"
          dark: "企业文档 · 暗色"
        icon:
          light: "✨"
          dark: "🌙"
        x: "56%"
        y: "12%"
      - type: icon
        icon:
          light: "⚙️"
          dark: "🛠️"
        x: "6%"
        y: "52%"
      - type: stat
        value: "99.95%"
        title: "可用性"
        x: "58%"
        y: "56%"
      - type: code
        code: "hero.waves.enabled: true"
        x: "30%"
        y: "72%"
      - type: shape
        shape: hexagon
        x: "90%"
        y: "42%"
      - type: text
        text: "Frontmatter 扩展就绪"
        x: "34%"
        y: "16%"
        colorType: random-gradient
  actions:
    - theme: brand
      text: "按钮与特性"
      link: /zh-CN/hero/matrix/buttonsFeatures/index
---
```
