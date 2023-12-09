import pytest
from fastapi.testclient import TestClient
from main import app


# TODO
@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def test_user():
    return {"username": "testuser", "password": "testpassword"}
