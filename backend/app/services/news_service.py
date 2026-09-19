import yfinance as yf
from textblob import TextBlob
from typing import Optional


class NewsService:
    @staticmethod
    async def get_news_with_sentiment(symbol: str, max_articles: int = 20) -> dict:
        stock = yf.Ticker(symbol.upper())
        news = stock.news[:max_articles]
        articles = []
        total_score = 0
        positive_count = 0
        negative_count = 0
        neutral_count = 0

        for article in news:
            title = article.get("title", "")
            blob = TextBlob(title)
            sentiment = blob.sentiment
            score = sentiment.polarity
            if score > 0.1:
                label = "positive"
                positive_count += 1
            elif score < -0.1:
                label = "negative"
                negative_count += 1
            else:
                label = "neutral"
                neutral_count += 1
            total_score += score

            articles.append({
                "title": title,
                "description": article.get("summary", ""),
                "url": article.get("link", ""),
                "source": article.get("publisher", ""),
                "published_at": article.get("providerPublishTime"),
                "sentiment_score": round(score, 4),
                "sentiment_label": label,
            })

        total_score = sum(a["sentiment_score"] for a in articles if a["sentiment_score"])
        avg_score = total_score / len(articles) if articles else 0
        overall = "positive" if avg_score > 0.1 else "negative" if avg_score < -0.1 else "neutral"
        confidence = abs(avg_score)
        impact = "high" if confidence > 0.5 else "medium" if confidence > 0.2 else "low"
        recommendation = "Buy" if avg_score > 0.1 else "Sell" if avg_score < -0.1 else "Hold"

        return {
            "symbol": symbol.upper(),
            "overall_sentiment": overall,
            "sentiment_score": round(avg_score, 4),
            "confidence": round(confidence, 4),
            "impact": impact,
            "recommendation": recommendation,
            "article_count": len(articles),
            "recent_articles": articles,
        }
