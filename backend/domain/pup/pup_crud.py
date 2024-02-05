from sqlalchemy.orm import Session
from domain.pup.pup_schema import (
    PupCreate,
    PupUpdate,
    RecordCreate,
    RecordUpdate,
    ReminderCreate,
    ReminderUpdate,
)
from models import Pup, User, Record, Reminder
import uuid
from datetime import datetime, timedelta
from starlette import status
from fastapi import HTTPException


def create_pup(
    db: Session,
    pup_create: PupCreate,
    owner: User,
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
        owner_id=owner.id,
        owner=owner,
    )

    db.add(db_pup)
    db.commit()
    return get_pup_by_name(db, pup_create.pup_name)


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
    return get_pup_by_id(db, pup.id)


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


def get_user_pups(db: Session, user: User):
    """
    Retrieves all pups that belong to the user
    """
    return db.query(Pup).filter(Pup.owner_id == user.id).all()


def create_record(db: Session, pup: Pup, record_create: RecordCreate):
    db_record = Record(
        id=str(uuid.uuid4()),
        record_type=record_create.record_type,
        record_date=record_create.record_date,
        doctor_name=record_create.doctor_name,
        vet_address=record_create.vet_address,
        vet_phone_number=record_create.vet_phone_number,
        cost=record_create.cost,
        record_note=record_create.record_note,
        pup_id=pup.id,
        pup=pup,
    )

    db.add(db_record)
    db.commit()

    return db_record


def update_record(db: Session, record_update: RecordUpdate, record: Record):
    record = get_record_by_id(db, record.id)
    record.record_type = record_update.record_type
    record.record_date = record_update.record_date
    record.doctor_name = record_update.doctor_name
    record.vet_address = record_update.vet_address
    record.vet_phone_number = record_update.vet_phone_number
    record.cost = record_update.cost
    record.record_note = record_update.record_note
    db.add(record)
    db.commit()

    return get_record_by_id(db, record.id)


def delete_record(db: Session, record: Record):
    db.delete(record)
    db.commit()


def get_record_by_id(db: Session, record_id: str) -> Record | None:
    return db.query(Record).filter(Record.id == record_id).first()


def get_records_by_pup_id(db: Session, pup_id: str):
    return db.query(Record).filter(Record.pup_id == pup_id).all()


def get_one_record(db: Session, record_id: str):
    return db.query(Record).filter(Record.id == record_id).first()
