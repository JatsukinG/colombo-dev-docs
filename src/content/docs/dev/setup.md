---
title: Configuración del Entorno
description: Guía para configurar tu entorno de desarrollo.
---

# Configuración del Entorno

Guía para preparar tu máquina para desarrollar en los proyectos de la biblioteca.

## Requisitos Previos

- **Node.js**: v20+
- **pnpm**: v9+
- **Git**: última versión estable

## Instalación

### 1. Clonar el repositorio

```bash
git clone <repo-url>
cd <repo-name>
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env.local` y completa los valores:

```bash
cp .env.example .env.local
```

### 4. Iniciar el servidor de desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Extensiones de VS Code Recomendadas

- **Biome** - Formateo y linting
- **TypeScript Importer** - Autocompletado de imports
- **Error Lens** - Mostrar errores inline
- **GitLens** - Mejoras para Git

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia servidor de desarrollo |
| `pnpm build` | Construye para producción |
| `pnpm preview` | Previa del build de producción |
| `pnpm lint` | Ejecuta el linter |
| `pnpm format` | Formatea el código |
| `pnpm type-check` | Verifica tipos TypeScript |
