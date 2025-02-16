const express = require("express");
const router = express.Router();
const { generateTweet, postTweet } = require("../controllers/tweetController");

router.post("/generate", generateTweet);
router.post("/post", postTweet);

module.exports = router;
