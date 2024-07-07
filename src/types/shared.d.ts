import type { ImageMetadata } from 'astro'
import type { z } from 'astro:content'
import type { CircleFlags, Fa6Brands, Fa6Solid, Ri, SimpleIcons } from 'iconify-icon-names'

import type {
  DateRangeSchema,
  DownloadButtonSchema,
  LabelledValueSchema,
  LinkButtonSchema,
  SectionConfigSchema,
  TagSchema,
} from '../content/config.ts'

export type SectionConfig = z.infer<typeof SectionConfigSchema>
export type LabelledValue = z.infer<typeof LabelledValueSchema>
export type Tag = z.infer<typeof TagSchema>
export type LinkButton = z.infer<typeof LinkButtonSchema>
export type DownloadButton = z.infer<typeof DownloadButtonSchema>

/**
 * Name of the icon from the iconify library.
 *
 * @see https://icon-sets.iconify.design
 */
export type IconName = Fa6Brands | Fa6Solid | SimpleIcons | CircleFlags | Ri

/**
 * - Dynamic import of the image from `src/assets` folder. Recommended as it enables image optimization.
 * - Path to the image placed in the `public` folder.
 * - URL of the image stored online.
 */
export type Photo = Promise<{ default: ImageMetadata }>

/**
 * Two date objects representing some time period.
 *
 * If the second date is `null`, it means that the period is still ongoing.
 * In such case, the translation from `config.i18n.translations.now` will be used.
 */
export type DateRange = z.infer<typeof DateRangeSchema>

export interface Section {
  /**
   * Base information about the section.
   */
  config: SectionConfig
}

export interface TagsList {
  /**
   * [PDF] Text displayed before the list of tags.
   */
  title: string

  /**
   * Tags to be displayed within the list.
   * [WEB] Tags are displayed as gray blocks. All tag properties are used.
   * [PDF] Tags are displayed comma separated list. Only the `name` property are used.
   */
  tags: Tag[]
}
