// hooks/useWebSocket.ts
import { useEffect, useState } from 'react';
import { Message } from '@/types/message';

interface TypingEvent {
    user: string;
    typing: boolean;
}

export const useWebSocket = (conversationId: number) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [typing, setTyping] = useState<TypingEvent | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}ws/chat/${conversationId}/`);
        
        ws.onopen = () => {
            console.log("WebSocket connection established");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "chat_message") {
                const message: Message = {
                    conversation: data.conversation,
                    sender: data.sender,
                    content: data.message,
                    timestamp: data.timestamp,
                    is_read: false,
                };
                setMessages((prevMessages) => [
                    ...prevMessages,
                    message,
                ]);
            } else if (data.type === "typing_indicator") {
                setTyping({
                    user: data.user,
                    typing: data.typing,
                });
            }
        };

        setSocket(ws);

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [conversationId]);

    const sendMessage = (message: string) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ message }));
        }
    };

    const sendTypingStatus = (isTyping: boolean) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ typing: isTyping }));
        }
    };

    return { messages, typing, sendMessage, sendTypingStatus };
};
