import type { ReactNode } from 'react'

import { RichText } from './RichText'

interface SectionProps {
  id: string
  title: string
  lede?: string
  aside?: ReactNode
  split?: boolean
  children: ReactNode
}

export function Section({ id, title, lede, aside, split = true, children }: SectionProps) {
  const headingId = `${id}-title`

  const heading = (
    <div className="flex max-w-[62ch] flex-col gap-5">
      <h2 id={headingId} className="text-h2 text-foreground">
        <RichText text={title} />
      </h2>
      {lede ? (
        <p className="max-w-[52ch] text-lede text-muted-foreground">
          <RichText text={lede} />
        </p>
      ) : null}
    </div>
  )

  return (
    <section id={id} aria-labelledby={headingId}>
      <div className="mx-auto w-full max-w-[var(--container-page)] border-t border-border px-[var(--page-padding)] py-[var(--space-section)]">
        {split ? (
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-4">
              {heading}
              {aside ? <div className="mt-8">{aside}</div> : null}
            </div>
            <div className="min-w-0 lg:col-span-8">{children}</div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              {heading}
              {aside ? <div className="shrink-0">{aside}</div> : null}
            </div>
            <div className="min-w-0">{children}</div>
          </div>
        )}
      </div>
    </section>
  )
}
