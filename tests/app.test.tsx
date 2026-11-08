import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from '../src/App'

describe('page shell', () => {
  it('renders exactly one h1', () => {
    const { container } = render(<App />)
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('renders one main landmark with the skip target id', () => {
    const { container } = render(<App />)
    const mains = container.querySelectorAll('main')
    expect(mains).toHaveLength(1)
    expect(mains[0]).toHaveAttribute('id', 'contenido')
    expect(container.querySelectorAll('header')).toHaveLength(1)
    expect(container.querySelectorAll('footer')).toHaveLength(1)
  })

  it('offers a skip link to the main content', () => {
    render(<App />)
    const skipLink = screen.getByRole('link', { name: 'Saltar al contenido' })
    expect(skipLink).toHaveAttribute('href', '#contenido')
  })

  it('does not place any h2 before the h1', () => {
    const { container } = render(<App />)
    const headings = Array.from(container.querySelectorAll('h1, h2'))
    expect(headings[0]?.tagName).toBe('H1')
  })

  it('renders the ten sections of the page', () => {
    const { container } = render(<App />)
    const sections = Array.from(container.querySelectorAll('main > section'))
    expect(sections).toHaveLength(10)
    expect(sections.map((section) => section.id)).toEqual([
      'inicio',
      'problema',
      'pipeline',
      'equipo',
      'stack',
      'skills',
      'memoria',
      'seguridad',
      'instalacion',
      'cierre',
    ])
  })

  it('shows the version chip and the GitHub link in the masthead', () => {
    render(<App />)
    const header = screen.getByRole('banner')
    expect(header).toHaveTextContent('v1.0.0')
    expect(header).toHaveTextContent('stable')
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
  })
})
