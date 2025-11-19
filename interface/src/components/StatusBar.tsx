import React from 'react';
import { AppState } from '../types';
import { BrainCircuit, History } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

const RecordingIndicator: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-red-500 font-semibold">{t('status.recording')}</span>
        </div>
    );
};

interface StatusBarProps {
    appState: AppState;
    onOpenHistory?: () => void;
    isSendingAudio?: boolean; }

export const StatusBar: React.FC<StatusBarProps> = ({ appState, onOpenHistory, isSendingAudio }) => {
    const { t } = useLanguage();

    const getTitle = () => {
        switch (appState) {
            case AppState.RECORDING:
                return t('status.inProgress');
            case AppState.EDITING:
                return t('status.editing');
            case AppState.PROCESSING:
                return t('status.analyzing');
            default:
                return t('status.ready');
        }
    };

    return (
        <div className="w-full flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-200">
                {getTitle()}
            </h2>

            <div className="flex items-center space-x-4">

                
                {isSendingAudio && (
                    <div className="flex items-center gap-2 text-blue-400 animate-pulse">
                        <div className="h-3 w-3 rounded-full bg-blue-400 animate-ping"></div>
                        <span className="font-medium text-sm">{t('status.sendingAudio') || "Enviando áudio..."}</span>
                    </div>
                )}

                {/* Indicador de gravação */}
                {appState === AppState.RECORDING && <RecordingIndicator />}

                <LanguageSwitcher />

                {onOpenHistory && (
                    <button
                        onClick={onOpenHistory}
                        className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
                        title={t('history.title')}
                    >
                        <History className="w-5 h-5" />
                        <span>{t('history.button')}</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export const ProcessingView: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="w-full h-[300px] flex flex-col items-center justify-center bg-slate-800 rounded-lg p-4 border border-slate-700">
            <BrainCircuit className="w-16 h-16 text-blue-500 animate-pulse" />
            <p className="mt-4 text-lg font-medium text-slate-200">
                {t('processing.title')}
            </p>
            <p className="text-sm text-slate-400">{t('processing.subtitle')}</p>
        </div>
    );
};

export const ErrorView: React.FC<{ message: string | null }> = ({ message }) => (
    <div className="w-full h-[300px] flex flex-col items-center justify-center bg-red-900/20 rounded-lg p-4 border border-red-700">
        <p className="text-red-400 text-center font-medium">{message}</p>
    </div>
);
