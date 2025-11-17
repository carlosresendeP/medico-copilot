import React from 'react';
import { Keyboard } from 'lucide-react';

interface TranscriptionViewProps {
    transcription: string;
    editedTranscription: string;
    isEditing: boolean;
    onToggleEdit: () => void;
    onTextChange: (value: string) => void;
}

export const TranscriptionView: React.FC<TranscriptionViewProps> = ({
    transcription,
    editedTranscription,
    isEditing,
    onToggleEdit,
    onTextChange
}) => {
    return (
        <div className="relative w-full h-[300px] bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 transition-all duration-300">
            <button
                onClick={onToggleEdit}
                disabled={isEditing}
                className="absolute top-2 right-2 p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Digitar manualmente"
            >
                <Keyboard className="w-5 h-5" />
            </button>
            {isEditing ? (
                <textarea
                    value={editedTranscription}
                    onChange={(e) => onTextChange(e.target.value)}
                    className="w-full h-full bg-transparent text-slate-600 dark:text-slate-300 whitespace-pre-wrap focus:outline-none resize-none"
                    placeholder="Digite a transcrição da consulta aqui..."
                />
            ) : (
                <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap overflow-y-auto h-full pr-10">
                    {editedTranscription || transcription || "A transcrição da consulta aparecerá aqui em tempo real..."}
                </p>
            )}
        </div>
    );
};