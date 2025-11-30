import { GoogleGenAI } from "@google/genai";
import { User } from "../types";

// Initialize the client
// Using process.env.API_KEY directly as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = 'gemini-2.5-flash';

export const createChatSession = (user?: User) => {
  const userContext = user 
    ? `You are assisting ${user.firstName} ${user.lastName}, who is a ${user.role} at ${user.tenantId === 'tenant-123' ? 'City General Hospital' : 'the hospital'}.` 
    : 'You are assisting a hospital staff member.';

  return ai.chats.create({
    model: modelName,
    config: {
      systemInstruction: `You are an intelligent Medical Assistant for the Hospital Management System (HMS). 
      ${userContext}
      Your role is to assist doctors, nurses, and administrators. 
      You can help with:
      1. Summarizing patient notes (generic medical info, do not ask for PII).
      2. Suggesting generic treatment protocols based on symptoms.
      3. Explaining medical terms or drug interactions.
      4. Drafting administrative emails.
      
      IMPORTANT:
      - Always include a disclaimer that you are an AI and not a replacement for professional medical judgment.
      - Do not store or ask for specific Personal Identifiable Information (PII) if not necessary.
      - Keep responses concise and professional.
      `,
    },
  });
};

export const sendMessageToGemini = async (chatSession: any, message: string) => {
  try {
    const result = await chatSession.sendMessageStream({
        message: message
    });
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};