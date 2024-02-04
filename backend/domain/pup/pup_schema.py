from pydantic import BaseModel, validator
from models import User


class PupCreate(BaseModel):
    pup_name: str
    pup_sex: str
    microchip_number: str
    akc_registration_number: str
    akc_registration_name: str

    @validator("pup_name", "pup_sex", "microchip_number")
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError("This is a required field.")
        return v


class PupUpdate(BaseModel):
    pup_name: str
    pup_sex: str
    microchip_number: str
    akc_registration_number: str
    akc_registration_name: str

    @validator("pup_name", "pup_sex", "microchip_number")
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError("This is a required field.")
        return v


class PupResponse(BaseModel):
    id: str
    pup_name: str
    pup_sex: str
    microchip_number: str
    akc_registration_number: str
    akc_registration_name: str
    owner_id: str