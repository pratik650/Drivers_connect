const Driver = require('../models/Driver');
const bcrypt = require('bcrypt');

exports.registerDriver = async (req, res) => {
    const { fullName, address, Phonenumber, email, password, adhaarId, birthdate, eligible, available } = req.body;
    console.log(req.body);
    // Basic validation
    if (!fullName || !address || !Phonenumber || !email || !password || !adhaarId || !birthdate) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user is eligible and available
    if (!eligible || !available) {
        return res.status(400).json({ message: 'Driver must be eligible and available' });
    }

    try {
        const existingDriverQuery = Driver.findOne({ email });
        existingDriverQuery.maxTimeMS(20000); // Set timeout to 20 seconds
        const existingDriver = await existingDriverQuery;

        if (existingDriver) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newDriver = new Driver({
            fullName,
            address,
            Phonenumber,
            email,
            password: hashedPassword, // Save the hashed password
            adhaarId,
            birthdate,
            eligible,
            available
        });

        await newDriver.save();
        // for profile completion purpose
        const driverData = {
            fullName: newDriver.fullName,
            address: newDriver.address,
            Phonenumber: newDriver.Phonenumber,
            email: newDriver.email,
            adhaarId: newDriver.adhaarId,
            birthdate: newDriver.birthdate,
        };
        res.status(201).json({ 
            message: 'Driver registered successfully', 
            driver: driverData // Send back the driver data
        });
    } catch (error) {
        // If it's a validation error
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        // Handle other errors
        res.status(500).json({ message: 'Error registering driver', error: error.message });
    }
};

//Login mechanism for driver

// In your Drivercontroller.js

exports.driverLogin = async (req, res) => {
    const { Phonenumber, password } = req.body;

    try {
        const driver = await Driver.findOne({ Phonenumber }).exec();
        if (!driver) {
            return res.status(401).json({ message: 'Phone number not found, please try again.' });
        }
        const isMatch = await bcrypt.compare(password, driver.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials for password, please try again.' });
        }
        res.json({
            message: 'Login successful.',
            userName: driver.fullName
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred.', error: error.message });
    }
};
