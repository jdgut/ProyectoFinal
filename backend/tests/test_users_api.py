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
