const axios = require("axios");
const { SYSTEM_PROMPT } = require("./systemPrompt");
const { tools } = require("./tools");

const messages = [
  {
    role: "system",
    content: SYSTEM_PROMPT,
  },
];

async function generateAgentResponse(userMessage) {
  const query = {
    type: "user",
    user: userMessage,
  };
  messages.push({ role: "user", content: JSON.stringify(query) });

  while (true) {
    const response = await axios.post("https://aimyy.com/api/gpt", {
      prompt: JSON.stringify(messages),
    });
    const responseMessage = response.data.response;
    messages.push({ role: "assistant", content: responseMessage });

    console.warn(responseMessage);

    const parsedResponse = JSON.parse(responseMessage);

    if (parsedResponse.type === "output") {
      return parsedResponse.output;
    } else if (parsedResponse.type === "action") {
      const tool = tools[parsedResponse.function];
      const observation = tool(parsedResponse.input);
      const observationMessage = {
        type: "observation",
        observation: observation,
      };
      messages.push({ role: "developer", content: JSON.stringify(observationMessage) });
    }
  }
}

module.exports = { generateAgentResponse };
