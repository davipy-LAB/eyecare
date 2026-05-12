from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class RegisterRequest(BaseModel):
    username: str = Field(min_length=2, max_length=32)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: str
    username: str
    email: EmailStr
    plan: str


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class PreferencesResponse(BaseModel):
    language: str
    visual_filter: str
    dynamic_contrast_enabled: bool
    contrast: float
    comfort_mode: bool
    pause_reminders: bool


class PreferencesUpdate(BaseModel):
    language: Optional[str] = None
    visual_filter: Optional[str] = None
    dynamic_contrast_enabled: Optional[bool] = None
    contrast: Optional[float] = None
    comfort_mode: Optional[bool] = None
    pause_reminders: Optional[bool] = None