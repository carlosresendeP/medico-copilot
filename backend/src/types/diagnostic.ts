export interface DiagnosisResponse {
  probable_diagnosis: string;
  associated_diseases: string[];
  suggested_exams: string[];
  common_medications: string[];
}
