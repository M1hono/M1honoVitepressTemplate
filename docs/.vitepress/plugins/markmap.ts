import MarkdownIt from 'markdown-it';

export interface MarkmapPluginOptions {
  showToolbar?: boolean;
}

/**
 * @function withMarkmap
 * @description VitePress plugin to add markmap support for ```markmap code blocks
 */
export function withMarkmap(md: MarkdownIt, options: MarkmapPluginOptions = {}) {
  const defaultFenceRender = md.renderer.rules.fence!;
  
  md.renderer.rules.fence = (tokens, idx, _options, env, self) => {
    const token = tokens[idx];
    const lang = token.info.trim() || 'text';

    if (lang === 'markmap') {
      let showToolbar = options.showToolbar !== false;
      
      const frontmatterMatch = token.content.match(/^---\s*([\s\S]*?)\s*---/);
      if (frontmatterMatch) {
        const showToolbarMatch = frontmatterMatch[1].match(/showToolbar:\s*(true|false)/i);
        if (showToolbarMatch) {
          showToolbar = showToolbarMatch[1] === 'true';
        }
      }

      return `
        <ClientOnly>
          <MarkMapView markdown="${encodeURIComponent(token.content)}" :showToolbar="${showToolbar}" />
        </ClientOnly>
      `;
    }

    return defaultFenceRender(tokens, idx, _options, env, self);
  };
}

export default withMarkmap; 