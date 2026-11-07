import { AlertTriangle, CircleDashed, History } from 'lucide-react'

import { Section } from '../components/Section'
import { copy } from '../content/site'

const icons = {
  'El contexto se pierde entre sesiones': History,
  'La calidad queda a criterio del momento': CircleDashed,
  'El agente puede tocar lo irreversible': AlertTriangle,
}

export function Problem() {
  return (
    <Section id="problema" title={copy.problem.title} lede={copy.problem.lede}>
      <ul className="flex flex-col">
        {copy.problem.symptoms.map((symptom) => {
          const Icon = icons[symptom.title as keyof typeof icons] ?? AlertTriangle
          return (
            <li key={symptom.title} className="border-t border-border py-6 first:border-t-0 first:pt-0">
              <div className="flex gap-4">
                <Icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="text-h3 text-foreground">{symptom.title}</h3>
                  <p className="mt-2 max-w-[62ch] text-small text-muted-foreground">
                    {symptom.body}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <p className="mt-8 max-w-[52ch] text-lede text-foreground">{copy.problem.closing}</p>
    </Section>
  )
}
