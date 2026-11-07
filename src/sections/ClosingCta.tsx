import { Section } from '../components/Section'
import { buttonVariants } from '../components/ui/button'
import { copy, site } from '../content/site'
import { cn } from '../lib/utils'

export function ClosingCta() {
  return (
    <Section id="cierre" title={copy.closing.title} lede={copy.closing.lede} split={false}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <p className="font-mono text-[20px] break-all text-foreground">{site.repoLabel}</p>
          <div>
            <a
              href={copy.closing.cta.href}
              className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-auto')}
            >
              {copy.closing.cta.label}
            </a>
          </div>
          <ul className="grid gap-6 border-t border-border pt-6 sm:grid-cols-3">
            {copy.closing.facts.map((fact) => (
              <li key={fact.title}>
                <p className="text-small font-medium text-foreground">{fact.title}</p>
                <p className="mt-2 text-small text-muted-foreground">{fact.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <dl className="border border-border">
            {copy.closing.spec.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-b border-border px-5 py-3 last:border-b-0"
              >
                <dt className="font-mono text-micro text-faint">{row.label}</dt>
                <dd className="font-mono text-micro text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
