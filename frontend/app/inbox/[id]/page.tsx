'use client';

import useUser, { User } from "@/app/components/hooks/useUser";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import apiService from "@/app/services/apiService";
import { useState } from "react";

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: User;
    sent_from: User;
}

const ConversationPage = ({ params }: { params: {id: string}}) => {
    const { user } = useUser();
    const [conversation, setConversation] = useState();

    const getConversation = async () => {
        const tmpConversation = await apiService.get(`/api/chat/${params.id}/`);

        setConversation(tmpConversation);
    }

    if (!user) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
            <ConversationDetail />
        </main>
    );
};

export default ConversationPage;
