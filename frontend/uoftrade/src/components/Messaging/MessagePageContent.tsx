'use client'

import React, { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import ConversationsList from './ConversationsList';
import axios from 'axios';
import {useRouter, useParams } from 'next/navigation';
import Loading from '../Loading/Loading';
import { Conversation } from '@/types/conversation';
import { Message } from '@/types/message';

const MessagePageContent = () => {
  const [loading, setLoading] = useState<boolean>(true); 
  const { username } = useParams();
  const [activeConvoID, setActiveConvoID] = useState<number>(1); // Default conversation id for the database
  const [conversations, setConversations] = useState<Array<Conversation>>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter()

  useEffect(() => {

    const getConversations = async () => {
      const currentUser = localStorage.getItem('currentUser');
      const token = localStorage.getItem('token');
      
      setLoading(true); // Start loading before the request
      try {
  
        if (username){
          const participants = {
            user1: currentUser,
            user2: username
          }
  
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}identity/conversations/create`, participants, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
  
        const payload = { user1: currentUser }
        const conversationsData = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}identity/conversations`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Map over conversationsData and create Conversation objects
        conversationsData?.data?.forEach((data:any) => {
          const conversation: Conversation = {
              conversation_id: data?.conversation_id,
              last_message: data?.last_message,
              last_message_timestamp: data.last_message_timestamp,
              unread_count: data?.unread_count,
              participants: data?.participants.map((p:any) => ({
                  user_name: p.user_name,
                  name: p.name,
              })),
            };
            conversations.push(conversation);
        });
  
        setConversations(conversations);
  
        console.log(conversations)
        //see if the user got here by clicking a listing or profile and set the active convo id
        if (username) {   
          const currActiveConversation = conversations.find((convo:Conversation) => {return convo.participants?.[0].user_name === username})
          setActiveConvoID(currActiveConversation?.conversation_id as number)
        }
  
        const messagesData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}identity/conversations/messages/${activeConvoID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (messagesData?.data) {
          // Set all messages' is_read property to true
          const updatedMessages = messagesData?.data?.results?.map((message: { is_read: boolean }) => ({
            ...message,
            is_read: true, // Set is_read to true for all messages
          }));
          
          // Update state with the modified messages
          setMessages(updatedMessages);
        }
  
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false); // Stop loading after the request is done
      }
    };


    getConversations();
  }, [])


  const handleSelectConversation = (convoID: number) => {
    router.push(`/messages/${conversations?.[convoID].participants[0].user_name}`)
  };

  const handleSendMessage = async (message: string) => {
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('currentUser');

    const now = new Date();
    const timestamp = now.getFullYear() + '-' +
      String(now.getMonth() + 1).padStart(2, '0') + '-' +
      String(now.getDate()).padStart(2, '0') + ' ' +
      String(now.getHours()).padStart(2, '0') + ':' +
      String(now.getMinutes()).padStart(2, '0') + ':' +
      String(now.getSeconds()).padStart(2, '0');

    const newMessage:Message = {
      conversation: activeConvoID || 0,
      content: message,
      timestamp: timestamp,
      is_read: false,
      sender: 'user',
    };
    setMessages((prevMessages:Message[]) => [...prevMessages, newMessage]);

    const payload = {
      user1: currentUser,
      content: message
    }

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}identity/conversations/send_message/${activeConvoID}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  if (loading) {
    return (
      <Loading loading={loading}/>
    )
  }

  return (
    <>
      <div className="flex w-full h-full bg-gray-100">
        <div className="w-80 p-4 mr-8">
          <ConversationsList
            conversations={conversations}
            activeConvoID={activeConvoID}
            onSelectConversation={handleSelectConversation}
          />
        </div>
        <div className="flex-1 p-4">
          <ChatBox 
            name={conversations?.[activeConvoID]?.participants?.[0].name || "Messages"}
            messages={messages}
            setMessages={setMessages}
            handleSendMessage={handleSendMessage} 
          />
        </div>
      </div>
    </>
    
  );
};

export default MessagePageContent;