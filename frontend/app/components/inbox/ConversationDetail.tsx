'use client';

import useWebSocket from "react-use-websocket";
import { useEffect, useState, useRef, useLayoutEffect } from "react";

import { ConversationType } from "@/app/inbox/page";
import CustomButton from "../forms/CustomButton";
import { User } from "../hooks/useUser";
import { MessageType } from "@/app/inbox/[id]/page";

interface ConversationDetailProps {
    userId: string;
    token: string;
    conversation: ConversationType;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
    userId,
    token,
    conversation
}) => {
    const messagesDiv = useRef<HTMLDivElement | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);
    const myUser = conversation.users.find((user) => user.id == userId)
    const otherUser = conversation.users.find((user) => user.id != userId)

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`${process.env.NEXT_PUBLIC_WS_HOST}/ws/${conversation.id}/?token=${token}`, {
        share: false,
        shouldReconnect: () => true
    })

    useEffect(() => {
        console.log('Connection stage changed', readyState);
    }, [readyState])

    useEffect(() => {
        if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'user_id' in lastJsonMessage && 'user_name' in lastJsonMessage && 'body' in lastJsonMessage) {
            const message: MessageType = {
                id: '',
                user_id: lastJsonMessage.user_id as string,
                user_name: lastJsonMessage.user_name as string,
                body: lastJsonMessage.body as string,
                sent_to: otherUser as User,
                sent_from: myUser as User,
                conversationId: conversation.id
            }

            setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message]);
        }
        
    }, [lastJsonMessage])

    useLayoutEffect(() => {
        scrollToBottom();
    }, [realtimeMessages])

    const sendMessage = async () => {
        sendJsonMessage({
            event: 'chat_message',
            data: {
                body: newMessage,
                name: myUser?.name,
                sent_to_id: otherUser?.id,
                conversation_id: conversation.id
            }
        });

        setNewMessage('');
    }
    
    const scrollToBottom = () => {
        if (messagesDiv.current) {
            messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
        }
    }
    
    return (
        <>
            <div
                ref={messagesDiv}
                className="max-h-[400px] overflow-auto flex flex-col space-y-4"
            >
                {conversation.messages.map((message, index) => {
                    return (
                        <div
                            key={index}
                            className={`w-[80%] py-4 px-6 rounded-xl ${message.sent_from.id === myUser?.id ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`}
                        >
                            <p className="font-bold text-gray-500">{message.sent_from.name}</p>
                            <p>{message.body}</p>
                        </div>
                    )
                })}
                {realtimeMessages.map((message, index) => {
                    return (
                        <div
                            key={index}
                            className={`w-[80%] py-4 px-6 rounded-xl ${message.user_id === myUser?.id ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`}
                        >
                            <p className="font-bold text-gray-500">{message.user_name}</p>
                            <p>{message.body}</p>
                        </div>
                    )
                })}
            </div>

            <div className="py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 bg-gray-200 rounded-xl"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />

                <CustomButton 
                    label='Send'
                    onClick={sendMessage}
                    type='button'
                    className="w-[100px]"
                />
            </div>
        </>
    );
};

export default ConversationDetail;
