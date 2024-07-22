/* eslint perfectionist/sort-objects: "error" */

import { standard } from 'eslint-config-standard-ext'
import tailwind from 'eslint-plugin-tailwindcss'

const config = standard(
  {
    astro: {
      config: 'jsx-a11y-recommended',
    },
    formatters: true,
    markdown: true,
    typescript: true,
  },
  ...tailwind.configs['flat/recommended'],
  {
    ignores: [
      'public/',
    ],
  },
  {
    files: ['**/*.astro', '**/*.ts', '**/*.tsx'],
    rules: {
      'no-undef': 'off',
      'tailwindcss/no-custom-classname': 'off',
    },
  }
)

export default config
