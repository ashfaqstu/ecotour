import { GoogleGenAI, Type } from "@google/genai";
import { TripDetails, SustainabilityPrefs, Itinerary } from "../types";
import { generateItinerariesFromBackend, checkBackendHealth } from "./apiService";

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

/**
 * Generate itineraries using Gemini AI directly (fallback method)
 */
const generateItinerariesWithGemini = async (
  details: TripDetails,
  prefs: SustainabilityPrefs
): Promise<Itinerary[]> => {
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
};

/**
 * Generate itineraries - tries backend first, falls back to Gemini AI
 */
export const generateItineraries = async (
  details: TripDetails,
  prefs: SustainabilityPrefs
): Promise<Itinerary[]> => {
  // Try backend first
  try {
    const isBackendAvailable = await checkBackendHealth();
    
    if (isBackendAvailable) {
      console.log("Using backend API for itinerary generation...");
      const itineraries = await generateItinerariesFromBackend(details, prefs);
      if (itineraries && itineraries.length > 0) {
        return itineraries;
      }
    }
  } catch (backendError) {
    console.warn("Backend API unavailable, falling back to Gemini:", backendError);
  }

  // Fall back to Gemini AI
  try {
    console.log("Using Gemini AI for itinerary generation...");
    return await generateItinerariesWithGemini(details, prefs);
  } catch (geminiError) {
    console.error("Error generating itineraries with Gemini:", geminiError);
    throw geminiError;
  }
};
