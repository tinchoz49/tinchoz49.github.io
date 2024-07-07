import { defineCollection, z } from 'astro:content'

import * as links from '../utils/links.ts'
import * as skills from '../utils/skills.ts'

const lookupTypes = (types: object) => (val) => {
  const { type, ...props } = val as { type?: string }
  if (type) return { ...types[type], ...props }
  return props
}

export const LabelledValueSchema = z.object({
  label: z.string(),
  value: z.union([
    z.string(),
    z.array(z.string()),
  ]),
  url: z.string().optional(),
  fullRow: z.boolean().optional(),
})

export const TagSchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
  iconColor: z.string().optional(),
  url: z.string().optional(),
  description: z.string().optional(),
})

export const SectionConfigSchema = z.object({
  title: z.string(),
  slug: z.string(),
  icon: z.string(),
  visible: z.boolean(),
})

export const SectionSchema = z.object({
  config: SectionConfigSchema,
})

export const DownloadButtonSchema = z.object({
  label: z.string(),
  url: z.string(),
  downloadedFileName: z.string().optional(),
})

export const LinkButtonSchema = z.preprocess(lookupTypes(links), z.object({
  name: z.string(),
  icon: z.string(),
  url: z.string(),
}))

export const SkillLevelSchema = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])

export const LevelledSkillSchema = z.preprocess(lookupTypes(skills), TagSchema.extend({
  level: SkillLevelSchema,
}))

export const SkillSchema = z.preprocess(lookupTypes(skills), TagSchema)

export const SkillSetSchema = z.object({
  title: z.string(),
  skills: z.union([
    z.array(LevelledSkillSchema),
    z.array(SkillSchema),
  ]),
})

export const DateRangeSchema = z.tuple([z.date(), z.date().optional().nullable()])

export const MetaConfigSchema = z.object({
  title: z.string(),
  description: z.string(),
  faviconPath: z.string(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
})

export const I18nConfigSchema = z.object({
  locale: z.object({
    filename: z.string(),
    key: z.string(),
  }),
  dateFormat: z.string(),
  translations: z.object({
    now: z.string(),
  }),
})

export const PdfConfigSchema = z.object({
  footer: z.string().optional(),
})

export const collections = {
  main: defineCollection({
    type: 'data',
    schema: ({ image }) => SectionSchema.extend({
      image: image(),
      fullName: z.string(),
      role: z.string(),
      details: z.array(LabelledValueSchema),
      pdfDetails: z.array(LabelledValueSchema).optional(),
      description: z.string(),
      tags: z.array(TagSchema),
      action: DownloadButtonSchema,
      links: z.array(LinkButtonSchema),
    }),
  }),
  skills: defineCollection({
    type: 'data',
    schema: SectionSchema.extend({
      skillSets: z.array(SkillSetSchema),
    }),
  }),
  experience: defineCollection({
    type: 'data',
    schema: ({ image }) => SectionSchema.extend({
      jobs: z.array(z.object({
        role: z.string(),
        company: z.string(),
        image: image().optional().nullable(),
        dates: DateRangeSchema,
        description: z.string(),
        tagsList: z.object({
          title: z.string(),
          tags: z.array(TagSchema),
        }),
        links: z.array(LinkButtonSchema),
      })),
    }),
  }),
  settings: defineCollection({
    type: 'data',
    schema: z.object({
      meta: MetaConfigSchema,
      i18n: I18nConfigSchema,
      pdf: PdfConfigSchema.optional(),
    }),
  }),
  projects: defineCollection({
    type: 'data',
    schema: ({ image }) => z.object({
      config: SectionConfigSchema.merge(z.object({
        screenshots: z.object({
          icon: z.string(),
          title: z.string(),
        }),
      })),
      projects: z.array(z.object({
        name: z.string(),
        image: image().optional().nullable(),
        dates: DateRangeSchema,
        details: z.array(LabelledValueSchema),
        pdfDetails: z.array(LabelledValueSchema),
        description: z.string(),
        screenshots: z.array(z.object({
          image: image(),
          alt: z.string(),
        })).optional(),
        tagsList: z.object({
          title: z.string(),
          tags: z.array(TagSchema),
        }),
        links: z.array(LinkButtonSchema),
      })),
    }),
  }),
}
