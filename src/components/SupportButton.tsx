import React, { useState } from 'react';
import { MessageCircle, X, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

export const SupportButton: React.FC = () => {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setSent(false), 300);
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-pink-700 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        title={t('support.title', lang)}
      >
        <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="support-modal-bg border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative animate-in">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600">
              {t('support.title', lang)}
            </h2>

            {sent ? (
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle size={56} className="text-green-400 mb-4" />
                <p className="support-text">{t('support.success', lang)}</p>
                <button
                  onClick={handleClose}
                  className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-pink-700 text-white font-bold hover:from-pink-400 hover:to-pink-600 transition-all"
                >
                  {t('cart.close', lang)}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium support-label mb-1">
                    {t('support.name', lang)}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('support.namePlaceholder', lang)}
                    className="w-full px-4 py-2.5 rounded-xl support-input border border-gray-600 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium support-label mb-1">
                    {t('support.email', lang)}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('support.emailPlaceholder', lang)}
                    className="w-full px-4 py-2.5 rounded-xl support-input border border-gray-600 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium support-label mb-1">
                    {t('support.message', lang)}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('support.messagePlaceholder', lang)}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl support-input border border-gray-600 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-colors resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-pink-700 text-white font-bold hover:from-pink-400 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  {t('support.send', lang)}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
