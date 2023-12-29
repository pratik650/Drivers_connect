const Driver = require('../models/Driver');
const bcrypt = require('bcrypt');
const path = require('path');

exports.registerDriver = async (req, res) => {
    console.log("step1")
    const { fullName, address, Phonenumber, email, password, adhaarId, birthdate, eligible, available } = req.body;
    console.log(req.body);
    if (!fullName || !address || !Phonenumber || !email || !password || !adhaarId || !birthdate) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user is eligible and available
    if (!eligible || !available) {
        return res.status(400).json({ message: 'Driver must be eligible and available' });
    }

    try {
        const existingDriverQuery = Driver.findOne({Phonenumber});
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
        
        res.status(201).json({ 
            message: 'Driver registered successfully', 
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
    const {Phonenumber,password} = req.body;
    try {
        const driver = await Driver.findOne({Phonenumber}).exec();
        console.log(driver)
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


exports.getDriverProfile = async (req, res) => {
    const { Phonenumber }  = req.params; 
    try {
        const driver = await Driver.findOne({ Phonenumber }).exec();
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found.' });
        }
        // Select the fields you want to send back
        const profileData = {
            id:driver._id,
            fullName: driver.fullName,
            address: driver.address,
            phoneNumber: driver.Phonenumber,
            email: driver.email,
        };

        res.json({
            message: 'Profile fetched successfully.',
            profile: profileData,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred.', error: error.message });
    }
};

exports.driverDetails = async (req, res) => {
    try {
        const drivers = await Driver.find({}).exec(); // Fetch all drivers
        if (!drivers || drivers.length === 0) {
            return res.status(404).json({ success: false, message: 'No drivers found.' });
        }

        res.json({
            success: true,
            message: 'Drivers fetched successfully.',
            data: drivers
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error occurred.', error: error.message });
    }
};


exports.updateprofile = async (req, res) => {
    try {
        const userID = req.body.userID;
        if (!userID) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const imagePath = req.file?.path;
        if (!imagePath) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        // Extract the relative path from imagePath
        const relativePath = imagePath.split('src/upload/')[1]; // Adjust the split parameter based on your folder structure

        // Update the user's profile in the database
        const updatedUser = await Driver.findByIdAndUpdate(
            userID, 
            { profileImage: relativePath },
            { new: true, runValidators: true } // return the updated object and run schema validators
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', profileImage: relativePath });
    } catch (error) {
        console.error("Error in updateprofile: ", error);
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};