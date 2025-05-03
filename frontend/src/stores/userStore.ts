import { create } from 'zustand';
import { IUser } from '@/types/user';
import { getCurrentUser } from "@/api/repositories/UserRepositroy";
import { normalizeFromJsonApi } from "@/lib/normalizeUser";

interface UserState {
  user: IUser | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  setUser: (user: IUser | null) => void;
  logout: () => void;
}

const LOCAL_STORAGE_KEY = 'current_user';

export const useUserStore = create<UserState>((set) => ({
  user: (() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })(),
  loading: true,

  fetchUser: async () => {
    try {
      const res = await getCurrentUser();
      const normalized = normalizeFromJsonApi(res.data.data);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(normalized));
      set({ user: normalized });
    } catch (err) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  setUser: (user) => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    set({ user });
  },

  logout: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    set({ user: null });
  },
}));
