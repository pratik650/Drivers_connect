// driverRoutes.js
const express = require('express');
const router = express.Router();
const driverController = require('../controller/Drivercontroller');


// Assuming driverController has a function named 'registerDriver'

router.post('/register', driverController.registerDriver);
router.post('/login', driverController.driverLogin);
router.get('/profile/:Phonenumber', driverController.getDriverProfile);
router.get('/driverdetails', driverController.driverDetails);


module.exports = router;
