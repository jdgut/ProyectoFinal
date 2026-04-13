# Frontend - Vue 3 + TypeScript

SPA en español para registro, creación y participación en desplazamientos, además de visualización de mapas de calor con diseño profesional.

## Stack

- Vue 3
- TypeScript
- Vue Router
- Bootstrap 5
- Vitest

## Paleta de colores

Diseño profesional con **Azul Rey** (#003DA5) como color primario:
- **Primario:** Azul Rey (#003DA5)
- **Secundario:** Azul Rey Medio (#0052CC)
- **Terciario:** Azul Rey Claro (#005CE6)
- **Fondos:** Azul muy claro a casi blanco (#F0F4FF a #F8FAFF)
- Ver [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) para especificación completa

## Variables de entorno

- `VITE_API_BASE_URL`: URL base de API backend.

## Ejecución local sin Docker

1. `npm install`
2. `npm run dev`

## Pruebas

- `npm run test`

Cobertura mínima de 50% configurada en `vite.config.ts`.

## Estructura del proyecto

```
src/
  ├── components/       # Componentes reutilizables (HeatmapGrid)
  ├── views/            # Vistas (HomeView, DashboardView)
  ├── router/           # Rutas y guardias de navegación
  ├── services/         # Servicios API (axios)
  ├── stores/           # Estado local (sesión de usuario)
  ├── types.ts          # Tipos TypeScript globales
  ├── main.ts           # Entrada principal
  ├── App.vue           # Componente raíz
  └── styles.css        # Estilos globales
```

## Páginas principales

1. **Home (`/`):** Pública, descriptiva, con mapas de calor simulados y registro
2. **Dashboard (`/dashboard`):** Privada (requiere sesión), gestión completa de desplazamientos

## Decisiones de diseño

- Sin login completo para mantener simplicidad académica: el registro persiste sesión local.
- Página de inicio ahora completamente pública: visualiza datos simulados sin necesidad de registro.
- Refresco periódico cada 15 segundos para mantener estado actualizado sin WebSockets.
- Paleta de colores azul rey profesional para mejorar apariencia corporativa.
- Componentes responsivos con Bootstrap 5 para compatibilidad en múltiples dispositivos.

## Notas de estilo

Todos los botones, encabezados y elementos interactivos usan la paleta azul rey. Las sombras y transiciones crean profundidad visual sin sacrificar legibilidad. Las tarjetas de información tienen borde izquierdo azul para mayor jerarquía visual.
