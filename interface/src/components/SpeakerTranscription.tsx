import React from 'react';
import { UserCircle, Stethoscope } from 'lucide-react';

interface SpeakerSegment {
    speaker: string;
    text: string;
}

interface SpeakerTranscriptionProps {
    speakers: SpeakerSegment[];
}

export const SpeakerTranscription: React.FC<SpeakerTranscriptionProps> = ({ speakers }) => {
    return (
        <div className="w-full h-[300px] bg-slate-800 rounded-lg p-4 border border-slate-700 overflow-y-auto">
            <div className="space-y-3">
                {speakers.map((segment, index) => {
                    const isDoctor = segment.speaker.toLowerCase().includes('médico');

                    return (
                        <div
                            key={index}
                            className={`flex gap-3 p-3 rounded-lg ${isDoctor
                                    ? 'bg-blue-900/20'
                                    : 'bg-green-900/20'
                                }`}
                        >
                            <div className="flex-shrink-0">
                                {isDoctor ? (
                                    <Stethoscope className={`w-5 h-5 text-blue-400`} />
                                ) : (
                                    <UserCircle className={`w-5 h-5 text-green-400`} />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className={`text-xs font-semibold mb-1 ${isDoctor
                                        ? 'text-blue-300'
                                        : 'text-green-300'
                                    }`}>
                                    {segment.speaker}
                                </div>
                                <div className="text-slate-300">
                                    {segment.text}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
