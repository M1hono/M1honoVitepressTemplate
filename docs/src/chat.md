# Chat 组件测试文档

## 基础组件测试

### 1. 基础 ChatMessage

:::: chat title="基础消息测试"
::: message nickname="Alice"
这是一条基础消息
:::

::: message nickname="Bob"
这是另一条基础消息
:::
::::

### 2. 左右对齐测试

:::: chat title="左右对齐测试"
::: message nickname="User" location="right" color="#4ecdc4"
这是右侧的用户消息
:::

::: message nickname="Assistant" location="left" color="#45b7d1"
这是左侧的助手回复
:::

::: message nickname="User" location="right" color="#4ecdc4"
气泡尖角测试：这条消息应该有指向右侧的尖角
:::
::::

## 头像类型测试

### 3. 文字头像测试

:::: chat title="文字头像测试"
::: message nickname="Alice" avatar-type="text" color="#cc0066"
文字头像 - Alice
:::

::: message nickname="Bob" avatar-type="text" color="#00994d"
文字头像 - Bob
:::

::: message nickname="Carol" avatar-type="text" color="#1e90ff"
文字头像 - Carol
:::
::::

### 4. 图标头像测试

:::: chat title="图标头像测试"
::: message nickname="user" avatar-type="icon" color="#4ecdc4"
用户图标 👤
:::

::: message nickname="bot" avatar-type="icon" color="#45b7d1"
机器人图标 🤖
:::

::: message nickname="system" avatar-type="icon" color="#ff6b6b"
系统图标 ⚙️
:::

::: message nickname="admin" avatar-type="icon" color="#ffeaa7"
管理员图标 👑
:::
::::

### 5. GitHub 头像测试（自动链接）

:::: chat title="GitHub 头像测试"
::: message nickname="octocat" avatar-type="github"
GitHub Octocat 用户（点击头像跳转到GitHub）
:::

::: message nickname="torvalds" avatar-type="github"
Linus Torvalds（点击头像跳转到GitHub）
:::

::: message nickname="github" avatar-type="github"
GitHub 官方账号（点击头像跳转到GitHub）
:::
::::

### 6. 自定义头像测试

:::: chat title="自定义头像测试"
::: message nickname="Custom1" avatar-type="custom" avatar="https://github.com/github.png"
自定义头像 1
:::

::: message nickname="Custom2" avatar-type="custom" avatar="https://avatars.githubusercontent.com/u/1?v=4"
自定义头像 2
:::
::::

### 7. 自定义头像链接测试

:::: chat title="自定义头像链接测试"
::: message nickname="Developer" avatar-type="custom" avatar="https://github.com/github.png" avatar-link="https://github.com"
自定义头像 + 自定义链接（点击头像跳转到指定URL）
:::

::: message nickname="Website" avatar-type="text" color="#ff6b6b" avatar-link="https://vitepress.dev"
文字头像 + 网站链接（点击头像跳转到VitePress官网）
:::

::: message nickname="ai" avatar-type="icon" color="#45b7d1" avatar-link="https://openai.com"
图标头像 + 自定义链接（点击头像跳转到OpenAI）
:::
::::

### 8. 预设头像测试

:::: chat title="预设头像测试"
::: message nickname="Koishi" avatar-type="avatarmap"
Koishi 预设头像
:::

::: message nickname="System" avatar-type="avatarmap"
System 预设头像
:::

::: message nickname="Admin" avatar-type="avatarmap"
Admin 预设头像
:::
::::

### 9. 头像加载失败回退测试

:::: chat title="头像加载失败测试"
::: message nickname="BrokenAvatar" avatar-type="custom" avatar="https://broken-url.com/avatar.jpg"
这个头像链接是错误的，应该显示回退的文字头像
:::

::: message nickname="GitHub404" avatar-type="github" 
这是一个不存在的GitHub用户，会自动回退到文字头像
:::
::::

## 对话场景测试

### 10. 完整对话测试

:::: chat title="AI 助手对话"
::: message nickname="User" location="right" color="#4ecdc4"
你好！能帮我解释一下量子计算吗？
:::

::: message nickname="AI Assistant" avatar-type="icon" color="#45b7d1"
当然可以！量子计算是一种利用量子力学现象进行计算的技术。与传统计算机使用0和1的二进制位不同，量子计算机使用量子比特（qubit），它可以同时处于0和1的叠加状态。
:::

::: message nickname="User" location="right" color="#4ecdc4"
这听起来很复杂，能给个更简单的例子吗？
:::

::: message nickname="AI Assistant" avatar-type="icon" color="#45b7d1"
想象一个迷宫，传统计算机只能一条路一条路地尝试，而量子计算机可以同时尝试所有可能的路径。这就是量子并行性的威力！
:::
::::

### 11. 代码讨论测试

:::: chat title="代码评审讨论"
::: message nickname="developer" avatar-type="github"
我提交了一个新的 PR，请帮忙 review 一下：

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```
:::

::: message nickname="reviewer" avatar-type="github" location="left"
代码逻辑正确，但性能可以优化。建议使用动态规划：

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
```
:::
::::

### 12. 客服对话测试

:::: chat title="客服对话"
::: message nickname="Customer" location="right" color="#4ecdc4"
我的账户无法登录，一直显示密码错误
:::

::: message nickname="support" avatar-type="icon" color="#45b7d1"
很抱歉听到您遇到这个问题。让我帮您解决：

1. 请先确认用户名是否正确
2. 尝试重置密码
3. 清除浏览器缓存

如果问题仍然存在，请告诉我具体的错误信息。
:::

::: message nickname="Customer" location="right" color="#4ecdc4"
重置密码后可以正常登录了，谢谢！
:::
::::

## 滚动和布局测试

### 13. 长对话滚动测试

:::: chat title="长对话滚动测试" max-height="300px"
::: message nickname="User1" location="right"
消息 1
:::
::: message nickname="User2" location="left"
消息 2
:::
::: message nickname="User1" location="right"
消息 3
:::
::: message nickname="User2" location="left"
消息 4
:::
::: message nickname="User1" location="right"
消息 5
:::
::: message nickname="User2" location="left"
消息 6
:::
::: message nickname="User1" location="right"
消息 7
:::
::: message nickname="User2" location="left"
消息 8
:::
::: message nickname="User1" location="right"
消息 9
:::
::: message nickname="User2" location="left"
消息 10
:::
::: message nickname="User1" location="right"
消息 11
:::
::: message nickname="User2" location="left"
消息 12
:::
::::

### 14. 无标题面板测试

:::: chat
::: message nickname="Anonymous" color="#999"
这是一个没有标题的聊天面板
:::
::::

## 响应式测试

### 15. 长消息测试

:::: chat title="长消息测试"
::: message nickname="User" location="right"
这是一条非常长的消息，用来测试消息框的自动换行和最大宽度限制。这条消息应该能够正确地换行显示，并且不会超出容器的边界。同时，气泡尖角应该保持在正确的位置。
:::

::: message nickname="Assistant" avatar-type="icon" color="#45b7d1"
这里是助手的长回复。我会详细地回答您的问题，并提供尽可能多的信息。这个回复也很长，用来测试左侧消息的显示效果。文字应该能够正确换行，消息框应该有合适的宽度限制，气泡尖角应该指向正确的方向。
:::
::::

### 16. Markdown 内容测试

:::: chat title="Markdown 内容测试"
::: message nickname="Developer" avatar-type="github"
这里是一些 **粗体文字** 和 *斜体文字*。

还有一些 `代码片段`。

> 这是一个引用块
> 可以包含多行内容

以及一个代码块：

```python
def hello_world():
    print("Hello, World!")
```
:::
::::

## 错误处理测试

### 17. 空昵称测试

:::: chat title="空昵称测试"
::: message
这是一条没有昵称的消息
:::
::::

## 性能测试

### 18. 快速连续消息测试

:::: chat title="快速连续消息测试"
::: message nickname="FastUser" location="right"
消息 1
:::
::: message nickname="FastUser" location="right"
消息 2
:::
::: message nickname="FastUser" location="right"
消息 3
:::
::: message nickname="Bot" avatar-type="icon" color="#45b7d1"
收到消息 1
:::

::: message nickname="Bot" avatar-type="icon" color="#45b7d1"
收到消息 2
:::

::: message nickname="Bot" avatar-type="icon" color="#45b7d1"
收到消息 3
:::
::::

---

## 组件 API 参考

### ChatMessage Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| nickname | string | - | 用户昵称 |
| color | string | auto | 头像背景颜色 |
| avatar | string | - | 自定义头像URL |
| avatarType | 'text' \| 'github' \| 'icon' \| 'custom' \| 'avatarmap' | 'text' | 头像类型 |
| avatarLink | string | - | 头像点击链接，GitHub类型会自动生成 |
| location | 'left' \| 'right' | 'left' | 消息位置 |

### ChatPanel Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| title | string | - | 面板标题 |
| maxHeight | number \| string | - | 最大高度 |
| autoScroll | boolean | true | 自动滚动到底部 |

### 新功能特性

#### 1. 头像链接功能
- 自定义链接：使用 `avatar-link` 属性设置点击头像的跳转链接
- 自动GitHub链接：当 `avatar-type="github"` 时，自动为头像添加对应的GitHub主页链接
- 悬停效果：鼠标悬停时头像会有轻微放大效果

#### 2. 头像加载失败回退
- 图片加载失败时自动回退到文字头像
- 不再显示裂图，提供更好的用户体验

#### 3. 更紧凑的布局
- 减小了头像尺寸和间距
- 优化了消息气泡的大小和内边距
- 更适合文档展示的紧凑风格

### 使用示例

```markdown
:::: chat title="示例对话" max-height="400px"
::: message nickname="用户" location="right" color="#4ecdc4"
你好！
:::

::: message nickname="助手" avatar-type="icon" nickname="ai"
你好！有什么可以帮助你的吗？
:::

::: message nickname="octocat" avatar-type="github"
GitHub头像会自动添加链接跳转
:::

::: message nickname="开发者" avatar-type="custom" avatar="https://example.com/avatar.jpg" avatar-link="https://example.com"
自定义头像和链接
:::
::::
```

这个测试文档涵盖了所有功能，包括新增的头像链接和图片加载失败回退机制。