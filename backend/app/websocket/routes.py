from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from app.websocket.manager import WebSocketManager
import json
import logging

logger = logging.getLogger("stocksense")
router = APIRouter()
ws_manager = WebSocketManager()


@router.websocket("/ws/{channel}")
async def websocket_endpoint(websocket: WebSocket, channel: str = "global"):
    await ws_manager.connect(websocket, channel)
    try:
        while True:
            data = await websocket.receive_text()
            try:
                msg = json.loads(data)
                if msg.get("type") == "subscribe":
                    symbol = msg.get("symbol")
                    await ws_manager.broadcast(channel, {"type": "subscribed", "symbol": symbol})
            except json.JSONDecodeError:
                pass
    except Exception:
        pass
    finally:
        ws_manager.disconnect(websocket, channel)
