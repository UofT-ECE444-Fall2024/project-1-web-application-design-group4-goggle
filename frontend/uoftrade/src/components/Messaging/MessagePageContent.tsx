'use client'

import React, { useState } from 'react';
import ChatBox from './ChatBox';
import ConversationsList from './ConversationsList';

const MessagePageContent = () => {
  const [activeUser, setActiveUser] = useState<string>('John Doe'); // Default active user
  const [conversations, setConversations] = useState([
    { userName: 'John Doe', lastMessage: 'Hey, how are you?', lastMessageTime: '10:30 AM', unreadCount: 1 },
    { userName: 'Jane Smith', lastMessage: 'See you later!', lastMessageTime: '10:32 AM', unreadCount: 0 },
    { userName: 'Alice', lastMessage: 'Got it, thanks!', lastMessageTime: '10:35 AM', unreadCount: 3 },
  ]);

  const handleSelectConversation = (userName: string) => {
    setActiveUser(userName);
  };

  return (
    <div className="flex w-full h-full bg-gray-100">
      <div className="w-80 p-4 mr-8">
        <ConversationsList
          conversations={conversations}
          activeUser={activeUser}
          onSelectConversation={handleSelectConversation}
        />
      </div>
      <div className="flex-1 p-4">
        <ChatBox activeUser={activeUser} />
      </div>
    </div>
  );
};

export default MessagePageContent;