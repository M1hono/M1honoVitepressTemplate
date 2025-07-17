/**
 * @fileoverview Project configuration for VitePress template
 * @author M1hono
 * @version 1.0.0
 */

/**
 * Main project configuration
 * Modify values below to customize your VitePress site
 */
export const projectConfig: ProjectConfig = {
    name: "vitepress-M1hono-template",
    
    /**
     * IMPORTANT: Change this to your repository name for GitHub Pages deployment
     * Format: "/your-repo-name/"
     */
    base: "/M1honoVitepressTemplate/",
    
    keyWords: ["VitePress", "template", "documentation", "wiki", "markdown"],
    description: "A feature-rich VitePress template with advanced plugins and configurations",
    version: "1.0.0",
    author: "M1hono",
    license: "MIT",
    repository: {
        type: "git",
        url: "https://github.com/M1hono/M1honoVitepressTemplate",
    },
    homepage: "https://m1hono.github.io/M1honoVitepressTemplate/",

    defaultCurrency: "CNY",

    /**
     * Language configurations for multi-language support
     * Add or modify languages here to enable i18n functionality
     * See LanguageConfig interface below for detailed field documentation
     */
    languages: [
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
        {
            code: "en-US",
            name: "en-US",
            displayName: "English",
            isDefault: true,
            link: "/en-US/",
            label: "English",
            fileName: "en.ts",
            giscusLang: "en",
        }
    ],

    paths: {
        root: ".",
        docs: "./src",
        src: "./src",
        public: "./src/public",
        vitepress: "./.vitepress",
        config: "./.vitepress/config",
        theme: "./.vitepress/theme",
        scripts: "./.vitepress/scripts",
        utils: "./.vitepress/utils",
        cache: "./.vitepress/cache",
        build: "./.vitepress/dist",
    },

    /**
     * Algolia search configuration
     * Set up your Algolia credentials to enable search
     */
    algolia: {
        appId: "",
        apiKey: "",
        indexName: "",
    },

    /**
     * Feature toggles
     * Enable or disable features as needed
     */
    features: {
        search: false,
        gitChangelog: true,
        mermaid: true,
        multilingual: true,
        autoSidebar: true,
        sidebarTags: true,
    },
    
    /**
     * Sidebar tags configuration
     * Customize how tags appear in your sidebar
     */
    sidebarTags: {
        enabled: true,
        
        globalStyles: {
            size: 'xs',
            variant: 'soft',
            rounded: 'md'
        },
        
        /**
         * Tag configurations for different frontmatter fields
         * Add field: 'your-field' to your markdown frontmatter to use these tags
         */
        tags: [
            {
                field: 'method',
                position: 'before',
                size: 'xs',
                variant: 'solid',
                rounded: 'sm',
                valueStyles: {
                    'GET': { color: 'green' },
                    'POST': { color: 'blue' },
                    'PUT': { color: 'orange' },
                    'PATCH': { color: 'yellow' },
                    'DELETE': { color: 'red' },
                    'HEAD': { color: 'gray' },
                    'OPTIONS': { color: 'purple' }
                }
            },
            {
                field: 'status',
                position: 'after',
                size: 'xs',
                variant: 'soft',
                color: 'gray',
                rounded: 'lg',
                valueStyles: {
                    'stable': { color: 'green' },
                    'beta': { color: 'orange' },
                    'experimental': { color: 'red' },
                    'deprecated': { color: 'gray' },
                    'draft': { color: 'yellow' }
                }
            },
            {
                field: 'version',
                position: 'after',
                size: 'xs',
                variant: 'outline',
                color: 'blue',
                rounded: 'md',
                prefix: 'v'
            },
            {
                field: 'difficulty',
                position: 'after',
                size: 'xs',
                variant: 'outline',
                color: 'warning',
                rounded: 'md',
                valueStyles: {
                    'easy': { color: 'green' },
                    'medium': { color: 'yellow' },
                    'hard': { color: 'red' },
                    'beginner': { color: 'green' },
                    'intermediate': { color: 'yellow' },
                    'advanced': { color: 'red' },
                    'expert': { color: 'purple' }
                }
            },
            {
                field: 'category',
                position: 'before',
                size: 'xs',
                variant: 'soft',
                color: 'primary',
                rounded: 'md',
                prefix: '[',
                suffix: ']',
                transform: true,
                valueStyles: {
                    'api': { color: 'blue' },
                    'guide': { color: 'green' },
                    'tutorial': { color: 'purple' },
                    'reference': { color: 'orange' },
                    'example': { color: 'cyan' }
                }
            },
            {
                field: 'featured',
                position: 'before',
                size: 'sm',
                variant: 'solid',
                color: 'warning',
                rounded: 'full',
                condition: 'truthy',
                transform: 'emoji',
                customEmoji: '🔥'
            },
            {
                field: 'priority',
                position: 'before',
                size: 'sm',
                variant: 'solid',
                color: 'error',
                rounded: 'full',
                prefix: 'Priority: ',
                suffix: '!',
                condition: 'exists'
            },
            {
                field: 'language',
                position: 'before',
                size: 'xs',
                variant: 'solid',
                color: 'gray',
                rounded: 'sm',
                valueStyles: {
                    'javascript': { color: 'amber' },
                    'typescript': { color: 'blue' },
                    'python': { color: 'green' },
                    'java': { color: 'red' },
                    'go': { color: 'cyan' },
                    'rust': { color: 'orange' }
                }
            },
            {
                field: 'score',
                position: 'after',
                size: 'xs',
                variant: 'solid',
                color: 'gray',
                rounded: 'full',
                condition: 'gte80',
                transform: 'scoreFormat',
                valueStyles: {
                    '90': { color: 'green' },
                    '80': { color: 'yellow' }
                }
            }
        ]
    },
    
    customSnippetFileNames: [],

    /**
     * Deployment configuration
     * Set type to control deployment strategy: 'github-pages' | 'server' | 'custom'
     * Note: SSH credentials (host, username, private key) are managed via GitHub repository secrets
     */
    deployment: {
        type: 'github-pages',
        server: {
            remotePath: '/var/www/html',
            port: 22,
            excludeFiles: ['.git', 'node_modules', '*.log']
        },
        custom: {
            deployCommand: '',
            postDeployCommand: ''
        }
    },
    
    /**
     * Configuration for the "Copy Link" button
     */
    copyLinkConfig: {
        removeLanguage: false,
    },

    /**
     * Configuration for floating social media buttons
     * Add or modify buttons that appear on the side of the page
     */
    socialButtons: [
        {
            name: "discord",
            title: "Join our Discord",
            link: "https://discord.gg/uPJHxU46td",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#ffffff" d="m22 24l-5.25-5l.63 2H4.5A2.5 2.5 0 0 1 2 18.5v-15A2.5 2.5 0 0 1 4.5 1h15A2.5 2.5 0 0 1 22 3.5V24M12 6.8c-2.68 0-4.56 1.15-4.56 1.15c1.03-.92 2.83-1.45 2.83-1.45l-.17-.17c-1.69.03-3.22 1.2-3.22 1.2c-1.72 3.59-1.61 6.69-1.61 6.69c1.4 1.81 3.48 1.68 3.48 1.68l.71-.9c-1.25-.27-2.04-1.38-2.04-1.38S9.3 14.9 12 14.9s4.58-1.28 4.58-1.28s-.79 1.11-2.04 1.38l.71.9s2.08.13 3.48-1.68c0 0 .11-3.1-1.61-6.69c0 0-1.53-1.17-3.22-1.2l-.17.17s1.8.53 2.83 1.45c0 0-1.88-1.15-4.56-1.15m-2.07 3.79c.65 0 1.18.57 1.17 1.27c0 .69-.52 1.27-1.17 1.27c-.64 0-1.16-.58-1.16-1.27c0-.7.51-1.27 1.16-1.27m4.17 0c.65 0 1.17.57 1.17 1.27c0 .69-.52 1.27-1.17 1.27c-.64 0-1.16-.58-1.16-1.27c0-.7.51-1.27 1.16-1.27Z"/></svg>'
        },
        {
            name: "github",
            title: "View on GitHub",
            link: "https://github.com/M1hono",
            icon: '<svg t="1752769057351" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1755" width="200" height="200"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" p-id="1756" fill="#ffffff"></path></svg>'
        }
    ],

    /**
     * Special path configurations for the 'Back' button
     * Defines custom navigation behavior for specific URL patterns
     */
    specialBackPaths: [
        {
            regex: "^/(\\w{2}-\\w{2}|\\w{2})/guide/advanced/\\w+",
            targetPath: "/{1}/guide/advanced/",
        },
        {
            regex: "^/(\\w{2}-\\w{2}|\\w{2})/blog/(\\d{4})/\\w+",
            targetPath: "/{1}/blog/{2}/",
        },
        {
            regex: "^/(\\w{2}-\\w{2}|\\w{2})/reference/components/\\w+",
            targetPath: "/{1}/reference/components/",
        }
    ]
};

/**
 * Language configuration interface for multi-language support
 * 
 * @example
 * ```ts
 * const enConfig: LanguageConfig = {
 *   code: "en-US",           // Must match VitePress locale key
 *   name: "en-US",           // Internal identifier, usually same as code
 *   displayName: "English",  // What users see in language switcher
 *   isDefault: true,         // Makes this the default language (use "root" in VitePress)
 *   link: "/en-US/",         // URL path, determines VitePress language routing
 *   label: "English",        // Fallback for displayName in UI components
 *   fileName: "en.ts",       // Translation file name in i18n directory
 *   giscusLang: "en"         // Language for Giscus comment system
 * }
 * ```
 */
export interface LanguageConfig {
    /** ISO 639-1 language code (e.g., "en-US", "zh-CN") - must match VitePress locale configuration */
    code: string;
    
    /** Internal identifier for the language, typically same as code for consistency */
    name: string;
    
    /** Human-readable name shown in language switcher dropdown and UI */
    displayName: string;
    
    /** Set to true for default language (becomes "root" in VitePress config) */
    isDefault?: boolean;
    
    /** URL path prefix like "/en-US/" - determines VitePress language routing behavior */
    link?: string;
    
    /** Display label for UI components, falls back to displayName if not set */
    label?: string;
    
    /** Translation file name (e.g., "en.ts", "zh.ts") for i18n message files */
    fileName?: string;
    
    /** Language code for Giscus comment system integration */
    giscusLang?: string;
}

/**
 * File system paths configuration for VitePress project structure
 * 
 * @example
 * ```ts
 * const paths: PathConfig = {
 *   root: ".",                    // Project root, usually current directory
 *   docs: "./src",               // Where your .md files live
 *   src: "./src",                // Source directory (same as docs typically)
 *   public: "./src/public",      // Static assets (images, favicons, etc.)
 *   vitepress: "./.vitepress",   // VitePress configuration folder
 *   config: "./.vitepress/config", // Configuration files location
 *   theme: "./.vitepress/theme",   // Custom theme files
 *   scripts: "./.vitepress/scripts", // Build and utility scripts
 *   utils: "./.vitepress/utils",    // Helper functions and utilities
 *   cache: "./.vitepress/cache",    // Build cache directory
 *   build: "./.vitepress/dist"      // Final build output directory
 * }
 * ```
 */
export interface PathConfig {
    /** Project root directory, typically "." for current directory */
    root: string;
    
    /** Documentation source directory where .md files are located */
    docs: string;
    
    /** Source files directory, usually same as docs for VitePress */
    src: string;
    
    /** Static assets directory for images, favicons, and other public files */
    public: string;
    
    /** VitePress configuration directory containing all VitePress-specific files */
    vitepress: string;
    
    /** Configuration files directory for project settings and options */
    config: string;
    
    /** Custom theme directory for theme overrides and customizations */
    theme: string;
    
    /** Build and utility scripts directory for automation and tooling */
    scripts: string;
    
    /** Utility functions directory for shared helper functions */
    utils: string;
    
    /** Build cache directory for faster subsequent builds */
    cache: string;
    
    /** Final build output directory where generated site files are placed */
    build: string;
}

/**
 * Configuration for the "Copy Link" button
 */
export interface CopyLinkConfig {
    /** Whether to remove the language key from the copied URL */
    removeLanguage: boolean;
}

/**
 * Configuration for a single social media button
 */
export interface SocialButton {
    /** Unique name for the button (used for i18n keys and CSS classes) */
    name: string;
    /** The text to display as a tooltip on hover */
    title: string;
    /** The URL the button links to */
    link: string;
    /** The raw SVG string for the button's icon */
    icon: string;
}

/**
 * Configuration for special 'Back' button navigation paths
 */
export interface SpecialBackPath {
    /** A string representing the regex to match the current path */
    regex: string;
    /** A template for the target path, where {n} is replaced by the nth capture group from the regex */
    targetPath: string;
}

/**
 * Configuration for individual sidebar tags that appear next to page titles
 * 
 * @example
 * ```ts
 * // HTTP method tag configuration
 * const methodTag: SidebarTagConfig = {
 *   field: 'method',              // Read from frontmatter: method: "GET"
 *   position: 'before',           // Show before page title
 *   size: 'xs',                   // Extra small size
 *   variant: 'solid',             // Solid background style
 *   color: 'blue',                // Default color if no valueStyles match
 *   rounded: 'sm',                // Small border radius
 *   prefix: '[',                  // Add [ before tag text
 *   suffix: ']',                  // Add ] after tag text
 *   transform: true,              // Apply text transformation (uppercase)
 *   condition: 'exists',          // Only show if field exists in frontmatter
 *   valueStyles: {                // Color mapping for specific values
 *     'GET': { color: 'green' },  // GET requests show in green
 *     'POST': { color: 'blue' }   // POST requests show in blue
 *   }
 * }
 * ```
 */
export interface SidebarTagConfig {
    /** Frontmatter field name to read the tag value from (e.g., 'method', 'status', 'category') */
    field: string;
    
    /** Position relative to page title - 'before' shows left of title, 'after' shows right */
    position: 'before' | 'after';
    
    /** Tag size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' - affects padding and font size */
    size: string;
    
    /** Visual style: 'solid' (filled), 'soft' (light background), 'outline' (border only), 'ghost' (transparent) */
    variant: string;
    
    /** Default color theme when no valueStyles match - supports theme colors like 'blue', 'green', 'red', etc. */
    color?: string;
    
    /** Border radius style: 'none' | 'sm' | 'md' | 'lg' | 'full' (pill shape) */
    rounded: string;
    
    /** Text to prepend before the tag value (e.g., 'v' for version tags, '[' for categories) */
    prefix?: string;
    
    /** Text to append after the tag value (e.g., ']' for categories, '!' for priorities) */
    suffix?: string;
    
    /** Text transformation: true (uppercase), 'emoji' (show custom emoji), 'scoreFormat' (format scores) */
    transform?: boolean | string;
    
    /** Custom emoji to display when transform is 'emoji' (replaces text content entirely) */
    customEmoji?: string;
    
    /** When to show tag: 'exists' (field exists), 'truthy' (field is truthy), 'gte80' (score >= 80) */
    condition?: string;
    
    /** Color overrides for specific field values - maps field value to color theme */
    valueStyles?: Record<string, { color: string }>;
}

/**
 * Deployment configuration interface for different deployment strategies
 * SSH credentials (host, username, private key) are managed via GitHub repository secrets for security
 * 
 * @example
 * ```ts
 * // GitHub Pages deployment (default) - no additional configuration needed
 * const githubDeployment: DeploymentConfig = {
 *   type: 'github-pages',
 *   server: { remotePath: '', port: 22, excludeFiles: [] },
 *   custom: { deployCommand: '', postDeployCommand: '' }
 * }
 * 
 * // Server deployment via SSH - credentials managed via GitHub secrets
 * const serverDeployment: DeploymentConfig = {
 *   type: 'server',
 *   server: {
 *     remotePath: '/var/www/html',              // Where to deploy files on server
 *     port: 22,                                 // SSH port (usually 22)
 *     excludeFiles: ['.git', 'node_modules', '*.log']  // Files to exclude from deployment
 *   },
 *   custom: { deployCommand: '', postDeployCommand: '' }
 * }
 * // Note: Set SSH_HOST, SSH_USERNAME, SSH_PRIVATE_KEY in GitHub repository secrets
 * 
 * // Custom deployment with user-defined commands
 * const customDeployment: DeploymentConfig = {
 *   type: 'custom',
 *   server: { remotePath: '', port: 22, excludeFiles: [] },
 *   custom: {
 *     deployCommand: 'vercel --prod --dir docs/.vitepress/dist',
 *     postDeployCommand: 'curl -X POST https://your-webhook.com/deployed'
 *   }
 * }
 * ```
 */
export interface DeploymentConfig {
    /** Deployment strategy type: 'github-pages' | 'server' | 'custom' */
    type: 'github-pages' | 'server' | 'custom';
    
    /** Server deployment configuration (only used when type is 'server') - SSH credentials managed via GitHub secrets */
    server: {
        /** Remote path on server where files should be deployed (e.g., '/var/www/html', '/home/user/public_html') */
        remotePath: string;
        /** SSH port number (default: 22, some servers use custom ports like 2222) */
        port: number;
        /** Files and directories to exclude from deployment (e.g., ['.git', 'node_modules', '*.log']) */
        excludeFiles: string[];
    };
    
    /** Custom deployment configuration (only used when type is 'custom') */
    custom: {
        /** Custom deployment command (e.g., 'vercel deploy', 'docker push', 'rsync -avz ...') */
        deployCommand: string;
        /** Optional post-deployment command (e.g., webhooks, cache invalidation, service restarts) */
        postDeployCommand: string;
    };
}

/**
 * Complete project configuration interface containing all VitePress site settings
 * 
 * @example
 * ```ts
 * const config: ProjectConfig = {
 *   name: "my-docs",                    // Site title and project name
 *   base: "/my-repo/",                  // GitHub Pages base path (CRITICAL for deployment)
 *   keyWords: ["docs", "guide"],        // SEO keywords for meta tags
 *   description: "My documentation",    // Site description for SEO
 *   version: "1.0.0",                   // Current project version
 *   author: "Your Name",                // Project author for metadata
 *   license: "MIT",                     // License type
 *   repository: {                       // Git repository information
 *     type: "git",
 *     url: "https://github.com/user/repo"
 *   },
 *   homepage: "https://user.github.io/repo/", // Live site URL
 *   defaultCurrency: "USD",             // For financial components
 *   languages: [...],                   // Multi-language configuration
 *   paths: {...},                       // File system paths
 *   features: {...},                    // Feature toggles
 *   sidebarTags: {...},                 // Sidebar tags configuration
 *   algolia: {...},                     // Search configuration
 *   deployment: {...}                   // Deployment configuration
 * }
 * ```
 */
export interface ProjectConfig {
    /** Project name used in site title, metadata, and branding */
    name: string;
    
    /** Base URL path for deployment - MUST match your repository name for GitHub Pages (e.g., "/my-repo/") */
    base: string;
    
    /** SEO keywords array for meta tags and search engine optimization */
    keyWords: string[];
    
    /** Project description for meta tags, README, and site metadata */
    description: string;
    
    /** Current project version for display and tracking */
    version: string;
    
    /** Project author name for copyright and metadata */
    author: string;
    
    /** License type (e.g., "MIT", "Apache-2.0") for legal information */
    license: string;
    
    /** Git repository information for source links and integrations */
    repository: {
        /** Repository type, typically "git" */
        type: string;
        /** Full repository URL for GitHub integration and edit links */
        url: string;
    };
    
    /** Live site URL for canonical links and social media */
    homepage: string;
    
    /** Default currency code for Bills component and financial calculations */
    defaultCurrency: string;
    
    /** Multi-language configuration array for i18n support */
    languages: LanguageConfig[];
    
    /** File system paths configuration for project structure */
    paths: PathConfig;
    
    /** Feature toggle flags for enabling/disabling optional functionality */
    features: {
        /** Enable Algolia search integration (requires algolia config) */
        search: boolean;
        /** Enable Git-based changelog generation from commit history */
        gitChangelog: boolean;
        /** Enable Mermaid diagram support in markdown */
        mermaid: boolean;
        /** Enable multi-language support and language switcher */
        multilingual: boolean;
        /** Enable automatic sidebar generation from file structure */
        autoSidebar: boolean;
        /** Enable sidebar tags feature for page metadata display */
        sidebarTags: boolean;
    };
    
    /** Sidebar tags configuration for displaying page metadata as tags */
    sidebarTags: {
        /** Global enable/disable for entire sidebar tags feature */
        enabled: boolean;
        /** Default styles applied to all tags unless overridden */
        globalStyles: {
            /** Default tag size for all tags */
            size: string;
            /** Default visual variant for all tags */
            variant: string;
            /** Default border radius for all tags */
            rounded: string;
        };
        /** Array of individual tag configurations for different frontmatter fields */
        tags: SidebarTagConfig[];
    };
    
    /** Custom code snippet file names for hero page floating animation effects */
    customSnippetFileNames?: string[];
    
    /** Algolia search service configuration (leave empty to disable search) */
    algolia: {
        /** Algolia application ID from your Algolia dashboard */
        appId: string;
        /** Algolia search API key (public, not admin key) */
        apiKey: string;
        /** Algolia search index name for your documentation */
        indexName: string;
    };

    /** Deployment configuration for different deployment strategies */
    deployment: DeploymentConfig;

    /** Configuration for floating social media buttons */
    socialButtons: SocialButton[];

    /** Special path configurations for the 'Back' button */
    specialBackPaths: SpecialBackPath[];

    /** Configuration for the "Copy Link" button */
    copyLinkConfig: CopyLinkConfig;
}

/**
 * Get all configured languages from project configuration
 * @returns Array of all language configurations
 * 
 * @example
 * ```ts
 * const languages = getLanguages();
 * console.log(languages.map(lang => lang.displayName)); // ["English", "简体中文"]
 * ```
 */
export function getLanguages(): LanguageConfig[] {
    return projectConfig.languages;
}

/**
 * Get the default language configuration
 * Returns the language marked as default, or first language as fallback
 * @returns Default language configuration
 * 
 * @example
 * ```ts
 * const defaultLang = getDefaultLanguage();
 * console.log(defaultLang.code); // "en-US"
 * ```
 */
export function getDefaultLanguage(): LanguageConfig {
    return projectConfig.languages.find(lang => lang.isDefault) || projectConfig.languages[0];
}

/**
 * Get array of all language codes for iteration and validation
 * @returns Array of language codes (e.g., ['en-US', 'zh-CN'])
 * 
 * @example
 * ```ts
 * const codes = getLanguageCodes();
 * if (codes.includes('zh-CN')) {
 *   console.log('Chinese is supported');
 * }
 * ```
 */
export function getLanguageCodes(): string[] {
    return projectConfig.languages.map(lang => lang.code);
}

/**
 * Find language configuration by language code
 * @param code - Language code to search for (e.g., 'en-US', 'zh-CN')
 * @returns Language configuration or undefined if not found
 * 
 * @example
 * ```ts
 * const chinese = getLanguageByCode('zh-CN');
 * if (chinese) {
 *   console.log(chinese.displayName); // "简体中文"
 * }
 * ```
 */
export function getLanguageByCode(code: string): LanguageConfig | undefined {
    return projectConfig.languages.find(lang => lang.code === code);
}

/**
 * Generate VitePress-compatible locales configuration
 * Converts our language config to the format VitePress expects
 * @returns VitePress locales configuration object
 * 
 * @example
 * ```ts
 * const locales = getLocalesConfig();
 * // Returns: { 
 * //   root: { label: 'English', lang: 'en-US', link: '/' },
 * //   'zh-CN': { label: '简体中文', lang: 'zh-CN', link: '/zh-CN/' }
 * // }
 * ```
 */
export function getLocalesConfig() {
    const locales: Record<string, any> = {};
    
    projectConfig.languages.forEach(lang => {
        const key = lang.isDefault ? 'root' : lang.code;
        locales[key] = {
            label: lang.label || lang.displayName,
            lang: lang.name,
            link: lang.link || (lang.isDefault ? '/' : `/${lang.code}/`)
        };
    });
    
    return locales;
}

/**
 * Get the default currency setting for financial components
 * @returns Default currency code (e.g., 'CNY', 'USD', 'EUR')
 * 
 * @example
 * ```ts
 * const currency = getDefaultCurrency();
 * console.log(`Using ${currency} for calculations`); // "Using CNY for calculations"
 * ```
 */
export function getDefaultCurrency(): string {
    return projectConfig.defaultCurrency;
}

/**
 * Get file system paths configuration for build tools and utilities
 * @returns Complete path configuration object
 * 
 * @example
 * ```ts
 * const paths = getPaths();
 * console.log(paths.docs); // "./src"
 * console.log(paths.build); // "./.vitepress/dist"
 * ```
 */
export function getPaths(): PathConfig {
    return projectConfig.paths;
}

/**
 * Check if a specific feature is enabled in the configuration
 * @param feature - Feature name to check (e.g., 'search', 'mermaid', 'gitChangelog')
 * @returns True if feature is enabled, false otherwise
 * 
 * @example
 * ```ts
 * if (isFeatureEnabled('search')) {
 *   console.log('Search is enabled');
 * }
 * 
 * if (isFeatureEnabled('mermaid')) {
 *   // Initialize Mermaid diagrams
 * }
 * ```
 */
export function isFeatureEnabled(feature: keyof typeof projectConfig.features): boolean {
    return projectConfig.features[feature];
}

/**
 * Get consolidated project information for metadata and integrations
 * @returns Object containing basic project info, repository data, and Algolia config
 * 
 * @example
 * ```ts
 * const info = getProjectInfo();
 * console.log(info.name); // "vitepress-M1hono-template"
 * console.log(info.repository.url); // "https://github.com/..."
 * ```
 */
export function getProjectInfo() {
    return {
        name: projectConfig.name,
        base: projectConfig.base,
        description: projectConfig.description,
        version: projectConfig.version,
        author: projectConfig.author,
        license: projectConfig.license,
        repository: projectConfig.repository,
        homepage: projectConfig.homepage,
        algolia: {
            appId: projectConfig.algolia.appId,
            apiKey: projectConfig.algolia.apiKey,
            indexName: projectConfig.algolia.indexName,
        },
    };
}

/**
 * Get complete sidebar tags configuration
 * @returns Full sidebar tags configuration including global styles and tag definitions
 * 
 * @example
 * ```ts
 * const tagsConfig = getSidebarTagsConfig();
 * console.log(tagsConfig.enabled); // true/false
 * console.log(tagsConfig.tags.length); // Number of configured tags
 * ```
 */
export function getSidebarTagsConfig() {
    return projectConfig.sidebarTags;
}

/**
 * Check if sidebar tags feature is fully enabled
 * Validates both global feature flag and sidebar tags specific setting
 * @returns True if sidebar tags should be active
 * 
 * @example
 * ```ts
 * if (isSidebarTagsEnabled()) {
 *   // Initialize sidebar tags functionality
 *   console.log('Sidebar tags are active');
 * }
 * ```
 */
export function isSidebarTagsEnabled(): boolean {
    return projectConfig.features.sidebarTags && projectConfig.sidebarTags.enabled;
}

/**
 * Get tag configurations for a specific language
 * Currently returns same tags for all languages (prepared for future localization)
 * @param langCode - Language code (e.g., 'en-US', 'zh-CN') - currently unused but future-ready
 * @returns Array of tag configurations for the language, or empty array if disabled
 * 
 * @example
 * ```ts
 * const enTags = getTagsConfigForLanguage('en-US');
 * const zhTags = getTagsConfigForLanguage('zh-CN');
 * 
 * enTags.forEach(tag => {
 *   console.log(`Tag for field: ${tag.field}`);
 * });
 * ```
 */
export function getTagsConfigForLanguage(langCode: string): SidebarTagConfig[] {
    const config = projectConfig.sidebarTags;
    
    if (!config.enabled) {
        return [];
    }
    
    return config.tags;
}

/**
 * Get complete deployment configuration for CI/CD workflows and build systems
 * Access all deployment settings including server details and custom commands
 * @returns Complete deployment configuration object
 * 
 * @example
 * ```ts
 * const deployment = getDeploymentConfig();
 * console.log(deployment.type); // "github-pages" | "server" | "custom"
 * 
 * // Check server configuration for SSH deployments
 * if (deployment.type === 'server') {
 *   console.log(`Deploying to: ${deployment.server.remotePath}`);
 *   console.log(`SSH Port: ${deployment.server.port}`);
 *   console.log(`Excluded files: ${deployment.server.excludeFiles.join(', ')}`);
 * }
 * 
 * // Check custom deployment commands
 * if (deployment.type === 'custom') {
 *   console.log(`Deploy command: ${deployment.custom.deployCommand}`);
 *   if (deployment.custom.postDeployCommand) {
 *     console.log(`Post-deploy: ${deployment.custom.postDeployCommand}`);
 *   }
 * }
 * 
 * // Use in build scripts
 * if (deployment.type === 'github-pages') {
 *   console.log('Preparing GitHub Pages deployment...');
 * }
 * ```
 */
export function getDeploymentConfig(): DeploymentConfig {
    return projectConfig.deployment;
}

/**
 * Check if a specific deployment type is currently active
 * Useful for conditional logic in build scripts and CI/CD workflows
 * @param type - Deployment strategy to check ('github-pages' | 'server' | 'custom')
 * @returns True if the specified deployment type is currently configured as active
 * 
 * @example
 * ```ts
 * // Conditional deployment logic
 * if (isDeploymentActive('github-pages')) {
 *   console.log('✅ GitHub Pages deployment is active');
 *   console.log('No additional configuration needed');
 * }
 * 
 * if (isDeploymentActive('server')) {
 *   console.log('🖥️  Server deployment is active');
 *   console.log('Ensure SSH_HOST and SSH_USERNAME secrets are configured');
 * }
 * 
 * if (isDeploymentActive('custom')) {
 *   console.log('⚙️  Custom deployment is active');
 *   console.log('Custom commands will be executed during deployment');
 * }
 * 
 * // Use in build scripts
 * const buildForProduction = isDeploymentActive('github-pages') || 
 *                           isDeploymentActive('server');
 * 
 * // Environment-specific builds
 * if (isDeploymentActive('custom')) {
 *   console.log('Running custom build optimizations...');
 * }
 * ```
 */
export function isDeploymentActive(type: 'github-pages' | 'server' | 'custom'): boolean {
    return projectConfig.deployment.type === type;
}

/**
 * Get the currently active deployment strategy type
 * Returns the deployment method configured in project settings
 * @returns Current deployment strategy type as a string literal
 * 
 * @example
 * ```ts
 * const deploymentType = getActiveDeploymentType();
 * 
 * // Switch-based deployment handling
 * switch (deploymentType) {
 *   case 'github-pages':
 *     console.log('🔄 Using GitHub Pages deployment');
 *     console.log('Site will be deployed to https://username.github.io/repo/');
 *     break;
 *     
 *   case 'server':
 *     console.log('🖥️  Using server deployment via SSH');
 *     console.log('Files will be copied to remote server');
 *     break;
 *     
 *   case 'custom':
 *     console.log('⚙️  Using custom deployment strategy');
 *     console.log('Custom commands will handle deployment');
 *     break;
 * }
 * 
 * // Conditional environment setup
 * if (deploymentType === 'server') {
 *   console.log('Setting up SSH connection...');
 * } else if (deploymentType === 'custom') {
 *   console.log('Preparing custom deployment environment...');
 * }
 * 
 * // Configuration validation
 * const config = getDeploymentConfig();
 * if (deploymentType === 'server' && !config.server.host) {
 *   throw new Error('Server host is required for server deployment');
 * }
 * 
 * // Deployment-specific optimizations
 * const shouldOptimizeForCDN = deploymentType === 'github-pages';
 * const shouldCompressAssets = deploymentType !== 'github-pages';
 * ```
 */
export function getActiveDeploymentType(): 'github-pages' | 'server' | 'custom' {
    return projectConfig.deployment.type;
}

/**
 * Get server deployment configuration details
 * Returns server-specific settings for SSH deployments (excluding sensitive credentials)
 * @returns Server configuration object with deployment path, port, and exclusion settings
 * 
 * @example
 * ```ts
 * const serverConfig = getServerDeploymentConfig();
 * 
 * // Validate server configuration
 * if (!serverConfig.remotePath) {
 *   console.error('❌ Server deployment requires remotePath to be configured');
 *   console.log('Set remotePath in deployment.server configuration');
 * }
 * 
 * // Log deployment target details
 * console.log(`📡 Deployment target: ${serverConfig.remotePath}`);
 * console.log(`🔌 SSH port: ${serverConfig.port}`);
 * console.log(`🚫 Excluded files: ${serverConfig.excludeFiles.join(', ')}`);
 * 
 * // Note: SSH credentials are managed via GitHub secrets
 * console.log('📋 Required GitHub secrets: SSH_HOST, SSH_USERNAME, SSH_PRIVATE_KEY');
 * 
 * // Build exclusion flags for rsync command
 * const excludeFlags = serverConfig.excludeFiles
 *   .map(file => `--exclude='${file}'`)
 *   .join(' ');
 * console.log(`🚫 Rsync exclude flags: ${excludeFlags}`);
 * 
 * // Port validation
 * if (serverConfig.port < 1 || serverConfig.port > 65535) {
 *   console.warn(`⚠️  Invalid SSH port: ${serverConfig.port}`);
 * } else if (serverConfig.port !== 22) {
 *   console.info(`ℹ️  Using custom SSH port: ${serverConfig.port}`);
 * }
 * ```
 */
export function getServerDeploymentConfig() {
    return projectConfig.deployment.server;
}

/**
 * Get custom deployment configuration and commands
 * Returns user-defined deployment commands for custom deployment strategies
 * @returns Custom deployment configuration with deploy and post-deploy commands
 * 
 * @example
 * ```ts
 * const customConfig = getCustomDeploymentConfig();
 * 
 * // Validate custom deployment setup
 * if (!customConfig.deployCommand) {
 *   console.warn('⚠️  No deploy command specified for custom deployment');
 *   console.log('Add deployCommand to deployment.custom configuration');
 * }
 * 
 * // Log deployment steps
 * console.log(`🚀 Deploy command: ${customConfig.deployCommand}`);
 * if (customConfig.postDeployCommand) {
 *   console.log(`📋 Post-deploy: ${customConfig.postDeployCommand}`);
 * }
 * 
 * // Execute deployment commands (example for Node.js script)
 * import { execSync } from 'child_process';
 * 
 * try {
 *   console.log('Executing deployment command...');
 *   execSync(customConfig.deployCommand, { stdio: 'inherit' });
 *   
 *   if (customConfig.postDeployCommand) {
 *     console.log('Executing post-deployment command...');
 *     execSync(customConfig.postDeployCommand, { stdio: 'inherit' });
 *   }
 *   
 *   console.log('✅ Custom deployment completed successfully');
 * } catch (error) {
 *   console.error('❌ Deployment failed:', error.message);
 * }
 * 
 * // Platform-specific examples
 * const isDockerDeployment = customConfig.deployCommand.includes('docker');
 * const isVercelDeployment = customConfig.deployCommand.includes('vercel');
 * const isNetlifyDeployment = customConfig.deployCommand.includes('netlify');
 * ```
 */
export function getCustomDeploymentConfig() {
    return projectConfig.deployment.custom;
}

/**
 * Get the copy link configuration
 * @returns The copy link configuration object
 */
export function getCopyLinkConfig(): CopyLinkConfig {
    return projectConfig.copyLinkConfig || { removeLanguage: true };
}

/**
 * Get the social button configurations
 * @returns Array of social button configurations
 */
export function getSocialButtons(): SocialButton[] {
    return projectConfig.socialButtons || [];
}

/**
 * Get the special back path configurations
 * @returns Array of special back path configurations
 */
export function getSpecialBackPaths(): SpecialBackPath[] {
    return projectConfig.specialBackPaths || [];
}

/**
 * Validate current deployment configuration
 * Checks if the deployment setup is complete and properly configured
 * @returns Validation result object with status and any error messages
 * 
 * @example
 * ```ts
 * const validation = validateDeploymentConfig();
 * 
 * if (validation.isValid) {
 *   console.log('✅ Deployment configuration is valid');
 *   console.log(`Using ${validation.deploymentType} deployment`);
 * } else {
 *   console.error('❌ Deployment configuration issues:');
 *   validation.errors.forEach(error => console.error(`  - ${error}`));
 * }
 * 
 * // Use in CI/CD pre-deployment checks
 * if (!validation.isValid) {
 *   process.exit(1); // Fail the build
 * }
 * 
 * // Conditional warnings
 * if (validation.warnings.length > 0) {
 *   console.warn('⚠️  Deployment configuration warnings:');
 *   validation.warnings.forEach(warning => console.warn(`  - ${warning}`));
 * }
 * ```
 */
export function validateDeploymentConfig() {
    const deployment = projectConfig.deployment;
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate server deployment
    if (deployment.type === 'server') {
        if (!deployment.server.remotePath) {
            errors.push('Server deployment requires remotePath to be specified');
        }
        if (deployment.server.port < 1 || deployment.server.port > 65535) {
            errors.push(`Invalid SSH port: ${deployment.server.port}`);
        }
        // Note: SSH credentials (host, username, private key) are managed via GitHub secrets
        warnings.push('Ensure SSH_HOST, SSH_USERNAME, and SSH_PRIVATE_KEY secrets are configured in GitHub repository');
    }

    // Validate custom deployment
    if (deployment.type === 'custom') {
        if (!deployment.custom.deployCommand) {
            errors.push('Custom deployment requires deployCommand to be specified');
        }
    }

    return {
        isValid: errors.length === 0,
        deploymentType: deployment.type,
        errors,
        warnings
    };
}