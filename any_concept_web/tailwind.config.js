/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // 在Tailwind CSS v4中，颜色需要使用这种格式
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4100',  // 定义默认色调
        },
        secondary: {
          DEFAULT: '#ffed4a',
        },
        danger: {
          DEFAULT: '#e3342f',
        },
        textbg: {
          DEFAULT: '#F6F5F3',
        },
        texthoverbg: {
          DEFAULT: '#EDEBE7',
        },
      },
      // 保留其他扩展内容
      animation: {
        'typing': 'typing 1.5s steps(30, end)',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        typing: {
          'from': { width: '0%' },
          'to': { width: '100%' }
        }
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      }
    },
    // zinc和其他颜色可以保持原样
    colors: {
      'zinc': {
        50: "rgb(251 251 250)",
        100: "rgb(246 245 243)",
        200: "rgb(237 235 231)",
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
      'blue': {
        600: "#2563eb"
      },
      'gray': {
        300: "#d1d5db",
        400: "#9ca3af"
      },
      'transparent': 'transparent',
    },
    fontFamily: {
      'sans': ['system-ui', '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      'mono': ['var(--font-jetbrains-mono)', 'monospace'],
      'jetbrains-mono': ['var(--font-jetbrains-mono)', 'monospace'],
      'noto-serif': ['system-ui', '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      'noto-sans': ['system-ui', '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
    },
  },
  plugins: [],
} 