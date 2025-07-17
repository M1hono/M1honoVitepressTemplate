# VitePress Template Advanced - Configuration Guide

## Overview

This guide covers the core configuration system: how to modify project settings, add new languages, and configure sidebar tags.

## Table of Contents

-   [Project Configuration](#project-configuration)
-   [Adding Languages](#adding-languages)
-   [Sidebar Tags Configuration](#sidebar-tags-configuration)
-   [Deployment Configuration](#deployment-configuration)

## Configuration Architecture

### Configuration Layers

1. **Core Layer** (`project-config.ts`) - Central configuration store
2. **Integration Layer** (`common-config.ts`) - VitePress integration
3. **Language Layer** (`lang/`) - Multi-language configs
4. **Tools Layer** (`utils/config/`) - Configuration utilities

## Project Configuration

### Basic Settings

Edit `.vitepress/config/project-config.ts`:

```typescript
export const projectConfig: ProjectConfig = {
    // Basic Info
    name: "your-project-name",
    base: "/your-repo-name/", // IMPORTANT: Must match GitHub repo name
    description: "Your project description",
    version: "1.0.0",
    author: "Your Name",

    // Repository Info
    repository: {
        type: "git",
        url: "https://github.com/username/repository",
    },
    homepage: "https://username.github.io/repository/",

    // Feature Toggles
    features: {
        search: false, // Algolia search
        gitChangelog: true, // Git changelog
        mermaid: true, // Diagram support
        autoSidebar: true, // Auto sidebar generation
        sidebarTags: true, // Sidebar tags
    },
};
```

### Path Configuration

```typescript
paths: {
    root: ".",
    docs: "./src",                    // Where your .md files are
    src: "./src",
    public: "./src/public",           // Static assets
    vitepress: "./.vitepress",
    config: "./.vitepress/config",
    theme: "./.vitepress/theme",
    cache: "./.vitepress/cache",
    build: "./.vitepress/dist"        // Build output
}
```

### Search Configuration

```typescript
algolia: {
    appId: "YOUR_APP_ID",
    apiKey: "YOUR_API_KEY",
    indexName: "YOUR_INDEX_NAME"
},
features: {
    search: true  // Enable search
}
```

## Adding Languages

### Step 1: Add Language to Project Config

```typescript
languages: [
    {
        code: "en-US",
        name: "en-US",
        displayName: "English",
        isDefault: true, // Default language
        link: "/en-US/",
        label: "English",
        fileName: "en.ts", // Config file name
        giscusLang: "en", // Comment system language
    },
    {
        code: "zh-CN",
        name: "zh-CN",
        displayName: "简体中文",
        isDefault: false,
        link: "/zh-CN/",
        label: "简体中文",
        fileName: "zh.ts",
        giscusLang: "zh-CN",
    },
    // Add new language
    {
        code: "fr-FR",
        name: "fr-FR",
        displayName: "Français",
        isDefault: false,
        link: "/fr-FR/",
        label: "Français",
        fileName: "fr.ts",
        giscusLang: "fr",
    },
];
```

### Step 2: Create Language Configuration File

Create `.vitepress/config/lang/fr.ts`:

```typescript
import type { DefaultTheme } from "vitepress";
import { getSidebarSyncWithTags } from "../../utils/config/sidebar-tags-integration";
import { getProjectInfo, getLanguageByCode } from "../project-config";

const projectInfo = getProjectInfo();
const langConfig = getLanguageByCode("fr-FR")!;

export const fr_FR = <DefaultTheme.Config>{
    label: langConfig.displayName,
    lang: langConfig.giscusLang,
    link: langConfig.link,
    title: projectInfo.name,
    description: projectInfo.description,
    themeConfig: {
        nav: [],
        sidebar: getSidebarSyncWithTags(langConfig.code),
        outline: {
            level: "deep",
            label: "Contenu de la page",
        },
        docFooter: {
            prev: "Page précédente",
            next: "Page suivante",
        },
        lastUpdated: {
            text: "Dernière mise à jour",
            formatOptions: {
                dateStyle: "short",
                timeStyle: "medium",
            },
        },
        editLink: {
            text: "Modifier cette page sur GitHub",
        },
        langMenuLabel: "Changer de langue",
        returnToTopLabel: "Retour en haut",
        sidebarMenuLabel: "Menu",
        darkModeSwitchLabel: "Thème",
        lightModeSwitchTitle: "Basculer en mode clair",
        darkModeSwitchTitle: "Basculer en mode sombre",
    },
};

export const search: DefaultTheme.AlgoliaSearchOptions["locales"] = {
    fr: {
        placeholder: "Rechercher dans la documentation",
        translations: {
            button: {
                buttonText: "Rechercher",
                buttonAriaLabel: "Rechercher",
            },
            modal: {
                searchBox: {
                    resetButtonTitle: "Réinitialiser la recherche",
                    resetButtonAriaLabel: "Réinitialiser la recherche",
                    cancelButtonText: "Annuler",
                    cancelButtonAriaLabel: "Annuler",
                },
                startScreen: {
                    recentSearchesTitle: "Recherches récentes",
                    noRecentSearchesText: "Aucune recherche récente",
                    saveRecentSearchButtonTitle:
                        "Sauvegarder dans les recherches récentes",
                    removeRecentSearchButtonTitle:
                        "Supprimer des recherches récentes",
                    favoriteSearchesTitle: "Favoris",
                    removeFavoriteSearchButtonTitle: "Supprimer des favoris",
                },
                errorScreen: {
                    titleText: "Impossible de récupérer les résultats",
                    helpText: "Vous devriez vérifier votre connexion réseau",
                },
                footer: {
                    selectText: "sélectionner",
                    navigateText: "naviguer",
                    closeText: "fermer",
                },
                noResultsScreen: {
                    noResultsText: "Aucun résultat trouvé",
                    suggestedQueryText:
                        "Vous pouvez essayer une nouvelle requête",
                    reportMissingResultsText:
                        "Vous pensez qu'il devrait y avoir des résultats pour cette requête ?",
                    reportMissingResultsLinkText: "Faites-le nous savoir",
                },
            },
        },
    },
};
```

### Step 3: Create Content Directory

Create content directory structure:

```
src/
├── fr-FR/
│   ├── index.md
│   ├── guide/
│   │   └── index.md
│   └── api/
│       └── index.md
```

## Sidebar Tags Configuration

### Basic Tag Configuration

```typescript
sidebarTags: {
    enabled: true,
    globalStyles: {
        size: 'xs',         // xs, sm, md, lg, xl
        variant: 'soft',    // solid, soft, outline, ghost
        rounded: 'md'       // none, sm, md, lg, full
    },
    tags: [
        // HTTP Method tags
        {
            field: 'method',
            position: 'before',      // before, after
            size: 'xs',
            variant: 'solid',
            rounded: 'sm',
            valueStyles: {
                'GET': { color: 'green' },
                'POST': { color: 'blue' },
                'PUT': { color: 'orange' },
                'DELETE': { color: 'red' }
            }
        }
    ]
}
```

### Advanced Tag Examples

**Status Tags:**

```typescript
{
    field: 'status',
    position: 'after',
    size: 'xs',
    variant: 'soft',
    valueStyles: {
        'stable': { color: 'green' },
        'beta': { color: 'orange' },
        'experimental': { color: 'red' },
        'deprecated': { color: 'gray' }
    }
}
```

**Version Tags:**

```typescript
{
    field: 'version',
    position: 'after',
    size: 'xs',
    variant: 'outline',
    color: 'blue',
    prefix: 'v'        // Shows as "v1.0"
}
```

**Category Tags:**

```typescript
{
    field: 'category',
    position: 'before',
    size: 'xs',
    variant: 'soft',
    prefix: '[',
    suffix: ']',       // Shows as "[API]"
    transform: true,   // Uppercase
    valueStyles: {
        'api': { color: 'blue' },
        'guide': { color: 'green' },
        'tutorial': { color: 'purple' }
    }
}
```

**Conditional Tags:**

```typescript
{
    field: 'featured',
    position: 'before',
    size: 'sm',
    variant: 'solid',
    color: 'warning',
    condition: 'truthy',    // Only show if truthy
    transform: 'emoji',
    customEmoji: '🔥'
}
```

**Score Tags:**

```typescript
{
    field: 'score',
    position: 'after',
    size: 'xs',
    variant: 'solid',
    condition: 'gte80',     // Only show if >= 80
    transform: 'scoreFormat', // Custom format
    valueStyles: {
        '90': { color: 'green' },
        '80': { color: 'yellow' }
    }
}
```

### Using Tags in Markdown

Add tags to your markdown frontmatter:

```markdown
---
method: "GET"
status: "stable"
version: "1.0"
category: "api"
difficulty: "easy"
featured: true
score: 95
---

# API Documentation

Your content here...
```

### Transform Options

-   `true` or `'uppercase'` - Convert to uppercase
-   `'lowercase'` - Convert to lowercase
-   `'capitalize'` - Capitalize first letter
-   `'emoji'` - Show custom emoji
-   `'scoreFormat'` - Format as score (adds "分")
-   `'titleCase'` - Title Case
-   `'camelCase'` - camelCase
-   `'kebabCase'` - kebab-case

### Condition Options

-   `'exists'` - Show if field exists
-   `'truthy'` - Show if field is truthy
-   `'gte80'` - Show if numeric value >= 80

## Deployment Configuration

### GitHub Pages (Default)

```typescript
deployment: {
    type: "github-pages";
}
```

### Server Deployment

```typescript
deployment: {
    type: 'server',
    server: {
        remotePath: '/var/www/html',
        port: 22,
        excludeFiles: ['.git', 'node_modules', '*.log']
    }
}
```

Set GitHub secrets: `SSH_HOST`, `SSH_USERNAME`, `SSH_PRIVATE_KEY`

### Custom Deployment

```typescript
deployment: {
    type: 'custom',
    custom: {
        deployCommand: 'vercel --prod',
        postDeployCommand: 'curl -X POST webhook-url'
    }
}
```

## Configuration Functions

Useful helper functions:

```typescript
// Language functions
getLanguages(); // Get all languages
getDefaultLanguage(); // Get default language
getLanguageByCode("zh-CN"); // Get specific language

// Feature checks
isFeatureEnabled("mermaid"); // Check if feature enabled
isSidebarTagsEnabled(); // Check if tags enabled

// Path helpers
getDocsPath("api/"); // Get docs path
getVitepressPath("cache/"); // Get vitepress path

// Project info
getProjectInfo(); // Get project metadata
```

---

For basic setup, see the main [README](../README.md).
