# Nav Extension Playbook

## Scenario: change the nav contract

1. Edit `navTypes.ts` first.
2. Update builders and normalization in `navFactory.ts`.
3. Update enforcement in `navConfig.ts`.
4. Update renderer components only after the contract is coherent.
5. Rebuild CrychicDoc before syncing mirrors.

## Scenario: improve preview rendering

1. Confirm whether the new behavior is the default or an opt-in variant.
2. Keep default screenshot previews:
- full image
- no forced shadow box
- no forced browser chrome
- no hover motion unless a design explicitly opts in
3. Implement optional variants through media fields, not renderer hardcoding.
4. Recheck dark/light and wide/narrow dropdown cases.

## Scenario: enforce typed section builders

1. Keep locale authoring readable by allowing named `const` sections.
2. Require builders for structural pieces:
- dropdowns
- panels
- groups
- preview panels
3. Normalize historical shapes before asserting.
4. Do not reject simple link-only top-level items unless the product explicitly wants that stricter rule.

## Scenario: add a custom nav layout

1. Add or update the layout component in `theme/components/navigation/layouts/**`.
2. Keep the layout driven by `NavDropdown` data.
3. If the layout is repo-specific, prefer local component registration instead of forcing the shared layer to own it.
4. Document the new layout key in the repo that introduced it.

## Scenario: sync shared changes to Template and Toolkit

1. Finish CrychicDoc first.
2. Copy only shared nav infrastructure files.
3. Verify that `utils/vitepress/components.ts` still loads local registries in each repo.
4. Run:
- `yarn build`
- `git diff --check`
5. If Template or Toolkit needs repo-local follow-up, do that in their own files instead of polluting the shared contract.
