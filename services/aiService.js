const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateTweetAI = async (topic) => {
  const prompt = `Generate a short and engaging tweet about ${topic}`;
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content.trim();
};

const suggestHashtags = (tweet) => {
  // Simple function to suggest hashtags based on common keywords
  const keywords = ["AI", "Tech", "Coding", "Startup", "Python", "JavaScript"];
  return keywords
    .filter((word) => tweet.includes(word))
    .map((tag) => `#${tag}`);
};

module.exports = { generateTweetAI, suggestHashtags };
