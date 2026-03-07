#!/usr/bin/env python3

from __future__ import annotations

import runpy
import os
from pathlib import Path


def resolve_external_sync_script() -> Path:
    explicit_path = os.environ.get("VITEPRESS_DOC_SYNC_SCRIPT")
    if explicit_path:
        return Path(explicit_path).expanduser().resolve()

    codex_home = os.environ.get("CODEX_HOME")
    if codex_home:
        return (
            Path(codex_home).expanduser().resolve()
            / "skills"
            / "vitepress-doc-sync"
            / "scripts"
            / "sync_template_docs.py"
        )

    return (
        Path.home()
        / ".codex"
        / "skills"
        / "vitepress-doc-sync"
        / "scripts"
        / "sync_template_docs.py"
    )


EXTERNAL_SYNC_SCRIPT = resolve_external_sync_script()


if not EXTERNAL_SYNC_SCRIPT.exists():
    raise SystemExit(
        f"External sync script not found: {EXTERNAL_SYNC_SCRIPT}"
    )


runpy.run_path(str(EXTERNAL_SYNC_SCRIPT), run_name="__main__")
