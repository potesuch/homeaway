'use client';

import { useEffect, useState } from "react";

import Conversation from "../components/inbox/Conversation";
import useUser, { User } from "../components/hooks/useUser";
import apiService from "../services/apiService";
import { MessageType } from "./[id]/page";

export type ConversationType = {
    id: string;
    users: User[];
    messages: MessageType[];
}

const InboxPage = () => {
    const [conversations, setConversations] = useState<ConversationType[]>([]);

    const { user } = useUser();
    
    const getConversations = async () => {
        const tmpConversations = await apiService.get('/api/auth/users/me/conversations/');
        
        setConversations(tmpConversations);
    }
    
    useEffect(() => {
        getConversations();
    }, [])
    
    if (!user) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }
    
    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
            <h1 className="my-6 text-2xl">Inbox</h1>

            {conversations.map((conversation: ConversationType) => {
                return (
                    <Conversation
                        key={conversation.id}
                        user={user}
                        conversation={conversation}
                    />
                )
            })}
        </main>
    );
};

export default InboxPage;
