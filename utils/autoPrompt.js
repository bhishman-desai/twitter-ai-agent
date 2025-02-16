export const autoPrompt = async (observation) => {
    if (!observation) return "No observation available.";

    if (observation.includes("error")) {
        return "Try rewording the tweet for better clarity.";
    } else if (observation.includes("engagement")) {
        return "Consider adding a question to encourage responses.";
    } else {
        return "Looks good! Ready to post.";
    }
};
