#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { getLanguageCodes } from "../config/project-config.js";
import { getSrcPath, getVitepressPath } from "../utils/config/path-resolver.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROJECT_ROOT = process.cwd()
const DOCS_ROOT = getSrcPath()
const CONFIG_ROOT = getVitepressPath("config/sidebar")

/**
 * Parse frontmatter from markdown content
 * @param {string} content - Markdown file content
 * @returns {Object} Parsed frontmatter object
 */
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/
    const match = content.match(frontmatterRegex)
    
    if (!match) return {}
    
    try {
        const frontmatter = {}
        const yamlContent = match[1]
        const yamlLines = yamlContent.split(/\r?\n/)
        
        for (const line of yamlLines) {
            const colonIndex = line.indexOf(':')
            if (colonIndex > 0) {
                const key = line.substring(0, colonIndex).trim()
                const value = line.substring(colonIndex + 1).trim()
                // Remove quotes and clean up value
                frontmatter[key] = value.replace(/^['"]|['"]$/g, '')
            }
        }
        
        return frontmatter
    } catch (error) {
        console.warn(`Failed to parse frontmatter: ${error.message}`)
        return {}
    }
}

/**
 * Get relative path from src root to a given directory
 * @param {string} absolutePath - Absolute path to directory
 * @returns {string} Relative path from src root
 */
function getRelativePathFromSrc(absolutePath) {
    return path.relative(DOCS_ROOT, absolutePath).replace(/\\/g, '/')
}

/**
 * Get the config directory path for a given src directory
 * @param {string} lang - Language code
 * @param {string} srcPath - Relative path from src root
 * @returns {string} Config directory path
 */
function getConfigDirPath(lang, srcPath) {
    // Remove language prefix from src path
    const pathWithoutLang = srcPath.startsWith(`${lang}/`)
        ? srcPath.substring(lang.length + 1)
        : srcPath
    
    return path.resolve(CONFIG_ROOT, lang, pathWithoutLang)
}

/**
 * Read and parse JSON file safely
 * @param {string} filePath - Path to JSON file
 * @returns {Object} Parsed JSON object or empty object
 */
function readJsonFile(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8')
            return JSON.parse(content)
        }
    } catch (error) {
        console.warn(`Failed to read JSON file ${filePath}: ${error.message}`)
    }
    return {}
}

/**
 * Write JSON file safely with proper formatting
 * @param {string} filePath - Path to JSON file
 * @param {Object} data - Data to write
 */
function writeJsonFile(filePath, data) {
    try {
        // Ensure directory exists
        const dir = path.dirname(filePath)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        
        // Write with proper formatting
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
    } catch (error) {
        console.error(`Failed to write JSON file ${filePath}: ${error.message}`)
    }
}

/**
 * Create or update index.md with proper title
 * @param {string} indexPath - Path to index.md file
 * @param {string} title - Title for the index
 * @param {string} description - Description for the index
 */
function updateIndexFile(indexPath, title, description) {
    let content = '# Index\n\nThis is an auto-generated index file.\n'
    let frontmatter = {
        title: title,
        description: description,
        index: true
    }

    if (fs.existsSync(indexPath)) {
        try {
            const existingContent = fs.readFileSync(indexPath, 'utf-8')
            const parsed = matter(existingContent)
            
            // Preserve existing frontmatter but update key fields
            frontmatter = {
                ...parsed.data,
                title: title,
                description: description,
                index: true
            }
            
            // Preserve existing content if it's not just the default
            if (parsed.content.trim() && !parsed.content.includes('auto-generated index')) {
                content = parsed.content
            }
        } catch (error) {
            console.warn(`Warning: Could not parse existing ${indexPath}:`, error.message)
        }
    }

    const newContent = matter.stringify(content, frontmatter)
    fs.writeFileSync(indexPath, newContent, 'utf-8')
}

/**
 * Process a directory recursively
 * @param {string} currentDir - Current directory being processed
 * @param {string} lang - Language code
 */
function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir)
    
    // Check if directory has markdown files (excluding index.md)
    const hasMarkdownFiles = items.some(item => {
        const itemPath = path.resolve(currentDir, item)
        const stats = fs.statSync(itemPath)
        return stats.isFile() && item.endsWith('.md') && item !== 'index.md'
    })

    // Check if directory has subdirectories with content
    const hasSubdirectories = items.some(item => {
        const itemPath = path.resolve(currentDir, item)
        const stats = fs.statSync(itemPath)
        return stats.isDirectory() && !item.startsWith('.')
    })

    if (hasMarkdownFiles || hasSubdirectories) {
        const relativePath = getRelativePathFromSrc(currentDir)
        const indexPath = path.resolve(currentDir, 'index.md')
        
        // Generate title from directory name
        const dirName = path.basename(currentDir)
        const title = dirName
            .split(/[-_]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

        const indexInfo = {
            path: indexPath,
            srcPath: relativePath,
            title: title,
            description: `Index of ${title} section`
        }

        console.log(`📝 Processing: ${relativePath} -> "${title}"`)
        updateIndexFile(indexPath, title, indexInfo.description)
    }

    // Recursively process subdirectories
    items.forEach(item => {
        const itemPath = path.resolve(currentDir, item)
        const stats = fs.statSync(itemPath)
        
        if (stats.isDirectory() && !item.startsWith('.')) {
            scanDirectory(itemPath)
        }
    })
}

/**
 * Main function to update index titles for all languages
 */
function updateIndexTitles() {
    console.log('🚀 Starting index title update process...')
    console.log(`📂 Src root: ${DOCS_ROOT}`)
    console.log(`⚙️  Config root: ${CONFIG_ROOT}\n`)

    const languages = getLanguageCodes();
    
    for (const lang of languages) {
        console.log(`\n🌐 Processing language: ${lang}`)
        
        const langSrcRoot = path.resolve(DOCS_ROOT, lang)
        
        if (!fs.existsSync(langSrcRoot)) {
            console.warn(`Language src directory not found: ${langSrcRoot}`)
            continue
        }

        scanDirectory(langSrcRoot)
    }

    console.log('\n✅ Index title update completed!')
}

/**
 * CLI interface - Run when script is executed directly
 */
const args = process.argv.slice(2)

if (args.includes('--help') || args.includes('-h')) {
    console.log(`
📝 Index Title Updater

This script automatically updates index.md files with proper titles based on directory names.

Usage:
  npm run title

Features:
  - Scans all language directories
  - Creates index.md files where needed
  - Updates frontmatter with proper titles
  - Preserves existing content when possible

Example:
  docs/src/zh/guide/ -> "Guide" (as title)
  docs/src/en/tutorial/ -> "Tutorial" (as title)
`)
    process.exit(0)
}

try {
    updateIndexTitles()
} catch (error) {
    console.error('❌ Error during execution:', error.message)
    process.exit(1)
}

// Export for programmatic use
export { updateIndexTitles } 