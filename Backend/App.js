require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./src/config/Db');
const cors = require('cors');
const path = require('path');

const app = express();
dbConfig.connect();
console.log('Serving static files from:', path.join(__dirname, 'src', 'upload'));
app.use('/images', express.static(path.join(__dirname, 'src', 'upload')));

// Enable CORS
app.use(cors()); // Corrected the usage of cors

// Middlewares
app.use(express.json()); 
 
app.use('/images', express.static('src/upload'));

// Import routes
const userRoutes = require('./src/routes/Userroute');
app.use('/api/users', userRoutes);

const driverRoutes = require('./src/routes/Driverroute');
app.use('/api/drivers', driverRoutes);

const adminRoutes = require('./src/routes/Adminroute');
app.use('/api/admin', adminRoutes);

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/', (req, res) => res.json("hello")); // Corrected the method from req.json to res.json


const PORT = process.env.PORT || 5000; // Set a default port if PORT is not defined
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
   .on('error', err => console.error(err)); // Error handling for server listen method

