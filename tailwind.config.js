import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      primary: colors.indigo,
      gray: colors.gray,
    },
    extend: {
      spacing: {
        18: '4.5rem',
      },
      keyframes: {
        show: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        show: 'show 225ms ease-in-out',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
