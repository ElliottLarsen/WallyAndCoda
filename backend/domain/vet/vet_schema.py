from pydantic import BaseModel, validator


class VetClinicCreate(BaseModel):
    name: str
    address: str
    phone_number: str
    doctor_name: str

    @validator("name", "address", "phone_number", "doctor_name")
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError("This is a required field.")
        return v


class VetClinicUpdate(BaseModel):
    name: str
    address: str
    phone_number: str
    doctor_name: str

    @validator("name", "address", "phone_number", "doctor_name")
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError("This is a required field.")
        return v


class VetClinicResponse(BaseModel):
    id: str
    name: str
    address: str
    phone_number: str
    doctor_name: str
