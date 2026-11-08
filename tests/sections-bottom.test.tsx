import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from '../src/App'
import { copy, install, permissionGroups, site } from '../src/content/site'

describe('memory section', () => {
  it('names the files, the skill and the token mechanisms', () => {
    const { container } = render(<App />)
    const memory = container.querySelector('#memoria')
    expect(memory).not.toBeNull()

    expect(within(memory as HTMLElement).getByText('docs/context/STATE.md')).toBeInTheDocument()
    expect(
      within(memory as HTMLElement).getByText('docs/context/decisions-log.md'),
    ).toBeInTheDocument()
    expect(within(memory as HTMLElement).getByText('skill: code-simplification')).toBeInTheDocument()
    expect(within(memory as HTMLElement).getByText('tool_output + compaction')).toBeInTheDocument()
    expect(within(memory as HTMLElement).getByText(/1000 líneas/)).toBeInTheDocument()
    expect(within(memory as HTMLElement).getByText(/32 KB/)).toBeInTheDocument()
    expect(within(memory as HTMLElement).getByText(/25k tokens/)).toBeInTheDocument()
  })

  it('shows the session flow', () => {
    render(<App />)
    expect(screen.getByText('sesión 1 → STATE.md → sesión 2')).toBeInTheDocument()
  })
})

describe('security section', () => {
  it('lists the six denied commands and the five approvals', () => {
    const { container } = render(<App />)
    const security = container.querySelector('#seguridad')
    expect(security).not.toBeNull()

    const denied = security!.querySelector('[data-permissions="denied"]')
    const approved = security!.querySelector('[data-permissions="approved"]')
    expect(denied).not.toBeNull()
    expect(approved).not.toBeNull()

    const deniedItems = Array.from(denied!.querySelectorAll('li')).map((item) =>
      item.textContent?.trim(),
    )
    expect(deniedItems).toEqual(permissionGroups[0]!.items)

    const approvedItems = Array.from(approved!.querySelectorAll('li')).map((item) =>
      item.textContent?.trim(),
    )
    expect(approvedItems).toEqual(permissionGroups[1]!.items)
    expect(approvedItems).toContain('.env (lectura o escritura)')
  })

  it('states that the human runs what cannot be undone', () => {
    const { container } = render(<App />)
    expect(container.querySelector('#seguridad')).toHaveTextContent(copy.security.closing)
  })
})

describe('install section', () => {
  it('renders the exact command block', () => {
    const { container } = render(<App />)
    const code = container.querySelector('#instalacion pre code')
    expect(code).not.toBeNull()
    expect(code!.textContent).toBe(install.commands)
    expect(code!.textContent).toContain('curl -fsSL https://raw.githubusercontent.com/naxrowdev/opencode-dev-team/main/kit/install.sh | sh')
    expect(code!.textContent).toContain('--ref v1.0.0')
  })

  it('offers the copy button and a no-script fallback', () => {
    const { container } = render(<App />)
    expect(
      screen.getByRole('button', { name: 'Copiar los comandos de instalación al portapapeles' }),
    ).toBeInTheDocument()

    const fallback = container.querySelector('#instalacion noscript')
    expect(fallback).not.toBeNull()
    expect(fallback!.textContent).toContain('Sin JavaScript')
  })

  it('lists the four install notes', () => {
    const { container } = render(<App />)
    const notes = Array.from(container.querySelectorAll('#instalacion ul[data-notes] > li'))
    expect(notes).toHaveLength(4)
  })
})

describe('closing section', () => {
  it('shows the repo url, the call to action and the three negations', () => {
    const { container } = render(<App />)
    const closing = container.querySelector('#cierre')
    expect(closing).not.toBeNull()
    expect(closing).toHaveTextContent(site.repoLabel)

    const ctas = within(closing as HTMLElement).getAllByRole('link', {
      name: 'Abrir el repo en GitHub',
    })
    expect(ctas).toHaveLength(1)
    expect(ctas[0]).toHaveAttribute('href', site.repoUrl)

    for (const fact of copy.closing.facts) {
      expect(closing).toHaveTextContent(fact.title)
      expect(closing).toHaveTextContent(fact.body)
    }
  })

  it('shows the technical sheet with the version and the stage', () => {
    const { container } = render(<App />)
    const closing = container.querySelector('#cierre')
    expect(closing).toHaveTextContent('v1.0.0')
    expect(closing).toHaveTextContent('stable')
  })
})
