import yfinance as yf
import pandas as pd
from typing import Optional
from datetime import datetime, timedelta, timezone


class StockService:
    @staticmethod
    async def search_stocks(query: str) -> list[dict]:
        stock = yf.Ticker(query.upper())
        info = stock.info
        return [
            {
                "symbol": query.upper(),
                "name": info.get("longName", info.get("shortName", query.upper())),
                "exchange": info.get("exchange"),
                "sector": info.get("sector"),
                "current_price": info.get("currentPrice"),
                "change_percent": info.get("regularMarketChangePercent"),
            }
        ]

    @staticmethod
    async def get_stock_detail(symbol: str) -> dict:
        stock = yf.Ticker(symbol.upper())
        info = stock.info
        return {
            "symbol": symbol.upper(),
            "name": info.get("longName", info.get("shortName")),
            "sector": info.get("sector"),
            "industry": info.get("industry"),
            "exchange": info.get("exchange"),
            "currency": info.get("currency"),
            "country": info.get("country"),
            "market_cap": info.get("marketCap"),
            "pe_ratio": info.get("trailingPE"),
            "eps": info.get("trailingEps"),
            "dividend_yield": info.get("dividendYield"),
            "fifty_two_week_high": info.get("fiftyTwoWeekHigh"),
            "fifty_two_week_low": info.get("fiftyTwoWeekLow"),
            "avg_volume": info.get("averageVolume"),
            "beta": info.get("beta"),
            "description": info.get("longBusinessSummary"),
            "current_price": info.get("currentPrice"),
            "previous_close": info.get("previousClose"),
            "day_high": info.get("dayHigh"),
            "day_low": info.get("dayLow"),
            "volume": info.get("volume"),
            "change": info.get("regularMarketChange"),
            "change_percent": info.get("regularMarketChangePercent"),
        }

    @staticmethod
    async def get_historical_data(symbol: str, period: str = "1y", interval: str = "1d") -> list[dict]:
        stock = yf.Ticker(symbol.upper())
        df = stock.history(period=period, interval=interval)
        if df.empty:
            return []
        df = df.reset_index()
        records = []
        for _, row in df.iterrows():
            records.append({
                "date": row["Date"].isoformat() if hasattr(row["Date"], "isoformat") else str(row["Date"]),
                "open": round(float(row["Open"]), 2),
                "high": round(float(row["High"]), 2),
                "low": round(float(row["Low"]), 2),
                "close": round(float(row["Close"]), 2),
                "adj_close": round(float(row.get("Adj Close", row["Close"])), 2),
                "volume": int(row["Volume"]),
            })
        return records

    @staticmethod
    async def get_company_info(symbol: str) -> dict:
        stock = yf.Ticker(symbol.upper())
        info = stock.info
        return {
            "symbol": symbol.upper(),
            "name": info.get("longName"),
            "sector": info.get("sector"),
            "industry": info.get("industry"),
            "country": info.get("country"),
            "website": info.get("website"),
            "description": info.get("longBusinessSummary"),
            "employees": info.get("fullTimeEmployees"),
            "market_cap": info.get("marketCap"),
            "enterprise_value": info.get("enterpriseValue"),
            "pe_ratio": info.get("trailingPE"),
            "forward_pe": info.get("forwardPE"),
            "peg_ratio": info.get("pegRatio"),
            "eps": info.get("trailingEps"),
            "dividend_yield": info.get("dividendYield"),
            "dividend_rate": info.get("dividendRate"),
            "payout_ratio": info.get("payoutRatio"),
            "book_value": info.get("bookValue"),
            "price_to_book": info.get("priceToBook"),
            "debt_to_equity": info.get("debtToEquity"),
            "revenue": info.get("totalRevenue"),
            "revenue_per_share": info.get("revenuePerShare"),
            "profit_margins": info.get("profitMargins"),
            "operating_margins": info.get("operatingMargins"),
            "return_on_equity": info.get("returnOnEquity"),
            "return_on_assets": info.get("returnOnAssets"),
            "earnings_growth": info.get("earningsGrowth"),
            "revenue_growth": info.get("revenueGrowth"),
        }

    @staticmethod
    async def get_news(symbol: str, max_articles: int = 10) -> list[dict]:
        stock = yf.Ticker(symbol.upper())
        news = stock.news[:max_articles]
        articles = []
        for article in news:
            articles.append({
                "title": article.get("title", ""),
                "description": article.get("summary", ""),
                "url": article.get("link", ""),
                "source": article.get("publisher", ""),
                "published_at": article.get("providerPublishTime"),
                "sentiment_score": None,
                "sentiment_label": None,
            })
        return articles

    @staticmethod
    async def get_recommendations(symbol: str) -> list[dict]:
        stock = yf.Ticker(symbol.upper())
        try:
            recs = stock.recommendations
            if recs is not None and not recs.empty:
                recs = recs.reset_index()
                return recs.tail(10).to_dict(orient="records")
        except Exception:
            pass
        return []

    @staticmethod
    async def get_market_overview() -> dict:
        indices = ["^GSPC", "^DJI", "^IXIC", "^RUT", "^VIX"]
        data = {}
        for idx in indices:
            ticker = yf.Ticker(idx)
            info = ticker.info
            hist = ticker.history(period="2d")
            change = None
            change_percent = None
            if len(hist) >= 2:
                prev_close = hist["Close"].iloc[-2]
                curr_close = hist["Close"].iloc[-1]
                change = round(float(curr_close - prev_close), 2)
                change_percent = round(float((curr_close - prev_close) / prev_close * 100), 2)
            data[idx] = {
                "symbol": idx,
                "name": info.get("shortName", idx),
                "current_price": info.get("regularMarketPrice"),
                "change": change,
                "change_percent": change_percent,
            }
        return data
