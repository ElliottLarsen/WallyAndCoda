import pytest
from fastapi.testclient import TestClient
from main import app
from datetime import datetime
import json

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


def test_setup_user(client):
    """
    Register user
    """
    data = {
        "username": "testuser",
        "password1": "testpassword",
        "password2": "testpassword",
        "first_name": "TEST",
        "last_name": "USER",
        "email": "testuser@testuser.com",
    }
    response = client.post("/wallyandcoda/user/register", json=data)
    assert response.status_code == 200
    assert "id" in response.json()
    assert response.json()["username"] == "testuser"
    assert response.json()["first_name"] == "TEST"
    assert response.json()["last_name"] == "USER"
    assert response.json()["email"] == "testuser@testuser.com"


def test_setup_login_user(client, test_user):
    """
    Login user
    """
    response = client.post("/wallyandcoda/user/login", data=test_user)
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert "token_type" in response.json()
    assert "username" in response.json()

    return response.json()["access_token"]


def test_empty_pups(client, test_user):
    """
    Get my_pups with no pups
    """
    access_token = test_setup_login_user(client, test_user)
    response = client.get(
        "/wallyandcoda/pup/my_pups", headers={"Authorization": f"Bearer {access_token}"}
    )
    assert response.status_code == 200
    assert len(response.json()) == 0


def test_create_pup(client, test_user):
    """
    Pup create endpoint test
    """
    access_token = test_setup_login_user(client, test_user)
    data = {
        "pup_name": "testpup",
        "pup_sex": "M",
        "microchip_number": "23232",
        "akc_registration_number": "32323",
        "akc_registration_name": "TESTPUP",
    }
    response = client.post(
        "/wallyandcoda/pup/",
        json=data,
        headers={"Authorization": f"Bearer {access_token}"},
    )
    assert response.status_code == 200
    assert response.json()["pup_name"] == "testpup"
    assert response.json()["pup_sex"] == "M"
    assert response.json()["microchip_number"] == "23232"
    assert response.json()["akc_registration_number"] == "32323"
    assert response.json()["akc_registration_name"] == "TESTPUP"


def test_update_pup(client, test_user):
    """
    Pup update endpoint test
    """
    access_token = test_setup_login_user(client, test_user)
    pup_response = client.get(
        "/wallyandcoda/pup/my_pups", headers={"Authorization": f"Bearer {access_token}"}
    )
    my_pup = pup_response.json()[0]
    my_pup_id = my_pup["id"]
    pup_update = {
        "pup_name": "updatepup",
        "pup_sex": "M",
        "microchip_number": "23232",
        "akc_registration_number": "32323",
        "akc_registration_name": "UPDATEPUP",
    }
    response = client.put(
        f"/wallyandcoda/pup/{my_pup_id}",
        headers={"Authorization": f"Bearer {access_token}"},
        json=pup_update,
    )

    assert response.status_code == 200
    assert response.json()["pup_name"] != "testpup"
    assert response.json()["pup_name"] == "updatepup"
    assert response.json()["pup_sex"] == "M"
    assert response.json()["microchip_number"] == "23232"
    assert response.json()["akc_registration_number"] == "32323"
    assert response.json()["akc_registration_name"] != "TESTPUP"
    assert response.json()["akc_registration_name"] == "UPDATEPUP"


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


def test_delete_record_401():
    """
    Unauthorized access
    """
    response = client_401.delete("/wallyandcoda/pup/record/2323-2asdf")
    assert response.status_code == 401


def test_post_record(client, test_user):
    """
    Pup record create test
    """
    access_token = test_setup_login_user(client, test_user)
    pup_response = client.get(
        "/wallyandcoda/pup/my_pups", headers={"Authorization": f"Bearer {access_token}"}
    )
    my_pup = pup_response.json()[0]
    my_pup_id = my_pup["id"]

    data = {
        "record_type": "vaccine",
        "record_date": "2024-02-13 09:49:07",
        "doctor_name": "my doctor",
        "vet_address": "123 Vet Drive",
        "vet_phone_number": "1234567890",
        "cost": 30.00,
        "record_note": "N/A",
    }

    response = client.post(
        f"/wallyandcoda/pup/record/{my_pup_id}",
        json=data,
        headers={"Authorization": f"Bearer {access_token}"},
    )

    assert response.status_code == 200
    assert response.json()["record_type"] == "vaccine"
    assert response.json()["doctor_name"] == "my doctor"
    assert response.json()["vet_address"] == "123 Vet Drive"
    assert response.json()["vet_phone_number"] == "1234567890"
    assert response.json()["cost"] == 30.00
    assert response.json()["record_note"] == "N/A"


def test_get_record(client, test_user):
    access_token = test_setup_login_user(client, test_user)
    pup_response = client.get(
        "/wallyandcoda/pup/my_pups",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    my_pup = pup_response.json()[0]
    my_pup_id = my_pup["id"]

    response = client.get(
        f"/wallyandcoda/pup/record/{my_pup_id}/all",
        headers={"Authorization": f"Bearer {access_token}"},
    )

    assert len(response.json()) == 1


def test_update_record(client, test_user):
    access_token = test_setup_login_user(client, test_user)
    pup_response = client.get(
        "/wallyandcoda/pup/my_pups",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    my_pup = pup_response.json()[0]
    my_pup_id = my_pup["id"]

    record_response = client.get(
        f"/wallyandcoda/pup/record/{my_pup_id}/all",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    pup_record = record_response.json()[0]
    record_id = pup_record["id"]

    data = {
        "record_type": "vaccine",
        "record_date": "2024-02-13 09:49:07",
        "doctor_name": "my doctor update",
        "vet_address": "123 Vet Drive",
        "vet_phone_number": "1234567890",
        "cost": 35.00,
        "record_note": "N/A",
    }

    response = client.put(
        f"/wallyandcoda/pup/record/{record_id}",
        headers={"Authorization": f"Bearer {access_token}"},
        json=data,
    )

    assert response.status_code == 200
    assert response.json()["cost"] == 35.00
    assert response.json()["doctor_name"] == "my doctor update"


def test_delete_record(client, test_user):
    access_token = test_setup_login_user(client, test_user)
    pup_response = client.get(
        "/wallyandcoda/pup/my_pups",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    my_pup = pup_response.json()[0]
    my_pup_id = my_pup["id"]

    record_response = client.get(
        f"/wallyandcoda/pup/record/{my_pup_id}/all",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    pup_record = record_response.json()[0]
    record_id = pup_record["id"]

    response = client.delete(
        f"/wallyandcoda/pup/record/{record_id}",
        headers={"Authorization": f"Bearer {access_token}"},
    )

    assert response.status_code == 204


# Reminders tests


def test_get_reminder_all_401():
    """
    Unauthorized access
    """
    response = client_401.get("/wallyandcoda/pup/reminder/3431-3fasd/all")
    assert response.status_code == 401


def test_get_one_reminder_401():
    """
    Unauthorized access
    """

    response = client_401.get("/wallyandcoda/pup/reminder/1212-1asdf")
    assert response.status_code == 401


def test_post_reminder_401():
    """
    Unauthorized access
    """
    response = client_401.post("/wallyandcoda/pup/reminder/3431-3fasd")
    assert response.status_code == 401


def test_update_reminder_401():
    """
    Unauthorized access
    """
    response = client_401.put("/wallyandcoda/pup/reminder/1212-1asdf")
    assert response.status_code == 401


def test_delte_reminder_401():
    """
    Unauthorized access
    """
    response = client_401.delete("/wallyandcoda/pup/reminder/1212-1asdf")
    assert response.status_code == 401


# Clean Up


def test_remove_pup(client, test_user):
    """
    Pup delete endpoint test
    """
    access_token = test_setup_login_user(client, test_user)
    pup_response = client.get(
        "/wallyandcoda/pup/my_pups", headers={"Authorization": f"Bearer {access_token}"}
    )
    my_pup = pup_response.json()[0]
    my_pup_id = my_pup["id"]

    response = client.delete(
        f"/wallyandcoda/pup/{my_pup_id}",
        headers={"Authorization": f"Bearer {access_token}"},
    )

    assert response.status_code == 204


def test_remove_user(client, test_user):
    """
    Remove user
    """
    access_token = test_setup_login_user(client, test_user)
    response = client.delete(
        "/wallyandcoda/user",
        headers={"Authorization": f"Bearer {access_token}"},
    )

    assert response.status_code == 204
