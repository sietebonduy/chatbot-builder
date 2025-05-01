import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-auto bg-white">
        <div className="h-full w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
