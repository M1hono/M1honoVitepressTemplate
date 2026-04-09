# Changelog

All notable changes to this repository are documented in this file.

## [Unreleased]

### Added

- Added `collapseControl` support for parent-controlled child folder folding in the current generated sidebar view.
- Added regression coverage for current-view collapse overrides and controller-preserving nested-root traversal.

### Changed

- Stopped parent-controlled nested roots from rewriting the child root's own `maxDepth` and local `viewControl`.
- Repositioned `viewControl` as the advanced traversal-ownership contract while `collapseControl` becomes the recommended folding control.

## [2.1.0] - 2026-04-07

### Added

- Added `viewControl`-aware sidebar traversal regression tests for root defaults, descendant defaults, and child override escapes.

### Changed

- Synced the shared sidebar pipeline from Crychic, including structure processors, config defaults, type updates, and navigation layout components.
- Updated the template documentation to surface the current release and the new sidebar/navigation behavior.

### Fixed

- Kept config-time sidebar filesystem access on relative imports so sidebar generation does not depend on Vite alias resolution timing.
