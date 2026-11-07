import type {
  Agent,
  Copy,
  Install,
  MemoryBlock,
  PermissionGroup,
  Phase,
  SiteMeta,
  SkillItem,
  StackItem,
  Stat,
  SupportingMessage,
} from './types'

export const site: SiteMeta = {
  version: 'v0.2.1',
  stage: 'pre-1.0',
  repoUrl: 'https://github.com/naxrowdev/opencode-dev-team',
  repoLabel: 'github.com/naxrowdev/opencode-dev-team',
  skillsTotal: 55,
}

export const stats: Stat[] = [
  { value: '12', label: 'roles' },
  { value: '9', label: 'fases' },
  { value: String(site.skillsTotal), label: 'skills' },
  { value: '0', label: 'plugins externos' },
]

export const agents: Agent[] = [
  {
    id: 'tech-lead',
    role: 'Orquesta: planifica, delega, integra y verifica',
    phase: 'Plan',
    hex: '#A855F7',
    orchestrator: true,
  },
  {
    id: 'product-owner',
    role: 'Problema, PRD y priorización',
    phase: 'Descubrimiento',
    hex: '#F97316',
  },
  {
    id: 'business-analyst',
    role: 'Requisitos, historias Gherkin y tickets',
    phase: 'Análisis',
    hex: '#EAB308',
  },
  {
    id: 'architect',
    role: 'Límites de módulos, contratos de API y ADRs',
    phase: 'Diseño',
    hex: '#3B82F6',
  },
  {
    id: 'ux-designer',
    role: 'Flujos, estados de pantalla y accesibilidad',
    phase: 'Diseño',
    hex: '#EC4899',
  },
  {
    id: 'backend-dev',
    role: 'Hono, Drizzle, Better Auth y Postgres',
    phase: 'Implementación',
    hex: '#10B981',
  },
  {
    id: 'frontend-dev',
    role: 'React 19, shadcn, Tailwind y TanStack Query',
    phase: 'Implementación',
    hex: '#06B6D4',
  },
  {
    id: 'qa-engineer',
    role: 'Plan de pruebas: unitarias, integración y E2E',
    phase: 'Verificación',
    hex: '#84CC16',
  },
  {
    id: 'code-reviewer',
    role: 'Revisión en dos ejes: estándares y spec',
    phase: 'Revisión',
    hex: '#EF4444',
  },
  {
    id: 'security-engineer',
    role: 'Threat model, OWASP y secretos',
    phase: 'Transversal',
    hex: '#F43F5E',
  },
  {
    id: 'devops-sre',
    role: 'CI/CD, Docker y observabilidad',
    phase: 'Entrega',
    hex: '#64748B',
  },
  {
    id: 'tech-writer',
    role: 'README, guías, ADR y changelog',
    phase: 'Transversal',
    hex: '#D946EF',
  },
]

export const phases: Phase[] = [
  {
    name: 'Descubrimiento',
    goal: 'Entender el problema y escribirlo',
    owner: ['product-owner'],
    artifact: 'PRD en docs/product/',
  },
  {
    name: 'Análisis',
    goal: 'Escribir requisitos verificables',
    owner: ['business-analyst'],
    artifact: 'historias Gherkin y tickets con dependencias',
  },
  {
    name: 'Diseño',
    goal: 'Definir arquitectura y contratos',
    owner: ['architect'],
    artifact: 'límites de módulos, API y ADR si hay decisión grande',
  },
  {
    name: 'UX',
    goal: 'Diseñar flujos y pantallas',
    owner: ['ux-designer'],
    artifact: 'wireframes, estados y criterios de accesibilidad',
  },
  {
    name: 'Plan',
    goal: 'Asignar el trabajo',
    owner: ['tech-lead'],
    artifact: 'tareas verificables para backend, frontend y QA',
    gate: 'Sin plan aprobado no se escribe código.',
  },
  {
    name: 'Implementación',
    goal: 'Construir',
    owner: ['backend-dev', 'frontend-dev'],
    artifact: 'código con tests, en paralelo cuando se puede',
  },
  {
    name: 'Verificación',
    goal: 'Correr la suite',
    owner: ['qa-engineer'],
    artifact: 'output real, no "debería andar"',
    gate: 'Sin tests en verde no hay review.',
  },
  {
    name: 'Revisión',
    goal: 'Revisar en dos ejes',
    owner: ['code-reviewer', 'security-engineer'],
    artifact: 'estándares y spec, lado a lado',
  },
  {
    name: 'Entrega',
    goal: 'Publicar y documentar',
    owner: ['devops-sre', 'tech-writer'],
    artifact: 'Docker, CI y docs al día',
  },
]

export const stack: StackItem[] = [
  { tech: 'TypeScript (strict, ESM)', layer: 'Lenguaje: cliente y servidor' },
  { tech: 'Hono', layer: 'Backend: rutas y middleware' },
  { tech: 'PostgreSQL', layer: 'Base de datos, en Docker' },
  { tech: 'Drizzle ORM + Kit', layer: 'Esquema y migraciones versionadas' },
  { tech: 'Better Auth', layer: 'Sesiones y autenticación' },
  { tech: 'Zod v4', layer: 'Validación en los bordes' },
  { tech: 'React 19 + Vite', layer: 'SPA, sin Next.js' },
  { tech: 'React Hook Form', layer: 'Formularios con resolver Zod' },
  { tech: 'TanStack Query + Axios', layer: 'Estado de servidor' },
  { tech: 'Zustand', layer: 'Estado de UI' },
  { tech: 'shadcn/ui + Tailwind', layer: 'Componentes y tokens' },
  {
    tech: 'Vitest + Testing Library + Playwright',
    layer: 'Unitarias, integración y E2E',
  },
  { tech: 'Context7 MCP', layer: 'Docs vigentes, no de memoria' },
]

export const highlightedSkills: SkillItem[] = [
  {
    name: 'stack-guard',
    description: 'Frena cualquier dependencia fuera del stack antes de instalarla.',
  },
  {
    name: 'code-review',
    description: 'Revisión en dos ejes, estándares y spec, reportada lado a lado.',
  },
  {
    name: 'tdd',
    description: 'Rojo, verde, refactor: el test se escribe antes que el código.',
  },
  {
    name: 'context-persistence',
    description: 'Guarda y recupera el estado en docs/context/, sin plugins.',
  },
  {
    name: 'code-simplification',
    description: 'El mejor código es el que no escribís: el diff más corto que funcione.',
  },
  {
    name: 'playwright-best-practices',
    description: 'E2E sin flakiness: page objects, fixtures y CI.',
  },
  {
    name: 'verification-before-completion',
    description: 'Nada se declara listo sin el output del comando.',
  },
  {
    name: 'context7-query',
    description: 'Firmas y versiones al día por Context7, no de memoria.',
  },
]

export const memoryBlocks: MemoryBlock[] = [
  {
    title: 'Estado',
    ref: 'docs/context/STATE.md',
    body: 'Se inyecta como instrucción al arrancar cada sesión. Es una afirmación a verificar contra el repo, no un contrato ciego: si hay drift, el tech-lead lo corrige antes de planificar.',
  },
  {
    title: 'Decisiones',
    ref: 'docs/context/decisions-log.md',
    body: 'Append-only. Fecha, decisión y argumento en dos o tres líneas. La memoria entre sesiones es el repo, no un servicio.',
  },
  {
    title: 'Minimalismo',
    ref: 'skill: code-simplification',
    body: 'Empuja el diff más corto que resuelva el problema. Menos código es menos superficie para que algo se rompa.',
  },
  {
    title: 'Tokens',
    ref: 'tool_output + compaction',
    body: 'Las salidas de más de 1000 líneas o 32 KB se truncan y el resto queda en disco. La compactación conserva unos 25k tokens recientes.',
  },
]

export const permissionGroups: PermissionGroup[] = [
  {
    title: 'Denegado por defecto',
    items: [
      'git push',
      'sudo',
      'npm publish',
      'docker push',
      'kubectl delete',
      'terraform apply / destroy',
    ],
  },
  {
    title: 'Requiere tu aprobación',
    items: [
      '.env (lectura o escritura)',
      'merge de una rama',
      'deploy',
      'migraciones destructivas',
      'secretos reales',
    ],
  },
]

export const install: Install = {
  commands: `# 1. cloná el kit al lado de tu proyecto
git clone https://github.com/naxrowdev/opencode-dev-team.git

# 2. desde la raíz de tu proyecto, instalá el equipo
sh opencode-dev-team/kit/install.sh

# 3. verificá que todo quedó en su lugar
sh opencode-dev-team/kit/selftest.sh`,
  notes: [
    'Es re-ejecutable: para actualizar el kit, volvés a correr el comando 2.',
    'La primera vez siembra `docs/context/` vacío: el estado arranca en tu proyecto, no en el mío.',
    'Toca `.opencode/agents`, `.opencode/skills`, `AGENTS.md`, `opencode.jsonc` y `docs/`. Nada fuera de tu repo.',
  ],
}

export const supportingMessages: SupportingMessage[] = [
  {
    title: 'Equipo, no prompt',
    body: 'Un orquestador reparte; once subagentes ejecutan con rol, fase y color propios.',
  },
  {
    title: 'El proceso está cableado',
    body: 'De la PRD al deploy: cada paso tiene dueño y ninguno pasa sin verificación.',
  },
  {
    title: 'Aburrido donde importa',
    body: 'Stack fijo con ADR humano. `git push` y `sudo` vienen denegados.',
  },
]

export const copy: Copy = {
  hero: {
    wordmark: 'opencode-dev-team',
    githubLabel: 'GitHub',
    title: 'Tu próximo proyecto no necesita más prompts. Necesita un equipo.',
    lede: 'Una configuración, doce roles: convertí OpenCode en un equipo de desarrollo con pipeline, stack fijo y permisos que no te dejan en banda.',
    glossary:
      'Agente primario: reparte el trabajo. Subagente: ejecuta un rol. Acá hay uno y once.',
    primaryCta: { label: 'Abrir el repo en GitHub', href: site.repoUrl },
    secondaryCta: { label: 'Ver los comandos', href: '#instalacion' },
  },
  problem: {
    title: 'Tenés un modelo buenísimo y cero proceso.',
    lede: 'Cada feature arranca de cero. No porque el modelo falle, sino porque nadie definió quién hace qué, en qué orden y con qué criterio se aprueba.',
    closing: 'No falta más IA. Falta proceso que se repita igual todos los días.',
    symptoms: [
      {
        title: 'El contexto se pierde entre sesiones',
        body: 'Abrís otra sesión y el agente no sabe qué decidiste ayer, ni por qué. Lo volvés a explicar, o peor: lo asume.',
      },
      {
        title: 'La calidad queda a criterio del momento',
        body: 'Sin gates, el review es lo que el agente recuerde hacer esa tarde. Un día hay tests; al otro, no.',
      },
      {
        title: 'El agente puede tocar lo irreversible',
        body: 'Un `git push` de más, un `.env` leído, un deploy sin que nadie lo apruebe. El costo lo pagás vos.',
      },
    ],
  },
  pipeline: {
    title: 'Nueve fases. Cada una con dueño.',
    lede: 'El pipeline no es una sugerencia en un README: está en las instrucciones que el agente lee al arrancar. Si una fase no deja su artefacto, la siguiente no empieza.',
    note: 'Seguridad y documentación son transversales: auditan todas las fases, no solo la última.',
  },
  roster: {
    title: 'Doce roles. El tech-lead reparte; nadie hace todo.',
    lede: 'Cada agente tiene nombre, fase y color en el kit. El color no es decoración: es cómo reconocés quién habla en la sesión.',
    counter: '12 roles · 1 orquestador + 11 subagentes',
    legend: 'El chip marca la fase; el color, el rol.',
    link: {
      label: 'Ver los 12 agentes en el repo',
      href: site.repoUrl,
    },
  },
  stack: {
    title: 'El stack no se negocia en cada tarea.',
    lede: '`AGENTS.md` fija las tecnologías y la skill `stack-guard` las hace cumplir antes de instalar un paquete. Cambiar algo requiere un ADR aprobado por una persona.',
    callout:
      'Si tu stack es otro, este kit no es para vos. Preferimos decírtelo acá y no en tu primer PR.',
    calloutSecondary: 'Cambiar el stack requiere un ADR aprobado por una persona.',
  },
  skills: {
    title: 'Cincuenta y cinco skills en el repo. Sin caja negra.',
    lede: 'Cada skill es un `SKILL.md` versionado: la leés, la diffeás y la cambiás. No hay servicio externo que las sirva.',
    note: 'Sin symlinks y sin telemetría: se auditan con un diff.',
    link: {
      label: 'Ver las 55 skills en el repo',
      href: site.repoUrl,
    },
  },
  memory: {
    title: 'La memoria vive en `docs/context/`, no en un plugin.',
    lede: 'El estado entre sesiones es un archivo en tu repo. Se lee al arrancar, se actualiza al cerrar la fase y se versiona con git como cualquier otra decisión.',
    flow: 'sesión 1 → STATE.md → sesión 2',
  },
  security: {
    title: '`git push` viene denegado. Vos aprobás lo irreversible.',
    lede: 'Los permisos son por rol y están en la configuración, no en la buena voluntad del modelo. El equipo prepara el cambio; la acción que no se deshace la ejecutás vos.',
    closing: 'El equipo prepara todo; vos ejecutás lo que no se puede deshacer.',
    note: 'Los permisos de cada rol se versionan con el resto del kit.',
  },
  install: {
    title: 'Cloná, instalá, verificá.',
    lede: 'Tres comandos desde la raíz de tu proyecto. El tercero no es opcional: verifica que los 12 agentes y las 55 skills quedaron donde corresponde.',
    prerequisites:
      'Necesitás OpenCode V2 y Git. Nada más: no hay cuenta, no hay clave, no hay servicio que registrar.',
    copyLabel: 'Copiar comandos',
    copiedLabel: 'Copiado',
    copyAriaLabel: 'Copiar los comandos de instalación al portapapeles',
    statusCopied: 'Comandos copiados al portapapeles.',
    statusError:
      'No se pudo copiar. Seleccioná el texto del bloque y usá Ctrl+C, o Cmd+C en Mac.',
    noscript:
      'Sin JavaScript, el botón «Copiar comandos» no funciona: se oculta. Los tres comandos ya están en la página y son texto normal. Seleccionalos y copiá con Ctrl+C, o Cmd+C en Mac. El resto de la página se lee igual.',
  },
  closing: {
    title: 'El repo es el argumento.',
    lede: 'No hay demo que reemplace leer los agentes y las skills. Cloná, mirá el diff, decidí.',
    cta: { label: 'Abrir el repo en GitHub', href: site.repoUrl },
    facts: [
      {
        title: 'No es un SaaS',
        body: 'No hay cuenta, ni plan, ni telemetría.',
      },
      {
        title: 'No es un plugin de memoria',
        body: 'El estado es un archivo en tu repo.',
      },
      {
        title: 'No es un framework',
        body: 'Es configuración de OpenCode, y la editás como cualquier archivo.',
      },
    ],
    spec: [
      { label: 'Versión', value: site.version },
      { label: 'Etapa', value: site.stage },
      { label: 'Licencia', value: 'está en el repo, junto al código' },
      { label: 'Stack', value: 'fijo, con ADR' },
    ],
  },
  footer: {
    links: [
      { label: 'Instalación', href: '#instalacion' },
      { label: 'Skills', href: '#skills' },
      { label: 'Repo', href: site.repoUrl },
    ],
    legal: 'Sin analytics, sin cookies, sin formularios.',
    madeWith: 'Hecho para OpenCode V2. El kit se versiona con git.',
  },
}
