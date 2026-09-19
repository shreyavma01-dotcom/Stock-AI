from pydantic import BaseModel
from typing import Optional, List


class SentimentResponse(BaseModel):
    symbol: str
    overall_sentiment: str
    sentiment_score: float
    confidence: float
    impact: str
    recommendation: str
    article_count: int
    recent_articles: list[dict]
