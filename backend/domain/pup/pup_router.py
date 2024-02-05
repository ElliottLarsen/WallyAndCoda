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
    get_user_pups,
    create_record,
    update_record,
    delete_record,
    get_records_by_pup_id,
    get_one_record,
    get_record_by_id,
)
from domain.user.user_crud import validate_user
from domain.pup.pup_schema import (
    PupCreate,
    PupUpdate,
    PupResponse,
    RecordCreate,
    RecordUpdate,
    RecordResponse,
    ReminderCreate,
    ReminderUpdate,
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

    new_pup = create_pup(db, pup_create=pup_create, owner=current_user)

    return PupResponse(
        id=new_pup.id,
        pup_name=new_pup.pup_name,
        pup_sex=new_pup.pup_sex,
        microchip_number=new_pup.microchip_number,
        akc_registration_number=new_pup.akc_registration_number,
        akc_registration_name=new_pup.akc_registration_name,
        owner_id=new_pup.owner_id,
    )


@router.get("/all")
def pup_all_get(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    validate_user(db, current_user)
    return get_all_pups(db)


@router.get("/my_pups")
def pup_get(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    validate_user(db, current_user)
    return get_user_pups(db, current_user)


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


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def pup_remove(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    validate_user(db, current_user)
    pup = get_pup_by_id(db, id)
    return remove_pup(db, pup)


# Records endpoint.
@router.get("/records/{pup_id}")
def pup_get_records(
    pup_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    validate_user(db, current_user)
    return get_records_by_pup_id(db, pup_id)


@router.get("/records/{record_id}")
def pup_get_one_record(
    record_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    validate_user(db, current_user)
    return get_one_record(db, record_id)


@router.post("/record/{pup_id}")
def pup_record_create(
    record_create: RecordCreate,
    pup_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> RecordResponse:
    validate_user(db, current_user)
    pup = get_pup_by_id(db, pup_id)
    return create_record(db, pup, record_create)


@router.put("/record/{record_id}")
def pup_record_update(
    record_update: RecordCreate,
    record_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> RecordResponse:
    validate_user(db, current_user)
    record = get_record_by_id(db, record_id)
    return update_record(db, record_update, record)


@router.delete("/record/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def pup_record_delete(
    record_id: str,
    db: Session = Depends(get_db),
    current_user: Session = Depends(get_current_user),
):
    validate_user(db, current_user)
    record = get_record_by_id(db, record_id)
    print()
    print(record)
    print()
    return delete_record(db, record)
