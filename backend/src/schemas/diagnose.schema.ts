import { z } from "zod";

export const DiagnoseSchema = z.object({
  transcript: z.string().min(5)
});