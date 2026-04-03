# Chart Authoring

Use this reference when the task touches chart authoring, chart docs, chart editor behavior, or runtime/editor parity.

## Start Here

1. Identify the task shape:
- new author-facing config key
- new chart-type behavior
- tooltip or placeholder behavior
- palette or theme behavior
- editor-only parity gap
- docs/examples only
2. Decide whether the feature should live in:
- high-level chart config
- chart data lines
- tooltip templates or rules
- raw `seriesOptions` or `option`
3. Only after that, inspect runtime/editor code.

## Base Chart Block Contract

All authored charts start from this shape:

```md
::: chart <type> { ...strict JSON config }
...data lines...
:::
```

Rules:
- The config block is strict JSON, not YAML and not relaxed JS.
- The chart type is mandatory and drives data parsing.
- Runtime expects the opening marker to be `:::` exactly.
- The extension editor may preserve other colon counts when it reserializes an existing block, but the runtime contract is still `:::`.

## Supported Chart Types

Current runtime and editor support these families:

- Axis charts: `line`, `bar`, `area`, `scatter`, `heatmap`, `candlestick`, `k`, `boxplot`, `pictorialBar`, `parallel`, `themeRiver`
- Item charts: `pie`, `doughnut`, `radar`, `gauge`, `funnel`
- Relationship and hierarchy charts: `sankey`, `graph`, `tree`, `treemap`, `sunburst`

A strong skill user should treat chart type as part of the grammar, not just styling.

## Author-Facing Config Categories

### Core display

Common high-level keys:
- `title`
- `subtitle`
- `width`
- `height`
- `theme`
- `backgroundColor`
- `smooth`
- `legend`

Use these before raw `option` overrides when possible.

### Tooltip system

Supported tooltip layers:
- `tooltip`
- `tooltipTrigger`
- `tooltipTemplate`
- `tooltipRules`
- `tooltipOverrides`
- inline data tooltip text using `| ...`

Supported runtime tokens:
- `{series}`
- `{name}`
- `{value}`
- `{percent}`
- `{axis}`
- `{marker}`
- `{raw}`
- `{x}`
- `{y}`
- `{source}`
- `{target}`
- `{value0}` through `{value4}`

Precedence order:
1. per-data tooltip text from the source line
2. `tooltipOverrides`
3. first matching `tooltipRules`
4. `tooltipTemplate`
5. runtime default tooltip

### Palette system

Supported forms:

```json
"palette": ["#5b6cfa", "#f59e0b"]
```

```json
"palette": {
  "light": ["#5b6cfa", "#f59e0b"],
  "dark": ["#93c5fd", "#fcd34d"]
}
```

Rules:
- Theme-aware palette objects are resolved at runtime.
- Heatmap also binds palette intent into `visualMap` behavior.
- Candlestick and `k` use the first two palette entries as rise/fall colors.

### Runtime and interaction features

Common runtime features:
- `toolbox`
- `dataZoom`
- `dataZoomInside`
- `dataZoomSlider`
- `aria`
- `animation`
- `animationDuration`
- `renderer`
- `autoresize`
- `group`
- `loading`
- `loadingOptions`
- `manualUpdate`
- `devicePixelRatio`
- `useDirtyRect`
- `notMerge`
- `lazyUpdate`

### Raw override surfaces

These are supported and should be documented when the task needs them:
- `grid`
- `xAxis`
- `yAxis`
- `radar`
- `visualMap`
- `parallel`
- `singleAxis`
- `seriesOptions`
- full `option`

Use them when the high-level chart contract is not enough. Do not pretend they do not exist.

## Type-Specific Authoring Rules

### Line, Bar, Area

Good for category + numeric series.

Typical source shape:

```md
Mon: 12
Tue: 18
Wed: 9
```

Or named series:

```md
Revenue | Mon: 12
Revenue | Tue: 18
Cost | Mon: 7
Cost | Tue: 11
```

Notes:
- `area` is rendered as line with fill.
- `smooth` matters for line and area.

### Pie and Doughnut

Typical source shape:

```md
Done: 12 | Finished items
Todo: 4 | Remaining items
```

Notes:
- doughnut uses a radius pair rather than full pie radius.
- pie and doughnut usually use item-trigger tooltips.

### Scatter

Typical source shape:

```md
10, 20 | A point
13, 34 | B point
```

Extra tuple dimensions can exist, but document them explicitly when used.

### Radar

Typical source shape uses named rows and radar indicators. Prefer a real example when documenting it because authors tend to misuse the shape.

### Gauge

Usually one main value. Keep examples minimal and explicit.

### Funnel

Runtime sorts by value descending. Teach that behavior so authors do not expect source order to win.

### Heatmap

Typical source shape is a triple:

```md
Mon, Morning: 12
Mon, Evening: 19
Tue, Morning: 8
```

Rules:
- runtime remaps tuples into categorical axes
- heatmap injects internal x/y/value metadata for tooltip rendering
- palette and `visualMap` behavior matter here more than in most charts

### Sankey and Graph

Typical relationship shape:

```md
Input -> Process: 12 | Main flow
Process -> Output: 8
```

Notes:
- relationship charts depend on source and target semantics
- graph uses force-layout defaults
- sankey is flow-oriented rather than free topology

### Tree, Treemap, Sunburst

Tree-specific supported knobs:
- `treeEdgeShape`
- `treeInitialDepth`
- `treeShowValueInLabel`

Tree source is indentation-based and should be taught explicitly, not implied.

Example:

```md
Project: 10
  Planning: 4
  Delivery: 6
    Backend: 3
    Frontend: 3
```

Notes:
- `treeEdgeShape` supports `curve` and `polyline`
- tree authoring is indentation-sensitive
- treemap and sunburst share hierarchical meaning but not the same layout rules

### Candlestick and K

Typical source shape is OHLC tuples keyed by date:

```md
2025-01-01: 10, 14, 8, 16
2025-01-02: 14, 13, 12, 18
```

Teach the tuple order explicitly because it is easy to get wrong.

### Boxplot, Parallel, ThemeRiver, PictorialBar

These all use specialized tuple grammars and should never be documented with generic chart examples.

Examples:

```md
10, 14, 18, 22, 26
12, 15, 19, 24, 28
```

```md
10, 20, 30 | Segment A
14, 18, 27 | Segment B
```

```md
2025-01-01, Search: 12
2025-01-01, Social: 8
```

## Dynamic Placeholder Support

Chart text and tooltip templates support dynamic fetch placeholders:

```text
{fetch:https://jsonplaceholder.typicode.com/todos/1|title|Loading title}
```

Rules a skill must teach:
- shape is `{fetch:url|path|fallback}`
- nested path can be `a.b.c` or `a#b#c` depending on the runtime parser helper
- `\|` escapes separator pipes inside values
- fallback text is required if the fetch fails or the path is missing
- fetch placeholders are resolved by shared dynamic text runtime and cache behavior, not by ECharts itself

## Raw Override and Precedence Guidance

Use this decision order:
1. high-level config field if one exists
2. chart-type-specific config field if one exists
3. `seriesOptions` if the change is series-local
4. `xAxis`/`yAxis`/`grid`/`visualMap` style blocks for axis or layout intent
5. full `option` only when the high-level contract cannot express the behavior

Do not route everything through raw `option` when the feature is already part of the public chart contract.

## Editor/Runtime Parity Caveats

These are important enough that a good skill must teach them directly.

### Known lossy round-trip cases

- `tooltip` object configs can collapse into boolean/template/rules form when the chart is opened and saved through the editor.
- `dataZoom` object or array configs can collapse into convenience booleans and inside/slider toggles.
- `loading` and `loadingOptions` are currently removed on save by editor cleanup.

### Default drift

- Runtime default height is `400px`.
- Editor default height is `300px`.

If a chart omits height and is round-tripped through the editor, behavior can change.

### Legend caveat

Legend auto-detection currently does not fully see multi-series state because of build order. If legend behavior matters, prefer explicit config.

### Data grammar caveat

Unnamed single-series line rows that also use inline `| tooltip` can be parsed ambiguously because `|` is also a series separator in some parser paths. Use named series or explicit examples when documenting that case.

## Example Blocks

### Pie with theme-aware palette and tooltip override

```md
::: chart pie {"title":"Status","palette":{"light":["#5b6cfa","#f59e0b"],"dark":["#93c5fd","#fcd34d"]},"tooltipTemplate":"{name}: {value}","tooltipOverrides":[{"name":"Done","template":"Completed: {value}"}]}
Done: 12 | Finished items
Todo: 4 | Remaining items
:::
```

### Tree with explicit edge style and depth

```md
::: chart tree {"title":"Work Breakdown","treeEdgeShape":"curve","treeInitialDepth":2,"treeShowValueInLabel":true}
Project: 10
  Planning: 4
  Delivery: 6
    Backend: 3
    Frontend: 3
:::
```

### Heatmap with dynamic title

```md
::: chart heatmap {"title":"{fetch:https://jsonplaceholder.typicode.com/todos/1|title|Heatmap}","palette":{"light":["#dbeafe","#2563eb"],"dark":["#1e3a8a","#93c5fd"]},"tooltipTemplate":"{x} / {y}: {value}"}
Mon, Morning: 12
Mon, Evening: 19
Tue, Morning: 8
Tue, Evening: 14
:::
```
