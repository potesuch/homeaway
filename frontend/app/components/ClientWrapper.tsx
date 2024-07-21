'use client';

import { useEffect } from "react";

import apiService from "../services/apiService";
import useUser from "./hooks/useUser"
import { resetAuthCookies } from "../lib/actions";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
    const { user, setUser } = useUser();
  
    const getUser = async () => {
        const tmpUser = await apiService.get('/api/auth/users/me/');
        
        if (tmpUser.id) {
            setUser(tmpUser);
        } else {
            resetAuthCookies();
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <>{children}</>
    )
}

export default ClientWrapper;
