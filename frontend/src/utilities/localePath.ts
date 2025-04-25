import i18n from '../i18n';

export const localePath = (path: string): string => {
  const base = path.startsWith('/') ? path.slice(1) : path;
  return `/${i18n.language}/${base}`;
};
