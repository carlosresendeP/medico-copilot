export interface SpeakerSegment {
  speaker: string;
  text: string;
  start?: number;
  end?: number;
}

export interface TranscribeResponse {
  transcript: string;
  speakers?: SpeakerSegment[];
  hasSpeakers?: boolean;
}
