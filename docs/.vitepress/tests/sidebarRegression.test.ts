import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, utimesSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { clearCache, _internalConfigureSidebar, isSidebarCacheStale } from "../utils/sidebar/lib";
import { generateSidebars } from "../utils/sidebar/main";

test("generateSidebars keeps GitBook SUMMARY sections in output", async (t) => {
    const rootDir = mkdtempSync(path.join(tmpdir(), "m1-sidebar-gitbook-"));
    t.after(() => {
        rmSync(rootDir, { recursive: true, force: true });
    });

    const docsPath = path.join(rootDir, "docs");
    const gitbookDir = path.join(docsPath, "en-US", "guide");
    mkdirSync(gitbookDir, { recursive: true });
    writeFileSync(path.join(gitbookDir, "SUMMARY.md"), "* [Intro](README.md)\n");
    writeFileSync(path.join(gitbookDir, "README.md"), "# Intro\n");

    const result = await generateSidebars({
        docsPath,
        isDevMode: false,
        lang: "en-US",
    });

    assert.ok(result, "expected sidebar output");
    assert.deepEqual(Object.keys(result).sort(), ["/en-US/guide/"]);
    assert.equal(result["/en-US/guide/"]?.[0]?.text, "Intro");
});

test("isSidebarCacheStale invalidates cache when .sidebarrc.yml changes", (t) => {
    const rootDir = mkdtempSync(path.join(tmpdir(), "m1-sidebar-cache-"));
    const docsDir = path.join(rootDir, "docs");
    const langDir = path.join(docsDir, "en-US");
    const cacheDir = path.join(rootDir, ".cache", "sidebar");
    const configPath = path.join(docsDir, ".sidebarrc.yml");
    const indexPath = path.join(langDir, "index.md");
    const cachePath = path.join(cacheDir, "sidebar_en-US.json");

    t.after(() => {
        clearCache();
        rmSync(rootDir, { recursive: true, force: true });
    });

    mkdirSync(langDir, { recursive: true });
    mkdirSync(cacheDir, { recursive: true });
    writeFileSync(configPath, "defaults:\n  maxDepth: 2\n");
    writeFileSync(indexPath, "---\nroot: true\n---\n");
    writeFileSync(cachePath, "{}\n");

    const now = Date.now();
    const docTime = new Date(now - 120_000);
    const cacheTime = new Date(now - 60_000);
    const configTime = new Date(now - 5_000);
    utimesSync(indexPath, docTime, docTime);
    utimesSync(cachePath, cacheTime, cacheTime);
    utimesSync(configPath, configTime, configTime);

    _internalConfigureSidebar({
        rootDir,
        docsDir: "./docs",
        cacheDir: "./.cache/sidebar",
        debug: false,
        devMode: false,
        languages: ["en-US"],
    });

    assert.equal(isSidebarCacheStale("en-US"), true);
});
