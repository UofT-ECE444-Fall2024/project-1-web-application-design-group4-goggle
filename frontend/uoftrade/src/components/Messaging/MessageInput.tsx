'use client'

import React, { useState, useEffect } from 'react';
import { Send } from '@mui/icons-material';

interface MessageInputProps {
    message: string; // The current message text
    onMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handler for message input changes
    onSendMessage: (message: string) => void; // Handler to send the message
    typing: boolean; // Whether the user is typing or not
}

const MessageInput: React.FC<MessageInputProps> = ({ message, onMessageChange, onSendMessage, typing }) => {
    const [inputValue, setInputValue] = useState(message);

    // Synchronize input state with external message prop
    useEffect(() => {
        setInputValue(message);
    }, [message]);

    // Handle keydown event for Enter key
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            onSendMessage(inputValue);
        }
    };

    // Handle sending the message on button click
    const handleButtonClick = () => {
        if (inputValue.trim()) {
            onSendMessage(inputValue);
        }
    };

    return (
        <div className="flex items-center p-4 border-t border-gray-300">
            {/* Message input field */}
            <input
                type="text"
                value={inputValue}
                onChange={onMessageChange} // Update parent state on input change
                onKeyDown={handleKeyDown} // Handle Enter key
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {/* Send button */}
            <button
                onClick={handleButtonClick}
                className="ml-3 p-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none"
            >
                <Send />
            </button>

            {/* Typing indicator */}
            {typing && <div className="ml-4 text-sm text-gray-500">You are typing...</div>}
        </div>
    );
};

export default MessageInput;
