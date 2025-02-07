const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const creditReportRoutes = require('./routes/creditReportRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api', creditReportRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));