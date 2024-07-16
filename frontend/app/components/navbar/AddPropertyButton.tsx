'use client';

import useAddPropertyModal from "../hooks/useAddPropertyModal";
import useLoginModal from "../hooks/useLoginModal";
import useUser from "../hooks/useUser";

const AddPropertyButton = () => {
    const { user } = useUser();
    const addPropertyModal = useAddPropertyModal();
    const loginModal = useLoginModal();

    function handleAddPropertyButton() {
        if (user) {
            addPropertyModal.open();
        } else {
            loginModal.open();
        }
    }
    
    return (
        <div
            onClick={handleAddPropertyButton}
            className="cursor-pointer p-2 text-sm font-semibold rounded-full hover:bg-gray-200"
        >
            Add property
        </div>
    );
};

export default AddPropertyButton;
