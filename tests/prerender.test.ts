import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

import { agents, install } from '../src/content/site'

const distPath = resolve(process.cwd(), 'dist/index.html')
const hasDist = existsSync(distPath)

describe.skipIf(!hasDist)('prerendered html', () => {
  const html = readFileSync(distPath, 'utf8')

  it('declares the language and keeps a single h1', () => {
    expect(html).toContain('<html lang="es-AR">')
    expect(html.match(/<h1/g) ?? []).toHaveLength(1)
  })

  it('contains every agent id', () => {
    for (const agent of agents) {
      expect(html).toContain(agent.id)
    }
  })

  it('contains the install commands', () => {
    for (const line of install.commands.split('\n')) {
      if (line.trim().length > 0) {
        expect(html).toContain(line.trim())
      }
    }
  })

  it('does not leave the root container empty', () => {
    expect(html).not.toContain('<div id="root"></div>')
  })
})
