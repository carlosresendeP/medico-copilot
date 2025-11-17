import { useState, useRef, useCallback } from "react";
import { generateDiagnosis } from "../services/diagnose.service";
import { api } from "../services/api";

export interface UseMedCopilot {
  isConnected: boolean;
  transcript: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  diagnosis: any | null;
  isDiagnosing: boolean;
  error: string | null;

  start: () => void;
  stop: () => void;
  sendTextForDiagnosis: (text: string) => Promise<void>;
}

export function useMedCopilot(): UseMedCopilot {
  const [isConnected, setIsConnected] = useState(false);
  const [transcript, setTranscript] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [diagnosis, setDiagnosis] = useState<any | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // -----------------------------------------------------------
  // 1. INICIAR GRAVAÇÃO DE ÁUDIO
  // -----------------------------------------------------------
  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });

        console.log('🎤 Gravação finalizada. Tamanho do áudio:', audioBlob.size, 'bytes');

        // Enviar para o backend
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.wav');

        try {
          console.log('📤 Enviando áudio para transcrição...');
          const response = await api.post('/api/transcribe', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log('✅ Resposta do backend:', response.data);
          const transcriptText = response.data.transcript || response.data.transcription || '';
          console.log('📝 Transcrição recebida:', transcriptText);
          setTranscript(transcriptText);
        } catch (err) {
          console.error('❌ Erro ao transcrever:', err);
          setError('Erro ao transcrever áudio');
        }

        // Parar todas as tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsConnected(true);
      console.log("🎤 Gravação iniciada");
    } catch (err) {
      console.error('Erro ao acessar microfone:', err);
      setError('Erro ao acessar microfone');
    }
  }, []);

  // -----------------------------------------------------------
  // 2. PARAR GRAVAÇÃO
  // -----------------------------------------------------------
  const stop = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsConnected(false);
    }
  }, []);

  // -----------------------------------------------------------
  // 3. ENVIAR TEXTO PARA O BACKEND DIAGNOSTICAR
  // -----------------------------------------------------------
  const sendTextForDiagnosis = useCallback(async (text: string) => {
    try {
      console.log('📋 Enviando texto para diagnóstico:', text.substring(0, 100) + '...');
      setIsDiagnosing(true);
      setError(null);

      const result = await generateDiagnosis(text);
      console.log('✅ Resultado do diagnóstico:', result);

      setDiagnosis(result);
    } catch (err) {
      console.error('❌ Erro ao gerar diagnóstico:', err);
      setError("Erro ao gerar diagnóstico");
      throw err;
    } finally {
      setIsDiagnosing(false);
    }
  }, []);

  return {
    isConnected,
    transcript,
    diagnosis,
    isDiagnosing,
    error,
    start,
    stop,
    sendTextForDiagnosis,
  };
}
