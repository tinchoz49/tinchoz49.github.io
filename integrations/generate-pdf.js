import { exec } from 'node:child_process'
import * as path from 'node:path'

import * as puppeteer from 'puppeteer'
import { pdfPage } from 'puppeteer-report'

const waitFor = ms => new Promise(resolve => setTimeout(resolve, ms))

const goTo = async (page, url) => {
  await page.goto(url, { waitUntil: 'networkidle0' })
}

const retry = async ({ promise, retries, retryTime }) => {
  try {
    return await promise()
  } catch (error) {
    if (retries <= 0) throw error

    await waitFor(retryTime)

    return await retry({ promise, retries: retries - 1, retryTime })
  }
}

/**
 * @param {import('astro').AstroIntegrationLogger} logger
 */
const generatePDF = async (logger) => {
  logger.info('Building PDF')

  const child = exec('pnpm dev')

  const browser = await puppeteer.launch({ headless: true })

  const page = await browser.newPage()

  await page.setViewport({ width: 794, height: 1122, deviceScaleFactor: 2 })

  await retry({
    promise: () => goTo(page, 'http://localhost:4321/pdf'),
    retries: 5,
    retryTime: 1000,
  })

  await pdfPage(page, {
    path: path.join(import.meta.dirname, '..', 'public', 'cv.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
  })

  await browser.close()

  child.kill()
}

export default function () {
  return /** @type {import('astro').AstroIntegration} */({
    name: 'generate:pdf',
    hooks: {
      'astro:build:start': ({ logger }) => generatePDF(logger),
    },
  })
}
