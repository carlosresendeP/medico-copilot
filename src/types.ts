
export interface DiagnosisReport {
  probable_diagnosis: string;
  associated_diseases: string[];
  suggested_exams: string[];
  common_medications: string[];
}

export const AppState = {
  IDLE: 'IDLE',
  RECORDING: 'RECORDING',
  PROCESSING: 'PROCESSING',
  RESULT: 'RESULT',
  ERROR: 'ERROR',
} as const;

export type AppState = typeof AppState[keyof typeof AppState];
