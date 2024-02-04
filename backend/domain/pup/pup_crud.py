from sqlalchemy.orm import Session
from domain.pup.pup_schema import (
    PupCreate,
    PupUpdate,
)
from models import Pup, User
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
