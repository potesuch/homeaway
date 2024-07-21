import { useRouter } from "next/navigation";

import { ConversationType } from "@/app/inbox/page";
import { User } from "../hooks/useUser";

interface ConversationProps {
    user: User;
    conversation: ConversationType;
}

const Conversation: React.FC<ConversationProps> = ({
    user,
    conversation
}) => {
    const router = useRouter();
    const otherUser = conversation.users.find((conv_user) => conv_user.id != user.id) || user;
    
    return (
        <div className="cursor-pointer px-6 py-4 border border-gray-300 rounded-xl">
            <p className="mb-6 text-xl">{otherUser?.name}</p>

            <p
                onClick={() => router.push(`/inbox/${conversation.id}/`)}
                className="text-helio-dark"
            >
                Go to conversation
            </p>
        </div>
    );
};

export default Conversation;
