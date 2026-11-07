# Diseño — Landing de presentación de `opencode-dev-team`

_2026-11-07 · v1.0 · ux-designer · Estado: listo para plan de implementación_
_Fuente de contenido: `docs/product/2026-11-07-web-presentacion-prd.md` (contrato: 10 secciones, criterios de éxito, no-goals)._
_Fuente de verdad técnica: `AGENTS.md` del kit `v0.2.1`. Verificado en este repo: 12 archivos en `.opencode/agents/`, 55 `SKILL.md` en `.opencode/skills/`._

**Alcance de este documento:** decisiones visuales, valores de token, estructura por sección y copy final. No contiene código React ni CSS de implementación. Toda pantalla se especifica por flujo y por estado.

## Decisiones que este documento fija

| # | Decisión | Por qué |
|---|---|---|
| D1 | El cromo de la página es **acromático**: el único color pertenece a los 12 roles | 12 colores saturados + un acento de marca = ruido. Si el color identifica roles, el resto tiene que callarse para que el color signifique algo. |
| D2 | **Cero webfonts**: grotesca del sistema + monoespaciada del sistema | Elimina FOUT/CLS, 0 KB de fuentes y el riesgo de licencia. El carácter viene de la escala, el tracking y la regla mono/sans, no de una familia comprada. |
| D3 | **Nada de tarjetas con sombra**: paneles con hairline, un solo radio de 2px | Evita el kit de tarjetas SaaS. La retícula es la que estructura, no la elevación. |
| D4 | **Sin interactividad salvo copiar**: no hay tabs, acordeones, modales ni carruseles | El contenido se lee completo sin JS (criterio 6 del PRD) y se eliminan trampas de teclado. |
| D5 | **Sin imágenes**: ni GIF de demo, ni screenshots, ni ilustraciones | El pipeline y el roster son tipografía + color: 0 KB de imagen, LCP = texto. El PRD permitía omitir la demo. |
| D6 | El hero muestra el roster como **placa de 12 colores**, no como captura de producto | Materializa el activo central sin depender de un asset que se desactualiza. |
| D7 | Datos versionados en **un módulo de contenido único** (12 agentes, 9 fases, 8 skills destacadas, stack, comandos) | Mitiga el riesgo "drift" del PRD §7. |

---

## 1. Concepto visual

**La página es la ficha técnica de un equipo, no un folleto de producto.** El visitante entra a un documento que un equipo de ingeniería escribió para sí mismo: fondo grafito, retícula de 12 columnas visible como hairlines de 1px, esquinas de 2px, cero sombras, cero degradados. La tipografía hace un solo trabajo cada vez — una grotesca del sistema para lo que lee un humano, una monoespaciada para lo que lee una máquina (identificadores, rutas, comandos, hex, versiones). Esa división no es estética: es información. Cuando aparece mono, el lector sabe que ese texto se puede copiar tal cual.

**El color es un identificador, no una decoración.** El cromo (fondo, texto, bordes, botones, foco) es gris; el único color saturado de la página son los 12 hex del kit. Aparecen en exactamente tres lugares: la placa de 12 celdas del hero, el borde superior y el chip de fase de cada tarjeta del roster, y el nodo de cada fase del pipeline. Nunca como texto, nunca como fondo grande, nunca como gradiente. El botón primario es blanco roto sobre grafito: la acción más fuerte de la página no compite cromáticamente con ningún rol. El resultado es que los 12 colores, que en cualquier otra landing serían decoración, acá son el sistema de identidad completo.

**La estructura es la marca.** La retícula de 12 columnas del layout coincide con los 12 roles: el hero dibuja esas columnas como líneas al 6% de opacidad detrás del titular, y el roster las ocupa de a cuatro. El pipeline es una lista ordenada real (nueve fases, con nodo de color y compuerta de verificación), porque ahí sí hay secuencia; en ningún otro lado hay numeritos decorativos. Hay un solo gesto de movimiento: las 12 celdas del hero aparecen con un escalonado de 30 ms al cargar. Nada más se mueve salvo que el usuario actúe (hover, foco, copiar).

---

## 2. Tokens de diseño

### 2.1 Valores crudos (`:root`)

```css
:root {
  color-scheme: dark;              /* scrollbars y controles nativos en oscuro */

  /* Superficies */
  --background:     #0E1216;       /* grafito azulado, no negro puro */
  --surface:        #171D24;       /* relleno sutil: bloque de código, tarjeta destacada */
  --surface-raised: #1D242C;       /* hover de superficie, ficha técnica */

  /* Texto */
  --foreground:     #E8EDF2;
  --muted:          #9AA6B2;       /* cuerpos secundarios, descripciones */
  --faint:          #7C8794;       /* metadatos: hex, versiones, comentarios de código */

  /* Líneas (hairlines) */
  --line:           #333D48;       /* separador estándar: 1px, visible sin gritar */
  --line-strong:    #4E5A68;       /* marco del bloque de código, hover de borde, foco de panel */

  /* Acción (acromática por decisión D1) */
  --primary:            #E8EDF2;
  --primary-foreground: #0E1216;
  --primary-hover:      #FFFFFF;
  --ring:               #E8EDF2;

  /* Estados no usados en esta página (mapeo shadcn completo) */
  --destructive: #F87171;          /* reservado; no hay acciones destructivas */

  /* Roles: hex idénticos al kit. NO editar: son la identidad del producto */
  --role-tech-lead:         #A855F7;
  --role-product-owner:     #F97316;
  --role-business-analyst:  #EAB308;
  --role-architect:         #3B82F6;
  --role-ux-designer:       #EC4899;
  --role-backend-dev:       #10B981;
  --role-frontend-dev:      #06B6D4;
  --role-qa-engineer:       #84CC16;
  --role-code-reviewer:     #EF4444;
  --role-security-engineer: #F43F5E;
  --role-devops-sre:        #64748B;
  --role-tech-writer:       #D946EF;
  --on-role:                #0E1216;  /* texto sobre relleno de rol */
  --on-role-invert:         #FFFFFF;  /* excepción única: devops-sre */
}
```

### 2.2 Mapeo a Tailwind 4 (`@theme inline`, convención shadcn)

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--background);          /* los paneles no llevan relleno */
  --color-card-foreground: var(--foreground);
  --color-popover: var(--surface-raised);
  --color-popover-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--surface);
  --color-secondary-foreground: var(--foreground);
  --color-muted: var(--surface);
  --color-muted-foreground: var(--muted);
  --color-accent: var(--surface-raised);
  --color-accent-foreground: var(--foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--line);
  --color-border-strong: var(--line-strong);
  --color-input: var(--line-strong);
  --color-ring: var(--ring);
  --color-surface: var(--surface);
  --color-surface-raised: var(--surface-raised);
  --color-faint: var(--faint);

  --color-role-tech-lead:         var(--role-tech-lead);
  --color-role-product-owner:     var(--role-product-owner);
  --color-role-business-analyst:  var(--role-business-analyst);
  --color-role-architect:         var(--role-architect);
  --color-role-ux-designer:       var(--role-ux-designer);
  --color-role-backend-dev:       var(--role-backend-dev);
  --color-role-frontend-dev:      var(--role-frontend-dev);
  --color-role-qa-engineer:       var(--role-qa-engineer);
  --color-role-code-reviewer:     var(--role-code-reviewer);
  --color-role-security-engineer: var(--role-security-engineer);
  --color-role-devops-sre:        var(--role-devops-sre);
  --color-role-tech-writer:       var(--role-tech-writer);
  --color-on-role:                var(--on-role);
  --color-on-role-invert:         var(--on-role-invert);

  /* Radios: un solo valor en toda la página */
  --radius-sm: 2px;
  --radius-md: 2px;
  --radius-lg: 2px;
  --radius-xl: 2px;

  /* Sombras: ninguna. El único anillo es el de foco. */
  --shadow-xs: none;
  --shadow-sm: none;
  --shadow-md: none;
  --shadow-lg: none;
}
```

### 2.3 Tipografía

Una familia por trabajo. Sin `@font-face`.

```css
@theme {
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
               "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", "JetBrains Mono",
               Menlo, Consolas, "Liberation Mono", monospace;

  --text-display: clamp(2.5rem, 7.5vw, 4.25rem);   /* 40px @390 → 68px @1440 */
  --text-display--line-height: 0.98;
  --text-display--letter-spacing: -0.035em;
  --text-display--font-weight: 600;

  --text-h2: clamp(1.75rem, 3.4vw, 2.5rem);        /* 28px @390 → 40px @1440 */
  --text-h2--line-height: 1.08;
  --text-h2--letter-spacing: -0.02em;
  --text-h2--font-weight: 600;

  --text-h3: 1.25rem;                              /* 20px */
  --text-h3--line-height: 1.3;
  --text-h3--letter-spacing: -0.01em;
  --text-h3--font-weight: 600;

  --text-lede: 1.125rem;                           /* 18px */
  --text-lede--line-height: 1.6;
  --text-lede--letter-spacing: -0.005em;

  --text-body: 1rem;                               /* 16px */
  --text-body--line-height: 1.65;

  --text-small: 0.875rem;                          /* 14px */
  --text-small--line-height: 1.55;

  --text-micro: 0.8125rem;                         /* 13px */
  --text-micro--line-height: 1.5;

  --text-code: 0.875rem;                           /* 14px mono */
  --text-code--line-height: 1.75;
}
```

| Rol | Token | Tamaño / interlínea | Tracking | Peso | Dónde |
|---|---|---|---|---|---|
| Titular | `text-display` | 40 → 68px / 0.98 | -0.035em | 600 | h1 |
| Sección | `text-h2` | 28 → 40px / 1.08 | -0.02em | 600 | h2 ×10 |
| Subbloque | `text-h3` | 20px / 1.3 | -0.01em | 600 | h3 |
| Entrada | `text-lede` | 18px / 1.6 | -0.005em | 400 | bajada de sección |
| Cuerpo | `text-body` | 16px / 1.65 | 0 | 400 | párrafos |
| Secundario | `text-small` | 14px / 1.55 | 0 | 400 | descripciones, ítems |
| Metadato | `text-micro` | 13px / 1.5 | 0 | 400 | hex, rutas, owners |
| Código | `text-code` | 14px / 1.75 | 0 | 400 | bloque de comandos |

**Reglas de composición**
- Medida máxima de lectura: **62ch** (lede 52ch, h1 34ch). Nunca texto justificado: alineación a la izquierda en toda la página.
- Mono **solo** para texto de máquina: identificadores de agente (`backend-dev`), rutas, comandos, hex, versiones, conteos. No se usa mono para titulares ni para "dar tono técnico".
- Prohibido en esta página: mayúsculas sostenidas, itálica, subrayado decorativo, números de sección tipo "01/02" fuera del pipeline, flechas "→" al final de links.
- Números siempre con `font-variant-numeric: tabular-nums` (conteos, versiones).

### 2.4 Espaciado, retícula, radios, sombras

```css
@theme {
  --spacing: 0.25rem;                                  /* base 4px */
  --space-section: clamp(4.5rem, 8vw, 8rem);           /* 72px móvil → 128px desktop */
  --space-block: 2rem;                                 /* entre bloques internos (32px) */
  --space-item: 1rem;                                  /* 16px */
  --gutter: 1.5rem;                                    /* 24px, gap de columnas desktop */
  --gutter-mobile: 1rem;                               /* 16px */
  --container-page: 70rem;                             /* 1120px */
  --page-padding: clamp(1.25rem, 4vw, 2.5rem);         /* 20px → 40px */
}
```

| Aspecto | Valor |
|---|---|
| Retícula | 12 columnas desktop / 4 móvil, gap 24 / 16 |
| Contenedor | 1120px máximo, centrado |
| Padding de sección | `--space-section` arriba y abajo |
| Separación entre secciones | hairline 1px `--line`, ancho del contenedor (no full-bleed) |
| Altura de fila del pipeline | 72px desktop / auto móvil |
| Altura mínima de tarjeta de rol | 152px desktop / 120px móvil |
| Radios | **2px en todo.** Sin excepciones, sin pills, sin círculos |
| Sombras | **Ninguna.** Sin `box-shadow`, sin `backdrop-filter`, sin `filter: drop-shadow` |
| Bordes | 1px `--line`; énfasis 1px `--line-strong`; acento de rol 4px superior |

### 2.5 Movimiento

```css
@theme {
  --duration-fast: 120ms;    /* hover, press, cambio de label */
  --duration-base: 200ms;    /* cambio de estado (copiar → copiado) */
  --duration-slow: 420ms;    /* entrada de la placa del hero */
  --stagger-cell: 30ms;      /* retardo acumulado por celda (máx. 330ms) */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}
```

**Reglas**
1. **Un solo gesto no provocado por el usuario:** la placa del hero entra con opacidad 0→1 y `translateY(8px)→0`, 420ms, escalonado de 30ms por celda. Ocurre una vez, al cargar. No se repite al scrollear.
2. Todo lo demás responde a una acción: hover de link (120ms, color y grosor de subrayado), press de botón (120ms, `scale(0.99)` **no**, solo cambio de color), feedback de copiado (200ms de opacidad).
3. Se anima **solo** `opacity` y `transform`. Nunca layout, nunca `height`, nunca `filter`.
4. Prohibido: parallax, reveals por scroll, contadores animados, transiciones de tarjeta al hover con elevación, `scroll-behavior: smooth` global (sí en anchors, bajo `prefers-reduced-motion: no-preference`).
5. `prefers-reduced-motion: reduce` ⇒ sin escalonado, sin `translateY`, duraciones a 0.01ms y `scroll-behavior: auto`.

---

## 3. Layout sección por sección

### 3.0 Modelo de contenido (fuente única)

Un módulo de datos versionado alimenta las 10 secciones; la página no repite strings. Forma mínima:

| Entidad | Campos | Consumido por |
|---|---|---|
| `site` | `version: "v0.2.1"`, `stage: "pre-1.0"`, `repoUrl`, `repoLabel` | §1 masthead, §10, footer |
| `stats[4]` | `value`, `label` | §1 |
| `agents[12]` | `id`, `role`, `phase`, `hex`, `orchestrator?: true` | §1 placa, §4 |
| `phases[9]` | `name`, `goal`, `owner[]`, `artifact`, `gate?: string` | §3 |
| `stack[13]` | `tech`, `layer`, `note` | §5 |
| `skillsHighlighted[8]` | `name`, `description` | §6 |
| `skillsTotal: 55` | — | §1, §6 |
| `memory[4]` | `title`, `ref`, `body` | §7 |
| `permissions` | `denied[6]`, `approvals[5]` | §8 |
| `install` | `prereq`, `commands[]`, `notes[]` | §9 |

Componentes shadcn usados: `Button`, `Alert`. `Badge`, `Card` y `Separator` se borraron durante la implementación: ningún elemento los necesitaba y el resto del sitio se arma con `div` + clases semánticas. **No se usan** `Tabs`, `Accordion`, `Dialog`, `Sheet`, `Tooltip`, `Carousel`, `Table`: agregan estado, JS o trampas de teclado sin aportar contenido.

### 3.1 §1 — Hero

**Intención:** en menos de 10 segundos: qué es, para quién, cuánto pesa (versión) y qué hago. Es la única sección con dos llamadas a la acción.

**Estructura (desktop, 12 col):** masthead 1–12 (wordmark izquierda; versión + link GitHub derecha; hairline inferior). h1 cols 1–7. Bajada cols 1–6. Glosario inline cols 1–6 con regla vertical de 2px a la izquierda (marca de cita, no decoración). CTA + link secundario cols 1–6. Tres mensajes de apoyo cols 1–7 en tres columnas con hairline superior. Fila de conteos cols 1–7, mono, separadas por hairlines verticales. Placa de 12 celdas cols 8–12, 4×3, alineada al top del h1.

```
┌ container 1120 ────────────────────────────────────────────────────────────┐
│ opencode-dev-team                                 v0.2.1 pre-1.0   GitHub  │
├────────────────────────────────────────────────────────────────────────────┤
│ Tu próximo proyecto no necesita        ┌────┬────┬────┬────┐               │
│ más prompts.                           │    │    │    │    │               │
│ Necesita un equipo.                    ├────┼────┼────┼────┤   placa 4×3   │
│                                        │    │    │    │    │   12 roles    │
│ Una configuración, doce roles: …       ├────┼────┼────┼────┤   (aria-hidden)│
│                                        │    │    │    │    │               │
│ ▐ Agente primario: reparte…            └────┴────┴────┴────┘               │
│                                                                            │
│ [ Abrir el repo en GitHub ]   Ver los comandos                             │
│                                                                            │
│ ────────────────┬───────────────────┬──────────────────────────────        │
│ Equipo, no prompt│ El proceso está   │ Aburrido donde importa               │
│ …                │ cableado…         │ …                                    │
│ 12 roles │ 9 fases │ 55 skills │ 0 plugins externos                          │
└────────────────────────────────────────────────────────────────────────────┘
```

**Mobile (390px):** masthead compacto (versión + GitHub en una sola línea de 32px). h1 → bajada → CTA (ancho completo) → link secundario centrado a la izquierda → **placa pasa a tira 6×2 de 44px de alto** (más ancho, menos altura) → tres mensajes apilados con hairline superior → fila de conteos en dos líneas.

**Jerarquía:** h1 (68px, peso 600) ≫ placa (color, masa) > CTA (blanco sólido) > bajada (18px muted) > el resto a 14/13px.

**Estados / edge:** sin JS, idéntico (nada depende de JS). Fuentes bloqueadas: idéntico (stack del sistema). Placa sin datos: no aplica (datos versionados); si faltara un rol, el hueco se renderiza con `--surface` y borde punteado — nunca se colapsa la retícula. 200% zoom: la placa baja a 3 columnas por debajo de 640px efectivos.

**Criterio auditable:** a 390×844, sin scroll, se ven el nombre del producto, la frase "doce roles", la versión y el CTA. Los 3 mensajes de apoyo existen como texto (no como imagen) y los 4 conteos coinciden con el repo.

### 3.2 §2 — Problema

**Intención:** nombrar el dolor con precisión, sin caricatura. Es la sección que justifica el resto.

**Estructura:** h2 cols 1–4, bajada cols 1–4, cierre en 18px cols 1–4. Tres síntomas cols 6–12, apilados, cada uno con hairline superior de 1px, icono lucide 20px muted (`History`, `CircleDashed`, `AlertTriangle`), h3 y 1–2 líneas.

```
│ Tenés un modelo buenísimo   │ ───────────────────────────────────────────── │
│ y cero proceso.             │ 🕘 El contexto se pierde entre sesiones       │
│                             │    Abrís otra sesión y el agente no sabe…     │
│ Cada feature arranca de     │ ───────────────────────────────────────────── │
│ cero. No porque el modelo   │ ◌  La calidad queda a criterio del momento   │
│ falle…                      │    Sin gates, el review es lo que el agente…  │
│                             │ ───────────────────────────────────────────── │
│ No falta más IA.            │ ⚠  El agente puede tocar lo irreversible     │
│ Falta proceso que se repita.│    Un git push de más, un .env leído…         │
```

**Mobile:** h2 → bajada → los 3 síntomas → cierre. Iconos alineados a la izquierda, texto a 16px.

**Edge:** los títulos de síntoma caben en 2 líneas a 320px; sin truncado con ellipsis (nunca).

**Criterio auditable:** los tres dolores del PRD §1 aparecen nombrados con las mismas palabras clave: contexto, criterio/calidad, irreversible.

### 3.3 §3 — Pipeline

**Intención:** probar que hay método. Cada fase con dueño y artefacto, y dos compuertas explícitas.

**Estructura:** h2 + bajada cols 1–5. Lista ordenada `<ol>` cols 6–12. Cada fila es una mini-retícula de 4 campos: fase (2 col), objetivo en verbo (4), dueño (3, mono + punto de color 6px), artefacto (3, 13px muted). Riel vertical de 1px a la izquierda de la lista con un nodo cuadrado de 6px en el color del dueño por fila. Filas separadas por hairline. Compuertas después de "Planificar" y después de "Verificar": fila completa con icono `Lock` 16px y texto en mono 13 muted, con hairline superior más fuerte (`--line-strong`).

```
│ Nueve fases.          │ │ ● Descubrimiento  Entender el problema   product-owner      PRD en docs/
│ Cada una con dueño.   │ │ ───────────────────────────────────────────────────────────────────────
│                       │ │ ● Análisis        Escribir requisitos    business-analyst   specs Gherkin
│ El pipeline no es una │ │ ● Diseño          Definir arquitectura   architect          contratos + ADR
│ sugerencia en un      │ │ ● UX              Diseñar los flujos     ux-designer        wireframes + a11y
│ README…               │ │ ● Plan            Asignar el trabajo     tech-lead          plan verificable
│                       │ │ ┄┄ 🔒 Gate: sin plan aprobado no se escribe código ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
│                       │ │ ● Implementación  Construir              backend-dev …      código + tests
│                       │ │ ● Verificación    Correr la suite        qa-engineer        output real
│                       │ │ ● Revisión        Revisar en 2 ejes      code-reviewer …    hallazgos + fixes
│                       │ │ ● Entrega         Publicar y documentar  devops-sre …       CI + README
```

**Mobile:** el riel se mantiene a 8px del borde; cada fila pasa a 2 líneas (fase + dueño arriba; objetivo y artefacto abajo, 13px). Las compuertas ocupan el ancho completo, con el texto a 13px.

**Edge:** a 1024px los 4 campos se comprimen: el artefacto baja debajo del objetivo (breakpoint 1080) antes que el texto empiece a partirse en 3 líneas. Sin JS, idéntico.

**Criterio auditable:** 9 filas, 9 dueños visibles, 2 compuertas; los nombres de fase y dueño coinciden con `AGENTS.md`; un lector puede nombrar 4 fases después de un scroll.

### 3.4 §4 — Roster de 12

**Intención:** materializar el equipo. Es el activo visual central y el que más densidad soporta: 12 tarjetas escaneables en una sola vista.

**Estructura:** h2 + bajada cols 1–6; contador `12 roles · 1 orquestador + 11 subagentes` en mono 13 cols 10–12, alineado a la línea base del h2. Grilla de 12 cols × 3 filas: 4 tarjetas por fila de 3 cols cada una. `tech-lead` va primero y se distingue con fondo `--surface-raised`, borde superior en su color y etiqueta mono "orquestador".

> **Corrección (2026-11-07, implementación):** la versión original de este documento pedía que `tech-lead` ocupara 2 columnas. Con 12 tarjetas y 13 slots la retícula deja una fila huérfana de una sola tarjeta. Se resuelve con 12 tarjetas iguales (3 filas de 4) y la jerarquía del orquestador se resuelve con superficie, color y etiqueta, no con ancho.

**Anatomía de tarjeta** (`Card`, radio 2px, borde 1px `--line`, sin sombra, padding 20px, min-height 152px):

```
┌──────────────────────────────┐
│▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬│  ← 4px en el color del rol
│ backend-dev                  │  ← mono 14 / 600 / foreground
│ Hono, Drizzle, Better Auth,  │  ← sans 14 / muted / máx. 2 líneas
│ Postgres                     │
│                              │
│ [Implementación]    #10B981  │  ← chip relleno del rol (13/600, token text-micro) + hex mono 13 faint
└──────────────────────────────┘
```

**Mobile:** 1 columna; `tech-lead` primero, ancho completo; min-height 120px; el chip y el hex comparten la última línea (wrap permitido).

**Tablet (640–1023):** 2 columnas.

**Leyenda obligatoria debajo de la grilla:** una línea a 13px muted — el chip marca la fase; el color, el rol. Sin esto el chip es ambiguo.

**Edge:** ningún rol es link (economía de tabuladores: 12 links diluyen el CTA). Un solo link al final de la sección: "Ver los 12 agentes en el repo". Nombres largos (`security-engineer`, 17 chars) caben a 320px en mono 13 (≈133px). Hex siempre en mayúsculas.

**Criterio auditable:** 12 tarjetas con 4 campos cada una (id, rol, fase, hex); el hex de cada tarjeta coincide carácter por carácter con la tabla de `AGENTS.md`.

### 3.5 §5 — Stack fijo

**Intención:** filtrar rápido. Quien no comparte stack se va acá, no en el primer PR.

**Estructura:** h2 + bajada cols 1–4. A la derecha, cols 5–12, lista de definiciones en **dos columnas** (7 + 6 ítems), cada ítem: `dt` en mono 14 foreground (la tecnología) + `dd` en sans 13 muted (capa y para qué). Hairline entre filas. Se implementa como `<dl>`, no como `<table>`: mismo contenido, sin scroll horizontal a 320px y sin gimnasia semántica en mobile.

```
│ El stack no se       │ TypeScript (strict, ESM)   │ React 19 + Vite
│ negocia en cada      │ Lenguaje: cliente y servidor│ SPA, sin Next.js
│ tarea.               │ ───────────────────────────│ ──────────────────────────
│                      │ Hono                       │ React Hook Form
│ AGENTS.md fija las   │ Backend: rutas y middleware│ Formularios con resolver Zod
│ tecnologías y        │ ───────────────────────────│ ──────────────────────────
│ stack-guard las hace │ …                          │ …
│ cumplir.             │                            │
│                      │ ⓘ Cambiar el stack requiere un ADR aprobado por una persona.
```

**Mobile:** una columna, 13 ítems.

**Edge:** ningún ítem se abrevia ("TanStack Query + Axios" entero). El callout usa `Alert` con icono `Scale` (o `Info`), 14px, borde izquierdo 2px `--foreground`.

**Criterio auditable:** 13 filas; un lector identifica Hono/PostgreSQL/Drizzle/React 19 antes de llegar al bloque de instalación (posición 5 de 10).

### 3.6 §6 — Skills (8 de 55)

**Intención:** mostrar profundidad sin caja negra, y que 8 ítems se lean de un vistazo.

**Estructura:** h2 + bajada cols 1–5; contador `8 de 55` en mono 13 cols 11–12. Lista de 8 entradas en 2 columnas (4 + 4), **sin tarjetas**: cada entrada es nombre en mono 14 foreground + descripción 13 muted, con hairline inferior y 14px de padding vertical. Densidad ≈ 48px por ítem.

```
│ Cincuenta y cinco skills  │ stack-guard                      │ code-simplification
│ en el repo.               │ Frena cualquier dependencia…      │ El mejor código es el que…
│ Sin caja negra.           │ ────────────────────────────────  │ ──────────────────────────────
│                           │ code-review                      │ playwright-best-practices
│ Cada skill es un          │ Revisión en dos ejes…            │ E2E sin flakiness…
│ SKILL.md versionado…      │ ────────────────────────────────  │ ──────────────────────────────
│                                    8 de 55        Ver las 55 skills en el repo
```

**Mobile:** una columna, 8 ítems; `overflow-wrap: anywhere` para `playwright-best-practices` y `verification-before-completion`.

**Edge:** no hay acordeón ni "ver más". Ocho es el número máximo; si se quiere sumar una novena, se saca otra (el PRD pide 6–8).

**Criterio auditable:** los 8 nombres existen como directorios en `.opencode/skills/`; el total declarado (55) coincide con el conteo de `SKILL.md`.

### 3.7 §7 — Memoria, minimalismo, tokens

**Intención:** responder la objeción "¿y el contexto entre sesiones?" con un archivo, no con una promesa.

**Estructura:** h2 + bajada cols 1–6. Cuatro bloques en 2×2 (cols 1–6 y 7–12), cada uno con hairline superior, título h3 (20px), referencia en mono 13 faint (ruta o token) y 2–3 líneas a 14 muted. Entre el h2 y los bloques, una línea de flujo en mono 13: `sesión 1 → STATE.md → sesión 2`.

```
│ La memoria vive en         │ ─────────────────────────────│ ─────────────────────────────
│ docs/context/,             │ Estado                       │ Minimalismo
│ no en un plugin.           │ docs/context/STATE.md        │ skill: code-simplification
│                            │ Se inyecta al arrancar…      │ Empuja el diff más corto…
│ El estado es un archivo…   │ ─────────────────────────────│ ─────────────────────────────
│                            │ Decisiones                   │ Tokens
│ sesión 1 → STATE.md → …    │ docs/context/decisions-log.md│ tool_output + compaction
```

**Mobile:** 4 bloques apilados; el flujo se parte en 2 líneas si no entra.

**Edge:** el flujo usa flechas reales porque hay secuencia. Sin JS, idéntico.

**Criterio auditable:** aparecen literalmente `docs/context/STATE.md`, `docs/context/decisions-log.md`, `tool_output`, `compaction` y los umbrales 1000 líneas / 32 KB / ~25k tokens.

### 3.8 §8 — Seguridad y permisos

**Intención:** bajar el miedo. Mostrar el default deny como característica, no como letra chica.

**Estructura:** h2 + bajada cols 1–5. Dos paneles lado a lado cols 1–6 y 7–12 (`Card`, borde 1px, radio 2px, sin relleno): "Denegado por defecto" (icono `Ban`) con 6 filas en mono 14; "Requiere tu aprobación" (icono `UserCheck`) con 5 filas. Cada fila con hairline inferior y 40px de alto. Contador en el título del panel en mono 13 (`6` / `5`). Cierre debajo, 18px: el equipo prepara; vos ejecutás lo irreversible.

```
│ git push viene            │ ┌ Denegado por defecto   6 ┐ ┌ Requiere tu aprobación 5 ┐
│ denegado.                 │ │ ⊘ git push             │ │ ⊘ .env                  │
│ Vos aprobás lo            │ │ ⊘ sudo                 │ │   merge                 │
│ irreversible.             │ │ ⊘ npm publish          │ │   deploy                │
│                           │ │ ⊘ docker push          │ │   migraciones destructivas│
│ Los permisos son por rol… │ │ ⊘ kubectl delete       │ │   secretos reales       │
│                           │ │ ⊘ terraform apply/…    │ └─────────────────────────┘
```

**Mobile:** paneles apilados; las filas bajan a 36px.

**Jerarquía:** el estado se comunica con icono + texto, nunca con color (el color pertenece a los roles; además cumple "no depender solo del color"). Iconos a `--muted`, texto a `--foreground` mono.

**Edge:** `terraform apply / destroy` se mantiene como una fila con las dos formas separadas por barra, porque es un único permiso.

**Criterio auditable:** los 6 comandos denegados del PRD aparecen textualmente; `.env` figura como confirmación explícita, no como denegado.

### 3.9 §9 — Instalación

**Intención:** convertir intención en acción con la menor fricción posible. Es el punto de conversión medido en el criterio 2.

**Estructura:** h2 + bajada + prerrequisitos + microcopy cols 1–5. Bloque de código cols 6–12: fondo `--surface`, borde 1px `--line-strong`, padding 20px, mono 14/1.75, comentarios en `--muted` y comandos en `--foreground`. Botón "Copiar comandos" arriba a la derecha del bloque, 44px de alto, estilo primario. Debajo del bloque, 3 notas a 13px muted (re-ejecutable, qué siembra, qué toca).

```
│ Cloná, instalá,        │                          [ Copiar comandos ]        │
│ verificá.              │ ┌──────────────────────────────────────────────────┐│
│                        │ │ # 1. cloná el kit al lado de tu proyecto         ││
│ Tres comandos desde    │ │ git clone https://github.com/naxrowdev/…git      ││
│ la raíz de tu          │ │                                                  ││
│ proyecto. El tercero   │ │ # 2. desde la raíz de tu proyecto, instalá       ││
│ no es opcional…        │ │ sh opencode-dev-team/kit/install.sh              ││
│                        │ │                                                  ││
│ OpenCode V2 y Git.     │ │ # 3. verificá que todo quedó en su lugar         ││
│ Nada más.              │ │ sh kit/selftest.sh                               ││
│                        │ └──────────────────────────────────────────────────┘│
│                        │ Es re-ejecutable · Siembra docs/context/ vacío · Toca .opencode/, AGENTS.md, opencode.jsonc y docs/
```

**Mobile:** el botón pasa a ancho completo, **arriba** del bloque (misma posición relativa). El bloque usa `white-space: pre-wrap` + `overflow-wrap: anywhere`: la URL larga se parte en dos líneas antes que provocar scroll horizontal. El texto copiado no cambia (los saltos de línea son del contenido, no del render).

**Estados:** default → "Copiar comandos" (icono `Copy`). Éxito → "Copiado" (icono `Check`), 2000ms, vuelve al default. Error (clipboard denegado o no disponible) → vuelve al default y un `role="status"` anuncia la recuperación manual. Sin JS → el botón se oculta (`<noscript>`) y aparece el aviso; el bloque sigue siendo seleccionable.

**Criterio auditable:** el texto copiado es byte a byte el texto visible del bloque (comentarios incluidos), conserva los saltos de línea, y las tres rutas coinciden con el kit.

### 3.10 §10 — CTA a GitHub + footer

**Intención:** un cierre, sin ruido. Cerrar con el argumento del repo y decir qué no es.

**Estructura:** h2 grande cols 1–8; bajada cols 1–6; URL del repo en mono 20px cols 1–6; botón primario; los tres "qué no es" en fila de 3 columnas con hairline superior (cols 1–12). A la derecha, cols 9–12, una ficha técnica de 4 líneas en mono 13 (versión, stage, licencia, stack) — cierre del motivo "ficha técnica".

```
│ El repo es el argumento.          │ ┌ ficha ──────────────────┐
│                                   │ │ v0.2.1                  │
│ No hay demo que reemplace leer    │ │ pre-1.0                 │
│ los agentes y las skills.         │ │ Licencia: en el repo    │
│                                   │ │ Stack: fijo, con ADR    │
│ github.com/naxrowdev/…            │ └─────────────────────────┘
│ [ Abrir el repo en GitHub ]       │
│ ──────────────┬───────────────────┬──────────────────────────────
│ No es un SaaS │ No es un plugin   │ No es un framework
│ …             │ de memoria…       │ …
├───────────────────────────────────────────────────────────────────────────
│ opencode-dev-team v0.2.1    Instalación · Skills · Repo    Sin analytics…
└───────────────────────────────────────────────────────────────────────────
```

**Mobile:** ficha debajo del botón (no al costado); "qué no es" apilado; footer en 3 líneas (marca+versión, links, línea legal).

**Edge:** la URL se muestra completa, sin acortar, y también es el texto del link (no "click acá"). Links externos se abren en la misma pestaña: sin `target="_blank"`, sin avisos innecesarios.

**Criterio auditable:** un solo CTA de cierre; aparecen las tres negaciones del PRD; versión visible también en el footer.

---

## 4. Copy deck final

**Reglas de escritura:** español rioplatense neutro con voseo; voz activa; oraciones de ≤ 22 palabras; sin exclamaciones; sin signos de admiración; sin emojis; sin "potenciá/llevá al siguiente nivel/revolucionario"; toda cifra proviene de la lista cerrada: `12 roles`, `1 + 11`, `9 fases`, `55 skills`, `8 destacadas`, `0 plugins externos`, `6 denegados`, `5 aprobaciones`, `3 comandos`, `2 ejes`, `v0.2.1`, `pre-1.0`.

### 4.1 Metadatos de página

| Elemento | Texto |
|---|---|
| `<title>` | opencode-dev-team — doce roles para OpenCode |
| `meta description` | Una configuración de OpenCode que instala un equipo de 12 roles: pipeline de 9 fases, stack fijo y permisos que no te dejan en banda. v0.2.1, pre-1.0. |
| `lang` | es-AR |

### 4.2 §1 Hero

| Elemento | Texto final | Límite |
|---|---|---|
| Wordmark (mono) | `opencode-dev-team` | 17 |
| Chip de versión | `v0.2.1` + `pre-1.0` (este último en `--faint`) | — |
| Link masthead | `GitHub` | — |
| **h1** | Tu próximo proyecto no necesita más prompts. Necesita un equipo. | 68 / máx. 3 líneas |
| Bajada | Una configuración, doce roles: convertí OpenCode en un equipo de desarrollo con pipeline, stack fijo y permisos que no te dejan en banda. | 137 / máx. 52ch |
| Glosario inline | Agente primario: reparte el trabajo. Subagente: ejecuta un rol. Acá hay uno y once. | 89 |
| CTA primario | Abrir el repo en GitHub | 23 |
| Link secundario | Ver los comandos | 17 |
| Apoyo 1 — título | Equipo, no prompt | — |
| Apoyo 1 — cuerpo | Un orquestador reparte; once subagentes ejecutan con rol, fase y color propios. | 79 |
| Apoyo 2 — título | El proceso está cableado | — |
| Apoyo 2 — cuerpo | De la PRD al deploy: cada paso tiene dueño y ninguno pasa sin verificación. | 75 |
| Apoyo 3 — título | Aburrido donde importa | — |
| Apoyo 3 — cuerpo | Stack fijo con ADR humano. `git push` y `sudo` vienen denegados. | 64 |
| Conteos | `12` roles · `9` fases · `55` skills · `0` plugins externos | — |

### 4.3 §2 Problema

| Elemento | Texto final |
|---|---|
| h2 | Tenés un modelo buenísimo y cero proceso. |
| Bajada | Cada feature arranca de cero. No porque el modelo falle, sino porque nadie definió quién hace qué, en qué orden y con qué criterio se aprueba. |
| Síntoma 1 (h3) | El contexto se pierde entre sesiones |
| Síntoma 1 (cuerpo) | Abrís otra sesión y el agente no sabe qué decidiste ayer, ni por qué. Lo volvés a explicar, o peor: lo asume. |
| Síntoma 2 (h3) | La calidad queda a criterio del momento |
| Síntoma 2 (cuerpo) | Sin gates, el review es lo que el agente recuerde hacer esa tarde. Un día hay tests; al otro, no. |
| Síntoma 3 (h3) | El agente puede tocar lo irreversible |
| Síntoma 3 (cuerpo) | Un `git push` de más, un `.env` leído, un deploy sin que nadie lo apruebe. El costo lo pagás vos. |
| Cierre (18px) | No falta más IA. Falta proceso que se repita igual todos los días. |

### 4.4 §3 Pipeline

| Elemento | Texto final |
|---|---|
| h2 | Nueve fases. Cada una con dueño. |
| Bajada | El pipeline no es una sugerencia en un README: está en las instrucciones que el agente lee al arrancar. Si una fase no deja su artefacto, la siguiente no empieza. |
| Fase 1 | `Descubrimiento` — Entender el problema y escribirlo · `product-owner` · PRD en `docs/product/` |
| Fase 2 | `Análisis` — Escribir requisitos verificables · `business-analyst` · historias Gherkin y tickets con dependencias |
| Fase 3 | `Diseño` — Definir arquitectura y contratos · `architect` · límites de módulos, API y ADR si hay decisión grande |
| Fase 4 | `UX` — Diseñar flujos y pantallas · `ux-designer` · wireframes, estados y criterios de accesibilidad |
| Fase 5 | `Plan` — Asignar el trabajo · `tech-lead` · tareas verificables para backend, frontend y QA |
| Compuerta A | Sin plan aprobado no se escribe código. |
| Fase 6 | `Implementación` — Construir · `backend-dev` + `frontend-dev` · código con tests, en paralelo cuando se puede |
| Fase 7 | `Verificación` — Correr la suite · `qa-engineer` · output real, no "debería andar" |
| Compuerta B | Sin tests en verde no hay review. |
| Fase 8 | `Revisión` — Revisar en dos ejes · `code-reviewer` + `security-engineer` · estándares y spec, lado a lado |
| Fase 9 | `Entrega` — Publicar y documentar · `devops-sre` + `tech-writer` · Docker, CI y docs al día |
| Nota final (13px) | Seguridad y documentación son transversales: auditan todas las fases, no solo la última. |

### 4.5 §4 Roster

| Elemento | Texto final |
|---|---|
| h2 | Doce roles. El tech-lead reparte; nadie hace todo. |
| Bajada | Cada agente tiene nombre, fase y color en el kit. El color no es decoración: es cómo reconocés quién habla en la sesión. |
| Contador | `12 roles · 1 orquestador + 11 subagentes` |
| `tech-lead` | Orquesta: planifica, delega, integra y verifica · fase `Plan` · `#A855F7` · etiqueta `orquestador` |
| `product-owner` | Problema, PRD y priorización · `Descubrimiento` · `#F97316` |
| `business-analyst` | Requisitos, historias Gherkin y tickets · `Análisis` · `#EAB308` |
| `architect` | Límites de módulos, contratos de API y ADRs · `Diseño` · `#3B82F6` |
| `ux-designer` | Flujos, estados de pantalla y accesibilidad · `Diseño` · `#EC4899` |
| `backend-dev` | Hono, Drizzle, Better Auth y Postgres · `Implementación` · `#10B981` |
| `frontend-dev` | React 19, shadcn, Tailwind y TanStack Query · `Implementación` · `#06B6D4` |
| `qa-engineer` | Plan de pruebas: unitarias, integración y E2E · `Verificación` · `#84CC16` |
| `code-reviewer` | Revisión en dos ejes: estándares y spec · `Revisión` · `#EF4444` |
| `security-engineer` | Threat model, OWASP y secretos · `Transversal` · `#F43F5E` |
| `devops-sre` | CI/CD, Docker y observabilidad · `Entrega` · `#64748B` |
| `tech-writer` | README, guías, ADR y changelog · `Transversal` · `#D946EF` |
| Leyenda (13px) | El chip marca la fase; el color, el rol. |
| Link de cierre | Ver los 12 agentes en el repo |

### 4.6 §5 Stack

| Elemento | Texto final |
|---|---|
| h2 | El stack no se negocia en cada tarea. |
| Bajada | `AGENTS.md` fija las tecnologías y la skill `stack-guard` las hace cumplir antes de instalar un paquete. Cambiar algo requiere un ADR aprobado por una persona. |
| Ítems (13) | `TypeScript (strict, ESM)` — Lenguaje: cliente y servidor · `Hono` — Backend: rutas y middleware · `PostgreSQL` — Base de datos, en Docker · `Drizzle ORM + Kit` — Esquema y migraciones versionadas · `Better Auth` — Sesiones y autenticación · `Zod v4` — Validación en los bordes · `React 19 + Vite` — SPA, sin Next.js · `React Hook Form` — Formularios con resolver Zod · `TanStack Query + Axios` — Estado de servidor · `Zustand` — Estado de UI · `shadcn/ui + Tailwind` — Componentes y tokens · `Vitest + Testing Library + Playwright` — Unitarias, integración y E2E · `Context7 MCP` — Docs vigentes, no de memoria |
| Callout | Si tu stack es otro, este kit no es para vos. Preferimos decírtelo acá y no en tu primer PR. |
| Callout secundario | Cambiar el stack requiere un ADR aprobado por una persona. |

### 4.7 §6 Skills

| Elemento | Texto final |
|---|---|
| h2 | Cincuenta y cinco skills en el repo. Sin caja negra. |
| Bajada | Cada skill es un `SKILL.md` versionado: la leés, la diffeás y la cambiás. No hay servicio externo que las sirva. |
| Contador | `8 de 55` |
| 1 | `stack-guard` — Frena cualquier dependencia fuera del stack antes de instalarla. |
| 2 | `code-review` — Revisión en dos ejes, estándares y spec, reportada lado a lado. |
| 3 | `tdd` — Rojo, verde, refactor: el test se escribe antes que el código. |
| 4 | `context-persistence` — Guarda y recupera el estado en `docs/context/`, sin plugins. |
| 5 | `code-simplification` — El mejor código es el que no escribís: el diff más corto que funcione. |
| 6 | `playwright-best-practices` — E2E sin flakiness: page objects, fixtures y CI. |
| 7 | `verification-before-completion` — Nada se declara listo sin el output del comando. |
| 8 | `context7-query` — Firmas y versiones al día por Context7, no de memoria. |
| Nota | Sin symlinks y sin telemetría: se auditan con un diff. |
| Link | Ver las 55 skills en el repo |

### 4.8 §7 Memoria, minimalismo, tokens

| Elemento | Texto final |
|---|---|
| h2 | La memoria vive en `docs/context/`, no en un plugin. |
| Bajada | El estado entre sesiones es un archivo en tu repo. Se lee al arrancar, se actualiza al cerrar la fase y se versiona con git como cualquier otra decisión. |
| Flujo (mono) | `sesión 1 → STATE.md → sesión 2` |
| Bloque 1 — título | Estado |
| Bloque 1 — ref | `docs/context/STATE.md` |
| Bloque 1 — cuerpo | Se inyecta como instrucción al arrancar cada sesión. Es una afirmación a verificar contra el repo, no un contrato ciego: si hay drift, el tech-lead lo corrige antes de planificar. |
| Bloque 2 — título | Decisiones |
| Bloque 2 — ref | `docs/context/decisions-log.md` |
| Bloque 2 — cuerpo | Append-only. Fecha, decisión y argumento en dos o tres líneas. La memoria entre sesiones es el repo, no un servicio. |
| Bloque 3 — título | Minimalismo |
| Bloque 3 — ref | `skill: code-simplification` |
| Bloque 3 — cuerpo | Empuja el diff más corto que resuelva el problema. Menos código es menos superficie para que algo se rompa. |
| Bloque 4 — título | Tokens |
| Bloque 4 — ref | `tool_output` + `compaction` |
| Bloque 4 — cuerpo | Las salidas de más de 1000 líneas o 32 KB se truncan y el resto queda en disco. La compactación conserva unos 25k tokens recientes. |

### 4.9 §8 Seguridad

| Elemento | Texto final |
|---|---|
| h2 | `git push` viene denegado. Vos aprobás lo irreversible. |
| Bajada | Los permisos son por rol y están en la configuración, no en la buena voluntad del modelo. El equipo prepara el cambio; la acción que no se deshace la ejecutás vos. |
| Panel A — título | Denegado por defecto |
| Panel A — ítems | `git push` · `sudo` · `npm publish` · `docker push` · `kubectl delete` · `terraform apply / destroy` |
| Panel B — título | Requiere tu aprobación |
| Panel B — ítems | `.env` (lectura o escritura) · merge de una rama · deploy · migraciones destructivas · secretos reales |
| Cierre (18px) | El equipo prepara todo; vos ejecutás lo que no se puede deshacer. |
| Nota (13px) | Los permisos de cada rol se versionan con el resto del kit. |

### 4.10 §9 Instalación

| Elemento | Texto final |
|---|---|
| h2 | Cloná, instalá, verificá. |
| Bajada | Tres comandos desde la raíz de tu proyecto. El tercero no es opcional: verifica que los 12 agentes y las 55 skills quedaron donde corresponde. |
| Prerrequisito | Necesitás OpenCode V2 y Git. Nada más: no hay cuenta, no hay clave, no hay servicio que registrar. |
| Bloque de código | Ver 4.11 |
| Nota 1 | Es re-ejecutable: para actualizar el kit, volvés a correr el comando 2. |
| Nota 2 | La primera vez siembra `docs/context/` vacío: el estado arranca en tu proyecto, no en el mío. |
| Nota 3 | Toca `.opencode/agents`, `.opencode/skills`, `AGENTS.md`, `opencode.jsonc` y `docs/`. Nada fuera de tu repo. |
| Botón — default | Copiar comandos |
| Botón — éxito | Copiado |
| Botón — `aria-label` | Copiar los comandos de instalación al portapapeles |
| Status (live region) | Comandos copiados al portapapeles. |
| Status — error | No se pudo copiar. Seleccioná el texto del bloque y usá Ctrl+C, o Cmd+C en Mac. |

### 4.11 Bloque de comandos (texto exacto a copiar)

```
# 1. cloná el kit al lado de tu proyecto
git clone https://github.com/naxrowdev/opencode-dev-team.git

# 2. desde la raíz de tu proyecto, instalá el equipo
sh opencode-dev-team/kit/install.sh

# 3. verificá que todo quedó en su lugar
sh opencode-dev-team/kit/selftest.sh
```

> **Resuelto (2026-11-07):** verificado contra `kit/include.txt` — el instalador **no** copia `kit/` al proyecto destino, así que `sh kit/selftest.sh` fallaba. El comando correcto es `sh opencode-dev-team/kit/selftest.sh`, tal como figura en el README del kit. El bloque vive en `src/content/site.ts`.

### 4.12 §10 CTA + footer

| Elemento | Texto final |
|---|---|
| h2 | El repo es el argumento. |
| Bajada | No hay demo que reemplace leer los agentes y las skills. Cloná, mirá el diff, decidí. |
| URL (mono, 20px) | github.com/naxrowdev/opencode-dev-team |
| CTA | Abrir el repo en GitHub |
| Qué no es — 1 | No es un SaaS: no hay cuenta, ni plan, ni telemetría. |
| Qué no es — 2 | No es un plugin de memoria: el estado es un archivo en tu repo. |
| Qué no es — 3 | No es un framework: es configuración de OpenCode, y la editás como cualquier archivo. |
| Ficha | `v0.2.1` · `pre-1.0` · Licencia: está en el repo, junto al código · Stack: fijo, con ADR |
| Footer — izquierda | `opencode-dev-team` · `v0.2.1` |
| Footer — links | Instalación · Skills · Repo |
| Footer — legal | Sin analytics, sin cookies, sin formularios. |
| Footer — línea 2 | Hecho para OpenCode V2. El kit se versiona con git. |

### 4.13 `<noscript>`

```html
<noscript>
  <p>
    Sin JavaScript, el botón «Copiar comandos» no funciona: se oculta.
    Los tres comandos ya están en la página y son texto normal.
    Seleccionalos y copiá con Ctrl+C, o Cmd+C en Mac.
    El resto de la página se lee igual.
  </p>
</noscript>
```

Estilo del aviso: panel con borde 1px `--line-strong`, fondo `--surface`, texto 14px `--muted`, situado justo encima del bloque de código; visible solo sin JS.

---

## 5. Accesibilidad (WCAG 2.2 AA)

### 5.1 Contraste de cada par texto/fondo (calculado)

| Par | Ratio | Uso | Requisito | Estado |
|---|---|---|---|---|
| `#E8EDF2` sobre `#0E1216` | **15.96:1** | Texto principal sobre fondo | 4.5 (texto normal) | ✅ |
| `#E8EDF2` sobre `#171D24` | **14.40:1** | Texto en bloque de código | 4.5 | ✅ |
| `#E8EDF2` sobre `#1D242C` | **13.29:1** | Tarjeta destacada / ficha | 4.5 | ✅ |
| `#E8EDF2` sobre `#E8EDF2` (botón) | **15.96:1** | Texto del botón primario (`#0E1216` sobre `#E8EDF2`) | 4.5 | ✅ |
| `#0E1216` sobre `#FFFFFF` (hover botón) | **18.80:1** | Hover del primario | 4.5 | ✅ |
| `#9AA6B2` sobre `#0E1216` | **7.59:1** | Bajadas y descripciones | 4.5 | ✅ |
| `#9AA6B2` sobre `#171D24` | **6.84:1** | Comentarios del bloque de código | 4.5 | ✅ |
| `#9AA6B2` sobre `#1D242C` | **6.32:1** | Texto secundario en tarjeta destacada | 4.5 | ✅ |
| `#7C8794` sobre `#0E1216` | **5.15:1** | Hex, versiones, metadatos 13px | 4.5 | ✅ |
| `#7C8794` sobre `#171D24` | **4.94:1** | Metadatos sobre superficie | 4.5 | ✅ |
| `#E8EDF2` sobre `#333D48` (anillo de foco sobre hairline) | **8.16:1** | Anillo de foco | 3 (no textual) | ✅ |
| `#E8EDF2` vs `#0E1216` (anillo de foco) | **15.96:1** | Indicador de foco | 3 | ✅ |

**Texto sobre relleno de rol** (chips de fase, 13px/600 ⇒ requiere 4.5:1):

| Rol | Hex | Texto `#0E1216` | Texto `#FFFFFF` | Elegido |
|---|---|---|---|---|
| tech-lead | `#A855F7` | 4.75 | 3.96 | **oscuro** |
| product-owner | `#F97316` | 6.71 | 2.80 | **oscuro** |
| business-analyst | `#EAB308` | 9.80 | 1.92 | **oscuro** |
| architect | `#3B82F6` | 5.11 | 3.68 | **oscuro** |
| ux-designer | `#EC4899` | 5.33 | 3.53 | **oscuro** |
| backend-dev | `#10B981` | 7.41 | 2.54 | **oscuro** |
| frontend-dev | `#06B6D4` | 7.75 | 2.43 | **oscuro** |
| qa-engineer | `#84CC16` | 9.52 | 1.98 | **oscuro** |
| code-reviewer | `#EF4444` | 5.00 | 3.76 | **oscuro** |
| security-engineer | `#F43F5E` | 5.12 | 3.67 | **oscuro** |
| devops-sre | `#64748B` | 3.95 ❌ | 4.76 | **blanco** (única excepción) |
| tech-writer | `#D946EF` | 5.44 | 3.46 | **oscuro** |

**Color de rol como gráfico** (borde superior de tarjeta, nodo del pipeline, placa del hero): el mínimo es `#64748B` con **3.95:1** contra el fondo; todos los demás están entre 4.75 y 9.80. Cumple el 3:1 de componentes gráficos y ninguno se usa como única fuente de información (el nombre y el hex están en texto).

**Pares decorativos que no cumplen y no deben cumplir:** hairline `#333D48` vs fondo = 1.70:1; `#4E5A68` vs fondo = 2.67:1; superficie `#171D24` vs fondo = 1.11:1. Son separadores y agrupaciones, no componentes de UI; ningún borde es la única forma de identificar un control (el único botón es un relleno sólido de 15.96:1 y los links van subrayados).

### 5.2 Foco visible

- Anillo `2px solid #E8EDF2`, `outline-offset: 2px`, siguiendo el radio de 2px. Se aplica con `:focus-visible`; nunca `outline: none` sin reemplazo.
- Sobre el botón claro: el offset de 2px deja ver el fondo oscuro entre el relleno y el anillo, así que el anillo se lee (15.96:1).
- Sin header sticky y sin overlays ⇒ 2.4.11 (foco no oscurecido) se cumple trivialmente. `scroll-margin-top: 0` en los anchors.

### 5.3 Orden de tabulación (12 paradas)

1. Skip link "Saltar al contenido" (visible al foco)
2. `GitHub` (masthead)
3. CTA hero "Abrir el repo en GitHub"
4. Link hero "Ver los comandos"
5. Link §4 "Ver los 12 agentes en el repo"
6. Link §6 "Ver las 55 skills en el repo"
7. Botón §9 "Copiar comandos"
8. CTA §10 "Abrir el repo en GitHub"
9. Footer "Instalación"
10. Footer "Skills"
11. Footer "Repo"

El orden sigue el orden visual y el orden del DOM; no hay `tabindex` positivos. Ningún elemento interactivo está oculto a la vista pero presente en el orden de tabulación.

### 5.4 Landmarks, headings y semántica

- `<header>` (masthead) · `<main id="contenido">` · `<footer>`. Sin `<nav>`: no hay navegación persistente (con 10 secciones lineales agregarla sería ruido; el skip link resuelve el bypass).
- **Un solo `<h1>`** (hero). Diez `<h2>`, uno por sección. `<h3>` solo en §2 (3), §7 (4), §8 (2), §10 (1). Los ítems del roster, del pipeline y de skills **no** son headings: van como `<ul>`/`<ol>` con `<strong>`, para que el árbol de encabezados no tenga 12 ramas.
- Pipeline: `<ol>` real (es secuencia) con 9 `<li>` (uno por fase); las compuertas son texto real dentro del `<li>` de su fase, con icono `Lock` — nunca pseudo-elementos. El plan de implementación (§Task 4) fijó 9 `<li>` + 2 compuertas, que es lo que la spec de tests verifica.
- Stack: `<dl>` con `dt` (tecnología) y `dd` (capa + para qué).
- Roster: `<ul>` de `<li>`; el chip de fase es texto dentro del `<li>`, no un `aria-label`.
- Bloque de código: `<pre><code>` con `aria-label="Comandos de instalación"`; el botón de copiar está fuera del `<pre>`.
- Iconos lucide: siempre `aria-hidden="true"` + `focusable="false"`; el significado va en texto adyacente.
- Links: texto descriptivo, nunca "click acá"; el texto del link es el nombre del destino.
- `<html lang="es-AR">`.

### 5.5 Teclado y feedback

- El botón de copiar es `<button type="button">` nativo: Enter y Espacio funcionan sin handlers manuales.
- Cambio de estado anunciado por una región `role="status"` (polite, siempre en el DOM) — no se depende de que el lector anuncie el cambio de nombre del botón.
- No hay trampas de teclado, ni drag, ni timeouts, ni contenido en movimiento automático.
- Los links externos no abren pestaña nueva (sin `target="_blank"`), así que no hace falta advertirlo ni gestionar el foco de retorno.

### 5.6 Targets, zoom, motion

- Botón primario y botón de copiar: alto mínimo **44px**, ancho mínimo 44px, padding horizontal 20px.
- Links de masthead y footer: caja de 32px de alto con padding (≥ 24×24 AA 2.5.8); los links inline dentro de párrafos quedan exceptuados por ser texto en línea.
- 200% zoom: sin alturas fijas en bloques de texto; el roster pasa a 1 columna; el bloque de comandos hace wrap; nada queda cortado.
- `prefers-reduced-motion: reduce`: sin escalonado del hero, sin `translateY`, transiciones a 0.01ms, `scroll-behavior: auto`.
- `forced-colors`: los bordes y el texto sobreviven (no hay información que dependa solo de un color de fondo); el chip de rol conserva su texto porque el color lo pone el sistema.
- Contraste de texto en `::selection` también definido (fondo `--foreground`, texto `--background`).

### 5.7 Checklist de verificación

| Criterio WCAG 2.2 | Dónde se verifica |
|---|---|
| 1.4.3 / 1.4.11 | Tabla 5.1 (todos los pares ≥ 4.5 / ≥ 3) |
| 1.4.13 | Nada depende de hover: el hex y el nombre están siempre visibles |
| 2.1.1 / 2.1.2 | 12 paradas de tabulación, sin trampas |
| 2.4.1 | Skip link |
| 2.4.7 / 2.4.11 | Anillo 2px offset 2px; sin sticky |
| 2.4.6 | h1 único; h2 por sección; sin saltos |
| 2.5.8 | 44px en controles; 32px en links de chrome |
| 3.1.1 | `lang="es-AR"` |
| 3.2.4 | Labels consistentes: "Abrir el repo en GitHub" en hero y cierre |
| 4.1.2 / 4.1.3 | Botón nativo + `role="status"` |
| 2.3.3 | Un solo movimiento, 420ms, no repetido, reducible |

---

## 6. Performance

### 6.1 Presupuesto

| Recurso | Presupuesto | Cómo se cumple |
|---|---|---|
| HTML prerenderizado | ≤ 30 KB gzip | Contenido completo en el HTML; sin JSON inline de hidratación para las secciones estáticas |
| CSS | ≤ 14 KB gzip | Tailwind con purge + tokens; sin CSS-in-JS, sin librería de componentes completa |
| JS | **≤ 120 KB gzip** (objetivo 55 KB) | React 19 + una isla; sin router, sin librería de animación, sin analytics |
| Fuentes | **0 KB** | Stack del sistema; sin `@font-face`, sin preload de fuentes |
| Imágenes | **0 KB** | Ninguna imagen en la página; toda la gráfica es tipografía, borde y color |
| Requests de terceros | **0** | Sin CDN de fuentes, sin íconos remotos, sin píxeles |
| LCP | < 2.5 s en 3G rápida | LCP = el `<h1>` (texto, sin fuentes externas, sin imagen) |
| CLS | 0 | Sin webfonts; la placa tiene proporción fija; nada carga tarde |
| INP | < 200 ms | La única interacción es copiar (una llamada al clipboard) |

### 6.2 Decisiones

1. **Prerender completo, hidratación mínima.** Todo el contenido se emite como HTML. El único comportamiento cliente es el botón de copiar; si el tech-lead acepta montar una isla React solo para ese botón, el costo es el runtime de React. Recomendación a `architect`: aislar el botón como única isla y no hidratar el resto del árbol. Con 0 KB de React en cliente la página sigue cumpliendo el stack (React 19 se usa para construir y prerenderizar), pero la decisión de arquitectura es del `architect`, no de este documento.
2. **Sin webfonts.** Es la decisión de mayor impacto conjunto en LCP, CLS y peso. El costo asumido es que la voz tipográfica varía entre macOS (SF), Windows (Segoe UI) y Linux (Noto/Roboto); por eso el carácter se concentra en escala, tracking, retícula y color, que son estables en todas las plataformas.
3. **Sin imágenes ni demo grabada.** El PRD permitía omitir el GIF si no había una grabación decente; se omite por defecto. Un GIF de 10 s pesa entre 1 y 5 MB y arruina el presupuesto de LCP móvil. Si en el futuro se agrega, debe ser `<video muted playsinline preload="none">` con poster de ≤ 40 KB.
4. **Iconos:** `lucide-react` con importaciones nombradas (tree-shaking). Se usan 9 iconos en total: `History`, `CircleDashed`, `AlertTriangle`, `Lock`, `Ban`, `UserCheck`, `Copy`, `Check`, `Info`. Peso esperado < 3 KB gzip. No se usa el paquete completo ni un sprite remoto.
5. **Se evita explícitamente:** `backdrop-filter`/glassmorphism, gradientes (incluido cualquier `linear-gradient` de fondo; las líneas de retícula se dibujan con `repeating-linear-gradient` de un solo color, no es un degradado), sombras, `will-change`, listeners de scroll, `IntersectionObserver`, librerías de animación (`framer-motion`, `gsap`), carruseles, video autoplay, `font-display` (no aplica), y cualquier script de terceros.
6. **Una sola imagen permitida fuera de la página:** la tarjeta social (`og:image`, 1200×630, PNG ≤ 120 KB) no se carga en el documento y no cuenta contra el presupuesto de la página. El PNG se genera a partir de la placa de 12 colores + el titular, sin foto ni stock.

---

## Anexo — Pendientes y ambigüedades del PRD

| # | Ambigüedad | Impacto | Propuesta |
|---|---|---|---|
| A1 | **Ruta del comando 3.** El PRD daba `sh kit/selftest.sh`, pero el instalador no copia `kit/` al proyecto destino (`kit/include.txt` no lo incluye). | Copy de conversión (criterio 2) | **Resuelto:** el comando es `sh opencode-dev-team/kit/selftest.sh` (verificado contra el README del kit). |
| A2 | **Licencia sin definir** (PRD §8). La sección 10 pide "licencia". | Copy del cierre | Se publica "Licencia: está en el repo, junto al código". No se nombra ninguna licencia. Al definirla, se reemplaza por el identificador exacto. |
| A3 | **Fase de los roles transversales.** El PRD pide "fase" por tarjeta, pero `security-engineer` y `tech-writer` son transversales; `tech-lead` es transversal en `AGENTS.md` y a la vez dueño de la fase `Plan`. | Roster §4 | Chip = fase que el rol **posee** en el pipeline (`tech-lead` → `Plan`); los sin fase propia → `Transversal`. Leyenda explícita debajo de la grilla. Confirmar con `architect`. |
| A4 | **"9 fases" vs 12 roles.** 9 dueños de fase + 3 roles transversales. Un lector puede contar 9 chips distintos y 12 tarjetas. | Comprensión del roster | El contador dice `12 roles · 1 orquestador + 11 subagentes`; la leyenda aclara qué marca el chip. Si se prefiere, se puede mostrar "9 fases + 3 transversales" como microcopy. |
| A5 | **"0 plugins".** El claim es sobre plugins de memoria/contexto, no sobre plugins de OpenCode en general. | Riesgo de sobreventa (criterio 3) | Etiqueta exacta: "plugins externos". Alternativa más ajustada: "plugins de memoria". |
| A6 | **Deep links al repo** (`/tree/v0.2.1/.opencode/agents`, `/skills`) no verificados; además el repo del sitio podría no ser el repo del kit. | Links de §4 y §6 | Verificar las rutas y fijarlas al tag, no a `main` (el PRD §7 pide no hardcodear versiones en URLs de instalación, pero los deep links de documentación sí conviene fijarlos). |
| A7 | **Dominio y hosting** sin definir (PRD §8). | Metadatos, `og:url` | No bloquea. Se resuelve en `architect`/`devops-sre`. |
| A8 | **Conteo de skills.** Hoy hay 55 directorios con `SKILL.md` (verificado). Una skill (`composition-patterns`) tiene la descripción vacía; el conteo por directorio es el criterio usado. | Cifra del hero y §6 | Fijar el criterio "un directorio = una skill" en el módulo de contenido y re-verificarlo en cada release. |
| A9 | **GIF de demo** (PRD §8, supuesto). | Performance y honestidad | Se omite en v1. Si se agrega, entra como `<video>` con poster, jamás como GIF. |

