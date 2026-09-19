from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime


class NewsArticleResponse(BaseModel):
    id: str
    symbol: Optional[str] = None
    title: str
    description: Optional[str] = None
    url: Optional[str] = None
    source: Optional[str] = None
    published_at: Optional[str] = None
    sentiment_score: Optional[float] = None
    sentiment_label: Optional[str] = None
    sentiment_confidence: Optional[float] = None
    impact_score: Optional[float] = None

    model_config = ConfigDict(from_attributes=True)
