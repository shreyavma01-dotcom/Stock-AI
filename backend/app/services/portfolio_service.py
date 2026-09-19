from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.portfolio import Portfolio, PortfolioHolding, Transaction
from app.models.stock import Stock
from app.schemas.portfolio import PortfolioCreate, TransactionCreate, PortfolioResponse, PortfolioHoldingResponse, TransactionResponse
import yfinance as yf


class PortfolioService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_portfolio(self, user_id: str, data: PortfolioCreate) -> Portfolio:
        portfolio = Portfolio(user_id=user_id, name=data.name, cash_balance=data.cash_balance)
        self.db.add(portfolio)
        await self.db.flush()
        await self.db.refresh(portfolio)
        return portfolio

    async def get_portfolios(self, user_id: str) -> list[Portfolio]:
        result = await self.db.execute(
            select(Portfolio).where(Portfolio.user_id == user_id)
        )
        return result.scalars().all()

    async def get_portfolio(self, portfolio_id: str, user_id: str) -> Portfolio:
        result = await self.db.execute(
            select(Portfolio).where(Portfolio.id == portfolio_id, Portfolio.user_id == user_id)
        )
        portfolio = result.scalar_one_or_none()
        if not portfolio:
            raise ValueError("Portfolio not found")
        return portfolio

    async def buy_stock(self, portfolio_id: str, user_id: str, symbol: str, quantity: float, price: float) -> dict:
        from app.models.stock import Stock
        portfolio = await self.get_portfolio(portfolio_id, user_id)
        total_cost = quantity * price

        if portfolio.cash_balance < total_cost:
            raise ValueError("Insufficient funds")

        result = await self.db.execute(select(Stock).where(Stock.symbol == symbol.upper()))
        stock = result.scalar_one_or_none()
        if not stock:
            stock = Stock(symbol=symbol.upper())
            self.db.add(stock)
            await self.db.flush()

        result = await self.db.execute(
            select(PortfolioHolding).where(
                PortfolioHolding.portfolio_id == portfolio_id,
                PortfolioHolding.stock_id == stock.id,
            )
        )
        holding = result.scalar_one_or_none()
        if holding:
            total_qty = holding.quantity + quantity
            total_cost = holding.total_invested + (quantity * price)
            holding.avg_buy_price = total_cost / total_qty
            holding.quantity = total_qty
            holding.total_invested = total_cost
        else:
            holding = PortfolioHolding(
                portfolio_id=portfolio_id,
                stock_id=stock.id,
                quantity=quantity,
                avg_buy_price=price,
                total_invested=quantity * price,
            )
            self.db.add(holding)

        portfolio = await self.db.get(Portfolio, portfolio_id)
        portfolio.cash_balance -= quantity * price

        transaction = Transaction(
            portfolio_id=portfolio_id,
            stock_id=stock.id,
            transaction_type="buy",
            quantity=quantity,
            price=price,
            total_amount=quantity * price,
        )
        self.db.add(transaction)
        await self.db.flush()
        return {"message": "Buy order executed", "symbol": symbol.upper(), "quantity": quantity, "price": price}

    async def sell_stock(self, portfolio_id: str, user_id: str, symbol: str, quantity: float, price: float) -> dict:
        from app.models.stock import Stock
        from app.models.portfolio import PortfolioHolding, Transaction
        portfolio = await self.get_portfolio(portfolio_id, user_id)
        result = await self.db.execute(select(Stock).where(Stock.symbol == symbol.upper()))
        stock = result.scalar_one_or_none()
        if not stock:
            raise ValueError("Stock not found")

        result = await self.db.execute(
            select(PortfolioHolding).where(
                PortfolioHolding.portfolio_id == portfolio_id,
                PortfolioHolding.stock_id == stock.id,
            )
        )
        holding = result.scalar_one_or_none()
        if not holding or holding.quantity < quantity:
            raise ValueError("Insufficient shares")

        holding.quantity -= quantity
        holding.total_invested -= (holding.avg_buy_price * quantity)
        portfolio = await self.db.get(Portfolio, portfolio_id)
        portfolio.cash_balance += quantity * price

        transaction = Transaction(
            portfolio_id=portfolio_id,
            stock_id=stock.id,
            transaction_type="sell",
            quantity=quantity,
            price=price,
            total_amount=quantity * price,
        )
        self.db.add(transaction)
        await self.db.flush()
        return {"message": "Sell order executed", "symbol": symbol.upper(), "quantity": quantity, "price": price}
