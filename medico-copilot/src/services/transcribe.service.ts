// src/services/transcribe.service.ts
import { api } from "./api";

export const transcribeAudio = async (file: File) => {
  const formData = new FormData();
  formData.append("audio", file);

  const response = await api.post("/transcribe", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const transcribeText = async (text: string) => {
  const response = await api.post("/transcribe-text", { text });
  return response.data;
};
