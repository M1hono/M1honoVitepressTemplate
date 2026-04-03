# M1hono Template Skills Install

Use this file when an agent should install the bundled skills without exploring the repository manually.

## Goal

Install all skills from the `skills/` directory of the `M1hono/M1honoVitepressTemplate` repository into the current agent skill folder, replacing older copies if they already exist.

## Preferred command

Run this from the repository root:

```bash
python3 skills/scripts/install_agent_skills.py --force
```

## Agent-specific variants

Install for Codex:

```bash
python3 skills/scripts/install_agent_skills.py --profile codex --force
```

Install for Claude Code:

```bash
python3 skills/scripts/install_agent_skills.py --profile claude --force
```

## If the repository is not cloned yet

1. Clone `https://github.com/M1hono/M1honoVitepressTemplate.git`.
2. Open the repository root.
3. Run one of the install commands above.

## Expected result

- The following skills are installed:
  - `vitepress-frontmatter-architect`
  - `vitepress-nav-format-extender`
  - `vitepress-nav-format-writer-editor`
  - `vitepress-template-extender`
  - `vitepress-visual-authoring-system`
- Existing copies are replaced when `--force` is used.
- The agent session should be restarted after installation so the updated skills are loaded.
