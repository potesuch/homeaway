'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import useSignupModal from "../hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";

const SignupModal = () => {
    const router = useRouter();
    const signupModal = useSignupModal();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const submitSignup = async () => {
        const formData = {
            email: email,
            password1: password1,
            password2: password2
        }

        const response = await apiService.post('/api/auth/users/', JSON.stringify(formData));

        if (response.access) {

            signupModal.close();
            router.push('/');
        } else {
            const tmpErrors: string[] = Object.values(response).map((error: any) => {
                return error;
            });

            setErrors(tmpErrors);
        }
    }

    const content = (
        <>
            <form
                action={submitSignup}
                className="space-y-4"
            >
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] border border-gray-300 px-4 rounded-xl" />

                <input onChange={(e) => setPassword1(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] border border-gray-300 rounded-xl px-4" />
                <input onChange={(e) => setPassword2(e.target.value)} placeholder="Repeat password" type="password" className="w-full h-[54px] border border-gray-300 rounded-xl px-4" />

                {errors.map((error, index) => {
                    return (
                        <div
                            key={`error_${index}`}
                            className="p-5 bg-helio-dark rounded-xl text-white opacity-80"
                        >
                            {error}
                        </div>
                    )
                })}

                <CustomButton 
                    label='Submit'
                    onClick={submitSignup}
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
