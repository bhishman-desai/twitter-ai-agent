require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

/* Cross Origin Resource Sharing */
app.use(cors(corsOptions));

app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
