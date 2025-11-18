import { aiProvider, openai, gemini } from "../config/ai.config";
import { TranscribeResponse, SpeakerSegment } from "../types/transcribe";

export class TranscribeService {
  async transcribe(input: { audioBase64?: string; text?: string }): Promise<TranscribeResponse> {

    if (input.text) {
      return { transcript: input.text, hasSpeakers: false };
    }

    if (!input.audioBase64) {
      throw new Error("No audio or text provided.");
    }

    if (aiProvider === "openai") {
      const buffer = Buffer.from(input.audioBase64, "base64");
      const file = new File([buffer], "audio.mp3", { type: "audio/mp3" });

      // Primeira transcrição com timestamps
      const transcription = await openai.audio.transcriptions.create({
        file: file,
        model: "whisper-1",
        response_format: "verbose_json",
        timestamp_granularities: ["segment"]
      });

      // Usar GPT para identificar os falantes
      const prompt = `
Analise a seguinte transcrição de uma consulta médica e identifique quem está falando em cada parte (Médico ou Paciente).
Retorne um JSON com array de objetos contendo: speaker (Médico ou Paciente) e text (o que foi dito).

Transcrição:
${transcription.text}

Formato de resposta:
{
  "speakers": [
    {"speaker": "Médico", "text": "..."},
    {"speaker": "Paciente", "text": "..."}
  ]
}
`;

      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "Você é um assistente especializado em análise de conversas médicas. Identifique quem está falando em cada parte da conversa." },
            { role: "user", content: prompt }
          ],
          response_format: { type: "json_object" }
        });

        const content = completion.choices[0].message.content || '{"speakers":[]}';
        const parsed = JSON.parse(content);
        const speakers: SpeakerSegment[] = parsed.speakers || [];

        return {
          transcript: transcription.text,
          speakers: speakers,
          hasSpeakers: speakers.length > 0
        };
      } catch (err) {
        console.error('Erro ao identificar falantes:', err);
        // Se falhar, retorna apenas a transcrição sem identificação de falantes
        return {
          transcript: transcription.text,
          hasSpeakers: false
        };
      }
    }

    if (aiProvider === "gemini") {
      const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

      const result = await model.generateContent([
        {
          inlineData: {
            data: input.audioBase64,
            mimeType: "audio/mp3"
          }
        },
        {
          text: "Transcreva este áudio de uma consulta médica identificando quando fala o Médico e quando fala o Paciente. Use o formato:\nMédico: [fala do médico]\nPaciente: [fala do paciente]"
        }
      ]);

      const transcriptText = result.response.text();

      // Parser simples para extrair falantes
      const lines = transcriptText.split('\n').filter(l => l.trim());
      const speakers: SpeakerSegment[] = [];

      lines.forEach(line => {
        const match = line.match(/^(Médico|Paciente):\s*(.+)$/i);
        if (match) {
          speakers.push({
            speaker: match[1],
            text: match[2]
          });
        }
      });

      return {
        transcript: transcriptText,
        speakers: speakers.length > 0 ? speakers : undefined,
        hasSpeakers: speakers.length > 0
      };
    }

    throw new Error("Invalid AI provider");
  }
}
