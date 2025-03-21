export const fetchGeminiResponse = async (userMessage) => {
  const API_KEY = "AIzaSyAoolBrBRgCPNO7gEXyAKiBPymUOBnkxpY";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

  const requestBody = {
    contents: [{ parts: [{ text: userMessage }] }],
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
  } catch (error) {
    console.error("Error fetching Gemini API:", error);
    return "Error: API request failed.";
  }
};
