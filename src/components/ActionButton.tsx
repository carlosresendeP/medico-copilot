import React from 'react';
import { AppState } from '../types';
import { Mic, StopCircle, RefreshCcw, FileText } from 'lucide-react';

interface ActionButtonProps {
    appState: AppState;
    onStart: () => void;
    onStop: () => void;
    onGenerate: () => void;
    onReset: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ appState, onStart, onStop, onGenerate, onReset }) => {
    const renderButton = () => {
        switch (appState) {
            case AppState.IDLE:
                return (
                    <button onClick={onStart} className="flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
                        <Mic className="w-6 h-6 mr-3" />
                        Iniciar Consulta
                    </button>
                );
            case AppState.RECORDING:
                return (
                    <button onClick={onStop} className="flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800">
                        <StopCircle className="w-6 h-6 mr-3" />
                        Finalizar Consulta
                    </button>
                );
            case AppState.EDITING:
                 return (
                    <button onClick={onGenerate} className="flex items-center justify-center px-8 py-4 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800">
                        <FileText className="w-6 h-6 mr-3" />
                        Gerar Diagnóstico
                    </button>
                );
            case AppState.RESULT:
            case AppState.ERROR:
                return (
                     <button onClick={onReset} className="flex items-center justify-center px-8 py-4 bg-slate-600 text-white font-bold rounded-full shadow-lg hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-800">
                        <RefreshCcw className="w-6 h-6 mr-3" />
                        Nova Consulta
                    </button>
                );
            case AppState.PROCESSING:
                return (
                    <button disabled className="flex items-center justify-center px-8 py-4 bg-slate-400 text-white font-bold rounded-full shadow-inner cursor-not-allowed">
                        <div className="w-6 h-6 mr-3 border-t-2 border-white rounded-full animate-spin"></div>
                        Processando...
                    </button>
                );
        }
    };

    return (
        <div className="mt-8 flex justify-center">
            {renderButton()}
        </div>
    );
};