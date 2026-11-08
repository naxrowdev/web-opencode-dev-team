import { describe, expect, it } from 'vitest'

import {
  agents,
  copy,
  highlightedSkills,
  install,
  memoryBlocks,
  permissionGroups,
  phases,
  site,
  stack,
  stats,
  supportingMessages,
} from '../src/content/site'

const ROLE_IDS = [
  'tech-lead',
  'product-owner',
  'business-analyst',
  'architect',
  'ux-designer',
  'backend-dev',
  'frontend-dev',
  'qa-engineer',
  'code-reviewer',
  'security-engineer',
  'devops-sre',
  'tech-writer',
]

describe('site metadata', () => {
  it('declares the kit version, stage and skill total', () => {
    expect(site.version).toBe('v1.0.0')
    expect(site.stage).toBe('stable')
    expect(site.skillsTotal).toBe(55)
    expect(site.repoUrl).toBe('https://github.com/naxrowdev/opencode-dev-team')
    expect(site.repoLabel).toBe('github.com/naxrowdev/opencode-dev-team')
  })

  it('exposes the four hero counts', () => {
    expect(stats).toHaveLength(4)
    expect(stats.map((stat) => `${stat.value} ${stat.label}`)).toEqual([
      '12 roles',
      '9 fases',
      '55 skills',
      '0 plugins externos',
    ])
  })
})

describe('agents', () => {
  it('contains the 12 roles of the kit', () => {
    expect(agents).toHaveLength(12)
    expect(agents.map((agent) => agent.id).sort()).toEqual([...ROLE_IDS].sort())
  })

  it('has unique ids and unique uppercase hex colors', () => {
    expect(new Set(agents.map((agent) => agent.id)).size).toBe(12)
    expect(new Set(agents.map((agent) => agent.hex)).size).toBe(12)
    for (const agent of agents) {
      expect(agent.hex).toMatch(/^#[0-9A-F]{6}$/)
    }
  })

  it('has exactly one orchestrator, tech-lead, in first position', () => {
    const orchestrators = agents.filter((agent) => agent.orchestrator)
    expect(orchestrators).toHaveLength(1)
    expect(orchestrators[0]?.id).toBe('tech-lead')
    expect(agents[0]?.id).toBe('tech-lead')
  })

  it('assigns every agent a role description and a phase', () => {
    for (const agent of agents) {
      expect(agent.role.length).toBeGreaterThan(10)
      expect(agent.phase.length).toBeGreaterThan(0)
    }
  })
})

describe('phases', () => {
  it('contains the nine pipeline phases in order', () => {
    expect(phases).toHaveLength(9)
    expect(phases.map((phase) => phase.name)).toEqual([
      'Descubrimiento',
      'Análisis',
      'Diseño',
      'UX',
      'Plan',
      'Implementación',
      'Verificación',
      'Revisión',
      'Entrega',
    ])
  })

  it('only references agents that exist', () => {
    for (const phase of phases) {
      expect(phase.owner.length).toBeGreaterThan(0)
      for (const owner of phase.owner) {
        expect(ROLE_IDS).toContain(owner)
      }
      expect(phase.goal.length).toBeGreaterThan(0)
      expect(phase.artifact.length).toBeGreaterThan(0)
    }
  })

  it('declares exactly two gates after Plan and Verificación', () => {
    const gated = phases.filter((phase) => phase.gate)
    expect(gated).toHaveLength(2)
    expect(phases[4]?.gate).toBe('Sin plan aprobado no se escribe código.')
    expect(phases[6]?.gate).toBe('Sin tests en verde no hay review.')
  })
})

describe('stack', () => {
  it('lists the 13 technologies of AGENTS.md', () => {
    expect(stack).toHaveLength(13)
    expect(stack.map((item) => item.tech)).toEqual([
      'TypeScript (strict, ESM)',
      'Hono',
      'PostgreSQL',
      'Drizzle ORM + Kit',
      'Better Auth',
      'Zod v4',
      'React 19 + Vite',
      'React Hook Form',
      'TanStack Query + Axios',
      'Zustand',
      'shadcn/ui + Tailwind',
      'Vitest + Testing Library + Playwright',
      'Context7 MCP',
    ])
    for (const item of stack) {
      expect(item.layer.length).toBeGreaterThan(0)
    }
  })
})

describe('highlighted skills', () => {
  it('lists the 8 highlighted skills with descriptions', () => {
    expect(highlightedSkills).toHaveLength(8)
    expect(highlightedSkills.map((skill) => skill.name)).toEqual([
      'stack-guard',
      'code-review',
      'tdd',
      'context-persistence',
      'code-simplification',
      'playwright-best-practices',
      'verification-before-completion',
      'context7-query',
    ])
    for (const skill of highlightedSkills) {
      expect(skill.description.length).toBeGreaterThan(10)
    }
  })
})

describe('memory blocks', () => {
  it('documents the four memory and minimalism blocks', () => {
    expect(memoryBlocks).toHaveLength(4)
    const refs = memoryBlocks.map((block) => block.ref)
    expect(refs).toContain('docs/context/STATE.md')
    expect(refs).toContain('docs/context/decisions-log.md')
    expect(refs).toContain('skill: code-simplification')
    expect(refs).toContain('tool_output + compaction')
    const body = memoryBlocks.map((block) => block.body).join(' ')
    expect(body).toContain('1000 líneas')
    expect(body).toContain('32 KB')
    expect(body).toContain('25k tokens')
  })
})

describe('permissions', () => {
  it('denies the six risky commands by default', () => {
    expect(permissionGroups[0]?.title).toBe('Denegado por defecto')
    expect(permissionGroups[0]?.items).toEqual([
      'git push',
      'sudo',
      'npm publish',
      'docker push',
      'kubectl delete',
      'terraform apply / destroy',
    ])
  })

  it('requires human approval for five irreversible actions, including .env', () => {
    expect(permissionGroups[1]?.title).toBe('Requiere tu aprobación')
    expect(permissionGroups[1]?.items).toHaveLength(5)
    expect(permissionGroups[1]?.items).toContain('.env (lectura o escritura)')
    expect(permissionGroups[1]?.items).toContain('merge de una rama')
    expect(permissionGroups[1]?.items).toContain('deploy')
    expect(permissionGroups[1]?.items).toContain('migraciones destructivas')
    expect(permissionGroups[1]?.items).toContain('secretos reales')
  })
})

describe('install', () => {
  it('keeps the exact three-command block that the copy button writes', () => {
    const expected = [
      '# 1. desde la raíz de tu proyecto, instala el equipo (última estable)',
      'curl -fsSL https://raw.githubusercontent.com/naxrowdev/opencode-dev-team/main/kit/install.sh | sh',
      '',
      '# 2. versión fijada (tag publicado)',
      'curl -fsSL https://raw.githubusercontent.com/naxrowdev/opencode-dev-team/main/kit/install.sh | sh -s -- --ref v1.0.0',
      '',
      '# 3. verifica que todo quedó en su lugar',
      'sh opencode-dev-team/kit/selftest.sh',
    ].join('\n')

    expect(install.commands).toBe(expected)
    expect(install.commands.startsWith('# 1.')).toBe(true)
    expect(install.commands.endsWith('sh opencode-dev-team/kit/selftest.sh')).toBe(true)
  })

  it('carries the four notes', () => {
    expect(install.notes).toHaveLength(4)
  })

  it('balances the inline-code markers in every copy string', () => {
    const strings: string[] = []
    const walk = (value: unknown): void => {
      if (typeof value === 'string') strings.push(value)
      else if (Array.isArray(value)) value.forEach(walk)
      else if (value && typeof value === 'object') Object.values(value).forEach(walk)
    }
    walk(copy)

    expect(strings.length).toBeGreaterThan(20)
    for (const text of strings) {
      const markers = text.split('`').length - 1
      expect(markers % 2, `unbalanced backticks in: ${text}`).toBe(0)
    }
  })
})

describe('supporting messages', () => {
  it('delivers the three hero claims', () => {
    expect(supportingMessages.map((message) => message.title)).toEqual([
      'Equipo, no prompt',
      'El proceso está cableado',
      'Aburrido donde importa',
    ])
  })
})
