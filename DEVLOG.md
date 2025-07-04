# 开发日志

## 2025-07-01: 项目初始化

- 使用 `create-next-app` 创建项目
  ```bash
  npx create-next-app@latest any_concept_web --typescript --eslint --app
  ```
- 安装依赖被中断，使用 `npm install` 完成安装

## 2025-07-01: 交互式文字组件开发

### 错误处理: 客户端组件错误

**错误信息:**
```
Ecmascript file had an error
> 1 | import React, { useState, useEffect, useRef } from 'react';
    |                           ^^^^^^^^^
  2 | import { motion } from 'framer-motion';
  3 |
  4 | interface WordProps {

You're importing a component that needs `useEffect`. This React hook only works in a client component. To fix, mark the file (or its parent) with the `"use client"` directive.

 Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client
```

**解决方案:**

在组件文件顶部添加 `"use client"` 指令，将组件标记为客户端组件：

```tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// ... 组件代码
```

**原因说明:**

在Next.js 13+ 的App Router架构中，默认所有组件都是服务端组件（Server Components）。服务端组件无法使用浏览器API和React的一些钩子函数，比如`useEffect`、`useState`等。

当我们需要使用这些客户端功能时，必须通过`"use client"`指令将组件显式标记为客户端组件（Client Component）。这样Next.js就知道这个组件需要在浏览器中执行，而不是在服务器上渲染。

**注意事项:**

1. 客户端组件会增加客户端JavaScript包的大小
2. 尽可能保持组件树的叶子节点为客户端组件，以优化性能
3. 服务端组件可以导入并渲染客户端组件，但客户端组件不能导入服务端组件（可以作为子组件传递）

**相关链接:**
- [Next.js 文档: 客户端组件](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Next.js 文档: use client 指令](https://nextjs.org/docs/app/api-reference/directives/use-client) 