import { useState, useRef, useCallback } from "react";
import { generateDiagnosis } from "../services/diagnose.service";
import { api } from "../services/api";

interface SpeakerSegment {
  speaker: string;
  text: string;
}

export interface UseMedCopilot {
  isConnected: boolean;
  transcript: string;
  speakers: SpeakerSegment[];
  hasSpeakers: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  diagnosis: any | null;
  isDiagnosing: boolean;
  error: string | null;

  // 🔥 ADICIONADO
  isSendingAudio: boolean;

  start: () => void;
  stop: () => void;
  sendTextForDiagnosis: (text: string) => Promise<void>;
}

export function useMedCopilot(): UseMedCopilot {
  const [isConnected, setIsConnected] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [speakers, setSpeakers] = useState<SpeakerSegment[]>([]);
  const [hasSpeakers, setHasSpeakers] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [diagnosis, setDiagnosis] = useState<any | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔥 ADICIONADO
  const [isSendingAudio, setIsSendingAudio] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });

        console.log("🎤 Gravação finalizada. Tamanho do áudio:", audioBlob.size, "bytes");

        const formData = new FormData();
        formData.append("file", audioBlob, "audio.wav");

        try {
          console.log("📤 Enviando áudio para transcrição...");

          //envia para a interface que está enviando
          setIsSendingAudio(true);

          const response = await api.post("/api/transcribe", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          console.log("✅ Resposta do backend:", response.data);

          const transcriptText =
            response.data.transcript || response.data.transcription || "";

          setTranscript(transcriptText);

          if (response.data.speakers) {
            setSpeakers(response.data.speakers);
            setHasSpeakers(true);
          } else {
            setSpeakers([]);
            setHasSpeakers(false);
          }
        } catch (err) {
          console.error("❌ Erro ao transcrever:", err);
          setError("Erro ao transcrever áudio");
        } finally {
          // 🔥 ADICIONADO — termina o envio
          setIsSendingAudio(false);
        }

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsConnected(true);
      console.log("🎤 Gravação iniciada");
    } catch (err) {
      console.error("Erro ao acessar microfone:", err);
      setError("Erro ao acessar microfone");
    }
  }, []);

  const stop = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsConnected(false);
    }
  }, []);

  const sendTextForDiagnosis = useCallback(async (text: string) => {
    try {
      console.log("📋 Enviando texto para diagnóstico:", text.substring(0, 100) + "...");
      setIsDiagnosing(true);
      setError(null);

      const result = await generateDiagnosis(text);
      console.log("✅ Resultado do diagnóstico:", result);

      setDiagnosis(result);
    } catch (err) {
      console.error("❌ Erro ao gerar diagnóstico:", err);
      setError("Erro ao gerar diagnóstico");
      throw err;
    } finally {
      setIsDiagnosing(false);
    }
  }, []);

  return {
    isConnected,
    transcript,
    speakers,
    hasSpeakers,
    diagnosis,
    isDiagnosing,
    error,
    isSendingAudio, 
    start,
    stop,
    sendTextForDiagnosis,
  };
}
