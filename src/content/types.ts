export type AgentId =
  | 'tech-lead'
  | 'product-owner'
  | 'business-analyst'
  | 'architect'
  | 'ux-designer'
  | 'backend-dev'
  | 'frontend-dev'
  | 'qa-engineer'
  | 'code-reviewer'
  | 'security-engineer'
  | 'devops-sre'
  | 'tech-writer'

export type PhaseName =
  | 'Descubrimiento'
  | 'Análisis'
  | 'Diseño'
  | 'UX'
  | 'Plan'
  | 'Implementación'
  | 'Verificación'
  | 'Revisión'
  | 'Entrega'

export interface Agent {
  id: AgentId
  role: string
  phase: PhaseName | 'Transversal'
  hex: string
  orchestrator?: boolean
}

export interface Phase {
  name: PhaseName
  goal: string
  owner: AgentId[]
  artifact: string
  gate?: string
}

export interface StackItem {
  tech: string
  layer: string
}

export interface SkillItem {
  name: string
  description: string
}

export interface MemoryBlock {
  title: string
  ref: string
  body: string
}

export interface PermissionGroup {
  title: string
  items: string[]
}

export interface Install {
  commands: string
  notes: string[]
}

export interface SiteMeta {
  version: string
  stage: string
  repoUrl: string
  repoLabel: string
  skillsTotal: number
}

export interface SupportingMessage {
  title: string
  body: string
}

export interface Stat {
  value: string
  label: string
}

export interface Symptom {
  title: string
  body: string
}

export interface Fact {
  title: string
  body: string
}

export interface SpecRow {
  label: string
  value: string
}

export interface CallToAction {
  label: string
  href: string
}

export interface Copy {
  hero: {
    wordmark: string
    githubLabel: string
    title: string
    lede: string
    glossary: string
    primaryCta: CallToAction
    secondaryCta: CallToAction
  }
  problem: {
    title: string
    lede: string
    closing: string
    symptoms: Symptom[]
  }
  pipeline: {
    title: string
    lede: string
    note: string
  }
  roster: {
    title: string
    lede: string
    counter: string
    legend: string
    link: CallToAction
  }
  stack: {
    title: string
    lede: string
    callout: string
    calloutSecondary: string
  }
  skills: {
    title: string
    lede: string
    note: string
    link: CallToAction
  }
  memory: {
    title: string
    lede: string
    flow: string
  }
  security: {
    title: string
    lede: string
    closing: string
    note: string
  }
  install: {
    title: string
    lede: string
    prerequisites: string
    copyLabel: string
    copiedLabel: string
    copyAriaLabel: string
    statusCopied: string
    statusError: string
    noscript: string
  }
  closing: {
    title: string
    lede: string
    cta: CallToAction
    facts: Fact[]
    spec: SpecRow[]
  }
  footer: {
    links: CallToAction[]
    legal: string
    madeWith: string
  }
}
