import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative w-full bg-slate-50 text-gray-900 flex flex-col items-center justify-center p-6 min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#94a3b8"
            fillOpacity="0.3"
            d="M0,128L60,133.3C120,139,240,149,360,170.7C480,192,600,224,720,234.7C840,245,960,235,1080,213.3C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-2xl px-4">
        <h1 className="text-6xl font-extrabold mb-4">{t('error_pages.not_found.code')}</h1>
        <h2 className="text-2xl text-gray-700 mb-6">{t('error_pages.not_found.page_not_found')}</h2>
        <p className="text-lg text-gray-600 mb-8">{t('error_pages.not_found.sorry_message')}</p>

        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition-all duration-300"
        >
          {t('error_pages.not_found.go_home')}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
