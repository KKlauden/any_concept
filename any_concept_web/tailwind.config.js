/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'black': 'rgb(0 0 0)',
      'white': 'rgb(255 255 255)',
      'transparent': 'transparent',
      'accent': '#FF6B00',
      'muted': '#666666',
      'foreground': '#E8E8E8',
      'background': '#000000',
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
        950: "rgb(17 17 17)",
      },
      'blue': {
        600: "#2563eb"
      },
      'gray': {
        300: "#d1d5db",
        400: "#9ca3af"
      },
    },
    fontFamily: {
      'display': ['var(--font-syne)', 'system-ui', 'sans-serif'],
      'mono': ['var(--font-jetbrains-mono)', 'SF Mono', 'Fira Code', 'monospace'],
    },
    extend: {},
  },
  plugins: [],
}
