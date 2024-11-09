'use client'

import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface Message {
  message: string;
  timeSent: string;
  isRead: boolean;
  sender: 'user' | 'other';
}

interface ChatBoxProps {
  activeUser: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ activeUser }) => {
  const [messages, setMessages] = useState<Message[]>([
    { message: 'Hello, how are you?', timeSent: '10:30 AM', isRead: true, sender: 'other' },
    { message: 'I am doing great, thanks!', timeSent: '10:31 AM', isRead: false, sender: 'user' },
  ]);

  const handleSendMessage = (message: string) => {
    const newMessage = {
      message,
      timeSent: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      sender: 'user',
    };
    setMessages((prevMessages:any) => [...prevMessages, newMessage]);
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-lg rounded-lg w-full">
      <h2 className="font-bold text-3xl p-4 border-b">{activeUser}</h2>
      <div className="flex-1 overflow-auto p-4">
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            message={msg.message}
            timeSent={msg.timeSent}
            isRead={msg.isRead}
            sender={msg.sender}
          />
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatBox;