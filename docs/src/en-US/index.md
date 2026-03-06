---
layout: home

hero:
    name: "VitePress Template"
    text: "A feature-rich documentation template"
    tagline: "A modern documentation template built with VitePress, integrated with various enhanced plugins and features"
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
            image: { x: 14, y: -8, scale: 1.1 }
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
              text: "Matrix Ready"
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
              title: "Hero Runtime"
              description: "floating + waves + backgrounds in one schema."
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
              title: "Availability"
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
              alt: "Template logo floating element"
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
          text: "Hero Matrix"
          linkKey: heroMatrix
        - theme: alt
          text: "Frontmatter API"
          linkKey: frontmatterApi
        - theme: alt
          text: "Maintainability Guide"
          linkKey: maintainabilityGuide
        - theme: outline
          text: "Development Workflow"
          linkKey: developmentWorkflow
        - theme: outline
          text: "Extension Architecture"
          linkKey: extensionArchitecture
        - theme: ghost
          text: "Hero Extension"
          linkKey: heroExtension

features:
    - icon: ⚙️
      title: "Frontmatter API"
      details: "Outer and inner frontmatter contracts for pages and hero runtime."
      linkKey: frontmatterApi
    - icon: 🧭
      title: "Maintainability Guide"
      details: "High-level extension standards and repo-wide engineering rules."
      linkKey: maintainabilityGuide
    - icon: 🛠️
      title: "Development Workflow"
      details: "Change order, verification flow, and upstream/downstream sync expectations."
      linkKey: developmentWorkflow
    - icon: 🧱
      title: "Extension Architecture"
      details: "Where to place components, runtime logic, configuration, and styles."
      linkKey: extensionArchitecture
    - icon: ✨
      title: "Hero Extension"
      details: "Extend typography, floating items, shaders, backgrounds, and nav/search visuals."
      linkKey: heroExtension
    - icon: 🌠
      title: "Hero Matrix"
      details: "Browse all hero configuration demos grouped by domain and level."
      linkKey: heroMatrix
    - icon: 🎨
      title: "Styles & Plugins"
      details: "Plugin capabilities and style-system usage for template projects."
      linkKey: stylesPlugins
    - icon: 🧱
      title: "Background Modes"
      details: "Single and layered background configurations with layered background controls."
      linkKey: backgroundModes
    - icon: 🌊
      title: "Waves Matrix"
      details: "Hero/content boundary wave options, layer tuning and outline settings."
      linkKey: wavesMatrix
    - icon: 🗂️
      title: "All Config Hub"
      details: "Single authority page for hero contract fields with links to nested showcase paths."
      linkKey: heroAllConfig

gitChangelog: false
---
