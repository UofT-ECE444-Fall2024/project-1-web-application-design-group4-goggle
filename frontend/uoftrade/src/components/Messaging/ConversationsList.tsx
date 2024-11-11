'use client'

import React from 'react';
import { Conversation } from '@/types/conversation';
import RefreshButton from '../Refresh/RefreshButton';

interface ConversationsListProps {
  conversations: Conversation[];
  activeConvoID: number; // Added this prop to track the active conversation
  onSelectConversation: (convoID: number) => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({ conversations, activeConvoID, onSelectConversation }) => {
  return (
    <div className="bg-white-bg shadow-lg rounded-lg w-80 max-h-[80vh] overflow-auto">
      <h2 className="font-bold text-3xl p-4 border-b">Conversations</h2>
      <RefreshButton/>
      <div>
        {conversations.map((conversation:Conversation, index:number) => {
          const isActive = conversation?.conversation_id === activeConvoID; // Check if the current conversation is active
          
          return (
            <div
              key={index}
              className={`flex items-center p-4 cursor-pointer ${isActive ? 'bg-primary text-white-bg' : 'hover:bg-gray-100'}`}
              onClick={() => onSelectConversation(conversation?.conversation_id)}
            >
              <div className="flex-1">
                <p className={`font-medium ${isActive ? 'text-white-bg' : 'text-gray-800'}`}>{conversation?.participants?.[0].name}</p>
                <p className={`text-sm ${isActive ? 'text-white-bg' : 'text-gray-500'}`}>{conversation?.last_message}</p>
              </div>
              <div className="text-xs text-gray-400">
                <p>{conversation?.last_message_timestamp}</p>
              </div>
              <div className={`${(isActive) ? 'bg-white-bg text-heading-1' : 'bg-primary text-white-bg'}  rounded-full px-2 py-1 text-xs ml-2`}>
                {conversation?.unread_count}
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationsList;
