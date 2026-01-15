
import { GoogleGenAI, Type } from "@google/genai";
import { TripDetails, SustainabilityPrefs, Itinerary } from "../types";

const itinerarySchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      title: { type: Type.STRING },
      totalScore: { type: Type.NUMBER },
      breakdown: {
        type: Type.OBJECT,
        properties: {
          carbon: { type: Type.NUMBER },
          community: { type: Type.NUMBER },
          biodiversity: { type: Type.NUMBER },
          overtourism: { type: Type.NUMBER },
        },
        required: ["carbon", "community", "biodiversity", "overtourism"]
      },
      explanation: { type: Type.STRING },
      transportMode: { type: Type.STRING },
      accommodationType: { type: Type.STRING },
      days: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.NUMBER },
            activity: { type: Type.STRING },
            transport: { type: Type.STRING },
            accommodation: { type: Type.STRING },
            sustainabilityNote: { type: Type.STRING },
          },
          required: ["day", "activity", "transport", "accommodation", "sustainabilityNote"]
        }
      }
    },
    required: ["id", "title", "totalScore", "breakdown", "explanation", "days", "transportMode", "accommodationType"]
  }
};

export const generateItineraries = async (
  details: TripDetails,
  prefs: SustainabilityPrefs
): Promise<Itinerary[]> => {
  // Directly initialize GoogleGenAI with the environment variable as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are an impact-first eco-travel assistant. Generate 3 unique, sustainable itineraries for a trip from ${details.origin} to ${details.destination}.
    Dates: ${details.startDate} to ${details.endDate}.
    Budget: ${details.budget}.
    Travel Pace: ${details.travelPace}.
    
    Sustainability Priorities (1-100):
    - Carbon Emissions: ${prefs.carbon}
    - Local Community Support: ${prefs.community}
    - Biodiversity Protection: ${prefs.biodiversity}
    - Overtourism Mitigation: ${prefs.overtourism}
    
    For each itinerary, provide a total sustainability score (0-100) and a breakdown across the four metrics.
    Focus on low-carbon transport (trains, shared EVs), locally-owned homestays, and off-the-beaten-path activities.
    Include daily sustainability highlights explaining the impact choices.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: itinerarySchema,
      },
    });

    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating itineraries:", error);
    throw error;
  }
};
