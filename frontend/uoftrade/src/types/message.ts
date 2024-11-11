export type Message = {
    conversation: number; // Conversation ID or identifier
    sender: any;           // Can be a user object or just a string (like email)
    content: string;
    timestamp: any;
    is_read: boolean;      // Whether the message has been read or not
}