// driverRoutes.js
const express = require('express');
const router = express.Router();
const driverController = require('../controller/Drivercontroller');


// Assuming driverController has a function named 'registerDriver'

router.post('/register', driverController.registerDriver);
router.post('/login', driverController.driverLogin);

module.exports = router;
