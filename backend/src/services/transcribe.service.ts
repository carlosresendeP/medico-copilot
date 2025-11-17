import { aiProvider, openai, gemini } from "../config/ai.config";
import { TranscribeResponse } from "../types/transcribe";

export class TranscribeService {
  async transcribe(input: { audioBase64?: string; text?: string }): Promise<TranscribeResponse> {

    if (input.text) {
      return { transcript: input.text };
    }

    if (!input.audioBase64) {
      throw new Error("No audio or text provided.");
    }

    if (aiProvider === "openai") {
      const buffer = Buffer.from(input.audioBase64, "base64");
      const file = new File([buffer], "audio.mp3", { type: "audio/mp3" });
      
      const res = await openai.audio.transcriptions.create({
        file: file,
        model: "whisper-1",
      });

      return { transcript: res.text };
    }

    if (aiProvider === "gemini") {
      const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent([
        {
          inlineData: {
            data: input.audioBase64,
            mimeType: "audio/mp3"
          }
        }
      ]);

      return { transcript: result.response.text() };
    }

    throw new Error("Invalid AI provider");
  }
}
