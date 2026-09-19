from celery import Celery
from app.core.config import get_settings

settings = get_settings()

celery_app = Celery(
    "stocksense",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,
    result_expires=3600,
)


@celery_app.task(name="fetch_stock_data")
def fetch_stock_data(symbol: str):
    import yfinance as yf
    stock = yf.Ticker(symbol)
    data = stock.history(period="1d")
    return {"symbol": symbol, "data": data.to_dict()}


@celery_app.task(name="train_model")
def train_model(symbol: str, model_name: str = "ensemble"):
    from app.ml.models import ModelTrainer
    import asyncio
    trainer = ModelTrainer()
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(trainer.train_and_predict(symbol, "tomorrow", model_name))
    loop.close()
    return result
