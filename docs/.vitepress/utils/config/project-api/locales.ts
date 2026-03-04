import { projectConfig } from "../../../config/project-config";
import type { SearchLocalesByProvider } from "../project-types";
import { getLangCodeFromLink } from "./language";

function mergeLocales<T extends Record<string, any> | undefined>(
    ...parts: T[]
): Record<string, any> | undefined {
    const merged = Object.assign({}, ...parts.filter(Boolean));
    return Object.keys(merged).length > 0 ? merged : undefined;
}

export async function generateLocalesConfig(useRootForDefault: boolean = false) {
    const locales: Record<string, any> = {};

    for (const lang of projectConfig.languages) {
        try {
            const langModule = await import(
                /* @vite-ignore */ `../../../config/lang/${lang.fileName}`
            );

            const moduleKey = lang.code.replace("-", "_");
            const langConfig = langModule[moduleKey as keyof typeof langModule];

            if (langConfig) {
                const localeKey =
                    useRootForDefault && lang.isDefault ? "root" : lang.code;
                locales[localeKey] = {
                    label: lang.displayName,
                    ...(langConfig as any),
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
    langModules: Record<string, any>;
    searchLocales: SearchLocalesByProvider;
}> {
    const langModules: Record<string, any> = {};
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

            let foundConfig = null;
            for (const key of possibleKeys) {
                if (langModule[key]) {
                    foundConfig = langModule[key];
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
                    langModule.searchLocales as Record<string, Record<string, any>>,
                )) {
                    searchLocales[provider] = mergeLocales(
                        searchLocales[provider],
                        locales,
                    );
                }
            } else if (langModule.search) {
                searchLocales.algolia = mergeLocales(
                    searchLocales.algolia,
                    langModule.search as Record<string, any>,
                ) as any;
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
) {
    const { langModules, searchLocales } = await autoDiscoverLanguageModules();
    const locales = generateLocalesConfigFromModules(
        langModules,
        useRootForDefault,
    );
    return { locales, searchLocales };
}

export function generateLocalesConfigFromModules(
    langModules: Record<string, any>,
    useRootForDefault: boolean = false,
) {
    const locales: Record<string, any> = {};

    for (const lang of projectConfig.languages) {
        const moduleKey = lang.code.replace("-", "_");
        const langConfig = langModules[moduleKey as keyof typeof langModules] as
            | Record<string, any>
            | undefined;

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
                ...(langConfig as any),
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

export function createAutoImportHelper() {
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
        getRequiredImports: () => {
            const result: Record<string, any> = {};
            return result;
        },
    };
}

export function generateLocalesConfigSync(
    langModules: Record<string, any>,
    useRootForDefault: boolean = false,
) {
    console.warn(
        "generateLocalesConfigSync is deprecated. Use generateLocalesConfigFromModules or generateLocalesConfigAuto instead.",
    );
    return generateLocalesConfigFromModules(langModules, useRootForDefault);
}
