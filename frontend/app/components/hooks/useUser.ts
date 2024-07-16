import { create } from "zustand";

export type User = {
    id: string;
    name: string;
    avatar: string;
}

interface useUserStore {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

const useUser = create<useUserStore> ((set) => ({
    user: null,
    setUser: (user) => set({ user: user }),
    clearUser: () => set({ user: null })
}))

export default useUser;
