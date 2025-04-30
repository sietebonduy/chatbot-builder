import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUser();

  const handleStart = () => {
    navigate(user ? '/dashboard' : '/login');
  };

  const handleLearnMore = () => {
    navigate('/about_us');
  };

  return (
    <div
      className="relative w-full bg-slate-50 text-gray-900 flex flex-col items-center justify-center p-6 min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#94a3b8" fillOpacity="0.3"
                d="M0,128L60,133.3C120,139,240,149,360,170.7C480,192,600,224,720,234.7C840,245,960,235,1080,213.3C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
          {t('home.welcome')}
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-600">
          {t('home.description')}
        </p>

        <div className="flex justify-center flex-wrap gap-6">
          <button
            onClick={handleStart}
            className="bg-indigo-600 text-white px-8 py-4 rounded-full shadow hover:bg-indigo-700 transition-all duration-300"
          >
            {t('home.start')}
          </button>
          <button
            onClick={handleLearnMore}
            className="bg-white border border-gray-300 text-gray-800 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300"
          >
            {t('home.learn_more')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
