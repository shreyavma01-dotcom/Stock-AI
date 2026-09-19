import uvicorn
import asyncio
import httpx
import time

async def test():
    # Start server in background
    config = uvicorn.Config("app.main:app", host="0.0.0.0", port=8000, log_level="info")
    server = uvicorn.Server(config)
    
    # Run server in background task
    server_task = asyncio.create_task(server.serve())
    await asyncio.sleep(3)
    
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get("http://localhost:8000/")
            print(f"GET /: {resp.status_code} - {resp.json()}")
            
            resp = await client.get("http://localhost:8000/health")
            print(f"GET /health: {resp.status_code} - {resp.json()}")
            
            resp = await client.get("http://localhost:8000/api/v1/stocks/AAPL")
            print(f"GET /api/v1/stocks/AAPL: {resp.status_code}")
            if resp.status_code == 200:
                data = resp.json()
                print(f"  Symbol: {data.get('symbol')}, Price: {data.get('current_price')}")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        server.should_exit = True

asyncio.run(test())