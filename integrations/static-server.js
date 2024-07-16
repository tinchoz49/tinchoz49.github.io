import { dev } from 'astro'

/** @returns {import('astro').AstroIntegration} */
export default function () {
  /** @type {Awaited<ReturnType<dev>>} */
  let devServer

  return {
    name: 'static-server',
    hooks: {
      'astro:build:setup': async () => {
        devServer = await dev({
          root: '.',
          logLevel: 'silent',
          vite: {
            server: {
              ws: false,
              hmr: false,
            },
          },
        })
      },
      'astro:build:done': () => devServer.stop(),
    },
  }
}
