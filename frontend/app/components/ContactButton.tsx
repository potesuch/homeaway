import { useState } from "react";
import { useRouter } from "next/navigation";

import apiService from "../services/apiService";

interface ContactButtonProps {
    hostId: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
    hostId
}) => {
    const router = useRouter();
    const [conversation, setConversation] = useState();

    const startConversation = async () => {
        const tmpConversation = await apiService.post(`/api/auth/users/${hostId}/start_conversation/`, {});

        setConversation(tmpConversation);
        console.log('CONVERSATION', tmpConversation)
        router.push(`/inbox/${tmpConversation.id}/`)
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
