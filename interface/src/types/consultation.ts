export interface SpeakerSegment {
    speaker: string;
    text: string;
}

export interface Consultation {
    id: string;
    date: string;
    transcript: string;
    speakers?: SpeakerSegment[];
    diagnosis?: {
        probable_diagnosis: string;
        associated_diseases: string[];
        suggested_exams: string[];
        common_medications: string[];
        reasoning?: string;
    };
}
