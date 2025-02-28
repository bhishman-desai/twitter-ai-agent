const { getFormattedDate } = require("./date");

async function generateAgentResponse(userMessage) {
  const now = getFormattedDate();
  return "How can I help you today?";
}

module.exports = { generateAgentResponse };
