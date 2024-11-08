'use client'

import React, { useState } from 'react';

import { Send } from '@mui/icons-material';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center p-4 border-t border-gray-300">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        placeholder="Type a message..."
        className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        onClick={handleSendMessage}
        className="ml-3 p-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none"
      >
        <Send/>
      </button>
    </div>
  );
};

export default MessageInput;