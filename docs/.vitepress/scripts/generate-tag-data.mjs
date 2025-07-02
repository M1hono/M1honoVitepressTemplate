import { generateAllLanguageTagData } from "../utils/content/tagCollector.js";
import { getSrcPath } from "../utils/config/path-resolver.js";
import { getPaths } from "../config/project-config.js";

async function main() {
    const args = process.argv.slice(2);
    const mode = args.includes('--legacy') ? 'legacy' : 'multi';

    if (mode === 'legacy') {
        console.log("Legacy mode is deprecated. Using multi-language mode.");
    }

    const srcPath = getSrcPath();
    const paths = getPaths();
    const outputDir = paths.public;
    
    generateAllLanguageTagData(srcPath, outputDir);
}

main().catch(console.error);
