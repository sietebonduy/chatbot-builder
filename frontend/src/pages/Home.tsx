import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUser();

  const handleStart = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleLearnMore = () => {
    navigate('/about_us');
  };

  return (
    <div
      className="relative w-full h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white flex flex-col items-center justify-center p-6 overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
        style={{ backgroundImage: 'url("https://your-background-image-url.com")' }}
      />
      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 animate__animated animate__fadeIn animate__delay-1s">
          {t('home.welcome')}
        </h1>
        <p className="text-lg mb-8 leading-relaxed opacity-80">{t('home.description')}</p>

        <div className="flex justify-center space-x-6">
          <button
            onClick={handleStart}
            className="bg-white text-indigo-600 px-6 py-3 rounded-full shadow-lg hover:bg-indigo-100 transition-all duration-300"
          >
            {t('home.start')}
          </button>
          <button
            onClick={handleLearnMore}
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full shadow-lg hover:bg-white hover:text-indigo-600 transition-all duration-300"
          >
            {t('home.learn_more')}
          </button>
        </div>
      </div>

      <div className="absolute bottom-5 w-full text-center text-sm opacity-70">
        <p>{t('home.footer')}</p>
      </div>
    </div>
  );
};

export default Home;
