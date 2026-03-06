import { projectConfig } from "../../../config/project-config";
import type { SearchLocalesByProvider } from "../project-types";
import { mergeLocales } from "../shared-utils";
import { getLangCodeFromLink } from "./language";

/**
 * Base locale configuration structure for VitePress.
 */
interface LocaleConfigBase {
    label: string;
    lang?: string;
    title?: string;
    description?: string;
    [key: string]: unknown;
}

export async function generateLocalesConfig(useRootForDefault: boolean = false): Promise<Record<string, LocaleConfigBase>> {
    const locales: Record<string, LocaleConfigBase> = {};

    for (const lang of projectConfig.languages) {
        try {
            const langModule = await import(
                /* @vite-ignore */ `../../../config/lang/${lang.fileName}`
            );

            const moduleKey = lang.code.replace("-", "_");
            const langConfig = langModule[moduleKey as keyof typeof langModule] as LocaleConfigBase | undefined;

            if (langConfig) {
                const localeKey =
                    useRootForDefault && lang.isDefault ? "root" : lang.code;
                locales[localeKey] = {
                    label: lang.displayName,
                    ...langConfig,
                };
            } else {
                console.warn(
                    `Language configuration not found for ${
                        lang.code
                    }. Available exports: ${Object.keys(langModule).join(", ")}`,
                );
            }
        } catch (error) {
            console.warn(
                `Failed to load language configuration for ${lang.code}:`,
                error,
            );
        }
    }

    return locales;
}

export async function autoDiscoverLanguageModules(): Promise<{
    langModules: Record<string, LocaleConfigBase>;
    searchLocales: SearchLocalesByProvider;
}> {
    const langModules: Record<string, LocaleConfigBase> = {};
    const searchLocales: SearchLocalesByProvider = {};

    for (const lang of projectConfig.languages) {
        if (!lang.fileName) {
            console.warn(
                `No fileName specified for language ${lang.code}, skipping`,
            );
            continue;
        }

        try {
            const langModule = await import(
                /* @vite-ignore */ `../../../config/lang/${lang.fileName}`
            );

            const possibleKeys = [
                lang.code.replace("-", "_"),
                lang.fileName.replace(".ts", "").replace("-", "_"),
                lang.code,
                lang.name.replace("-", "_"),
            ];

            let foundConfig: LocaleConfigBase | null = null;
            for (const key of possibleKeys) {
                if (langModule[key]) {
                    foundConfig = langModule[key] as LocaleConfigBase;
                    langModules[lang.code.replace("-", "_")] = foundConfig;
                    break;
                }
            }

            if (!foundConfig) {
                console.warn(
                    `No valid export found for ${
                        lang.code
                    }. Available exports: ${Object.keys(langModule).join(", ")}`,
                );
            }

            if (
                langModule.searchLocales &&
                typeof langModule.searchLocales === "object"
            ) {
                for (const [provider, locales] of Object.entries(
                    langModule.searchLocales as Record<string, Record<string, unknown>>,
                )) {
                    searchLocales[provider] = mergeLocales(
                        searchLocales[provider],
                        locales,
                    );
                }
            } else if (langModule.search) {
                searchLocales.algolia = mergeLocales(
                    searchLocales.algolia,
                    langModule.search as Record<string, unknown>,
                );
            }
        } catch (error) {
            console.warn(
                `Failed to load language module for ${lang.code}:`,
                error,
            );
        }
    }

    return { langModules, searchLocales };
}

export async function generateLocalesConfigAuto(
    useRootForDefault: boolean = false,
): Promise<{
    locales: Record<string, LocaleConfigBase>;
    searchLocales: SearchLocalesByProvider;
}> {
    const { langModules, searchLocales } = await autoDiscoverLanguageModules();
    const locales = generateLocalesConfigFromModules(
        langModules,
        useRootForDefault,
    );
    return { locales, searchLocales };
}

export function generateLocalesConfigFromModules(
    langModules: Record<string, LocaleConfigBase>,
    useRootForDefault: boolean = false,
): Record<string, LocaleConfigBase> {
    const locales: Record<string, LocaleConfigBase> = {};

    for (const lang of projectConfig.languages) {
        const moduleKey = lang.code.replace("-", "_");
        const langConfig = langModules[moduleKey as keyof typeof langModules];

        if (langConfig) {
            let localeKey: string;
            if (useRootForDefault && lang.isDefault) {
                localeKey = "root";
            } else if (useRootForDefault) {
                localeKey = getLangCodeFromLink(lang.link);
            } else {
                localeKey = lang.code;
            }

            locales[localeKey] = {
                label: lang.displayName,
                ...langConfig,
            };
        } else {
            console.warn(
                `Language configuration not found for ${lang.code} (expected export: ${moduleKey}).`,
            );
            console.warn(
                `Available keys in langModules: ${Object.keys(langModules).join(", ")}`,
            );
        }
    }

    return locales;
}

export function createAutoImportHelper(): {
    imports: string;
    langModulesCode: string;
    moduleMapping: string[];
    getRequiredImports: () => Record<string, never>;
} {
    const imports: string[] = [];
    const moduleMapping: string[] = [];

    for (const lang of projectConfig.languages) {
        if (!lang.fileName) continue;

        const moduleVarName = lang.code.replace("-", "_");
        const filePath = `./config/lang/${lang.fileName.replace(".ts", "")}`;
        imports.push(`import { ${moduleVarName} } from "${filePath}"`);
        moduleMapping.push(`    ${moduleVarName}`);
    }

    const langModulesCode = `const langModules = {\n${moduleMapping.join(
        ",\n",
    )}\n};`;

    return {
        imports: imports.join("\n"),
        langModulesCode,
        moduleMapping,
        getRequiredImports: () => ({}),
    };
}

/** @deprecated Use generateLocalesConfigFromModules or generateLocalesConfigAuto instead. */
export function generateLocalesConfigSync(
    langModules: Record<string, LocaleConfigBase>,
    useRootForDefault: boolean = false,
): Record<string, LocaleConfigBase> {
    console.warn(
        "generateLocalesConfigSync is deprecated. Use generateLocalesConfigFromModules or generateLocalesConfigAuto instead.",
    );
    return generateLocalesConfigFromModules(langModules, useRootForDefault);
}
