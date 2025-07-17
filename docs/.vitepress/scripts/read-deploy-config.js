#!/usr/bin/env node

/**
 * Deployment Configuration Reader for GitHub Actions
 * 
 * This script reads the VitePress project deployment configuration and outputs
 * deployment settings for GitHub Actions workflows. It supports three deployment
 * strategies: GitHub Pages, server deployment via SSH, and custom deployment.
 * 
 * The script outputs configuration variables that can be used in GitHub Actions
 * workflow steps to conditionally execute deployment strategies.
 * 
 * @author M1hono
 * @version 1.0.0
 */

const { execSync } = require('child_process');
const path = require('path');

/**
 * Main execution block with comprehensive error handling
 * Attempts to read TypeScript configuration and extract deployment settings
 */
try {
    // Register TypeScript loader for Node.js
    // This allows us to import TypeScript files directly
    require('ts-node/register');
    
    // Resolve the path to the project configuration file
    const configPath = path.resolve(__dirname, '../config/project-config.ts');
    
    // Clear require cache to ensure fresh config loading
    delete require.cache[configPath];
    
    // Import the project configuration
    const { projectConfig } = require(configPath);
    const deployment = projectConfig.deployment;
    
    // Validate deployment configuration exists
    if (!deployment || !deployment.type) {
        throw new Error('Deployment configuration is missing or invalid');
    }
    
    // Output primary deployment type for workflow conditional logic
    console.log(`deployment-type=${deployment.type}`);
    
    /**
     * Output server deployment configuration
     * Only includes non-sensitive settings (path, port, exclusions)
     * SSH credentials are managed via GitHub repository secrets
     */
    if (deployment.type === 'server') {
        const serverConfig = deployment.server;
        
        // Validate required server configuration
        if (!serverConfig.remotePath) {
            throw new Error('Server deployment requires remotePath to be configured');
        }
        
        // Output server deployment settings
        console.log(`server-remote-path=${serverConfig.remotePath}`);
        console.log(`server-port=${serverConfig.port}`);
        console.log(`server-exclude-files=${serverConfig.excludeFiles.join(',')}`);
        
        // Log information about required GitHub secrets
        console.error('INFO: Server deployment requires the following GitHub repository secrets:');
        console.error('  - SSH_HOST: Server hostname or IP address');
        console.error('  - SSH_USERNAME: SSH username for deployment');
        console.error('  - SSH_PRIVATE_KEY: SSH private key content');
    }
    
    /**
     * Output custom deployment configuration
     * Includes user-defined deployment and post-deployment commands
     */
    if (deployment.type === 'custom') {
        const customConfig = deployment.custom;
        
        // Validate custom deployment has at least a deploy command
        if (!customConfig.deployCommand) {
            console.error('WARNING: Custom deployment type selected but no deployCommand specified');
        }
        
        // Output custom deployment commands (empty strings are valid)
        console.log(`custom-deploy-command=${customConfig.deployCommand || ''}`);
        console.log(`custom-post-deploy-command=${customConfig.postDeployCommand || ''}`);
        
        // Log information about custom deployment
        if (customConfig.deployCommand) {
            console.error(`INFO: Custom deploy command: ${customConfig.deployCommand}`);
        }
        if (customConfig.postDeployCommand) {
            console.error(`INFO: Post-deploy command: ${customConfig.postDeployCommand}`);
        }
    }
    
    /**
     * GitHub Pages deployment requires no additional configuration
     * All settings are handled by the GitHub Actions workflow
     */
    if (deployment.type === 'github-pages') {
        console.error('INFO: GitHub Pages deployment selected - no additional configuration needed');
        console.error('INFO: Ensure GitHub Pages is enabled in repository settings');
    }
    
    // Log successful configuration reading
    console.error(`SUCCESS: Deployment configuration read successfully (type: ${deployment.type})`);
    
} catch (error) {
    /**
     * Comprehensive error handling with fallback behavior
     * If configuration reading fails, fall back to GitHub Pages deployment
     * This prevents workflow failures due to configuration issues
     */
    console.error('ERROR: Failed to read deployment configuration:', error.message);
    console.error('FALLBACK: Using default GitHub Pages deployment');
    
    // Output default GitHub Pages configuration
    console.log('deployment-type=github-pages');
    
    // Additional error context for debugging
    if (error.code === 'MODULE_NOT_FOUND') {
        console.error('HINT: Check if project-config.ts exists and is properly structured');
        console.error('HINT: Ensure all dependencies are installed (yarn install)');
    } else if (error.message.includes('TypeScript')) {
        console.error('HINT: TypeScript compilation may have failed');
        console.error('HINT: Check for syntax errors in project-config.ts');
    }
    
    // Don't fail the workflow - use defaults instead
    // This allows deployment to continue even with configuration issues
    process.exit(0);
} 