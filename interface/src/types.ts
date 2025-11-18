
export interface DiagnosisReport {
  probable_diagnosis: string;
  associated_diseases: string[];
  suggested_exams: string[];
  common_medications: string[];
  reasoning?: string;
}

export const AppState = {
  IDLE: 'IDLE',
  RECORDING: 'RECORDING',
  EDITING: 'EDITING',
  PROCESSING: 'PROCESSING',
  RESULT: 'RESULT',
  ERROR: 'ERROR',
} as const;

export type AppState = typeof AppState[keyof typeof AppState];
