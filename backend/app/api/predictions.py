from fastapi import APIRouter, Query, HTTPException
from app.services.prediction_service import PredictionService

router = APIRouter(prefix="/predictions", tags=["Predictions"])
prediction_service = PredictionService()


@router.get("/{symbol}")
async def predict_stock(
    symbol: str,
    horizon: str = Query("tomorrow", pattern="^(tomorrow|next_week|next_month)$"),
    model: str = Query("ensemble", pattern="^(linear_regression|random_forest|gradient_boosting|xgboost|ensemble)$"),
):
    try:
        result = await prediction_service.predict(symbol, horizon, model)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
