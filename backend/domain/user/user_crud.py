from sqlalchemy.orm import Session
from domain.user.user_schema import UserCreate, UserResponse
from models import User
from passlib.context import CryptContext
import uuid
from datetime import datetime

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
    Retrives a user by the given username
    """
    return db.query(User).filter(User.username == username).first()


def get_user_by_id(db: Session, id: str) -> User | None:
    """
    Retrives a user by the given ID
    """
    return db.query(User).filter(User.id == id).first()
