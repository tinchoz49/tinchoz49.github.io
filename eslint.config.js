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
    languageOptions: {
      globals: {
        NodeJS: true,
      },
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          'custom-groups': {
            type: {
              'astro': 'astro:*',
              'node-test': 'node:test',
            },
            value: {
              'astro': 'astro:*',
              'node-test': 'node:test',
            },
          },
          'groups': [
            'type',
            'internal-type',
            ['node-test', 'builtin'],
            'astro',
            'external',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          'order': 'asc',
          'type': 'natural',
        },
      ],
      'tailwindcss/no-custom-classname': 'off',
      'ts/explicit-function-return-type': 'off',
    },
  }
)

export default config
