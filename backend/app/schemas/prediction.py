from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class PredictionRequest(BaseModel):
    symbol: str
    horizon: str = Field(default="tomorrow", pattern="^(tomorrow|next_week|next_month)$")
    model: str = Field(default="ensemble", pattern="^(linear_regression|random_forest|gradient_boosting|xgboost|lstm|ensemble)$")


class PredictionResponse(BaseModel):
    symbol: str
    model_name: str
    horizon: str
    predicted_price: float
    confidence: float
    expected_return: float
    trend: str
    current_price: float
    prediction_date: str
    target_date: str
    features_used: Optional[str] = None


class PredictionHistoryResponse(BaseModel):
    predictions: List[PredictionResponse]
    symbol: str
    model_name: str
