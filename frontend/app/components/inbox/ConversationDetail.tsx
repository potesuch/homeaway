'use client';

import useWebSocket from "react-use-websocket";

import { ConversationType } from "@/app/inbox/page";
import CustomButton from "../forms/CustomButton";
import useUser from "../hooks/useUser";

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
    const myUser = conversation.users.find((user) => user.id == user.id)
    const otherUser = conversation.users.find((user) => user.id != user.id)

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`ws://localhost:8000/ws/${conversation.id}/?token=${token}`, {
        share: false,
        shouldReconnect: () => true
    })
    
    return (
        <>
            <div className="max-h-[400px] overflow-auto flex flex-col space-y-4">
                <div className="w-[80%] py-4 px-6 rounded-xl bg-gray-200">
                    <p className="font-bold text-gray-500">John Doe</p>

                    <p>SDFlfsadnlkfoksfda</p>
                </div>

                <div className="w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200">
                    <p className="font-bold text-gray-500">John Not Doe</p>

                    <p>SDFlfsadnlkfoksfda</p>
                </div>

                <div className="w-[80%] py-4 px-6 rounded-xl bg-gray-200">
                    <p className="font-bold text-gray-500">John Doe</p>

                    <p>SDFlfsadnlkfoksfda</p>
                </div>
            </div>

            <div className="py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 bg-gray-200 rounded-xl"
                />

                <CustomButton 
                    label='Send'
                    onClick={() => console.log('clicked')}
                    className="w-[100px]"
                />
            </div>
        </>
    );
};

export default ConversationDetail;
