import { Section } from '../components/Section'
import { CopyButton } from '../components/CopyButton'
import { RichText } from '../components/RichText'
import { copy, install } from '../content/site'

export function Install() {
  return (
    <Section id="instalacion" title={copy.install.title} lede={copy.install.lede}>
      <p className="max-w-[52ch] text-small text-muted-foreground">
        {copy.install.prerequisites}
      </p>

      <noscript className="text-small text-muted-foreground">
        {copy.install.noscript}
      </noscript>

      <div className="mt-6 border border-border-strong bg-surface">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
          <span className="font-mono text-micro text-faint">bash</span>
          <CopyButton
            text={install.commands}
            label={copy.install.copyLabel}
            copiedLabel={copy.install.copiedLabel}
            ariaLabel={copy.install.copyAriaLabel}
            statusCopied={copy.install.statusCopied}
            statusError={copy.install.statusError}
          />
        </div>
        <pre
          className="overflow-x-auto px-5 py-5 text-code text-foreground"
          aria-label="Comandos de instalación"
        >
          <code>{install.commands}</code>
        </pre>
      </div>

      <ul data-notes className="mt-6 flex flex-col gap-2">
        {install.notes.map((note) => (
          <li key={note} className="max-w-[62ch] text-micro text-muted-foreground">
            <RichText text={note} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
