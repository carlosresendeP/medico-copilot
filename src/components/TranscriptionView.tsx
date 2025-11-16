import React from 'react';

interface TranscriptionViewProps {
    transcription: string;
}

export const TranscriptionView: React.FC<TranscriptionViewProps> = ({ transcription }) => {
    return (
        <div className="w-full h-[300px] bg-slate-100 dark:bg-slate-800 rounded-lg p-4 overflow-y-auto border border-slate-200 dark:border-slate-700 transition-all duration-300">
            <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                {transcription || "A transcrição da consulta aparecerá aqui em tempo real..."}
            </p>
        </div>
    );
};
