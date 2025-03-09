import React from 'react';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('home.welcome')}</h1>
        <p className="text-lg text-gray-600 mb-8">{t('home.description')}</p>
      </div>
    </div>
  );
};

export default Home;
