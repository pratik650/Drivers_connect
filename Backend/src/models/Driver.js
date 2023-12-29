const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    // match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  Phonenumber: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  adhaarId: {
    type: String,
    required: [true, 'Aadhar ID is required'],
    unique: true,
    trim: true,
    match: [/\d{12}/, 'Please enter a valid 12-digit Aadhar ID']
  },
  birthdate:{
    type: Date,
    required: [true, 'Birthdate is required']
  },
  profileImage: {
    type: String,
    required: false,
    trim: true
  },
  eligible: {
    type: Boolean,
    required: [true, 'Eligibility status is required']
  },
  available: {
    type: Boolean,
    required: [true, 'Availability status is required']
  }
}, {
  timestamps: true
});


const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
