const OpenAI = require("openai");

let client = null;

const initClient = async () => {
  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

const getClient = () => {
  if (!client) {
    throw new Error(
      "Client is not initialized. Please call initClient() first."
    );
  }
  return client;
};

module.exports = { initClient, getClient };
