# Proyecto Final - Movilidad EAFIT

Aplicación web full-stack para reportar y coordinar desplazamientos entre estación de metro y universidad, con visualización del estado actual mediante mapas de calor por medio de transporte.

## Arquitectura

- `frontend/`: SPA Vue 3 + TypeScript en español.
- `backend/`: API FastAPI con reglas de negocio y auditoría.
- `db/`: PostgreSQL con persistencia histórica.
- `docs/diagrams/`: diagramas de secuencia en PUML.

Arquitectura orientada a servicios desacoplados y orquestados con Docker Compose.

## Funcionalidades clave

- Registro de usuario con restricción de dominio `@eafit.edu.co`.
- Roles: `usuario` y `administrador`.
- Sin login tradicional; sesión local para entorno académico.
- Gestión de desplazamientos con:
  - dirección obligatoria (`metro_universidad` o `universidad_metro`),
  - medio (`caminando` o `bus_universidad`),
  - estado global y auditable,
  - unión/retiro de participantes con ventana temporal.
- Mapas de calor con refresco periódico:
  - datos simulados para visitantes,
  - datos reales para usuarios registrados.

## Reglas de negocio implementadas

- Solo creador o administrador puede cambiar estado/finalizar.
- Edición permitida solo antes de hora de inicio.
- Unirse/retirarse permitido hasta 1 hora tras inicio.
- Cambio automático a estado de desplazamiento a los 5 minutos desde el inicio.
- Archivo automático del desplazamiento a las 2 horas desde inicio.
- Retroceso de estado exige nueva fecha/hora futura.
- Auditoría con timestamps para creación, cambios de estado y participación.

## Instalación rápida (Docker)

1. Copiar `.env.example` a `.env` y ajustar valores si aplica.
2. Ejecutar entorno de desarrollo:
   - `docker compose up --build`
3. URLs:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8000/docs`
   - PostgreSQL: `localhost:5432`

### Ajuste CORS (Frontend <-> Backend)

Para evitar errores del navegador como `Cross-Origin Request Blocked` al consumir la API desde el frontend, el backend incluye configuración CORS por variable de entorno:

- `APP_CORS_ALLOWED_ORIGINS`

Valor recomendado en desarrollo local:

- `http://localhost:5173,http://127.0.0.1:5173,http://localhost:8080,http://127.0.0.1:8080`

Si modificas esta variable con contenedores ya levantados, reconstruye y reinicia para aplicar el cambio:

- `docker compose down`
- `docker compose up --build`

## Modo producción local

- `docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build`

Frontend servido en `http://localhost:8080`.

## Pruebas

### Backend

- `cd backend && pytest`
- Incluye pruebas unitarias, de API e integración (base SQLite de pruebas).

### Frontend

- `cd frontend && npm run test`
- Incluye pruebas unitarias de componentes, almacenamiento de sesión y guard de rutas.

Ambos servicios configuran cobertura mínima de 50%.

## Uso funcional

1. Entrar a la página principal.
2. Visualizar mapas de calor simulados como visitante.
3. Registrar usuario con correo `@eafit.edu.co`.
4. En dashboard:
   - crear desplazamientos,
   - unirse o retirarse,
   - avanzar estado,
   - consultar métricas actuales.

## Usuarios demo precargados

Al iniciar el backend se siembran automáticamente 15 usuarios de prueba (si no existen), para facilitar la demostración académica:

- Correos: `test1@eafit.edu.co` hasta `test15@eafit.edu.co`
- Contraseña común: `testtest`

La carga es idempotente: si los usuarios ya existen, no se duplican.

## Decisiones técnicas

- Se priorizó simplicidad y legibilidad sobre complejidad de autenticación.
- Toda agregación de métricas y lógica temporal reside en backend.
- Persistencia histórica completa en PostgreSQL, sin migraciones automáticas.
