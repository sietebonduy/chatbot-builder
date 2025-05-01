import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.tsx';

import userDefaultLogo from '../assets/user_icon.svg';
import arrowDown from '../assets/arrow-down.svg';

const Navbar = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const navbarRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch {
      return;
    } finally {
      navigate('/login');
    }
  };

  const handleLogin = async () => {
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos < 50 || currentScrollPos < prevScrollPos) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div
      ref={navbarRef}
      className={`navbar bg-slate-50 text-gray-900 shadow border-b px-10 py-3 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex-1">
        <span
          onClick={() => navigate('/')}
          className="font-mono text-2xl font-semibold tracking-wide cursor-pointer hover:text-gray-500 transition"
        >
          {t('navbar.app_name')}
        </span>
      </div>

      {user ?
        <>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <img src={userDefaultLogo} alt="profile" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm">
                <p className="font-medium">{user.name || 'Unknown Bird'}</p>
                <p className="text-xs opacity-80">{user.email || 'bird@domain.com'}</p>
              </div>
            </div>

            <div className="dropdown dropdown-end">
              <label tabIndex={0}
                     className="btn btn-ghost flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition-colors duration-200">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src={arrowDown} alt="arrow" className="w-4 h-4"/>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="/dashboard">{t('navbar.dashboard')}</a>
                </li>
                <li>
                  <a href="/profile">{t('navbar.profile')}</a>
                </li>
                <li>
                  <a href="/settings">{t('navbar.settings')}</a>
                </li>
                <li>
                  <a href="/flow_builder">{t('navbar.flow_builder')}</a>
                </li>
                <li>
                  <a onClick={handleLogout} className="text-red-600">{t('navbar.logout')}</a>
                </li>
              </ul>
            </div>
          </div>
        </>
        : <button onClick={handleLogin} className="bg-transparent border-none text-indigo-600 hover:underline cursor-pointer p-0">{t('navbar.login')}</button>
      }
    </div>
  );
};

export default Navbar;
