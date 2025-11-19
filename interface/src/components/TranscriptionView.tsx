import React from 'react';
import { Keyboard, Loader2 } from 'lucide-react';
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
    isSendingAudio?: boolean;
}

export const TranscriptionView: React.FC<TranscriptionViewProps> = ({
    transcription,
    editedTranscription,
    isEditing,
    onToggleEdit,
    onTextChange,
    speakers,
    hasSpeakers,
    isSendingAudio = false
}) => {
    const { t } = useLanguage();

    // Exibição especial quando há falantes
    if (hasSpeakers && speakers && speakers.length > 0 && !isEditing) {
        return (
            <div className="relative">
                {!isSendingAudio && (
                    <button
                        onClick={onToggleEdit}
                        className="absolute top-2 right-2 z-10 p-2 rounded-full text-slate-400 hover:bg-slate-700 transition-colors"
                        aria-label={t('transcription.editManually')}
                    >
                        <Keyboard className="w-5 h-5" />
                    </button>
                )}

                {/* 🔥 Indicador visual quando está enviando */}
                {isSendingAudio && (
                    <TranscriptionOverlay />
                )}

                <SpeakerTranscription speakers={speakers} />
            </div>
        );
    }

    return (
        <div
            className={`
                relative w-full h-[300px] bg-slate-800 rounded-lg p-4 border border-slate-700 
                transition-all duration-300
                ${isSendingAudio ? "opacity-60 pointer-events-none" : ""}
            `}
        >
            {/* Botão de editar — desabilita quando enviando áudio */}
            <button
                onClick={onToggleEdit}
                disabled={isEditing || isSendingAudio}
                className="absolute top-2 right-2 p-2 rounded-full text-slate-400 hover:bg-slate-700
                           disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label={t('transcription.editManually')}
            >
                <Keyboard className="w-5 h-5" />
            </button>

            {/* 🔥 Tela de feedback quando enviando áudio */}
            {isSendingAudio && <TranscriptionOverlay />}

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

// 🔥 Componente reutilizável para overlay de processamento
const TranscriptionOverlay = () => {
    const { t } = useLanguage();
    return (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
            <p className="mt-3 text-slate-300 text-sm">{t('status.sendingAudio') || "Transcrevendo áudio..."}</p>
        </div>
    );
};
