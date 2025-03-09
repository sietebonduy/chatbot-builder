import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useCookies } from 'react-cookie';

import Button from './Button';
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const [cookies] = useCookies(['jwt']);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch {
      return;
    }

    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/"
              className="text-xl font-extrabold text-white tracking-wide hover:text-gray-200 transition-colors duration-300">
          {t('navbar.app_name')}
        </Link>

        <ul className="flex space-x-6">
          {!cookies.jwt
            ? (
              <>
                <li>
                  <Link to="/login"
                        className="flex items-center bg-white text-blue-600 px-6 py-2 rounded-md shadow-md hover:bg-gray-200 hover:scale-105 transition-all duration-300">
                    <FaSignInAlt className="mr-2"/>
                    {t('navbar.login')}
                  </Link>
                </li>
                <li className="flex justify-center">
                  <Link to="/sign_up"
                        className="flex items-center text-white hover:underline hover:scale-105 transition-all duration-300">
                    <FaUser className="mr-2"/>
                    {t('navbar.register')}
                  </Link>
                </li>
              </>
            )
            : (
              <li>
                <Button onClick={handleLogout} variant='danger'
                        className="flex items-center bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-700 hover:scale-105 transition-all duration-300">
                  <FaSignOutAlt className="mr-2"/>
                  {t('navbar.logout')}
                </Button>
              </li>
            )
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
