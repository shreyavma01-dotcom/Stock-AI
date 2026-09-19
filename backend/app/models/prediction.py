import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Float, DateTime, ForeignKey, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
import enum
from app.database.database import Base


class PredictionHorizon(str, enum.Enum):
    TOMORROW = "tomorrow"
    NEXT_WEEK = "next_week"
    NEXT_MONTH = "next_month"


class PredictionTrend(str, enum.Enum):
    BULLISH = "bullish"
    BEARISH = "bearish"
    NEUTRAL = "neutral"


class Prediction(Base):
    __tablename__ = "predictions"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    stock_id: Mapped[str] = mapped_column(UUID(as_uuid=True), ForeignKey("stocks.id", ondelete="CASCADE"), nullable=False)
    model_name: Mapped[str] = mapped_column(String(50), nullable=False)
    horizon: Mapped[str] = mapped_column(String(20), nullable=False)
    predicted_price: Mapped[float] = mapped_column(nullable=False)
    confidence: Mapped[float] = mapped_column(nullable=True)
    expected_return: Mapped[float] = mapped_column(nullable=True)
    trend: Mapped[str] = mapped_column(String(20), nullable=True)
    prediction_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    target_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    features_used: Mapped[str] = mapped_column(nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.now(timezone.utc))

    stock = relationship("Stock", back_populates="predictions")
