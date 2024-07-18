'use client';

import { useRouter } from "next/navigation";

import apiService from "../services/apiService";
import MenuLink from "./navbar/MenuLink";
import { resetAuthCookies } from "../lib/actions";
import useUser from "./hooks/useUser";

const LogoutButton = () => {
    const user = useUser();
    const router = useRouter();

    const submitLogout = async () => {
        await resetAuthCookies();

        user.clearUser();
        router.refresh();
        router.push('/?refresh=logout');
    }
    
    return (
        <MenuLink
            label='Log out'
            onClick={submitLogout}
        />
    )
}

export default LogoutButton;
