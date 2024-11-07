from django.urls import path
from .consumers import ChatConsumer  # Import your WebSocket consumer

websocket_urlpatterns = [
    path('ws/chat/<int:conversation_id>/', ChatConsumer.as_asgi()),
]
