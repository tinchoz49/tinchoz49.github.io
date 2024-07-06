// 1. Importar las utilidades de `astro:content`
import { defineCollection, z } from 'astro:content'

// 2. Definir un `type` y `schema` para cada colección
const blogCollection = defineCollection({
  type: 'content', // v2.5.0 y posteriores
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
})

// 3. Exportar un único objeto `collections` para registrar tu(s) colección(es)
export const collections = {
  blog: blogCollection,
}
