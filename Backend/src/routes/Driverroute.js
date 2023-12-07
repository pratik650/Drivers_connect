// driverRoutes.js
const express = require('express');
const router = express.Router();
const driverController = require('../controller/Drivercontroller');
const  upload  = require('../config/multerconfig');


// Assuming driverController has a function named 'registerDriver'

router.post('/register', driverController.registerDriver);
router.post('/login', driverController.driverLogin);
router.get('/profile/:Phonenumber', driverController.getDriverProfile);
router.get('/driverdetails', driverController.driverDetails);
router.post('/updateprofile', upload.single('image'), driverController.updateprofile);

module.exports = router;
