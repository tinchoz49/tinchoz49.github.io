import { defineCollection, z } from 'astro:content'

import * as links from '../utils/links'
import * as skills from '../utils/skills'

const lookupTypes = (val: { type?: string }) => {
  const { type, ...props } = val
  if (type) {
    if (links[type]) return { ...links[type], ...props }
    if (skills[type]) return { ...skills[type], ...props }
  }
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

export const LinkButtonSchema = z.preprocess(lookupTypes, z.object({
  name: z.string(),
  icon: z.string(),
  url: z.string(),
}))

export const SkillLevelSchema = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])

export const LevelledSkillSchema = z.preprocess(lookupTypes, TagSchema.extend({
  level: SkillLevelSchema,
}))

export const SkillSchema = z.preprocess(lookupTypes, TagSchema)

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
  ogImage: z.string(),
  ogImageTitle: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
})

export const I18nConfigSchema = z.object({
  locale: z.object({
    code: z.string(),
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

export const TagsListSchema = z.object({
  title: z.string(),
  tags: z.array(z.preprocess(lookupTypes, TagSchema)),
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
      tags: z.array(z.preprocess(lookupTypes, TagSchema)),
      action: DownloadButtonSchema,
      links: z.array(LinkButtonSchema),
      languages: z.array(z.preprocess(lookupTypes, TagSchema)),
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
        tagsList: TagsListSchema,
        links: z.array(LinkButtonSchema),
      })),
    }),
  }),
  settings: defineCollection({
    type: 'data',
    schema: z.object({
      meta: MetaConfigSchema,
      i18n: I18nConfigSchema,
      schema: z.object({
        name: z.string(),
        jobTitle: z.string(),
        knowsAbout: z.array(z.string()),
        image: z.string(),
      }),
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
        tagsList: TagsListSchema,
        links: z.array(LinkButtonSchema),
      })),
    }),
  }),
  education: defineCollection({
    type: 'data',
    schema: ({ image }) => SectionSchema.extend({
      diplomas: z.array(z.object({
        title: z.string(),
        institution: z.string(),
        image: image().optional().nullable(),
        dates: DateRangeSchema,
        description: z.string(),
        links: z.array(LinkButtonSchema),
      })),
    }),
  }),
  testimonials: defineCollection({
    type: 'data',
    schema: ({ image }) => SectionSchema.extend({
      testimonials: z.array(z.object({
        image: image(),
        author: z.string(),
        relation: z.string(),
        content: z.string(),
        links: z.array(LinkButtonSchema),
      })),
    }),
  }),
  feed: defineCollection({
    type: 'data',
    schema: ({ image }) => SectionSchema.extend({
      books: z.object({
        title: z.string(),
        data: z.array(z.object({
          title: z.string(),
          image: image(),
          author: z.string(),
          url: z.string(),
        })),
      }).optional(),
      people: z.object({
        title: z.string(),
        data: z.array(z.object({
          name: z.string(),
          image: image(),
          url: z.string(),
        })),
      }).optional(),
      videos: z.object({
        title: z.string(),
        data: z.array(z.object({
          title: z.string(),
          image: image(),
          url: z.string(),
        })),
      }).optional(),
      medias: z.object({
        title: z.string(),
        data: z.array(z.object({
          title: z.string(),
          type: z.string(),
          image: image(),
          url: z.string(),
        })),
      }).optional(),
    }),
  }),
}
