import { Info } from 'lucide-react'

import { Section } from '../components/Section'
import { Alert, AlertDescription } from '../components/ui/alert'
import { copy, stack } from '../content/site'

export function Stack() {
  return (
    <Section id="stack" title={copy.stack.title} lede={copy.stack.lede}>
      <dl className="grid gap-x-8 sm:grid-cols-2">
        {stack.map((item) => (
          <div key={item.tech} className="border-t border-border py-3">
            <dt className="font-mono text-small text-foreground">{item.tech}</dt>
            <dd className="mt-1 text-micro text-muted-foreground">{item.layer}</dd>
          </div>
        ))}
      </dl>
      <Alert className="mt-8">
        <Info className="size-4 shrink-0" aria-hidden="true" />
        <AlertDescription>
          <span className="text-foreground">{copy.stack.callout}</span>{' '}
          {copy.stack.calloutSecondary}
        </AlertDescription>
      </Alert>
    </Section>
  )
}
