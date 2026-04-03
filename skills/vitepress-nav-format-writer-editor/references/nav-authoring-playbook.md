# Nav Authoring Playbook

Use this guide when writing or cleaning up a locale `nav.ts` file.

## Preferred File Shape

1. Imports
2. Reused media or URL constants
3. Named top-level items
4. Named panel or group arrays
5. Final export that reads like the site structure

A maintainer should understand the page hierarchy by scanning the final export and the named constants above it.

## Authoring Priorities

1. Text first
2. Correct link type second
3. Preview content third
4. Visual flourish last

If preview styling makes the nav harder to read, the preview is overdesigned.

## Internal vs External Targets

### Internal

Use normal internal links for project pages. Keep them aligned with the current locale and base rules.

### External

Use `href` for third-party content. Add a badge or short description when users may think it is part of the current docs set.

## Preview Policy

Use previews only when they improve orientation.

Good uses:
- primary docs hub
- showcase landing area
- visual section where a screenshot explains the section faster than prose

Weak uses:
- every simple link
- decorative duplication of the link text
- screenshot blocks that overwhelm the section name

## Refactor Policy

When a nav file becomes messy:

1. Pull repeated preview data into named constants.
2. Name panel arrays after their meaning.
3. Flatten unnecessary nesting.
4. Keep the final export readable without opening multiple helper files.
