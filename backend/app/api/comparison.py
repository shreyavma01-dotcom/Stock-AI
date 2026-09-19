from fastapi import APIRouter, Query, HTTPException
import yfinance as yf

router = APIRouter(prefix="/compare", tags=["Stock Comparison"])


@router.get("")
async def compare_stocks(symbols: str = Query(..., description="Comma-separated symbols")):
    symbol_list = [s.strip().upper() for s in symbols.split(",")]
    if len(symbol_list) < 2:
        raise HTTPException(status_code=400, detail="At least 2 symbols required")

    results = []
    for symbol in symbol_list:
        stock = yf.Ticker(symbol)
        info = stock.info
        results.append({
            "symbol": symbol,
            "name": info.get("longName", info.get("shortName")),
            "sector": info.get("sector"),
            "industry": info.get("industry"),
            "market_cap": info.get("marketCap"),
            "pe_ratio": info.get("trailingPE"),
            "forward_pe": info.get("forwardPE"),
            "eps": info.get("trailingEps"),
            "dividend_yield": info.get("dividendYield"),
            "revenue": info.get("totalRevenue"),
            "profit_margins": info.get("profitMargins"),
            "debt_to_equity": info.get("debtToEquity"),
            "fifty_two_week_high": info.get("fiftyTwoWeekHigh"),
            "fifty_two_week_low": info.get("fiftyTwoWeekLow"),
            "current_price": info.get("currentPrice"),
            "beta": info.get("beta"),
            "return_on_equity": info.get("returnOnEquity"),
        })
    return {"comparison": results}
