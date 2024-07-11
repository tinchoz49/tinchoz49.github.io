import type { DateRange } from '@/types/shared'

import { getEntry } from 'astro:content'

import { format } from 'date-fns'

const { data: settings } = await getEntry('settings', 'data')

const { locale, dateFormat, translations } = settings.i18n

const localeModule = (await import(/* @vite-ignore */`date-fns/locale/${locale.code}`))[locale.key]

const formatDateRange = ([from, to]: DateRange): string =>
  format(from, dateFormat, { locale: localeModule }).concat(' - ', to ? format(to, dateFormat, { locale: localeModule }) : translations.now)

export default formatDateRange
