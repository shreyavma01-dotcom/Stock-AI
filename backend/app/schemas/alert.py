from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import datetime


class AlertCreate(BaseModel):
    symbol: str
    alert_type: str = Field(pattern="^(price_above|price_below|volume_spike|rsi_overbought|rsi_oversold|news_sentiment|prediction)$")
    condition_value: Optional[float] = None
    message: Optional[str] = None


class AlertResponse(BaseModel):
    id: str
    symbol: Optional[str] = None
    alert_type: str
    condition_value: Optional[float] = None
    message: Optional[str] = None
    status: str
    triggered_at: Optional[str] = None
    created_at: str

    model_config = ConfigDict(from_attributes=True)
