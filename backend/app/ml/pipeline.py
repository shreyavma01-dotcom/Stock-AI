import numpy as np
import pandas as pd
from typing import Optional
from datetime import datetime, timedelta
import yfinance as yf
import joblib
import os
from pathlib import Path


class MLPipeline:
    def __init__(self):
        self.model_dir = Path("ml_models")
        self.model_dir.mkdir(exist_ok=True)

    async def fetch_data(self, symbol: str, period: str = "5y") -> pd.DataFrame:
        stock = yf.Ticker(symbol.upper())
        df = stock.history(period=period)
        return df

    def engineer_features(self, df: pd.DataFrame) -> pd.DataFrame:
        data = df.copy()
        data["Returns"] = data["Close"].pct_change()
        data["Log_Returns"] = np.log(data["Close"] / data["Close"].shift(1))
        data["SMA_5"] = data["Close"].rolling(5).mean()
        data["SMA_10"] = data["Close"].rolling(10).mean()
        data["SMA_20"] = data["Close"].rolling(20).mean()
        data["SMA_50"] = data["Close"].rolling(50).mean()
        data["EMA_12"] = data["Close"].ewm(span=12).mean()
        data["EMA_26"] = data["Close"].ewm(span=26).mean()
        data["RSI"] = self._compute_rsi(data["Close"])
        data["MACD"] = data["EMA_12"] - data["EMA_26"]
        data["Volume_MA"] = data["Volume"].rolling(20).mean()
        data["High_Low_Ratio"] = data["High"] / data["Low"]
        data["Close_Open_Ratio"] = data["Close"] / data["Open"]
        data["Price_Volume"] = data["Close"] * data["Volume"]
        data["Day_Return"] = data["Close"].pct_change()
        data["Volatility"] = data["Day_Return"].rolling(20).std()
        data["Target"] = data["Close"].shift(-1)
        return data.dropna()

    def _compute_rsi(self, series: pd.Series, period: int = 14) -> pd.Series:
        delta = series.diff()
        gain = delta.where(delta > 0, 0.0)
        loss = (-delta.where(delta < 0, 0.0))
        avg_gain = gain.rolling(window=period).mean()
        avg_loss = loss.rolling(window=period).mean()
        rs = avg_gain / avg_loss.replace(0, float("inf"))
        return 100 - (100 / (1 + rs))
