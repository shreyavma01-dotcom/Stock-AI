import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import r2_score
import xgboost as xgb
from datetime import datetime, timedelta
from app.ml.pipeline import MLPipeline


class ModelTrainer:
    def __init__(self):
        self.pipeline = MLPipeline()

    def _get_model(self, model_name: str):
        models = {
            "linear_regression": LinearRegression(),
            "random_forest": RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42),
            "gradient_boosting": GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, random_state=42),
            "xgboost": xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, random_state=42),
        }
        if model_name not in models:
            raise ValueError(f"Unknown model: {model_name}")
        return models[model_name]

    async def train_and_predict(
        self, symbol: str, horizon: str = "tomorrow", model_name: str = "ensemble"
    ) -> dict:
        df = await self.pipeline.fetch_data(symbol)
        df = self.pipeline.engineer_features(df)

        feature_cols = [c for c in df.columns if c not in ["Target", "Dividends", "Stock Splits"]]
        X = df[feature_cols].values
        y = df["Target"].values

        split_idx = int(len(X) * 0.8)
        X_train, X_test = X[:split_idx], X[split_idx:]
        y_train, y_test = y[:split_idx], y[split_idx:]

        if model_name == "ensemble":
            return await self._ensemble_predict(X_train, y_train, X_test, y_test, symbol, horizon, df)

        model = self._get_model(model_name)
        model.fit(X_train, y_train)
        score = model.score(X_test, y_test)

        last_features = X_test[-1:].reshape(1, -1) if len(X_test.shape) == 1 else X_test[-1:]
        next_pred = model.predict(last_features)[0]

        return self._format_prediction(symbol, model_name, horizon, next_pred, score, df)

    async def _ensemble_predict(self, X_train, y_train, X_test, y_test, symbol: str, horizon: str, df: pd.DataFrame) -> dict:
        models = {
            "linear_regression": LinearRegression(),
            "random_forest": RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42),
            "gradient_boosting": GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, random_state=42),
            "xgboost": xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, random_state=42),
        }
        predictions = []
        scores = []
        trained_models = []
        for name, model in models.items():
            model.fit(X_train, y_train)
            pred = model.predict(X_test)
            score = model.score(X_test, y_test)
            predictions.append(pred)
            scores.append(score)
            trained_models.append(model)

        weights = np.array(scores) / np.sum(scores)
        ensemble_score = np.average(scores, weights=weights)

        last_features = X_test[-1:].reshape(1, -1) if len(X_test.shape) == 1 else X_test[-1:]
        final_preds = np.array([m.predict(last_features)[0] for m in trained_models])
        next_pred = np.average(final_preds, weights=weights)

        return self._format_prediction(symbol, "ensemble", horizon, next_pred, ensemble_score, df)

    def _format_prediction(self, symbol: str, model_name: str, horizon: str, predicted_price: float, score: float, df: pd.DataFrame) -> dict:
        current_price = float(df["Close"].iloc[-1])
        expected_return = ((predicted_price - current_price) / current_price) * 100
        trend = "bullish" if expected_return > 2 else "bearish" if expected_return < -2 else "neutral"
        horizon_days = {"tomorrow": 1, "next_week": 7, "next_month": 30}
        target_date = datetime.now() + timedelta(days=horizon_days.get(horizon, 1))

        return {
            "symbol": symbol.upper(),
            "model_name": model_name,
            "horizon": horizon,
            "predicted_price": round(float(predicted_price), 2),
            "confidence": round(float(max(0, min(1, score))), 4),
            "expected_return": round(float(((predicted_price - current_price) / current_price) * 100), 2),
            "trend": "bullish" if ((predicted_price - current_price) / current_price) * 100 > 2 else "bearish" if ((predicted_price - current_price) / current_price) * 100 < -2 else "neutral",
            "current_price": round(float(current_price), 2),
            "prediction_date": datetime.now().isoformat(),
            "target_date": (datetime.now() + timedelta(days={"tomorrow": 1, "next_week": 7, "next_month": 30}.get(horizon, 1))).isoformat(),
            "features_used": "SMA_5,SMA_10,SMA_20,SMA_50,EMA_12,EMA_26,RSI,MACD,Volume_MA,Volatility",
        }
