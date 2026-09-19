from app.ml.models import ModelTrainer


class PredictionService:
    def __init__(self):
        self.trainer = ModelTrainer()

    async def predict(self, symbol: str, horizon: str = "tomorrow", model: str = "ensemble") -> dict:
        return await self.trainer.train_and_predict(symbol, horizon, model)
