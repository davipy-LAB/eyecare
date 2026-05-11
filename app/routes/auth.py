from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.core.database import get_db
from app.schemas.auth import RegisterRequest, LoginRequest
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token,
    get_token_from_header,
    oauth2_scheme
)

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.get("/me")
async def me(
    token: str = Depends(get_token_from_header),
    db: AsyncSession = Depends(get_db)
):
    payload = decode_access_token(token)

    user_id = payload.get("sub")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload"
        )

    result = await db.execute(
        text("""
            SELECT id, username, email, plan
            FROM public.users
            WHERE id = :user_id
        """),
        {"user_id": user_id}
    )

    user = result.mappings().first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return {
        "id": str(user["id"]),
        "username": user["username"],
        "email": user["email"],
        "plan": user["plan"]
    }

@router.post("/register")
async def register(payload: RegisterRequest, db: AsyncSession = Depends(get_db)):
    existing_user = await db.execute(
        text("SELECT id FROM public.users WHERE email = :email"),
        {"email": payload.email}
    )

    if existing_user.first():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )

    password_hash = hash_password(payload.password)

    result = await db.execute(
        text("""
            INSERT INTO public.users (username, email, password_hash)
            VALUES (:username, :email, :password_hash)
            RETURNING id, username, email, plan
        """),
        {
            "username": payload.username,
            "email": payload.email,
            "password_hash": password_hash
        }
    )

    user = result.mappings().first()

    await db.execute(
        text("""
            INSERT INTO public.user_preferences (user_id)
            VALUES (:user_id)
        """),
        {"user_id": user["id"]}
    )

    await db.commit()

    token = create_access_token({
        "sub": str(user["id"])
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": str(user["id"]),
            "username": user["username"],
            "email": user["email"],
            "plan": user["plan"]
        }
    }

@router.post("/login")
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        text("""
            SELECT id, username, email, password_hash, plan
            FROM public.users
            WHERE email = :email
        """),
        {"email": payload.email}
    )

    user = result.mappings().first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_access_token({
        "sub": str(user["id"])
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": str(user["id"]),
            "username": user["username"],
            "email": user["email"],
            "plan": user["plan"]
        }
    }