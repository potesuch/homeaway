'use client';

import { useRouter } from "next/navigation";

import apiService from "../services/apiService";
import MenuLink from "./navbar/MenuLink";
import { resetAuthCookies } from "../lib/actions";

const LogoutButton = () => {
    const router = useRouter();

    const submitLogout = async () => {
        resetAuthCookies();

        router.push('/');
    }
    
    return (
        <MenuLink
            label='Log out'
            onClick={submitLogout}
        />
    )
}

export default LogoutButton;
