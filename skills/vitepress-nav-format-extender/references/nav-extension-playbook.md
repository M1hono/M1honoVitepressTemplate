# Nav Extension Playbook

Use this guide when you are changing the shared nav system rather than editing one locale file.

## Change Order

1. Define the author-visible capability.
2. Write the smallest example that should become valid.
3. Decide whether the capability is default or opt-in.
4. Update the shared contract.
5. Update builders or normalization.
6. Update renderers only after the authored shape is stable.
7. Verify in the primary repo before syncing shared files elsewhere.

## What Counts as a Good Nav-System Change

A good change makes at least one of these better:
- authors can express a needed structure more clearly
- repeated raw object shapes become simpler through builders
- validation catches ambiguity without blocking normal usage
- renderers support the documented structure without hardcoded exceptions

## Default Preview Policy

Unless the task explicitly changes the visual language, preview content should stay plain:
- full-image screenshots
- no browser chrome by default
- no bounce animation
- no decorative shadow shell
- no route-specific hacks in renderer logic

## Validation Policy

When tightening validation:

1. Normalize historical shapes first.
2. Reject only what is ambiguous, broken, or impossible to render safely.
3. Leave simple top-level links alone.
4. Provide a clean authored example that shows the preferred future shape.

## Sync Policy

1. Prove the change in the primary repo.
2. Copy only shared contract and renderer files.
3. Keep repo-local nav content and local component registries intact.
4. Rebuild each repo after syncing.

## Deliverable Pattern

For every nav-system extension, leave behind:
- a short description of the new capability
- a minimal authored example
- migration guidance if older shapes still exist
- verification notes for light, dark, and narrow layouts when relevant
