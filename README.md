# M1hono VitePress Template

A VitePress template with the M1hono documentation stack, visual authoring features, and companion agent skills.

Current release: `2.1.0`

## Release Highlights

- Sidebar traversal now supports Crychic-synced `viewControl` semantics, including root-controlled and child-override modes.
- Shared navigation layouts were refreshed with the current multi-column and spotlight implementations from Crychic.
- Sidebar generation now ships with regression coverage for `viewControl` depth handling.

## Quick Start

This template keeps the VitePress app inside `docs/`.

### With Yarn

```bash
cd docs
yarn install
yarn dev
```

### With npm

```bash
cd docs
npm install --legacy-peer-deps
npm run dev
```

## Project Structure

```text
docs/
├── .vitepress/          # VitePress configuration, theme, plugins, runtime
├── src/                 # Documentation source files
├── package.json         # Site dependencies and scripts
skills/                  # Installable agent skills bundled with this repo
```

## Included Skills

This repository ships installable agent skills for working on the template without rediscovering the full codebase each time.

Included skills:
- `vitepress-frontmatter-architect`
- `vitepress-nav-format-extender`
- `vitepress-nav-format-writer-editor`
- `vitepress-template-extender`
- `vitepress-visual-authoring-system`

## Install Skills

Install all bundled skills into the current agent skill folder:

```bash
python3 skills/scripts/install_agent_skills.py --force
```

Remote agent install sentence:

```text
Fetch and follow instructions from https://raw.githubusercontent.com/M1hono/M1honoVitepressTemplate/main/skills/INSTALL.md
```

Install specifically for Codex:

```bash
python3 skills/scripts/install_agent_skills.py --profile codex --force
```

Install specifically for Claude Code:

```bash
python3 skills/scripts/install_agent_skills.py --profile claude --force
```

Print the reusable natural-language install sentence:

```bash
python3 skills/scripts/install_agent_skills.py --print-sentence
```

Print the reusable fetch-and-follow sentence:

```bash
python3 skills/scripts/install_agent_skills.py --print-fetch-sentence
```

Notes:
- `--force` replaces older installed copies of these skills.
- restart the agent session after installation so the updated skills are loaded.
- only install from this repository root; the installer expects the local `skills/` directory.
- the raw instruction file is [`skills/INSTALL.md`](./skills/INSTALL.md) and can be used directly by agents that support fetch-and-follow style installation.

## Features

- M1hono VitePress theme structure
- multi-language documentation support
- visual authoring runtime for hero, charts, and Mermaid
- root-controlled sidebar traversal and richer shared navigation layouts
- companion agent skills for template extension and maintenance

## Changelog

- See [CHANGELOG.md](./CHANGELOG.md) for release notes.

## Deploy

1. Fork this repository.
2. Enable GitHub Pages in repository settings.
3. Let GitHub Actions build and deploy the site.

Your site will be available at:
`https://yourusername.github.io/yourrepository/`

## Links

- [Live Demo](http://m1hono.github.io/M1honoVitepressTemplate/)

## License

MIT
