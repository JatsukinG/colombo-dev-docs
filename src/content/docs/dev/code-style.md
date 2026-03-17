---
title: Estilo de Código
description: Convenciones y mejores prácticas para el código.
---

# Estilo de Código

Guía de estilo y convenciones que seguimos en el proyecto.

## Formateo y Linting

Usamos **Biome** para formateo y linting. Se ejecuta automáticamente en pre-commit.

### Formatear manualmente

```bash
pnpm format
```

### Lint manual

```bash
pnpm lint
```

## Convenciones de TypeScript

### Nomenclatura

- **Componentes**: `PascalCase` (`BookForm.tsx`)
- **Hooks**: `camelCase` con prefijo `use` (`useSelectedBook.ts`)
- **Funciones**: `camelCase` (`formatDate`)
- **Constantes**: `UPPER_SNAKE_CASE` (`MAX_LOANS_PER_USER`)
- **Tipos/Interfaces**: `PascalCase` (`Book`, `LoanStatus`)

### Orden de Imports

Los imports siguen este orden:

1. **Tipos** — importaciones de tipos e interfaces
2. **React** — react y sus sub-paquetes
3. **Terceros** — librerías externas (`node_modules`)
4. **Proyecto** — paths internos con alias (`@`)

Dentro de cada grupo, las líneas se ordenan de **menor a mayor longitud**.

```typescript
// 1. Tipos
import type { FC } from 'react'
import type { Book, LoanStatus } from '@books/types'

// 2. React
import { useRef } from 'react'
import { useState, useEffect } from 'react'

// 3. Terceros
import { atom } from 'jotai'
import { useAtom, useSetAtom } from 'jotai'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// 4. Proyecto
import { useToast } from '@hooks'
import { Button, Spinner } from '@components'
import { BookForm, BookDetail } from '@books/components'
```

## Convenciones de React

### Componentes Funcionales

Siempre usar functional components con hooks:

```typescript
// ✅ Bien
const BookCard: FC<BookCardProps> = ({ book }) => {
  return <div>{book.title}</div>
}

// ❌ Mal - class components
class BookCard extends Component {
  // ...
}
```

### Hooks Custom

Los hooks personalizados deben:

1. Empezar con `use`
2. Ser reutilizables
3. Tener TypeScript bien tipado

```typescript
// hooks/useBookDetails.ts
export const useBookDetails = (bookId: string) => {
  const [book, setBook] = useState<Book | null>(null)

  useEffect(() => {
    // fetch logic
  }, [bookId])

  return { book, isLoading: !book }
}
```

## Archivos y Carpetas

- Un archivo por componente
- Nombre del archivo igual al nombre del componente
- Usar barrel files (`index.ts`) para exports públicos

## Comentarios

```typescript
/**
 * Calcula la fecha de vencimiento de un préstamo
 * @param startDate - Fecha de inicio del préstamo
 * @param days - Días de duración
 * @returns Fecha de vencimiento
 */
export const calculateDueDate = (startDate: Date, days: number): Date => {
  // ...
}
```

## Patrones a Evitar

```typescript
// ❌ Evitar: any sin razón
const data: any = await fetch()

// ✅ Preferir: tipos explícitos o unknown
const data: Book = await fetch()

// ❌ Evitar: lógica compleja en componentes
const MyComponent = () => {
  const result = complexCalculation() // 50 líneas...

  // ✅ Extraer a snippets o hooks
  const result = useComplexCalculation()
}
```
