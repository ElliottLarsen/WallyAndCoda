from sqlalchemy.orm import Session
from domain.user.user_schema import UserCreate
from models import User
from passlib.context import CryptContext
import uuid
from datetime import datetime, timedelta
from starlette import status
from fastapi import HTTPException

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_user(db: Session, user_create: UserCreate) -> User:
    """
    Creates a new user
    """
    db_user = User(
        id=str(uuid.uuid4()),
        username=user_create.username,
        password=pwd_context.hash(user_create.password1),
        email=user_create.email,
        first_name=user_create.first_name,
        last_name=user_create.last_name,
        created=datetime.utcnow(),
        modified=datetime.utcnow(),
        last_verified=datetime.utcnow(),
        last_login_attempt=datetime.utcnow(),
        login_attempts=0,
    )

    db.add(db_user)
    db.commit()

    return get_user_by_username(db, user_create.username)


def get_user_by_username(db: Session, username: str) -> User | None:
    """
    Retrieves a user by the given username
    """
    return db.query(User).filter(User.username == username).first()


def get_user_by_id(db: Session, id: str) -> User | None:
    """
    Retrieves a user by the given ID
    """
    return db.query(User).filter(User.id == id).first()


def get_existing_user(db: Session, user_create: UserCreate) -> User | None:
    """
    Retrieves user with the given username or email.
    """
    return (
        db.query(User)
        .filter(
            (User.username == user_create.username) |
            (User.email == user_create.email)
        )
        .first()
    )


def update_login_attempts(
    db: Session,
    current_user: User,
    login_attempts: int = 0,
    last_login_attempt: datetime = None,
) -> None:
    user = get_user_by_username(db, current_user.username)
    user.login_attempts += login_attempts
    if last_login_attempt:
        user.last_login_attempt = last_login_attempt
    db.add(user)
    db.commit()


def check_login_attempts(db: Session, current_user: User):
    if current_user.login_attempts == 3:
        if datetime.utcnow() < current_user.last_login_attempt:
            remainder = (
                current_user.last_login_attempt - datetime.utcnow()
            ).total_seconds()
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Too many failed login attempts. \
                Please try again in {remainder} seconds.",
                headers={"WWW-Authenticate": "Bearer"},
            )
        else:
            update_login_attempts(
                db, current_user,
                -(current_user.login_attempts)
            )
    if current_user.login_attempts == 2:
        new_time = current_user.last_login_attempt + timedelta(minutes=10)
        update_login_attempts(db, current_user, 0, new_time)


def remove_user(db: Session, current_user: User) -> None:
    db.delete(current_user)
    db.commit()
