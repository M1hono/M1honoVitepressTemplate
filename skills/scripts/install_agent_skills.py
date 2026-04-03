#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import shutil
from pathlib import Path

EXCLUDED = {"artifacts", "scripts", "support", "__pycache__"}


def resolve_default_dest(profile: str) -> Path:
    env_skill_home = os.environ.get("AGENT_SKILLS_HOME")
    if env_skill_home:
        return Path(env_skill_home).expanduser()

    if profile == "codex":
        codex_home = os.environ.get("CODEX_HOME")
        return (Path(codex_home).expanduser() / "skills") if codex_home else (Path.home() / ".codex" / "skills")

    if profile == "claude":
        claude_home = os.environ.get("CLAUDE_HOME") or os.environ.get("CLAUDE_CODE_HOME")
        return (Path(claude_home).expanduser() / "skills") if claude_home else (Path.home() / ".claude" / "skills")

    candidates = []
    codex_home = os.environ.get("CODEX_HOME")
    claude_home = os.environ.get("CLAUDE_HOME") or os.environ.get("CLAUDE_CODE_HOME")
    if codex_home:
        candidates.append(Path(codex_home).expanduser() / "skills")
    if claude_home:
        candidates.append(Path(claude_home).expanduser() / "skills")
    candidates.extend([
        Path.home() / ".agent-skills",
        Path.home() / ".codex" / "skills",
        Path.home() / ".claude" / "skills",
    ])
    for candidate in candidates:
        if candidate.exists():
            return candidate
    return Path.home() / ".agent-skills"


def discover_skills(skills_root: Path) -> list[Path]:
    return sorted(
        path
        for path in skills_root.iterdir()
        if path.is_dir() and path.name not in EXCLUDED and (path / "SKILL.md").exists()
    )


def install_skill(source: Path, dest_root: Path, force: bool) -> None:
    target = dest_root / source.name
    if target.exists():
        if not force:
            raise FileExistsError(f"Skill already exists: {target}")
        shutil.rmtree(target)
    shutil.copytree(source, target)


def build_agent_sentence() -> str:
    return (
        "Install all M1hono template skills from this repository into the current agent skill folder. "
        "If they already exist, replace them with the repository versions."
    )


def build_fetch_sentence() -> str:
    return (
        "Fetch and follow instructions from "
        "https://raw.githubusercontent.com/M1hono/M1honoVitepressTemplate/main/skills/INSTALL.md"
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Install all M1hono template skills into an agent skill directory.")
    parser.add_argument("--source-root", default=str(Path(__file__).resolve().parents[1]), help="Path to the skills root")
    parser.add_argument("--dest", help="Destination skill directory; overrides profile-based defaults")
    parser.add_argument("--profile", choices=["auto", "codex", "claude"], default="auto", help="Resolve a default destination for a known agent environment")
    parser.add_argument("--force", action="store_true", help="Replace existing installed skills")
    parser.add_argument("--print-sentence", action="store_true", help="Print the natural-language install sentence and exit")
    parser.add_argument("--print-fetch-sentence", action="store_true", help="Print the remote fetch-and-follow install sentence and exit")
    args = parser.parse_args()

    if args.print_sentence:
        print(build_agent_sentence())
        return 0

    if args.print_fetch_sentence:
        print(build_fetch_sentence())
        return 0

    skills_root = Path(args.source_root).expanduser().resolve()
    dest_root = Path(args.dest).expanduser().resolve() if args.dest else resolve_default_dest(args.profile)
    dest_root.mkdir(parents=True, exist_ok=True)

    skills = discover_skills(skills_root)
    if not skills:
        raise SystemExit(f"No skills found under {skills_root}")

    for skill in skills:
        install_skill(skill, dest_root, force=args.force)

    print("Installed skills:")
    for skill in skills:
        print(f"- {skill.name}")
    print(f"Destination: {dest_root}")
    print("Restart your agent session to pick up the updated skills.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
