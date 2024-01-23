from fastapi import APIRouter, HTTPException
from fastapi import Depends
from sqlalchemy.orm import Session
from starlette import status
from database import get_db
from domain.pup.pup_crud import (
    create_pup,
    update_pup,
    remove_pup,
    get_pup_by_name,
    get_pup_by_id,
    get_all_pups,
    get_pup_medical_record,
)
from domain.user.user_crud import validate_user
from domain.pup.pup_schema import (
    PupCreate,
    PupUpdate,
    PupResponse,
)
from models import (
    Pup,
    User,
)

from domain.user.user_router import get_current_user

router = APIRouter(prefix="/wallyandcoda/pup")


@router.post("/")
def pup_create(
    pup_create: PupCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PupResponse:
    validate_user(db, current_user)
    pup = get_pup_by_name(db, pup_create.pup_name)
    if pup:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This pup already exists in the database.",
        )
    new_pup = create_pup(db, pup_create=pup_create)

    return PupResponse(
        id=new_pup.id,
        pup_name=new_pup.pup_name,
        pup_sex=new_pup.pup_sex,
        microchip_number=new_pup.microchip_number,
        akc_registration_number=new_pup.akc_registration_number,
        akc_registration_name=new_pup.akc_registration_name,
    )


@router.get("/")
def pup_get(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    validate_user(db, current_user)
    return get_all_pups(db)


@router.get("/{id}")
def one_pup_get(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    validate_user(db, current_user)
    return get_pup_by_id(db, id)


@router.put("/{id}")
def pup_update(
    pup_update: PupUpdate,
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    validate_user(db, current_user)
    pup = get_pup_by_id(db, id)
    return update_pup(db, pup_update, pup)


@router.delete("/{id}")
def pup_remove(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    validate_user(db, current_user)
    pup = get_pup_by_id(db, id)
    return remove_pup(db, pup)

@router.get("/{id}/medical_record")
def pup_medical_record_get(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    validate_user(db, current_user)
    pup = get_pup_by_id(db, id)
    return get_pup_medical_record(db, pup)