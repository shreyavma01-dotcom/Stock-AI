import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Float, BigInteger, DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database.database import Base


class Stock(Base):
    __tablename__ = "stocks"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    symbol: Mapped[str] = mapped_column(String(10), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=True)
    sector: Mapped[str] = mapped_column(String(100), nullable=True)
    industry: Mapped[str] = mapped_column(String(100), nullable=True)
    exchange: Mapped[str] = mapped_column(String(50), nullable=True)
    currency: Mapped[str] = mapped_column(String(10), nullable=True)
    country: Mapped[str] = mapped_column(String(100), nullable=True)
    market_cap: Mapped[float] = mapped_column(nullable=True)
    pe_ratio: Mapped[float] = mapped_column(nullable=True)
    eps: Mapped[float] = mapped_column(nullable=True)
    dividend_yield: Mapped[float] = mapped_column(nullable=True)
    fifty_two_week_high: Mapped[float] = mapped_column(nullable=True)
    fifty_two_week_low: Mapped[float] = mapped_column(nullable=True)
    avg_volume: Mapped[float] = mapped_column(nullable=True)
    beta: Mapped[float] = mapped_column(nullable=True)
    description: Mapped[str] = mapped_column(nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    historical_prices = relationship("HistoricalPrice", back_populates="stock")
    predictions = relationship("Prediction", back_populates="stock")
    watchlist_items = relationship("WatchlistItem", back_populates="stock")
    portfolio_holdings = relationship("PortfolioHolding", back_populates="stock")
    news_articles = relationship("NewsArticle", back_populates="stock")
