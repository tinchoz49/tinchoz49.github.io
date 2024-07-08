import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import compress from 'astro-compress'
import icon from 'astro-icon'
// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), compress()],
  devToolbar: {
    enabled: false,
  },
})
