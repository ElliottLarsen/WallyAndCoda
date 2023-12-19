from pydantic import BaseModel, validator, EmailStr
from datetime import datetime


class VetClinicCreate(BaseModel):
    address: str
    phone_number: str
    doctor_name: str

    @validator("address", "phone_number", "doctor_name")
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError("This is a required field.")
        return v


class VetClinicUpdate(BaseModel):
    address: str
    phone_number: str
    doctor_name: str

    @validator("address", "phone_number", "doctor_name")
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError("This is a required field.")
        return v


class VetClinitResponse(BaseModel):
    id: str
    address: str
    phone_number: str
    doctor_name: str
