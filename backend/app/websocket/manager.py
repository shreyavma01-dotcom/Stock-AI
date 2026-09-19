import json
import asyncio
import logging
from typing import Set, Dict, Any
from fastapi import WebSocket, WebSocketDisconnect

logger = logging.getLogger("stocksense")


class WebSocketManager:
    def __init__(self):
        self.active_connections: dict[str, list[WebSocket]] = {}
        self.user_connections: dict[str, list[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, channel: str = "global", user_id: str = None):
        await websocket.accept()
        if channel not in self.active_connections:
            self.active_connections[channel] = []
        self.active_connections[channel].append(websocket)
        if user_id:
            if user_id not in self.user_connections:
                self.user_connections[user_id] = []
            self.user_connections[user_id].append(websocket)

    def disconnect(self, websocket: WebSocket, channel: str = "global", user_id: str = None):
        if channel in self.active_connections:
            self.active_connections[channel] = [ws for ws in self.active_connections[channel] if ws != websocket]
        if user_id and user_id in self.user_connections:
            self.user_connections[user_id] = [ws for ws in self.user_connections[user_id] if ws != websocket]

    async def broadcast(self, channel: str, message: dict):
        if channel in self.active_connections:
            for ws in self.active_connections[channel]:
                try:
                    await ws.send_json(message)
                except Exception:
                    pass

    async def send_to_user(self, user_id: str, message: dict):
        if user_id in self.user_connections:
            for ws in self.user_connections[user_id]:
                try:
                    await ws.send_json(message)
                except Exception:
                    pass
