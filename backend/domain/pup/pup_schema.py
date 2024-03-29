from pydantic import BaseModel, validator
from models import User
from datetime import date


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


class RecordCreate(BaseModel):
    record_type: str
    record_date: date
    doctor_name: str
    vet_address: str
    vet_phone_number: str
    cost: float
    record_note: str

    @validator(
        "record_type",
        "doctor_name",
        "vet_address",
        "vet_phone_number",
        "record_note",
    )
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError("This is a required field.")
        return v

    @validator("record_date")
    def date_not_empty(cls, v):
        if not v:
            raise ValueError("This is a required field.")
        return v

    @validator("cost")
    def cost_not_empty(cls, v):
        if not v:
            raise ValueError("This is a required field.")
        return v


class RecordUpdate(BaseModel):
    record_type: str
    record_date: date
    doctor_name: str
    vet_address: str
    vet_phone_number: str
    cost: float
    record_note: str

    @validator(
        "record_type",
        "doctor_name",
        "vet_address",
        "vet_phone_number",
        "record_note",
    )
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError("This is a required field.")
        return v

    @validator("record_date")
    def date_not_empty(cls, v):
        if not v:
            raise ValueError("This is a required field.")
        return v

    @validator("cost")
    def cost_not_empty(cls, v):
        if not v:
            raise ValueError("This is a required field.")
        return v


class ReminderCreate(BaseModel):
    reminder_date: date
    reminder_note: str
    completed: bool

    @validator("reminder_note")
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError("This is a required field.")
        return v

    @validator("reminder_date")
    def date_not_empty(cls, v):
        if not v:
            raise ValueError("This is a required field.")
        return v


class ReminderUpdate(BaseModel):
    reminder_date: date
    reminder_note: str
    completed: bool

    @validator("reminder_note")
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError("This is a required field.")
        return v

    @validator("reminder_date")
    def date_not_empty(cls, v):
        if not v:
            raise ValueError("This is a required field.")
        return v


class RecordResponse(BaseModel):
    id: str
    record_type: str
    record_date: date
    doctor_name: str
    vet_address: str
    vet_phone_number: str
    cost: float
    record_note: str
    pup_id: str


class ReminderResponse(BaseModel):
    id: str
    reminder_date: date
    reminder_note: str
    completed: bool
    pup_id: str
