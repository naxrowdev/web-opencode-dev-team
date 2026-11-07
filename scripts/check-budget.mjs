import { gzipSync } from 'node:zlib'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Performance budget from docs/design/2026-11-07-landing-design.md §6.1.
 * Sizes are gzip bytes: what the browser actually downloads.
 */
const BUDGET = {
  html: 30 * 1024,
  js: 120 * 1024,
  css: 14 * 1024,
}

const dist = join(process.cwd(), 'dist')
const assets = join(dist, 'assets')

function gzipSize(path) {
  return gzipSync(readFileSync(path)).byteLength
}

const files = {
  html: [join(dist, 'index.html')],
  js: readdirSync(assets)
    .filter((name) => name.endsWith('.js'))
    .map((name) => join(assets, name)),
  css: readdirSync(assets)
    .filter((name) => name.endsWith('.css'))
    .map((name) => join(assets, name)),
}

let failed = false

for (const [kind, paths] of Object.entries(files)) {
  const total = paths.reduce((sum, path) => sum + gzipSize(path), 0)
  const budget = BUDGET[kind]
  const within = total <= budget
  failed ||= !within

  console.log(
    `${within ? 'ok  ' : 'FAIL'} ${kind.padEnd(4)} ${(total / 1024).toFixed(1).padStart(6)} KB gzip / ${(budget / 1024).toFixed(0)} KB budget`,
  )
}

if (failed) {
  console.error('[budget] performance budget exceeded')
  process.exit(1)
}

// Design §6.1: 0 KB de fuentes, 0 KB de imágenes, 0 requests a terceros.
const html = readFileSync(join(dist, 'index.html'), 'utf8')
const css = readdirSync(assets)
  .filter((name) => name.endsWith('.css'))
  .map((name) => readFileSync(join(assets, name), 'utf8'))
  .join('\n')

const thirdParty = [
  ['imágenes', /<img\b/i, html],
  ['scripts externos', /<script[^>]+src="https?:/i, html],
  ['hojas de estilo externas', /<link[^>]+href="https?:/i, html],
  ['webfonts', /@font-face/i, css],
]

for (const [label, pattern, source] of thirdParty) {
  const found = pattern.test(source)
  if (found) {
    console.error(`FAIL ${label}: se esperaba 0`)
    failed = true
  } else {
    console.log(`ok   ${label}: 0`)
  }
}

if (failed) {
  console.error('[budget] third-party assets are not allowed')
  process.exit(1)
}
