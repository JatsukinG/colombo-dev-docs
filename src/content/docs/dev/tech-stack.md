---
title: Stack Tecnológico
description: Stack de librerías recomendado para el proyecto.
---

# Stack Tecnológico

Librerías y herramientas recomendadas para el desarrollo del proyecto.

## Gestor de Paquetes

Este proyecto utiliza **pnpm** como gestor de paquetes en lugar de npm o yarn.

### ¿Por qué pnpm?

- Más rápido que npm y yarn
- Ahorra espacio en disco
- Evita problemas de "phantom dependencies"
- Estructura de node_modules más estricta

### Instalación

Si no tienes pnpm instalado, ejecuta uno de estos comandos:

```bash
# Con npm
npm install -g pnpm

# Con Homebrew (macOS)
brew install pnpm

# Con curl (Linux/macOS)
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Verificar instalación
pnpm --version
```

### Comandos Básicos

```bash
# Instalar dependencias
pnpm install

# Agregar una dependencia
pnpm add nombre-paquete

# Agregar dependencia de desarrollo
pnpm add -D nombre-paquete

# Ejecutar scripts
pnpm dev
pnpm build
pnpm test
```

> **Nota**: Todos los comandos de instalación de las siguientes librerías usan `pnpm add` en lugar de `npm install`.
>
> **Importante**: Consulta la documentación oficial de cada librería para más detalles sobre su uso correcto y características avanzadas.

## Core

### React con TypeScript

Framework principal para la construcción de la interfaz de usuario con tipado estático.

## UI Components

### Headless UI

```bash
pnpm add @headlessui/react
```

Librería de componentes completamente accesibles sin estilos predefinidos. Perfecto para usar con Tailwind CSS.

### Tailwind CSS

Framework de CSS utilitario para el diseño de la interfaz.

### React Icons

```bash
pnpm add react-icons
```

Librería de iconos que incluye múltiples colecciones (Font Awesome, Material Design, Feather Icons, etc.).

### CLSX

```bash
pnpm add clsx
```

Utilidad para organizar y condicionar clases de Tailwind CSS de forma limpia.

```tsx
clsx(['base-class', isActive && 'active-class', condition && 'conditional-class'])
```

## State Management

### Recoil o Jotai

```bash
# Recoil
pnpm add recoil

# Jotai
pnpm add jotai
```

Gestión de estado global. Recoil es más estable y tiene mayor comunidad, Jotai es más ligero y modular.

## Formularios

### Formik

```bash
pnpm add formik
```

Librería para manejo de formularios: validación, estados, envío de datos y manejo de errores.

### Yup

```bash
pnpm add yup
```

Librería de validación de esquemas. Se integra perfectamente con Formik.

```tsx
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})
```

## Enrutamiento

### React Router DOM

```bash
pnpm add react-router-dom
```

Librería para el manejo de rutas y navegación en la aplicación.

## Data Fetching

### Apollo Client

```bash
pnpm add @apollo/client graphql
```

Cliente GraphQL para manejar consultas, mutaciones y cache de datos.

### GraphQL Code Generator

```bash
pnpm add -D @graphql-codegen/cli
```

Genera automáticamente los types de TypeScript basados en tus consultas GraphQL.

## Utilidades

### React Hot Toast

```bash
pnpm add react-hot-toast
```

Notificaciones toast informativas y alertas.

### Nice Modal React

```bash
pnpm add @ebay/nice-modal-react
```

Librería para manejar modales de forma centralizada, sin necesidad de manejar estados de apertura/cierre en cada componente.
