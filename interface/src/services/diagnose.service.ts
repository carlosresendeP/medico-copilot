// src/services/diagnose.service.ts
import { api } from "./api";

export const generateDiagnosis = async (transcript: string) => {
  console.log('📤 Enviando para diagnóstico:', transcript);

  const response = await api.post("/api/diagnose", {
    transcript,
  });

  console.log('✅ Diagnóstico recebido:', response.data);
  return response.data;
};
