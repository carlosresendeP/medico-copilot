import React from 'react';
import { Keyboard } from 'lucide-react';
import { SpeakerTranscription } from './SpeakerTranscription';
import { useLanguage } from '../contexts/LanguageContext';

interface SpeakerSegment {
    speaker: string;
    text: string;
}

interface TranscriptionViewProps {
    transcription: string;
    editedTranscription: string;
    isEditing: boolean;
    onToggleEdit: () => void;
    onTextChange: (value: string) => void;
    speakers?: SpeakerSegment[];
    hasSpeakers?: boolean;
}

export const TranscriptionView: React.FC<TranscriptionViewProps> = ({
    transcription,
    editedTranscription,
    isEditing,
    onToggleEdit,
    onTextChange,
    speakers,
    hasSpeakers
}) => {
    const { t } = useLanguage();

    // Se tem identificação de falantes e não está editando, mostra o componente especializado
    if (hasSpeakers && speakers && speakers.length > 0 && !isEditing) {
        return (
            <div className="relative">
                <button
                    onClick={onToggleEdit}
                    className="absolute top-2 right-2 z-10 p-2 rounded-full text-slate-400 hover:bg-slate-700 transition-colors"
                    aria-label={t('transcription.editManually')}
                >
                    <Keyboard className="w-5 h-5" />
                </button>
                <SpeakerTranscription speakers={speakers} />
            </div>
        );
    }

    return (
        <div className="relative w-full h-[300px] bg-slate-800 rounded-lg p-4 border border-slate-700 transition-all duration-300">
            <button
                onClick={onToggleEdit}
                disabled={isEditing}
                className="absolute top-2 right-2 p-2 rounded-full text-slate-400 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label={t('transcription.editManually')}
            >
                <Keyboard className="w-5 h-5" />
            </button>
            {isEditing ? (
                <textarea
                    value={editedTranscription}
                    onChange={(e) => onTextChange(e.target.value)}
                    className="w-full h-full bg-transparent text-slate-300 whitespace-pre-wrap focus:outline-none resize-none"
                    placeholder={t('transcription.placeholder')}
                />
            ) : (
                <p className="text-slate-300 whitespace-pre-wrap overflow-y-auto h-full pr-10">
                    {editedTranscription || transcription || t('transcription.empty')}
                </p>
            )}
        </div>
    );
};