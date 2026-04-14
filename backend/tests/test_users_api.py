def test_register_user_success(client):
    response = client.post(
        "/api/users/register",
        json={
            "email": "estudiante@eafit.edu.co",
            "password": "password123",
            "role": "usuario",
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["email"] == "estudiante@eafit.edu.co"
    assert body["role"] == "usuario"


def test_register_user_domain_error(client):
    response = client.post(
        "/api/users/register",
        json={
            "email": "invalido@gmail.com",
            "password": "password123",
            "role": "usuario",
        },
    )

    assert response.status_code == 422


def test_cors_preflight_allows_frontend_origin(client):
    response = client.options(
        "/api/trips/metrics/heatmap/simulated",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "GET",
        },
    )

    assert response.status_code in {200, 204}
    assert response.headers.get("access-control-allow-origin") == "http://localhost:5173"
