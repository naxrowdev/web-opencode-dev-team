import { Lock } from 'lucide-react'

import { Section } from '../components/Section'
import { copy, phases } from '../content/site'
import { roleBg } from '../lib/roles'

export function Pipeline() {
  return (
    <Section id="pipeline" title={copy.pipeline.title} lede={copy.pipeline.lede}>
      <ol className="flex flex-col border-l border-border pl-6">
        {phases.map((phase) => {
          const owner = phase.owner[0]!
          return (
            <li key={phase.name} className="relative py-5 first:pt-0">
              <div className="grid gap-x-4 gap-y-2 sm:grid-cols-12">
                <p className="font-mono text-small text-foreground sm:col-span-2">
                  {phase.name}
                </p>
                <p className="text-small text-muted-foreground sm:col-span-4">{phase.goal}</p>
                <p className="flex items-center gap-2 font-mono text-micro text-muted-foreground sm:col-span-3">
                  <span
                    className={`size-1.5 shrink-0 rounded-[2px] ${roleBg[owner]}`}
                    aria-hidden="true"
                  />
                  {phase.owner.join(', ')}
                </p>
                <p className="text-micro text-faint sm:col-span-3">{phase.artifact}</p>
              </div>
              {phase.gate ? (
                <p className="mt-4 flex items-center gap-2 border-t border-border-strong pt-4 font-mono text-micro text-muted-foreground">
                  <Lock className="size-4 shrink-0" aria-hidden="true" />
                  {phase.gate}
                </p>
              ) : null}
            </li>
          )
        })}
      </ol>
      <p className="mt-6 max-w-[62ch] text-micro text-faint">{copy.pipeline.note}</p>
    </Section>
  )
}
