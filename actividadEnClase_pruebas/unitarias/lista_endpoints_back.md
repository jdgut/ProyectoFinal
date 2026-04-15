# Pruebas unitarias y de aceptación
## URL base de la API
- URL local: http://localhost:8000
- Prefijo API: /api

## Salud del servicio
- GET /health
	- Descripción: valida que la app está arriba.

## Usuarios
### Lista
- registrar [POST]
- login [POST]

### Detalles
- POST /api/users/register
	- Descripción: registra un usuario nuevo.
    - Parámetros: email, password, role [usuario, administrador]
	- Reglas:
		- email debe terminar en @eafit.edu.co
		- password mínimo 8 caracteres
- POST /api/users/login
	- Descripción: inicia sesión lógica para usuarios existentes.
    - Parámetros: email, password

## Desplazamientos
### Lista
- trips [POST, GET, PATCH]
- trips/id/join [POST]
- trips/id/leave [POST]
- trips/id/state [POST]
- trips/id/finalize [POST]
- trips/id/audit [GET]

### Detalles
- POST /api/trips
	- Descripción: crea desplazamiento y agrega al creador como participante.
    - Parámetros: actor_email, title, meeting_point, start_at [datetime], transport_mode [caminando, bus_universidad], direction [metro_universidad, universidad_metro]
- GET /api/trips
	- Descripción: lista desplazamientos activos (no archivados).
- PATCH /api/trips/{trip_id}
	- Descripción: edita datos básicos antes del inicio.
	- Parámetros: actor_email, title, meeting_point, start_at [datetime]
- POST /api/trips/{trip_id}/join
	- Descripción: unir participante.
	- Parámetros: actor_email
- POST /api/trips/{trip_id}/leave
	- Descripción: retirar participante (si aplica regla temporal).
	- Parámetros: actor_email
- POST /api/trips/{trip_id}/state
	- Descripción: cambia estado global del desplazamiento. Permite asignar nueva fecha de inicio sólo a futuro
	- Parámetros: actor_email, new_state [en_universidad, en_desplazamiento_universidad, en_metro, en_desplazamiento_metro], new_start_at *opcional [datetime]
- POST /api/trips/{trip_id}/finalize
	- Descripción: finaliza y archiva manualmente.
	- Parámetros: actor_email
- GET /api/trips/{trip_id}/audit
	- Descripción: historial de eventos del desplazamiento.

## Métricas
### Lista
- trips/metrics/heatmap [GET]
- trips/metrics/heatmap/simulated [GET]

### Detalles
- GET /api/trips/metrics/heatmap
	- Descripción: mapa de calor real con datos actuales.

- GET /api/trips/metrics/heatmap/simulated
	- Descripción: mapa de calor simulado para visitantes.

# Pruebas Unitarias

tests/test_api_health.py
- api/health [GET]

tests/test_users_api.py
- api/users/registrar [POST]
- api/users/login [POST]

tests/test_trips_api.py
- api/trips [POST, GET, PATCH]
- api/trips/id/join [POST]
- api/trips/id/leave [POST]
- api/trips/id/state [POST]
- api/trips/id/finalize [POST]
- api/trips/id/audit [GET]
- api/trips/metrics/heatmap [GET]
- api/trips/metrics/heatmap/simulated [GET]

