require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./src/config/Db');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const path = require("path");
const app = express();
dbConfig.connect();

// Creating an HTTP server using the Express app
const server = http.createServer(app);

// Creating a WebSocket server
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function connection(ws) {
    console.log('A new client connected');
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
});

// Handling the upgrade of the request to a WebSocket connection
server.on('upgrade', function upgrade(request, socket, head) {
    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
    });
});

// const path = require('path');

// Enable CORS
app.use(cors()); // Using CORS

// Middlewares

app.use(express.json()); // Parsing JSON bodies

// Serving static files
app.use('/images', express.static('src/upload/'));
 
 
app.use('/images', express.static('src/upload'));

// Import routes
const userRoutes = require('./src/routes/Userroute');
app.use('/api/users', userRoutes);

const driverRoutes = require('./src/routes/Driverroute');
app.use('/api/drivers', driverRoutes);

const adminRoutes = require('./src/routes/Adminroute');
app.use('/api/admin', adminRoutes);

// Handling favicon.ico requests
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Default route
app.get('/', (req, res) => res.json("hello")); // Sending a JSON response

// Start the server
const PORT = process.env.PORT || 5000; 
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
