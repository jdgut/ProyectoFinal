# Backend - FastAPI

Servicio responsable de reglas de negocio, auditoría y agregación de métricas para mapas de calor.

## Stack

- Python 3.12
- FastAPI
- SQLAlchemy ORM
- PostgreSQL
- Pytest

## Variables de entorno

- `APP_APP_NAME`: nombre de la aplicación.
- `APP_APP_ENV`: `dev` o `prod`.
- `APP_APP_HOST`: host de arranque.
- `APP_APP_PORT`: puerto de arranque.
- `APP_DATABASE_URL`: cadena de conexión SQLAlchemy.

## Ejecución local sin Docker

1. `python -m venv .venv`
2. Activar entorno virtual.
3. `pip install -r requirements.txt`
4. Configurar `APP_DATABASE_URL`.
5. `uvicorn app.main:app --reload`

## Pruebas

- `pytest`

Se exige cobertura mínima de 50% por configuración en `pytest.ini`.

## Decisiones de diseño

- Arquitectura por capas: API, servicios, repositorios, modelos y esquemas.
- Sin autenticación JWT; las reglas de permiso dependen del `actor_email` enviado por cliente.
- Auditoría persistente en tabla `trip_audit`.
- Aplicación de reglas automáticas de estado y archivado al consultar/operar desplazamientos.
