import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { App } from '../src/App'
import { copy, install } from '../src/content/site'

const BUTTON_NAME = 'Copiar los comandos de instalación al portapapeles'

function stubClipboard(writeText: ReturnType<typeof vi.fn>) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
    writable: true,
  })
}

describe('copy button', () => {
  beforeEach(() => {
    vi.useRealTimers()
  })

  it('copies the exact command block and announces it', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    stubClipboard(writeText)

    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: BUTTON_NAME }))

    await waitFor(() => expect(writeText).toHaveBeenCalledWith(install.commands))
    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(copy.install.statusCopied),
    )
  })

  it('keeps the status region mounted before any interaction', () => {
    stubClipboard(vi.fn().mockResolvedValue(undefined))
    render(<App />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('')
  })

  it('uses a native button so Enter and Space work without extra handlers', () => {
    stubClipboard(vi.fn().mockResolvedValue(undefined))
    render(<App />)
    const button = screen.getByRole('button', { name: BUTTON_NAME })
    expect(button).toHaveAttribute('type', 'button')
    expect(button.tagName).toBe('BUTTON')
  })

  it('falls back to a manual instruction when the clipboard is denied', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'))
    stubClipboard(writeText)

    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: BUTTON_NAME }))

    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(copy.install.statusError),
    )
    expect(writeText).toHaveBeenCalledWith(install.commands)
  })
})
