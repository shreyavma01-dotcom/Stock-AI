from pydantic import BaseModel
from typing import Optional, List, Any


class TechnicalIndicatorResponse(BaseModel):
    symbol: str
    indicator: str
    values: list[dict[str, Any]]
    metadata: dict[str, Any]
