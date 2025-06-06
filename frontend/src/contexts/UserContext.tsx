import React, {createContext, useContext, useEffect, useState} from 'react';
import { IUser } from '@/types/user';
import { getCurrentUser } from "@/api/repositories/UserRepositroy.ts";
import { normalizeFromJsonApi } from "@/lib/normalizeUser.ts";

import Loader from "@/components/UI/loader/Loader.tsx";

interface UserContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        const userData = response.data;
        setUser(normalizeFromJsonApi(userData.data));
        setLoadingUser(false)
      } catch {
        setLoadingUser(false);
      }
    };

    if (!user) { fetchUser(); }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {loadingUser ? <Loader /> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
