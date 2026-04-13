from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Movilidad EAFIT"
    app_env: str = "dev"
    app_host: str = "0.0.0.0"
    app_port: int = 8000

    database_url: str = "postgresql+psycopg2://postgres:postgres@db:5432/movilidad"

    model_config = SettingsConfigDict(env_file=".env", env_prefix="APP_", extra="ignore")


settings = Settings()
