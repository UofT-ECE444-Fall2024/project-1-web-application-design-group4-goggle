'use client'

import React from 'react';
import { Tooltip } from '@mui/material'; // For displaying the time sent in a tooltip

interface MessageBubbleProps {
  message: string;
  timeSent: string;
  isRead: boolean;
  sender: 'user' | 'other'; // Define who the message is from (you or the other person)
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, timeSent, isRead, sender }) => {
  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs p-3 rounded-xl ${sender === 'user' ? 'bg-primary' : 'bg-gray-200'} shadow-md relative`}
      >
        <p className="text-white">{message}</p>

        <Tooltip title={`Sent at ${timeSent}`} arrow>
          <div className="absolute bottom-1 left-2 text-xs text-gray-400">
            <span>{timeSent}</span>
          </div>
        </Tooltip>

        <div
          className={`absolute bottom-1 right-2 text-xs ${isRead ? 'text-green-500' : 'text-gray-400'}`}
        >
          {isRead ? 'Read' : 'Unread'}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;