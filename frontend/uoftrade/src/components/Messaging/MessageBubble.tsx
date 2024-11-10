'use client'

import React from 'react';
import { Tooltip } from '@mui/material'; // For displaying the time sent in a tooltip

import { Message } from '@/types/message';

const MessageBubble: React.FC<{ message: Message, key:number }> = ({ message, key }) => {
  return (
    <div key={key} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs p-3 rounded-xl ${message.sender === 'user' ? 'bg-primary' : 'bg-gray-200'} shadow-md relative`}
      >
        <p className="text-white">{message.content}</p>

        <Tooltip title={`Sent at ${message.timestamp}`} arrow>
          <div className="absolute bottom-1 left-2 text-xs text-gray-400">
            <span>{message.timestamp}</span>
          </div>
        </Tooltip>

        <div
          className={`absolute bottom-1 right-2 text-xs ${message.is_read ? 'text-green-500' : 'text-gray-400'}`}
        >
          {message.is_read ? 'Read' : 'Unread'}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;