import { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const useNavigationBlocker = (shouldBlock: boolean) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!shouldBlock) return;

    const unblock = navigate.block((tx) => {
      // Optionally show a confirmation dialog here
      const confirmed = window.confirm('Are you sure you want to leave?');
      if (confirmed) {
        tx.retry();
      }
    });

    return () => unblock();
  }, [shouldBlock, navigate, location]);
};

export default useNavigationBlocker;