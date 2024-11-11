'use client'

import React, { useState, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { CircularProgress } from '@mui/material';
import { Message } from '@/types/message';
import { Conversation } from '@/types/conversation';

import axios from 'axios';


const ChatBox: React.FC<{ name:string, messages:Message[], setMessages:Function, handleSendMessage:Function }> = ({ name, messages, setMessages, handleSendMessage }) => {
 

  return (
    <div className="flex flex-col h-full w-full bg-white-bg shadow-lg rounded-lg">
      <h2 className="font-bold text-3xl p-4 border-b">{name}</h2>
      <div className="flex-1 overflow-auto p-4">
        {messages.map((msg:Message, index) => (
          <MessageBubble
            key={index}
            message={msg.content}
            timeSent={msg.timestamp}
            isRead={msg.is_read}
            sender={msg.sender}
          />
        ))}
      </div>
      <MessageInput handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatBox;