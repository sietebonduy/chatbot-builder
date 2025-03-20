import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useCookies } from 'react-cookie';
import Button from './Button';
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const [cookies] = useCookies(['jwt']);
  const navigate = useNavigate();
  const isAuthenticated = Boolean(cookies.jwt);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch {
      return;
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg sticky top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center h-20 px-6">
        <Link to="/" className="text-2xl font-extrabold text-white tracking-wide hover:text-gray-300 transition-colors duration-300" aria-label={t("navbar.app_name")}>
          {t("navbar.app_name")}
        </Link>

        <nav>
          <ul className="flex space-x-6 items-center">
            {isAuthenticated ? (
              <li>
                <Button onClick={handleLogout} variant="danger" className="flex items-center bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-700 hover:scale-105 transition-all duration-300" aria-label={t("navbar.logout")}>
                  <FaSignOutAlt className="mr-2"/>
                  {t("navbar.logout")}
                </Button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="flex items-center bg-white text-blue-600 px-6 py-2 rounded-md shadow-md hover:bg-gray-200 hover:scale-105 transition-all duration-300" aria-label={t("navbar.login")}>
                    <FaSignInAlt className="mr-2"/>
                    {t("navbar.login")}
                  </Link>
                </li>
                <li>
                  <Link to="/sign_up" className="flex items-center text-white px-6 py-2 border border-white rounded-md hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300" aria-label={t("navbar.register")}>
                    <FaUser className="mr-2"/>
                    {t("navbar.register")}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
