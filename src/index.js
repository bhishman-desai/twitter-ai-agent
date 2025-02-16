import express from "express";
import dotenv from "dotenv";
import tweetRoutes from "./routes/tweetRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/tweets", tweetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
