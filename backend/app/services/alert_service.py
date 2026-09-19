from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.alert import Alert
from app.models.stock import Stock
from datetime import datetime, timezone


class AlertService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_alert(self, user_id: str, symbol: str, alert_type: str, condition_value: float = None, message: str = None) -> Alert:
        from app.models.stock import Stock
        result = await self.db.execute(select(Stock).where(Stock.symbol == symbol.upper()))
        stock = result.scalar_one_or_none()
        if not stock:
            stock = Stock(symbol=symbol.upper())
            self.db.add(stock)
            await self.db.flush()

        alert = Alert(
            user_id=user_id,
            stock_id=stock.id,
            alert_type=alert_type,
            condition_value=condition_value,
            message=message,
        )
        self.db.add(alert)
        await self.db.flush()
        await self.db.refresh(alert)
        return alert

    async def get_alerts(self, user_id: str) -> list:
        from app.models.alert import Alert
        from app.models.stock import Stock
        result = await self.db.execute(
            select(Alert).where(Alert.user_id == user_id).order_by(Alert.created_at.desc())
        )
        alerts = result.scalars().all()
        return alerts
