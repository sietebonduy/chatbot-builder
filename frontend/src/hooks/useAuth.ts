import { useState, useMemo, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { registration, login, logout } from '@/api/repositories/AuthRepository';
import { IUserCredentials } from '@/types/auth';
import { normalizeFromDevise } from '@/lib/normalizeUser';
import { useUserStore } from '@/stores/userStore';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const { user, setUser, loading, fetchUser } = useUserStore();
  const [error, setError] = useState<Error | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const navigate = useNavigate();
  const jwt = cookies.jwt;

  const register = useCallback(async (credentials: IUserCredentials) => {
    setError(null);

    try {
      const response = await registration(credentials);
      setUser(normalizeFromDevise(response.data.data));
      toast.success("Успешно!");
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error('Registration failed'));
      toast.error("Что-то пошло не так...");
    }
  }, [setUser]);

  const signIn = useCallback(async (credentials: IUserCredentials) => {
    setError(null);

    try {
      const response = await login(credentials);
      const userData = response.data;
      const authHeader = response.headers['authorization'];
      setCookie('jwt', authHeader, { path: '/' });
      setUser(normalizeFromDevise(userData.data));
      navigate('/dashboard');
      toast.success("Успешно!");
    } catch (err: unknown) {
      toast.error("Что-то пошло не так...");
      setError(err instanceof Error ? err : new Error('Login failed'));
    }
  }, [setUser, setCookie, navigate]);

  const signOut = useCallback(async () => {
    try {
      await logout();
      toast.success("Успешно!");
    } catch (err) {
      setError(err as Error);
      toast.error("Что-то пошло не так...");
    } finally {
      removeCookie('jwt');
      setUser(null);
      setLoading(false);
      navigate('/login');
    }
  }, [removeCookie, setUser, navigate]);

  return useMemo(() => ({
    user,
    loading,
    error,
    signIn,
    register,
    signOut,
    jwt,
    fetchUser
  }), [user, loading, error, jwt, signIn, register, signOut, fetchUser]);
};
