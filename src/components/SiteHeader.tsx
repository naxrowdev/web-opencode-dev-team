import { copy, site } from '../content/site'

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex min-h-16 w-full max-w-[var(--container-page)] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-[var(--page-padding)] py-3">
        <p className="font-mono text-small font-medium text-foreground">{copy.hero.wordmark}</p>
        <div className="flex items-center gap-4">
          <p className="flex items-baseline gap-2 font-mono text-micro tabular-nums">
            <span className="text-foreground">{site.version}</span>
            <span className="text-faint">{site.stage}</span>
          </p>
          <a
            href={site.repoUrl}
            className="inline-flex min-h-11 items-center text-small text-foreground underline decoration-border-strong hover:decoration-foreground"
          >
            {copy.hero.githubLabel}
          </a>
        </div>
      </div>
    </header>
  )
}
