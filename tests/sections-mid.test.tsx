import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from '../src/App'
import { agents, highlightedSkills, stack } from '../src/content/site'

describe('roster section', () => {
  it('renders one card per agent with id, role, phase and hex', () => {
    const { container } = render(<App />)
    const roster = container.querySelector('#equipo')
    expect(roster).not.toBeNull()

    const items = Array.from(roster!.querySelectorAll('ul[data-roster] > li'))
    expect(items).toHaveLength(12)

    items.forEach((item, index) => {
      const agent = agents[index]!
      expect(item).toHaveTextContent(agent.id)
      expect(item).toHaveTextContent(agent.role)
      expect(item).toHaveTextContent(agent.phase)
      expect(item).toHaveTextContent(agent.hex)
    })
  })

  it('puts the orchestrator first and labels it', () => {
    const { container } = render(<App />)
    const first = container.querySelector('#equipo ul[data-roster] > li')
    expect(first).toHaveTextContent('tech-lead')
    expect(first).toHaveTextContent('orquestador')
  })

  it('shows the counter, the legend and the link to the repo', () => {
    render(<App />)
    expect(screen.getByText('12 roles · 1 orquestador + 11 subagentes')).toBeInTheDocument()
    expect(screen.getByText('El chip marca la fase; el color, el rol.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver los 12 agentes en el repo' })).toBeInTheDocument()
  })
})

describe('stack section', () => {
  it('renders the 13 technologies as a description list', () => {
    const { container } = render(<App />)
    const list = container.querySelector('#stack dl')
    expect(list).not.toBeNull()

    const terms = Array.from(list!.querySelectorAll('dt'))
    expect(terms).toHaveLength(13)
    expect(terms[0]).toHaveTextContent(stack[0]!.tech)
    expect(terms[12]).toHaveTextContent(stack[12]!.tech)

    const definitions = Array.from(list!.querySelectorAll('dd'))
    expect(definitions).toHaveLength(13)
    expect(definitions[0]).toHaveTextContent(stack[0]!.layer)
  })

  it('states that changing the stack needs a human ADR', () => {
    const { container } = render(<App />)
    const stackSection = container.querySelector('#stack')
    expect(stackSection).toHaveTextContent(
      'Cambiar el stack requiere un ADR aprobado por una persona.',
    )
  })
})

describe('skills section', () => {
  it('renders the 8 highlighted skills with their descriptions', () => {
    const { container } = render(<App />)
    const list = container.querySelector('#skills ul[data-skills]')
    expect(list).not.toBeNull()

    const items = Array.from(list!.querySelectorAll(':scope > li'))
    expect(items).toHaveLength(8)

    items.forEach((item, index) => {
      expect(item).toHaveTextContent(highlightedSkills[index]!.name)
      expect(item).toHaveTextContent(highlightedSkills[index]!.description)
    })
  })

  it('shows the 8 of 55 counter and the link to the repo', () => {
    render(<App />)
    expect(screen.getByText('8 de 55')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver las 55 skills en el repo' })).toBeInTheDocument()
  })
})
