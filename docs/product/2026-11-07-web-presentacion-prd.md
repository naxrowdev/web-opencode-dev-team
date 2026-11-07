# PRD — Landing de presentación de `opencode-dev-team`
_2026-11-07 · v1.0 · product-owner · Estado: listo para UX y arquitectura_
_Fuente: repo del kit `v0.2.1` (2026-11-06). Sin analytics ni datos de usuarios: todas las afirmaciones son cualitativas y rastreables al repo._

> **Por qué importa para el desarrollo:** fija qué promete el sitio, qué secciones existen y cómo se verifica. UX decide forma; este documento decide contenido.

## 1. Problema
Quien usa OpenCode tiene **un modelo, no un equipo**: cada feature arranca de cero, sin roles, sin gates de calidad y sin criterios de review; el contexto se pierde entre sesiones y el agente puede tocar acciones irreversibles (push, `.env`, deploy).
Las alternativas son prompts sueltos, configuraciones caseras que nadie versiona, o frameworks pesados con lock-in. El faltante no es "más IA" sino **proceso repetible**.
**Por qué importa:** si el sitio no nombra este dolor, el visitante no tiene motivo para instalar nada.

## 2. Propuesta de valor
**Mensaje central:** *"Una configuración, doce roles: convertí OpenCode en un equipo de desarrollo con pipeline, stack fijo y permisos que no te dejan en banda."*

1. **Equipo, no prompt** — 1 orquestador (`tech-lead`) + 11 subagentes con rol, fase y color propio.
2. **El proceso está cableado** — PRD → specs Gherkin → ADR/contratos → UX → plan → código → QA → review en 2 ejes + security → entrega.
3. **Aburrido donde importa** — stack fijo con ADR humano, `git push`/`sudo`/`npm publish` denegados por defecto, memoria en el repo y no en un plugin.

## 3. Audiencias
| | Quién | Intención al entrar | Qué necesita ver |
|---|---|---|---|
| **Primaria** | Devs y tech leads que ya usan OpenCode V2 y sienten que les falta estructura | Decidir en ~10 min si lo instalan en su proyecto | Qué es, qué stack asume, qué permisos toca, cuánto tarda |
| **Secundaria** | Curiosos de "AI dev teams" que llegan desde GitHub o redes | Entender la categoría en ~30 s y decidir si vale clonar | Diagrama del pipeline y señales de seriedad (repo real, sin hype) |

**Por qué importa:** la primaria convierte; la secundaria comparte. El copy no puede asumir que ambas saben qué es un subagente.

## 4. Secciones de la página (obligatorias)
Todas son must-have para el lanzamiento. "Copy" es la frase de referencia, no el texto final.

| # | Sección | Objetivo | Contenido esperado | Copy propuesto |
|---|---|---|---|---|
| 1 | **Hero** | Que en <10 s se entienda qué es y para quién | Nombre, mensaje central, 3 mensajes de apoyo, CTA a GitHub, versión visible (`v0.2.1`, pre-1.0) | *"Tu próximo proyecto no necesita más prompts. Necesita un equipo."* |
| 2 | **Problema** | Nombrar el dolor sin caricaturizar | Los 3 síntomas: contexto perdido, calidad a criterio del momento, acciones riesgosas | *"Tenés un modelo buenísimo y cero proceso. Cada feature arranca de cero."* |
| 3 | **Pipeline** | Mostrar que hay método | Las 9 fases con su dueño, en orden, con la idea de gates (nada pasa sin verificación) | *"PRD, specs, ADR, UX, plan, código, QA, review, entrega. Cada paso tiene dueño."* |
| 4 | **Roster de 12** | Materializar el equipo | 12 tarjetas: nombre, rol, fase y color hex real del kit (`#A855F7`, `#F97316`, …), con `tech-lead` destacado | *"Doce roles con nombre, fase y color. El tech-lead reparte; nadie hace todo."* |
| 5 | **Stack fijo** | Filtrar rápido a quien no comparte stack | Tabla del stack de `AGENTS.md` + "cambiar el stack requiere ADR aprobado por un humano" | *"Hono, PostgreSQL, Drizzle, React 19. Si querés otro stack, hay un ADR; si no, hay foco."* |
| 6 | **Skills (55)** | Mostrar profundidad sin caja negra | 6–8 destacadas (`stack-guard`, `code-review`, `tdd`, `context-persistence`, `code-simplification`, `playwright-best-practices`) + link al repo | *"55 skills vendorizadas en el repo: sin symlinks, sin telemetría, auditables con un diff."* |
| 7 | **Memoria, minimalismo, tokens** | Responder "¿y el contexto entre sesiones?" | `docs/context/STATE.md` auto-inyectado + `decisions-log.md`; `code-simplification`; `tool_output` truncado + `compaction` | *"La memoria vive en `docs/context/`, no en un plugin. Y el mejor código es el que no escribís."* |
| 8 | **Seguridad y permisos** | Bajar el miedo a dejar un agente suelto | Permisos por rol; deny list (`git push`, `sudo`, `npm publish`, `docker push`, `kubectl delete`, `terraform apply/destroy`); `.env` pide confirmación; el humano aprueba lo irreversible | *"`git push` y `sudo` vienen denegados. `.env` pide confirmación. Vos aprobás lo irreversible."* |
| 9 | **Instalación (3 comandos)** | Convertir intención en acción | Bloque copiable: `git clone` del kit, `sh opencode-dev-team/kit/install.sh` desde la raíz, `sh kit/selftest.sh`; nota de que es re-ejecutable y siembra `docs/context/` vacío | *"Cloná, instalá, verificá. Tres comandos y el equipo queda adentro de tu proyecto."* |
| 10 | **CTA a GitHub** | Cierre único, sin ruido | Repo `github.com/naxrowdev/opencode-dev-team`, licencia, qué NO es (no SaaS, no plugin de memoria) | *"github.com/naxrowdev/opencode-dev-team — cloná, mirá el diff, decidí."* |

**Orden de prioridad (value/effort):** RICE no aplica —no hay datos de reach/impact ni analytics—; ICE sería intuición disfrazada de número. Las 10 secciones son obligatorias, así que el framework ordena **construcción y recorte**: P0 hero + instalación + CTA (la promesa y la acción), P1 pipeline + roster + problema (la prueba), P2 stack + skills + memoria + seguridad (objeciones). Si el tiempo aprieta, P2 se compacta, no se borra.

## 5. Criterios de éxito (sin analytics)
| # | Criterio | Cómo se mide |
|---|---|---|
| 1 | **Comprensión en <10 s** | Test con 5 personas del perfil primario: 4/5 dicen "es una config de OpenCode que instala un equipo de agentes" sin ayuda |
| 2 | **Acción posible** | 5/5 copian el comando de instalación; el botón "copiar" funciona y conserva saltos de línea (verificado en QA) |
| 3 | **Cero datos inventados** | Copy review: 0 números de usuarios, estrellas o benchmarks; toda cifra (12 agentes, 55 skills, 9 fases) es rastreable al repo `v0.2.1` |
| 4 | **Recorrido retenido** | 4/5 nombran 3 roles y 4 fases del pipeline después de scrollear una vez |
| 5 | **Stack claro antes del CTA** | 5/5 identifican el stack asumido antes de llegar al bloque de instalación |
| 6 | **Legible sin JS** | El contenido completo se lee con JS deshabilitado; un solo `<h1>`; LCP <2.5 s en móvil 3G rápida (Lighthouse local) |

Orden jerárquico: 1 y 3 son no negociables; 2 y 5 definen conversión; 4 y 6 son calidad de ejecución.

## 6. No-goals (explícitos)
- **Sin backend, sin base de datos, sin auth**: el sitio es estático; nada de Hono/Postgres acá.
- **Sin blog ni docs site**: una sola página; la documentación vive en el repo del kit.
- **Sin i18n**: solo español; el código y los identificadores quedan en inglés.
- **Sin tracking ni analytics**: ni GA, ni píxeles, ni cookies; el éxito se mide con tests de usabilidad y auditorías locales.
- **Sin CMS**: el contenido se edita en el repo y se versiona con git.
- **Sin formularios, newsletter ni comentarios**: no hay backend que los reciba.

## 7. Riesgos
| Riesgo | Mitigación |
|---|---|
| **Sobreventa**: el sitio promete un equipo autónomo y el kit es pre-1.0 | Declarar `v0.2.1` cerca del CTA y decir que el humano aprueba push/merge/deploy |
| **Instalación desactualizada** respecto del kit | Un único bloque de comandos, sin versión hardcodeada en la URL; QA lo re-verifica contra el tag antes de publicar |
| **Densidad**: 12 agentes + 55 skills + 9 fases abruman | Jerarquía hero → 3 mensajes → detalle; roster y skills colapsables (lo resuelve UX) |
| **Jerga**: "agente primario/subagente" no significa nada para la audiencia secundaria | Glosario inline de una línea en el hero; el pipeline se explica con verbos, no con sustantivos |
| **Drift**: el repo cambia y la página queda vieja | Datos versionados (12, 55, stack, permisos) en un solo módulo de contenido |
| **Alcance**: "landing" deriva en docs site | Este PRD es el contrato: cualquier sección nueva requiere actualizarlo |

## 8. Supuestos y open questions
Decisiones que tomé para no bloquear (revisar, no responder):
- **Deploy**: asumo hosting estático (GitHub Pages o Cloudflare Pages). No cambia el contenido; lo decide `architect`.
- **Demo**: asumo un GIF de ~10 s del pipeline en acción, sin audio ni video largo. Si no hay grabación decente, se omite: mejor nada que una demo mala.
- **Skills**: asumo mostrar 6–8 y linkear al repo, no listar las 55.
- **Versión**: asumo `v0.2.1 (pre-1.0)` visible en hero y footer; el sitio es parte de la validación para 1.0.
- **Dominio y licencia**: sin definir; no bloquean contenido ni copy.
- **Datos que faltan**: no hay métricas de adopción ni testimonios. No se inventan: el argumento es el proceso verificable en el repo.

## 9. Diff
v1.0 — creación. No existía PRD previo en `docs/product/`.
