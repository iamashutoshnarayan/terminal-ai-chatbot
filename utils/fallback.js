import { askGroq } from "../services/groq.js";
import { askGemini } from "../services/gemini.js";

export async function getResponse(
  prompt,
  currentModel
) {
  try {
    if (currentModel === "groq") {
      return await askGroq(prompt);
    }

    return await askGemini(prompt);
  } catch (error) {
    console.log("\nPrimary Model Failed");

    try {
      if (currentModel === "groq") {
        console.log("Switching to Gemini...\n");
        return await askGemini(prompt);
      }

      console.log("Switching to Groq...\n");
      return await askGroq(prompt);
    } catch {
      throw new Error(
        "Both Models Are Unavailable"
      );
    }
  }
}