require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const tweetRoutes = require("./routes/tweetRoutes");

/* Cross Origin Resource Sharing */
app.use(cors(corsOptions));

app.use(express.json());


app.use("/api/tweets", tweetRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
