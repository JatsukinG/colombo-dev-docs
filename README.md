# Biblioteca - Documentación Técnica

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

Documentación técnica para el proyecto de gestión de biblioteca. Incluye guías de arquitectura, desarrollo y mejores prácticas para el equipo de 8 desarrolladores.

## 📁 Contenido

- **Proyecto**: Descripción general de las dos aplicaciones (Admin Dashboard + Catálogo de Usuarios)
- **Desarrollo**: Guías de configuración, estilo de código y flujo de trabajo con Git
- **Arquitectura**: Patrones y estructuras arquitectónicas (Screaming Architecture, etc.)

## 📂 Estructura de la Documentación

```
src/content/docs/
├── project/          # Información del proyecto
│   └── overview.md   # Visión general de las dos apps
├── dev/              # Guías de desarrollo
│   ├── setup.md      # Configuración del entorno
│   ├── code-style.md # Estilo de código
│   └── git-workflow.md # Flujo de trabajo Git
└── architecture/     # Guías de arquitectura
    └── screaming-architecture-react.md # Estructura de proyectos React
```

## 🚀 Comandos

| Comando            | Descripción                                    |
| :----------------- | :--------------------------------------------- |
| `pnpm install`     | Instala dependencias                           |
| `pnpm dev`         | Inicia servidor en `localhost:4321`            |
| `pnpm build`       | Construye para producción en `./dist/`         |
| `pnpm preview`     | Previa del build de producción                 |

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👥 Equipo

Esta documentación es utilizada por el equipo de desarrollo del proyecto Biblioteca.

## 📚 Recursos Adicionales

- [Starlight Documentation](https://starlight.astro.build/)
- [Astro Documentation](https://docs.astro.build)
- [Diátaxis Framework](https://diataxis.fr/) - Guía para escribir documentación técnica
