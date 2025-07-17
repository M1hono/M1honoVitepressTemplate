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

function parseVueFile(content, filename) {
    // Check if the file uses i18n functions instead of relying on @i18n comment
    if (!content.includes('useSafeI18n') && !content.includes('useI18n')) {
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
    let componentId = null;

    traverse(ast, {
        CallExpression(path) {
            if (path.node.callee.type === 'Identifier' && 
                (path.node.callee.name === 'useI18n' || path.node.callee.name === 'useSafeI18n')) {
                
                let keysArg = null;
                
                if (path.node.arguments.length > 0) {
                    // Extract componentId from first argument (for useSafeI18n)
                    if (path.node.callee.name === 'useSafeI18n' && 
                        path.node.arguments[0] && 
                        path.node.arguments[0].type === 'StringLiteral') {
                        componentId = path.node.arguments[0].value;
                        
                        if (path.node.arguments.length >= 2 && path.node.arguments[1].type === 'ObjectExpression') {
                            keysArg = path.node.arguments[1];
                        }
                    }
                    else if (path.node.arguments[0].type === 'ObjectExpression') {
                        keysArg = path.node.arguments[0];
                    }
                }
                
                if (keysArg) {
                    keys = extractKeysFromNode(keysArg);
                    path.stop();
                }
            }
        },
    });

    return { keys, componentId };
}

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
        } catch {
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

    const vueFiles = await fg('**/*.vue', { cwd: COMPONENTS_DIR });
    let processedCount = 0;
    let totalKeysCount = 0;
    const componentIdMapping = {}; // Store componentId -> filePath mapping
    
    for (const file of vueFiles) {
        const fullPath = path.join(COMPONENTS_DIR, file);
        const content = await fs.readFile(fullPath, 'utf-8');
        const parseResult = parseVueFile(content, fullPath);

        // Handle null result from parseVueFile
        if (!parseResult || !parseResult.keys || Object.keys(parseResult.keys).length === 0) {
            continue;
        }

        const { keys, componentId } = parseResult;

        console.log(`\n🔄 Processing ${file} (${Object.keys(keys).length} keys)`);
        processedCount++;
        totalKeysCount += Object.keys(keys).length;
        
        const componentPathWithoutExt = file.replace(/\.vue$/, '');
        
        // Store componentId mapping if found
        if (componentId) {
            componentIdMapping[componentId] = componentPathWithoutExt;
            console.log(`   📋 Found componentId: "${componentId}" -> "${componentPathWithoutExt}"`);
        }
        
        const primaryLocalePath = path.join(LOCALE_DIR, primaryLanguage, `components/${componentPathWithoutExt}.json`);
        const existingPrimaryTranslations = await jsonFileHandler.read(primaryLocalePath);
        
        const primaryTranslations = { ...keys, ...existingPrimaryTranslations };
        
        for (const key in primaryTranslations) {
            if (!keys.hasOwnProperty(key)) {
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
    
    // Generate component ID mapping file
    console.log('\n🔄 Generating component ID mapping...');
    const mappingFilePath = path.join(LOCALE_DIR, 'component-id-mapping.json');
    const mappingData = {
        generatedAt: new Date().toISOString(),
        description: 'Maps component IDs used in useSafeI18n() to their corresponding translation file paths',
        mappings: componentIdMapping
    };
    await jsonFileHandler.write(mappingFilePath, mappingData);
    console.log(`📋 Generated component ID mapping with ${Object.keys(componentIdMapping).length} entries`);
    
    console.log('\n🔄 Processing snippet files...');
    const customSnippets = projectConfig.customSnippetFileNames || [];
    for (const lang of languages) {
        await syncSnippetFiles(lang, customSnippets);
    }

    console.log(`\n✅ i18n synchronization complete!`);
    console.log(`📊 Summary: ${processedCount} components processed, ${totalKeysCount} total translation keys`);
}

main().catch(error => {
    console.error('An error occurred during i18n synchronization:', error);
    process.exit(1);
}); 