
import { GoogleGenAI, Type } from "@google/genai";
import { AIRecommendation } from "./types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY not found. Using mock data for AI features.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "mock_key" });

export async function getAIDailyTip(): Promise<string> {
  if (!API_KEY) {
    return Promise.resolve("Believe you can and you're halfway there. Keep learning!");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Generate a short, playful, and motivational learning tip for a student. Make it one sentence.',
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching daily tip:", error);
    return "Error fetching tip. Keep pushing forward!";
  }
}

export async function getAIRecommendations(skills: string[]): Promise<AIRecommendation[]> {
    if (!API_KEY) {
        return Promise.resolve([
            { title: "Explore Khan Academy", description: "Discover new topics in math and science." },
            { title: "Try Duolingo", description: "Learn a new language in just 5 minutes a day." },
            { title: "Watch a TED-Ed video", description: "Get inspired by animated educational videos." },
        ]);
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on the skills: ${skills.join(', ')}, suggest 3 fun, short learning activities.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                        },
                        required: ["title", "description"],
                    },
                },
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error fetching AI recommendations:", error);
        return [{ title: "Error", description: "Could not fetch recommendations." }];
    }
}


export async function getAICareerExplanation(skills: string[]): Promise<string> {
    if (!API_KEY) {
        return Promise.resolve("With your blend of creativity and logic, you'd be a great UX Designer, crafting beautiful and user-friendly digital experiences!");
    }
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `A student has strong skills in ${skills.join(' and ')}. Suggest a cool career path and explain in a simple, encouraging paragraph (2-3 sentences) why it's a good match.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching career explanation:", error);
        return "Could not load AI insights at this time.";
    }
}

export async function getAISkillSimulation(skillToImprove: string, currentSkills: string[]): Promise<string> {
    if (!API_KEY) {
        return Promise.resolve(`Boosting your ${skillToImprove} skill would unlock roles like Product Manager or Tech Evangelist, where explaining complex ideas simply is key to success.`);
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `If a student with skills in ${currentSkills.join(', ')} improves their '${skillToImprove}' skill, how would that open up new career opportunities? Explain briefly in a friendly tone.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching skill simulation:", error);
        return "Could not simulate skill improvement at this time.";
    }
}
