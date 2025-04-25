import { useParams } from 'react-router-dom';
import i18n from '../i18n';
import { useEffect } from 'react';

const LocaleUpdater = () => {
  const { lang } = useParams();

  useEffect(() => {
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return null;
};

export default LocaleUpdater;
