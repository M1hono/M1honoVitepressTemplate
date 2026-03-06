---
layout: home

hero:
    name: "VitePress 模板"
    text: "功能丰富的文档模板"
    tagline: "基于 VitePress 构建的现代化文档模板，集成多种增强插件和功能"
    colors:
        searchBackground:
            light: "rgba(255, 255, 255, 0.42)"
            dark: "rgba(15, 23, 42, 0.24)"
        searchBackgroundScrolled:
            light: "rgba(255, 255, 255, 0.62)"
            dark: "rgba(15, 23, 42, 0.38)"
        searchHoverBackground:
            light: "rgba(255, 255, 255, 0.56)"
            dark: "rgba(15, 23, 42, 0.34)"
        searchHoverBackgroundScrolled:
            light: "rgba(255, 255, 255, 0.74)"
            dark: "rgba(15, 23, 42, 0.46)"
        searchText:
            light: "rgba(15, 23, 42, 0.82)"
            dark: "rgba(255, 255, 255, 0.94)"
        searchTextScrolled:
            light: "rgba(15, 23, 42, 0.88)"
            dark: "rgba(255, 255, 255, 0.96)"
        searchTextMuted:
            light: "rgba(15, 23, 42, 0.56)"
            dark: "rgba(255, 255, 255, 0.72)"
        searchTextMutedScrolled:
            light: "rgba(15, 23, 42, 0.62)"
            dark: "rgba(255, 255, 255, 0.76)"
        searchBorder:
            light: "rgba(15, 23, 42, 0.1)"
            dark: "rgba(255, 255, 255, 0.14)"
        searchBorderScrolled:
            light: "rgba(15, 23, 42, 0.12)"
            dark: "rgba(255, 255, 255, 0.18)"
        searchKeyBackground:
            light: "rgba(15, 23, 42, 0.06)"
            dark: "rgba(255, 255, 255, 0.12)"
        searchKeyBackgroundScrolled:
            light: "rgba(15, 23, 42, 0.08)"
            dark: "rgba(255, 255, 255, 0.16)"
        searchKeyText:
            light: "rgba(15, 23, 42, 0.6)"
            dark: "rgba(255, 255, 255, 0.76)"
        searchKeyTextScrolled:
            light: "rgba(15, 23, 42, 0.66)"
            dark: "rgba(255, 255, 255, 0.82)"
    typography:
        type: grouped-float
        motion:
            intensity: 0.86
            title: { x: 10, y: -6, scale: 1.09 }
            text: { x: 12, y: -4, scale: 1.11 }
            tagline: { x: 10, y: 1, scale: 1.06 }
            image: { x: 15, y: -9, scale: 1.1 }
            transitionDuration: 700
            transitionDelayStep: 58
            transitionEasing: "cubic-bezier(0.16, 1, 0.3, 1)"
    floating:
        enabled: true
        opacity: 0.82
        density: 8
        motion:
            enabled: true
            style: drift
            durationMin: 14
            durationMax: 24
            drift: 26
        items:
            - type: badge
              text: "矩阵就绪"
              icon: "✨"
              x: "72%"
              y: "14%"
              background:
                  light: "rgba(255, 255, 255, 0.76)"
                  dark: "rgba(24, 24, 34, 0.72)"
              borderColor:
                  light: "rgba(38, 85, 160, 0.28)"
                  dark: "rgba(128, 164, 225, 0.36)"
            - type: card
              title: "Hero 运行时"
              description: "floating + waves + backgrounds 统一契约。"
              x: "8%"
              y: "62%"
              background:
                  light: "rgba(255, 255, 255, 0.72)"
                  dark: "rgba(20, 22, 30, 0.7)"
              borderColor:
                  light: "rgba(46, 88, 168, 0.22)"
                  dark: "rgba(132, 170, 234, 0.32)"
            - type: stat
              value: "99.95%"
              title: "可用性"
              x: "70%"
              y: "64%"
              background:
                  light: "rgba(255, 255, 255, 0.7)"
                  dark: "rgba(22, 24, 33, 0.72)"
            - type: code
              code: "hero.floating.enabled: true"
              x: "36%"
              y: "79%"
              background:
                  light: "rgba(250, 252, 255, 0.74)"
                  dark: "rgba(16, 18, 26, 0.78)"
            - type: image
              src: /logo.png
              alt: "模板 Logo 浮动元素"
              x: "86%"
              y: "44%"
              width: "88px"
              borderRadius: "18px"
              background:
                  light: "rgba(255, 255, 255, 0.56)"
                  dark: "rgba(12, 14, 22, 0.56)"
    image:
        light: /logo.png
        dark: /logodark.png
        alt: VitePress Template
    actions:
        - theme: brand
          text: Hero 矩阵
          linkKey: heroMatrix
        - theme: alt
          text: Frontmatter API
          linkKey: frontmatterApi
        - theme: alt
          text: 可维护性指南
          linkKey: maintainabilityGuide
        - theme: outline
          text: 开发工作流
          linkKey: developmentWorkflow
        - theme: outline
          text: 扩展架构
          linkKey: extensionArchitecture
        - theme: ghost
          text: Hero 扩展
          linkKey: heroExtension

features:
    - icon: ⚙️
      title: Frontmatter API
      details: 页面级与组件级 frontmatter 契约说明。
      linkKey: frontmatterApi
    - icon: 🧭
      title: 可维护性指南
      details: 模板扩展的高层工程规范与协作边界。
      linkKey: maintainabilityGuide
    - icon: 🛠️
      title: 开发工作流
      details: 改动顺序、校验流程与上下游同步规则。
      linkKey: developmentWorkflow
    - icon: 🧱
      title: 扩展架构
      details: 组件、运行时、配置与样式应落在哪一层。
      linkKey: extensionArchitecture
    - icon: ✨
      title: Hero 扩展
      details: 排版、浮动元素、Shader、背景与导航搜索视觉扩展手册。
      linkKey: heroExtension
    - icon: 🌠
      title: Hero 矩阵
      details: 按领域和层级查看全部 Hero 配置展示页。
      linkKey: heroMatrix
    - icon: 🎨
      title: 样式与插件
      details: 模板内置插件能力与样式体系使用方式。
      linkKey: stylesPlugins
    - icon: 🧱
      title: 背景模式
      details: 单背景与层叠背景配置，含叠加层与对比度控制项。
      linkKey: backgroundModes
    - icon: 🌊
      title: Waves 矩阵
      details: Hero 与正文衔接波浪的层级、轮廓、移动参数示例。
      linkKey: wavesMatrix
    - icon: 🗂️
      title: 全配置总览
      details: Hero 契约字段的唯一权威入口，并连接到分层展示路径。
      linkKey: heroAllConfig

gitChangelog: false
---
