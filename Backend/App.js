require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./src/config/Db');
const cors = require('cors');


const app = express();
// Database connection
dbConfig.connect();
//Import cores
app.use(cors());
// Middlewares
app.use(express.json());

// Import routes
const driverRoutes = require('./src/routes/Driverroute');
app.use('/api/drivers', driverRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
