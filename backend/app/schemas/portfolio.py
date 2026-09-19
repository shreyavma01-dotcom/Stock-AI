from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List
from datetime import datetime


class PortfolioCreate(BaseModel):
    name: str = "My Portfolio"
    cash_balance: float = 100000.0


class TransactionCreate(BaseModel):
    symbol: str
    transaction_type: str = Field(pattern="^(buy|sell)$")
    quantity: float = Field(gt=0)
    price: float = Field(gt=0)


class TransactionResponse(BaseModel):
    id: str
    symbol: str
    transaction_type: str
    quantity: float
    price: float
    total_amount: float
    transaction_date: str

    model_config = ConfigDict(from_attributes=True)


class PortfolioHoldingResponse(BaseModel):
    id: str
    symbol: str
    name: Optional[str] = None
    quantity: float
    avg_buy_price: float
    total_invested: float
    current_price: Optional[float] = None
    current_value: Optional[float] = None
    profit_loss: Optional[float] = None
    profit_loss_percent: Optional[float] = None
    allocation_percent: Optional[float] = None

    model_config = ConfigDict(from_attributes=True)


class PortfolioResponse(BaseModel):
    id: str
    name: str
    cash_balance: float
    total_value: Optional[float] = None
    total_invested: Optional[float] = None
    total_profit_loss: Optional[float] = None
    total_profit_loss_percent: Optional[float] = None
    holdings: list[PortfolioHoldingResponse]
    transactions: list["TransactionResponse"]

    model_config = ConfigDict(from_attributes=True)


class TransactionResponse(BaseModel):
    id: str
    symbol: str
    transaction_type: str
    quantity: float
    price: float
    total_amount: float
    transaction_date: str

    model_config = ConfigDict(from_attributes=True)
