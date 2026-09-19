from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.watchlist import Watchlist, WatchlistItem
from app.models.stock import Stock
import yfinance as yf


class WatchlistService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_watchlist(self, user_id: str, name: str = "Default") -> Watchlist:
        wl = Watchlist(user_id=user_id, name=name)
        self.db.add(wl)
        await self.db.flush()
        await self.db.refresh(wl)
        return wl

    async def get_watchlists(self, user_id: str) -> list[Watchlist]:
        result = await self.db.execute(
            select(Watchlist).where(Watchlist.user_id == user_id)
        )
        return result.scalars().all()

    async def add_item(self, watchlist_id: str, user_id: str, symbol: str, alert_above: float = None, alert_below: float = None) -> dict:
        from app.models.watchlist import Watchlist, WatchlistItem
        from app.models.stock import Stock
        result = await self.db.execute(
            select(Watchlist).where(Watchlist.id == watchlist_id, Watchlist.user_id == user_id)
        )
        wl = result.scalar_one_or_none()
        if not wl:
            raise ValueError("Watchlist not found")

        result = await self.db.execute(select(Stock).where(Stock.symbol == symbol.upper()))
        stock = result.scalar_one_or_none()
        if not stock:
            stock = Stock(symbol=symbol.upper())
            self.db.add(stock)
            await self.db.flush()

        item = WatchlistItem(
            watchlist_id=watchlist_id,
            stock_id=stock.id,
            alert_price_above=alert_above,
            alert_price_below=alert_below,
        )
        self.db.add(item)
        await self.db.flush()
        return {"message": f"{symbol.upper()} added to watchlist"}

    async def remove_item(self, watchlist_id: str, user_id: str, item_id: str) -> dict:
        from app.models.watchlist import Watchlist, WatchlistItem
        result = await self.db.execute(
            select(Watchlist).where(Watchlist.id == watchlist_id, Watchlist.user_id == user_id)
        )
        wl = result.scalar_one_or_none()
        if not wl:
            raise ValueError("Watchlist not found")
        result = await self.db.execute(
            select(WatchlistItem).where(WatchlistItem.id == item_id, WatchlistItem.watchlist_id == watchlist_id)
        )
        item = result.scalar_one_or_none()
        if not item:
            raise ValueError("Item not found")
        await self.db.delete(item)
        await self.db.flush()
        return {"message": "Item removed from watchlist"}
