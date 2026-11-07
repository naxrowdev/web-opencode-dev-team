import { copy, site } from '../content/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-[var(--container-page)] flex-col gap-4 px-[var(--page-padding)] py-10">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <p className="flex items-baseline gap-2 font-mono text-small tabular-nums">
            <span className="text-foreground">{copy.hero.wordmark}</span>
            <span className="text-faint">{site.version}</span>
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {copy.footer.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex min-h-8 items-center text-small text-muted-foreground underline decoration-border-strong hover:text-foreground hover:decoration-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-micro text-faint">{copy.footer.legal}</p>
        <p className="text-micro text-faint">{copy.footer.madeWith}</p>
      </div>
    </footer>
  )
}
