import { container } from "@mdit/plugin-container";
import type { PluginSimple } from "markdown-it";

/**
 * Chat Plugin for VitePress
 * Provides both chat panel and chat message containers
 * 
 * Usage:
 * :::: chat title="AI对话演示" max-height="400px"
 * ::: message nickname="用户" avatar-type="icon"
 * 你好，能帮我解释一下什么是Vue组合式API吗？
 * :::
 * 
 * ::: message nickname="AI助手" avatar-type="ai" location="right" avatar-link="https://example.com"
 * 当然可以！Vue组合式API是Vue 3中引入的新功能：
 * 
 * - **响应式数据**：使用`ref()`和`reactive()`
 * - **生命周期钩子**：使用`onMounted()`等
 * 
 * ```javascript
 * import { ref, onMounted } from 'vue'
 * 
 * export default {
 *   setup() {
 *     const count = ref(0)
 *     
 *     onMounted(() => {
 *       console.log('组件已挂载')
 *     })
 *     
 *     return { count }
 *   }
 * }
 * ```
 * :::
 * 
 * ::: message nickname="octocat" avatar-type="github"
 * GitHub头像会自动添加链接跳转到GitHub主页
 * :::
 * ::::
 */
export const chatPlugin: PluginSimple = (md) => {
    // Chat Panel Container
    md.use((md) =>
        container(md, {
            name: "chat",
            openRender: (tokens, index) => {
                const info: string = tokens[index].info
                    .trim()
                    .slice("chat".length)
                    .trim();
                
                // Parse attributes from info string
                const attrs: Record<string, string> = {};
                
                // Parse attributes: title="Chat Demo" max-height="400px"
                const attrRegex = /(\w+(?:-\w+)*)="([^"]*)"/g;
                let match;
                while ((match = attrRegex.exec(info)) !== null) {
                    const [, key, value] = match;
                    attrs[key] = value;
                }
                
                // Convert kebab-case to camelCase for Vue props
                const convertedAttrs: Record<string, string> = {};
                Object.entries(attrs).forEach(([key, value]) => {
                    const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
                    convertedAttrs[camelKey] = value;
                });
                
                // Build props string
                const propsStr = Object.entries(convertedAttrs)
                    .map(([key, value]) => ` ${key}="${value}"`)
                    .join('');
                
                return `<ChatPanel${propsStr}>`;
            },
            closeRender: () => `</ChatPanel>`,
        })
    );

    // Chat Message Container (nested within chat)
    md.use((md) =>
        container(md, {
            name: "message",
            openRender: (tokens, index) => {
                const info: string = tokens[index].info
                    .trim()
                    .slice("message".length)
                    .trim();
                
                // Parse attributes from info string
                const attrs: Record<string, string> = {};
                
                // Parse attributes: nickname="Alice" avatar-type="github" location="right" avatar-link="https://example.com"
                const attrRegex = /(\w+(?:-\w+)*)="([^"]*)"/g;
                let match;
                while ((match = attrRegex.exec(info)) !== null) {
                    const [, key, value] = match;
                    attrs[key] = value;
                }
                
                // Convert kebab-case to camelCase for Vue props
                const convertedAttrs: Record<string, string> = {};
                Object.entries(attrs).forEach(([key, value]) => {
                    const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
                    convertedAttrs[camelKey] = value;
                });
                
                // Build props string
                const propsStr = Object.entries(convertedAttrs)
                    .map(([key, value]) => ` ${key}="${value}"`)
                    .join('');
                
                return `<ChatMessage${propsStr}>`;
            },
            closeRender: () => `</ChatMessage>`,
        })
    );
}; 