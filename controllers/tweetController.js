const { generateTweetAI, suggestHashtags } = require("../services/aiService");
const { postToTwitter } = require("../services/twitterService");

const generateTweet = async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: "Topic is required" });

  try {
    const tweet = await generateTweetAI(topic);
    const hashtags = suggestHashtags(tweet);
    res.json({ tweet, hashtags });
  } catch (error) {
    res.status(500).json({ error: "Error generating tweet" });
  }
};

const postTweet = async (req, res) => {
  const { tweet } = req.body;
  if (!tweet) return res.status(400).json({ error: "Tweet is required" });

  try {
    const response = await postToTwitter(tweet);
    res.json({ message: "Tweet posted successfully", response });
  } catch (error) {
    res.status(500).json({ error: "Error posting tweet" });
  }
};

module.exports = { generateTweet, postTweet };
