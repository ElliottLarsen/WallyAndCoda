from sqlalchemy import (
    Column,
    ForeignKey,
    String,
    DateTime,
    Integer,
    Text,
    Boolean,
    Float,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class User(Base):
    """
    User table in DB
    """

    __tablename__ = "site_user"
    id = Column(String, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    created = Column(DateTime, nullable=False)
    modified = Column(DateTime, nullable=False)
    last_verified = Column(DateTime, nullable=True)
    last_login_attempt = Column(DateTime, nullable=True)
    login_attempts = Column(Integer, nullable=False)


class Pup(Base):
    """
    Pup table in DB
    """

    __tablename__ = "pup"
    id = Column(String, primary_key=True)
    pup_name = Column(String, unique=True, nullable=False)
    pup_sex = Column(String, unique=False, nullable=False)
    microchip_number = Column(String, unique=True, nullable=False)
    akc_registration_number = Column(String, unique=True, nullable=True)
    akc_registration_name = Column(String, unique=True, nullable=True)


class VeterinaryClinic(Base):
    """
    Vet Clinic table in DB
    """

    __tablename__ = "veterinary_clinic"
    id = Column(String, primary_key=True)
    address = Column(String, unique=False, nullable=False)
    phone_number = Column(String, unique=False, nullable=False)
    doctor_name = Column(String, unique=False, nullable=False)


class VetVisit(Base):
    """
    Vet Visit table in DB
    """

    __tablename__ = "vet_visit"
    id = Column(String, primary_key=True)
    vet_visit_date = Column(DateTime, unique=False, nullable=False)
    vet_visit_note = Column(String, unique=False, nullable=False)
    cost = Column(Float, unique=False, nullable=False)
    pup_id = Column(String, ForeignKey("pup.id"))
    pup = relationship("Pup", backref="vet_visit")
    vet_id = Column(String, ForeignKey("veterinary_clinic.id"))
    vet_clinit = relationship("VeterinaryClinic", backref="vet_visit")


class PupMedicalRecord(Base):
    """
    Pup Medical Record table in DB
    """

    __tablename__ = "pup_medical_record"
    id = Column(String, primary_key=True)
    pup_id = Column(String, ForeignKey("pup.id"))
    pup = relationship("Pup", backref="vet_visit")


class Record(Base):
    """
    Record table in DB
    """

    __tablename__ = "record"
    id = Column(String, primary_key=True)
    record_type = Column(String, nullable=False)
    record_date = Column(DateTime, nullable=False)
    record_note = Column(DateTime, nullable=False)
    record_id = Column(String, ForeignKey("pup_medical_record.id"))
    record = relationship("PupMedicalRecord", backref="record")
