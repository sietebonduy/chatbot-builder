import { useState } from 'react';
import { registration, login } from '../api/repositories/AuthRepository';
import { IUserCredentials, IUserResponse } from '../types/auth.ts';

export const useAuth = () => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const register = async (credentials: IUserCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const userData = await registration(credentials);
      setUser(userData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (credentials: IUserCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const userData = await login(credentials);
      setUser(userData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, register, signIn };
};