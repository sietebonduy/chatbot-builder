import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">{ t('navbar.app_name') }</Link>

        <ul className="flex space-x-6">
          <li>
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">{ t('navbar.login') }</Link>
          </li>
          <li>
            <Link to="/sign_up" className="hover:underline">{ t('navbar.register') }</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
