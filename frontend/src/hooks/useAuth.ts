import { useState, useMemo, useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { registration, login, logout } from '@/api/repositories/AuthRepository';
import { IUserCredentials } from '@/types/auth';
import { normalizeFromJsonApi } from '@/lib/normalizeUser';
import { useUserStore } from '@/stores/userStore';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { present } from "@/utils/presence.ts";

export const useAuth = () => {
  const { t } = useTranslation();
  const { user, setUser, loading, fetchUser } = useUserStore();
  const [error, setError] = useState<Error | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const navigate = useNavigate();
  const jwt = cookies.jwt;
  const location = useLocation();

  const register = useCallback(async (credentials: IUserCredentials) => {
    setError(null);

    try {
      await registration(credentials);
      toast.success(t('notifications.successfully_registered'));
      navigate('/login');
    } catch {
      toast.error(t('notifications.something_went_wrong'));
    }
  }, []);

  const signIn = useCallback(async (credentials: IUserCredentials) => {
    setError(null);

    try {
      const response = await login(credentials);
      const userData = response.data;
      const authHeader = response.headers['authorization'];
      setCookie('jwt', authHeader, { path: '/' });
      setUser(normalizeFromJsonApi(userData.data));
      navigate('/dashboard');
      toast.success(t('notifications.successfully_logged_in'));
    } catch (err: unknown) {
      toast.error(err?.response?.data || t('notifications.invalid_password_or_email'));
      setError(err instanceof Error ? err : new Error('Login failed'));
    }
  }, [setUser, setCookie, navigate]);

  const signOut = useCallback(async () => {
    try {
      const response = await logout();
      toast.success(response?.data?.message || t('notifications.successfully_logged_out'));
    } catch (err) {
      setError(err as Error);
    } finally {
      removeCookie('jwt');
      setUser(null);
      setLoading(false);
      navigate('/login');
    }
  }, [removeCookie, setUser, navigate]);

  useEffect(() => {
    if (present(user) && (location.pathname === '/login' || location.pathname === '/sign_up')) {
      navigate('/dashboard');
    }
  }, [user, location.pathname, navigate]);

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
