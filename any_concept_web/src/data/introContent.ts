import type { ContentItem } from '@/components/InteractiveText';

export const introContent: ContentItem = {
  type: 'paragraph',
  content: [
    { type: 'text', text: "HELLO, I'M KLAUDEN.\nI CREATE DIGITAL PRODUCTS. I AM A " },
    {
      type: 'interactive',
      id: '1',
      trigger: 'FULL-STACK DESIGNER / 全栈设计师',
      icon: 'code',
      expanded: [
        { type: 'text', text: ".\nI LOVE BUILDING PRODUCTS FROM 0 TO 1, INCLUDING " },
        {
          type: 'interactive', id: '1.1',
          trigger: 'UI/UX DESIGN / 界面设计',
          icon: 'pen',
          expanded: [
            { type: 'text', text: " — CRAFTING INTERFACES IN FIGMA, WITH " },
            {
              type: 'interactive', id: '1.1.1',
              trigger: 'IMAGE PROCESSING / 图像处理',
              icon: 'wand',
              expanded: [{ type: 'text', text: " — PHOTOSHOP FOR VISUAL TREATMENT" }]
            },
            { type: 'text', text: ". CHECK OUT MY " },
            { type: 'link', text: 'VISUAL WORK', icon: 'eye', url: '/craft' }
          ]
        },
        { type: 'text', text: ", " },
        {
          type: 'interactive', id: '1.2',
          trigger: 'FRONTEND DEV / 前端开发',
          icon: 'window',
          expanded: [
            { type: 'text', text: " — TURNING DESIGNS INTO INTERACTIVE UIs WITH " },
            {
              type: 'interactive', id: '1.2.1',
              trigger: 'REACT ECOSYSTEM',
              icon: 'network',
              expanded: [{ type: 'text', text: " — REACT, NEXT.JS, TYPESCRIPT, TAILWINDCSS" }]
            },
            { type: 'text', text: " AND " },
            {
              type: 'interactive', id: '1.2.2',
              trigger: 'CROSS-PLATFORM / 跨端',
              icon: 'device',
              expanded: [{ type: 'text', text: " — TARO FOR MULTI-PLATFORM APPS" }]
            }
          ]
        },
        { type: 'text', text: ", AND " },
        {
          type: 'interactive', id: '1.3',
          trigger: 'BACKEND DEV / 后端开发',
          icon: 'server',
          expanded: [
            { type: 'text', text: " — BUILDING ARCHITECTURES WITH " },
            {
              type: 'interactive', id: '1.3.1',
              trigger: 'PYTHON STACK',
              icon: 'boxes',
              expanded: [{ type: 'text', text: " — FASTAPI, POSTGRESQL, DOCKER" }]
            }
          ]
        },
        { type: 'text', text: ".\nSEE MY " },
        { type: 'link', text: 'PROJECTS', icon: 'arrow', url: '/projects' },
        { type: 'text', text: ". I'M ALSO INTO " },
        {
          type: 'interactive', id: '1.4',
          trigger: 'AI INTEGRATION / AI 应用',
          icon: 'spark',
          expanded: [{ type: 'text', text: " — LANGCHAIN, AI-POWERED SYSTEMS" }]
        },
        { type: 'text', text: " AND BRING " },
        {
          type: 'interactive', id: '1.5',
          trigger: 'PRODUCT THINKING / 产品思维',
          icon: 'bulb',
          expanded: [{ type: 'text', text: " — UX-DRIVEN DESIGN FROM MY INDUSTRIAL DESIGN BACKGROUND" }]
        }
      ]
    },
    { type: 'text', text: ".\nBASED IN " },
    {
      type: 'interactive',
      id: '2',
      trigger: 'SHANGHAI, CHINA / 上海',
      icon: 'pin',
      expanded: [
        { type: 'text', text: " — BORN AND LIVING IN " },
        { type: 'image', src: '/images/interactiveText/shanghai.png', alt: 'Shanghai', width: 86, height: 34 }
      ]
    },
    { type: 'text', text: ".\nIF YOU HAVE " },
    {
      type: 'interactive',
      id: '3',
      trigger: 'COLLABORATION / 合作',
      icon: 'handshake',
      expanded: [
        { type: 'text', text: " NEEDS — BRAND DESIGN, WEB DEV, OR PRODUCT INNOVATION" }
      ]
    },
    { type: 'text', text: " NEEDS, REACH OUT VIA " },
    {
      type: 'interactive',
      id: '4',
      trigger: 'EMAIL / 邮箱',
      icon: 'mail',
      expanded: [
        { type: 'text', text: " — KKLAUDEN@GMAIL.COM" }
      ]
    },
    { type: 'text', text: ".\nLET'S CREATE SOMETHING MEANINGFUL." }
  ]
};
