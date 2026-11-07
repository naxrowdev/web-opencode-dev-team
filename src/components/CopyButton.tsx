import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

import { Button } from './ui/button'

interface CopyButtonProps {
  text: string
  label: string
  copiedLabel: string
  ariaLabel: string
  statusCopied: string
  statusError: string
}

export function CopyButton({
  text,
  label,
  copiedLabel,
  ariaLabel,
  statusCopied,
  statusError,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [])

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setMessage(statusCopied)
    } catch {
      setCopied(false)
      setMessage(statusError)
      return
    }

    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setCopied(false)
      setMessage('')
    }, 2000)
  }

  return (
    <div data-copy-button className="flex items-center gap-3">
      <Button aria-label={ariaLabel} onClick={handleClick}>
        {copied ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
        {copied ? copiedLabel : label}
      </Button>
      <span role="status" className="text-micro text-muted-foreground">
        {message}
      </span>
    </div>
  )
}
