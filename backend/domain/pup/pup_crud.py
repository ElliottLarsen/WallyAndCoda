from sqlalchemy.orm import Session
from domain.pup.pup_schema import (
    PupCreate,
    PupUpdate,
)
from models import (
    Pup,
    PupMedicalRecord,
    Record,
)
import uuid
from datetime import datetime, timedelta
from starlette import status
from fastapi import HTTPException


def create_pup(
    db: Session,
    pup_create: PupCreate,
) -> Pup:
    """
    Creates a new pup
    """
    db_pup = Pup(
        id=str(uuid.uuid4()),
        pup_name=pup_create.pup_name,
        pup_sex=pup_create.pup_sex,
        microchip_number=pup_create.microchip_number,
        akc_registration_number=pup_create.akc_registration_number,
        akc_registration_name=pup_create.akc_registration_name,
    )

    db.add(db_pup)
    db.commit()
    create_pup_medical_record(db, db_pup)
    return get_pup_by_name(db, pup_create.pup_name)


def create_pup_medical_record(db: Session, pup: Pup):
    db_pup_medical_record = PupMedicalRecord(
        id=str(uuid.uuid4()),
        pup=pup,
    )
    db.add(db_pup_medical_record)
    db.commit()


def get_pup_medical_record(db: Session, pup: Pup):
    return db.query(PupMedicalRecord).filter(PupMedicalRecord.pup_id == pup.id).all()


def update_pup(
    db: Session,
    pup_update: PupUpdate,
    pup: Pup,
) -> Pup:
    """
    Update pup
    """
    pup = get_pup_by_id(db, pup.id)
    pup.pup_name = pup_update.pup_name
    pup.pup_sex = pup_update.pup_sex
    pup.microchip_number = pup_update.microchip_number
    pup.akc_registration_number = pup_update.akc_registration_number
    pup.akc_registration_name = pup_update.akc_registration_name
    db.add(pup)
    db.commit()
    return get_pup_by_id(pup.id)


def remove_pup(
    db: Session,
    pup: Pup,
) -> None:
    db.delete(pup)
    db.commit()


def get_pup_by_name(
    db: Session,
    pup_name: str,
) -> Pup | None:
    """
    Retrieves a pup by the given name
    """
    return db.query(Pup).filter(Pup.pup_name == pup_name).first()


def get_pup_by_id(
    db: Session,
    id: str,
) -> Pup | None:
    """
    Retrieves a pup by the given name
    """
    return db.query(Pup).filter(Pup.id == id).first()


def get_all_pups(db: Session):
    """
    Retrieves all pups
    """
    return db.query(Pup).all()
