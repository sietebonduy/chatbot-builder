import { create } from 'zustand';
import { IUser } from '@/types/user';
import { getCurrentUser } from "@/api/repositories/UserRepositroy";
import { normalizeFromJsonApi } from "@/lib/normalizeUser";
import { present } from "@/utils/presence.ts";
import i18n from '@/i18n'

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
      const parsed = stored ? JSON.parse(stored) : null;

      if (present(parsed?.locale)) {
        i18n.changeLanguage(parsed.locale);
      }

      return parsed;
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
    if (present(user)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      if (present(user.locale)) {
        i18n.changeLanguage(user.locale)
      }
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
    set({ user })
  },

  logout: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    set({ user: null });
  },
}));
