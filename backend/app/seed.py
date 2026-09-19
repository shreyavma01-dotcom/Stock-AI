import asyncio
from app.database.database import init_db, async_session_factory
from app.core.security import hash_password
from app.models.user import User, UserRole
from sqlalchemy import select


async def seed():
    await init_db()
    async with async_session_factory() as session:
        result = await session.execute(select(User).where(User.username == "admin"))
        if not result.scalar_one_or_none():
            admin = User(
                username="admin",
                email="admin@stocksense.ai",
                hashed_password=hash_password("admin123"),
                full_name="Admin User",
                role=UserRole.ADMIN,
                is_verified=True,
            )
            session.add(admin)

        result = await session.execute(select(User).where(User.username == "user"))
        if not result.scalar_one_or_none():
            user = User(
                username="user",
                email="user@stocksense.ai",
                hashed_password=hash_password("user123"),
                full_name="Demo User",
                role=UserRole.USER,
                is_verified=True,
            )
            session.add(user)

        await session.commit()
        print("Default users created: admin/admin123, user/user123")


if __name__ == "__main__":
    import asyncio
    asyncio.run(seed())
