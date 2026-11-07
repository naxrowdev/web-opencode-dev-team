# Landing de presentación de `opencode-dev-team` — Plan de implementación

**Goal:** construir en `~/Proyectos/web-opencode-dev-team` la landing de una página que presenta el kit, con contenido prerenderizado y una sola interacción (copiar comandos).

**Architecture:** SPA React 19 + Vite 8 con prerender propio: `vite build` (cliente) → `vite build --ssr` → `node scripts/prerender.mjs` inyecta el HTML de `renderToString` en `dist/index.html`; en runtime `hydrateRoot` hidrata ese HTML. Sin router, sin backend, sin analítica. Todo el contenido sale de un único módulo `src/content/site.ts`.

**Tech Stack:** TypeScript strict + ESM · React 19.3 · Vite 8.3 · Tailwind CSS 4.3 (`@tailwindcss/vite`) · primitivos shadcn copiados a mano (Button, Alert) + `lucide-react` · Vitest + Testing Library + jsdom · ESLint 10 flat config.

**Spec:** `docs/product/2026-11-07-web-presentacion-prd.md` (contenido) y `docs/design/2026-11-07-landing-design.md` (dirección visual, tokens y copy deck final).

## Global Constraints

- Copy, tokens y estructura: **exactamente** los del design doc. Los textos del §4 del design doc son finales; no se reescriben.
- Cifras permitidas: `12 roles`, `1 orquestador + 11 subagentes`, `9 fases`, `55 skills`, `8 destacadas`, `0 plugins externos`, `6 denegados`, `5 aprobaciones`, `3 comandos`, `v0.2.1`, `pre-1.0`. Ninguna otra cifra.
- Los 12 hex de rol son los del kit y no se modifican.
- Un solo `<h1>`. `<html lang="es-AR">`.
- Sin webfonts, sin imágenes, sin gradientes de fondo, sin sombras, sin `backdrop-filter`, sin librerías de animación, sin analytics.
- Radios: 2px en todo. Único color saturado: la paleta de roles.
- Español rioplatense neutro (voseo) en el copy; identificadores y código en inglés.
- Agregar dependencias solo si están en `AGENTS.md`/`stack-guard`; `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority` están dentro de shadcn/ui.
- Sin Playwright en v1: el smoke de contenido corre sobre el HTML prerenderizado.

## Review Focus

- **Texto visible ≠ texto copiado**: el botón debe copiar los comandos con saltos de línea y sin comentarios alterados. Test que compara string exacto.
- **Hidratación sin mismatches**: cualquier `Date.now()`, `Math.random()` o rama `typeof window` en render rompe el prerender. Test: el HTML prerenderizado debe contener el `<h1>` y los 12 ids de agente.
- **Foco visible y contraste**: anillo 2px con offset 2px; ningún `outline: none` sin reemplazo. Auditoría manual + test de que el botón es `<button type="button">`.
- **Tabla de stack incompleta**: 13 filas, ni 12 ni 14.
- **Un solo h1 / landmarks**: si se agrega un h2 en el header, el test de headings falla a propósito.
- **Contenido sin JS**: si el prerender inyecta un root vacío o el HTML depende de `useEffect`, la página queda en blanco sin JS. Test sobre `dist/index.html`.

---

### Task 1: Scaffold + tooling

**Files:**
- Create: `package.json`, `index.html`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `vitest.config.ts`, `eslint.config.js`, `.gitignore` (ampliar el existente), `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/lib/utils.ts`, `scripts/prerender.mjs`
- Create: `src/components/ui/{button,alert}.tsx` (los primitivos se copian a mano, sin CLI de shadcn; `badge`, `card` y `separator` se descartaron por minimalismo en la revisión)

**Interfaces:**
- Produces: `cn(...inputs: ClassValue[]): string` en `src/lib/utils.ts`; `App(): JSX.Element` en `src/App.tsx`; scripts npm `dev`, `build`, `preview`, `test`, `typecheck`, `lint`, `check`.

- [ ] **Step 1:** `npm create vite@latest . -- --template react-ts` no interactivo (o escribir los archivos a mano si el CLI pide confirmación). Instalar: `react react-dom` + dev `vite @vitejs/plugin-react typescript @types/react @types/react-dom vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @tailwindcss/vite tailwindcss eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh clsx tailwind-merge class-variance-authority lucide-react`.
- [ ] **Step 2:** Configurar Tailwind 4 en `vite.config.ts` (`tailwindcss()` en plugins) y `src/index.css` con `@import "tailwindcss";` + los tokens `:root`/`@theme inline`/`@theme` del design doc §2.1–2.5, tal cual (valores exactos).
- [ ] **Step 3:** Crear los primitivos shadcn que se usan (`button`, `alert`) con `cva` y `cn`, siguiendo la receta shadcn pero con los tokens del design doc (radios 2px, sin sombras, `ring` de foco 2px). `button` con variantes `default` (blanco sobre grafito), `outline`, `ghost`; tamaño mínimo 44px. No crear primitivos que nadie use.
- [ ] **Step 4:** `scripts/prerender.mjs`: lee `dist/index.html`, importa `./dist-ssr/entry-server.js`, reemplaza `<div id="root"></div>` por `<div id="root">${html}</div>` y reescribe el archivo. Falla con exit 1 si no encuentra el marcador.
- [ ] **Step 5:** `package.json` scripts: `"build": "tsc -b && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs"`, `"test": "vitest run"`, `"typecheck": "tsc -b --noEmit"`, `"lint": "eslint ."`, `"check": "npm run lint && npm run typecheck && npm run test"`.
- [ ] **Step 6:** Verificar: `npm run lint && npm run typecheck` → 0 errores. `npm run build` → exit 0 y `dist/index.html` existe.

### Task 2: Módulo de contenido (fuente única)

**Files:**
- Create: `src/content/site.ts`, `src/content/types.ts`
- Test: `tests/content.test.ts`

**Interfaces:**
- Produces: `site: SiteMeta` (`version`, `stage`, `repoUrl`, `repoLabel`, `skillsTotal`), `agents: Agent[]` (`id`, `role`, `phase`, `hex`, `orchestrator?`), `phases: Phase[]` (`name`, `goal`, `owner: string[]`, `artifact`, `gate?`), `stack: StackItem[]` (`tech`, `layer`), `highlightedSkills: SkillItem[]` (`name`, `description`), `memoryBlocks`, `permissionGroups` (`title`, `items: string[]`), `install: { prerequisites, commands, notes }`, `supportingMessages`.
- Consumes: nada.

- [ ] **Step 1:** Test de invariantes: `agents.length === 12`, ids únicos, hex únicos y en mayúsculas, exactamente 1 `orchestrator`, `phases.length === 9`, exactamente 2 fases con `gate`, `stack.length === 13`, `highlightedSkills.length === 8`, `site.skillsTotal === 55`, `permissionGroups[0].items` contiene los 6 comandos denegados, `permissionGroups[1].items.length === 5`.
- [ ] **Step 2:** `npm run test tests/content.test.ts` → FAIL (módulo inexistente).
- [ ] **Step 3:** Escribir `site.ts` con todos los valores del design doc §4 (copy deck) y `AGENTS.md` (roles, fases, stack, permisos). Textos exactos.
- [ ] **Step 4:** `npm run test tests/content.test.ts` → PASS.

### Task 3: Shell, tokens aplicados y skip link

**Files:**
- Modify: `src/App.tsx`, `src/index.css`
- Create: `src/components/Section.tsx` (`{ id, title, eyebrow?, children }`), `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx`
- Test: `tests/app.test.tsx`

**Interfaces:**
- Produces: `Section({ id, title, children })` renderiza `<section id aria-labelledby>` + `<h2>`; `SiteHeader` y `SiteFooter` sin props.
- Consumes: `site`, `agents`, `phases` de Task 2.

- [ ] **Step 1:** Test: render de `<App/>` produce exactamente un `<h1>`, un `<main id="contenido">`, un `<header>` y un `<footer>`; existe el skip link "Saltar al contenido"; no hay `<h2>` antes del `<h1>` en el DOM.
- [ ] **Step 2:** `npm run test tests/app.test.tsx` → FAIL.
- [ ] **Step 3:** Implementar shell: skip link, header (wordmark mono, chip `v0.2.1` + `pre-1.0`, link GitHub), `main` con las 10 secciones (placeholders por ahora), footer (marca+versión, links a `#instalacion`, `#skills`, repo, línea legal).
- [ ] **Step 4:** `npm run test tests/app.test.tsx` → PASS.

### Task 4: Secciones 1–3 (hero, problema, pipeline)

**Files:**
- Create: `src/sections/Hero.tsx`, `src/sections/Problem.tsx`, `src/sections/Pipeline.tsx`
- Modify: `src/App.tsx`
- Test: `tests/sections-top.test.tsx`

**Interfaces:**
- Consumes: `site`, `agents`, `phases`, `supportingMessages`.
- Produces: `Hero()`, `Problem()`, `Pipeline()` sin props.

- [ ] **Step 1:** Test: el hero muestra el h1 exacto (`Tu próximo proyecto no necesita más prompts. Necesita un equipo.`), la versión y los 4 conteos; la placa tiene 12 celdas con `aria-hidden="true"`; `Problem` renderiza 3 `<h3>`; `Pipeline` renderiza un `<ol>` con 9 `<li>` y 2 compuertas (texto "Sin plan aprobado no se escribe código." y "Sin tests en verde no hay review.").
- [ ] **Step 2:** `npm run test tests/sections-top.test.tsx` → FAIL.
- [ ] **Step 3:** Implementar las 3 secciones con el layout del design doc §3.1–3.3 (grid 12, hairlines, placa 4×3 desktop / 6×2 mobile, riel del pipeline con nodo de color por dueño, compuertas con `Lock`).
- [ ] **Step 4:** `npm run test tests/sections-top.test.tsx` → PASS.

### Task 5: Secciones 4–6 (roster, stack, skills)

**Files:**
- Create: `src/sections/Roster.tsx`, `src/sections/Stack.tsx`, `src/sections/Skills.tsx`
- Modify: `src/App.tsx`
- Test: `tests/sections-mid.test.tsx`

**Interfaces:**
- Consumes: `agents`, `stack`, `highlightedSkills`, `site.skillsTotal`.
- Produces: `Roster()`, `Stack()`, `Skills()` sin props.

- [ ] **Step 1:** Test: `Roster` renderiza 12 `<li>` con el id, la fase y el hex de cada agente (comparar contra `agents`); `tech-lead` aparece primero y con la etiqueta "orquestador"; `Stack` renderiza un `<dl>` con 13 pares `dt`/`dd`; `Skills` renderiza 8 entradas y el contador `8 de 55`.
- [ ] **Step 2:** `npm run test tests/sections-mid.test.tsx` → FAIL.
- [ ] **Step 3:** Implementar según design doc §3.4–3.6: tarjeta con borde superior 4px del color del rol, chip de fase relleno (texto `#0E1216`, excepto `devops-sre` que usa `#FFFFFF`), hex en mono; stack en dos columnas sin tabla; skills en lista densa sin tarjetas.
- [ ] **Step 4:** `npm run test tests/sections-mid.test.tsx` → PASS.

### Task 6: Secciones 7–10 (memoria, seguridad, instalación, CTA)

**Files:**
- Create: `src/sections/Memory.tsx`, `src/sections/Security.tsx`, `src/sections/Install.tsx`, `src/sections/ClosingCta.tsx`, `src/components/CopyButton.tsx`
- Modify: `src/App.tsx`
- Test: `tests/sections-bottom.test.tsx`, `tests/copy-button.test.tsx`

**Interfaces:**
- Produces: `CopyButton({ text, label?, copiedLabel? })` → `<button type="button">` + `<span role="status">` siempre montado; usa `navigator.clipboard.writeText`; 2000 ms para volver al label inicial; en error deja el label inicial y escribe el mensaje de recuperación manual en el status.
- Consumes: `memoryBlocks`, `permissionGroups`, `install`.

- [ ] **Step 1:** Test del contenido: `Memory` muestra las rutas literales `docs/context/STATE.md`, `docs/context/decisions-log.md`, `tool_output`, `compaction` y "1000 líneas", "32 KB", "25k tokens"; `Security` muestra los 6 comandos denegados y `.env` en el panel de aprobaciones; `Install` muestra un `<pre><code>` con los 3 comandos y el bloque es exactamente `install.commands`.
- [ ] **Step 2:** Test del botón: mock de `navigator.clipboard.writeText`; click → recibe `install.commands` exacto y el status dice "Comandos copiados al portapapeles."; con el mock rechazando → status con "No se pudo copiar".
- [ ] **Step 3:** `npm run test tests/sections-bottom.test.tsx tests/copy-button.test.tsx` → FAIL.
- [ ] **Step 4:** Implementar las 4 secciones + `CopyButton` según design doc §3.7–3.10 y §4.9–4.13 (incluido el `<noscript>` dentro de `Install`).
- [ ] **Step 5:** `npm run test tests/sections-bottom.test.tsx tests/copy-button.test.tsx` → PASS.

### Task 7: Prerender + hidratación

**Files:**
- Create: `src/entry-server.tsx`
- Modify: `src/main.tsx` (`hydrateRoot`), `index.html` (meta tags del design doc §4.1 + `<div id="root"></div>`)
- Test: `tests/prerender.test.ts`

**Interfaces:**
- Produces: `render(): string` en `entry-server.tsx`; `dist/index.html` con el markup dentro de `#root`.

- [ ] **Step 1:** Test: si `dist/index.html` no existe, `it.skip`; si existe, contiene `<html lang="es-AR">`, exactamente un `<h1`, los 12 ids de agente, los 3 comandos y NO contiene `<div id="root"></div>` vacío.
- [ ] **Step 2:** `npm run build && npm run test tests/prerender.test.ts` → FAIL (root vacío).
- [ ] **Step 3:** Implementar `entry-server.tsx` (`renderToString(<App/>)` con `StrictMode`) y cambiar `main.tsx` a `hydrateRoot`. Ajustar `scripts/prerender.mjs` hasta que el HTML quede inyectado.
- [ ] **Step 4:** `npm run build && npm run test tests/prerender.test.ts` → PASS.

### Task 8: Gate final + documentación

**Files:**
- Create: `README.md` (tech-writer, después del gate)
- Modify: `docs/context/STATE.md`, `docs/context/decisions-log.md`

- [ ] **Step 1:** `npm run check` → lint + typecheck + build (vía `pretest`) + tests + gate de performance, todo en verde (output real).
- [ ] **Step 2:** `npm run build` → revisar tamaño: `du -sh dist` y el `.js` principal ≤ 120 KB gzip (usar `gzip -c dist/assets/*.js | wc -c`).
- [ ] **Step 3:** Smoke manual: `npm run preview` y verificar hero, roster, copiar comandos y navegación por teclado (12 paradas del design doc §5.3).
- [ ] **Step 4:** `code-reviewer` sobre el diff completo; integrar hallazgos.
- [ ] **Step 5:** `tech-writer`: README con qué es, cómo correr, estructura y presupuesto de performance. Actualizar `STATE.md` + `decisions-log.md`.

## Qué NO construimos

Backend, base de datos, auth, router, i18n, analítica, CMS, blog/docs site, Playwright, animaciones por scroll, GIF/hero image, formularios, deploy (lo decide el usuario).
