import { useState} from 'react';
import { useCookies } from 'react-cookie';
import { registration, login, logout } from '../api/repositories/AuthRepository';
import { IUserCredentials, IUserResponse } from '../types/auth';

export const useAuth = () => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [jwt, setJwtToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  const register = async (credentials: IUserCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const userData = await registration(credentials);
      setUser(userData.data);
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
      const response = await login(credentials);
      const authHeader = response.headers['authorization'];

      setUser(response.data.data);
      setJwtToken(authHeader);
      setCookie('jwt', authHeader, { path: '/' });
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);

    try {
      await logout(cookies.jwt);
      setJwtToken('');
      setUser(null);
      removeCookie('jwt');
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, register, signIn, signOut, jwt };
};