from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, date


class HistoricalPriceResponse(BaseModel):
    date: str
    open: float
    high: float
    low: float
    close: float
    adj_close: Optional[float] = None
    volume: float


class HistoricalDataRequest(BaseModel):
    symbol: str
    period: str = Field(default="1y", pattern="^(1d|5d|1mo|3mo|6mo|1y|2y|5y|10y|max)$")
    interval: str = Field(default="1d", pattern="^(1m|2m|5m|15m|30m|60m|1d|1wk|1mo)$")
