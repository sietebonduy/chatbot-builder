import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../contexts/UserContext.tsx";

import userDefaultLogo from '../assets/user_icon.svg'
import arrowDown from '../assets/arrow-down.svg'

const Navbar = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch {
      return;
    } finally {
      navigate('/login');
    }
  };

  return (
    <>
      { user ?
          <div className="navbar bg-base-200 shadow-sm px-10">
            <div className="flex-1">
              <div
                className="text-xl font-extrabold text-black tracking-wide hover:text-gray-500 transition-colors duration-300 cursor-pointer"
                onClick={() => navigate('/')}>
                {t('navbar.app_name')}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-gray-300 overflow-hidden">
                <img
                  alt="Profile Image"
                  src={userDefaultLogo}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm font-semibold text-gray-800">Denis Domanin</p>
                <p className="text-xs text-gray-500">den@gmail.com</p>
              </div>
            </div>
            <div className="dropdown dropdown-end w-10 h-10 self-center">
                <div tabIndex={0} role="button" className="w-10 h-10 flex items-center justify-center p-0">
                  <img src={arrowDown} alt="menu" width={20} height={20} />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  <li><a>Profile</a></li>
                  <li><a>Settings</a></li>
                  <li><a onClick={handleLogout}>{ t('navbar.logout' )}</a></li>
                </ul>
            </div>
          </div>
        : null
      }
    </>
  );
};

export default Navbar;
