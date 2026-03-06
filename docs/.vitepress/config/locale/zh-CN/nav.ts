/**
 * 简体中文 (zh-CN) 导航配置。
 *
 * @module config/locale/zh-CN/nav
 * @description
 * 定义简体中文用户的顶层导航结构。
 *
 * - `link` 字段为不含语言前缀的根路径（如 `/hero/matrix/`）。
 *   `prefixNavLinks` 会在运行时自动加上 `/zh-CN/` 前缀。
 * - `href` 用于外部链接（在新标签页打开）。
 * - `body` 支持通过 `markdown-it` 渲染的完整 Markdown 语法。
 *
 * 所有路由已在 `docs/src/zh-CN/**` 源码树中验证。
 */

import type { NavItem } from "../../../utils/config/navTypes";

const zhNav: NavItem[] = [
    {
        text: "首页",
        link: "/",
    },
    {
        text: "文档",
        dropdown: {
            layout: "spotlight",
            panels: [
                {
                    featured: {
                        title: "快速上手",
                        desc: "几分钟内完成克隆、配置与部署。",
                        link: "/",
                        media: {
                            type: "image",
                            src: "/svg/logo.svg",
                            alt: "M1hono 标志",
                            background:
                                "linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg-soft))",
                        },
                    },
                    groups: [
                        {
                            label: "Hero 与布局",
                            items: [
                                {
                                    text: "Hero 矩阵",
                                    link: "/hero/matrix/",
                                    desc: "基于 Frontmatter 的 Hero 布局",
                                    preview: {
                                        title: "Hero 矩阵",
                                        body: [
                                            "通过 Frontmatter 控制 **布局样式**、运动强度、波浪效果和媒体内容。",
                                            "",
                                            "```yaml",
                                            "hero:",
                                            "  typography:",
                                            "    type: grouped-float",
                                            "  motion:",
                                            "    intensity: 0.8",
                                            "```",
                                        ].join("\n"),
                                    },
                                },
                                {
                                    text: "矩阵波浪",
                                    link: "/hero/matrix/waves/",
                                    desc: "正弦波动背景动画",
                                    preview: {
                                        title: "矩阵波浪",
                                        body: "调节 **波浪高度**、透明度、速度和混合模式。\n支持移动端自适应缩放。\n\n`waves.enabled: true`",
                                    },
                                },
                                {
                                    text: "浮动图层",
                                    link: "/hero/matrix/floating/",
                                    desc: "视差浮动图像层",
                                    preview: {
                                        title: "浮动图层",
                                        body: "添加响应鼠标和滚动的 **视差深度图层**。\n\n支持最多 4 个独立深度平面：\n- `level1Text` &mdash; 文字叠加\n- `level2Cards` &mdash; 卡片浮动\n- `level3Mixed` &mdash; 混合媒体",
                                    },
                                },
                                {
                                    text: "背景图层",
                                    link: "/hero/matrix/backgroundSingle/",
                                    desc: "全出血图片、粒子效果、着色器",
                                    preview: {
                                        title: "背景图层",
                                        body: "在 Hero 后方应用全出血背景：\n\n| 模式 | 说明 |\n|------|------|\n| `image` | 可混合静态图片 |\n| `particles` | 动态粒子场 |\n| `shader` | GLSL 片元着色器 |\n| `video` | 循环视频 |\n\n![背景预览](/icon/mainindex/mdi--professional-hexagon.png)\n",
                                    },
                                },
                            ],
                        },
                        {
                            label: "参考",
                            items: [
                                {
                                    text: "完整配置",
                                    link: "/hero/AllConfig/",
                                    desc: "所有 Frontmatter 字段一览",
                                    badge: { text: "参考", type: "info" },
                                    preview: {
                                        title: "完整配置",
                                        body: '**单页汇总**所有支持的 Frontmatter 字段，含类型、默认值与示例。\n\n<span style="color:var(--vp-c-brand-1)">**提示：**</span> 使用 `Ctrl+F` 快速定位任意属性。',
                                    },
                                },
                                {
                                    text: "样式与插件",
                                    link: "/stylesPlugins/",
                                    desc: "内置 Markdown-It 插件与 CSS 变量",
                                    preview: {
                                        title: "样式与插件",
                                        body: "预装扩展：\n- **markdown-it-mathjax3** — LaTeX 数学公式\n- **vitepress-plugin-tabs** — 标签页代码组\n- `@nolebase/vitepress-plugin-git-changelog` — Git 日志块\n\n![Markdown 图标](/icon/mainindex/material-symbols--markdown-copy-sharp.png)",
                                    },
                                },
                            ],
                        },
                        {
                            label: "开发指南",
                            items: [
                                {
                                    text: "可维护性指南",
                                    link: "/frontmatter/reference/maintainability",
                                    desc: "模板扩展的高层规范与职责边界",
                                    preview: {
                                        title: "可维护性指南",
                                        body: "当你要修改模板本身时，应先读这一页。\n\n它说明契约优先、运行时归属和跨仓库同步的基本规则。",
                                    },
                                },
                                {
                                    text: "开发工作流",
                                    link: "/frontmatter/reference/developmentWorkflow",
                                    desc: "改动顺序与校验流程",
                                    preview: {
                                        title: "开发工作流",
                                        body: "建议顺序是：\n- 先 API 契约\n- 再共享运行时\n- 再视图层\n- 再文档示例\n- 最后执行校验命令",
                                    },
                                },
                                {
                                    text: "扩展架构说明",
                                    link: "/frontmatter/reference/extensionArchitecture",
                                    desc: "组件、运行时、配置与样式的职责边界",
                                    preview: {
                                        title: "扩展架构说明",
                                        body: "用这页判断改动应该落在 `api`、`runtime`、`theme/components`、`config` 还是 `docs/src`。",
                                    },
                                },
                                {
                                    text: "Hero 扩展手册",
                                    link: "/frontmatter/reference/heroExtension",
                                    desc: "排版、浮动元素、Shader 与背景扩展方案",
                                    preview: {
                                        title: "Hero 扩展手册",
                                        body: "用于新增排版风格、浮动元素类型、Shader 预设与背景渲染器，而不破坏共享契约。",
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        text: "组件",
        dropdown: {
            layout: "columns",
            panels: [
                {
                    groups: [
                        {
                            label: "Hero 模块",
                            items: [
                                {
                                    text: "图像类型",
                                    link: "/hero/matrix/imageTypes/",
                                    desc: "图片、视频、Lottie、三维模型",
                                    preview: {
                                        title: "图像类型",
                                        body: "在 Hero 框架内渲染丰富媒体：\n\n| 类型 | 键名 |\n|------|------|\n| 静态图片 | `imageFrame` |\n| 视频循环 | `videoFrame` |\n| Lottie JSON | `lottieFrame` |\n| Three.js 模型 | `model3dCentered` |\n| GIF 动图 | `gifFrame` |\n",
                                    },
                                },
                                {
                                    text: "按钮与特性",
                                    link: "/hero/matrix/buttonsFeatures/",
                                    desc: "带图标和主题的 CTA 按钮",
                                    preview: {
                                        title: "按钮与特性",
                                        body: "配置 `primary`、`secondary` 和 `ghost` Hero 按钮。\n\n每个按钮支持图标、外链、滚动目标和 **主题变体**。",
                                    },
                                },
                                {
                                    text: "图层系统",
                                    link: "/hero/matrix/layers/",
                                    desc: "多图层深度合成",
                                    preview: {
                                        title: "多图层 Hero",
                                        body: "叠加最多 **5 个独立图层**，各自拥有混合模式、Z 深度和运动倍率，打造电影级 Hero 效果。",
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    groups: [
                        {
                            label: "基础配置",
                            items: [
                                {
                                    text: "最简配置",
                                    link: "/hero/matrix/basic/",
                                    desc: "Level 1 — 最小 Hero 配置",
                                    preview: {
                                        title: "最简配置",
                                        body: "激活矩阵 Hero 所需的 **最小** Frontmatter：\n\n```yaml\nlayout: home\nhero:\n  name: 我的站点\n```",
                                    },
                                },
                                {
                                    text: "视口动作",
                                    link: "/hero/matrix/basic/level2ViewportActions/",
                                    desc: "滚动与视口驱动动画",
                                    preview: {
                                        title: "视口动作",
                                        body: "通过 IntersectionObserver 触发 **入场动画** 和 **滚动揭示** 效果。",
                                    },
                                },
                                {
                                    text: "CSS 变量",
                                    link: "/hero/matrix/basic/level3PageCssvars/",
                                    desc: "页面级 CSS 自定义属性",
                                    preview: {
                                        title: "CSS 变量",
                                        body: "在专用 Frontmatter 块中 *按页面* 覆盖任意 `--vp-*` 或自定义主题令牌，无需修改全局 CSS。",
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        text: "社区",
        dropdown: {
            layout: "columns",
            panels: [
                {
                    groups: [
                        {
                            label: "加入我们",
                            items: [
                                {
                                    text: "GitHub",
                                    href: "https://github.com/M1hono/M1honoVitepressTemplate",
                                    desc: "源码、Issue 与版本发布",
                                    preview: {
                                        title: "GitHub",
                                        body: '浏览源代码、提交 Issue，并在官方仓库追踪 **版本发布**。\n\n<span style="color:var(--vp-c-brand-1)">⭐ Star 项目以接收更新通知！</span>',
                                        media: {
                                            type: "lottie",
                                            src: "https://raw.githubusercontent.com/b-wils/lottiefiles-test-files/main/data/properties/scalar-linear.json",
                                            alt: "动画插图",
                                            aspect: "16 / 9",
                                        },
                                    },
                                },
                                {
                                    text: "Discord",
                                    href: "https://discord.com",
                                    desc: "实时聊天与技术支持",
                                    preview: {
                                        title: "Discord",
                                        body: "在社区服务器中获取帮助、分享项目，并参与 **更新日志讨论**。",
                                        media: {
                                            type: "lottie",
                                            src: "https://raw.githubusercontent.com/b-wils/lottiefiles-test-files/main/data/properties/bezier-ease.json",
                                            alt: "动画插图",
                                            aspect: "16 / 9",
                                        },
                                    },
                                },
                                {
                                    text: "Twitter / X",
                                    href: "https://twitter.com",
                                    desc: "新闻与公告",
                                    preview: {
                                        title: "Twitter / X",
                                        body: "关注我们，获取 **发布公告**、使用技巧及社区精选内容。",
                                        media: {
                                            type: "lottie",
                                            src: "https://raw.githubusercontent.com/b-wils/lottiefiles-test-files/main/data/shape-style/gradient-linear.json",
                                            alt: "动画插图",
                                            aspect: "16 / 9",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
];

export default zhNav;
