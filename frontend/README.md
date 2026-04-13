# Frontend - Vue 3 + TypeScript

SPA en español para registro, creación y participación en desplazamientos, además de visualización de mapas de calor.

## Stack

- Vue 3
- TypeScript
- Vue Router
- Bootstrap 5
- Vitest

## Variables de entorno

- `VITE_API_BASE_URL`: URL base de API backend.

## Ejecución local sin Docker

1. `npm install`
2. `npm run dev`

## Pruebas

- `npm run test`

Cobertura mínima de 50% configurada en `vite.config.ts`.

## Decisiones de diseño

- Sin login completo para mantener simplicidad académica: el registro persiste sesión local.
- Ruta pública con datos simulados y ruta protegida por guard local.
- Refresco periódico cada 15 segundos para mantener estado actualizado sin WebSockets.
