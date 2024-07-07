/* eslint perfectionist/sort-objects: "error" */

import { standard } from 'eslint-config-standard-ext'
import astroPlugin from 'eslint-plugin-astro'
import tailwind from 'eslint-plugin-tailwindcss'

const a11yConfig = astroPlugin.configs['jsx-a11y-recommended'].find(c => !!c?.plugins?.['jsx-a11y'])

const config = standard(
  {
    astro: true,
    formatters: true,
    markdown: true,
    typescript: true,
  },
  a11yConfig,
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      'tailwindcss/no-custom-classname': 'off',
      'ts/explicit-function-return-type': 'off',
    },
  },
  {
    ignores: [
      'public/',
    ],
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      globals: {
        astroHTML: true,
      },
    },
    rules: {
      'style/jsx-closing-bracket-location': 'off',
      'style/jsx-first-prop-new-line': 'off',
      'style/jsx-indent-props': 'off',
      'style/jsx-max-props-per-line': 'off',
      'style/multiline-ternary': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        NodeJS: true,
      },
    },
  }
)

export default config
