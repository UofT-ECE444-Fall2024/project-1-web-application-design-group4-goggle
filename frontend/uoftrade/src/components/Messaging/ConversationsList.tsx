'use client'

import React from 'react';

interface Conversation {
  userName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface ConversationsListProps {
  conversations: Conversation[];
  activeUser: string; // Added this prop to track the active conversation
  onSelectConversation: (userName: string) => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({ conversations, activeUser, onSelectConversation }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg w-80 max-h-[80vh] overflow-auto">
      <h2 className="font-bold text-3xl p-4 border-b">Conversations</h2>
      <div>
        {conversations.map((conversation, index) => {
          const isActive = conversation.userName === activeUser; // Check if the current conversation is active
          
          return (
            <div
              key={index}
              className={`flex items-center p-4 cursor-pointer ${isActive ? 'bg-primary text-white-bg' : 'hover:bg-gray-100'}`}
              onClick={() => onSelectConversation(conversation.userName)}
            >
              <div className="flex-1">
                <p className={`font-medium ${isActive ? 'text-white-bg' : 'text-gray-800'}`}>{conversation.userName}</p>
                <p className={`text-sm ${isActive ? 'text-white-bg' : 'text-gray-500'}`}>{conversation.lastMessage}</p>
              </div>
              <div className="text-xs text-gray-400">
                <p>{conversation.lastMessageTime}</p>
              </div>
              <div className={`${(isActive) ? 'bg-white-bg text-heading-1' : 'bg-primary text-white-bg'}  rounded-full px-2 py-1 text-xs ml-2`}>
                {conversation.unreadCount}
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationsList;
