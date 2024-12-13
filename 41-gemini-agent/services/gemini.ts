import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  faqs,
  search,
  system_prompt,
  labelQuestions,
  generateUserRoleMessage,
} from "./config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction: system_prompt,
});

const generationConfig = {
  topK: 40,
  topP: 0.95,
  temperature: 0.6,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function sendPrompt(msg: string) {
  const contextList = search(msg);

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(
    generateUserRoleMessage(contextList, msg)
  );
  return result.response?.text()?.replace?.("```html", "") || "";
}

export async function generateFaqByLabel(label: string) {
  const contextList = faqs
    .filter((el) => el.label.toUpperCase() === label.toUpperCase())
    .map((el) => el.answer);

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(
    generateUserRoleMessage(contextList, labelQuestions[label])
  );
  return (
    result.response?.text()?.replace?.("```html", "")?.replace?.("```", "") ||
    ""
  );
}
