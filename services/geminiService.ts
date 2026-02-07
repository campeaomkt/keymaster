
import { GoogleGenAI, Type } from "@google/genai";
import { Exercise } from "../types";

export const generateExercises = async (topic: string): Promise<Exercise[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Gere 3 exercícios práticos para um tecladista sobre o tema: ${topic}. 
  Inclua o título, uma descrição detalhada, a sequência de notas ou acordes para tocar e algumas dicas.
  Responda em Português do Brasil no formato JSON solicitado.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              sequence: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              tips: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["title", "description", "sequence", "tips"]
          }
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Erro ao gerar exercícios:", error);
    throw error;
  }
};
