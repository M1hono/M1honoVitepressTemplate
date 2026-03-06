# Extension Playbook

## Table of Contents
- Add a new standard page
- Add a new hero page
- Add a new translatable component
- Register new content components
- Add a new hero feature
- Add a new markdown container or tab plugin
- Add a new project config key
- Update existing component behavior safely
- Verification checklist

## Add a New Standard Page
1. Create the markdown file under matching locale paths in `docs/src/en-US/**` and `docs/src/zh-CN/**`.
2. Start with `layout: doc` and basic frontmatter.
3. Only wire locale nav or home hubs if the page is meant to be an entry point.
4. If the page documents a contract, update the matching frontmatter/reference page in the same change.

## Add a New Hero Page
1. Use `layout: home`.
2. Author the `hero` and `features` frontmatter first.
3. If the page needs reusable action keys, extend the home-link service and the hero frontmatter type union.
4. Update localized hub pages and nav if the new page becomes a top-level docs surface.

## Add a New Translatable Component
1. Create file in `docs/.vitepress/theme/components/<category>/<Name>.vue`.
2. Use `<script setup lang="ts">` and `useSafeI18n("<component-id>", defaults)`.
3. Export from `docs/.vitepress/theme/components/<category>/index.ts`.
4. Register in `docs/.vitepress/utils/vitepress/components.ts` if markdown/global use is needed.
5. Add locale JSON:
- `config/locale/en-US/components/<category>/<Name>.json`
- `config/locale/zh-CN/components/<category>/<Name>.json`
6. Add mapping entry in `config/locale/component-id-mapping.json`:
- `"component-id": "<category>/<Name>"`
7. Run `yarn locale`.

## Register New Content Components
1. Place the component under `docs/.vitepress/theme/components/content/`.
2. Export it from `docs/.vitepress/theme/components/content/index.ts` if the barrel exists.
3. Export it from `docs/.vitepress/utils/vitepress/componentRegistry/contentRegistry.ts` when theme internals should reuse it through the registry layer.
4. Register it in `docs/.vitepress/utils/vitepress/components.ts` when markdown pages should call it directly by tag name.
5. If it is emitted by a markdown plugin, verify the plugin outputs a registered tag.
6. Add a real markdown usage page so build output validates the component.

## Add a New Hero Feature
1. Define the new author-facing field in `docs/.vitepress/utils/vitepress/api/frontmatter/hero/**`.
2. Put shared runtime behavior in `docs/.vitepress/utils/vitepress/runtime/hero/**`.
3. Render the feature in `docs/.vitepress/theme/components/hero/**`.
4. For typography styles, prefer `HeroTypographyRegistryApi.ts`; for floating item types, prefer `FloatingElementRegistryApi.ts`.
5. Document the feature in `frontmatter/reference/heroExtension.md` and add real markdown examples.

## Add a New Markdown Container or Tab Plugin
1. Create plugin in `docs/.vitepress/plugins/`.
2. Prefer factory abstractions:
- `createContainerPlugin(...)` for `::: name{...}` block containers.
- `createTabPlugin(...)` for tabbed directives.
3. Wire plugin call in `docs/.vitepress/config/markdown-plugins.ts`.
4. Add or register Vue components referenced by generated HTML tags.
5. Add docs examples under `docs/src/en-US/` and `docs/src/zh-CN/`.

## Add a New Project Config Key
1. Add key/type in `docs/.vitepress/config/project-config.ts`.
2. Expose getter if config is consumed in many places.
3. Read config through existing helpers in theme/config modules.
4. If config affects markdown content metadata, run:
- `yarn sync-config`
- `yarn frontmatter`

## Update Existing Component Behavior Safely
1. Keep component ID unchanged unless you also migrate mapping and locale files.
2. Keep existing export names to avoid registration breaks.
3. Keep CSS variables and naming aligned with existing style files.
4. Preserve SSR guards (`if (!import.meta.env.SSR)` or `typeof window !== "undefined"`) for browser-only behavior.

## Verification Checklist
1. `cd docs`
2. `yarn locale`
3. `yarn sidebar`
4. `yarn tags`
5. `yarn build`
6. Smoke check target pages in `yarn dev`.
