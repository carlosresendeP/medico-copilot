import React from 'react';
import { History, Trash2, FolderOpen } from 'lucide-react';
import { consultationService } from '../services/consultation.service';
import type { Consultation } from '../types/consultation';
import { useLanguage } from '../contexts/LanguageContext';

interface HistoryPanelProps {
    onOpen: (consultation: Consultation) => void;
    onClose: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ onOpen, onClose }) => {
    const { t } = useLanguage();
    const [consultations, setConsultations] = React.useState<Consultation[]>([]);

    React.useEffect(() => {
        setConsultations(consultationService.getAll());
    }, []);

    const handleDelete = (id: string) => {
        consultationService.delete(id);
        setConsultations(consultationService.getAll());
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleString();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <History className="w-6 h-6 text-blue-400" />
                        <h2 className="text-2xl font-bold text-slate-200">{t('history.title')}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-200 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3">
                    {consultations.length === 0 ? (
                        <p className="text-slate-400 text-center py-8">{t('history.empty')}</p>
                    ) : (
                        consultations.map((consultation) => (
                            <div
                                key={consultation.id}
                                className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors"
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <div className="text-sm text-slate-400 mb-2">
                                            {formatDate(consultation.date)}
                                        </div>
                                        <div className="text-slate-200 line-clamp-2">
                                            {consultation.transcript.substring(0, 150)}...
                                        </div>
                                        {consultation.diagnosis && (
                                            <div className="text-sm text-blue-400 mt-2">
                                                {consultation.diagnosis.probable_diagnosis}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onOpen(consultation)}
                                            className="p-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
                                            title={t('history.open')}
                                        >
                                            <FolderOpen className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(consultation.id)}
                                            className="p-2 bg-red-600 hover:bg-red-700 rounded text-white"
                                            title={t('history.delete')}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
