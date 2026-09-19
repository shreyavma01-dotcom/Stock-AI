from fastapi import APIRouter, Query, HTTPException
import yfinance as yf
from typing import Optional

router = APIRouter(prefix="/screener", tags=["Stock Screener"])

PRESET_SYMBOLS = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "META", "NVDA", "TSLA", "JPM", "V", "WMT",
    "JNJ", "PG", "MA", "UNH", "HD", "DIS", "PYPL", "ADBE", "CRM", "NFLX",
    "INTC", "AMD", "BA", "GE", "CAT", "XOM", "CVX", "KO", "PEP", "MCD",
]


@router.get("")
async def screen_stocks(
    sector: str = None,
    min_market_cap: float = None,
    max_market_cap: float = None,
    min_pe: float = None,
    max_pe: float = None,
    min_eps: float = None,
    min_dividend: float = None,
    min_price: float = None,
    max_price: float = None,
):
    results = []
    for symbol in PRESET_SYMBOLS:
        try:
            stock = yf.Ticker(symbol)
            info = stock.info
            price = info.get("currentPrice")
            market_cap = info.get("marketCap")
            pe = info.get("trailingPE")
            eps = info.get("trailingEps")
            dividend = info.get("dividendYield")

            if min_price and (price is None or price < min_price):
                continue
            if max_price and (price is None or price > max_price):
                continue
            if min_market_cap and (market_cap is None or market_cap < min_market_cap):
                continue
            if max_market_cap and (market_cap is None or market_cap > max_market_cap):
                continue
            if min_pe and (pe is None or pe < min_pe):
                continue
            if max_pe and (pe is None or pe > max_pe):
                continue

            results.append({
                "symbol": symbol,
                "name": info.get("longName", info.get("shortName")),
                "sector": info.get("sector"),
                "current_price": info.get("currentPrice"),
                "market_cap": info.get("marketCap"),
                "pe_ratio": info.get("trailingPE"),
                "eps": info.get("trailingEps"),
                "dividend_yield": info.get("dividendYield"),
                "volume": info.get("volume"),
                "change_percent": info.get("regularMarketChangePercent"),
            })
        except Exception:
            continue

    return {"results": results, "total": len(results)}
