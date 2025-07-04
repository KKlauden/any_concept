/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 自定义颜色示例
        'primary': '#3490dc',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
        "textbg":"#F6F5F3",
        "texthoverbg":"#EDEBE7",
        'zinc': {
          50: "rgb(250 250 250)",
          100: "rgb(244 244 244)",
          200: "rgb(228 228 228)",
          300: "rgb(212 212 212)",
          400: "rgb(161 161 161)",
          500: "rgb(113 113 113)",
          600: "rgb(82 82 82)",
          700: "rgb(52 52 52)",
          800: "rgb(29 29 29)",
          900: "rgb(20 20 20)",
          950: "rgb(17,17,17)",
        },
        'white': "rgb(255 255 255)",
        'black': "rgb(0 0 0)",
      },
      fontFamily: {
        // 自定义字体
        'sans': ['Geist Sans', 'system-ui', 'sans-serif'],
        'mono': ['Geist Mono', 'monospace'],
      },
      animation: {
        // 自定义动画
        'typing': 'typing 1.5s steps(30, end)',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        typing: {
          'from': { width: '0%' },
          'to': { width: '100%' }
        }
      }
    },
  },
  plugins: [],
} 