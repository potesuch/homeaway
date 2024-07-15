import { create } from "zustand";

export type User = {
    id: string;
    name: string;
    avatar: string;
}

interface useUserStore {
    user: User | null;
    is_authorized: boolean;
    setUser: (user: User) => void;
    clearUser: () => void;
}

const useUser = create<useUserStore> ((set) => ({
    user: null,
    is_authorized: false,
    setUser: (user) => set({ user: user, is_authorized: true }),
    clearUser: () => set({ user: null, is_authorized: false })
}))

export default useUser;
