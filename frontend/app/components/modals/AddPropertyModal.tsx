'use client';

import Image from "next/image";

import Modal from "./Modal";
import useAddPropertyModal from "../hooks/useAddPropertyModal";
import CustomButton from "../forms/CustomButton";

const AddPropertyModal = () => {
    const addPropertyModal = useAddPropertyModal();

    const content = (
        <>
            <h2 className="mb-6 text-2xl">Choose category</h2>

            <CustomButton 
                label="next"
            />
        </>
    )
    
    return (
        <Modal
            isOpen={addPropertyModal.isOpen}
            close={addPropertyModal.close}
            label='Add property'
            content={content}
        />
    )
}

export default AddPropertyModal;
