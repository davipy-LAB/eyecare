from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from app.core.database import get_db
from app.core.security import decode_access_token, get_token_from_header

router = APIRouter(prefix="/api/preferences", tags=["Preferences"])


async def get_current_user_id(token: str = Depends(get_token_from_header)):
    payload = decode_access_token(token)
    user_id = payload.get("sub")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload"
        )

    return user_id


@router.get("")
async def get_preferences(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        text("""
            SELECT
                language,
                visual_filter,
                colorblind,
                colorblind_type,
                dynamic_contrast_enabled,
                contrast,
                comfort_mode,
                pause_reminders,
                onboarding_complete,
                updated_at
            FROM public.user_preferences
            WHERE user_id = :user_id
        """),
        {"user_id": user_id}
    )

    prefs = result.mappings().first()

    if not prefs:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Preferences not found"
        )

    return dict(prefs)


@router.patch("")
async def update_preferences(
    payload: dict,
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    allowed_fields = {
        "language",
        "visual_filter",
        "colorblind",
        "colorblind_type",
        "dynamic_contrast_enabled",
        "contrast",
        "comfort_mode",
        "pause_reminders",
        "onboarding_complete"
    }

    updates = {
        key: value
        for key, value in payload.items()
        if key in allowed_fields
    }

    if not updates:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No valid preference fields provided"
        )

    set_clause = ", ".join([f"{key} = :{key}" for key in updates.keys()])
    set_clause += ", updated_at = NOW()"

    updates["user_id"] = user_id

    await db.execute(
    text("""
        INSERT INTO public.user_preferences (user_id)
        VALUES (:user_id)
        ON CONFLICT (user_id) DO NOTHING
    """),
    {"user_id": user_id}
)

    result = await db.execute(
        text(f"""
            UPDATE public.user_preferences
            SET {set_clause}
            WHERE user_id = :user_id
            RETURNING
                language,
                visual_filter,
                colorblind,
                colorblind_type,
                dynamic_contrast_enabled,
                contrast,
                comfort_mode,
                pause_reminders,
                onboarding_complete,
                updated_at
        """),
        updates
    )

    prefs = result.mappings().first()
    await db.commit()

    if not prefs:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Preferences not found"
        )
    
    return dict(prefs)