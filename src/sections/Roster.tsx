import { Section } from '../components/Section'
import { agents, copy } from '../content/site'
import { roleBg, roleBorderTop, roleChipText } from '../lib/roles'
import { cn } from '../lib/utils'

export function Roster() {
  return (
    <Section
      id="equipo"
      title={copy.roster.title}
      lede={copy.roster.lede}
      split={false}
      aside={
        <p className="font-mono text-micro tabular-nums text-faint">{copy.roster.counter}</p>
      }
    >
      <ul data-roster className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {agents.map((agent) => (
          <li
            key={agent.id}
            className={cn(
              'flex min-h-[120px] flex-col gap-3 border border-border border-t-4 p-5 lg:min-h-[152px]',
              roleBorderTop[agent.id],
              agent.orchestrator && 'bg-surface-raised',
            )}
          >
            <div className="flex items-baseline gap-3">
              <p className="font-mono text-small font-semibold text-foreground">{agent.id}</p>
              {agent.orchestrator ? (
                <p className="font-mono text-micro text-faint">orquestador</p>
              ) : null}
            </div>
            <p className="text-small text-muted-foreground">{agent.role}</p>
            <div className="mt-auto flex items-center justify-between gap-3">
              <span
                className={cn(
                  'inline-flex items-center rounded-sm px-2 py-0.5 text-micro font-semibold',
                  roleBg[agent.id],
                  roleChipText[agent.id],
                )}
              >
                {agent.phase}
              </span>
              <span className="font-mono text-micro text-faint">{agent.hex}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-micro text-muted-foreground">{copy.roster.legend}</p>
        <a
          href={copy.roster.link.href}
          className="inline-flex min-h-8 items-center text-small text-foreground underline decoration-border-strong hover:decoration-foreground"
        >
          {copy.roster.link.label}
        </a>
      </div>
    </Section>
  )
}
