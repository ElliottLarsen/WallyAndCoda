import pytest
from fastapi.testclient import TestClient
from main import app

client_401 = TestClient(app)


# TODO
@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def test_user():
    return {"username": "testuser", "password": "testpassword"}


def test_user_account_get_401():
    """
    Unauthorized access
    """
    response = client_401.get("/wallyandcoda/user/")
    assert response.status_code == 401


def test_user_account_post_401():
    """
    Unauthorized access
    """

    response = client_401.post("/wallyandcoda/user/")
    assert response.status_code == 401


def test_user_account_delete_401():
    """
    Unauthorized access
    """
    response = client_401.delete("/wallyandcoda/user/")
    assert response.status_code == 401
