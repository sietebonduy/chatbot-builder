import { Outlet } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar.tsx';

const MainLayout = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);

  const updateNavbarHeight = useCallback(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);
    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, [updateNavbarHeight]);


  return (
    <div className="min-h-screen flex flex-col">
      <div ref={navbarRef} className="h-auto">
        <Navbar />
      </div>

      <main
        className="flex-1 bg-white overflow-auto"
        style={{ paddingTop: `${64}px` }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
