import { GoogleGenAI, type GenerateContentResponse } from "@google/genai";

// Check if the API_KEY is available. This setup assumes a hosting environment
// like Netlify or Vercel where environment variables can be injected.
export const isApiKeySet = process.env.API_KEY !== undefined && process.env.API_KEY !== '';

const ai: GoogleGenAI | null = isApiKeySet ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;
const model = 'gemini-2.5-flash';

export const analyzeImageForPose = async (
    base64Image: string,
    posePrompt: string
): Promise<boolean> => {
    if (!ai) {
        console.error("Gemini API key not configured. Analysis skipped.");
        // The UI should prevent this from being called if the key isn't set.
        return false;
    }

    try {
        const prompt = `Analyze the user in the image. They are playing a Muay Thai game. I want to know if they are attempting the pose for: "${posePrompt}". Be extremely lenient. The user is likely a beginner. As long as the general form is recognizable, even if it's not perfect, count it as correct. Your response must be one word only: YES or NO. Focus on the main person's pose.`;

        const imagePart = {
            inlineData: {
                mimeType: 'image/jpeg',
                data: base64Image,
            },
        };

        const textPart = {
            text: prompt,
        };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: model,
            contents: { parts: [imagePart, textPart] },
            config: {
                // Disable thinking for faster, lower latency response suitable for a game
                thinkingConfig: { thinkingBudget: 0 }
            }
        });

        const resultText = response.text.trim().toUpperCase();
        console.log(`Gemini prompt: "${posePrompt}", Response: "${resultText}"`);
        return resultText === 'YES';

    } catch (error) {
        console.error("Error analyzing image with Gemini:", error);
        return false; // Assume incorrect on error to not block the game
    }
};
