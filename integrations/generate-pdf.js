import * as path from 'node:path'

import * as puppeteer from 'puppeteer'
import { pdfPage } from 'puppeteer-report'

/**
 * @param {import('astro').AstroIntegrationLogger} logger
 */
const generatePDF = async (logger) => {
  logger.info('Building PDF')

  const browser = await puppeteer.launch({ headless: true })

  const page = await browser.newPage()

  await page.setViewport({ width: 794, height: 1122, deviceScaleFactor: 2 })

  await page.goto('http://localhost:4321/pdf', { waitUntil: 'networkidle0' })

  await pdfPage(page, {
    path: path.join(process.cwd(), 'dist', 'resume.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
  })

  await browser.close()

  logger.info('PDF done!')
}

/** @returns {import('astro').AstroIntegration} */
export default function () {
  return {
    name: 'generate:pdf',
    hooks: {
      'astro:build:done': async ({ logger }) => {
        await generatePDF(logger)
      },
    },
  }
}
