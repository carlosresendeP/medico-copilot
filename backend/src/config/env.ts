import dotenv from 'dotenv';
dotenv.config();

export const env = {
  aiProvider: process.env.AI_PROVIDER || "openai",
  openaiKey: process.env.OPENAI_API_KEY,
  geminiKey: process.env.GEMINI_API_KEY,
};
