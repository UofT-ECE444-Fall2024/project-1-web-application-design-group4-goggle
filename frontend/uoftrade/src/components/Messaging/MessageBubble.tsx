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
        className={`max-w-xs p-3 rounded-xl ${sender === 'user' ? 'bg-primary' : 'light-grey'} shadow-md relative`}
      >
        <p className={`${sender === 'user' ? 'text-white-bg' : 'text-heading-1'}`}>{message}</p>

        <Tooltip title={`Sent at ${timeSent}`} arrow>
          <div className="pt-2 bottom-1 left-2 text-xs text-heading-1">
            <span>{timeSent}</span>
            <div
             className={`text-xs ${isRead ? 'text-primary' : 'text-heading-1'}`}
             >
              {isRead ? 'Read' : 'Unread'}
              </div>
          </div>
        </Tooltip>
      </div>
     
    </div>
  );
};

export default MessageBubble;