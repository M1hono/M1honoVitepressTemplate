#!/usr/bin/env python3
"""Audit outer and inner frontmatter keys in a VitePress project."""

from __future__ import annotations

import argparse
import json
import re
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import yaml


FRONTMATTER_BOUNDARY = "---"
PREFIX_RE = re.compile(r'"prefix"\s*:\s*"([^"]+)"')
REGISTRY_KEY_RE = re.compile(r'key:\s*"([^"]+)"')


@dataclass
class ParseError:
    file: str
    message: str


def extract_frontmatter(raw: str) -> str | None:
    lines = raw.splitlines()
    if not lines or lines[0].strip() != FRONTMATTER_BOUNDARY:
        return None

    for index in range(1, len(lines)):
        if lines[index].strip() == FRONTMATTER_BOUNDARY:
            return "\n".join(lines[1:index])
    return None


def collect_paths(node: Any, base_path: str, paths: set[str]) -> None:
    if isinstance(node, dict):
        for raw_key, value in node.items():
            key = str(raw_key)
            path = f"{base_path}.{key}" if base_path else key
            paths.add(path)
            collect_paths(value, path, paths)
        return

    if isinstance(node, list):
        wildcard = f"{base_path}[*]" if base_path else "[*]"
        paths.add(wildcard)
        for item in node:
            collect_paths(item, wildcard, paths)


def outer_key_from_path(path: str) -> str:
    head = path.split(".", 1)[0]
    return head.split("[", 1)[0]


def load_snippet_prefixes(path: Path) -> list[str]:
    if not path.exists():
        return []
    raw = path.read_text(encoding="utf-8")
    all_prefixes = PREFIX_RE.findall(raw)
    frontmatter_prefixes: list[str] = []
    for value in all_prefixes:
        if value.startswith("@fm") or value.startswith("@hero") or value.startswith("@frontmatter") or value in ("@page-template", "@root-template"):
            frontmatter_prefixes.append(value)
    return sorted(set(frontmatter_prefixes))


def load_registry_keys(path: Path) -> list[str]:
    if not path.exists():
        return []
    raw = path.read_text(encoding="utf-8")
    keys = REGISTRY_KEY_RE.findall(raw)
    return sorted(set(keys))


def render_markdown(
    repo_root: Path,
    content_root: Path,
    scanned_files: int,
    fm_files: int,
    outer_counter: Counter[str],
    inner_counter: Counter[str],
    sample_files: dict[str, set[str]],
    parse_errors: list[ParseError],
    snippet_prefixes: list[str],
    registry_keys: list[str],
) -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    lines: list[str] = [
        "# Frontmatter Audit",
        "",
        f"- Generated: {now}",
        f"- Repo Root: `{repo_root}`",
        f"- Content Root: `{content_root}`",
        f"- Markdown Files Scanned: **{scanned_files}**",
        f"- Files With Frontmatter: **{fm_files}**",
        "",
        "## Outer Keys",
        "",
        "| Key | Occurrences | Sample Files |",
        "| --- | ---: | --- |",
    ]

    for key, count in sorted(outer_counter.items(), key=lambda item: (-item[1], item[0])):
        examples = sorted(sample_files.get(key, set()))[:3]
        lines.append(f"| `{key}` | {count} | {', '.join(f'`{value}`' for value in examples)} |")

    lines.extend(
        [
            "",
            "## Inner Keys",
            "",
            "| Key Path | Occurrences | Sample Files |",
            "| --- | ---: | --- |",
        ]
    )

    for path, count in sorted(inner_counter.items(), key=lambda item: (-item[1], item[0])):
        examples = sorted(sample_files.get(path, set()))[:3]
        lines.append(f"| `{path}` | {count} | {', '.join(f'`{value}`' for value in examples)} |")

    lines.extend(
        [
            "",
            "## Frontmatter Snippet Prefixes",
            "",
            f"- Found **{len(snippet_prefixes)}** prefixes in `.vscode/md.code-snippets`.",
        ]
    )
    if snippet_prefixes:
        lines.append(f"- {', '.join(f'`{item}`' for item in snippet_prefixes)}")

    lines.extend(
        [
            "",
            "## VSCode Extension Registry Keys",
            "",
            f"- Found **{len(registry_keys)}** keys in `PickAIDDocVSCodeExtension/src/data/FrontmatterRegistry.ts`.",
        ]
    )
    if registry_keys:
        lines.append(f"- {', '.join(f'`{item}`' for item in registry_keys)}")

    lines.extend(
        [
            "",
            "## Parse Errors",
            "",
        ]
    )
    if not parse_errors:
        lines.append("- None")
    else:
        for error in parse_errors:
            lines.append(f"- `{error.file}`: {error.message}")

    return "\n".join(lines) + "\n"


def run() -> int:
    parser = argparse.ArgumentParser(description="Audit outer and inner frontmatter keys.")
    parser.add_argument("--repo-root", required=True, help="Project root path.")
    parser.add_argument("--content-root", default="docs/src", help="Relative path under repo root to scan for markdown files.")
    parser.add_argument("--format", choices=("markdown", "json"), default="markdown", help="Output format.")
    parser.add_argument("--output", help="Optional output file path.")
    args = parser.parse_args()

    repo_root = Path(args.repo_root).expanduser().resolve()
    content_root = (repo_root / args.content_root).resolve()

    markdown_files = sorted(content_root.rglob("*.md"))
    scanned_files = len(markdown_files)

    fm_files = 0
    parse_errors: list[ParseError] = []
    outer_counter: Counter[str] = Counter()
    inner_counter: Counter[str] = Counter()
    sample_files: dict[str, set[str]] = defaultdict(set)

    for path in markdown_files:
        rel_path = str(path.relative_to(repo_root))
        raw = path.read_text(encoding="utf-8")
        frontmatter_raw = extract_frontmatter(raw)
        if frontmatter_raw is None:
            continue
        fm_files += 1

        try:
            parsed = yaml.safe_load(frontmatter_raw) or {}
        except Exception as error:  # pragma: no cover
            parse_errors.append(ParseError(file=rel_path, message=str(error)))
            continue

        if not isinstance(parsed, dict):
            parse_errors.append(ParseError(file=rel_path, message="Frontmatter is not a mapping object."))
            continue

        paths: set[str] = set()
        collect_paths(parsed, "", paths)
        for item in sorted(paths):
            outer = outer_key_from_path(item)
            outer_counter[outer] += 1
            sample_files[outer].add(rel_path)

            if "." in item or "[*]" in item:
                inner_counter[item] += 1
                sample_files[item].add(rel_path)

    snippet_prefixes = load_snippet_prefixes(repo_root / ".vscode" / "md.code-snippets")
    registry_keys = load_registry_keys(
        repo_root.parent / "PickAIDDocVSCodeExtension" / "src" / "data" / "FrontmatterRegistry.ts"
    )

    if args.format == "json":
        result = {
            "repoRoot": str(repo_root),
            "contentRoot": str(content_root),
            "markdownFilesScanned": scanned_files,
            "filesWithFrontmatter": fm_files,
            "outerKeys": outer_counter,
            "innerKeys": inner_counter,
            "snippetPrefixes": snippet_prefixes,
            "registryKeys": registry_keys,
            "parseErrors": [error.__dict__ for error in parse_errors],
        }
        text = json.dumps(result, indent=2, default=lambda value: dict(value))
    else:
        text = render_markdown(
            repo_root=repo_root,
            content_root=content_root,
            scanned_files=scanned_files,
            fm_files=fm_files,
            outer_counter=outer_counter,
            inner_counter=inner_counter,
            sample_files=sample_files,
            parse_errors=parse_errors,
            snippet_prefixes=snippet_prefixes,
            registry_keys=registry_keys,
        )

    if args.output:
        output_path = Path(args.output).expanduser().resolve()
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(text, encoding="utf-8")
    else:
        print(text, end="")

    return 0


if __name__ == "__main__":
    raise SystemExit(run())
