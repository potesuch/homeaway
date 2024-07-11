'use client';

import { useState } from "react";

import Modal from "./Modal";
import useLoginModal from "../hooks/useLoginModal";

import CustomButton from "../forms/CustomButton";

const LoginModal = () => {
    const loginModal = useLoginModal();

    const content = (
        <>
            <form action="" className="space-y-4">
                <input placeholder="Your e-mail address" type="email" className="w-full h-[54px] border border-gray-300 px-4 rounded-xl" />

                <input placeholder="Your password" type="password" className="w-full h-[54px] border border-gray-300 rounded-xl px-4" />

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
            isOpen={loginModal.isOpen}
            close={loginModal.close}
            label='Log in'
            content={content}
        />
    );
};

export default LoginModal;
