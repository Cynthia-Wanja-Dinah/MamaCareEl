
import { GoogleGenAI } from "@google/genai";
import { Message, UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getChatResponse = async (userMessage: string, profile: UserProfile, history: Message[]) => {
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are MamaCare AI, a supportive maternal health assistant for women in Eldoret, Kenya. 
    The user's name is ${profile.name}. 
    She is currently ${profile.weeksPregnant} weeks pregnant (Trimester ${profile.trimester}).
    
    Guidelines:
    1. Provide supportive, culturally sensitive advice.
    2. Use local context (e.g., recommend local foods like Sukuma Wiki, Managu, Terere, Ugali, and Omena).
    3. Focus on nutrition and lifestyle specific to Trimester ${profile.trimester}.
    4. Keep answers clear, simple, and encouraging.
    5. Always include a disclaimer: "This is AI advice. Please consult your doctor at Moi Teaching and Referral Hospital or your local clinic for medical emergencies."
    6. If asked about clinic locations in Eldoret, mention MTRH, Eldoret Hospital, or local dispensaries.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "I'm sorry, I couldn't process that. Please try asking again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Pole sana (Sorry), I'm having a bit of trouble connecting right now. Please check your internet and try again.";
  }
};
