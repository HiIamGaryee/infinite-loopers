const API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/";
const API_KEY = process.env.REACT_APP_API_KEY; // Add your API key to `.env`

/**
 * Fetches generative suggestions from the API based on the selected tone and user input.
 * @param {string} tone - The tone model to use (e.g., 'casual', 'formal').
 * @param {string} input - The user input to generate text from.
 * @returns {Promise<string>} - The generated suggestion text.
 */

export const fetchGenerativeResponse = async (tone, input) => {
  const modelMap = {
    casual: "tunedModels/casually-5e123ifaah5h",
    formal: "tunedModels/formal-hpfoe9trlpus",
    romantic: "tunedModels/romantic-lgq72w26ux7q",
    doggie: "tunedModels/doggie-pets-xyz123",
    professional: "tunedModels/professionalyf-3rjq5lslrozm",
    friendly: "tunedModels/friendly-1gq72w26ux7q",
  };

  const model = modelMap[tone] || modelMap.casual; // Default to 'casual' if no tone is found

  try {
    const response = await fetch(
      `${API_BASE_URL}${model}:generateText?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch generative response");
    }

    const data = await response.json();
    return data.generatedText || "No suggestion generated.";
  } catch (error) {
    console.error("Error fetching generative response:", error);
    return "Error generating suggestion. Please try again.";
  }
};
