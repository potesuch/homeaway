import { useRouter } from "next/navigation";

import { User } from "../hooks/useUser";
import { ConversationType } from "@/app/inbox/page";

interface ConversationProps {
    user: User;
    conversation: ConversationType;
}

const Conversation: React.FC<ConversationProps> = ({
    user,
    conversation
}) => {
    const router = useRouter();
    const otherUser = conversation.users.find((conv_user) => conv_user.id != user.id)
    
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
