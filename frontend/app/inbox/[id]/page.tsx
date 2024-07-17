'use client';

import { useEffect, useState } from "react";

import useUser, { User } from "@/app/components/hooks/useUser";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import apiService from "@/app/services/apiService";
import { getAccessToken } from "@/app/lib/actions";

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
    const [token, setToken] = useState<string | undefined>();

    const getConversation = async () => {
        const tmpConversation = await apiService.get(`/api/conversations/${params.id}/`);

        setConversation(tmpConversation);
    }

    const getToken = async () => {
        const tmpToken = await getAccessToken();

        setToken(tmpToken);
    }

    useEffect(() => {
        getConversation();
        getToken();
    }, [])

    if (!user || !token) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
            {conversation &&
                <ConversationDetail
                    userId={user.id}
                    token={token}
                    conversation={conversation}
                />
            }
        </main>
    );
};

export default ConversationPage;
