# opencode-dev-team — web de presentación

Esta web es la landing de una sola página que presenta el kit `opencode-dev-team` v0.2.1: un equipo de 12 agentes para OpenCode con pipeline de 9 fases, stack fijo y permisos por rol. Es una SPA React 19 + Vite 8 + Tailwind 4 sin backend, con el contenido prerenderizado a HTML estático y hidratado en el cliente. La única interacción es el botón que copia los comandos de instalación.

El kit no vive en este repo. Su código, su documentación y sus decisiones están en [github.com/naxrowdev/opencode-dev-team](https://github.com/naxrowdev/opencode-dev-team).

## Requisitos

- Node.js 24
- npm 12

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala las dependencias declaradas en `package.json`. |
| `npm run dev` | Levanta el servidor de desarrollo de Vite. |
| `npm run build` | Compila los tipos, arma el bundle de cliente, compila el entry SSR y prerenderiza `dist/index.html`. |
| `npm run preview` | Sirve `dist/` con el servidor de preview de Vite. |
| `npm run test` | Corre la suite de Vitest. |
| `npm run lint` | Corre ESLint sobre el repo. |
| `npm run typecheck` | Verifica los tipos con `tsc -b --noEmit`. |
| `npm run check` | Encadena `lint`, `typecheck`, `test` y `check:budget`. |
| `npm run check:budget` | Mide el peso gzip de `dist/` y falla si excede el presupuesto. |

Dos detalles que afectan cómo leés los resultados:

- El script `test` tiene un `pretest` que ejecuta `npm run build`. Por eso `npm test` y `npm run test` regeneran el build antes de correr Vitest: los tests que leen `dist/index.html` nunca verifican un build viejo.
- `npm run dev` no prerenderiza: el navegador renderiza la SPA del lado del cliente. Para ver el HTML prerenderizado, corré `npm run build` y después `npm run preview`. `npm run check:budget` también lee `dist/`, así que necesita un build previo.

## Estructura del proyecto

```text
.
├── index.html               # plantilla Vite: <html lang="es-AR"> y el contenedor #root
├── src/
│   ├── App.tsx              # shell de la página: skip link, header, main, footer
│   ├── main.tsx             # entrada del cliente: hydrateRoot
│   ├── entry-server.tsx     # entrada SSR: renderToString(<App />)
│   ├── index.css            # tokens de Tailwind 4 y estilos base
│   ├── content/             # site.ts (fuente única del contenido) y types.ts
│   ├── components/          # Section, SiteHeader, SiteFooter, CopyButton, RichText
│   │   └── ui/              # primitivos de shadcn/ui copiados al repo
│   ├── lib/                 # cn() y el mapa de color por rol
│   └── sections/            # un componente por sección de la página
├── scripts/
│   ├── prerender.mjs        # inyecta el markup en dist/index.html
│   └── check-budget.mjs     # mide el peso gzip de dist/
├── tests/                   # Vitest + Testing Library sobre jsdom
├── docs/
│   ├── product/             # PRD de la landing
│   ├── design/              # tokens, layout, copy deck y checklist de accesibilidad
│   ├── plans/               # plan de implementación
│   └── context/             # estado y decisiones entre sesiones
├── vite.config.ts
├── vitest.config.ts
└── eslint.config.js
```

## Cómo funciona el prerender

`npm run build` encadena cuatro pasos:

1. `tsc -b` verifica los tipos antes de compilar.
2. `vite build` genera el bundle de cliente y `dist/index.html` con un contenedor `<div id="root"></div>` vacío.
3. `vite build --ssr src/entry-server.tsx --outDir dist-ssr` compila la entrada de servidor, que expone `render()` y devuelve el markup de `<App />` con `renderToString`.
4. `node scripts/prerender.mjs` importa esa entrada, llama a `render()` y reemplaza el contenedor vacío por `<div id="root">{markup}</div>` dentro de `dist/index.html`. Si el marcador no aparece, el script falla con código de salida 1.

En el cliente, `src/main.tsx` llama a `hydrateRoot` sobre ese mismo contenedor: React no reemplaza el HTML, lo hidrata.

El motivo es la lectura sin JavaScript. El texto de las diez secciones ya está en el HTML que descarga el navegador, así que se lee completo aunque el script no cargue o esté bloqueado. La hidratación solo agrega el comportamiento que falta: el botón de copiar.

## Dónde vive el contenido

Todo el contenido de la página sale de un único módulo, `src/content/site.ts`: el copy de cada sección, los 12 roles con su color, las 9 fases, el stack, las skills destacadas, los permisos, los comandos de instalación y los metadatos del kit (`version: 'v0.2.1'`, `stage: 'pre-1.0'`, la URL del repo). `src/content/types.ts` define las formas de esos datos.

La regla es una sola: si cambia el copy o los datos del kit, editás `src/content/site.ts`, no los componentes. Las secciones de `src/sections/` renderizan lo que reciben; el único texto literal en ellas es el `aria-label` del bloque de comandos.

`tests/content.test.ts` fija los invariantes de esa fuente: 12 roles con id y color únicos, 9 fases, 2 compuertas, 13 tecnologías de stack, 8 skills destacadas, 6 comandos denegados, 5 aprobaciones y el bloque de comandos de instalación exacto que copia el botón.

## Presupuesto de performance

`scripts/check-budget.mjs` mide el peso gzip de `dist/`, porque eso es lo que descarga el navegador:

| Recurso | Límite | Qué mide |
|---|---|---|
| HTML | ≤ 30 KB | `dist/index.html`, con el contenido ya prerenderizado. |
| JS | ≤ 120 KB | Suma de `dist/assets/*.js`. |
| CSS | ≤ 14 KB | Suma de `dist/assets/*.css`. |

Para verificarlo, corré `npm run check:budget`. El script imprime una línea por recurso con el tamaño medido en KB gzip y el límite, y sale con código 1 si alguno lo excede.

Los límites y su fundamento están en `docs/design/2026-11-07-landing-design.md` (sección 6.1).

## Accesibilidad

Lo que la página implementa:

- Un solo `<h1>`, el del hero; cada sección aporta su `<h2>`.
- `<html lang="es-AR">` en `index.html`.
- Foco visible en todos los elementos interactivos: `:focus-visible` aplica `outline: 2px solid var(--ring)` con `outline-offset: 2px` (`src/index.css`).
- El botón de copiar es un `<button type="button">` nativo: Enter y Espacio funcionan sin handlers propios.
- El resultado de la copia se anuncia con una región `role="status"` que está siempre montada en el DOM.
- El contenido se lee completo sin JavaScript, y la sección de instalación incluye un `<noscript>` con la alternativa manual para copiar.
- Un skip link "Saltar al contenido" apunta al `<main id="contenido">`.

La verificación de esta lista es manual: no hay Playwright en esta versión. La cobertura automatizada es la de Vitest, sobre los componentes y sobre el `dist/index.html` prerenderizado (`tests/prerender.test.ts`). Para el smoke, corré `npm run build`, después `npm run preview` y recorré la página con teclado: el orden de tabulación esperado, el anillo de foco y el anuncio del estado de copia están especificados en `docs/design/2026-11-07-landing-design.md` (secciones 5.2, 5.3 y 5.5).

## Qué no incluye

- Backend, base de datos ni autenticación.
- Router: es una sola página con anclas.
- i18n: el sitio está en español rioplatense.
- Analytics, cookies ni píxeles.
- CMS: el contenido se edita en el repo y se versiona con git.
- Formularios, newsletter o comentarios.
- Playwright: la versión actual no trae suite de navegador.
- Deploy: no hay configuración de despliegue en el repo. `npm run build` deja los archivos estáticos en `dist/`, con rutas relativas (`base: './'` en `vite.config.ts`).

## Contribución

El repo sigue el flujo definido en `AGENTS.md`: descubrimientos, análisis, diseño, implementación, verificación y revisión, con el stack fijo y los gates de calidad de ese archivo. El gate mínimo antes de pedir revisión es:

```bash
npm run lint && npm run typecheck && npm run test
```

Los commits usan mensajes convencionales (`feat|fix|test|refactor|chore|docs|ci|db(scope): mensaje`).
