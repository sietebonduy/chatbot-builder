import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useCookies } from 'react-cookie';

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
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">{ t('navbar.app_name') }</Link>

        <ul className="flex space-x-6">
          { !cookies.jwt
            ? (<>
                <li>
                  <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">{t('navbar.login')}</Link>
                </li>
                <li>
                  <Link to="/sign_up" className="hover:underline">{t('navbar.register')}</Link>
                </li>
              </>)
            : (<li>
                <button onClick={handleLogout} className='bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200'>{t('navbar.logout')}</button>
              </li>)
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
