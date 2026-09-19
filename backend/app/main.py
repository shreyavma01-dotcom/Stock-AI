import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.database.database import init_db
from app.middleware.logging_middleware import LoggingMiddleware

settings = get_settings()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("stocksense")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting StockSense AI Pro...")
    await init_db()
    logger.info("Database initialized")
    yield
    logger.info("Shutting down StockSense AI Pro...")


app = FastAPI(
    title=settings.APP_NAME,
    description="AI-Powered Stock Market Analysis and Prediction Platform",
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(LoggingMiddleware)

from app.api.auth import router as auth_router
from app.api.stocks import router as stock_router
from app.api.indicators import router as indicator_router
from app.api.predictions import router as prediction_router
from app.api.portfolio import router as portfolio_router
from app.api.watchlist import router as watchlist_router
from app.api.news import router as news_router
from app.api.alerts import router as alerts_router
from app.api.comparison import router as comparison_router
from app.api.screener import router as screener_router
from app.api.backtesting import router as backtest_router
from app.websocket.routes import router as ws_router

app.include_router(auth_router, prefix=settings.API_V1_PREFIX)
app.include_router(stock_router, prefix=settings.API_V1_PREFIX)
app.include_router(indicator_router, prefix=settings.API_V1_PREFIX)
app.include_router(prediction_router, prefix=settings.API_V1_PREFIX)
app.include_router(portfolio_router, prefix=settings.API_V1_PREFIX)
app.include_router(watchlist_router, prefix=settings.API_V1_PREFIX)
app.include_router(news_router, prefix=settings.API_V1_PREFIX)
app.include_router(alerts_router, prefix=settings.API_V1_PREFIX)
app.include_router(comparison_router, prefix=settings.API_V1_PREFIX)
app.include_router(screener_router, prefix=settings.API_V1_PREFIX)
app.include_router(backtest_router, prefix=settings.API_V1_PREFIX)
app.include_router(ws_router)


@app.get("/")
async def home():
    return {"message": "Welcome to StockSense AI Pro", "status": "Running", "version": settings.APP_VERSION}


@app.get("/health")
async def health():
    return {"status": "healthy", "version": settings.APP_VERSION}

