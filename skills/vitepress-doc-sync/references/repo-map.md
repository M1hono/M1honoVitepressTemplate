# Repo Map

## Repositories

Default layout assumed by the bundled sync script:

- Template upstream: current repository root
- CrychicDoc downstream: sibling repository `../CrychicDoc`
- toolkit-box-page downstream: sibling repository `../toolkit-box-page`

If your checkout layout is different, pass explicit paths to:

- `--template-root`
- `--crychic-root`
- `--toolkit-root`

## Template -> toolkit-box-page Clone Sync Set

These files are intended to stay structurally aligned and can be copied from the template into toolkit-box-page:

- `docs/src/en-US/frontmatter/content/index.md`
- `docs/src/zh-CN/frontmatter/content/index.md`
- `docs/src/en-US/frontmatter/content/contentAndUi.md`
- `docs/src/zh-CN/frontmatter/content/contentAndUi.md`
- `docs/src/en-US/frontmatter/content/featuresAndHome.md`
- `docs/src/zh-CN/frontmatter/content/featuresAndHome.md`
- `docs/src/en-US/frontmatter/page/index.md`
- `docs/src/zh-CN/frontmatter/page/index.md`
- `docs/src/en-US/frontmatter/page/globalPage.md`
- `docs/src/zh-CN/frontmatter/page/globalPage.md`
- `docs/src/en-US/frontmatter/page/sidebarAutoSystem.md`
- `docs/src/zh-CN/frontmatter/page/sidebarAutoSystem.md`
- `docs/src/en-US/frontmatter/index.md`
- `docs/src/zh-CN/frontmatter/index.md`
- `docs/src/en-US/frontmatter/hero/heroRuntime.md`
- `docs/src/zh-CN/frontmatter/hero/heroRuntime.md`
- `docs/src/en-US/frontmatter/hero/index.md`
- `docs/src/zh-CN/frontmatter/hero/index.md`
- `docs/src/en-US/frontmatter/reference/index.md`
- `docs/src/zh-CN/frontmatter/reference/index.md`
- `docs/src/en-US/frontmatter/reference/keyInventory.md`
- `docs/src/zh-CN/frontmatter/reference/keyInventory.md`
- `docs/src/en-US/frontmatter/reference/maintainability.md`
- `docs/src/zh-CN/frontmatter/reference/maintainability.md`
- `docs/src/en-US/frontmatter/reference/developmentWorkflow.md`
- `docs/src/zh-CN/frontmatter/reference/developmentWorkflow.md`
- `docs/src/en-US/frontmatter/reference/extensionArchitecture.md`
- `docs/src/zh-CN/frontmatter/reference/extensionArchitecture.md`
- `docs/src/en-US/frontmatter/reference/heroExtension.md`
- `docs/src/zh-CN/frontmatter/reference/heroExtension.md`
- `docs/src/en-US/hero/AllConfig.md`
- `docs/src/zh-CN/hero/AllConfig.md`

## CrychicDoc Adapted Sync Surface

These pages are conceptually aligned with the template developer-doc set, but they are adapted to CrychicDoc's file layout and product wording:

- `docs/en/doc/frameworkMaintainability.md`
- `docs/zh/doc/frameworkMaintainability.md`
- `docs/en/doc/developmentWorkflow.md`
- `docs/zh/doc/developmentWorkflow.md`
- `docs/en/doc/extensionArchitecture.md`
- `docs/zh/doc/extensionArchitecture.md`
- `docs/en/doc/heroExtension.md`
- `docs/zh/doc/heroExtension.md`
- `docs/en/doc/Description.md`
- `docs/zh/doc/Description.md`

These nav/home entry points should also be reviewed after developer-doc changes:

- `docs/en/index.md`
- `docs/zh/index.md`
- `.vitepress/config/locale/en-US/nav.ts`
- `.vitepress/config/locale/zh-CN/nav.ts`
- `.vitepress/config/locale/nav.template.ts`

## Manual Review Notes

- Do not raw-copy template homepages into toolkit-box-page or CrychicDoc.
- Do not raw-copy template locale nav files into CrychicDoc.
- Do sync the meaning of the developer-doc entry points:
  maintainability guide, development workflow, extension architecture, hero extension, and the surrounding frontmatter/page/content/hero reference pages.
