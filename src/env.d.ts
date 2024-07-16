/* eslint-disable no-unused-vars */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="astro/astro-jsx" />
/// <reference types="react" />

declare module 'eslint-plugin-tailwindcss'

declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    tw?: string
  }
}

declare namespace React {
  interface HTMLAttributes {
    tw?: string
  }
}
