from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List
from datetime import datetime


class WatchlistCreate(BaseModel):
    name: str = "Default"


class WatchlistItemCreate(BaseModel):
    symbol: str
    alert_price_above: Optional[float] = None
    alert_price_below: Optional[float] = None


class WatchlistItemResponse(BaseModel):
    id: str
    symbol: str
    name: Optional[str] = None
    current_price: Optional[float] = None
    change_percent: Optional[float] = None
    alert_price_above: Optional[float] = None
    alert_price_below: Optional[float] = None
    added_at: str

    model_config = ConfigDict(from_attributes=True)


class WatchlistResponse(BaseModel):
    id: str
    name: str
    items: list[WatchlistItemResponse]
    created_at: str

    model_config = ConfigDict(from_attributes=True)


class WatchlistCreate(BaseModel):
    name: str = "Default"
