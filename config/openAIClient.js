const OpenAI = require("openai");

let client = null;

const initOpenAIClient = async () => {
  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

const getOpenAIClient = () => {
  if (!client) {
    throw new Error(
      "OpenAI client is not initialized. Please call initOpenAI() first."
    );
  }
  return client;
};

module.exports = { initOpenAIClient, getOpenAIClient };
