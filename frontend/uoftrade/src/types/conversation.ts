type Participant = {
    user_name: string;
    name: string;
}

export type Conversation = {
    conversation_id: number;
    last_message: string;
    last_message_timestamp: string,
    unread_count: number;
    participants: Participant[];
};