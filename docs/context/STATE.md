# Project State
_Updated: 2026-11-07 · Version: 0.1.0 · by: tech-lead_

## What this is right now

Web de presentación de una sola página del kit `opencode-dev-team` v0.2.1. SPA React 19 + Vite 8 + Tailwind 4, prerenderizada a HTML estático, sin backend. Es el primer proyecto donde se validó el pipeline completo del kit (PRD → specs/UX → plan → implementación → QA → review → docs).

## Current state

- Built: landing de 10 secciones (hero, problema, pipeline de 9 fases, roster de 12 roles, stack de 13 tecnologías, 8 de 55 skills, memoria/minimalismo/tokens, permisos, instalación, CTA). 55 tests en verde, build con prerender y gate de performance. Medido: HTML 8.5 KB gzip, JS 85.9 KB gzip, CSS 8.5 KB gzip (presupuestos 30/120/14 KB). Cero imágenes, cero webfonts, cero requests a terceros.
- Artefactos del pipeline: `docs/product/2026-11-07-web-presentacion-prd.md`, `docs/design/2026-11-07-landing-design.md`, `docs/plans/2026-11-07-landing-presentacion.md`.
- In progress: nada.
- Blocked / waiting user: no hay remoto de git configurado (el push lo hace el usuario); hosting, dominio y licencia del kit sin definir.

## Next steps

1. Usuario: remoto de git y push del primer commit.
2. Definir hosting estático (GitHub Pages o Cloudflare Pages) y dominio.
3. Verificar el bloque de instalación contra el tag publicado y pasar los criterios de usabilidad 1 y 4 del PRD (pruebas con personas, no automatizables).
4. En el repo del kit (`~/Proyectos/opencode-dev-team`): corregir el orden de las reglas de permisos de los agentes y publicar la corrección.
