import { env } from "./env";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const aiProvider = env.aiProvider;

// OPENAI CLIENT
export const openai = new OpenAI({
  apiKey: env.openaiKey,
});

// GEMINI CLIENT
export const gemini = new GoogleGenerativeAI(env.geminiKey!);