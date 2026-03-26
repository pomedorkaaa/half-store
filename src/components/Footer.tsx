import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

export const Footer: React.FC = () => {
    const { lang } = useLanguage();

    return (
        <footer className="footer-bg border-t footer-border py-8 mt-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600">
                            {lang === 'en' ? 'The Better Half' : lang === 'ro' ? 'A Doua Jumătate' : 'Вторая половинка'}
                        </span>
                        <p className="text-sm mt-1 footer-text">{t('footer.slogan', lang)}</p>
                    </div>
                    
                    <div className="flex gap-6">
                        <a href="#" className="footer-text hover:text-pink-400 transition-colors">{t('nav.about', lang)}</a>
                        <a href="#" className="footer-text hover:text-pink-400 transition-colors">{t('footer.delivery', lang)}</a>
                        <a href="#" className="footer-text hover:text-pink-400 transition-colors">{t('footer.contacts', lang)}</a>
                    </div>
                </div>
                
                <div className="mt-8 pt-8 border-t footer-border text-sm text-center footer-text">
                    &copy; {new Date().getFullYear()} {t('footer.copyright', lang)}
                </div>
            </div>
        </footer>
    );
};
