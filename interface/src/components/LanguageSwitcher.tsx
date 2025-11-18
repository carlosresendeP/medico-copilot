import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'pt' ? 'en' : 'pt');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
            title={language === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}
        >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">{language.toUpperCase()}</span>
        </button>
    );
};
