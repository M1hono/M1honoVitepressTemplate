# Template Extension Recipes

Use these patterns for common template changes.

## Recipe: add a translatable component

1. Create the component.
2. Decide whether markdown pages call it directly.
3. Register it only where needed.
4. Add locale text and mapping.
5. Add a real usage example.

## Recipe: add a markdown container feature

1. Define the authored syntax first.
2. Decide the rendered HTML or component contract.
3. Wire the plugin.
4. Register any emitted components.
5. Add example pages in docs content.

## Recipe: add a config option

1. Define what maintainer problem it solves.
2. Choose a safe default.
3. Update docs or examples that rely on it.
4. Keep downstream readers in sync.

## Recipe: add a discoverable page pattern

1. Start from frontmatter and markdown structure.
2. Add nav or hub promotion only if the page should be discoverable.
3. Mirror localization expectations deliberately, not automatically.
