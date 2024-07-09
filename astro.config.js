import { readFile } from 'node:fs/promises'

import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import compress from 'astro-compress'
import icon from 'astro-icon'
import webmanifest from 'astro-webmanifest'

/** @type {import('./src/types/content').Settings} */
const settings = JSON.parse(await readFile('./src/content/settings/data.json'))

export default defineConfig({
  integrations: [
    tailwind(),
    icon(),
    webmanifest({
      name: settings.meta.title,
      icon: `.${settings.meta.faviconPath}`, // source for favicon & icons
      short_name: settings.meta.title,
      description: settings.meta.description,
      start_url: '/',
      theme_color: '#3367D6',
      background_color: '#3367D6',
      display: 'standalone',
    }),
    compress(),
  ],
  devToolbar: {
    enabled: false,
  },
})
