from fastapi import APIRouter, Query, HTTPException
import yfinance as yf
import pandas as pd
import numpy as np
from typing import Optional

router = APIRouter(prefix="/backtest", tags=["Backtesting"])


@router.post("/run")
async def run_backtest(data: dict):
    symbol = data.get("symbol", "AAPL").upper()
    initial_capital = data.get("initial_capital", 10000)
    strategy = data.get("strategy", "sma_crossover")
    fast_period = data.get("fast_period", 50)
    slow_period = data.get("slow_period", 200)

    stock = yf.Ticker(symbol)
    df = stock.history(period="2y")
    if df.empty:
        raise HTTPException(status_code=404, detail="No data available")

    df["SMA_Fast"] = df["Close"].rolling(fast_period).mean()
    df["SMA_Slow"] = df["Close"].rolling(slow_period).mean()

    capital = 10000
    position = 0
    cash = capital
    trades = []
    portfolio_values = []

    for i in range(1, len(df)):
        if pd.isna(df["SMA_Fast"].iloc[i]) or pd.isna(df["SMA_Slow"].iloc[i]):
            continue
        if df["SMA_Fast"].iloc[i] > df["SMA_Slow"].iloc[i] and df["SMA_Fast"].iloc[i - 1] <= df["SMA_Slow"].iloc[i - 1]:
            if cash > 0:
                position = cash / df["Close"].iloc[i]
                cash = 0
        elif df["SMA_Fast"].iloc[i] < df["SMA_Slow"].iloc[i] and df["SMA_Fast"].iloc[i - 1] >= df["SMA_Slow"].iloc[i - 1]:
            if position > 0:
                cash = position * df["Close"].iloc[i]
                position = 0

    final_value = cash + position * df["Close"].iloc[-1] if position > 0 else cash
    total_return = ((final_value - 10000) / 10000) * 100

    return {
        "symbol": symbol,
        "strategy": "SMA Crossover",
        "initial_capital": 10000,
        "final_value": round(final_value, 2),
        "total_return": round(total_return, 2),
        "win_rate": None,
        "max_drawdown": None,
        "sharpe_ratio": None,
    }
