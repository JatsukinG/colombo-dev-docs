---
title: Screaming Architecture en React + TypeScript
description: La estructura de carpetas debe gritar qué hace tu app, no qué framework usa.
---

# Screaming Architecture en React + TypeScript + Vite

> La estructura de carpetas debe gritar **qué hace** tu app, no qué framework usa.

---

## Estructura

```
src/
├── modules/            # Dominios del negocio (el corazón)
│   ├── books/
│   ├── members/
│   ├── loans/
│   └── reservations/
├── pages/              # Páginas delgadas (solo componen)
├── components/         # UI compartida (agnóstica al dominio)
├── hooks/              # Hooks compartidos
├── layouts/            # Estructuras de página (auth, dashboard)
├── snippets/           # Funciones puras utilitarias
├── atoms/              # Estado global compartido
├── constants/          # Constantes globales
├── enums/              # Enumeraciones
├── contexts/           # Contextos React globales
├── router/             # Configuración de rutas
├── types/              # Tipos globales
├── gql/                # Tipos auto-generados (codegen)
├── client.ts           # Config del cliente API
├── App.tsx
└── main.tsx
```

Al abrir `modules/` sabes de inmediato: *"esta app gestiona libros, miembros, préstamos y reservaciones"*.

---

## Feature Modules

Cada módulo encapsula **todo** lo que necesita su dominio:

```
src/modules/books/
├── components/         # UI del feature
│   ├── BooksTable.tsx
│   ├── BooksTableFilters.tsx
│   ├── BookForm.tsx
│   └── BookInfoCard.tsx
├── hooks/              # Lógica reactiva del feature
│   └── useSelectedBook.ts
├── queries/            # Lecturas a la API
│   ├── Books.ts
│   └── Book.ts
├── mutations/          # Escrituras a la API
│   ├── CreateBookMutation.ts
│   └── UpdateBookMutation.ts
├── fragments/          # Fragmentos GraphQL reutilizables
│   └── BookFragment.ts
├── atoms/              # Estado local del feature
│   └── selectedBookState.ts
└── types/
    └── index.ts
```

Crea solo las subcarpetas que necesites. Un módulo simple puede tener solo `components/` y `queries/`.

### Submódulos

Si un dominio tiene subdominios claros:

```
src/modules/loans/
├── active-loans/           # Submódulo
│   ├── components/
│   ├── queries/
│   └── mutations/
├── loan-history/           # Submódulo
│   ├── components/
│   └── queries/
├── hooks/                  # Compartido entre submódulos
└── layout/
    └── LoansTabsLayout.tsx
```

---

## Páginas delgadas

Las páginas **solo componen**, nunca tienen lógica de negocio:

```tsx
// src/pages/books/index.tsx
import { PageTable } from '@components'
import { BooksTableFilters, BooksTable } from '@books/components'

const BooksPage: FC = () => (
  <PageTable>
    <PageTable.Filters>
      <BooksTableFilters />
    </PageTable.Filters>
    <PageTable.Table>
      <BooksTable />
    </PageTable.Table>
  </PageTable>
)

export default BooksPage
```

La estructura de `pages/` refleja las URLs:

```
src/pages/
├── index.tsx                   # /
├── auth/
│   ├── login.tsx               # /auth/login
│   └── signup.tsx              # /auth/signup
├── books/
│   └── index.tsx               # /books
├── members/
│   └── index.tsx               # /members
└── loans/
    ├── active.tsx              # /loans/active
    └── history.tsx             # /loans/history
```

---

## Componentes compartidos

Solo componentes **genéricos**, sin lógica de dominio. Organizados por tipo:

```
src/components/
├── buttons/
├── forms/
├── tables/
├── modals/
├── loading/
├── errors/
├── text/
└── index.ts            # Re-export de todo
```

**Regla**: si un componente solo lo usa un módulo, vive en `modules/{feature}/components/`. Si lo usan 2+, sube a `components/`.

---

## Snippets

Funciones puras. Sin React, sin hooks, sin estado:

```
src/snippets/
├── dates/          # Formateo de fechas
├── strings/        # Manipulación de strings
├── numbers/        # Formateo numérico
├── forms/          # Validaciones
└── files/          # Descargas, URLs
```

---

## Index files como API pública

Cada capa compartida exporta desde un `index.ts`:

```typescript
// src/components/index.ts
export * from './buttons'
export * from './forms'
export * from './tables'
export * from './modals'
```

```typescript
// src/hooks/index.ts
export { default as useToast } from './useToast'
export { default as usePageTitle } from './usePageTitle'
```

Dentro de módulos, solo las subcarpetas que necesiten ser importadas externamente:

```typescript
// src/modules/books/hooks/index.ts
export { default as useSelectedBook } from './useSelectedBook'
```

---

## Reglas de dependencia

| Capa | Puede importar de | NO importa de |
|------|-------------------|----------------|
| `pages/` | `modules/`, `components/`, `layouts/` | — |
| `modules/{A}/` | `components/`, `hooks/`, `snippets/`, `atoms/`, `constants/` | `modules/{B}/`, `pages/` |
| `components/` | `hooks/`, `snippets/`, `constants/` | `modules/`, `pages/` |
| `layouts/` | `components/`, `hooks/`, `atoms/` | `modules/`, `pages/` |
| `snippets/` | `constants/` | Todo lo demás |

Un módulo **nunca** importa de otro módulo. Si necesitan compartir algo, sube a la capa compartida.

---

## Configuración de path aliases

Los aliases se configuran en **dos archivos**: TypeScript necesita los paths para el chequeo de tipos, y Vite los necesita para resolver los imports en build.

### tsconfig.json (o tsconfig.app.json)

```jsonc
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      // Comodín general
      "@/*": ["src/*"],

      // Capas compartidas (apuntan al index)
      "@components": ["src/components/index"],
      "@hooks": ["src/hooks/index"],
      "@atoms": ["src/atoms/index"],
      "@constants": ["src/constants/index"],
      "@enums": ["src/enums/index"],
      "@snippets/*": ["src/snippets/*"],
      "@contexts/*": ["src/contexts/*"],

      // Tipos generados
      "@gql": ["src/gql/index"],
      "@types": ["src/gql/graphql"],

      // Feature modules
      "@books/*": ["src/modules/books/*"],
      "@members/*": ["src/modules/members/*"],
      "@loans/*": ["src/modules/loans/*"],
      "@reservations/*": ["src/modules/reservations/*"],

      // Layouts
      "@dash/*": ["src/layouts/dashboard/*"],
      "@auth-lay/*": ["src/layouts/auth/*"]
    }
  }
}
```

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

const alias = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Comodín general
      '@': alias('./src'),

      // Capas compartidas
      '@components': alias('./src/components/index'),
      '@hooks': alias('./src/hooks/index'),
      '@atoms': alias('./src/atoms/index'),
      '@constants': alias('./src/constants/index'),
      '@enums': alias('./src/enums/index'),
      '@snippets': alias('./src/snippets'),
      '@contexts': alias('./src/contexts'),

      // Tipos generados
      '@gql': alias('./src/gql/index'),
      '@types': alias('./src/gql/graphql'),

      // Feature modules
      '@books': alias('./src/modules/books'),
      '@members': alias('./src/modules/members'),
      '@loans': alias('./src/modules/loans'),
      '@reservations': alias('./src/modules/reservations'),

      // Layouts
      '@dash': alias('./src/layouts/dashboard'),
      '@auth-lay': alias('./src/layouts/auth'),
    },
  },
})
```

### Resultado

```typescript
// Sin aliases
import { Button } from '../../../components/buttons/Button'
import { useToast } from '../../../hooks/useToast'
import { BookForm } from '../../books/components/BookForm'

// Con aliases
import { Button } from '@components'
import { useToast } from '@hooks'
import { BookForm } from '@books/components/BookForm'
```

**Nota**: Cuando apuntas un alias a un `index` (como `@components` → `src/components/index`), importas directamente desde el barrel file. Cuando usas `/*` (como `@books/*`), navegas dentro del módulo.

---

## Dónde poner cada cosa

```
¿Componente UI?
├── Solo un módulo lo usa  → modules/{feature}/components/
└── 2+ módulos lo usan    → components/

¿Hook?
├── Solo un módulo lo usa  → modules/{feature}/hooks/
└── 2+ módulos lo usan    → hooks/

¿Función pura (sin React)?
├── Específica de un feature → modules/{feature}/snippets/
└── Genérica                 → snippets/

¿Estado global?
├── Solo un módulo lo usa  → modules/{feature}/atoms/
└── 2+ módulos lo usan    → atoms/

¿Operación de API?
└── Siempre → modules/{feature}/queries/ o mutations/
```

---

## Anti-patrones

| Evitar | Preferir |
|--------|----------|
| Lógica de negocio en pages | Pages solo componen componentes del módulo |
| Un módulo importa de otro módulo | Extraer lo compartido a `components/` o `hooks/` |
| Carpeta `utils/` gigante sin estructura | `snippets/` organizado por dominio (`dates/`, `strings/`) |
| Componente "compartido" con lógica de dominio | Componente genérico en `components/` + específico en `modules/` |
| Todo el estado en `atoms/` global | Estado del feature en `modules/{feature}/atoms/` |
| Imports relativos largos (`../../../`) | Path aliases (`@components`, `@books/*`) |
