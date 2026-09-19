from fastapi import APIRouter, Query, HTTPException
from app.services.news_service import NewsService

router = APIRouter(prefix="/news", tags=["News & Sentiment"])
news_service = NewsService()


@router.get("/{symbol}")
async def get_news_sentiment(symbol: str, max_articles: int = 20):
    try:
        result = await news_service.get_news_with_sentiment(symbol, max_articles)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
