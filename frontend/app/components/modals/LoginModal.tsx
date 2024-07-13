'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import useLoginModal from "../hooks/useLoginModal";

import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitLogin = async () => {
        const formData = {
            email: email,
            password: password
        }

        const response = await apiService.post('/api/auth/jwt/create/', JSON.stringify(formData));

        if (response.access) {
            handleLogin(response.access, response.refresh);

            loginModal.close();
            router.push('/');
        } else {
            setError(response.detail);
        }
    }

    const content = (
        <>
            <form action="" className="space-y-4">
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] border border-gray-300 px-4 rounded-xl" />

                <input onChange={(e) => setPassword(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] border border-gray-300 rounded-xl px-4" />

                {error &&
                    <div className="p-5 bg-helio-dark rounded-xl text-white opacity-80">{error}</div>
                }

                <CustomButton 
                    label='Submit'
                    onClick={submitLogin}
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
