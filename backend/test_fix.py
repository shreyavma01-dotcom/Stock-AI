import asyncio, uuid
from app.core.security import create_access_token, decode_token, hash_password, verify_password

# 1. Test bcrypt
pw = "test123"
h = hash_password(pw)
assert verify_password(pw, h), "bcrypt verify failed"
print("1. bcrypt OK")

# 2. Test token with UUID
user_guid = uuid.uuid4()
token = create_access_token({"sub": str(user_guid)})
payload = decode_token(token)
assert payload["type"] == "access"
assert payload["sub"] == str(user_guid)
print(f"2. Token OK - uuid in: {user_guid}, uuid out: {payload['sub']}")

# 3. Simulate the dependencies fix
from app.database.database import init_db, async_session_factory
from sqlalchemy import select
from app.models.user import User

async def test_query():
    await init_db()
    async with async_session_factory() as session:
        result = await session.execute(select(User).where(User.username == 'admin'))
        user = result.scalar_one_or_none()
        assert user and user.username == "admin"

        token = create_access_token({"sub": str(user.id)})
        p = decode_token(token)
        user_result = await session.execute(select(User).where(User.id == uuid.UUID(p["sub"])))
        user2 = user_result.scalar_one_or_none()
        assert user2 is not None
        assert user2.username == "admin"

        print(f"3. Query OK - id: {user2.id} - username: {user2.username}")

asyncio.run(test_query())
print("ALL TESTS PASSED")
