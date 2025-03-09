import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-screen bg-gradient-to-r from-gray-500 to-indigo-600 flex items-center justify-center">
      <div className="text-center text-white max-w-lg">
        <div className="mb-8">
          <span className="text-6xl font-bold block">{t('error_pages.not_found.code')}</span>
          <span className="text-2xl font-light">{t('error_pages.not_found.page_not_found')}</span>
        </div>
        <p className="mb-8 text-lg text-gray-200">{t('error_pages.not_found.sorry_message')}</p>
      </div>
    </div>
  );
};

export default NotFound;
