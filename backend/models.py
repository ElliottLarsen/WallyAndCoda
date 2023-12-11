from sqlalchemy import Column, ForeignKey, String, DateTime, Integer, Text, Boolean
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
