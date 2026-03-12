import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-bg-darker border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600">
          {title}
        </h2>
        <div className="text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};
