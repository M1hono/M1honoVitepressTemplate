# VitePress Template Advanced

🚀 **A feature-rich VitePress template for creating beautiful documentation websites**

## Quick Start

This template has been restructured to keep all configuration and source files in the `docs/` directory for better organization.

```bash
cd docs/
npm install --legacy-peer-deps
npm run dev
```

Yarn:

```bash
cd docs/
yarn install
yarn dev
```

``

## 📁 Project Structure

```
├── docs/                     # Main documentation directory
│   ├── package.json         # Dependencies and scripts
│   ├── tsconfig.json        # TypeScript configuration  
│   ├── .gitignore           # Git ignore rules
│   ├── LICENSE              # Project license
│   ├── yarn.lock            # Dependency lock file
│   ├── .vitepress/          # VitePress configuration
│   │   ├── config/          # Configuration files
│   │   ├── theme/           # Custom theme
│   │   ├── scripts/         # Build scripts
│   │   └── utils/           # Utility functions
│   └── src/                 # Documentation source files
│       ├── index.md         # Homepage
│       ├── test.md          # Feature demonstration
│       └── public/          # Static assets
├── .github/workflows/       # GitHub Actions workflows
└── README.md               # This file
```

## Links

- **[Complete Documentation](./docs/README.md)** - Full setup and usage guide
- **[Live Demo](http://m1hono.github.io/M1honoVitepressTemplate/)** - See the template in action

## Features

- Modern and clean design
- Multi-language support (Chinese/English)
- Advanced search with Algolia
- Mermaid diagrams support
- Mathematical expressions with KaTeX
- Responsive design
- Lightning fast performance
- Advanced plugin system

## Quick Deploy

1. **Fork this repository**
2. **Enable GitHub Pages in repository settings**
3. **GitHub Actions will automatically build and deploy**

That's it! Your documentation site will be available at `https://yourusername.github.io/yourrepository/`

## License

MIT License - see [LICENSE](./docs/LICENSE) for details.

---

If this template helps you, please give it a star!