---
title: Git Workflow
description: Flujo de trabajo para commits y pull requests.
---

# Git Workflow

Flujo de trabajo que seguimos para colaborar en el proyecto.

## Ramas (Branches)

```
main          ← Rama principal, siempre estable
develop       ← Desarrollo integrado
feature/*     ← Nuevas funcionalidades
fix/*         ← Corrección de bugs
hotfix/*      ← Fixes urgentes en producción
```

## Flujo de Trabajo

### 1. Crear rama de feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nombre-feature
```

### 2. Commits

Usa **conventional commits**:

```bash
git commit -m "feat: agregar paginación a tabla de libros"
git commit -m "fix: corregir validación de formulario de préstamo"
git commit -m "docs: actualizar guía de instalación"
```

**Tipos permitidos:**

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formato, missing semi colons, etc (no afecta lógica)
- `refactor`: Cambio de código que no corrige bug ni agrega feature
- `test`: Agregar tests
- `chore`: Actualizar tareas de build, config, etc

### 3. Pull Request

Los PRs normalmente van dirigidos a la rama `develop`. **No se pueden hacer cambios directos a `main`**.

Antes de abrir PR:

1. Actualiza tu rama con los últimos cambios de `develop`
2. Verifica que la aplicación funcione correctamente

```bash
# En tu rama de feature
git checkout develop
git pull origin develop
git checkout feature/nombre-feature
git merge develop
```

> **Nota**: Si hay conflictos durante el merge, resuélvelos antes de abrir el PR.

## Convenciones de PR

**Título**: `[tipo] descripción corta`

**Descripción**:

```markdown
## Cambios
- Lista de cambios principales

## Testing
- Cómo probar los cambios

## Screenshots (si aplica)
![screenshot](url)
```

## Review

- Mínimo 1 aprobación para merge
- Resolver comentarios solicitados (requested changes)
- No hacer force push a ramas que ya tienen PR
