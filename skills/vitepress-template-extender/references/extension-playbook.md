# Extension Playbook

Use this guide when adding or changing template features.

## Design Order

1. Define the author-facing outcome.
2. Decide whether the change is page, component, markdown feature, config, or visual-authoring work.
3. Determine what runtime behavior changes.
4. Determine what editor or completion surfaces need to know.
5. Determine what locale text or examples must be added.
6. Only then verify file ownership in the architecture map.

## Scope Selection

### Page work

Use this path when the value is mostly content structure and frontmatter.

### Component work

Use this path when the change introduces or evolves a reusable UI surface.

### Markdown feature work

Use this path when authors get a new syntax pattern such as a container, directive, or structured authored block.

### Config work

Use this path when maintainers need a project-level or locale-level switch.

### Visual-authoring work

Hand off to the visual-authoring skill when the feature lives equally in runtime and editor systems.

## Feature Quality Rules

1. A new feature should have at least one real usage example.
2. Translatable UI must include locale assets as part of the feature.
3. Global registration should be intentional, not automatic.
4. Avoid isolated one-off patches that bypass the template's existing systems.
5. If a smaller skill owns the primary domain, switch to that skill instead of duplicating logic here.

## Verification Pattern

After implementation, verify the touched repo with its normal build flow and confirm the author-facing example still matches actual behavior.
