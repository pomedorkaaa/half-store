import React, { createContext, useContext, useState } from 'react';
import { Language } from '../i18n';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ru',
  setLang: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('halfStoreLang') as Language | null;
    return saved && ['ru', 'en', 'ro'].includes(saved) ? saved : 'ru';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('halfStoreLang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
