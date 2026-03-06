#!/usr/bin/env python3

from __future__ import annotations

import argparse
import hashlib
import os
import shutil
import sys
from pathlib import Path


def looks_like_template_root(path: Path) -> bool:
    return (
        (path / ".git").exists()
        and (path / "docs" / ".vitepress").exists()
        and (path / "skills" / "vitepress-doc-sync" / "SKILL.md").exists()
    )


def find_template_root_from(start: Path) -> Path | None:
    for candidate in (start.resolve(), *start.resolve().parents):
        if looks_like_template_root(candidate):
            return candidate
    return None


def resolve_template_root(explicit: Path | None) -> Path:
    if explicit is not None:
        return explicit.expanduser().resolve()

    env_path = os.environ.get("VITEPRESS_TEMPLATE_ROOT")
    if env_path:
        return Path(env_path).expanduser().resolve()

    cwd_match = find_template_root_from(Path.cwd())
    if cwd_match is not None:
        return cwd_match

    script_match = find_template_root_from(Path(__file__))
    if script_match is not None:
        return script_match

    raise SystemExit(
        "Could not infer template root. Run from the template repo or pass --template-root."
    )


def resolve_optional_root(explicit: Path | None, env_name: str, default: Path) -> Path:
    if explicit is not None:
        return explicit.expanduser().resolve()

    env_path = os.environ.get(env_name)
    if env_path:
        return Path(env_path).expanduser().resolve()

    return default

CLONE_SYNC_PATHS = [
    "docs/src/en-US/frontmatter/content/index.md",
    "docs/src/zh-CN/frontmatter/content/index.md",
    "docs/src/en-US/frontmatter/content/contentAndUi.md",
    "docs/src/zh-CN/frontmatter/content/contentAndUi.md",
    "docs/src/en-US/frontmatter/content/featuresAndHome.md",
    "docs/src/zh-CN/frontmatter/content/featuresAndHome.md",
    "docs/src/en-US/frontmatter/page/index.md",
    "docs/src/zh-CN/frontmatter/page/index.md",
    "docs/src/en-US/frontmatter/page/globalPage.md",
    "docs/src/zh-CN/frontmatter/page/globalPage.md",
    "docs/src/en-US/frontmatter/page/sidebarAutoSystem.md",
    "docs/src/zh-CN/frontmatter/page/sidebarAutoSystem.md",
    "docs/src/en-US/frontmatter/index.md",
    "docs/src/zh-CN/frontmatter/index.md",
    "docs/src/en-US/frontmatter/hero/heroRuntime.md",
    "docs/src/zh-CN/frontmatter/hero/heroRuntime.md",
    "docs/src/en-US/frontmatter/hero/index.md",
    "docs/src/zh-CN/frontmatter/hero/index.md",
    "docs/src/en-US/frontmatter/reference/index.md",
    "docs/src/zh-CN/frontmatter/reference/index.md",
    "docs/src/en-US/frontmatter/reference/keyInventory.md",
    "docs/src/zh-CN/frontmatter/reference/keyInventory.md",
    "docs/src/en-US/frontmatter/reference/maintainability.md",
    "docs/src/zh-CN/frontmatter/reference/maintainability.md",
    "docs/src/en-US/frontmatter/reference/developmentWorkflow.md",
    "docs/src/zh-CN/frontmatter/reference/developmentWorkflow.md",
    "docs/src/en-US/frontmatter/reference/extensionArchitecture.md",
    "docs/src/zh-CN/frontmatter/reference/extensionArchitecture.md",
    "docs/src/en-US/frontmatter/reference/heroExtension.md",
    "docs/src/zh-CN/frontmatter/reference/heroExtension.md",
    "docs/src/en-US/hero/AllConfig.md",
    "docs/src/zh-CN/hero/AllConfig.md",
]

CRYCHIC_MARKERS = {
    "docs/en/doc/frameworkMaintainability.md": [
        "Detailed Pages",
        "Development Workflow",
        "Extension Architecture",
        "Hero Extension Playbook",
    ],
    "docs/zh/doc/frameworkMaintainability.md": [
        "详细页面",
        "开发工作流",
        "扩展架构说明",
        "Hero 扩展手册",
    ],
    "docs/en/doc/developmentWorkflow.md": ["Development Workflow", "Start With the Contract", "Task Entry Patterns"],
    "docs/zh/doc/developmentWorkflow.md": ["开发工作流", "先从契约层开始", "常见任务起点"],
    "docs/en/doc/extensionArchitecture.md": ["Extension Architecture", "Architectural Rule", "Register New Content"],
    "docs/zh/doc/extensionArchitecture.md": ["扩展架构说明", "架构分层规则", "注册新的内容组件"],
    "docs/en/doc/heroExtension.md": ["Hero Extension Playbook", "Core Hero Extension Points", "Create a New Hero Page", "Add a New Hero Feature"],
    "docs/zh/doc/heroExtension.md": ["Hero 扩展手册", "Hero 关键扩展点", "创建新的 Hero 页面", "新增 Hero 特性"],
    "docs/en/doc/Description.md": ["Developer Docs", "Development Workflow"],
    "docs/zh/doc/Description.md": ["开发文档", "开发工作流"],
    "docs/en/index.md": ["Developer Docs"],
    "docs/zh/index.md": ["开发手册"],
    ".vitepress/config/locale/en-US/nav.ts": ["Development Workflow", "Hero Extension"],
    ".vitepress/config/locale/zh-CN/nav.ts": ["开发工作流", "Hero 扩展手册"],
    ".vitepress/config/locale/nav.template.ts": ["Development Workflow", "Hero Extension"],
}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def check_toolkit(template_root: Path, toolkit_root: Path) -> int:
    exit_code = 0
    print("Toolkit clone sync status:")
    for rel in CLONE_SYNC_PATHS:
        src = template_root / rel
        dst = toolkit_root / rel
        if not src.exists():
            print(f"  MISSING SOURCE  {rel}")
            exit_code = 1
            continue
        if not dst.exists():
            print(f"  MISSING TARGET  {rel}")
            exit_code = 1
            continue
        same = sha256(src) == sha256(dst)
        label = "OK   " if same else "DIFF "
        print(f"  {label} {rel}")
        if not same:
            exit_code = 1
    return exit_code


def sync_toolkit(template_root: Path, toolkit_root: Path) -> int:
    print("Syncing toolkit-box-page developer docs from template:")
    for rel in CLONE_SYNC_PATHS:
        src = template_root / rel
        dst = toolkit_root / rel
        if not src.exists():
            print(f"  SKIP missing source {rel}")
            continue
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        print(f"  COPIED {rel}")
    return 0


def check_crychic(crychic_root: Path) -> int:
    exit_code = 0
    print("CrychicDoc adapted sync status:")
    for rel, markers in CRYCHIC_MARKERS.items():
        path = crychic_root / rel
        if not path.exists():
            print(f"  MISSING FILE   {rel}")
            exit_code = 1
            continue
        text = path.read_text(encoding="utf-8")
        missing = [marker for marker in markers if marker not in text]
        if missing:
            print(f"  MISSING MARKER {rel} -> {', '.join(missing)}")
            exit_code = 1
            continue
        print(f"  OK             {rel}")
    return exit_code


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Check or sync template-derived developer docs across repos.",
    )
    parser.add_argument(
        "command",
        choices=["check", "sync-toolkit", "check-crychic"],
        nargs="?",
        default="check",
    )
    parser.add_argument("--template-root", type=Path)
    parser.add_argument("--toolkit-root", type=Path)
    parser.add_argument("--crychic-root", type=Path)
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    template_root = resolve_template_root(args.template_root)
    workspace_root = template_root.parent
    toolkit_root = resolve_optional_root(
        args.toolkit_root,
        "VITEPRESS_TOOLKIT_ROOT",
        workspace_root / "toolkit-box-page",
    )
    crychic_root = resolve_optional_root(
        args.crychic_root,
        "VITEPRESS_CRYCHIC_ROOT",
        workspace_root / "CrychicDoc",
    )

    if args.command == "sync-toolkit":
        return sync_toolkit(template_root, toolkit_root)

    if args.command == "check-crychic":
        return check_crychic(crychic_root)

    toolkit_status = check_toolkit(template_root, toolkit_root)
    crychic_status = check_crychic(crychic_root)
    return 0 if toolkit_status == 0 and crychic_status == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
