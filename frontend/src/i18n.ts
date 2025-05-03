import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { parse } from 'yaml'

import ruYaml from '@/locales/ru.yml?raw'
import enYaml from '@/locales/en.yml?raw'

const ru = parse(ruYaml)
const en = parse(enYaml)

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru }
    },
    lng: 'ru',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  })

export default i18n
