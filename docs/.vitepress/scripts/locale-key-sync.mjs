import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';
import { parse as parseSFC, compileScript } from '@vue/compiler-sfc';
import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import { projectConfig } from '../config/project-config';

const traverse = _traverse.default;

const COMPONENTS_DIR = path.resolve(process.cwd(), '.vitepress/theme/components');
const LOCALE_DIR = path.resolve(process.cwd(), '.vitepress/config/locale');
const I18N_COMMENT = '@i18n';

/**
 * Extracts key-value pairs from a useI18n call expression node.
 * @param {object} node - The AST node to parse.
 * @returns {Record<string, string> | null} The extracted keys and default values.
 */
function extractKeysFromNode(node) {
    if (node.type !== 'ObjectExpression') return null;

    const keys = {};
    for (const prop of node.properties) {
        if (prop.type === 'ObjectProperty' && prop.key.type === 'Identifier' && prop.value.type === 'StringLiteral') {
            keys[prop.key.name] = prop.value.value;
        }
    }
    return keys;
}

/**
 * Parses the content of a Vue file to find translation keys.
 * @param {string} content - The file content.
 * @param {string} filename - The name of the file being parsed.
 * @returns {Record<string, string> | null} The extracted keys.
 */
function parseVueFile(content, filename) {
    if (!content.includes(I18N_COMMENT)) {
        return null;
    }
    
    const { descriptor, errors } = parseSFC(content, { filename });
    if (errors.length) {
        console.error(`Error parsing ${filename}:`, errors);
        return null;
    }

    if (!descriptor.scriptSetup) {
        return null;
    }

    const scriptContent = compileScript(descriptor, {
        id: filename,
        isTS: true,
        inlineTemplate: true,
    });

    if (!scriptContent || !scriptContent.content) return null;

    const ast = parse(scriptContent.content, {
        sourceType: 'module',
        plugins: ['typescript'],
    });

    let keys = null;
    traverse(ast, {
        CallExpression(path) {
            if (path.node.callee.type === 'Identifier' && path.node.callee.name === 'useI18n') {
                if (path.node.arguments.length > 0 && path.node.arguments[0].type === 'ObjectExpression') {
                    keys = extractKeysFromNode(path.node.arguments[0]);
                    path.stop();
                }
            }
        },
    });

    return keys;
}

/**
 * Reads and writes JSON files for translations.
 */
const jsonFileHandler = {
    async read(filePath) {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(content);
        } catch (error) {
            if (error.code === 'ENOENT') return {};
            throw error;
        }
    },
    async write(filePath, data) {
        const sortedData = Object.keys(data).sort().reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, JSON.stringify(sortedData, null, 4), 'utf-8');
    }
};

/**
 * Synchronizes a translation file with a set of keys and default values.
 * @param {string} filePath - Path to the JSON file.
 * @param {Record<string, string>} componentKeys - Keys from the component.
 * @param {boolean} useDefaults - Whether to use default values for new keys.
 */
async function syncTranslationFile(filePath, componentKeys, useDefaults) {
    const existingTranslations = await jsonFileHandler.read(filePath);
    const newTranslations = { ...existingTranslations };

    for (const key in componentKeys) {
        if (!newTranslations.hasOwnProperty(key)) {
            newTranslations[key] = useDefaults ? componentKeys[key] : '';
        }
    }
    for (const key in newTranslations) {
        if (!componentKeys.hasOwnProperty(key)) {
            delete newTranslations[key];
        }
    }
    await jsonFileHandler.write(filePath, newTranslations);
}

/**
 * Creates empty snippet files for a given language if they don't already exist.
 * This handles default, custom, and any other configured snippet files.
 * @param {string} lang - The language code (e.g., 'en-US').
 * @param {string[]} additionalFiles - An array of extra filenames for custom snippets to generate.
 */
async function syncSnippetFiles(lang, additionalFiles) {
    const snippetDir = path.join(LOCALE_DIR, lang, 'snippets');
    await fs.mkdir(snippetDir, { recursive: true });

    const filesToCreate = [
        'default',
        'custom',
        ...additionalFiles
    ];

    for (const baseName of filesToCreate) {
        const filePath = path.join(snippetDir, `${baseName}.json`);
        try {
            await fs.access(filePath);
            // File exists, do nothing to preserve user translations.
        } catch {
            // File does not exist, create an empty one for the user to fill.
            console.log(`Creating empty snippet file '${baseName}.json' for ${lang}...`);
            await fs.writeFile(filePath, JSON.stringify([], null, 4), 'utf-8');
        }
    }
}

async function main() {
    console.log('🚀 Starting i18n synchronization...');
    const languages = projectConfig.languages.map(lang => lang.code);
    const primaryLanguage = projectConfig.languages.find(l => l.isDefault)?.code || languages[0];

    if (!primaryLanguage) {
        console.error('No primary language found in project-config.ts. Aborting.');
        return;
    }

    // Sync component translation keys
    const vueFiles = await fg('**/*.vue', { cwd: COMPONENTS_DIR });
    for (const file of vueFiles) {
        const fullPath = path.join(COMPONENTS_DIR, file);
        const content = await fs.readFile(fullPath, 'utf-8');
        const componentKeys = parseVueFile(content, fullPath);

        if (componentKeys && Object.keys(componentKeys).length > 0) {
            console.log(`\n🔄 Processing ${file}`);
            const componentPathWithoutExt = file.replace(/\.vue$/, '');
            
            const primaryLocalePath = path.join(LOCALE_DIR, primaryLanguage, `components/${componentPathWithoutExt}.json`);
            const existingPrimaryTranslations = await jsonFileHandler.read(primaryLocalePath);
            
            const primaryTranslations = { ...componentKeys, ...existingPrimaryTranslations };
            
            for (const key in primaryTranslations) {
                if (!componentKeys.hasOwnProperty(key)) {
                    delete primaryTranslations[key];
                }
            }
            await jsonFileHandler.write(primaryLocalePath, primaryTranslations);

            for (const lang of languages) {
                if (lang === primaryLanguage) continue;

                const localeFilePath = path.join(LOCALE_DIR, lang, `components/${componentPathWithoutExt}.json`);
                const existingTranslations = await jsonFileHandler.read(localeFilePath);
                
                const newTranslations = { ...primaryTranslations, ...existingTranslations };
                
                for (const key in newTranslations) {
                    if (!primaryTranslations.hasOwnProperty(key)) {
                        delete newTranslations[key];
                    }
                }
                
                await jsonFileHandler.write(localeFilePath, newTranslations);
            }
        }
    }
    
    console.log('\n🔄 Processing snippet files...');
    const customSnippets = projectConfig.customSnippetFileNames || [];
    for (const lang of languages) {
        await syncSnippetFiles(lang, customSnippets);
    }

    console.log('\n✅ i18n synchronization complete!');
}

main().catch(error => {
    console.error('An error occurred during i18n synchronization:', error);
    process.exit(1);
}); 