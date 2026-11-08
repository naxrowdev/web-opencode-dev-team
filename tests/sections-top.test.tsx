import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from '../src/App'
import { copy, phases } from '../src/content/site'

describe('hero', () => {
  it('shows the final h1 copy', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(
      'Tu próximo proyecto no necesita más prompts. Necesita un equipo.',
    )
  })

  it('shows the version, the stage and the four counts', () => {
    const { container } = render(<App />)
    const hero = container.querySelector('#inicio')
    expect(hero).not.toBeNull()
    expect(screen.getByRole('banner')).toHaveTextContent('v1.0.0')
    expect(screen.getByRole('banner')).toHaveTextContent('stable')

    const counts = Array.from(hero!.querySelectorAll('[data-stat]')).map((item) =>
      item.textContent?.replace(/\s+/g, ' ').trim(),
    )
    expect(counts).toEqual(['12 roles', '9 fases', '55 skills', '0 plugins externos'])
  })

  it('renders the 12-cell role plate as decorative', () => {
    const { container } = render(<App />)
    const plate = container.querySelector('[data-plate]')
    expect(plate).not.toBeNull()
    expect(plate).toHaveAttribute('aria-hidden', 'true')
    const cells = Array.from(plate!.children)
    expect(cells).toHaveLength(12)
    for (const cell of cells) {
      expect(cell).toHaveAttribute('aria-hidden', 'true')
    }
  })

  it('shows the glossary, both calls to action and the three supporting messages', () => {
    render(<App />)
    expect(screen.getByText(copy.hero.glossary)).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Abrir el repo en GitHub' }).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'Ver los comandos' })).toHaveAttribute(
      'href',
      '#instalacion',
    )
    expect(screen.getByText('Equipo, no prompt')).toBeInTheDocument()
    expect(screen.getByText('El proceso está cableado')).toBeInTheDocument()
    expect(screen.getByText('Aburrido donde importa')).toBeInTheDocument()
  })
})

describe('problem section', () => {
  it('names the three symptoms with h3 headings', () => {
    const { container } = render(<App />)
    const problem = container.querySelector('#problema')
    expect(problem).not.toBeNull()
    const headings = within(problem as HTMLElement).getAllByRole('heading', { level: 3 })
    expect(headings).toHaveLength(3)
    expect(headings.map((heading) => heading.textContent)).toEqual([
      'El contexto se pierde entre sesiones',
      'La calidad queda a criterio del momento',
      'El agente puede tocar lo irreversible',
    ])

    for (const symptom of copy.problem.symptoms) {
      expect(within(problem as HTMLElement).getByText(symptom.body)).toBeInTheDocument()
    }
  })
})

describe('pipeline section', () => {
  it('renders an ordered list with the nine phases', () => {
    const { container } = render(<App />)
    const pipeline = container.querySelector('#pipeline')
    expect(pipeline).not.toBeNull()
    const list = pipeline!.querySelector('ol')
    expect(list).not.toBeNull()
    const items = Array.from(list!.querySelectorAll(':scope > li'))
    expect(items).toHaveLength(9)
    expect(items[0]).toHaveTextContent(phases[0]!.name)
    expect(items[8]).toHaveTextContent(phases[8]!.name)
  })

  it('renders the two gates as content, not pseudo-elements', () => {
    render(<App />)
    expect(screen.getByText('Sin plan aprobado no se escribe código.')).toBeInTheDocument()
    expect(screen.getByText('Sin tests en verde no hay review.')).toBeInTheDocument()
  })
})
