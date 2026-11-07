# Decisions log

Append-only. Fecha, decisión y argumento. La memoria entre sesiones es el repo, no un servicio.

## 2026-11-07

**Prerender propio en vez de SPA client-only.** `vite build` → `vite build --ssr` → `scripts/prerender.mjs` inyecta el markup de `renderToString` en `dist/index.html`, y `hydrateRoot` lo hidrata. El PRD exige que el contenido se lea sin JavaScript; el prerender lo cumple sin sumar un framework de SSG fuera del stack.

**Pipeline reducido para esta landing.** Sin `business-analyst`, `architect` ni `backend-dev`: la página no tiene API, persistencia ni entidades. El PRD, el design doc y el plan reemplazan las historias/tickets y los ADR por criterios de aceptación medibles en el design doc.

**Primitivos shadcn copiados a mano, sin CLI.** El CLI de shadcn es interactivo y agrega archivos que nadie usa. Quedaron `button` y `alert`; `badge`, `card` y `separator` se borraron en la revisión por minimalismo.

**Sin Playwright en v1.** Lo automatizable de la página está cubierto por 55 tests de Vitest sobre el DOM y sobre el HTML prerenderizado, más un gate de performance. El recorrido de teclado y las pruebas de usabilidad con personas quedan manuales.

**Roster: 12 tarjetas iguales en grilla de 3×4.** El design original pedía que `tech-lead` ocupara 2 columnas; con 12 tarjetas eso deja una fila huérfana. El orquestador se distingue con superficie, color de rol y etiqueta, no con ancho.

**Comando 3 de instalación corregido a `sh opencode-dev-team/kit/selftest.sh`.** Verificado contra `kit/include.txt`: el instalador no copia `kit/` al proyecto destino, así que `sh kit/selftest.sh` fallaba. Era un bug de conversión en el copy.

**Permisos de los agentes del kit: orden corregido.** En OpenCode V2 gana la última regla que coincide; los archivos de agente tenían `edit *: deny` después de los `allow` por carpeta, lo que anulaba la escritura de todos los subagentes. Se movió la regla amplia al principio de cada lista.

**Las tareas 4–7 del plan las implementó el tech-lead.** El proveedor de modelos alcanzó su límite de uso a mitad de la tarea del `frontend-dev`; para no bloquear al usuario, las secciones restantes, sus tests y el prerender se implementaron en la sesión principal, respetando el mismo plan y el mismo TDD.
