import { Section } from '../components/Section'
import { copy, highlightedSkills, site } from '../content/site'

export function Skills() {
  return (
    <Section
      id="skills"
      title={copy.skills.title}
      lede={copy.skills.lede}
      aside={
        <p className="font-mono text-micro tabular-nums text-faint">
          {highlightedSkills.length} de {site.skillsTotal}
        </p>
      }
    >
      <ul data-skills className="grid gap-x-8 sm:grid-cols-2">
        {highlightedSkills.map((skill) => (
          <li key={skill.name} className="border-t border-border py-3">
            <p className="font-mono text-small text-foreground">{skill.name}</p>
            <p className="mt-1 text-micro text-muted-foreground">{skill.description}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-micro text-muted-foreground">{copy.skills.note}</p>
        <a
          href={copy.skills.link.href}
          className="inline-flex min-h-8 items-center text-small text-foreground underline decoration-border-strong hover:decoration-foreground"
        >
          {copy.skills.link.label}
        </a>
      </div>
    </Section>
  )
}
