from fastapi import APIRouter, Query, HTTPException
from app.services.stock_service import StockService

router = APIRouter(prefix="/stocks", tags=["Stocks"])
stock_service = StockService()


@router.get("/search")
async def search_stocks(q: str = Query(..., min_length=1, max_length=10)):
    results = await stock_service.search_stocks(q)
    return {"results": results}


@router.get("/{symbol}")
async def get_stock(symbol: str):
    detail = await stock_service.get_stock_detail(symbol)
    if not detail.get("name"):
        raise HTTPException(status_code=404, detail=f"Stock {symbol} not found")
    return detail


@router.get("/{symbol}/history")
async def get_history(symbol: str, period: str = "1y", interval: str = "1d"):
    data = await stock_service.get_historical_data(symbol, period, interval)
    return {"symbol": symbol.upper(), "period": period, "interval": interval, "data": data}


@router.get("/{symbol}/company")
async def get_company(symbol: str):
    info = await stock_service.get_company_info(symbol)
    return info


@router.get("/{symbol}/news")
async def get_news(symbol: str, max: int = 10):
    articles = await stock_service.get_news(symbol, max)
    return {"symbol": symbol.upper(), "articles": articles}


@router.get("/{symbol}/recommendations")
async def get_recommendations(symbol: str):
    recs = await stock_service.get_recommendations(symbol)
    return {"symbol": symbol.upper(), "recommendations": recs}


@router.get("/market/overview")
async def market_overview():
    return await stock_service.get_market_overview()
