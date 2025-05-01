import { create } from 'zustand';
import { IUser } from '../types/user';
import { getCurrentUser } from "../api/repositories/UserRepositroy.ts";
import { normalizeFromJsonApi } from "../lib/normalizeUser.ts";

interface UserState {
  user: IUser | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,
  fetchUser: async () => {
    try {
      const res = await getCurrentUser();
      const normalized = normalizeFromJsonApi(res.data.data);
      set({ user: normalized });
    } catch (err) {
      return;
    } finally {
      set({ loading: false });
    }
  },
}));
