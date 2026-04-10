import assert from "node:assert/strict";
import test from "node:test";

import { applyConfigDefaults } from "../utils/sidebar/config/configDefaultsProvider";
import { createChildTreeContext } from "../utils/sidebar/structure/useChildrenCollapsed";

test("root directories keep their own maxDepth budget in the generated tree", () => {
    const rootConfig = applyConfigDefaults(
        { root: true, title: "Root", maxDepth: 1 },
        "/docs/zh/example",
        "zh",
        false,
    );
    const childConfig = applyConfigDefaults(
        { title: "Child", maxDepth: 5 },
        "/docs/zh/example/child",
        "zh",
        false,
    );

    const transition = createChildTreeContext(
        { ...rootConfig, _activeMaxDepth: rootConfig.maxDepth },
        childConfig,
        0,
    );

    assert.equal(transition.canRecurse, true);
    assert.equal(transition.nextDepth, 1);
    assert.equal(transition.nextConfig._activeMaxDepth, 1);
});

test("non-root directories let direct children use their own maxDepth budget", () => {
    const parentConfig = applyConfigDefaults(
        { title: "Parent", maxDepth: 1 },
        "/docs/zh/example",
        "zh",
        false,
    );
    const childConfig = applyConfigDefaults(
        { title: "Child", maxDepth: 4, root: true },
        "/docs/zh/example/child",
        "zh",
        false,
    );

    const transition = createChildTreeContext(parentConfig, childConfig, 0);

    assert.equal(transition.canRecurse, true);
    assert.equal(transition.nextDepth, 0);
    assert.equal(transition.nextConfig._activeMaxDepth, 4);
    assert.equal(transition.nextConfig._disableRootFlatten, true);
});

test("useChildrenCollapsed is resolved as a display-only config", () => {
    const config = applyConfigDefaults(
        {
            root: true,
            title: "Root",
            useChildrenCollapsed: { mode: "open", depth: 2 },
        },
        "/docs/zh/example",
        "zh",
        false,
    );

    assert.equal(config.useChildrenCollapsed?.mode, "open");
    assert.equal(config.useChildrenCollapsed?.depth, 2);
});
