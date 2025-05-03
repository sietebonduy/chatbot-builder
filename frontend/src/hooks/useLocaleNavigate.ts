import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import i18n from '@/i18n';

export const useLocaleNavigate = () => {
  const navigate = useNavigate();

  return useCallback(
    (path: string) => {
      const fullPath = `/${i18n.language}/${path.replace(/^\/+/, '')}`;
      navigate(fullPath);
    },
    [navigate]
  );
};
