# Visual Change Playbook

## Hero workflow

1. Update the author-facing contract in `docs/.vitepress/utils/vitepress/api/frontmatter/hero/**`.
2. Update runtime normalization or state in `docs/.vitepress/utils/vitepress/runtime/hero/**`.
3. Update render components in `docs/.vitepress/theme/components/hero/**`.
4. Update extension registry, localized field text, and Hero Editor runtime in `PickAIDDocVSCodeExtension/src/services/hero/**`.
5. Add or refresh real markdown examples in the template docs.
6. Verify template build and extension compile.

## Chart workflow

1. Update shared types in `docs/.vitepress/plugins/chart/types.ts` when the config surface changes.
2. Update parser or builder logic in `docs/.vitepress/plugins/chart/parsers/**` and `builders/**`.
3. If text placeholders or remote fetch behavior are affected, update `docs/.vitepress/utils/vitepress/runtime/text/dynamicText.ts`.
4. If palette behavior changes, update `docs/.vitepress/utils/charts/index.ts` and the editor palette logic.
5. Update the extension chart editor state, layout, guide text, and serialization in `PickAIDDocVSCodeExtension/src/services/chart/**`.
6. Add or refresh docs examples for the affected chart types.
7. Verify template build and extension compile.

## Mermaid workflow

1. Update template-side Mermaid enablement or bootstrap behavior first.
2. Update extension diagram type truth or structured editor support in `PickAIDDocVSCodeExtension/src/services/diagram/**`.
3. Update Smart Insert and CodeLens entry points when supported Mermaid types change.
4. Refresh example markdown blocks in the template docs.
5. Verify template build and extension compile.

## Cross-system rules

1. Do not update editor labels without updating runtime truth when the contract changed.
2. Do not add a new supported chart or Mermaid feature in the editor unless the template runtime already supports it, or both ship together.
3. When only prose or docs change, update the affected docs directly instead of treating repo-to-repo sync as part of the skill system.
4. When only schema or docs change without editor or runtime work, prefer `vitepress-frontmatter-architect`.
