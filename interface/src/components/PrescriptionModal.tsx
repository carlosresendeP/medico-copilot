import React, { useState } from 'react';
import { FileText, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PrescriptionModalProps {
    onGenerate: (patientName: string, doctorName: string) => void;
    onClose: () => void;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({ onGenerate, onClose }) => {
    const { t } = useLanguage();
    const [patientName, setPatientName] = useState('');
    const [doctorName, setDoctorName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate(patientName, doctorName);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg shadow-2xl max-w-md w-full border border-slate-700">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-blue-500" />
                        <h2 className="text-xl font-bold text-slate-100">
                            {t('prescription.title')}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                        aria-label="Fechar"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="patientName" className="block text-sm font-medium text-slate-300 mb-2">
                            {t('prescription.patientName')} {' '}
                            <span className="text-slate-500 text-xs">{t('prescription.optional')}</span>
                        </label>
                        <input
                            type="text"
                            id="patientName"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ex: João Silva"
                        />
                    </div>

                    <div>
                        <label htmlFor="doctorName" className="block text-sm font-medium text-slate-300 mb-2">
                            {t('prescription.doctorName')} {' '}
                            <span className="text-slate-500 text-xs">{t('prescription.optional')}</span>
                        </label>
                        <input
                            type="text"
                            id="doctorName"
                            value={doctorName}
                            onChange={(e) => setDoctorName(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ex: Maria Santos"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <FileText className="w-4 h-4" />
                            {t('prescription.generate')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
