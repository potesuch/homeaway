'use client';

import Modal from "./Modal";
import useSignupModal from "../hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";

const SignupModal = () => {
    const signupModal = useSignupModal();

    const content = (
        <>
            <form action="" className="space-y-4">
                <input placeholder="Your e-mail address" type="email" className="w-full h-[54px] border border-gray-300 px-4 rounded-xl" />

                <input placeholder="Your password" type="password" className="w-full h-[54px] border border-gray-300 rounded-xl px-4" />
                <input placeholder="Repeat password" type="password" className="w-full h-[54px] border border-gray-300 rounded-xl px-4" />

                <div className="p-5 bg-helio-dark rounded-xl text-white opacity-80">Error message</div>

                <CustomButton 
                    label='Submit'
                    onClick={() => {console.log('Clicked')}}
                />
            </form>
        </>
    )
    
    return (
        <Modal 
            isOpen={signupModal.isOpen}
            close={signupModal.close}
            label='Sign up'
            content={content}
        />
    );
};

export default SignupModal;
