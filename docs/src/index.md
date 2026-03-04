---
layout: home

hero:
    name: "VitePress Template"
    text: "A feature-rich documentation template"
    tagline: "A modern documentation template built with VitePress, integrated with various enhanced plugins and features"
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
          text: "Hero All Config"
          linkKey: heroAllConfig
        - theme: alt
          text: "Frontmatter API"
          linkKey: frontmatterApi
        - theme: outline
          text: "Styles & Plugins"
          linkKey: stylesPlugins
        - theme: ghost
          text: "All Markdown Pages"
          linkKey: allPages

features:
    - icon: 🌠
      title: "Hero Matrix"
      details: "Browse all hero configuration demos grouped by domain and level."
      linkKey: heroMatrix
    - icon: 📚
      title: "All Markdown Pages"
      details: "Complete page map with links to every markdown page in this locale."
      linkKey: allPages
    - icon: ⚙️
      title: "Frontmatter API"
      details: "Outer and inner frontmatter contracts for pages and hero runtime."
      linkKey: frontmatterApi
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
    - icon: ✨
      title: "Floating Elements"
      details: "Text, card, image, stat, icon and mixed floating composition examples."
      linkKey: floatingElements
    - icon: 🧩
      title: "Image Types"
      details: "Image, gif, video and model3d display variants with frame controls."
      linkKey: imageTypes
    - icon: 🗂️
      title: "Config Hub"
      details: "Contract-first configuration pages for hero root, layers, waves and floating."
      linkKey: heroAllConfig

gitChangelog: false
---
