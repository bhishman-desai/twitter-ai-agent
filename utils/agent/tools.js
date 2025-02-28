const generateTweet = async (topic) => {};

const postTweet = async (tweet) => {
    try {
        const response = await client.createTweet({
            text: tweet,
        });
    } catch (error) {
        console.error("Error posting tweet:", error);
    }
};

module.exports = { generateTweet, postTweet };