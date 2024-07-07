import type { DateRange } from '@/types/shared'

import { getEntry } from 'astro:content'
import { format } from 'date-fns'

const { data: settings } = await getEntry('settings', 'data')

const { locale, dateFormat, translations } = settings.i18n

const module = await import(/* @vite-ignore */`date-fns/locale/${locale.filename}`)

const formatDateRange = ([from, to]: DateRange): string =>
  format(from, dateFormat, { locale: module[locale.key] }).concat(' - ', to ? format(to, dateFormat, { locale: module[locale.key] }) : translations.now)

export default formatDateRange
