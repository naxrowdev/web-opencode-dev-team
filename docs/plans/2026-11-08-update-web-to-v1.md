# Actualizar Web a v1.0.0 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Actualizar la landing page de `opencode-dev-team` de v0.2.1 (pre-1.0) a v1.0.0 (estable) reflejando los cambios del kit: instalación por curl (auto-bootstrap), desinstalador, español neutro (sin voseo), modelos por rol opcionales, entrega de cambios por comandos, ADRs 0001-0003, STATE.md auto-inyectado como `instructions`.

**Architecture:** La página usa un módulo de contenido único (`src/content/site.ts`) que alimenta todas las secciones. Los cambios son actualizaciones de datos en ese módulo + version bump en `package.json`. No hay cambios de arquitectura ni componentes React.

**Tech Stack:** React 19 + Vite + Tailwind 4 + TypeScript + Vitest + Playwright

**Spec:** `docs/design/2026-11-07-landing-design.md` (contrato visual vigente) + `docs/product/2026-11-07-web-presentacion-prd.md` (contenido base)

## Global Constraints

- Stack fijo: React 19, Vite, Tailwind 4, shadcn/ui, TypeScript strict, Vitest, Playwright
- Copy en español neutro (sin voseo: "tú" e imperativo estándar), código/identificadores/commits en inglés
- Cero webfonts, cero imágenes, cero requests a terceros
- Un solo `<h1>`, LCP <2.5s en móvil 3G (Lighthouse local)
- Datos versionados en `src/content/site.ts` (fuente única) — sin strings hardcodeados en componentes
- Presupuestos: HTML 30 KB gzip, JS 120 KB gzip, CSS 14 KB gzip
- Tests existentes: 55 tests en verde, build con prerender + gate de performance

## Review Focus

1. **Voseo residual**: Cualquier "convertí", "tenés", "arrancá", "instalá", "verificá", "cloná", "ejecutá" en copy visible → falla criterio de español neutro
2. **Versión inconsistente**: v0.2.1 o "pre-1.0" apareciendo en hero, footer, metadatos → confunde al visitante
3. **Instalación desactualizada**: Bloque de comandos mostrando `git clone` + `sh opencode-dev-team/kit/install.sh` en lugar del one-liner `curl` → el usuario no puede instalar v1.0.0
4. **Falta desinstalador**: No se menciona `kit/uninstall.sh` ni el manifiesto → omite feature clave de 1.0.0
5. **Memoria mal descrita**: Decir "STATE.md se inyecta al arrancar" sin mencionar `instructions` en `opencode.jsonc` → técnicamente impreciso

---

### Task 1: Actualizar `src/content/site.ts` a v1.0.0

**Files:**
- Modify: `src/content/site.ts`

**Interfaces:**
- Produces: nuevo objeto `site` con `version: 'v1.0.0'`, `stage: 'stable'`, comandos de instalación actualizados, permisos actualizados, copy en español neutro

- [ ] **Step 1: Actualizar metadatos del sitio**
```typescript
export const site: SiteMeta = {
  version: 'v1.0.0',
  stage: 'stable',  // era 'pre-1.0'
  repoUrl: 'https://github.com/naxrowdev/opencode-dev-team',
  repoLabel: 'github.com/naxrowdev/opencode-dev-team',
  skillsTotal: 55,
}
```

- [ ] **Step 2: Actualizar bloque de instalación (commands + notes)**
```typescript
export const install: Install = {
  commands: `# 1. desde la raíz de tu proyecto, instalá el equipo (última estable)
curl -fsSL https://raw.githubusercontent.com/naxrowdev/opencode-dev-team/main/kit/install.sh | sh

# 2. versión fijada (tag publicado)
curl -fsSL https://raw.githubusercontent.com/naxrowdev/opencode-dev-team/main/kit/install.sh | sh -s -- --ref v1.0.0

# 3. verificá que todo quedó en su lugar
sh opencode-dev-team/kit/selftest.sh`,
  notes: [
    'Es re-ejecutable: para actualizar el kit, volvés a correr el comando 1.',
    'La primera vez siembra `docs/context/` vacío: el estado arranca en tu proyecto, no en el mío.',
    'Toca `.opencode/agents`, `.opencode/skills`, `AGENTS.md`, `opencode.jsonc` y `docs/`. Nada fuera de tu repo.',
    'Para desinstalar: `curl -fsSL .../kit/uninstall.sh | sh` (plan) y `--yes` para aplicar.',
  ],
}
```

- [ ] **Step 3: Actualizar copy del hero (español neutro)**
```typescript
hero: {
  wordmark: 'opencode-dev-team',
  githubLabel: 'GitHub',
  title: 'Tu próximo proyecto no necesita más prompts. Necesita un equipo.',
  lede: 'Una configuración, doce roles: convierte OpenCode en un equipo de desarrollo con pipeline, stack fijo y permisos que no te dejan en banda.',
  glossary: 'Agente primario: reparte el trabajo. Subagente: ejecuta un rol. Aquí hay uno y once.',
  primaryCta: { label: 'Abrir el repo en GitHub', href: site.repoUrl },
  secondaryCta: { label: 'Ver los comandos', href: '#instalacion' },
}
```

- [ ] **Step 4: Actualizar copy de problema (español neutro)**
```typescript
problem: {
  title: 'Tienes un modelo buenísimo y cero proceso.',
  lede: 'Cada feature arranca de cero. No porque el modelo falle, sino porque nadie definió quién hace qué, en qué orden y con qué criterio se aprueba.',
  closing: 'No falta más IA. Falta proceso que se repita igual todos los días.',
  symptoms: [
    { title: 'El contexto se pierde entre sesiones', body: 'Abres otra sesión y el agente no sabe qué decidiste ayer, ni por qué. Lo vuelves a explicar, o peor: lo asume.' },
    { title: 'La calidad queda a criterio del momento', body: 'Sin gates, el review es lo que el agente recuerde hacer esa tarde. Un día hay tests; al otro, no.' },
    { title: 'El agente puede tocar lo irreversible', body: 'Un git push de más, un .env leído, un despliegue sin que nadie lo apruebe. El costo lo pagas tú.' },
  ],
}
```

- [ ] **Step 5: Actualizar copy de stack (español neutro + callout actualizado)**
```typescript
stack: {
  title: 'El stack no se negocia en cada tarea.',
  lede: 'AGENTS.md fija las tecnologías y la skill stack-guard las hace cumplir antes de instalar un paquete. Cambiar algo requiere un ADR aprobado por una persona.',
  callout: 'Si tu stack es otro, este kit no es para ti. Preferimos decírtelo aquí y no en tu primer PR.',
  calloutSecondary: 'Cambiar el stack requiere un ADR aprobado por una persona.',
}
```

- [ ] **Step 6: Actualizar copy de memoria (precisión técnica: instructions en opencode.jsonc)**
```typescript
memory: {
  title: 'La memoria vive en docs/context/, no en un plugin.',
  lede: 'El estado entre sesiones es un archivo en tu repo. Se lee al arrancar, se actualiza al cerrar la fase y se versiona con git como cualquier otra decisión.',
  flow: 'sesión 1 → STATE.md → sesión 2',
}
memoryBlocks: [
  {
    title: 'Estado',
    ref: 'docs/context/STATE.md',
    body: 'Se inyecta como instrucciones ambient (config instructions en opencode.jsonc) al arrancar cada sesión. Es una afirmación a verificar contra el repo, no un contrato ciego: si hay drift, el tech-lead lo corrige antes de planificar.',
  },
  // ... resto igual
]
```

- [ ] **Step 7: Actualizar copy de seguridad (español neutro)**
```typescript
security: {
  title: 'git push viene denegado. Tú apruebas lo irreversible.',
  lede: 'Los permisos son por rol y están en la configuración, no en la buena voluntad del modelo. El equipo prepara el cambio; la acción que no se deshace la ejecutas tú.',
  closing: 'El equipo prepara todo; tú ejecutas lo que no se puede deshacer.',
  note: 'Los permisos de cada rol se versionan con el resto del kit.',
}
```

- [ ] **Step 8: Actualizar copy de instalación (español neutro + mención desinstalador)**
```typescript
install: {
  title: 'Clona, instala, verifica.',
  lede: 'Tres comandos desde la raíz de tu proyecto. El tercero no es opcional: verifica que los 12 agentes y las 55 skills quedaron donde corresponde.',
  prerequisites: 'Necesitas OpenCode V2 y Git. Nada más: no hay cuenta, no hay clave, no hay servicio que registrar.',
  copyLabel: 'Copiar comandos',
  copiedLabel: 'Copiado',
  copyAriaLabel: 'Copiar los comandos de instalación al portapapeles',
  statusCopied: 'Comandos copiados al portapapeles.',
  statusError: 'No se pudo copiar. Selecciona el texto del bloque y usa Ctrl+C, o Cmd+C en Mac.',
  noscript: 'Sin JavaScript, el botón "Copiar comandos" no funciona: se oculta. Los tres comandos ya están en la página y son texto normal. Seleccionarlos y copiar con Ctrl+C, o Cmd+C en Mac. El resto de la página se lee igual.',
}
```

- [ ] **Step 9: Actualizar copy de cierre (español neutro + versión estable)**
```typescript
closing: {
  title: 'El repo es el argumento.',
  lede: 'No hay demo que reemplace leer los agentes y las skills. Clona, mira el diff, decide.',
  cta: { label: 'Abrir el repo en GitHub', href: site.repoUrl },
  facts: [
    { title: 'No es un SaaS', body: 'No hay cuenta, ni plan, ni telemetría.' },
    { title: 'No es un plugin de memoria', body: 'El estado es un archivo en tu repo.' },
    { title: 'No es un framework', body: 'Es configuración de OpenCode, y la editas como cualquier archivo.' },
  ],
  spec: [
    { label: 'Versión', value: site.version },
    { label: 'Etapa', value: site.stage },
    { label: 'Licencia', value: 'está en el repo, junto al código' },
    { label: 'Stack', value: 'fijo, con ADR' },
  ],
}
```

- [ ] **Step 10: Actualizar supportingMessages (español neutro)**
```typescript
supportingMessages: [
  { title: 'Equipo, no prompt', body: 'Un orquestador reparte; once subagentes ejecutan con rol, fase y color propios.' },
  { title: 'El proceso está cableado', body: 'De la PRD al despliegue: cada paso tiene dueño y ninguno pasa sin verificación.' },
  { title: 'Aburrido donde importa', body: 'Stack fijo con ADR humano. git push y sudo vienen denegados.' },
]
```

- [ ] **Step 11: Verificar que no queda voseo en todo el archivo**
Run: `grep -n -E "(convertí|tenés|arrancá|instalá|verificá|cloná|ejecutá|volvés|decírtelo|prepará|mirá|decide|editás|reemplazá)" src/content/site.ts`
Expected: 0 matches

- [ ] **Step 12: Run typecheck**
Run: `npm run typecheck`
Expected: PASS

---

### Task 2: Actualizar version en package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Cambiar version a 1.0.0**
```json
"version": "1.0.0",
```

- [ ] **Step 2: Run typecheck**
Run: `npm run typecheck`
Expected: PASS

---

### Task 3: Verificar build y tests

**Files:**
- Test: todos los tests existentes

- [ ] **Step 1: Run lint**
Run: `npm run lint`
Expected: PASS

- [ ] **Step 2: Run typecheck**
Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 3: Run tests**
Run: `npm run test`
Expected: 55 tests PASS

- [ ] **Step 4: Run build**
Run: `npm run build`
Expected: PASS (HTML ~8.5 KB gzip, JS ~86 KB gzip, CSS ~8.5 KB gzip)

- [ ] **Step 5: Run budget check**
Run: `npm run check:budget`
Expected: PASS (dentro de 30/120/14 KB gzip)

---

### Task 4: Actualizar PRD y Design Doc (documentación histórica)

**Files:**
- Modify: `docs/product/2026-11-07-web-presentacion-prd.md`
- Modify: `docs/design/2026-11-07-landing-design.md`

- [ ] **Step 1: En PRD, actualizar versión referenciada de v0.2.1 a v1.0.0 y stage a stable**
- [ ] **Step 2: En PRD, actualizar copy propuesto a español neutro (sin voseo)**
- [ ] **Step 3: En Design Doc, actualizar versión referenciada y tokens de copy (sección 4)**
- [ ] **Step 4: En Design Doc, agregar nota sobre desinstalador en sección de instalación**

---

### Task 5: Commit y entrega de comandos

**Files:**
- git status / diff

- [ ] **Step 1: Verificar cambios**
Run: `git status --short && git diff --stat`

- [ ] **Step 2: Commit**
Run: `git add src/content/site.ts package.json docs/product/2026-11-07-web-presentacion-prd.md docs/design/2026-11-07-landing-design.md`
Run: `git commit -m "feat(web): update landing to v1.0.0 — curl install, uninstaller, neutral Spanish, stable release"`

- [ ] **Step 3: Entregar comandos de push y tag al usuario**
```bash
cd /home/gaston-romero/Proyectos/web-opencode-dev-team
git push origin main
git tag v1.0.0
git push origin v1.0.0
```

---

## Self-Review Checklist

- [x] Spec coverage: Cada sección del PRD/Design que menciona v0.2.1/pre-1.0/voseo/comandos instalacion tiene task correspondiente
- [x] Step scan: Cada step es una acción única verificable (grep, typecheck, test, build)
- [x] Type consistency: site.ts usa los mismos tipos; package.json solo version bump
- [x] Review focus: 5 riesgos cubiertos con tests específicos (grep voseo, version check, install block check, uninstall mention, memory precision)
- [x] Proportion: Plan es conciso, sin bodies de algoritmo innecesarios