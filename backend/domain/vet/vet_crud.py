from sqlalchemy.orm import Session
from domain.vet.vet_schema import (
    VetClinicCreate,
    VetClinicUpdate,
    VetClinicResponse,
)
from models import VeterinaryClinic
import uuid
from datetime import datetime
from starlette import status
from fastapi import HTTPException


def create_vet_clinic(
    db: Session,
    vet_clinic_create: VetClinicCreate,
) -> VeterinaryClinic:
    """
    Creates a new veterinary clinic
    """
    vet_clinic = VeterinaryClinic(
        id=str(uuid.uuid4()),
        name=vet_clinic_create.name,
        address=vet_clinic_create.address,
        phone_number=vet_clinic_create.phone_number,
        doctor_name=vet_clinic_create.doctor_name,
    )
    db.add(vet_clinic)
    db.commit()

    return get_vet_clinic_by_name(db, vet_clinic_create.name)


def update_vet_clinic(
    db: Session,
    vet_clinic_update: VetClinicUpdate,
    vet_clinic: VeterinaryClinic,
) -> VeterinaryClinic:
    """
    Update vet clinic
    """
    vet_clinic = get_vet_clinic_by_id(db, vet_clinic.id)
    vet_clinic.name = vet_clinic_update.name
    vet_clinic.address = vet_clinic_update.address
    vet_clinic.phone_number = vet_clinic_update.phone_number
    vet_clinic.doctor_name = vet_clinic_update.doctor_name

    db.add(vet_clinic)
    db.commit()

    return get_vet_clinic_by_id(vet_clinic.id)


def get_vet_clinic_by_name(
    db: Session,
    clinic_name: str,
) -> VeterinaryClinic | None:
    """
    Retrieves a vet clinic by the given name
    """
    return (
        db.query(VeterinaryClinic).filter(VeterinaryClinic.name == clinic_name).first()
    )


def get_all_vet_clinics(
    db: Session,
):
    """
    Retrieves all vet clinics
    """
    return db.query(VeterinaryClinic).all()


def get_vet_clinic_by_id(
    db: Session,
    id: str,
) -> VeterinaryClinic | None:
    return db.query(VeterinaryClinic).filter(VeterinaryClinic.id == id).first()


def remove_vet_clinic(
    db: Session,
    vet_clinic: VeterinaryClinic,
) -> None:
    db.delete(vet_clinic)
    db.commit()
