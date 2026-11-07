import { Ban, UserCheck } from 'lucide-react'

import { Section } from '../components/Section'
import { copy, permissionGroups } from '../content/site'

export function Security() {
  return (
    <Section id="seguridad" title={copy.security.title} lede={copy.security.lede}>
      <div className="grid gap-6 md:grid-cols-2">
        {permissionGroups.map((group, index) => {
          const denied = index === 0
          const Icon = denied ? Ban : UserCheck
          return (
            <div
              key={group.title}
              data-permissions={denied ? 'denied' : 'approved'}
              className="border border-border"
            >
              <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
                <p className="flex items-center gap-2 text-small font-medium text-foreground">
                  <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  {group.title}
                </p>
                <span className="font-mono text-micro tabular-nums text-faint">
                  {group.items.length}
                </span>
              </div>
              <ul>
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border px-5 py-3 font-mono text-small text-muted-foreground last:border-b-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      <p className="mt-8 max-w-[52ch] text-lede text-foreground">{copy.security.closing}</p>
      <p className="mt-4 text-micro text-faint">{copy.security.note}</p>
    </Section>
  )
}
