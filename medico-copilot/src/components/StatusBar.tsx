import React from 'react';
import { AppState } from '../types';
import { BrainCircuit } from 'lucide-react';

const RecordingIndicator: React.FC = () => (
    <div className="flex items-center space-x-2">
        <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span className="text-red-500 font-semibold">Gravando</span>
    </div>
);

interface StatusBarProps {
    appState: AppState;
}

export const StatusBar: React.FC<StatusBarProps> = ({ appState }) => {
    const getTitle = () => {
        switch(appState) {
            case AppState.RECORDING:
                return "Consulta em Andamento";
            case AppState.EDITING:
                return "Editando Transcrição";
            case AppState.PROCESSING:
                return "Analisando Consulta";
            default:
                return "Painel de Diagnóstico";
        }
    };
    
    return (
        <div className="w-full flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">
              {getTitle()}
            </h2>
            {appState === AppState.RECORDING && <RecordingIndicator />}
        </div>
    );
};

export const ProcessingView: React.FC = () => (
    <div className="w-full h-[300px] flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
        <BrainCircuit className="w-16 h-16 text-blue-500 animate-pulse" />
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-200">
            Analisando e gerando diagnóstico...
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Isso pode levar alguns segundos.</p>
    </div>
);

export const ErrorView: React.FC<{ message: string | null }> = ({ message }) => (
    <div className="w-full h-[300px] flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-700">
        <p className="text-red-600 dark:text-red-400 text-center font-medium">{message}</p>
    </div>
);