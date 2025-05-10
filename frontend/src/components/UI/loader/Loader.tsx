import React from 'react';
import { SyncLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';

const Loader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-bounce">
          <SyncLoader size={12} color="#4B5563" loading={true} />
        </div>
        <p className="text-gray-800 mt-4 text-xl font-semibold animate-pulse text-shadow-md">
          {t('shared.loading')}
        </p>
      </div>
    </div>
  );
};

export default Loader;
