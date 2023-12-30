const User = require('../models/User');
const Driver = require('../models/Driver'); 
const Booking = require('../models/booking');
const socket = require('../../socket');

const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { fullName, address, Phonenumber, email, password,eligible, available } = req.body;
    // Basic validation
    if (!fullName || !address || !Phonenumber || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user is eligible and available
    if (!available) {
        return res.status(400).json({ message: 'User must be 18 year older' });
    }

    try {
        const existingDriverQuery = User.findOne({ email });
        existingDriverQuery.maxTimeMS(20000); // Set timeout to 20 seconds
        const existingDriver = await existingDriverQuery;

        if (existingDriver) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newDriver = new User({
            fullName,
            address,
            Phonenumber,
            email,
            password: hashedPassword, // Save the hashed password
            eligible,
            available
        });

        await newDriver.save();
        res.status(201).json({ 
            message: 'User registered successfully', 
        });
    } catch (error) {
        // If it's a validation error
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        // Handle other errors
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

//Login mechanism for user

// In your Drivercontroller.js

exports.userLogin = async (req, res) => {
    const {Phonenumber,password} = req.body;
    console.log("Phone number",Phonenumber)
    try {
        const user = await User.findOne({Phonenumber}).exec();
        if (!user) {
            return res.status(401).json({ message: 'Phone number not found, please try again.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials for password, please try again.' });
        }
        res.json({
            message: 'Login successful.',
            userName: user.fullName
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred.', error: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    const { Phonenumber }  = req.params; // Assuming you're using Phonenumber as the identifier
    try {
        const user = await User.findOne({ Phonenumber }).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Select the fields you want to send back
        const profileData = {
            _id: user._id.toString(),
            fullName: user.fullName,
            address: user.address,
            phoneNumber: user.Phonenumber,
            email: user.email,
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



exports.userDetails = async (req, res) => {
    try {
        const User = await Driver.find({}).exec(); // Fetch all User
        if (!User || User.length === 0) {
            return res.status(404).json({ success: false, message: 'No User found.'});
        }

        res.json({
            success: true,
            message: 'Users fetched successfully.',
            data: User
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error occurred.', error: error.message });
    }
};


exports.userBooking = async (req, res) => {
    try {
      const { selectedDate, selectedTime, passengerCount, confirmationNumber, driver_id } = req.body;
  
      const newBooking = new Booking({
        selectedDate,
        selectedTime,
        passengerCount,
        confirmationNumber,
        driver_id
      });
      const savedBooking = await newBooking.save();

      res.status(201).json({
        success: true,
        message: 'Booking created successfully.',
        data: savedBooking
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Server error occurred while creating the booking.',
        error: error.message
      });
    }
  };