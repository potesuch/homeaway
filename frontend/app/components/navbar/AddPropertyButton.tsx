'use client';

import useAddPropertyModal from "../hooks/useAddPropertyModal";

const AddPropertyButton = () => {
    const addPropertyModal = useAddPropertyModal();

    function handleAddPropertyButton() {
        addPropertyModal.open();
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
