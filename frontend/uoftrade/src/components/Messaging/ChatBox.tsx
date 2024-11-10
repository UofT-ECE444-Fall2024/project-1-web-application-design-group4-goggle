'use client'

import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

import { useWebSocket } from '@/hooks/useWebSocket';

import { Message } from '@/types/message';

interface ChatBoxProps {
  convoID: number;
  participant: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ convoID, participant }) => {

  const { messages, typing, sendMessage, sendTypingStatus } = useWebSocket(convoID);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
      if (!isTyping) {
          setIsTyping(true);
          sendTypingStatus(true);
      }
  };

  const handleSendMessage = () => {
      sendMessage(message);
      setMessage('');
      setIsTyping(false);
      sendTypingStatus(false);
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-lg rounded-lg w-full">
      <h2 className="font-bold text-3xl p-4 border-b">{participant}</h2>
      <div className="flex-1 overflow-auto p-4">
        {messages.map((msg:Message, index:number) => (
          <MessageBubble
            message={msg}
            key={index}
          />
        ))}
      </div>
      <MessageInput
          message={message}
          onMessageChange={handleMessageChange}
          onSendMessage={handleSendMessage}
          typing={isTyping}
      />
    </div>
  );
};

export default ChatBox;