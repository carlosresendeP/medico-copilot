import { GoogleGenAI, Modality, Type, LiveServerMessage } from '@google/genai';
import type { DiagnosisReport } from '../types';

const API_KEY = import.meta.env.VITE_API_KEY;

export const connectForTranscription = (callbacks: {
    onMessage: (message: LiveServerMessage) => void;
    onError: (error: ErrorEvent) => void;
    onClose: (event: CloseEvent) => void;
    onOpen: () => void;
}) => {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    return ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
            responseModalities: [Modality.AUDIO],
            inputAudioTranscription: {},
        },
        callbacks: {
            onopen: callbacks.onOpen,
            onmessage: callbacks.onMessage,
            onerror: callbacks.onError,
            onclose: callbacks.onClose,
        },
    });
};

export const generateDiagnosisFromText = async (text: string): Promise<DiagnosisReport> => {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const prompt = `
    Você é um assistente médico especialista em análise de transcrições de consultas.
    Analise a seguinte transcrição de uma consulta médica e forneça um resumo estruturado.
    A resposta DEVE ser um objeto JSON válido, seguindo o schema definido.

    Transcrição:
    "${text}"

    Gere um diagnóstico provável, uma lista de possíveis doenças associadas, uma lista de exames sugeridos e uma lista de medicamentos comuns para as condições identificadas.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    probable_diagnosis: { type: Type.STRING, description: "O diagnóstico mais provável com base na transcrição." },
                    associated_diseases: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Outras possíveis doenças ou condições relacionadas." },
                    suggested_exams: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Exames laboratoriais ou de imagem sugeridos para confirmar o diagnóstico." },
                    common_medications: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Medicamentos comumente prescritos para a condição." }
                },
                required: ["probable_diagnosis", "associated_diseases", "suggested_exams", "common_medications"]
            },
        },
    });

    const jsonString = response.text?.trim() ?? '{}';
    return JSON.parse(jsonString);
};
