const { getFormattedDate } = require("../date");
const { generateTweet, postTweet } = require("./tools");

async function generateAgentResponse(userMessage) {
 
  const now = getFormattedDate();
  return "How can I help you today?";
}

module.exports = { generateAgentResponse };
