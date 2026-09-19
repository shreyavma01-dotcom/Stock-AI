import numpy as np
import pandas as pd
from typing import Optional


class TechnicalIndicatorCalculator:
    def __init__(self, df: pd.DataFrame):
        self.df = df.copy()
        if not self.df.empty:
            self._prepare()

    def _prepare(self):
        required = ["Open", "High", "Low", "Close", "Volume"]
        for col in required:
            if col not in self.df.columns:
                raise ValueError(f"Missing required column: {col}")
        self.df = self.df.sort_index()

    def rsi(self, period: int = 14) -> list[dict]:
        delta = self.df["Close"].diff()
        gain = delta.where(delta > 0, 0.0)
        loss = (-delta.where(delta < 0, 0.0))
        avg_gain = gain.rolling(window=period).mean()
        avg_loss = loss.rolling(window=period).mean()
        rs = avg_gain / avg_loss.replace(0, float("inf"))
        rsi = 100 - (100 / (1 + rs))
        return self._format_indicator("RSI", rsi, {"period": period})

    def macd(self, fast: int = 12, slow: int = 26, signal: int = 9) -> dict:
        ema_fast = self.df["Close"].ewm(span=fast).mean()
        ema_slow = self.df["Close"].ewm(span=slow).mean()
        macd_line = ema_fast - ema_slow
        signal_line = macd_line.ewm(span=signal).mean()
        histogram = macd_line - signal_line
        return {
            "indicator": "MACD",
            "values": [
                {"date": d.isoformat(), "macd": round(float(m), 4), "signal": round(float(s), 4), "histogram": round(float(h), 4)}
                for d, m, s, h in zip(self.df.index, macd_line, signal_line, histogram)
            ],
            "metadata": {"fast": fast, "slow": slow, "signal": signal},
        }

    def sma(self, period: int = 20) -> list[dict]:
        sma = self.df["Close"].rolling(window=period).mean()
        return self._format_indicator(f"SMA({period})", sma, {"period": period})

    def ema(self, period: int = 20) -> list[dict]:
        ema = self.df["Close"].ewm(span=period, adjust=False).mean()
        return self._format_indicator(f"EMA({period})", ema, {"period": period})

    def bollinger_bands(self, period: int = 20, std_dev: int = 2) -> dict:
        sma = self.df["Close"].rolling(window=period).mean()
        std = self.df["Close"].rolling(window=period).std()
        upper = sma + (std * std_dev)
        lower = sma - (std * std_dev)
        values = []
        for d, m, u, l in zip(self.df.index, sma, upper, lower):
            values.append({
                "date": d.isoformat(),
                "middle": round(float(m), 2) if not pd.isna(m) else None,
                "upper": round(float(u), 2) if not pd.isna(u) else None,
                "lower": round(float(l), 2) if not pd.isna(l) else None,
            })
        return {
            "indicator": "Bollinger Bands",
            "values": values,
            "metadata": {"period": period, "std_dev": std_dev},
        }

    def vwap(self) -> list[dict]:
        tp = (self.df["High"] + self.df["Low"] + self.df["Close"]) / 3
        vwap = (tp * self.df["Volume"]).cumsum() / self.df["Volume"].cumsum()
        return self._format_indicator("VWAP", vwap, {})

    def atr(self, period: int = 14) -> list[dict]:
        high_low = self.df["High"] - self.df["Low"]
        high_close = abs(self.df["High"] - self.df["Close"].shift())
        low_close = abs(self.df["Low"] - self.df["Close"].shift())
        tr = pd.concat([high_low, high_close, low_close], axis=1).max(axis=1)
        atr = tr.rolling(window=period).mean()
        return self._format_indicator(f"ATR({period})", atr, {"period": period})

    def adx(self, period: int = 14) -> dict:
        high = self.df["High"]
        low = self.df["Low"]
        close = self.df["Close"]

        plus_dm = high.diff()
        minus_dm = low.diff()
        plus_dm[plus_dm < 0] = 0
        minus_dm[minus_dm > 0] = 0
        minus_dm = minus_dm.abs()

        tr = pd.concat([
            high - low,
            (high - close.shift()).abs(),
            (low - close.shift()).abs(),
        ], axis=1).max(axis=1)

        atr = tr.rolling(window=period).mean()
        plus_di = 100 * (plus_dm.ewm(span=period).mean() / atr)
        minus_di = 100 * (minus_dm.ewm(span=period).mean() / atr)
        dx = (abs(plus_di - minus_di) / (plus_di + minus_di).replace(0, float("inf"))) * 100
        adx = dx.rolling(window=period).mean()

        values = []
        for d, p, m, a in zip(self.df.index, plus_di, minus_di, adx):
            values.append({
                "date": d.isoformat(),
                "plus_di": round(float(p), 2) if not pd.isna(p) else None,
                "minus_di": round(float(m), 2) if not pd.isna(m) else None,
                "adx": round(float(a), 2) if not pd.isna(a) else None,
            })
        return {"indicator": "ADX", "values": values, "metadata": {"period": period}}

    def stochastic(self, k_period: int = 14, d_period: int = 3) -> dict:
        low_min = self.df["Low"].rolling(window=k_period).min()
        high_max = self.df["High"].rolling(window=k_period).max()
        k = 100 * ((self.df["Close"] - low_min) / (high_max - low_min).replace(0, float("inf")))
        d = k.rolling(window=d_period).mean()
        values = []
        for dte, k_val, d_val in zip(self.df.index, k, d):
            values.append({
                "date": dte.isoformat(),
                "k": round(float(k_val), 2) if not pd.isna(k_val) else None,
                "d": round(float(d_val), 2) if not pd.isna(d_val) else None,
            })
        return {"indicator": "Stochastic Oscillator", "values": values, "metadata": {"k_period": k_period, "d_period": d_period}}

    def ichimoku(self) -> dict:
        high = self.df["High"]
        low = self.df["Low"]
        close = self.df["Close"]

        tenkan = (high.rolling(9).max() + low.rolling(9).min()) / 2
        kijun = (high.rolling(26).max() + low.rolling(26).min()) / 2
        senkou_a = (tenkan + kijun) / 2
        senkou_b = (high.rolling(52).max() + low.rolling(52).min()) / 2
        chikou = close.shift(-26)

        values = []
        for d, t, k, sa, sb, c in zip(self.df.index, tenkan, kijun, senkou_a, senkou_b, chikou):
            values.append({
                "date": d.isoformat(),
                "tenkan": round(float(t), 2) if not pd.isna(t) else None,
                "kijun": round(float(k), 2) if not pd.isna(k) else None,
                "senkou_a": round(float(sa), 2) if not pd.isna(sa) else None,
                "senkou_b": round(float(sb), 2) if not pd.isna(sb) else None,
                "chikou": round(float(c), 2) if not pd.isna(c) else None,
            })
        return {"indicator": "Ichimoku Cloud", "values": values, "metadata": {}}

    def fibonacci_retracement(self, high: float = None, low: float = None) -> dict:
        if high is None:
            high = self.df["High"].max()
        if low is None:
            low = self.df["Low"].min()
        diff = high - low
        levels = {
            "0%": high,
            "23.6%": high - 0.236 * diff,
            "38.2%": high - 0.382 * diff,
            "50%": high - 0.5 * diff,
            "61.8%": high - 0.618 * diff,
            "78.6%": high - 0.786 * diff,
            "100%": low,
        }
        return {"indicator": "Fibonacci Retracement", "values": levels, "metadata": {"high": high, "low": low}}

    def moving_average_crossover(self, fast_period: int = 50, slow_period: int = 200) -> dict:
        fast_ma = self.df["Close"].rolling(window=fast_period).mean()
        slow_ma = self.df["Close"].rolling(window=slow_period).mean()
        values = []
        for d, f, s in zip(self.df.index, fast_ma, slow_ma):
            values.append({
                "date": d.isoformat(),
                "fast_ma": round(float(f), 2) if not pd.isna(f) else None,
                "slow_ma": round(float(s), 2) if not pd.isna(s) else None,
            })
        return {"indicator": "Moving Average Crossover", "values": values, "metadata": {"fast_period": fast_period, "slow_period": slow_period}}

    def _format_indicator(self, name: str, series: pd.Series, metadata: dict) -> list[dict]:
        values = []
        for d, v in zip(self.df.index, series):
            values.append({
                "date": d.isoformat(),
                "value": round(float(v), 2) if not pd.isna(v) else None,
            })
        return {"indicator": name, "values": values, "metadata": metadata}
