import assert from "node:assert/strict";
import test from "node:test";

import {
    buildBreadcrumbItems,
    resolveBaseAwareHref,
} from "../utils/vitepress/runtime/navigation/linkResolution";

test("buildBreadcrumbItems links locale parent crumbs when matching index pages exist", () => {
    const items = buildBreadcrumbItems({
        routePath:
            "/M1honoVitepressTemplate/en-US/frontmatter/reference/developmentWorkflow.html",
        siteBase: "/M1honoVitepressTemplate/",
        homeLink: "/en-US/",
        homeText: "Home",
        pageTitle: "Development Workflow",
        localeCodes: ["en-US", "zh-CN"],
        knownPagePaths: new Set([
            "/en-US/frontmatter/",
            "/en-US/frontmatter/reference/",
            "/en-US/frontmatter/reference/developmentWorkflow/",
        ]),
        navTree: [
            {
                text: "Frontmatter",
                link: "/frontmatter/",
            },
            {
                text: "Reference",
                link: "/frontmatter/reference/",
            },
            {
                text: "Development Workflow",
                link: "/frontmatter/reference/developmentWorkflow/",
            },
        ],
    });

    assert.deepEqual(items, [
        { text: "Home", link: "/en-US/" },
        { text: "Frontmatter", link: "/en-US/frontmatter/" },
        { text: "Reference", link: "/en-US/frontmatter/reference/" },
        {
            text: "Development Workflow",
            link: "/en-US/frontmatter/reference/developmentWorkflow/",
        },
    ]);
});

test("buildBreadcrumbItems leaves missing parent pages non-clickable", () => {
    const items = buildBreadcrumbItems({
        routePath:
            "/M1honoVitepressTemplate/en-US/frontmatter/reference/developmentWorkflow.html",
        siteBase: "/M1honoVitepressTemplate/",
        homeLink: "/en-US/",
        homeText: "Home",
        pageTitle: "Development Workflow",
        localeCodes: ["en-US", "zh-CN"],
        knownPagePaths: new Set([
            "/en-US/frontmatter/reference/developmentWorkflow/",
        ]),
        navTree: [
            {
                text: "Frontmatter",
                link: "/frontmatter/",
            },
            {
                text: "Reference",
                link: "/frontmatter/reference/",
            },
        ],
    });

    assert.deepEqual(items, [
        { text: "Home", link: "/en-US/" },
        { text: "Frontmatter", link: undefined },
        { text: "Reference", link: undefined },
        {
            text: "Development Workflow",
            link: "/en-US/frontmatter/reference/developmentWorkflow/",
        },
    ]);
});

test("resolveBaseAwareHref applies site base only to internal links", () => {
    const applyBase = (value: string) => `/M1honoVitepressTemplate${value}`;

    assert.equal(
        resolveBaseAwareHref("/downloads", applyBase),
        "/M1honoVitepressTemplate/downloads",
    );
    assert.equal(
        resolveBaseAwareHref("https://vitepress.dev", applyBase),
        "https://vitepress.dev",
    );
});
