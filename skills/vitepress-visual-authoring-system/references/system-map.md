# Visual System Map

## Hero

### Template runtime

- Frontmatter contract: `docs/.vitepress/utils/vitepress/api/frontmatter/hero/**`
- Runtime state: `docs/.vitepress/utils/vitepress/runtime/hero/**`
- Theme integration: `docs/.vitepress/utils/vitepress/runtime/theme/heroThemeContext.ts`
- Render surface: `docs/.vitepress/theme/components/hero/**`
- Author docs/examples: `docs/src/*/frontmatter/hero/**`, `docs/src/*/hero/**`, `docs/src/*/frontmatter/reference/heroExtension.md`

### Extension editor

- Hero registry and text: `PickAIDDocVSCodeExtension/src/services/hero/HeroRegistry.ts`, `HeroFieldText.ts`, `HeroUiText.ts`
- Editor runtime/webview: `PickAIDDocVSCodeExtension/src/services/hero/HeroWebview*.ts`
- Data serialization: `PickAIDDocVSCodeExtension/src/services/hero/HeroDataService.ts`, `YamlParser.ts`

## Charts

### Template runtime

- Entry points: `docs/.vitepress/plugins/chart/plugin.ts`, `ChartOptionFactory.ts`, `ChartDataParser.ts`
- Parsers: `docs/.vitepress/plugins/chart/parsers/**`
- Builders: `docs/.vitepress/plugins/chart/builders/**`
- Shared behavior: `docs/.vitepress/plugins/chart/helpers.ts`, `types.ts`
- Palettes: `docs/.vitepress/utils/charts/index.ts`
- Dynamic text and fetch placeholders: `docs/.vitepress/utils/vitepress/runtime/text/dynamicText.ts`

### Extension editor

- Source container handling: `PickAIDDocVSCodeExtension/src/services/chart/ChartContainerDocument.ts`
- Editor UI/layout: `PickAIDDocVSCodeExtension/src/services/chart/ChartEditorHtml.ts`, `ChartEditorLayout.ts`, `ChartEditorStyles.ts`
- State and serialization: `ChartEditorStateScript.ts`, `ChartEditorInteractionScript.ts`, `ChartEditorDataModelScript.ts`
- Guide/palette support: `ChartEditorGuideScript.ts`, `ChartEditorPaletteScript.ts`, `ChartEditorTypes.ts`

## Mermaid

### Template runtime

- Feature toggle: `docs/.vitepress/config/project-config.ts`
- Runtime bootstrap: `docs/.vitepress/utils/vitepress/runtime/theme/themeSiteBootstraps.ts`
- Mermaid config helper: `docs/.vitepress/utils/charts/mermaid*`
- Markdown plugin wiring: `docs/.vitepress/config/markdown-plugins.ts`

### Extension editor

- Diagram type truth: `PickAIDDocVSCodeExtension/src/services/diagram/DiagramEditorTypes.ts`
- Editor shell/runtime: `DiagramEditorHtml.ts`, `DiagramEditorScript.ts`, `DiagramEditorRuntimeScript.ts`
- Structured editing: `DiagramStructured*.ts`
- Block detection: `PickAIDDocVSCodeExtension/src/commands/diagramEditorBlocks.ts`
- Smart Insert and CodeLens entry points: `PickAIDDocVSCodeExtension/src/commands/smartInsert.ts`, `PickAIDDocVSCodeExtension/src/providers/CodeLensProvider.ts`

## Current Mermaid structured types

- `graph`
- `sequenceDiagram`
- `classDiagram`
- `stateDiagram-v2`
- `erDiagram`
- `gantt`
- `pie`
- `gitGraph`
- `journey`
- `xychart-beta`

## Current chart capability anchors

Read runtime truth before editing docs or editor hints for these features:

- `palette` and theme-aware palette objects
- `tooltipTemplate`
- `tooltipRules`
- `tooltipOverrides`
- `treeEdgeShape`
- `treeInitialDepth`
- `treeShowValueInLabel`
- `seriesOptions`
- `option`
- `{fetch:url|path|fallback}` dynamic text
