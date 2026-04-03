# Frontmatter Authoring Playbook

Use this guide when the job is to define or explain what authors can write in frontmatter.

## Contract Template

For every key or nested path, define these in order:

1. Path
2. Layer
3. Accepted type or shape
4. Default behavior
5. Visual or behavioral effect
6. Minimal YAML example
7. Realistic YAML example if the feature is complex
8. Migration note if older syntax exists

## Layer Rules

### Outer keys

Outer keys sit at the page frontmatter root.

Examples:
- `title`
- `layout`
- `prev`
- `next`
- `sidebar`
- `editor`

Use outer-key docs when the author can set the value without opening a nested object.

### Inner keys

Inner keys live inside another contract and must be documented with their full path.

Examples:
- `hero.background.layers[*].opacity`
- `hero.floating.items[*].size`
- `editor.tooltip.placeholders`

Never document only the leaf name when the parent shape matters.

## Preferred Documentation Shape

1. One sentence for purpose
2. Type or shape
3. Default or omission behavior
4. YAML example
5. Notes about related keys

## Example: simple outer key

```yaml
---
layout: doc
prev: false
next:
  text: Guide
  link: /guide/
---
```

What to explain:
- `prev` accepts `false`, a string, or an object depending on the supported contract
- omission falls back to sidebar inference when the system supports it
- explicit values override inferred values

## Example: nested hero contract

```yaml
---
layout: home
hero:
  background:
    layers:
      - kind: color
        color: '#0f172a'
      - kind: gradient
        colors: ['#1d4ed8', '#38bdf8']
        opacity: 0.6
---
```

What to explain:
- the full path is `hero.background.layers[*]`
- each layer item has its own accepted shape
- omission of optional fields falls back to runtime defaults

## Migration Pattern

When replacing old syntax:

1. Show old syntax once.
2. Show new syntax once.
3. State which syntax wins if both appear.
4. Update snippets and hover docs so the new form becomes the default teaching surface.

## Audit Pattern

1. Define the expected contract first.
2. Compare the docs against real examples.
3. Compare editor completions and hover docs against the same contract.
4. Use the audit script last to catch gaps, not as a substitute for defining the contract.
