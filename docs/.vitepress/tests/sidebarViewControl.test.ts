import assert from "node:assert/strict";
import test from "node:test";

import { applyConfigDefaults } from "../utils/sidebar/config/configDefaultsProvider";
import { resolveChildViewTransition } from "../utils/sidebar/structure/viewControl";

test("root directories default to self-controlled traversal", () => {
    const config = applyConfigDefaults(
        { root: true, title: "Root" },
        "/docs/zh/example",
        "zh",
        false
    );

    assert.equal(config.viewControl.mode, "self");
});

test("non-root directories default to descendant-controlled traversal", () => {
    const config = applyConfigDefaults(
        { title: "Child" },
        "/docs/zh/example/child",
        "zh",
        false
    );

    assert.equal(config.viewControl.mode, "all");
});

test("self-controlled roots keep descendant traversal under the root depth budget", () => {
    const parentConfig = applyConfigDefaults(
        { root: true, title: "Root", maxDepth: 1 },
        "/docs/zh/example",
        "zh",
        false
    );
    const childConfig = applyConfigDefaults(
        { title: "Child", maxDepth: 5 },
        "/docs/zh/example/child",
        "zh",
        false
    );

    const transition = resolveChildViewTransition(parentConfig, childConfig, "child", 0);

    assert.equal(transition.parentControlsChild, true);
    assert.equal(transition.canRecurse, true);
    assert.equal(transition.nextDepth, 1);
    assert.equal(transition.nextConfig.maxDepth, 1);
});

test("mode all lets a child restart traversal depth from itself", () => {
    const parentConfig = applyConfigDefaults(
        {
            root: true,
            title: "Root",
            maxDepth: 1,
            viewControl: { mode: "all" },
        },
        "/docs/zh/example",
        "zh",
        false
    );
    const childConfig = applyConfigDefaults(
        { title: "Child", maxDepth: 4, root: true },
        "/docs/zh/example/child",
        "zh",
        false
    );

    const transition = resolveChildViewTransition(parentConfig, childConfig, "child", 0);

    assert.equal(transition.parentControlsChild, false);
    assert.equal(transition.canRecurse, true);
    assert.equal(transition.nextDepth, 0);
    assert.equal(transition.nextConfig._disableRootFlatten, true);
});

test("child override can escape parent control even in self mode", () => {
    const parentConfig = applyConfigDefaults(
        { root: true, title: "Root", maxDepth: 0 },
        "/docs/zh/example",
        "zh",
        false
    );
    const childConfig = applyConfigDefaults(
        {
            title: "Child",
            maxDepth: 2,
            viewControl: { controlledByParent: false },
        },
        "/docs/zh/example/child",
        "zh",
        false
    );

    const transition = resolveChildViewTransition(parentConfig, childConfig, "child", 0);

    assert.equal(transition.parentControlsChild, false);
    assert.equal(transition.canRecurse, true);
    assert.equal(transition.nextDepth, 0);
});
