const axios = require("axios");

const generateTweet = async (topic) => {
  const api_url = "https://www.hootsuite.com/api/contentGenerator";
  const api_key = "6KHVmuOFjZktDcDx8prMJi";
  const headers = { "Content-Type": "application/json" };
  const body = {
    dropdown1: "English",
    dropdown2: "witty",
    id: api_key,
    input1: topic,
    locale: "en-US",
  };

  try {
    const response = await axios.post(api_url, body, { headers });
    const tweets = response.data.results;
    return tweets[0];
  } catch (error) {
    console.error("Error generating tweet:", error);
    return null;
  }
};

const tools = {
  generateTweet: generateTweet,
};

module.exports = { tools };
