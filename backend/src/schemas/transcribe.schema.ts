import { z } from "zod";

export const TranscribeSchema = z.object({
  audioBase64: z.string().optional(),
  text: z.string().optional()
});