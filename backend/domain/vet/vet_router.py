from fastapi import APIRouter, HTTPException
from fastapi import Depends
from sqlalchemy.orm import Session
from starlette import status
from datetime import datetime
from database import get_db
from domain.vet.vet_crud import (
    create_vet_clinic,
    get_vet_clinic_by_name,
    get_all_vet_clinics,
    get_vet_clinic_by_id,
    remove_vet_clinic,
    update_vet_clinic,
)
from domain.vet.vet_schema import (
    VetClinicCreate,
    VetClinicUpdate,
    VetClinicResponse,
)

from domain.user.user_router import get_current_user

from models import (
    VeterinaryClinic,
    User,
)

router = APIRouter(prefix="/wallyandcoda/vet")


@router.post("/clinic")
def vet_clinic_create(
    vet_clinic_create: VetClinicCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> VetClinicResponse:
    # TODO: Check

    vet_clinic = get_vet_clinic_by_name(db, clinic_name=vet_clinic_create.name)
    if vet_clinic:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This clinic already exists in the database.",
        )

    new_clinic = create_vet_clinic(db, vet_clinic_create=vet_clinic_create)

    return VetClinicResponse(
        id=new_clinic.id,
        name=new_clinic.name,
        address=new_clinic.address,
        phone_number=new_clinic.phone_number,
        doctor_name=new_clinic.doctor_name,
    )


@router.get("/clinic")
def vet_clinic_get(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # TODO: Check
    return get_all_vet_clinics(db)


@router.put("/clinit/{id}")
def vet_clinic_update(
    vet_clinic_update: VetClinicUpdate,
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # TODO: Check
    vet_clinic = get_vet_clinic_by_id(db, id)
    return update_vet_clinic(db, vet_clinic_update, vet_clinic)


@router.delete("/clinic/{id}")
def vet_clinic_delete(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # TODO: Check
    vet_clinic = get_vet_clinic_by_id(db, id)

    return remove_vet_clinic(db, vet_clinic=vet_clinic)
