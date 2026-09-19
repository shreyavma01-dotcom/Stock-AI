from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.database import get_db
from app.auth.dependencies import get_current_active_user
from app.models.user import User
from app.services.watchlist_service import WatchlistService
from app.schemas.watchlist import WatchlistCreate, WatchlistItemCreate

router = APIRouter(prefix="/watchlist", tags=["Watchlist"])


@router.post("")
async def create_watchlist(
    data: WatchlistCreate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    service = WatchlistService(db)
    wl = await service.create_watchlist(str(current_user.id), data.name)
    return {"id": str(wl.id), "name": wl.name}


@router.get("")
async def get_watchlists(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    service = WatchlistService(db)
    watchlists = await service.get_watchlists(str(current_user.id))
    return {"watchlists": [{"id": str(w.id), "name": w.name} for w in watchlists]}


@router.post("/{watchlist_id}/items")
async def add_to_watchlist(
    watchlist_id: str,
    item: WatchlistItemCreate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    service = WatchlistService(db)
    try:
        result = await service.add_item(
            watchlist_id, str(current_user.id), item.symbol, item.alert_price_above, item.alert_price_below
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.delete("/{watchlist_id}/items/{item_id}")
async def remove_watchlist_item(
    watchlist_id: str,
    item_id: str,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    service = WatchlistService(db)
    try:
        result = await service.remove_item(watchlist_id, str(current_user.id), item_id)
        return result
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
