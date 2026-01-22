
import { GoogleGenAI } from "@google/genai";
import { Message, UserProfile } from "../types";

export const getChatResponse = async (userMessage: string, profile: UserProfile, history: Message[]) => {
  // Use process.env.API_KEY directly as per SDK requirements
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelName = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are MamaCare AI, a supportive maternal health assistant for women in Eldoret, Kenya. 
    The user's name is ${profile.name}. 
    She is currently ${profile.weeksPregnant} weeks pregnant (Trimester ${profile.trimester}).
    
    Guidelines:
    1. Provide supportive, culturally sensitive advice relevant to Eldoret and Kenya.
    2. Use local context (recommend Sukuma Wiki, Managu, Terere, Ugali, Omena, and local fruits like Mangoes/Avocados).
    3. Focus on nutrition and lifestyle specific to Trimester ${profile.trimester}.
    4. Keep answers clear, simple, and encouraging.
    5. Disclaimer: "This is AI advice. Please consult your doctor at MTRH or your local clinic for medical concerns."
    6. Mention Eldoret clinics like MTRH, Eldoret Hospital, or St. Luke's if asked about locations.
  `;

  try {
    const formattedHistory = history.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    // Directly access the text property
    return response.text || "I'm sorry, I couldn't process that. Please try asking again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Pole sana (Sorry), I'm having a bit of trouble connecting right now. Please check your internet connection.";
  }
};
