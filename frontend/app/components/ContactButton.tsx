import { useState } from "react";
import { useRouter } from "next/navigation";

import apiService from "../services/apiService";
import useLoginModal from "./hooks/useLoginModal";

interface ContactButtonProps {
    userId: string;
    hostId: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
    userId,
    hostId
}) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const startConversation = async () => {
        if (userId) {
            const conversation = await apiService.post(`/api/auth/users/${hostId}/start_conversation/`, {});
            
            if (conversation.id) {
                router.push(`/inbox/${conversation.id}/`)
            }
        } else {
            loginModal.open();
        }
    }
    
    return (
        <div
            onClick={startConversation}
            className="cursor-pointer mt-6 py-4 px-6 bg-helio rounded-xl text-white hover:bg-helio-dark transition"
        >
            Contact
        </div>
    );
};

export default ContactButton;
