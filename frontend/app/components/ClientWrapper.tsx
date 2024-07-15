'use client';

import { useEffect } from "react";
import apiService from "../services/apiService";
import useUser from "./hooks/useUser"

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
    const user = useUser();
  
    const getUser = async () => {
        const tmpUser = await apiService.get('/api/auth/users/me/');
        
        if (tmpUser.id) {
            user.setUser(tmpUser);
        }
    }

    useEffect(() => {
        getUser();
    }, [user.setUser])

    return (
        <>{children}</>
    )
}

export default ClientWrapper;
