import React from 'react';
import { Check } from 'lucide-react';
import type { DiagnosisReport } from '../types';

interface DiagnosisSectionProps {
    title: string;
    content: string[];
}

const DiagnosisSection: React.FC<DiagnosisSectionProps> = ({ title, content }) => (
    <div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 border-b-2 border-blue-200 dark:border-blue-800 pb-2 mb-3">
            {title}
        </h3>
        {content && content.length > 0 ? (
            <ul className="space-y-2">
                {content.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">{item}</span>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-slate-500 dark:text-slate-400 italic">Nenhuma informação disponível.</p>
        )}
    </div>
);


interface DiagnosisResultProps {
    report: DiagnosisReport | null;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ report }) => {
    if (!report) return null;

    return (
        <div className="space-y-6 animate-fade-in">
            <DiagnosisSection title="Diagnóstico Provável" content={[report.probable_diagnosis]} />
            <DiagnosisSection title="Doenças Associadas" content={report.associated_diseases} />
            <DiagnosisSection title="Exames Sugeridos" content={report.suggested_exams} />
            <DiagnosisSection title="Medicamentos Comuns" content={report.common_medications} />
        </div>
    );
};
