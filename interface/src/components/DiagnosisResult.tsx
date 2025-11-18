import React from 'react';
import { Check, Brain, FileText } from 'lucide-react';
import type { DiagnosisReport } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface DiagnosisSectionProps {
    title: string;
    content: string[];
}

const DiagnosisSection: React.FC<DiagnosisSectionProps> = ({ title, content }) => {
    const { t } = useLanguage();

    return (
        <div>
            <h3 className="text-lg font-semibold text-slate-100 border-b-2 border-blue-800 pb-2 mb-3">
                {title}
            </h3>
            {content && content.length > 0 ? (
                <ul className="space-y-2">
                    {content.map((item, index) => (
                        <li key={index} className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex" />
                            <span className="text-slate-300">{item}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-slate-400 italic">{t('diagnosis.noinfo')}</p>
            )}
        </div>
    );
};


interface DiagnosisResultProps {
    report: DiagnosisReport | null;
    onGeneratePrescription?: () => void;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ report, onGeneratePrescription }) => {
    const { t } = useLanguage();

    if (!report) return null;

    return (
        <div className="space-y-6 animate-fade-in">
            <DiagnosisSection title={t('diagnosis.probable')} content={[report.probable_diagnosis]} />
            <DiagnosisSection title={t('diagnosis.diseases')} content={report.associated_diseases} />
            <DiagnosisSection title={t('diagnosis.exams')} content={report.suggested_exams} />
            <DiagnosisSection title={t('diagnosis.medications')} content={report.common_medications} />

            {report.reasoning && (
                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-800">
                    <div className="flex items-center gap-2 mb-3">
                        <Brain className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-semibold text-blue-100">
                            {t('diagnosis.reasoning')}
                        </h3>
                    </div>
                    <p className="text-slate-300 whitespace-pre-wrap">
                        {report.reasoning}
                    </p>
                </div>
            )}

            {/* Prescription Button */}
            {onGeneratePrescription && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={onGeneratePrescription}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <FileText className="w-5 h-5" />
                        {t('prescription.generate')}
                    </button>
                </div>
            )}
        </div>
    );
};
