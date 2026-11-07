import { agents, copy, stats, supportingMessages } from '../content/site'
import { RichText } from '../components/RichText'
import { buttonVariants } from '../components/ui/button'
import { roleBg } from '../lib/roles'
import { cn } from '../lib/utils'

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="inicio-title"
      className="relative overflow-hidden border-b border-border"
    >
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[var(--container-page)] px-[var(--page-padding)] pt-12 pb-[var(--space-section)] sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <h1 id="inicio-title" className="max-w-[34ch] text-display text-foreground">
              {copy.hero.title}
            </h1>
            <p className="max-w-[52ch] text-lede text-muted-foreground">{copy.hero.lede}</p>
            <p className="max-w-[52ch] border-l-2 border-border-strong pl-4 text-small text-muted-foreground">
              <RichText text={copy.hero.glossary} />
            </p>
            <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">
              <a
                href={copy.hero.primaryCta.href}
                className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-auto')}
              >
                {copy.hero.primaryCta.label}
              </a>
              <a
                href={copy.hero.secondaryCta.href}
                className="inline-flex min-h-11 items-center justify-center text-small text-foreground underline decoration-border-strong hover:decoration-foreground sm:justify-start"
              >
                {copy.hero.secondaryCta.label}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:row-span-2">
            <div
              data-plate
              aria-hidden="true"
              className="grid grid-cols-6 gap-px border border-border bg-border lg:grid-cols-4"
            >
              {agents.map((agent, index) => (
                <div
                  key={agent.id}
                  aria-hidden="true"
                  className={cn('plate-cell h-11 lg:h-20', roleBg[agent.id])}
                  style={{ animationDelay: `${index * 30}ms` }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-7">
            <ul className="grid gap-x-6 gap-y-6 border-t border-border pt-6 sm:grid-cols-3">
              {supportingMessages.map((message) => (
                <li key={message.title} className="min-w-0">
                  <p className="text-small font-medium text-foreground">{message.title}</p>
                  <p className="mt-2 text-small text-muted-foreground">
                    <RichText text={message.body} />
                  </p>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-4 font-mono text-micro text-faint tabular-nums">
              {stats.map((stat) => (
                <li
                  key={stat.label}
                  data-stat
                  className="whitespace-nowrap border-l border-border pl-6 first:border-l-0 first:pl-0"
                >
                  <span className="text-foreground">{stat.value}</span> {stat.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
