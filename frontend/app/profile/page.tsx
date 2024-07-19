'use client';

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

import useUser from "../components/hooks/useUser";
import CustomButton from "../components/forms/CustomButton";
import apiService from "../services/apiService";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const { user } = useUser();
    const router = useRouter();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState<string>();
    const [dataAvatar, setDataAvatar] = useState<File>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [emailBorder, setEmailBorder] = useState('border-gray-300');
    const [passwordBorder, setPasswordBorder] = useState('border-gray-300');
    const [password1Border, setPassword1Border] = useState('border-gray-300');
    const [password2Border, setPassword2Border] = useState('border-gray-300');
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const _setAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0){
            const tmpDataAvatar = event.target.files[0];
            const tmpAvatar = URL.createObjectURL(tmpDataAvatar);

            setDataAvatar(tmpDataAvatar);
            setAvatar(tmpAvatar);
        }
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        if (name) {
            formData.append('name', name);
        }
        if (dataAvatar) {
            formData.append('avatar', dataAvatar);
        }
        if (email) {
            formData.append('email', email);
        }
        if (password) {
            formData.append('current_password', password);
        }
        if (password1) {
            formData.append('new_password', password1);
        }
        if (password2) {
            formData.append('re_new_password', password2);
        }

        const response = await apiService.patch('/api/auth/users/me/', formData);
        if (response.id) {
            setSuccess(true);
            router.push('/profile?=refresh');
        } else {
            setSuccess(false);
            const tmpErrors: string[] = Object.values(response);

            setErrors(tmpErrors);
            setEmailBorder('border-gray-300');
            setPasswordBorder('border-gray-300');
            setPassword1Border('border-gray-300');
            setPassword2Border('border-gray-300');
            if (response.email) {
                setEmailBorder('border-helio-dark');
            }
            if (response.current_password) {
                setPasswordBorder('border-helio-dark');
            }
            if (response.new_password) {
                setPassword1Border('border-helio-dark');
            }
            if (response.re_new_password) {
                setPassword2Border('border-helio-dark');
            }
        }
    }

    useEffect(() => {
        if (user) {
            setAvatar(user.avatar);
        }
    }, [user])

    if (!user) {
        return (
            null
        )
    }
    
    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            {success &&
                <div className="w-full h-[10%] bg-green-200 mb-7 px-4 py-2 rounded-xl">
                    <p className="text-2xl">Success</p>
                </div>
            }
            <div className="w-[60%] md:w-[50%] lg:w-[700px] mx-auto px-6">
                <div className="flex items-center flex-col space-y-4 mb-7">
                    <div className="cursor-pointer relative w-[150px] h-[150px] border rounded-full group overflow-hidden">
                        <input
                            className="absolute w-full h-full opacity-0 z-10"
                            type="file"
                            accept="image/*"
                            onChange={_setAvatar}
                        />
                        <Image 
                            fill
                            src={avatar || '/profile_pic.png'}
                            className="rounded-full mb-7 group-hover:scale-110 transition duration-200 object-cover"
                            alt={user.name}
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <span className="text-gray-800 opacity-70">Choose avatar...</span>
                        </div>
                    </div>

                    <p className="text-2xl font-bold">{user.name}</p>

                    <div className="w-full space-y-4">
                        <label>Change name:</label>
                        <input
                            onChange={(e) => {setName(e.target.value)}}
                            value={name}
                            placeholder="Your new name..."
                            className={`w-full h-[54px] px-4 border ${emailBorder} rounded-xl`}
                        />
                    </div>

                    <div className="w-full space-y-4">
                        <label>Change e-mail address:</label>
                        <input
                            onChange={(e) => {setEmail(e.target.value)}}
                            value={email}
                            placeholder="Your new e-mail address..."
                            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                        />
                    </div>

                    <div className="w-full space-y-4">
                        <label>Change password:</label>
                        <input
                            onChange={(e) => {setPassword(e.target.value)}}
                            type="password"
                            value={password}
                            placeholder="Your current password..."
                            className={`w-full h-[54px] px-4 border ${passwordBorder} rounded-xl`}
                        />
                        <input
                            onChange={(e) => {setPassword1(e.target.value)}}
                            type="password"
                            value={password1}
                            placeholder="Your new password..."
                            className={`w-full h-[54px] px-4 border ${password1Border} rounded-xl`}
                        />
                        <input
                            onChange={(e) => {setPassword2(e.target.value)}}
                            type="password"
                            value={password2}
                            placeholder="Repeat new password..."
                            className={`w-full h-[54px] px-4 border ${password2Border} rounded-xl`}
                        />
                    </div>

                    {errors.map((error, index) => {
                        return (
                            <div
                                key={`error_${index}`}
                                className="w-full p-5 bg-helio-dark rounded-xl text-white opacity-80"
                            >
                                {error}
                            </div>
                        )
                    })}

                    <CustomButton
                        label="Submit"
                        type="button"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </main>
    )
}

export default ProfilePage;
