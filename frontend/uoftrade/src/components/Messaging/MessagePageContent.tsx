'use client'

import React, { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import ConversationsList from './ConversationsList';
import axios from 'axios';
import { useParams } from 'next/navigation';

import { Conversation } from '@/types/conversation';

const MessagePageContent = () => {

  const { username } = useParams();

  const [activeConvoID, setActiveConvoID] = useState<number>(0); // Default active user
  const [conversations, setConversations] = useState<Array<Conversation>>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation>();

  const getConversions = async () => {
  
    //get all conversations
    const token = localStorage.getItem('token');
    const conversationsData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}identity/conversations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setConversations(conversationsData?.data);

    console.log(conversations)

    //see if the user got here by clicking a listing or profile and set the active convo id
    if (username) {
      const activeConversation = conversations.find((convo:Conversation) => {convo.participants.user_name === username})
      setActiveConvoID(activeConversation?.conversation_id as number)
    }

    //set the active conversation to whatever the id is, 0 default
    setActiveConversation(conversations.find((convo:Conversation) => convo.conversation_id === activeConvoID));
  }

  useEffect(() => {
    getConversions();
  }, [])


  const handleSelectConversation = (convoID: number) => {
    setActiveConvoID(convoID);
  };

  return (
    <div className="flex w-full h-full bg-gray-100">
      <div className="w-80 p-4 mr-8">
        <ConversationsList
          conversations={conversations}
          activeConvoID={activeConvoID}
          onSelectConversation={handleSelectConversation}
        />
      </div>
      <div className="flex-1 p-4">
        <ChatBox convoID={activeConvoID} participant={activeConversation?.participants?.name as string} />
      </div>
    </div>
  );
};

export default MessagePageContent;