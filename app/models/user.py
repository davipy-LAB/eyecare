# app/models/user.py

from sqlalchemy import String, Text, Boolean, Numeric, ForeignKey, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
import uuid

class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username: Mapped[str] = mapped_column(String(32), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(Text, nullable=False)
    plan: Mapped[str] = mapped_column(String(20), nullable=False, default="standard")
    created_at = mapped_column(DateTime, server_default=func.now())
    updated_at = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    preferences = relationship("UserPreferences", back_populates="user", uselist=False)


class UserPreferences(Base):
    __tablename__ = "user_preferences"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        primary_key=True
    )

    language: Mapped[str] = mapped_column(String(10), nullable=False, default="pt")
    visual_filter: Mapped[str] = mapped_column(String(30), nullable=False, default="none")
    dynamic_contrast_enabled: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    contrast = mapped_column(Numeric(4, 2), nullable=False, default=1.00)
    comfort_mode: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    pause_reminders: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    updated_at = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="preferences")