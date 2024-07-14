'use client';

import { useState } from "react";

import Modal from "./Modal";
import useSignupModal from "../hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import useLoginModal from "../hooks/useLoginModal";

const SignupModal = () => {
    const signupModal = useSignupModal();
    const loginModal = useLoginModal();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [emailBorder, setEmailBorder] = useState('border-gray-300');
    const [password1Border, setPassword1Border] = useState('border-gray-300');
    const [password2Border, setPassword2Border] = useState('border-gray-300');

    const submitSignup = async () => {
        const formData = {
            email: email,
            password: password1,
            re_password: password2
        }

        const response = await apiService.post('/api/auth/users/', JSON.stringify(formData), 'application/json');

        if (response.id) {
            signupModal.close();
            loginModal.open();
        } else {
            const tmpErrors: string[] = Object.values(response).map((error: any) => {
                return error;
            });

            setErrors(tmpErrors);
            setEmailBorder('border-gray-300');
            setPassword1Border('border-gray-300');
            setPassword2Border('border-gray-300');
            if (response.email) {
                setEmailBorder('border-helio-dark');
            }
            if (response.password) {
                setPassword1Border('border-helio-dark');
            }
            if (response.re_password) {
                setPassword2Border('border-helio-dark');
            }
        }
    }

    const content = (
        <>
            <form
                action={submitSignup}
                className="space-y-4"
            >
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className={`w-full h-[54px] border ${emailBorder} px-4 rounded-xl`} />

                <input onChange={(e) => setPassword1(e.target.value)} placeholder="Your password" type="password" className={`w-full h-[54px] border ${password1Border} rounded-xl px-4`} />
                <input onChange={(e) => setPassword2(e.target.value)} placeholder="Repeat password" type="password" className={`w-full h-[54px] border ${password2Border} rounded-xl px-4`} />

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
                    type='submit'
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
