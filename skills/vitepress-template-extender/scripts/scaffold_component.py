#!/usr/bin/env python3
"""
Scaffold a new VitePress template component and locale files.

This script is intentionally minimal and safe:
- Default mode is dry-run.
- Writes files only with --write.
- Does not mutate existing registration files automatically.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


CATEGORIES = {"content", "ui", "media", "navigation", "hero"}


def to_kebab(name: str) -> str:
    s1 = re.sub(r"(.)([A-Z][a-z]+)", r"\1-\2", name)
    s2 = re.sub(r"([a-z0-9])([A-Z])", r"\1-\2", s1)
    return s2.replace("_", "-").lower()


def to_pascal(name: str) -> str:
    cleaned = re.sub(r"[^a-zA-Z0-9]+", " ", name).strip()
    parts = [p for p in cleaned.split() if p]
    return "".join(p[:1].upper() + p[1:] for p in parts)


def make_component_template(component_name: str, component_id: str) -> str:
    return f"""<script setup lang="ts">
import {{ useSafeI18n }} from "../../../utils/i18n/locale";

const {{ t }} = useSafeI18n("{component_id}", {{
    title: "{component_name}",
    description: "Update translations in locale JSON files.",
}});
</script>

<template>
    <section class="{component_id}">
        <h3>{{{{ t.title }}}}</h3>
        <p>{{{{ t.description }}}}</p>
    </section>
</template>

<style scoped>
.{component_id} {{
    padding: 1rem;
    border: 1px solid var(--vp-c-divider);
    border-radius: 10px;
}}
</style>
"""


def make_locale_template(component_name: str) -> str:
    return (
        "{\n"
        f'    "title": "{component_name}",\n'
        '    "description": "Update this localized copy."\n'
        "}\n"
    )


def relative_component_path(category: str, component_name: str) -> str:
    return f"{category}/{component_name}"


def main() -> int:
    parser = argparse.ArgumentParser(description="Scaffold template component files")
    parser.add_argument("--repo-root", required=True, help="Path to repository root")
    parser.add_argument("--name", required=True, help="Component name (PascalCase preferred)")
    parser.add_argument("--category", required=True, choices=sorted(CATEGORIES))
    parser.add_argument("--component-id", help="i18n component id (kebab-case)")
    parser.add_argument("--write", action="store_true", help="Actually write files")
    parser.add_argument("--force", action="store_true", help="Overwrite existing files")
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    vitepress_root = repo_root / "docs" / ".vitepress"
    if not vitepress_root.exists():
        print(f"[ERROR] Missing expected directory: {vitepress_root}")
        return 1

    component_name = to_pascal(args.name)
    if not component_name:
        print("[ERROR] Invalid component name after normalization")
        return 1
    component_id = args.component_id or to_kebab(component_name)

    component_dir = vitepress_root / "theme" / "components" / args.category
    component_file = component_dir / f"{component_name}.vue"

    locale_rel = relative_component_path(args.category, component_name)
    locale_en = (
        vitepress_root
        / "config"
        / "locale"
        / "en-US"
        / "components"
        / f"{locale_rel}.json"
    )
    locale_zh = (
        vitepress_root
        / "config"
        / "locale"
        / "zh-CN"
        / "components"
        / f"{locale_rel}.json"
    )

    planned = [
        (component_file, make_component_template(component_name, component_id)),
        (locale_en, make_locale_template(component_name)),
        (locale_zh, make_locale_template(component_name)),
    ]

    print("[PLAN] Files to create/update:")
    for path, _ in planned:
        print(f"  - {path}")

    if not args.write:
        print("\n[DRY-RUN] No files written. Re-run with --write to apply.")
    else:
        for path, content in planned:
            if path.exists() and not args.force:
                print(f"[SKIP] Exists (use --force to overwrite): {path}")
                continue
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content)
            print(f"[OK] Wrote: {path}")

    print("\n[NEXT] Manual wiring checklist:")
    print(
        f"1) Export component in docs/.vitepress/theme/components/{args.category}/index.ts"
    )
    print("2) Register global component in docs/.vitepress/utils/vitepress/components.ts")
    print(
        "3) Add component id mapping in docs/.vitepress/config/locale/component-id-mapping.json"
    )
    print("4) Run from docs/: yarn locale && yarn build")
    print(f"\n[INFO] Suggested component-id: {component_id}")
    print(f"[INFO] Suggested locale path mapping: {locale_rel}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
