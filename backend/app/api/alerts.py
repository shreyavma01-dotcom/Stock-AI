from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.database import get_db
from app.auth.dependencies import get_current_active_user
from app.models.user import User
from app.services.alert_service import AlertService
from app.schemas.alert import AlertCreate

router = APIRouter(prefix="/alerts", tags=["Alerts"])


@router.post("")
async def create_alert(
    data: AlertCreate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    service = AlertService(db)
    try:
        alert = await service.create_alert(
            str(current_user.id), data.symbol, data.alert_type, data.condition_value, data.message
        )
        return {
            "id": str(alert.id),
            "alert_type": alert.alert_type,
            "condition_value": alert.condition_value,
            "message": alert.message,
            "status": alert.status,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("")
async def get_alerts(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    service = AlertService(db)
    alerts = await service.get_alerts(str(current_user.id))
    return {"alerts": alerts}
