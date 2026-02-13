/**
 * Shader Effect Plugin for Markdown
 * Provides shader syntax highlighting and rendering for code blocks
 */
import type MarkdownIt from 'markdown-it';

/**
 * Shader effect markdown plugin
 */
export function shaderEffect(md: MarkdownIt): void {
    // Add shader-specific rendering rules
    md.renderer.rules.code_block = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const lang = token.info?.trim() || '';

        if (['glsl', 'shader', 'hlsl', 'wgsl'].includes(lang.toLowerCase())) {
            // Add shader-specific class for styling
            return `<pre class="shader-code" data-lang="${lang}"><code>${self.renderToken(tokens, idx, options)}</code></pre>`;
        }

        return self.renderToken(tokens, idx, options);
    };

    // Add shader-specific inline code rendering
    md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const lang = token.info?.trim() || '';

        if (['glsl', 'shader', 'hlsl', 'wgsl'].includes(lang.toLowerCase())) {
            return `<code class="shader-inline" data-lang="${lang}">${token.content}</code>`;
        }

        return self.renderToken(tokens, idx, options);
    };
}

export default shaderEffect;
