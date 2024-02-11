import pytest
from fastapi.testclient import TestClient
from main import app

client_401 = TestClient(app)


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def test_user():
    return {"username": "testuser", "password": "testpassword"}


@pytest.fixture
def test_user2():
    return {"username": "testuser2", "password": "testpassword2"}


def test_pup_get_all_401():
    """
    Unauthorized access
    """
    response = client_401.get("/wallyandcoda/pup/all")
    assert response.status_code == 401


def test_pup_get_my_pups_401():
    """
    Unauthorized access
    """
    response = client_401.get("/wallyandcoda/pup/my_pups")
    assert response.status_code == 401


def test_pup_get_one_pup_401():
    """
    Unauthorized access
    """
    response = client_401.get("/wallyandcoda/pup/34341-3fasd")
    assert response.status_code == 401


def test_pup_put_401():
    """
    Unauthorized access
    """
    response = client_401.put("/wallyandcoda/pup/34341-3fasd")
    assert response.status_code == 401


def test_pup_delete_401():
    """
    Unauthorized access
    """
    response = client_401.delete("/wallyandcoda/pup/3431-3fasd")
    assert response.status_code == 401


# Records tests


def test_get_record_all_401():
    """
    Unauthorized access
    """
    response = client_401.get("/wallyandcoda/pup/record/3431-3fasd/all")
    assert response.status_code == 401


def test_get_one_record_401():
    """
    Unauthorized access
    """

    response = client_401.get("/wallyandcoda/pup/record/2323-2asdf")
    assert response.status_code == 401


def test_post_record_401():
    """
    Unauthorized access
    """
    response = client_401.post("/wallyandcoda/pup/record/3431-3fasd")
    assert response.status_code == 401


def test_update_record_401():
    """
    Unauthorized access
    """
    response = client_401.put("/wallyandcoda/pup/record/2323-2asdf")
    assert response.status_code == 401


def test_delte_record_401():
    """
    Unauthorized access
    """
    response = client_401.delete("/wallyandcoda/pup/record/2323-2asdf")
    assert response.status_code == 401


# Reminders tests
