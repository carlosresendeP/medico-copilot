import { aiProvider, openai, gemini } from "../config/ai.config";
import { DiagnosisResponse } from "../types/diagnostic";

export class DiagnoseService {
  async diagnose(transcript: string): Promise<DiagnosisResponse> {
    const prompt = `
Você é um médico especializado. Analise o seguinte relato do paciente e gere um relatório diagnóstico completo.

Texto: """${transcript}"""

Retorne APENAS um JSON válido no seguinte formato exato:
{
  "probable_diagnosis": "Diagnóstico mais provável baseado nos sintomas",
  "associated_diseases": ["Doença 1", "Doença 2", "Doença 3"],
  "suggested_exams": ["Exame 1", "Exame 2", "Exame 3"],
  "common_medications": ["Medicamento 1", "Medicamento 2", "Medicamento 3"]
}
`;

    if (aiProvider === "openai") {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Você é um assistente médico especializado. Responda APENAS com JSON válido." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      });

      const content = completion.choices[0].message.content || '{}';
      return JSON.parse(content);
    }

    if (aiProvider === "gemini") {
      const model = gemini.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        generationConfig: {
          responseMimeType: "application/json"
        }
      });

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      return JSON.parse(text);
    }

    throw new Error("Invalid AI provider");
  }
}
