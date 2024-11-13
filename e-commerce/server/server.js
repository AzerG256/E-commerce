const express = require('express');
const connectDB = require('./config/db.js');
const app = express();

require('dotenv').config(); // Load environment variables

connectDB();

app.use(express.json()); // Body parser

// Routes setup here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
