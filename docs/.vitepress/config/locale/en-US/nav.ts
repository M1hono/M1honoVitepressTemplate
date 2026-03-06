/**
 * English (en-US) navigation configuration.
 *
 * @module config/locale/en-US/nav
 * @description
 * Defines the top-level navigation structure for English users.
 *
 * - `link` fields are root-relative **without** locale prefix (e.g. `/hero/matrix/`).
 *   `prefixNavLinks` in `api/navigation/NavLinkAccessService.ts` automatically prepends `/en-US/` at runtime.
 * - `href` is used for external URLs (opens in new tab).
 * - `body` in preview supports full Markdown rendered via `markdown-it`
 *   (bold, italic, code, links, images, HTML colour spans, fenced blocks, etc.).
 *
 * Real page routes verified against `docs/src/en-US/**` source tree.
 */

import type { NavItem } from "../../../utils/config/navTypes";

const enNav: NavItem[] = [
    {
        text: "Home",
        link: "/",
    },
    {
        text: "Docs",
        dropdown: {
            layout: "spotlight",
            panels: [
                {
                    featured: {
                        title: "Getting Started",
                        desc: "Clone, configure and deploy the M1hono VitePress Template.",
                        link: "/",
                        media: {
                            type: "image",
                            src: "/svg/logo.svg",
                            alt: "M1hono logo",
                            background:
                                "linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg-soft))",
                        },
                    },
                    groups: [
                        {
                            label: "Hero & Layout",
                            items: [
                                {
                                    text: "Hero Matrix",
                                    link: "/hero/matrix/",
                                    desc: "Frontmatter-driven hero layouts",
                                    preview: {
                                        title: "Hero Matrix",
                                        body: [
                                            "Control **layout**, motion intensity, waves, floating layers, and media — all from frontmatter.",
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
                                    text: "Matrix Waves",
                                    link: "/hero/matrix/waves/",
                                    desc: "Animated sine-wave backgrounds",
                                    preview: {
                                        title: "Matrix Waves",
                                        body: "Tune **wave height**, opacity, speed, and blend mode.\nWorks on mobile with configurable breakpoint scaling.\n\n`waves.enabled: true`",
                                    },
                                },
                                {
                                    text: "Floating Layers",
                                    link: "/hero/matrix/floating/",
                                    desc: "Parallax floating image layers",
                                    preview: {
                                        title: "Floating Layers",
                                        body: "Add **parallax depth** with images that react to mouse movement and scroll.\n\nSupports up to 4 independent depth planes:\n- `level1Text` &mdash; text overlays\n- `level2Cards` &mdash; card floats\n- `level3Mixed` &mdash; blended media",
                                    },
                                },
                                {
                                    text: "Background Layers",
                                    link: "/hero/matrix/backgroundSingle/",
                                    desc: "Full-bleed images, particles, shaders",
                                    preview: {
                                        title: "Background Layers",
                                        body: "Apply a full-bleed background behind the hero:\n\n| Mode | Description |\n|------|-------------|\n| `image` | Static image with blend mode |\n| `particles` | Animated particle field |\n| `shader` | GLSL fragment shader |\n| `video` | Looping video |\n\n![Background preview](/icon/mainindex/mdi--professional-hexagon.png)\n",
                                    },
                                },
                            ],
                        },
                        {
                            label: "Reference",
                            items: [
                                {
                                    text: "All Config",
                                    link: "/hero/AllConfig/",
                                    desc: "Complete frontmatter reference",
                                    badge: { text: "ref", type: "info" },
                                    preview: {
                                        title: "All Config",
                                        body: 'A **single-page reference** listing every supported frontmatter key with types, defaults, and examples.\n\n<span style="color:var(--vp-c-brand-1)">**Tip:**</span> Use `Ctrl+F` to jump to any property.',
                                    },
                                },
                                {
                                    text: "Styles & Plugins",
                                    link: "/stylesPlugins/",
                                    desc: "Built-in Markdown-It plugins & CSS vars",
                                    preview: {
                                        title: "Styles & Plugins",
                                        body: "Pre-installed extensions:\n- **markdown-it-mathjax3** — LaTeX math\n- **vitepress-plugin-tabs** — tabbed code groups\n- `@nolebase/vitepress-plugin-git-changelog` — git log blocks\n\n![Markdown icon](/icon/mainindex/material-symbols--markdown-copy-sharp.png)",
                                    },
                                },
                            ],
                        },
                        {
                            label: "Developer Guides",
                            items: [
                                {
                                    text: "Maintainability Guide",
                                    link: "/frontmatter/reference/maintainability",
                                    desc: "High-level extension standards and ownership rules",
                                    preview: {
                                        title: "Maintainability Guide",
                                        body: "Start here when changing the template itself.\n\nCovers contract-first implementation, runtime ownership, and cross-repo sync expectations.",
                                    },
                                },
                                {
                                    text: "Development Workflow",
                                    link: "/frontmatter/reference/developmentWorkflow",
                                    desc: "Change order and verification flow",
                                    preview: {
                                        title: "Development Workflow",
                                        body: "Follow the expected sequence:\n- API contract\n- Shared runtime\n- Rendering layer\n- Docs/examples\n- Verification commands",
                                    },
                                },
                                {
                                    text: "Extension Architecture",
                                    link: "/frontmatter/reference/extensionArchitecture",
                                    desc: "Where components, runtime, config, and styles belong",
                                    preview: {
                                        title: "Extension Architecture",
                                        body: "Use the architecture map to decide whether a change belongs in `api`, `runtime`, `theme/components`, `config`, or `docs/src`.",
                                    },
                                },
                                {
                                    text: "Hero Extension",
                                    link: "/frontmatter/reference/heroExtension",
                                    desc: "Typography, floating, shader, and background extension playbook",
                                    preview: {
                                        title: "Hero Extension",
                                        body: "Use the hero playbook to add typography styles, floating item types, shader presets, and background renderers without breaking the shared contract.",
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
        text: "Components",
        dropdown: {
            layout: "columns",
            panels: [
                {
                    groups: [
                        {
                            label: "Hero Modules",
                            items: [
                                {
                                    text: "Image Types",
                                    link: "/hero/matrix/imageTypes/",
                                    desc: "Image, video, Lottie, 3D model",
                                    preview: {
                                        title: "Image Types",
                                        body: "Render rich media inside the hero frame:\n\n| Type | Key |\n|------|-----|\n| Static image | `imageFrame` |\n| Video loop | `videoFrame` |\n| Lottie JSON | `lottieFrame` |\n| Three.js model | `model3dCentered` |\n| Animated GIF | `gifFrame` |\n",
                                    },
                                },
                                {
                                    text: "Buttons & Features",
                                    link: "/hero/matrix/buttonsFeatures/",
                                    desc: "CTA buttons with icons & themes",
                                    preview: {
                                        title: "Buttons & Features",
                                        body: "Configure `primary`, `secondary`, and `ghost` hero buttons.\n\nSupports icon, external link, scroll-to target, and **theme variants** per button.",
                                    },
                                },
                                {
                                    text: "Layers",
                                    link: "/hero/matrix/layers/",
                                    desc: "Multi-layer depth composition",
                                    preview: {
                                        title: "Multi-Layer Hero",
                                        body: "Compose up to **5 stacked layers** with independent blend modes, Z-depths, and motion multipliers for a cinematic hero effect.",
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    groups: [
                        {
                            label: "Basic Config",
                            items: [
                                {
                                    text: "Minimal Setup",
                                    link: "/hero/matrix/basic/",
                                    desc: "Level 1 — minimal hero config",
                                    preview: {
                                        title: "Minimal Setup",
                                        body: "The absolute **minimum** frontmatter to activate the matrix hero:\n\n```yaml\nlayout: home\nhero:\n  name: My Site\n```",
                                    },
                                },
                                {
                                    text: "Viewport Actions",
                                    link: "/hero/matrix/basic/level2ViewportActions/",
                                    desc: "Scroll & viewport-driven animations",
                                    preview: {
                                        title: "Viewport Actions",
                                        body: "Trigger **entrance animations** and **scroll reveals** based on the viewport intersection observer.",
                                    },
                                },
                                {
                                    text: "CSS Variables",
                                    link: "/hero/matrix/basic/level3PageCssvars/",
                                    desc: "Page-scoped CSS custom properties",
                                    preview: {
                                        title: "CSS Variables",
                                        body: "Override any `--vp-*` or custom theme token *per page* using a dedicated frontmatter block — no global CSS changes needed.",
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
        text: "Community",
        dropdown: {
            layout: "columns",
            panels: [
                {
                    groups: [
                        {
                            label: "Connect",
                            items: [
                                {
                                    text: "GitHub",
                                    href: "https://github.com/M1hono/M1honoVitepressTemplate",
                                    desc: "Source code, issues & releases",
                                    preview: {
                                        title: "GitHub",
                                        body: 'Browse source code, file issues, and track **releases** on the official repository.\n\n<span style="color:var(--vp-c-brand-1)">⭐ Star us to follow updates!</span>',
                                        media: {
                                            type: "lottie",
                                            src: "https://raw.githubusercontent.com/b-wils/lottiefiles-test-files/main/data/properties/scalar-linear.json",
                                            alt: "Animated illustration",
                                            aspect: "16 / 9",
                                        },
                                    },
                                },
                                {
                                    text: "Discord",
                                    href: "https://discord.com",
                                    desc: "Live chat & support",
                                    preview: {
                                        title: "Discord",
                                        body: "Get help, share your project, and join **changelog discussions** in the community server.",
                                        media: {
                                            type: "lottie",
                                            src: "https://raw.githubusercontent.com/b-wils/lottiefiles-test-files/main/data/properties/bezier-ease.json",
                                            alt: "Animated illustration",
                                            aspect: "16 / 9",
                                        },
                                    },
                                },
                                {
                                    text: "Twitter / X",
                                    href: "https://twitter.com",
                                    desc: "News & announcements",
                                    preview: {
                                        title: "Twitter / X",
                                        body: "Follow for **launch announcements**, tips, and community showcase highlights.",
                                        media: {
                                            type: "lottie",
                                            src: "https://raw.githubusercontent.com/b-wils/lottiefiles-test-files/main/data/shape-style/gradient-linear.json",
                                            alt: "Animated illustration",
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

export default enNav;
