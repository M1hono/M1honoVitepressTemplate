# Architecture Map

## Table of Contents
- Template root and key folders
- Page creation chain
- Component extension chain
- Content registration chain
- Hero feature extension chain
- Markdown plugin extension chain
- i18n translation chain
- Config and feature flag chain

## Template Root and Key Folders
- `docs/.vitepress/config/`: project config, language config, markdown config, locale JSON.
- `docs/.vitepress/theme/`: Vue layout, components, and CSS.
- `docs/.vitepress/plugins/`: custom markdown-it plugins and factories.
- `docs/.vitepress/utils/`: registration helpers, i18n helpers, sidebar/content utilities.
- `docs/.vitepress/scripts/`: synchronization and generation scripts.
- `docs/src/`: markdown content and public assets.

## Page Creation Chain
1. Create the page in `docs/src/<locale>/...`.
2. Mirror the relative path in both locales for shared docs surfaces.
3. If the page is a home/hero page, use `layout: home`; otherwise default to `layout: doc`.
4. If the page becomes a primary entry point, update locale nav and docs hubs.

## Component Extension Chain
1. Create or edit a Vue component in `docs/.vitepress/theme/components/<category>/`.
2. Export from `docs/.vitepress/theme/components/<category>/index.ts` when index exports exist.
3. Register globally in `docs/.vitepress/utils/vitepress/components.ts` if markdown should use it directly.
4. Ensure `registerComponents()` is called in `docs/.vitepress/theme/index.ts` (already wired).

## Content Registration Chain
1. Create the content component in `docs/.vitepress/theme/components/content/`.
2. Export it from `docs/.vitepress/theme/components/content/index.ts`.
3. Export it from `docs/.vitepress/utils/vitepress/componentRegistry/contentRegistry.ts` for internal theme reuse.
4. Register it in `docs/.vitepress/utils/vitepress/components.ts` for markdown/global use.
5. Add locale JSON and `component-id-mapping.json` entries if it uses `useSafeI18n`.

## Hero Feature Extension Chain
1. Add the frontmatter contract in `docs/.vitepress/utils/vitepress/api/frontmatter/hero/**`.
2. Put shared hero state in `docs/.vitepress/utils/vitepress/runtime/hero/**`.
3. Render the feature in `docs/.vitepress/theme/components/hero/**`.
4. Document the feature in `docs/src/*/frontmatter/reference/heroExtension.md` and `docs/src/*/hero/**`.

## Markdown Plugin Extension Chain
1. Add plugin source in `docs/.vitepress/plugins/*.ts`.
2. Use factories when applicable:
- `container-plugin-factory.ts`
- `tab-plugin-factory.ts`
3. Wire plugin in `docs/.vitepress/config/markdown-plugins.ts` via `md.use(...)`.
4. If plugin renders custom Vue tags, ensure component registration exists.

## i18n Translation Chain
1. In component, use `useSafeI18n("<component-id>", defaults)` from `utils/i18n/locale`.
2. Add locale JSON:
- `docs/.vitepress/config/locale/en-US/components/<path>.json`
- `docs/.vitepress/config/locale/zh-CN/components/<path>.json`
3. Map component ID to locale path in `docs/.vitepress/config/locale/component-id-mapping.json`.
4. Run `yarn locale` from `docs/` when syncing/validating locale keys.

## Config and Feature Flag Chain
1. Update `docs/.vitepress/config/project-config.ts` for toggles and global settings.
2. Use helper functions (`isFeatureEnabled`, `getProjectInfo`, etc.) where config is consumed.
3. Update language-level text in `docs/.vitepress/config/lang/en.ts` and `zh.ts` as needed.
4. Validate with `yarn build` from `docs/`.
