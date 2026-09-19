from fastapi import APIRouter, Query, HTTPException
from app.services.stock_service import StockService
from app.indicators.technical import TechnicalIndicatorCalculator
import pandas as pd

router = APIRouter(prefix="/indicators", tags=["Technical Indicators"])
stock_service = StockService()


@router.get("/{symbol}/{indicator}")
async def get_indicator(
    symbol: str,
    indicator: str,
    period: int = 14,
    fast: int = 12,
    slow: int = 26,
    signal: int = 9,
    std_dev: int = 2,
):
    data = await stock_service.get_historical_data(symbol, "1y", "1d")
    if not data:
        return {"error": "No data available"}

    df_list = []
    for d in data:
        df_list.append({
            "Open": d["open"],
            "High": d["high"],
            "Low": d["low"],
            "Close": d["close"],
            "Volume": d["volume"],
        })
    import pandas as pd
    df = pd.DataFrame(df_list, index=pd.to_datetime([d["date"] for d in data]))

    calc = TechnicalIndicatorCalculator(df)

    indicator_map = {
        "rsi": lambda: calc.rsi(period),
        "macd": lambda: calc.macd(fast, slow, signal),
        "sma": lambda: calc.sma(period),
        "ema": lambda: calc.ema(period),
        "bollinger": lambda: calc.bollinger_bands(period),
        "vwap": lambda: calc.vwap(),
        "atr": lambda: calc.atr(period),
        "adx": lambda: calc.adx(period),
        "stochastic": lambda: calc.stochastic(),
        "ichimoku": lambda: calc.ichimoku(),
        "fibonacci": lambda: calc.fibonacci_retracement(),
        "crossover": lambda: calc.moving_average_crossover(),
    }

    if indicator not in indicator_map:
        raise ValueError(f"Unknown indicator: {indicator}. Available: {list(indicator_map.keys())}")

    result = indicator_map[indicator]()
    return result
