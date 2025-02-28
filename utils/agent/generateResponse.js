const axios = require('axios');

async function generateAgentResponse(userMessage) {
  const response = await axios.post('https://aimyy.com/api/gpt', {
    prompt: userMessage
  });
  return response.data.response;
}

module.exports = { generateAgentResponse };