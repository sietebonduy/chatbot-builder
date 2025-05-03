import { ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({children, redirectPath = '/login'}) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
