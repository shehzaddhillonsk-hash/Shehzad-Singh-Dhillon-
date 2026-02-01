
import { GoogleGenAI, Type } from "@google/genai";
import { WeatherData, SmartBrief } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async fetchWeatherAndBrief(lat: number, lon: number): Promise<{ weather: WeatherData; brief: SmartBrief }> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am at latitude ${lat} and longitude ${lon}. Use Google Search to find current weather for this exact location and a smart daily fact + piece of advice. Return a clean JSON.`,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              weather: {
                type: Type.OBJECT,
                properties: {
                  location: { type: Type.STRING },
                  temp: { type: Type.NUMBER, description: "Temperature in Celsius" },
                  condition: { type: Type.STRING },
                  humidity: { type: Type.NUMBER },
                  wind: { type: Type.STRING },
                  icon: { type: Type.STRING, description: "A single weather emoji (e.g., ☀️, ☁️, 🌧️, ⛈️, ❄️, 🌫️)" }
                },
                required: ["location", "temp", "condition", "humidity", "wind", "icon"]
              },
              brief: {
                type: Type.OBJECT,
                properties: {
                  greeting: { type: Type.STRING },
                  fact: { type: Type.STRING },
                  advice: { type: Type.STRING }
                },
                required: ["greeting", "fact", "advice"]
              }
            },
            required: ["weather", "brief"]
          }
        }
      });

      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Gemini Error:", error);
      // Fallback
      return {
        weather: { location: "Unknown", temp: 22, condition: "Clear", humidity: 45, wind: "10km/h", icon: "☀️" },
        brief: { greeting: "Hello!", fact: "A day on Venus is longer than a year on Venus.", advice: "Take a moment to breathe deeply today." }
      };
    }
  }

  async getChatResponse(message: string, history: { role: 'user' | 'model'; parts: { text: string }[] }[]) {
    // Re-initialize to ensure latest API key if session updated
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: "You are Chronos, the AI voice of a high-end minimalist clock app. You are sophisticated, concise, and helpful. You know about time, productivity, and the weather.",
      }
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  }
}

export const geminiService = new GeminiService();
