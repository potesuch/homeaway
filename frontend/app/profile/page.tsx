'use client';

import Image from "next/image";
import { ChangeEvent, useState } from "react";

import useUser from "../components/hooks/useUser";
import CustomButton from "../components/forms/CustomButton";
import apiService from "../services/apiService";

const ProfilePage = () => {
    const { user } = useUser();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(user?.avatar);
    const [dataAvatar, setDataAvatar] = useState<File>();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

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
        if (password1) {
            formData.append('password', password1);
        }
        if (password2) {
            formData.append('re_password', password2);
        }

        const response = await apiService.patch('/api/auth/users/me/', formData);
        console.log(response);
    }

    if (!user) {
        return (
            null
        )
    }
    
    return (
        <main className="w-[60%] md:w-[50%] lg:w-[700px] mx-auto px-6">
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
                        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
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
                        onChange={(e) => {setPassword1(e.target.value)}}
                        value={password1}
                        placeholder="Your new password..."
                        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                    />
                    <input
                        onChange={(e) => {setPassword2(e.target.value)}}
                        value={password2}
                        placeholder="Repeat new password..."
                        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <CustomButton
                    label="Submit"
                    type="button"
                    onClick={handleSubmit}
                />
            </div>
        </main>
    )
}

export default ProfilePage;
