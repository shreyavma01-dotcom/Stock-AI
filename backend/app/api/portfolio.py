from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.database import get_db
from app.auth.dependencies import get_current_active_user
from app.models.user import User
from app.services.portfolio_service import PortfolioService
from app.schemas.portfolio import PortfolioCreate, TransactionCreate

router = APIRouter(prefix="/portfolio", tags=["Portfolio"])


@router.post("")
async def create_portfolio(
    data: PortfolioCreate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    service = PortfolioService(db)
    portfolio = await service.create_portfolio(str(current_user.id), data)
    return {"id": str(portfolio.id), "name": portfolio.name, "cash_balance": portfolio.cash_balance}


@router.get("")
async def get_portfolios(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    service = PortfolioService(db)
    portfolios = await service.get_portfolios(str(current_user.id))
    return {"portfolios": [{"id": str(p.id), "name": p.name, "cash_balance": p.cash_balance} for p in portfolios]}


@router.get("/{portfolio_id}")
async def get_portfolio_detail(
    portfolio_id: str,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    service = PortfolioService(db)
    try:
        portfolio = await service.get_portfolio(portfolio_id, str(current_user.id))
        return portfolio
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/{portfolio_id}/buy")
async def buy_stock(
    portfolio_id: str,
    transaction: TransactionCreate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    service = PortfolioService(db)
    try:
        result = await service.buy_stock(
            portfolio_id, str(current_user.id), transaction.symbol, transaction.quantity, transaction.price
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/{portfolio_id}/sell")
async def sell_stock(
    portfolio_id: str,
    transaction: TransactionCreate,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    service = PortfolioService(db)
    try:
        result = await service.sell_stock(
            portfolio_id, str(current_user.id), transaction.symbol, transaction.quantity, transaction.price
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
